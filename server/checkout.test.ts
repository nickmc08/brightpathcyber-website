/**
 * Tests for the Stripe checkout logic
 * Uses the same helper-function testing approach as admin.test.ts
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Mock Stripe ──────────────────────────────────────────────────────────────
const mockCreate = vi.fn();
vi.mock("stripe", () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      checkout: {
        sessions: {
          create: mockCreate,
        },
      },
    })),
  };
});

// Set env before importing
process.env.STRIPE_SECRET_KEY = "sk_test_fake_key";

import { PRODUCTS } from "./products";

// ── Helper: simulate checkout.createEbookSession logic ───────────────────────
async function createEbookSession(origin: string) {
  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe("sk_test_fake_key");
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
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/bright-path-cyber`,
  });

  if (!session.url) {
    throw new Error("Failed to create checkout session");
  }

  return { url: session.url };
}

// ── Tests ────────────────────────────────────────────────────────────────────
describe("checkout.createEbookSession", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a checkout session and returns the URL", async () => {
    const fakeUrl = "https://checkout.stripe.com/c/pay_test_123";
    mockCreate.mockResolvedValueOnce({ url: fakeUrl });

    const result = await createEbookSession("https://brightpathcyber.com");

    expect(result.url).toBe(fakeUrl);
    expect(mockCreate).toHaveBeenCalledOnce();

    const createArgs = mockCreate.mock.calls[0][0];
    expect(createArgs.mode).toBe("payment");
    expect(createArgs.line_items).toHaveLength(1);
    expect(createArgs.line_items[0].price_data.unit_amount).toBe(2700);
    expect(createArgs.line_items[0].price_data.currency).toBe("usd");
    expect(createArgs.line_items[0].price_data.product_data.name).toBe("Click with Confidence");
    expect(createArgs.success_url).toContain("https://brightpathcyber.com/checkout/success");
    expect(createArgs.cancel_url).toBe("https://brightpathcyber.com/bright-path-cyber");
    expect(createArgs.allow_promotion_codes).toBe(true);
  });

  it("throws if Stripe returns no URL", async () => {
    mockCreate.mockResolvedValueOnce({ url: null });

    await expect(
      createEbookSession("https://brightpathcyber.com")
    ).rejects.toThrow("Failed to create checkout session");
  });

  it("passes correct product metadata", async () => {
    mockCreate.mockResolvedValueOnce({ url: "https://checkout.stripe.com/test" });

    await createEbookSession("https://example.com");

    const createArgs = mockCreate.mock.calls[0][0];
    expect(createArgs.metadata.productType).toBe("ebook");
    expect(createArgs.metadata.slug).toBe("click-with-confidence");
  });
});

describe("PRODUCTS", () => {
  it("has correct e-book pricing", () => {
    const ebook = PRODUCTS.EBOOK_CLICK_WITH_CONFIDENCE;
    expect(ebook.priceInCents).toBe(2700);
    expect(ebook.currency).toBe("usd");
    expect(ebook.name).toBe("Click with Confidence");
  });
});
