import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Checklist subscribers — stores everyone who signs up for the free checklist
export const subscribers = mysqlTable("subscribers", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  emailSent: int("emailSent").default(0).notNull(), // 1 = sent, 0 = pending/failed
  emailSentAt: timestamp("emailSentAt"),
});

export type Subscriber = typeof subscribers.$inferSelect;
export type InsertSubscriber = typeof subscribers.$inferInsert;

// E-book purchases — records from Stripe checkout.session.completed webhook
export const purchases = mysqlTable("purchases", {
  id: int("id").autoincrement().primaryKey(),
  stripeSessionId: varchar("stripeSessionId", { length: 255 }).notNull().unique(),
  customerEmail: varchar("customerEmail", { length: 320 }).notNull(),
  amountTotal: int("amountTotal").notNull(), // in cents
  currency: varchar("currency", { length: 10 }).notNull().default("usd"),
  productName: varchar("productName", { length: 255 }).notNull(),
  productSlug: varchar("productSlug", { length: 255 }),
  paymentStatus: varchar("paymentStatus", { length: 64 }).notNull().default("paid"),
  emailSent: int("emailSent").default(0).notNull(), // 1 = delivery email sent
  emailSentAt: timestamp("emailSentAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Purchase = typeof purchases.$inferSelect;
export type InsertPurchase = typeof purchases.$inferInsert;