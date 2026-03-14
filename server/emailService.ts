/**
 * Email service — sends checklist delivery emails via SendGrid
 * Falls back to a console log in development if SENDGRID_API_KEY is not set
 */

import sgMail from "@sendgrid/mail";
import { buildChecklistEmail } from "./emailTemplate";

const FROM_EMAIL = "info@brightpathcyber.com";
const FROM_NAME = "Bright Path Cyber";

function getSendGridClient(): typeof sgMail | null {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    console.warn("[Email] SENDGRID_API_KEY not set — email will not be sent");
    return null;
  }
  sgMail.setApiKey(apiKey);
  return sgMail;
}

export async function sendChecklistEmail(
  toEmail: string,
  toName: string,
  unsubscribeUrl?: string
): Promise<{ success: boolean; error?: string }> {
  const client = getSendGridClient();
  const { subject, html, text } = buildChecklistEmail(toName, unsubscribeUrl);

  if (!client) {
    // Dev mode — log what would be sent
    console.log("[Email] DEV MODE — would send:");
    console.log(`  To: ${toName} <${toEmail}>`);
    console.log(`  Subject: ${subject}`);
    return { success: true };
  }

  try {
    await client.send({
      to: { email: toEmail, name: toName },
      from: { email: FROM_EMAIL, name: FROM_NAME },
      replyTo: FROM_EMAIL,
      subject,
      html,
      text,
    });
    console.log(`[Email] Checklist sent to ${toEmail}`);
    return { success: true };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unknown SendGrid error";
    console.error("[Email] Failed to send:", message);
    return { success: false, error: message };
  }
}
