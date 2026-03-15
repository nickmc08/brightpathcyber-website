/**
 * Stripe Webhook Auto-Registration
 *
 * On production startup, this module ensures the Stripe webhook endpoint URL
 * is always pointing to the current deployment's production domain.
 *
 * This solves the problem where the webhook URL gets stale after redeployments
 * because the underlying server URL changes with each deployment.
 */

import Stripe from "stripe";
import { ENV } from "./_core/env";

const PRODUCTION_WEBHOOK_URL = "https://brightpathcyber.com/api/stripe/webhook";
const WEBHOOK_EVENTS: Stripe.WebhookEndpointUpdateParams.EnabledEvent[] = [
  "checkout.session.completed",
  "payment_intent.succeeded",
  "payment_intent.payment_failed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
];

function getStripe(): Stripe | null {
  const key = ENV.stripeSecretKey;
  if (!key) return null;
  return new Stripe(key);
}

/**
 * Ensures the Stripe webhook endpoint is pointing to the production domain.
 * - If an existing webhook points to the dev sandbox URL, update it.
 * - If no webhook exists, create one.
 * - Logs the result but never throws (non-critical startup task).
 */
export async function ensureStripeWebhookUrl(): Promise<void> {
  if (!ENV.isProduction) {
    console.log("[Stripe] Skipping webhook auto-registration in development mode");
    return;
  }

  const stripe = getStripe();
  if (!stripe) {
    console.warn("[Stripe] No Stripe key configured, skipping webhook auto-registration");
    return;
  }

  try {
    const { data: endpoints } = await stripe.webhookEndpoints.list({ limit: 20 });

    // Find an existing endpoint that either already points to production
    // or points to a stale dev/sandbox URL
    const productionEndpoint = endpoints.find(e => e.url === PRODUCTION_WEBHOOK_URL);
    const staleEndpoint = endpoints.find(
      e => e.url !== PRODUCTION_WEBHOOK_URL && (
        e.url.includes("manus.computer") ||
        e.url.includes("localhost") ||
        e.url.includes("127.0.0.1")
      )
    );

    if (productionEndpoint) {
      console.log(`[Stripe] Webhook already pointing to production: ${productionEndpoint.url} (${productionEndpoint.id})`);
      return;
    }

    if (staleEndpoint) {
      // Update the stale endpoint to point to production
      const updated = await stripe.webhookEndpoints.update(staleEndpoint.id, {
        url: PRODUCTION_WEBHOOK_URL,
        enabled_events: WEBHOOK_EVENTS,
      });
      console.log(`[Stripe] Updated webhook endpoint from ${staleEndpoint.url} to ${updated.url} (${updated.id})`);
      return;
    }

    // No existing endpoint found - create a new one
    const created = await stripe.webhookEndpoints.create({
      url: PRODUCTION_WEBHOOK_URL,
      enabled_events: WEBHOOK_EVENTS,
    });
    console.log(`[Stripe] Created new webhook endpoint: ${created.url} (${created.id})`);
    console.warn("[Stripe] IMPORTANT: Update STRIPE_WEBHOOK_SECRET in Settings -> Payment with the new webhook signing secret");

  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[Stripe] Failed to auto-register webhook:", message);
    // Non-fatal: server continues to start even if this fails
  }
}
