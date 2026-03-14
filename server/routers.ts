import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import Stripe from "stripe";
import { getSessionCookieOptions } from "./_core/cookies";
import { ENV } from "./_core/env";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { getAllSubscribers, insertSubscriber, markEmailSent } from "./db";
import { sendChecklistEmail } from "./emailService";
import { PRODUCTS } from "./products";

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Stripe not configured" });
  return new Stripe(key);
}

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ── Email capture ──────────────────────────────────────────────────────────
  subscribe: router({
    signup: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required").max(255),
          email: z.string().email("Please enter a valid email address").max(320),
        })
      )
      .mutation(async ({ input }) => {
        const { name, email } = input;
        const { alreadyExists } = await insertSubscriber({ name, email });
        if (alreadyExists) {
          await sendChecklistEmail(email, name.split(" ")[0] || name);
          return { success: true, alreadySubscribed: true };
        }
        const emailResult = await sendChecklistEmail(email, name.split(" ")[0] || name);
        if (emailResult.success) {
          await markEmailSent(email);
        }
        return { success: true, alreadySubscribed: false };
      }),
  }),

  // ── Stripe Checkout ────────────────────────────────────────────────────────
  checkout: router({
    createEbookSession: publicProcedure
      .input(z.object({ origin: z.string().url() }))
      .mutation(async ({ input }) => {
        const stripe = getStripe();
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
          success_url: `${input.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${input.origin}/bright-path-cyber`,
        });

        if (!session.url) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create checkout session" });
        }

        return { url: session.url };
      }),
  }),

  // ── Admin ──────────────────────────────────────────────────────────────────
  admin: router({
    login: publicProcedure
      .input(z.object({ password: z.string() }))
      .mutation(({ input }) => {
        const expected = ENV.adminPassword;
        if (!expected) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Admin password not configured" });
        }
        if (input.password !== expected) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Incorrect password" });
        }
        return { success: true };
      }),

    listSubscribers: publicProcedure
      .input(z.object({ password: z.string() }))
      .query(async ({ input }) => {
        const expected = ENV.adminPassword;
        if (!expected || input.password !== expected) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Incorrect password" });
        }
        const rows = await getAllSubscribers();
        return {
          total: rows.length,
          subscribers: rows.map(r => ({
            id: r.id,
            name: r.name,
            email: r.email,
            createdAt: r.createdAt,
            emailSent: r.emailSent === 1,
          })),
        };
      }),

    exportCsv: publicProcedure
      .input(z.object({ password: z.string() }))
      .mutation(async ({ input }) => {
        const expected = ENV.adminPassword;
        if (!expected || input.password !== expected) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Incorrect password" });
        }
        const rows = await getAllSubscribers();
        const header = "id,name,email,signupDate,emailSent\n";
        const body = rows
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
      }),
  }),
});

export type AppRouter = typeof appRouter;
