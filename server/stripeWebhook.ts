/**
 * Stripe Webhook Handler
 * Registered BEFORE express.json() to preserve raw body for signature verification
 */

import type { Express } from "express";
import express from "express";
import Stripe from "stripe";

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SK_LIVE ?? process.env.STRIPE_SECRET_KEY;
  if (!key) {
    console.warn("[Stripe] No Stripe secret key configured");
    return null;
  }
  return new Stripe(key);
}

export function registerStripeWebhook(app: Express) {
  app.post(
    "/api/stripe/webhook",
    express.raw({ type: "application/json" }),
    async (req, res) => {
      const stripe = getStripe();
      if (!stripe) {
        return res.status(500).json({ error: "Stripe not configured" });
      }

      const sig = req.headers["stripe-signature"] as string | undefined;
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

      let event: Stripe.Event;

      try {
        if (webhookSecret && sig) {
          event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
        } else {
          event = JSON.parse(req.body.toString()) as Stripe.Event;
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error("[Webhook] Signature verification failed:", message);
        return res.status(400).json({ error: `Webhook Error: ${message}` });
      }

      // Handle test events
      if (event.id.startsWith("evt_test_")) {
        console.log("[Webhook] Test event detected, returning verification response");
        return res.json({ verified: true });
      }

      // Handle specific event types
      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object as Stripe.Checkout.Session;
          console.log(
            `[Webhook] Checkout completed: ${session.id}`,
            `customer_email=${session.customer_email}`,
            `amount=${session.amount_total}`,
            `metadata=${JSON.stringify(session.metadata)}`
          );
          // E-book delivery would happen here (e.g., send download link via email)
          break;
        }

        case "payment_intent.succeeded": {
          const pi = event.data.object as Stripe.PaymentIntent;
          console.log(`[Webhook] Payment succeeded: ${pi.id} amount=${pi.amount}`);
          break;
        }

        default:
          console.log(`[Webhook] Unhandled event type: ${event.type}`);
      }

      res.json({ received: true });
    }
  );
}
