/**
 * Notification Service
 * Sends alert emails to sales@brightpathcyber.com when:
 * - A new subscriber signs up for the free checklist
 * - A customer purchases the e-book via Stripe
 * No em dashes, no emojis.
 */

import sgMail from "@sendgrid/mail";

const SALES_EMAIL = "sales@brightpathcyber.com";
const FROM_EMAIL = "info@brightpathcyber.com";
const FROM_NAME = "Bright Path Cyber";
const SITE_URL = "https://brightpathcyber.com";

function getSendGridClient(): typeof sgMail | null {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    console.warn("[Notification] SENDGRID_API_KEY not set, skipping notification");
    return null;
  }
  sgMail.setApiKey(apiKey);
  return sgMail;
}

/**
 * Notify sales team about a new checklist subscriber.
 */
export async function notifyNewSubscriber(
  subscriberName: string,
  subscriberEmail: string
): Promise<boolean> {
  const client = getSendGridClient();
  if (!client) {
    console.log(`[Notification] DEV MODE - New subscriber: ${subscriberName} <${subscriberEmail}>`);
    return false;
  }

  const subject = `New Subscriber: ${subscriberName}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="margin:0; padding:0; background-color:#F5F0E8; font-family:'DM Sans',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F0E8;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px; width:100%; background-color:#FFFFFF; border:1px solid rgba(201,168,76,0.2); border-radius:4px; overflow:hidden;">
          <tr>
            <td style="padding:24px 32px 16px; border-bottom:2px solid #C9A84C;">
              <span style="font-family:Georgia,'Times New Roman',serif; font-size:18px; font-weight:700; color:#1A1A1A;">New Checklist Subscriber</span>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 16px; font-size:15px; line-height:1.6; color:#1A1A1A;">
                Someone just signed up for the free Personal Security Audit Checklist.
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:20px; width:100%;">
                <tr>
                  <td style="padding:10px 16px; background-color:#F5F0E8; border-radius:4px;">
                    <p style="margin:0 0 4px; font-size:13px; color:#888;">Name</p>
                    <p style="margin:0; font-size:15px; font-weight:600; color:#1A1A1A;">${subscriberName}</p>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>
                <tr>
                  <td style="padding:10px 16px; background-color:#F5F0E8; border-radius:4px;">
                    <p style="margin:0 0 4px; font-size:13px; color:#888;">Email</p>
                    <p style="margin:0; font-size:15px; font-weight:600; color:#1A1A1A;">
                      <a href="mailto:${subscriberEmail}" style="color:#C9A84C; text-decoration:none;">${subscriberEmail}</a>
                    </p>
                  </td>
                </tr>
              </table>
              <p style="margin:0; font-size:13px; color:#888;">
                View all subscribers at <a href="${SITE_URL}/admin" style="color:#C9A84C; text-decoration:none;">${SITE_URL}/admin</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `New Checklist Subscriber

Name: ${subscriberName}
Email: ${subscriberEmail}

View all subscribers at ${SITE_URL}/admin

---
Bright Path Cyber`;

  try {
    await client.send({
      to: SALES_EMAIL,
      from: { email: FROM_EMAIL, name: FROM_NAME },
      subject,
      html,
      text,
    });
    console.log(`[Notification] New subscriber alert sent to ${SALES_EMAIL} for ${subscriberEmail}`);
    return true;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[Notification] Failed to send subscriber alert:", message);
    return false;
  }
}

/**
 * Notify sales team about a new e-book purchase.
 */
export async function notifyNewPurchase(
  customerEmail: string,
  amountTotal: number,
  currency: string,
  productName: string
): Promise<boolean> {
  const client = getSendGridClient();
  if (!client) {
    console.log(`[Notification] DEV MODE - New purchase: ${customerEmail} bought ${productName}`);
    return false;
  }

  const formattedAmount = `$${(amountTotal / 100).toFixed(2)} ${currency.toUpperCase()}`;
  const subject = `New Purchase: ${productName} - ${formattedAmount}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="margin:0; padding:0; background-color:#F5F0E8; font-family:'DM Sans',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F0E8;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px; width:100%; background-color:#FFFFFF; border:1px solid rgba(201,168,76,0.2); border-radius:4px; overflow:hidden;">
          <tr>
            <td style="padding:24px 32px 16px; border-bottom:2px solid #C9A84C;">
              <span style="font-family:Georgia,'Times New Roman',serif; font-size:18px; font-weight:700; color:#1A1A1A;">New E-book Purchase</span>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 16px; font-size:15px; line-height:1.6; color:#1A1A1A;">
                A customer just purchased the e-book.
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:20px; width:100%;">
                <tr>
                  <td style="padding:10px 16px; background-color:#F5F0E8; border-radius:4px;">
                    <p style="margin:0 0 4px; font-size:13px; color:#888;">Customer Email</p>
                    <p style="margin:0; font-size:15px; font-weight:600; color:#1A1A1A;">
                      <a href="mailto:${customerEmail}" style="color:#C9A84C; text-decoration:none;">${customerEmail}</a>
                    </p>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>
                <tr>
                  <td style="padding:10px 16px; background-color:#F5F0E8; border-radius:4px;">
                    <p style="margin:0 0 4px; font-size:13px; color:#888;">Product</p>
                    <p style="margin:0; font-size:15px; font-weight:600; color:#1A1A1A;">${productName}</p>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>
                <tr>
                  <td style="padding:10px 16px; background-color:#F5F0E8; border-radius:4px;">
                    <p style="margin:0 0 4px; font-size:13px; color:#888;">Amount</p>
                    <p style="margin:0; font-size:15px; font-weight:700; color:#2e7d32;">${formattedAmount}</p>
                  </td>
                </tr>
              </table>
              <p style="margin:0; font-size:13px; color:#888;">
                View all purchases at <a href="${SITE_URL}/admin" style="color:#C9A84C; text-decoration:none;">${SITE_URL}/admin</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `New E-book Purchase

Customer Email: ${customerEmail}
Product: ${productName}
Amount: ${formattedAmount}

View all purchases at ${SITE_URL}/admin

---
Bright Path Cyber`;

  try {
    await client.send({
      to: SALES_EMAIL,
      from: { email: FROM_EMAIL, name: FROM_NAME },
      subject,
      html,
      text,
    });
    console.log(`[Notification] Purchase alert sent to ${SALES_EMAIL} for ${customerEmail}`);
    return true;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[Notification] Failed to send purchase alert:", message);
    return false;
  }
}
