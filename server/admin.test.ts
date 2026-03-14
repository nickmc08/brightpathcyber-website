/**
 * Admin endpoint tests
 * Tests password verification and subscriber listing logic
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Mock ENV ──────────────────────────────────────────────────────────────────
vi.mock("./_core/env", () => ({
  ENV: {
    adminPassword: "TestAdminPass123!",
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
}));

// ── Mock email service ────────────────────────────────────────────────────────
vi.mock("./emailService", () => ({
  sendChecklistEmail: vi.fn().mockResolvedValue({ success: true }),
}));

import { ENV } from "./_core/env";
import { getAllSubscribers } from "./db";

// ── Helper: simulate admin.login logic ───────────────────────────────────────
function adminLogin(inputPassword: string): { success: boolean } | never {
  const { TRPCError } = require("@trpc/server");
  const expected = ENV.adminPassword;
  if (!expected) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Admin password not configured" });
  if (inputPassword !== expected) throw new TRPCError({ code: "UNAUTHORIZED", message: "Incorrect password" });
  return { success: true };
}

// ── Helper: simulate admin.listSubscribers logic ──────────────────────────────
async function adminListSubscribers(inputPassword: string) {
  const { TRPCError } = require("@trpc/server");
  const expected = ENV.adminPassword;
  if (!expected || inputPassword !== expected) throw new TRPCError({ code: "UNAUTHORIZED", message: "Incorrect password" });
  const rows = await getAllSubscribers();
  return {
    total: rows.length,
    subscribers: rows.map((r: { id: number; name: string; email: string; createdAt: Date; emailSent: number }) => ({
      id: r.id,
      name: r.name,
      email: r.email,
      createdAt: r.createdAt,
      emailSent: r.emailSent === 1,
    })),
  };
}

// ── Helper: simulate admin.exportCsv logic ────────────────────────────────────
async function adminExportCsv(inputPassword: string) {
  const { TRPCError } = require("@trpc/server");
  const expected = ENV.adminPassword;
  if (!expected || inputPassword !== expected) throw new TRPCError({ code: "UNAUTHORIZED", message: "Incorrect password" });
  const rows = await getAllSubscribers();
  const header = "id,name,email,signupDate,emailSent\n";
  const body = (rows as Array<{ id: number; name: string; email: string; createdAt: Date; emailSent: number }>)
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
}

// ── Tests ─────────────────────────────────────────────────────────────────────
describe("admin.login", () => {
  it("returns success with correct password", () => {
    const result = adminLogin("TestAdminPass123!");
    expect(result).toEqual({ success: true });
  });

  it("throws UNAUTHORIZED with wrong password", () => {
    expect(() => adminLogin("wrong-password")).toThrow();
  });

  it("throws UNAUTHORIZED with empty password", () => {
    expect(() => adminLogin("")).toThrow();
  });
});

describe("admin.listSubscribers", () => {
  beforeEach(() => {
    vi.mocked(getAllSubscribers).mockResolvedValue([]);
  });

  it("throws UNAUTHORIZED with wrong password", async () => {
    await expect(adminListSubscribers("wrong")).rejects.toThrow();
  });

  it("returns empty list when no subscribers", async () => {
    const result = await adminListSubscribers("TestAdminPass123!");
    expect(result.total).toBe(0);
    expect(result.subscribers).toHaveLength(0);
  });

  it("returns subscriber list with correct shape", async () => {
    const mockDate = new Date("2025-01-15T10:00:00Z");
    vi.mocked(getAllSubscribers).mockResolvedValue([
      { id: 1, name: "Alice Smith", email: "alice@example.com", createdAt: mockDate, emailSent: 1, emailSentAt: mockDate },
      { id: 2, name: "Bob Jones", email: "bob@example.com", createdAt: mockDate, emailSent: 0, emailSentAt: null },
    ] as never);

    const result = await adminListSubscribers("TestAdminPass123!");
    expect(result.total).toBe(2);
    expect(result.subscribers[0]).toMatchObject({
      id: 1,
      name: "Alice Smith",
      email: "alice@example.com",
      emailSent: true,
    });
    expect(result.subscribers[1]).toMatchObject({
      id: 2,
      name: "Bob Jones",
      emailSent: false,
    });
  });
});

describe("admin.exportCsv", () => {
  it("throws UNAUTHORIZED with wrong password", async () => {
    await expect(adminExportCsv("wrong")).rejects.toThrow();
  });

  it("returns CSV with header row for empty list", async () => {
    vi.mocked(getAllSubscribers).mockResolvedValue([]);
    const result = await adminExportCsv("TestAdminPass123!");
    expect(result.csv).toContain("id,name,email,signupDate,emailSent");
    expect(result.count).toBe(0);
  });

  it("returns properly formatted CSV with subscriber data", async () => {
    const mockDate = new Date("2025-06-01T00:00:00Z");
    vi.mocked(getAllSubscribers).mockResolvedValue([
      { id: 1, name: 'Jane "The Expert" Doe', email: "jane@example.com", createdAt: mockDate, emailSent: 1, emailSentAt: mockDate },
    ] as never);

    const result = await adminExportCsv("TestAdminPass123!");
    expect(result.count).toBe(1);
    // Name with quotes should be escaped
    expect(result.csv).toContain('"Jane ""The Expert"" Doe"');
    expect(result.csv).toContain('"jane@example.com"');
    expect(result.csv).toContain("yes");
  });
});
