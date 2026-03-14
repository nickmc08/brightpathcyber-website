import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, InsertSubscriber, InsertPurchase, InsertBroadcast, InsertBlogPost, subscribers, users, purchases, broadcasts, blogPosts } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ── Subscriber helpers ──────────────────────────────────────────────────────

/** Insert a new subscriber. Returns false if the email already exists. */
export async function insertSubscriber(
  data: InsertSubscriber
): Promise<{ success: boolean; alreadyExists: boolean }> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    await db.insert(subscribers).values(data);
    return { success: true, alreadyExists: false };
  } catch (err: unknown) {
    // Drizzle wraps MySQL errors in DrizzleQueryError with the original error in .cause
    // Check both the top-level error and the cause for ER_DUP_ENTRY
    const isDuplicate = (e: unknown): boolean => {
      if (!e || typeof e !== 'object') return false;
      if ('code' in e && e.code === 'ER_DUP_ENTRY') return true;
      if ('cause' in e && isDuplicate((e as { cause: unknown }).cause)) return true;
      if ('errno' in e && (e as { errno: unknown }).errno === 1062) return true;
      return false;
    };
    if (isDuplicate(err)) {
      return { success: false, alreadyExists: true };
    }
    throw err;
  }
}

/** Mark a subscriber's email as sent. */
export async function markEmailSent(email: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .update(subscribers)
    .set({ emailSent: 1, emailSentAt: new Date() })
    .where(eq(subscribers.email, email));
}

/** Return all subscribers ordered by most recent first. */
export async function getAllSubscribers() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db
    .select()
    .from(subscribers)
    .orderBy(subscribers.createdAt);
}

// ── Purchase helpers ────────────────────────────────────────────────────────

/** Insert a new purchase record from Stripe webhook. */
export async function insertPurchase(data: InsertPurchase): Promise<{ success: boolean; alreadyExists: boolean }> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  try {
    await db.insert(purchases).values(data);
    return { success: true, alreadyExists: false };
  } catch (err: unknown) {
    const isDuplicate = (e: unknown): boolean => {
      if (!e || typeof e !== 'object') return false;
      if ('code' in e && e.code === 'ER_DUP_ENTRY') return true;
      if ('cause' in e && isDuplicate((e as { cause: unknown }).cause)) return true;
      if ('errno' in e && (e as { errno: unknown }).errno === 1062) return true;
      return false;
    };
    if (isDuplicate(err)) {
      return { success: false, alreadyExists: true };
    }
    throw err;
  }
}

/** Mark a purchase's delivery email as sent. */
export async function markPurchaseEmailSent(stripeSessionId: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .update(purchases)
    .set({ emailSent: 1, emailSentAt: new Date() })
    .where(eq(purchases.stripeSessionId, stripeSessionId));
}

/** Return all purchases ordered by most recent first. */
export async function getAllPurchases() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db
    .select()
    .from(purchases)
    .orderBy(desc(purchases.createdAt));
}

// -- Broadcast helpers -------------------------------------------------------

/** Insert a new broadcast record. Returns the inserted ID. */
export async function insertBroadcast(data: InsertBroadcast): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(broadcasts).values(data);
  return (result[0] as { insertId: number }).insertId;
}

/** Update broadcast status and counts after sending. */
export async function updateBroadcastAfterSend(
  id: number,
  sentCount: number,
  failedCount: number
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .update(broadcasts)
    .set({ status: "sent", sentCount, failedCount, sentAt: new Date() })
    .where(eq(broadcasts.id, id));
}

/** Update broadcast status to 'sending'. */
export async function markBroadcastSending(id: number, recipientCount: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .update(broadcasts)
    .set({ status: "sending", recipientCount })
    .where(eq(broadcasts.id, id));
}

/** Mark broadcast as failed. */
export async function markBroadcastFailed(id: number, error?: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .update(broadcasts)
    .set({ status: "failed" })
    .where(eq(broadcasts.id, id));
}

/** Return all broadcasts ordered by most recent first. */
export async function getAllBroadcasts() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db
    .select()
    .from(broadcasts)
    .orderBy(desc(broadcasts.createdAt));
}

/** Get a single broadcast by ID. */
export async function getBroadcastById(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(broadcasts).where(eq(broadcasts.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

// -- Blog Post helpers -------------------------------------------------------

/** Insert a new blog post. Returns the inserted ID. */
export async function insertBlogPost(data: InsertBlogPost): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(blogPosts).values(data);
  return (result[0] as { insertId: number }).insertId;
}

/** Update an existing blog post by ID. */
export async function updateBlogPost(id: number, data: Partial<InsertBlogPost>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(blogPosts).set(data).where(eq(blogPosts.id, id));
}

/** Delete a blog post by ID. */
export async function deleteBlogPost(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
}

/** Get all blog posts (admin view - includes drafts). */
export async function getAllBlogPosts() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
}

/** Get only published blog posts (public view). */
export async function getPublishedBlogPosts() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(blogPosts).where(eq(blogPosts.status, "published")).orderBy(desc(blogPosts.createdAt));
}

/** Get a single blog post by slug (public). */
export async function getBlogPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : null;
}

/** Get a single blog post by ID (admin). */
export async function getBlogPostById(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}
