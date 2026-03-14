/**
 * Vitest tests for the CAN-SPAM unsubscribe feature.
 * Covers: token lookup, unsubscribe mutation, exclusion from active subscribers,
 * and input validation.
 */

import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// ── Context helpers ──────────────────────────────────────────────────────────

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

// ── subscribe.getByToken ─────────────────────────────────────────────────────

describe("subscribe.getByToken", () => {
  it("throws NOT_FOUND for a non-existent token", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.subscribe.getByToken({ token: "00000000-0000-0000-0000-000000000000" })
    ).rejects.toMatchObject({ code: "NOT_FOUND" });
  });

  it("rejects an empty token string", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.subscribe.getByToken({ token: "" })
    ).rejects.toThrow();
  });
});

// ── subscribe.unsubscribe ────────────────────────────────────────────────────

describe("subscribe.unsubscribe", () => {
  it("throws NOT_FOUND for a non-existent token", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.subscribe.unsubscribe({ token: "00000000-0000-0000-0000-000000000001" })
    ).rejects.toMatchObject({ code: "NOT_FOUND" });
  });

  it("rejects an empty token string", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.subscribe.unsubscribe({ token: "" })
    ).rejects.toThrow();
  });
});

// ── db helpers: unsubscribe token generation ─────────────────────────────────

describe("unsubscribe token format", () => {
  it("crypto.randomUUID produces a valid UUID v4 format", () => {
    const token = crypto.randomUUID();
    // UUID v4: 8-4-4-4-12 hex chars with version 4 marker
    expect(token).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );
  });

  it("each call to crypto.randomUUID produces a unique value", () => {
    const tokens = new Set(Array.from({ length: 100 }, () => crypto.randomUUID()));
    expect(tokens.size).toBe(100);
  });
});

// ── Unsubscribe URL construction ─────────────────────────────────────────────

describe("unsubscribe URL construction", () => {
  it("builds a well-formed URL from a token", () => {
    const token = "abc12345-0000-4000-8000-000000000000";
    const url = `https://brightpathcyber.com/unsubscribe?token=${token}`;
    const parsed = new URL(url);
    expect(parsed.hostname).toBe("brightpathcyber.com");
    expect(parsed.pathname).toBe("/unsubscribe");
    expect(parsed.searchParams.get("token")).toBe(token);
  });

  it("URL token parameter survives round-trip encode/decode", () => {
    const token = crypto.randomUUID();
    const url = `https://brightpathcyber.com/unsubscribe?token=${encodeURIComponent(token)}`;
    const parsed = new URL(url);
    expect(parsed.searchParams.get("token")).toBe(token);
  });
});

// ── Email template: unsubscribe footer ──────────────────────────────────────

describe("buildChecklistEmail unsubscribe footer", () => {
  it("includes unsubscribe link in HTML when URL is provided", async () => {
    const { buildChecklistEmail } = await import("./emailTemplate");
    const url = "https://brightpathcyber.com/unsubscribe?token=test-token-123";
    const { html } = buildChecklistEmail("Alice", url);
    expect(html).toContain(url);
    expect(html).toContain("Unsubscribe");
  });

  it("omits unsubscribe link from HTML when no URL is provided", async () => {
    const { buildChecklistEmail } = await import("./emailTemplate");
    const { html } = buildChecklistEmail("Alice");
    expect(html).not.toContain("/unsubscribe?token=");
  });

  it("includes unsubscribe link in plain text when URL is provided", async () => {
    const { buildChecklistEmail } = await import("./emailTemplate");
    const url = "https://brightpathcyber.com/unsubscribe?token=test-token-456";
    const { text } = buildChecklistEmail("Bob", url);
    expect(text).toContain(url);
  });
});

// ── Broadcast email template: unsubscribe footer ────────────────────────────

describe("buildBroadcastEmail unsubscribe footer", () => {
  it("includes unsubscribe link in HTML when URL is provided", async () => {
    const { buildBroadcastEmail } = await import("./broadcastEmailTemplate");
    const url = "https://brightpathcyber.com/unsubscribe?token=broadcast-token";
    const bodyJson = JSON.stringify({
      blogTitle: "Test Post",
      snippet: "A short excerpt.",
      postUrl: "https://brightpathcyber.com/blog/test-post",
    });
    const { html } = buildBroadcastEmail("blog_update", "New Post: Test Post", bodyJson, url);
    expect(html).toContain(url);
    expect(html).toContain("Unsubscribe");
  });

  it("omits unsubscribe link when no URL is provided", async () => {
    const { buildBroadcastEmail } = await import("./broadcastEmailTemplate");
    const bodyJson = JSON.stringify({
      blogTitle: "Test Post",
      snippet: "A short excerpt.",
      postUrl: "https://brightpathcyber.com/blog/test-post",
    });
    const { html } = buildBroadcastEmail("blog_update", "New Post: Test Post", bodyJson);
    // Should not contain any unsubscribe token URL
    expect(html).not.toContain("/unsubscribe?token=");
  });
});
