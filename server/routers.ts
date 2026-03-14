import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import Stripe from "stripe";
import { getSessionCookieOptions } from "./_core/cookies";
import { ENV } from "./_core/env";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { getAllSubscribers, insertSubscriber, markEmailSent, getAllPurchases, insertBroadcast, getAllBroadcasts, getBroadcastById, markBroadcastSending, updateBroadcastAfterSend, markBroadcastFailed } from "./db";
import { sendChecklistEmail } from "./emailService";
import { notifyNewSubscriber } from "./notificationService";
import { PRODUCTS } from "./products";
import { buildBroadcastEmail } from "./broadcastEmailTemplate";
import sgMail from "@sendgrid/mail";

function getStripe(): Stripe {
  const key = ENV.stripeSecretKey;
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
        // Notify sales team about new subscriber (fire and forget)
        notifyNewSubscriber(name, email).catch(err =>
          console.error("[Notification] Background subscriber alert failed:", err)
        );
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

    listPurchases: publicProcedure
      .input(z.object({ password: z.string() }))
      .query(async ({ input }) => {
        const expected = ENV.adminPassword;
        if (!expected || input.password !== expected) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Incorrect password" });
        }
        const rows = await getAllPurchases();
        const totalRevenue = rows.reduce((sum, r) => sum + r.amountTotal, 0);
        return {
          total: rows.length,
          totalRevenue,
          purchases: rows.map(r => ({
            id: r.id,
            stripeSessionId: r.stripeSessionId,
            customerEmail: r.customerEmail,
            amountTotal: r.amountTotal,
            currency: r.currency,
            productName: r.productName,
            paymentStatus: r.paymentStatus,
            emailSent: r.emailSent === 1,
            createdAt: r.createdAt,
          })),
        };
      }),

    // ---- Broadcast endpoints ------------------------------------------------

    previewBroadcast: publicProcedure
      .input(z.object({
        password: z.string(),
        templateType: z.enum(["blog_update", "course_launch", "custom"]),
        subject: z.string().min(1),
        bodyJson: z.string(),
      }))
      .mutation(({ input }) => {
        const expected = ENV.adminPassword;
        if (!expected || input.password !== expected) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Incorrect password" });
        }
        const { subject, html, text } = buildBroadcastEmail(input.templateType, input.subject, input.bodyJson);
        return { subject, html, text };
      }),

    createBroadcast: publicProcedure
      .input(z.object({
        password: z.string(),
        templateType: z.enum(["blog_update", "course_launch", "custom"]),
        subject: z.string().min(1).max(500),
        bodyJson: z.string(),
        scheduledAt: z.date().optional(),
      }))
      .mutation(async ({ input }) => {
        const expected = ENV.adminPassword;
        if (!expected || input.password !== expected) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Incorrect password" });
        }
        const { html } = buildBroadcastEmail(input.templateType, input.subject, input.bodyJson);
        const id = await insertBroadcast({
          subject: input.subject,
          templateType: input.templateType,
          bodyJson: input.bodyJson,
          htmlBody: html,
          status: input.scheduledAt ? "scheduled" : "draft",
          scheduledAt: input.scheduledAt ?? null,
        });
        return { id };
      }),

    sendBroadcast: publicProcedure
      .input(z.object({
        password: z.string(),
        broadcastId: z.number().int().positive(),
      }))
      .mutation(async ({ input }) => {
        const expected = ENV.adminPassword;
        if (!expected || input.password !== expected) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Incorrect password" });
        }

        const broadcast = await getBroadcastById(input.broadcastId);
        if (!broadcast) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Broadcast not found" });
        }
        if (broadcast.status === "sent" || broadcast.status === "sending") {
          throw new TRPCError({ code: "BAD_REQUEST", message: `Broadcast is already ${broadcast.status}` });
        }

        const allSubscribers = await getAllSubscribers();
        if (allSubscribers.length === 0) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "No subscribers to send to" });
        }

        await markBroadcastSending(input.broadcastId, allSubscribers.length);

        const apiKey = ENV.sendgridApiKey;
        if (!apiKey) {
          await markBroadcastFailed(input.broadcastId);
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "SendGrid not configured" });
        }
        sgMail.setApiKey(apiKey);

        // Rebuild email from stored data
        const { subject, html, text } = buildBroadcastEmail(
          broadcast.templateType as "blog_update" | "course_launch" | "custom",
          broadcast.subject,
          broadcast.bodyJson
        );

        let sentCount = 0;
        let failedCount = 0;

        // Send individually to each subscriber for reliable delivery
        for (const sub of allSubscribers) {
          try {
            await sgMail.send({
              to: sub.email,
              from: { email: "info@brightpathcyber.com", name: "Bright Path Cyber" },
              subject,
              html,
              text,
            });
            sentCount++;
            console.log(`[Broadcast] Sent to ${sub.email}`);
          } catch (err: unknown) {
            failedCount++;
            const errMsg = err instanceof Error ? err.message : String(err);
            console.error(`[Broadcast] Failed to send to ${sub.email}:`, errMsg);
            // Log SendGrid response body if available
            if (err && typeof err === 'object' && 'response' in err) {
              const sgErr = err as { response?: { body?: unknown } };
              console.error(`[Broadcast] SendGrid response:`, JSON.stringify(sgErr.response?.body));
            }
          }
        }

        await updateBroadcastAfterSend(input.broadcastId, sentCount, failedCount);
        return { sentCount, failedCount, total: allSubscribers.length };
      }),

    listBroadcasts: publicProcedure
      .input(z.object({ password: z.string() }))
      .query(async ({ input }) => {
        const expected = ENV.adminPassword;
        if (!expected || input.password !== expected) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Incorrect password" });
        }
        const rows = await getAllBroadcasts();
        return {
          total: rows.length,
          broadcasts: rows.map(r => ({
            id: r.id,
            subject: r.subject,
            templateType: r.templateType,
            status: r.status,
            recipientCount: r.recipientCount,
            sentCount: r.sentCount,
            failedCount: r.failedCount,
            scheduledAt: r.scheduledAt,
            sentAt: r.sentAt,
            createdAt: r.createdAt,
          })),
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
