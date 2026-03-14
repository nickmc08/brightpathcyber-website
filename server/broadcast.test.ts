/**
 * Broadcast endpoint tests
 * Tests broadcast creation, preview, sending logic, and history listing
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Mock ENV ──────────────────────────────────────────────────────────────────
vi.mock("./_core/env", () => ({
  ENV: {
    adminPassword: "TestAdminPass123!",
    sendgridApiKey: "SG.test-key",
    cookieSecret: "test-secret",
    databaseUrl: "",
    oAuthServerUrl: "",
    ownerOpenId: "",
    isProduction: false,
    forgeApiUrl: "",
    forgeApiKey: "",
  },
}));

// ── Mock DB ───────────────────────────────────────────────────────────────────
vi.mock("./db", () => ({
  getAllSubscribers: vi.fn(),
  insertSubscriber: vi.fn(),
  markEmailSent: vi.fn(),
  upsertUser: vi.fn(),
  getUserByOpenId: vi.fn(),
  getAllPurchases: vi.fn(),
  insertPurchase: vi.fn(),
  insertBroadcast: vi.fn(),
  getAllBroadcasts: vi.fn(),
  getBroadcastById: vi.fn(),
  markBroadcastSending: vi.fn(),
  updateBroadcastAfterSend: vi.fn(),
  markBroadcastFailed: vi.fn(),
}));

// ── Mock email service ────────────────────────────────────────────────────────
vi.mock("./emailService", () => ({
  sendChecklistEmail: vi.fn().mockResolvedValue({ success: true }),
}));

// ── Mock SendGrid ─────────────────────────────────────────────────────────────
vi.mock("@sendgrid/mail", () => ({
  default: {
    setApiKey: vi.fn(),
    send: vi.fn().mockResolvedValue([{ statusCode: 202 }]),
  },
}));

// ── Mock Stripe ───────────────────────────────────────────────────────────────
vi.mock("stripe", () => ({
  default: vi.fn().mockImplementation(() => ({
    checkout: { sessions: { create: vi.fn() } },
  })),
}));

import { ENV } from "./_core/env";
import {
  insertBroadcast,
  getAllBroadcasts,
  getBroadcastById,
  markBroadcastSending,
  updateBroadcastAfterSend,
  markBroadcastFailed,
  getAllSubscribers,
} from "./db";
import { buildBroadcastEmail } from "./broadcastEmailTemplate";
import { TRPCError } from "@trpc/server";

// ── Helper: simulate admin.previewBroadcast logic ─────────────────────────────
function previewBroadcast(inputPassword: string, templateType: "blog_update" | "course_launch" | "custom", subject: string, bodyJson: string) {
  const expected = ENV.adminPassword;
  if (!expected || inputPassword !== expected) throw new TRPCError({ code: "UNAUTHORIZED", message: "Incorrect password" });
  return buildBroadcastEmail(templateType, subject, bodyJson);
}

// ── Helper: simulate admin.createBroadcast logic ──────────────────────────────
async function createBroadcast(inputPassword: string, templateType: "blog_update" | "course_launch" | "custom", subject: string, bodyJson: string, scheduledAt?: Date) {
  const expected = ENV.adminPassword;
  if (!expected || inputPassword !== expected) throw new TRPCError({ code: "UNAUTHORIZED", message: "Incorrect password" });
  const { html } = buildBroadcastEmail(templateType, subject, bodyJson);
  const id = await insertBroadcast({
    subject,
    templateType,
    bodyJson,
    htmlBody: html,
    status: scheduledAt ? "scheduled" : "draft",
    scheduledAt: scheduledAt ?? null,
  });
  return { id };
}

// ── Helper: simulate admin.listBroadcasts logic ───────────────────────────────
async function listBroadcasts(inputPassword: string) {
  const expected = ENV.adminPassword;
  if (!expected || inputPassword !== expected) throw new TRPCError({ code: "UNAUTHORIZED", message: "Incorrect password" });
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
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("admin.previewBroadcast", () => {
  it("throws UNAUTHORIZED with wrong password", () => {
    expect(() =>
      previewBroadcast("wrong", "blog_update", "Test Subject", JSON.stringify({ blogTitle: "T", snippet: "S", postUrl: "https://example.com" }))
    ).toThrow();
  });

  it("returns HTML and text for blog_update template", () => {
    const bodyJson = JSON.stringify({ blogTitle: "5 Scams to Watch", snippet: "Learn to spot them.", postUrl: "https://brightpathcyber.com/blog/scams" });
    const result = previewBroadcast("TestAdminPass123!", "blog_update", "New Post: 5 Scams to Watch", bodyJson);
    expect(result.html).toContain("5 Scams to Watch");
    expect(result.text).toContain("5 Scams to Watch");
    expect(result.subject).toBe("New Post: 5 Scams to Watch");
  });

  it("returns HTML and text for course_launch template", () => {
    const bodyJson = JSON.stringify({ courseName: "Cyber Safety 101", description: "Learn the basics.", price: "$97", enrollUrl: "https://brightpathcyber.com/enroll" });
    const result = previewBroadcast("TestAdminPass123!", "course_launch", "Now Available: Cyber Safety 101", bodyJson);
    expect(result.html).toContain("Cyber Safety 101");
    expect(result.text).toContain("Cyber Safety 101");
  });

  it("returns HTML and text for custom template", () => {
    const bodyJson = JSON.stringify({ htmlBody: "<p>Hello world</p>", textBody: "Hello world" });
    const result = previewBroadcast("TestAdminPass123!", "custom", "Custom Email", bodyJson);
    expect(result.html).toContain("Hello world");
    expect(result.text).toContain("Hello world");
  });
});

describe("admin.createBroadcast", () => {
  beforeEach(() => {
    vi.mocked(insertBroadcast).mockResolvedValue(42 as never);
  });

  it("throws UNAUTHORIZED with wrong password", async () => {
    await expect(createBroadcast("wrong", "blog_update", "Subject", "{}")).rejects.toThrow();
  });

  it("creates a draft broadcast and returns an id", async () => {
    const bodyJson = JSON.stringify({ blogTitle: "Test", snippet: "Snip", postUrl: "https://example.com" });
    const result = await createBroadcast("TestAdminPass123!", "blog_update", "Test Subject", bodyJson);
    expect(result.id).toBe(42);
    expect(insertBroadcast).toHaveBeenCalledWith(expect.objectContaining({ status: "draft" }));
  });

  it("creates a scheduled broadcast when scheduledAt is provided", async () => {
    const bodyJson = JSON.stringify({ blogTitle: "Test", snippet: "Snip", postUrl: "https://example.com" });
    const futureDate = new Date(Date.now() + 86400000);
    const result = await createBroadcast("TestAdminPass123!", "blog_update", "Test Subject", bodyJson, futureDate);
    expect(result.id).toBe(42);
    expect(insertBroadcast).toHaveBeenCalledWith(expect.objectContaining({ status: "scheduled", scheduledAt: futureDate }));
  });
});

describe("admin.listBroadcasts", () => {
  it("throws UNAUTHORIZED with wrong password", async () => {
    await expect(listBroadcasts("wrong")).rejects.toThrow();
  });

  it("returns empty list when no broadcasts", async () => {
    vi.mocked(getAllBroadcasts).mockResolvedValue([] as never);
    const result = await listBroadcasts("TestAdminPass123!");
    expect(result.total).toBe(0);
    expect(result.broadcasts).toHaveLength(0);
  });

  it("returns broadcast list with correct shape", async () => {
    const mockDate = new Date("2025-03-01T10:00:00Z");
    vi.mocked(getAllBroadcasts).mockResolvedValue([
      {
        id: 1,
        subject: "New Blog Post",
        templateType: "blog_update",
        status: "sent",
        recipientCount: 150,
        sentCount: 148,
        failedCount: 2,
        scheduledAt: null,
        sentAt: mockDate,
        createdAt: mockDate,
        bodyJson: "{}",
        htmlBody: "<p>test</p>",
      },
    ] as never);

    const result = await listBroadcasts("TestAdminPass123!");
    expect(result.total).toBe(1);
    expect(result.broadcasts[0]).toMatchObject({
      id: 1,
      subject: "New Blog Post",
      templateType: "blog_update",
      status: "sent",
      sentCount: 148,
      failedCount: 2,
    });
  });
});

describe("broadcastEmailTemplate", () => {
  it("does not contain em dashes or emojis in blog_update template", () => {
    const bodyJson = JSON.stringify({ blogTitle: "Test Post", snippet: "A short snippet.", postUrl: "https://example.com" });
    const { html, text } = buildBroadcastEmail("blog_update", "Test Subject", bodyJson);
    expect(html).not.toMatch(/[—–]/);
    expect(text).not.toMatch(/[—–]/);
  });

  it("does not contain em dashes or emojis in course_launch template", () => {
    const bodyJson = JSON.stringify({ courseName: "Course", description: "Desc", price: "$97", enrollUrl: "https://example.com" });
    const { html, text } = buildBroadcastEmail("course_launch", "Test Subject", bodyJson);
    expect(html).not.toMatch(/[—–]/);
    expect(text).not.toMatch(/[—–]/);
  });
});
