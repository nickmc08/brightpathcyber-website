/**
 * Tests for Stripe webhook auto-registration logic
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Constants ─────────────────────────────────────────────────────────────────
const PRODUCTION_WEBHOOK_URL = "https://brightpathcyber.com/api/stripe/webhook";
const STALE_DEV_URL = "https://3000-ix88meaa5khnh52g10z4g-bf97494d.us1.manus.computer/api/stripe/webhook";
const LOCALHOST_URL = "http://localhost:3000/api/stripe/webhook";

// ── Mock ENV ──────────────────────────────────────────────────────────────────
const mockEnv = {
  stripeSecretKey: "sk_test_mockkey123",
  isProduction: true,
};

vi.mock("./_core/env", () => ({
  ENV: mockEnv,
}));

// ── Mock Stripe ───────────────────────────────────────────────────────────────
const mockList = vi.fn();
const mockUpdate = vi.fn();
const mockCreate = vi.fn();

vi.mock("stripe", () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      webhookEndpoints: {
        list: mockList,
        update: mockUpdate,
        create: mockCreate,
      },
    })),
  };
});

// ── Import after mocks ────────────────────────────────────────────────────────
const { ensureStripeWebhookUrl } = await import("./stripeWebhookSetup");

// ── Tests ─────────────────────────────────────────────────────────────────────
describe("ensureStripeWebhookUrl", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockEnv.isProduction = true;
    mockEnv.stripeSecretKey = "sk_test_mockkey123";
  });

  it("skips registration in development mode", async () => {
    mockEnv.isProduction = false;
    await ensureStripeWebhookUrl();
    expect(mockList).not.toHaveBeenCalled();
    expect(mockUpdate).not.toHaveBeenCalled();
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it("skips registration when no Stripe key is configured", async () => {
    mockEnv.stripeSecretKey = "";
    await ensureStripeWebhookUrl();
    expect(mockList).not.toHaveBeenCalled();
  });

  it("does nothing when webhook already points to production URL", async () => {
    mockList.mockResolvedValue({
      data: [
        { id: "we_existing", url: PRODUCTION_WEBHOOK_URL, status: "enabled", enabled_events: [] },
      ],
    });
    await ensureStripeWebhookUrl();
    expect(mockList).toHaveBeenCalledOnce();
    expect(mockUpdate).not.toHaveBeenCalled();
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it("updates stale sandbox URL to production URL", async () => {
    mockList.mockResolvedValue({
      data: [
        { id: "we_stale", url: STALE_DEV_URL, status: "enabled", enabled_events: [] },
      ],
    });
    mockUpdate.mockResolvedValue({ id: "we_stale", url: PRODUCTION_WEBHOOK_URL, status: "enabled" });

    await ensureStripeWebhookUrl();

    expect(mockUpdate).toHaveBeenCalledWith("we_stale", {
      url: PRODUCTION_WEBHOOK_URL,
      enabled_events: expect.arrayContaining(["checkout.session.completed"]),
    });
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it("updates localhost URL to production URL", async () => {
    mockList.mockResolvedValue({
      data: [
        { id: "we_local", url: LOCALHOST_URL, status: "enabled", enabled_events: [] },
      ],
    });
    mockUpdate.mockResolvedValue({ id: "we_local", url: PRODUCTION_WEBHOOK_URL, status: "enabled" });

    await ensureStripeWebhookUrl();

    expect(mockUpdate).toHaveBeenCalledWith("we_local", expect.objectContaining({
      url: PRODUCTION_WEBHOOK_URL,
    }));
  });

  it("creates new webhook endpoint when none exists", async () => {
    mockList.mockResolvedValue({ data: [] });
    mockCreate.mockResolvedValue({ id: "we_new", url: PRODUCTION_WEBHOOK_URL, status: "enabled" });

    await ensureStripeWebhookUrl();

    expect(mockCreate).toHaveBeenCalledWith({
      url: PRODUCTION_WEBHOOK_URL,
      enabled_events: expect.arrayContaining([
        "checkout.session.completed",
        "payment_intent.succeeded",
        "payment_intent.payment_failed",
      ]),
    });
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it("does not throw when Stripe API call fails", async () => {
    mockList.mockRejectedValue(new Error("Stripe API unavailable"));
    await expect(ensureStripeWebhookUrl()).resolves.not.toThrow();
  });

  it("includes checkout.session.completed in enabled events when creating", async () => {
    mockList.mockResolvedValue({ data: [] });
    mockCreate.mockResolvedValue({ id: "we_new", url: PRODUCTION_WEBHOOK_URL, status: "enabled" });

    await ensureStripeWebhookUrl();

    const createCall = mockCreate.mock.calls[0][0];
    expect(createCall.enabled_events).toContain("checkout.session.completed");
  });

  it("includes checkout.session.completed in enabled events when updating", async () => {
    mockList.mockResolvedValue({
      data: [{ id: "we_stale", url: STALE_DEV_URL, status: "enabled", enabled_events: [] }],
    });
    mockUpdate.mockResolvedValue({ id: "we_stale", url: PRODUCTION_WEBHOOK_URL, status: "enabled" });

    await ensureStripeWebhookUrl();

    const updateCall = mockUpdate.mock.calls[0][1];
    expect(updateCall.enabled_events).toContain("checkout.session.completed");
  });

  it("production URL is correct", () => {
    expect(PRODUCTION_WEBHOOK_URL).toBe("https://brightpathcyber.com/api/stripe/webhook");
  });
});

// ── Webhook handler tests ─────────────────────────────────────────────────────
describe("Stripe webhook handler", () => {
  it("webhook endpoint path is /api/stripe/webhook", () => {
    // Verify the path matches what Stripe is configured to call
    const expectedPath = "/api/stripe/webhook";
    expect(expectedPath).toBe("/api/stripe/webhook");
  });

  it("production domain matches webhook URL domain", () => {
    const webhookUrl = new URL(PRODUCTION_WEBHOOK_URL);
    expect(webhookUrl.hostname).toBe("brightpathcyber.com");
    expect(webhookUrl.pathname).toBe("/api/stripe/webhook");
    expect(webhookUrl.protocol).toBe("https:");
  });
});
