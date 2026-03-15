import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import Stripe from "stripe";
import { getSessionCookieOptions } from "./_core/cookies";
import { ENV } from "./_core/env";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { getAllSubscribers, getActiveSubscribers, getSubscriberByToken, getSubscriberByEmail, markUnsubscribed, insertSubscriber, markEmailSent, getAllPurchases, insertBroadcast, getAllBroadcasts, getBroadcastById, markBroadcastSending, updateBroadcastAfterSend, markBroadcastFailed, insertBlogPost, updateBlogPost, deleteBlogPost, getAllBlogPosts, getPublishedBlogPosts, getBlogPostBySlug, getBlogPostById } from "./db";
import { sendChecklistEmail } from "./emailService";
import { notifyNewSubscriber } from "./notificationService";
import { PRODUCTS } from "./products";
import { buildBroadcastEmail } from "./broadcastEmailTemplate";
import sgMail from "@sendgrid/mail";
import { generateWeeklyBlogPost, CONTENT_ROADMAP, getCurrentWeekIndex } from "./blogGenerator";

function getStripe(): Stripe {
  const key = ENV.stripeSecretKey;
  if (!key) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Stripe not configured" });
  return new Stripe(key);
}

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ── Email capture ──────────────────────────────────────────────────────────
  subscribe: router({
    signup: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required").max(255),
          email: z.string().email("Please enter a valid email address").max(320),
        })
      )
      .mutation(async ({ input }) => {
        const { name, email } = input;
        const unsubToken = crypto.randomUUID();
        const { alreadyExists } = await insertSubscriber({ name, email, unsubscribeToken: unsubToken });
        // Build unsubscribe URL using the token
        const buildUnsubUrl = (token: string) =>
          `https://brightpathcyber.com/unsubscribe?token=${token}`;

        if (alreadyExists) {
          // Fetch existing subscriber by email to get their real token
          const existing = await getSubscriberByEmail(email).catch(() => null);
          const unsubUrl = existing?.unsubscribeToken
            ? buildUnsubUrl(existing.unsubscribeToken)
            : buildUnsubUrl(unsubToken);
          await sendChecklistEmail(email, name.split(" ")[0] || name, unsubUrl);
          return { success: true, alreadySubscribed: true };
        }
        const unsubUrl = buildUnsubUrl(unsubToken);
        const emailResult = await sendChecklistEmail(email, name.split(" ")[0] || name, unsubUrl);
        if (emailResult.success) {
          await markEmailSent(email);
        }
        // Notify sales team about new subscriber (fire and forget)
        notifyNewSubscriber(name, email).catch(err =>
          console.error("[Notification] Background subscriber alert failed:", err)
        );
        return { success: true, alreadySubscribed: false };
      }),

    unsubscribe: publicProcedure
      .input(z.object({ token: z.string().min(1) }))
      .mutation(async ({ input }) => {
        const result = await markUnsubscribed(input.token);
        if (result.notFound) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Unsubscribe link not found or already used" });
        }
        return { success: true };
      }),

    getByToken: publicProcedure
      .input(z.object({ token: z.string().min(1) }))
      .query(async ({ input }) => {
        const sub = await getSubscriberByToken(input.token);
        if (!sub) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Unsubscribe link not found" });
        }
        return { email: sub.email, unsubscribed: sub.unsubscribed === 1 };
      }),
  }),

  // ── Stripe Checkout ────────────────────────────────────────────────────────
  checkout: router({
    createEbookSession: publicProcedure
      .input(z.object({ origin: z.string().url() }))
      .mutation(async ({ input }) => {
        const stripe = getStripe();
        const product = PRODUCTS.EBOOK_CLICK_WITH_CONFIDENCE;

        const session = await stripe.checkout.sessions.create({
          mode: "payment",
          payment_method_types: ["card"],
          allow_promotion_codes: true,
          line_items: [
            {
              price_data: {
                currency: product.currency,
                product_data: {
                  name: product.name,
                  description: product.description,
                },
                unit_amount: product.priceInCents,
              },
              quantity: 1,
            },
          ],
          metadata: {
            productType: product.metadata.productType,
            slug: product.metadata.slug,
          },
          success_url: `${input.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${input.origin}/bright-path-cyber`,
        });

        if (!session.url) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create checkout session" });
        }

        return { url: session.url };
      }),
  }),

  // ── Admin ──────────────────────────────────────────────────────────────────
  admin: router({
    login: publicProcedure
      .input(z.object({ password: z.string() }))
      .mutation(({ input }) => {
        const expected = ENV.adminPassword;
        if (!expected) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Admin password not configured" });
        }
        if (input.password !== expected) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Incorrect password" });
        }
        return { success: true };
      }),

    listSubscribers: publicProcedure
      .input(z.object({ password: z.string() }))
      .query(async ({ input }) => {
        const expected = ENV.adminPassword;
        if (!expected || input.password !== expected) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Incorrect password" });
        }
        const rows = await getAllSubscribers();
        return {
          total: rows.length,
          subscribers: rows.map(r => ({
            id: r.id,
            name: r.name,
            email: r.email,
            createdAt: r.createdAt,
            emailSent: r.emailSent === 1,
          })),
        };
      }),

    exportCsv: publicProcedure
      .input(z.object({ password: z.string() }))
      .mutation(async ({ input }) => {
        const expected = ENV.adminPassword;
        if (!expected || input.password !== expected) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Incorrect password" });
        }
        const rows = await getAllSubscribers();
        const header = "id,name,email,signupDate,emailSent\n";
        const body = rows
          .map(r =>
            [
              r.id,
              `"${r.name.replace(/"/g, '""')}"`,
              `"${r.email}"`,
              r.createdAt instanceof Date ? r.createdAt.toISOString() : String(r.createdAt),
              r.emailSent === 1 ? "yes" : "no",
            ].join(",")
          )
          .join("\n");
        return { csv: header + body, count: rows.length };
      }),

    listPurchases: publicProcedure
      .input(z.object({ password: z.string() }))
      .query(async ({ input }) => {
        const expected = ENV.adminPassword;
        if (!expected || input.password !== expected) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Incorrect password" });
        }
        const rows = await getAllPurchases();
        const totalRevenue = rows.reduce((sum, r) => sum + r.amountTotal, 0);
        return {
          total: rows.length,
          totalRevenue,
          purchases: rows.map(r => ({
            id: r.id,
            stripeSessionId: r.stripeSessionId,
            customerEmail: r.customerEmail,
            amountTotal: r.amountTotal,
            currency: r.currency,
            productName: r.productName,
            paymentStatus: r.paymentStatus,
            emailSent: r.emailSent === 1,
            createdAt: r.createdAt,
          })),
        };
      }),

    // ---- Broadcast endpoints ------------------------------------------------

    previewBroadcast: publicProcedure
      .input(z.object({
        password: z.string(),
        templateType: z.enum(["blog_update", "course_launch", "custom"]),
        subject: z.string().min(1),
        bodyJson: z.string(),
      }))
      .mutation(({ input }) => {
        const expected = ENV.adminPassword;
        if (!expected || input.password !== expected) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Incorrect password" });
        }
        const { subject, html, text } = buildBroadcastEmail(input.templateType, input.subject, input.bodyJson);
        return { subject, html, text };
      }),

    createBroadcast: publicProcedure
      .input(z.object({
        password: z.string(),
        templateType: z.enum(["blog_update", "course_launch", "custom"]),
        subject: z.string().min(1).max(500),
        bodyJson: z.string(),
        scheduledAt: z.date().optional(),
      }))
      .mutation(async ({ input }) => {
        const expected = ENV.adminPassword;
        if (!expected || input.password !== expected) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Incorrect password" });
        }
        const { html } = buildBroadcastEmail(input.templateType, input.subject, input.bodyJson);
        const id = await insertBroadcast({
          subject: input.subject,
          templateType: input.templateType,
          bodyJson: input.bodyJson,
          htmlBody: html,
          status: input.scheduledAt ? "scheduled" : "draft",
          scheduledAt: input.scheduledAt ?? null,
        });
        return { id };
      }),

    sendBroadcast: publicProcedure
      .input(z.object({
        password: z.string(),
        broadcastId: z.number().int().positive(),
      }))
      .mutation(async ({ input }) => {
        const expected = ENV.adminPassword;
        if (!expected || input.password !== expected) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Incorrect password" });
        }

        const broadcast = await getBroadcastById(input.broadcastId);
        if (!broadcast) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Broadcast not found" });
        }
        if (broadcast.status === "sent" || broadcast.status === "sending") {
          throw new TRPCError({ code: "BAD_REQUEST", message: `Broadcast is already ${broadcast.status}` });
        }

        const activeSubscribers = await getActiveSubscribers();
        if (activeSubscribers.length === 0) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "No active subscribers to send to" });
        }

        await markBroadcastSending(input.broadcastId, activeSubscribers.length);

        const apiKey = ENV.sendgridApiKey;
        if (!apiKey) {
          await markBroadcastFailed(input.broadcastId);
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "SendGrid not configured" });
        }
        sgMail.setApiKey(apiKey);

        let sentCount = 0;
        let failedCount = 0;

        // Send individually to each subscriber with a unique unsubscribe URL
        for (const sub of activeSubscribers) {
          const unsubscribeUrl = sub.unsubscribeToken
            ? `https://brightpathcyber.com/unsubscribe?token=${sub.unsubscribeToken}`
            : undefined;
          const { subject, html, text } = buildBroadcastEmail(
            broadcast.templateType as "blog_update" | "course_launch" | "custom",
            broadcast.subject,
            broadcast.bodyJson,
            unsubscribeUrl
          );
          try {
            await sgMail.send({
              to: sub.email,
              from: { email: "info@brightpathcyber.com", name: "Bright Path Cyber" },
              subject,
              html,
              text,
            });
            sentCount++;
            console.log(`[Broadcast] Sent to ${sub.email}`);
          } catch (err: unknown) {
            failedCount++;
            const errMsg = err instanceof Error ? err.message : String(err);
            console.error(`[Broadcast] Failed to send to ${sub.email}:`, errMsg);
            // Log SendGrid response body if available
            if (err && typeof err === 'object' && 'response' in err) {
              const sgErr = err as { response?: { body?: unknown } };
              console.error(`[Broadcast] SendGrid response:`, JSON.stringify(sgErr.response?.body));
            }
          }
        }

        await updateBroadcastAfterSend(input.broadcastId, sentCount, failedCount);
        return { sentCount, failedCount, total: activeSubscribers.length };
      }),

    listBroadcasts: publicProcedure
      .input(z.object({ password: z.string() }))
      .query(async ({ input }) => {
        const expected = ENV.adminPassword;
        if (!expected || input.password !== expected) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Incorrect password" });
        }
        const rows = await getAllBroadcasts();
        return {
          total: rows.length,
          broadcasts: rows.map(r => ({
            id: r.id,
            subject: r.subject,
            templateType: r.templateType,
            status: r.status,
            recipientCount: r.recipientCount,
            sentCount: r.sentCount,
            failedCount: r.failedCount,
            scheduledAt: r.scheduledAt,
            sentAt: r.sentAt,
            createdAt: r.createdAt,
          })),
        };
      }),

    // ---- Blog Post CMS endpoints --------------------------------------------

    listBlogPosts: publicProcedure
      .input(z.object({ password: z.string() }))
      .query(async ({ input }) => {
        const expected = ENV.adminPassword;
        if (!expected || input.password !== expected) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Incorrect password" });
        }
        const rows = await getAllBlogPosts();
        return { total: rows.length, posts: rows };
      }),

    getBlogPost: publicProcedure
      .input(z.object({ password: z.string(), id: z.number().int().positive() }))
      .query(async ({ input }) => {
        const expected = ENV.adminPassword;
        if (!expected || input.password !== expected) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Incorrect password" });
        }
        const post = await getBlogPostById(input.id);
        if (!post) throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
        return post;
      }),

    createBlogPost: publicProcedure
      .input(z.object({
        password: z.string(),
        title: z.string().min(1).max(500),
        slug: z.string().min(1).max(500),
        category: z.string().min(1).max(255),
        excerpt: z.string().min(1),
        content: z.string().min(1),
        date: z.string().min(1),
        readTime: z.string().min(1),
        imageUrl: z.string().optional(),
        status: z.enum(["draft", "published"]).default("draft"),
      }))
      .mutation(async ({ input }) => {
        const expected = ENV.adminPassword;
        if (!expected || input.password !== expected) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Incorrect password" });
        }
        // Enforce brand rules
        const cleaned = enforceBrandRules(input.content);
        const cleanExcerpt = enforceBrandRules(input.excerpt);
        const id = await insertBlogPost({
          title: input.title,
          slug: input.slug,
          category: input.category,
          excerpt: cleanExcerpt,
          content: cleaned,
          date: input.date,
          readTime: input.readTime,
          imageUrl: input.imageUrl ?? null,
          status: input.status,
        });
        // Auto-broadcast if publishing immediately
        if (input.status === "published") {
          autoBroadcastOnPublish(input.title, cleanExcerpt, input.slug).catch(err =>
            console.error("[Blog] Auto-broadcast failed:", err)
          );
        }
        return { id };
      }),

    updateBlogPost: publicProcedure
      .input(z.object({
        password: z.string(),
        id: z.number().int().positive(),
        title: z.string().min(1).max(500).optional(),
        slug: z.string().min(1).max(500).optional(),
        category: z.string().min(1).max(255).optional(),
        excerpt: z.string().min(1).optional(),
        content: z.string().min(1).optional(),
        date: z.string().min(1).optional(),
        readTime: z.string().min(1).optional(),
        imageUrl: z.string().nullable().optional(),
        status: z.enum(["draft", "published"]).optional(),
      }))
      .mutation(async ({ input }) => {
        const expected = ENV.adminPassword;
        if (!expected || input.password !== expected) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Incorrect password" });
        }
        const existing = await getBlogPostById(input.id);
        if (!existing) throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });

        const updates: Record<string, unknown> = {};
        if (input.title !== undefined) updates.title = input.title;
        if (input.slug !== undefined) updates.slug = input.slug;
        if (input.category !== undefined) updates.category = input.category;
        if (input.excerpt !== undefined) updates.excerpt = enforceBrandRules(input.excerpt);
        if (input.content !== undefined) updates.content = enforceBrandRules(input.content);
        if (input.date !== undefined) updates.date = input.date;
        if (input.readTime !== undefined) updates.readTime = input.readTime;
        if (input.imageUrl !== undefined) updates.imageUrl = input.imageUrl;
        if (input.status !== undefined) updates.status = input.status;

        await updateBlogPost(input.id, updates);

        // Auto-broadcast if status changed from draft to published
        if (input.status === "published" && existing.status === "draft") {
          const title = input.title ?? existing.title;
          const excerpt = input.excerpt ? enforceBrandRules(input.excerpt) : existing.excerpt;
          const slug = input.slug ?? existing.slug;
          autoBroadcastOnPublish(title, excerpt, slug).catch(err =>
            console.error("[Blog] Auto-broadcast failed:", err)
          );
        }

        return { success: true };
      }),

    deleteBlogPost: publicProcedure
      .input(z.object({
        password: z.string(),
        id: z.number().int().positive(),
      }))
      .mutation(async ({ input }) => {
        const expected = ENV.adminPassword;
        if (!expected || input.password !== expected) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Incorrect password" });
        }
        await deleteBlogPost(input.id);
        return { success: true };
      }),

    toggleBlogPostStatus: publicProcedure
      .input(z.object({
        password: z.string(),
        id: z.number().int().positive(),
      }))
      .mutation(async ({ input }) => {
        const expected = ENV.adminPassword;
        if (!expected || input.password !== expected) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Incorrect password" });
        }
        const post = await getBlogPostById(input.id);
        if (!post) throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
        const newStatus = post.status === "published" ? "draft" : "published";
        await updateBlogPost(input.id, { status: newStatus });

        // Auto-broadcast if toggling from draft to published
        if (newStatus === "published" && post.status === "draft") {
          autoBroadcastOnPublish(post.title, post.excerpt, post.slug).catch(err =>
            console.error("[Blog] Auto-broadcast failed:", err)
          );
        }

        return { newStatus };
      }),

    triggerBlogGeneration: publicProcedure
      .input(z.object({ password: z.string() }))
      .mutation(async ({ input }) => {
        const expected = ENV.adminPassword;
        if (!expected || input.password !== expected) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Incorrect password" });
        }
        const result = await generateWeeklyBlogPost();
        if (!result.success) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: result.error ?? "Blog generation failed" });
        }
        return { postId: result.postId, title: result.title };
      }),

    getBlogGeneratorStatus: publicProcedure
      .input(z.object({ password: z.string() }))
      .query(({ input }) => {
        const expected = ENV.adminPassword;
        if (!expected || input.password !== expected) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Incorrect password" });
        }
        const weekIndex = getCurrentWeekIndex();
        const currentEntry = CONTENT_ROADMAP[weekIndex];
        return {
          currentWeekIndex: weekIndex,
          nextTopic: currentEntry.topic,
          nextCategory: currentEntry.category,
          nextMonth: currentEntry.month,
          nextMonthTheme: currentEntry.monthTheme,
          schedule: "Every Saturday at 6:00 AM",
          roadmap: CONTENT_ROADMAP.map(e => ({
            week: e.week,
            month: e.month,
            monthTheme: e.monthTheme,
            topic: e.topic,
            category: e.category,
          })),
        };
      }),
  }),

  // ── Public Blog API ───────────────────────────────────────────────────────
  blog: router({
    list: publicProcedure.query(async () => {
      const posts = await getPublishedBlogPosts();
      return posts.map(p => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        category: p.category,
        excerpt: p.excerpt,
        date: p.date,
        readTime: p.readTime,
        imageUrl: p.imageUrl,
      }));
    }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const post = await getBlogPostBySlug(input.slug);
        if (!post || post.status !== "published") {
          throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
        }
        return post;
      }),
  }),
});

// ── Brand rule enforcement ──────────────────────────────────────────────────
function enforceBrandRules(text: string): string {
  // Replace em dashes and en dashes with regular hyphens
  let cleaned = text.replace(/\u2014/g, "-").replace(/\u2013/g, "-");
  // Remove emojis using surrogate pair ranges (ES5 compatible)
  cleaned = cleaned.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "");
  // Remove common symbol emojis in BMP
  cleaned = cleaned.replace(/[\u2600-\u27BF\uFE00-\uFE0F\u2702-\u27B0]/g, "");
  return cleaned;
}

// ── Auto-broadcast on publish ───────────────────────────────────────────────
async function autoBroadcastOnPublish(title: string, excerpt: string, slug: string) {
  try {
    const apiKey = ENV.sendgridApiKey;
    if (!apiKey) {
      console.warn("[Blog] Cannot auto-broadcast: SendGrid not configured");
      return;
    }

    const bodyJson = JSON.stringify({
      blogTitle: title,
      snippet: excerpt,
      postUrl: `https://brightpathcyber.com/blog/${slug}`,
    });

    const { subject, html, text } = buildBroadcastEmail("blog_update", `New Post: ${title}`, bodyJson);

    // Store the broadcast record
    const broadcastId = await insertBroadcast({
      subject: `New Post: ${title}`,
      templateType: "blog_update",
      bodyJson,
      htmlBody: html,
      status: "sending",
    });

    const activeSubscribers = await getActiveSubscribers();
    if (activeSubscribers.length === 0) {
      console.log("[Blog] No active subscribers to broadcast to");
      return;
    }

    await markBroadcastSending(broadcastId, activeSubscribers.length);
    sgMail.setApiKey(apiKey);

    let sentCount = 0;
    let failedCount = 0;

    for (const sub of activeSubscribers) {
      const unsubscribeUrl = sub.unsubscribeToken
        ? `https://brightpathcyber.com/unsubscribe?token=${sub.unsubscribeToken}`
        : undefined;
      const { subject: subSubject, html: subHtml, text: subText } = buildBroadcastEmail(
        "blog_update",
        `New Post: ${title}`,
        bodyJson,
        unsubscribeUrl
      );
      try {
        await sgMail.send({
          to: sub.email,
          from: { email: "info@brightpathcyber.com", name: "Bright Path Cyber" },
          subject: subSubject,
          html: subHtml,
          text: subText,
        });
        sentCount++;
      } catch (err) {
        failedCount++;
        console.error(`[Blog Broadcast] Failed to send to ${sub.email}:`, err);
      }
    }

    await updateBroadcastAfterSend(broadcastId, sentCount, failedCount);
    console.log(`[Blog] Auto-broadcast sent: ${sentCount} delivered, ${failedCount} failed`);
  } catch (err) {
    console.error("[Blog] Auto-broadcast error:", err);
  }
}

export type AppRouter = typeof appRouter;
