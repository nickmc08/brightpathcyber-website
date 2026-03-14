import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock SendGrid - factory must not reference outer variables (hoisting)
vi.mock("@sendgrid/mail", () => {
  const send = vi.fn().mockResolvedValue([{ statusCode: 202 }]);
  return {
    default: {
      setApiKey: vi.fn(),
      send,
    },
  };
});

// Set env before import
process.env.SENDGRID_API_KEY = "SG.test-key";

import sgMail from "@sendgrid/mail";
import { notifyNewSubscriber, notifyNewPurchase } from "./notificationService";

const mockSend = sgMail.send as ReturnType<typeof vi.fn>;

describe("Notification Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSend.mockResolvedValue([{ statusCode: 202 }]);
  });

  describe("notifyNewSubscriber", () => {
    it("sends a notification email to sales@brightpathcyber.com", async () => {
      const result = await notifyNewSubscriber("Jane Doe", "jane@example.com");
      expect(result).toBe(true);
      expect(mockSend).toHaveBeenCalledOnce();

      const sentMsg = mockSend.mock.calls[0][0];
      expect(sentMsg.to).toBe("sales@brightpathcyber.com");
      expect(sentMsg.from.email).toBe("info@brightpathcyber.com");
      expect(sentMsg.subject).toContain("Jane Doe");
    });

    it("includes subscriber name and email in the email body", async () => {
      await notifyNewSubscriber("John Smith", "john@example.com");
      const sentMsg = mockSend.mock.calls[0][0];
      expect(sentMsg.html).toContain("John Smith");
      expect(sentMsg.html).toContain("john@example.com");
      expect(sentMsg.text).toContain("John Smith");
      expect(sentMsg.text).toContain("john@example.com");
    });

    it("returns false if SendGrid send fails", async () => {
      mockSend.mockRejectedValueOnce(new Error("SendGrid error"));
      const result = await notifyNewSubscriber("Test", "test@example.com");
      expect(result).toBe(false);
    });
  });

  describe("notifyNewPurchase", () => {
    it("sends a purchase notification to sales@brightpathcyber.com", async () => {
      const result = await notifyNewPurchase("buyer@example.com", 2700, "usd", "Click with Confidence");
      expect(result).toBe(true);
      expect(mockSend).toHaveBeenCalledOnce();

      const sentMsg = mockSend.mock.calls[0][0];
      expect(sentMsg.to).toBe("sales@brightpathcyber.com");
      expect(sentMsg.subject).toContain("Click with Confidence");
      expect(sentMsg.subject).toContain("$27.00");
    });

    it("includes customer email, product name, and formatted amount in the body", async () => {
      await notifyNewPurchase("buyer@example.com", 2700, "usd", "Click with Confidence");
      const sentMsg = mockSend.mock.calls[0][0];
      expect(sentMsg.html).toContain("buyer@example.com");
      expect(sentMsg.html).toContain("Click with Confidence");
      expect(sentMsg.html).toContain("$27.00 USD");
      expect(sentMsg.text).toContain("buyer@example.com");
      expect(sentMsg.text).toContain("$27.00 USD");
    });

    it("returns false if SendGrid send fails", async () => {
      mockSend.mockRejectedValueOnce(new Error("SendGrid error"));
      const result = await notifyNewPurchase("buyer@example.com", 2700, "usd", "Click with Confidence");
      expect(result).toBe(false);
    });
  });
});
