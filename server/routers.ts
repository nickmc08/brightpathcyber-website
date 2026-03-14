import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { getAllSubscribers, insertSubscriber, markEmailSent } from "./db";
import { sendChecklistEmail } from "./emailService";

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
    /**
     * Public endpoint: accepts name + email, stores subscriber, sends checklist email.
     * Returns success even if already subscribed (avoids email enumeration).
     */
    signup: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required").max(255),
          email: z.string().email("Please enter a valid email address").max(320),
        })
      )
      .mutation(async ({ input }) => {
        const { name, email } = input;

        // Insert into DB — gracefully handles duplicate emails
        const { alreadyExists } = await insertSubscriber({ name, email });

        if (alreadyExists) {
          // Still send the email so they get the checklist even if they re-subscribe
          await sendChecklistEmail(email, name.split(" ")[0] || name);
          return { success: true, alreadySubscribed: true };
        }

        // Send the checklist email
        const emailResult = await sendChecklistEmail(email, name.split(" ")[0] || name);

        if (emailResult.success) {
          await markEmailSent(email);
        }

        return { success: true, alreadySubscribed: false };
      }),

    /**
     * Protected endpoint (owner only): export all subscribers as CSV.
     */
    exportCsv: protectedProcedure
      .mutation(async ({ ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
        }

        const rows = await getAllSubscribers();

        const header = "id,name,email,createdAt,emailSent,emailSentAt\n";
        const body = rows
          .map(r => {
            const sentAt = r.emailSentAt
              ? r.emailSentAt.toISOString()
              : "";
            return [
              r.id,
              `"${r.name.replace(/"/g, '""')}"`,
              `"${r.email}"`,
              r.createdAt.toISOString(),
              r.emailSent,
              sentAt,
            ].join(",");
          })
          .join("\n");

        return { csv: header + body, count: rows.length };
      }),

    /**
     * Protected endpoint: get subscriber count and recent signups.
     */
    stats: protectedProcedure
      .query(async ({ ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
        }

        const rows = await getAllSubscribers();
        const recent = rows
          .slice(-10)
          .reverse()
          .map(r => ({
            id: r.id,
            name: r.name,
            email: r.email,
            createdAt: r.createdAt,
            emailSent: r.emailSent === 1,
          }));

        return { total: rows.length, recent };
      }),
  }),
});

export type AppRouter = typeof appRouter;
