/**
 * Product definitions for Stripe checkout
 * Centralized product catalog for Bright Path Cyber
 */

export const PRODUCTS = {
  EBOOK_CLICK_WITH_CONFIDENCE: {
    name: "Click with Confidence",
    description:
      "A comprehensive e-book covering everything you need to stay safe online. Written in plain language with step-by-step guidance.",
    priceInCents: 2700, // $27.00
    currency: "usd",
    metadata: {
      productType: "ebook",
      slug: "click-with-confidence",
    },
  },
} as const;
