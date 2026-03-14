/**
 * Tests for admin purchases endpoint and e-book delivery email template
 */
import { describe, it, expect, vi } from "vitest";
import { buildEbookDeliveryEmail } from "./ebookEmailTemplate";

describe("admin.listPurchases", () => {
  it("rejects with wrong password", async () => {
    // Import the router dynamically to get the caller
    const { appRouter } = await import("./routers");
    const caller = appRouter.createCaller({ user: null, req: {} as any, res: {} as any });

    await expect(
      caller.admin.listPurchases({ password: "wrong-password" })
    ).rejects.toThrow();
  });

  it("returns purchase data structure with correct fields", async () => {
    const { appRouter } = await import("./routers");
    const adminPw = process.env.ADMIN_PASSWORD;
    if (!adminPw) {
      console.warn("ADMIN_PASSWORD not set, skipping live test");
      return;
    }

    const caller = appRouter.createCaller({ user: null, req: {} as any, res: {} as any });
    const result = await caller.admin.listPurchases({ password: adminPw });

    expect(result).toHaveProperty("total");
    expect(result).toHaveProperty("totalRevenue");
    expect(result).toHaveProperty("purchases");
    expect(typeof result.total).toBe("number");
    expect(typeof result.totalRevenue).toBe("number");
    expect(Array.isArray(result.purchases)).toBe(true);
  });
});

describe("buildEbookDeliveryEmail", () => {
  it("returns subject, html, and text fields", () => {
    const result = buildEbookDeliveryEmail("test@example.com");

    expect(result).toHaveProperty("subject");
    expect(result).toHaveProperty("html");
    expect(result).toHaveProperty("text");
    expect(typeof result.subject).toBe("string");
    expect(typeof result.html).toBe("string");
    expect(typeof result.text).toBe("string");
  });

  it("includes the customer email in the email body", () => {
    const email = "buyer@example.com";
    const result = buildEbookDeliveryEmail(email);

    expect(result.html).toContain(email);
    expect(result.text).toContain(email);
  });

  it("includes Click with Confidence in the subject", () => {
    const result = buildEbookDeliveryEmail("test@example.com");
    expect(result.subject).toContain("Click with Confidence");
  });

  it("includes download link in the email", () => {
    const result = buildEbookDeliveryEmail("test@example.com");
    expect(result.html).toContain("Download");
    expect(result.text).toContain("download");
  });

  it("includes branded elements (Bright Path Cyber)", () => {
    const result = buildEbookDeliveryEmail("test@example.com");
    expect(result.html).toContain("Bright Path Cyber");
    expect(result.html).toContain("#C9A84C"); // brass gold color
  });
});
