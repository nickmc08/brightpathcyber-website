/**
 * Bright Path Cyber - E-book Delivery Email Template
 * Sent after a successful Stripe checkout for "Click with Confidence"
 * Design: ivory background, brass gold accents, Playfair Display headings
 */

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663415118379/JXjpt8aqftuhQ9n25h55pn/BPC_Shield_Logo_v2_2958d9ed.png";

// TODO: Replace with actual e-book PDF download URL once uploaded
const EBOOK_DOWNLOAD_URL =
  "https://brightpathcyber.com/downloads/click-with-confidence";

export function buildEbookDeliveryEmail(customerEmail: string): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = "Your E-book Is Ready: Click with Confidence";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
  <!--[if mso]>
  <noscript>
    <xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
  </noscript>
  <![endif]-->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap');
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; display: block; }
    * { box-sizing: border-box; }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #F0EBE1; font-family: 'DM Sans', Arial, sans-serif;">

  <!-- Email wrapper -->
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F0EBE1; padding: 40px 16px;">
    <tr>
      <td align="center">
        <!-- Main card -->
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; width: 100%; background-color: #FDFAF5; border-radius: 6px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header bar with brass gold -->
          <tr>
            <td style="background-color: #C9A84C; height: 4px; font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

          <!-- Logo area -->
          <tr>
            <td align="center" style="padding: 36px 40px 28px; background-color: #1A1A1A;">
              <img
                src="${LOGO_URL}"
                alt="Bright Path Cyber"
                width="64"
                style="width: 64px; max-width: 64px; height: auto; display: block; margin: 0 auto;"
              />
            </td>
          </tr>

          <!-- Thin brass rule under logo -->
          <tr>
            <td style="background-color: #C9A84C; height: 2px; font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

          <!-- Main content -->
          <tr>
            <td style="padding: 48px 48px 40px; background-color: #FDFAF5;">

              <!-- Badge -->
              <p style="margin: 0 0 8px; font-family: 'DM Sans', Arial, sans-serif; font-size: 13px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #C9A84C;">
                Purchase confirmed
              </p>
              <h1 style="margin: 0 0 24px; font-family: 'Playfair Display', Georgia, serif; font-size: 32px; font-weight: 700; line-height: 1.2; color: #1A1A1A;">
                Your e-book is<br />
                <span style="color: #C9A84C;">ready to download</span>
              </h1>

              <p style="margin: 0 0 20px; font-family: 'DM Sans', Arial, sans-serif; font-size: 16px; line-height: 1.7; color: #4A4A4A;">
                Thank you for purchasing <strong>Click with Confidence</strong>. Your comprehensive guide to staying safe online is ready for immediate download.
              </p>

              <p style="margin: 0 0 32px; font-family: 'DM Sans', Arial, sans-serif; font-size: 16px; line-height: 1.7; color: #4A4A4A;">
                This e-book covers everything from spotting scams and securing your accounts to protecting your privacy on every device. Work through it at your own pace.
              </p>

              <!-- Download button -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 0 40px;">
                <tr>
                  <td style="background-color: #1A1A1A; border-radius: 3px;">
                    <a
                      href="${EBOOK_DOWNLOAD_URL}"
                      target="_blank"
                      style="display: inline-block; padding: 16px 36px; font-family: 'DM Sans', Arial, sans-serif; font-size: 14px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #FDFAF5; text-decoration: none; border-radius: 3px;"
                    >
                      Download Your E-book &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin: 0 0 32px;">
                <tr>
                  <td style="border-top: 1px solid rgba(201,168,76,0.3); font-size: 0; line-height: 0;">&nbsp;</td>
                </tr>
              </table>

              <!-- What's inside -->
              <p style="margin: 0 0 16px; font-family: 'Playfair Display', Georgia, serif; font-size: 20px; font-weight: 600; color: #1A1A1A;">
                What you'll learn
              </p>

              <!-- Checklist items -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin: 0 0 32px;">
                <tr>
                  <td style="padding: 0 0 12px;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width: 24px; vertical-align: top; padding-top: 2px;">
                          <span style="display: inline-block; width: 18px; height: 18px; background-color: rgba(201,168,76,0.15); border: 1px solid #C9A84C; border-radius: 2px; text-align: center; line-height: 16px; font-size: 11px; color: #C9A84C; font-weight: 700;">&#10003;</span>
                        </td>
                        <td style="padding-left: 10px; font-family: 'DM Sans', Arial, sans-serif; font-size: 15px; color: #4A4A4A; line-height: 1.5;">
                          <strong style="color: #1A1A1A;">Scam Recognition</strong> - identify phishing, fraud, and social engineering before they reach you
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 0 12px;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width: 24px; vertical-align: top; padding-top: 2px;">
                          <span style="display: inline-block; width: 18px; height: 18px; background-color: rgba(201,168,76,0.15); border: 1px solid #C9A84C; border-radius: 2px; text-align: center; line-height: 16px; font-size: 11px; color: #C9A84C; font-weight: 700;">&#10003;</span>
                        </td>
                        <td style="padding-left: 10px; font-family: 'DM Sans', Arial, sans-serif; font-size: 15px; color: #4A4A4A; line-height: 1.5;">
                          <strong style="color: #1A1A1A;">Password & Account Security</strong> - simple systems to protect every account you own
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 0 12px;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width: 24px; vertical-align: top; padding-top: 2px;">
                          <span style="display: inline-block; width: 18px; height: 18px; background-color: rgba(201,168,76,0.15); border: 1px solid #C9A84C; border-radius: 2px; text-align: center; line-height: 16px; font-size: 11px; color: #C9A84C; font-weight: 700;">&#10003;</span>
                        </td>
                        <td style="padding-left: 10px; font-family: 'DM Sans', Arial, sans-serif; font-size: 15px; color: #4A4A4A; line-height: 1.5;">
                          <strong style="color: #1A1A1A;">Privacy Protection</strong> - take back control of your personal data across every device
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 0 12px;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width: 24px; vertical-align: top; padding-top: 2px;">
                          <span style="display: inline-block; width: 18px; height: 18px; background-color: rgba(201,168,76,0.15); border: 1px solid #C9A84C; border-radius: 2px; text-align: center; line-height: 16px; font-size: 11px; color: #C9A84C; font-weight: 700;">&#10003;</span>
                        </td>
                        <td style="padding-left: 10px; font-family: 'DM Sans', Arial, sans-serif; font-size: 15px; color: #4A4A4A; line-height: 1.5;">
                          <strong style="color: #1A1A1A;">Safe Browsing & Shopping</strong> - how to verify websites and shop online without risk
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin: 0 0 32px;">
                <tr>
                  <td style="border-top: 1px solid rgba(201,168,76,0.3); font-size: 0; line-height: 0;">&nbsp;</td>
                </tr>
              </table>

              <!-- Support note -->
              <p style="margin: 0 0 12px; font-family: 'Playfair Display', Georgia, serif; font-size: 20px; font-weight: 600; color: #1A1A1A;">
                Need help?
              </p>
              <p style="margin: 0; font-family: 'DM Sans', Arial, sans-serif; font-size: 15px; line-height: 1.7; color: #4A4A4A;">
                If you have any trouble downloading your e-book or have questions about the content, just reply to this email. We're here to help.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1A1A1A; padding: 32px 48px;">
              <p style="margin: 0 0 8px; font-family: 'Playfair Display', Georgia, serif; font-size: 16px; font-weight: 600; color: #FDFAF5;">
                Bright Path Cyber
              </p>
              <p style="margin: 0 0 16px; font-family: 'DM Sans', Arial, sans-serif; font-size: 13px; color: rgba(253,250,245,0.6); line-height: 1.5;">
                Personal Cybersecurity Guidance for Individuals &amp; Families
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin: 0 0 16px;">
                <tr>
                  <td style="border-top: 1px solid rgba(201,168,76,0.25); font-size: 0; line-height: 0;">&nbsp;</td>
                </tr>
              </table>
              <p style="margin: 0; font-family: 'DM Sans', Arial, sans-serif; font-size: 12px; color: rgba(253,250,245,0.4); line-height: 1.5;">
                This email was sent to ${customerEmail} because you purchased "Click with Confidence" from Bright Path Cyber. If you did not make this purchase, please contact us immediately.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;

  const text = `PURCHASE CONFIRMED - Click with Confidence

Thank you for purchasing Click with Confidence from Bright Path Cyber.

Your e-book is ready to download:
${EBOOK_DOWNLOAD_URL}

What you'll learn:
- Scam Recognition - identify phishing, fraud, and social engineering
- Password & Account Security - simple systems to protect every account
- Privacy Protection - take back control of your personal data
- Safe Browsing & Shopping - verify websites and shop online safely

Need help? Just reply to this email.

Bright Path Cyber
Personal Cybersecurity Guidance for Individuals & Families
https://brightpathcyber.com

This email was sent to ${customerEmail} because you purchased Click with Confidence.`;

  return { subject, html, text };
}
