import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// ── Helpers ──────────────────────────────────────────────────────────────────

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createNonAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 2,
    openId: "regular-user",
    email: "user@example.com",
    name: "Regular User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

// ── SendGrid API key validation ──────────────────────────────────────────────

describe("SendGrid API key validation", () => {
  it("SENDGRID_API_KEY env var is set", () => {
    const key = process.env.SENDGRID_API_KEY;
    expect(key).toBeDefined();
    expect(key).not.toBe("");
  });

  it("SENDGRID_API_KEY starts with SG.", () => {
    const key = process.env.SENDGRID_API_KEY ?? "";
    expect(key.startsWith("SG.")).toBe(true);
  });

  it("can authenticate with SendGrid API", async () => {
    const key = process.env.SENDGRID_API_KEY;
    if (!key) {
      console.warn("Skipping: SENDGRID_API_KEY not set");
      return;
    }

    const res = await fetch("https://api.sendgrid.com/v3/scopes", {
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
    });

    // 200 = valid key, 403 = valid key but restricted scopes (still valid)
    expect([200, 403]).toContain(res.status);
  });
});

// ── Subscribe input validation ───────────────────────────────────────────────

describe("subscribe.signup input validation", () => {
  it("rejects empty name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.subscribe.signup({ name: "", email: "test@example.com" })
    ).rejects.toThrow();
  });

  it("rejects invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.subscribe.signup({ name: "Test User", email: "not-an-email" })
    ).rejects.toThrow();
  });

  it("rejects missing email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      // @ts-expect-error intentionally passing invalid input
      caller.subscribe.signup({ name: "Test User" })
    ).rejects.toThrow();
  });
});

// ── Admin router access control (password-based) ─────────────────────────────
// exportCsv and stats have been moved to the admin router which uses
// password-based auth rather than session-based auth.
// Those procedures are tested in admin.test.ts.

describe("admin.login access control", () => {
  it("rejects wrong password via router", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.admin.login({ password: "wrong" })).rejects.toThrow();
  });

  it("accepts correct password via router", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    // ADMIN_PASSWORD is set in env; if not set in test env the procedure throws INTERNAL_SERVER_ERROR
    const adminPw = process.env.ADMIN_PASSWORD;
    if (!adminPw) {
      console.warn("Skipping: ADMIN_PASSWORD not set in test environment");
      return;
    }
    const result = await caller.admin.login({ password: adminPw });
    expect(result).toEqual({ success: true });
  });
});
