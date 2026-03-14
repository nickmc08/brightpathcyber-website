/**
 * Stripe Webhook Handler
 * Registered BEFORE express.json() to preserve raw body for signature verification
 * On checkout.session.completed: stores purchase in DB and sends e-book delivery email
 */

import type { Express } from "express";
import express from "express";
import Stripe from "stripe";
import sgMail from "@sendgrid/mail";
import { insertPurchase, markPurchaseEmailSent } from "./db";
import { buildEbookDeliveryEmail } from "./ebookEmailTemplate";
import { notifyNewPurchase } from "./notificationService";

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SK_LIVE ?? process.env.STRIPE_SECRET_KEY;
  if (!key) {
    console.warn("[Stripe] No Stripe secret key configured");
    return null;
  }
  return new Stripe(key);
}

async function sendEbookDeliveryEmail(customerEmail: string): Promise<boolean> {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    console.warn("[Email] SENDGRID_API_KEY not set, skipping e-book delivery email");
    return false;
  }

  sgMail.setApiKey(apiKey);
  const { subject, html, text } = buildEbookDeliveryEmail(customerEmail);

  try {
    await sgMail.send({
      to: customerEmail,
      from: { email: "info@brightpathcyber.com", name: "Bright Path Cyber" },
      replyTo: "info@brightpathcyber.com",
      subject,
      html,
      text,
    });
    console.log(`[Email] E-book delivery email sent to ${customerEmail}`);
    return true;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown SendGrid error";
    console.error("[Email] Failed to send e-book delivery email:", message);
    return false;
  }
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
          const customerEmail = session.customer_email || session.customer_details?.email || "";
          const amountTotal = session.amount_total || 0;
          const currency = session.currency || "usd";
          const productName = session.metadata?.slug
            ? "Click with Confidence"
            : "Click with Confidence";
          const productSlug = session.metadata?.slug || "click-with-confidence";

          console.log(
            `[Webhook] Checkout completed: ${session.id}`,
            `customer_email=${customerEmail}`,
            `amount=${amountTotal}`,
            `metadata=${JSON.stringify(session.metadata)}`
          );

          // Store purchase in database
          try {
            await insertPurchase({
              stripeSessionId: session.id,
              customerEmail,
              amountTotal,
              currency,
              productName,
              productSlug,
              paymentStatus: session.payment_status || "paid",
            });
            console.log(`[Webhook] Purchase stored for session ${session.id}`);
          } catch (err) {
            console.error("[Webhook] Failed to store purchase:", err);
          }

          // Send e-book delivery email
          if (customerEmail) {
            const emailSent = await sendEbookDeliveryEmail(customerEmail);
            if (emailSent) {
              try {
                await markPurchaseEmailSent(session.id);
              } catch (err) {
                console.error("[Webhook] Failed to mark email as sent:", err);
              }
            }
          }

          // Notify sales team about new purchase (fire and forget)
          notifyNewPurchase(
            customerEmail,
            amountTotal,
            currency,
            productName
          ).catch(err =>
            console.error("[Notification] Background purchase alert failed:", err)
          );

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
