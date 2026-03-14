/**
 * Bright Path Cyber — Branded Email Template
 * Delivers the free Personal Security Audit Checklist
 * Design: ivory background, brass gold accents, Playfair Display headings
 */

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663415118379/JXjpt8aqftuhQ9n25h55pn/BPC_Shield_Transparent_469be348.png";

const CHECKLIST_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663415118379/JXjpt8aqftuhQ9n25h55pn/BrightPathCyber_Security_Checklist_v4_10be8126.pdf";

export function buildChecklistEmail(firstName: string): {
  subject: string;
  html: string;
  text: string;
} {
  const displayName = firstName.trim() || "there";

  const subject = "Your Free Security Checklist from Bright Path Cyber";

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

              <!-- Greeting -->
              <p style="margin: 0 0 8px; font-family: 'DM Sans', Arial, sans-serif; font-size: 13px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #C9A84C;">
                Your free resource is ready
              </p>
              <h1 style="margin: 0 0 24px; font-family: 'Playfair Display', Georgia, serif; font-size: 32px; font-weight: 700; line-height: 1.2; color: #1A1A1A;">
                Hi ${displayName}, here's your<br />
                <span style="color: #C9A84C;">Security Checklist</span>
              </h1>

              <p style="margin: 0 0 20px; font-family: 'DM Sans', Arial, sans-serif; font-size: 16px; line-height: 1.7; color: #4A4A4A;">
                Thank you for signing up — we're glad you're here. Your <strong>Personal Security Audit Checklist</strong> is ready to download below.
              </p>

              <p style="margin: 0 0 32px; font-family: 'DM Sans', Arial, sans-serif; font-size: 16px; line-height: 1.7; color: #4A4A4A;">
                This checklist covers the most important steps you can take right now to protect yourself online. No tech background required — just work through it at your own pace.
              </p>

              <!-- Download button -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 0 40px;">
                <tr>
                  <td style="background-color: #1A1A1A; border-radius: 3px;">
                    <a
                      href="${CHECKLIST_URL}"
                      target="_blank"
                      style="display: inline-block; padding: 16px 36px; font-family: 'DM Sans', Arial, sans-serif; font-size: 14px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #FDFAF5; text-decoration: none; border-radius: 3px;"
                    >
                      Download Your Checklist &rarr;
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
                What's inside the checklist
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
                          <strong style="color: #1A1A1A;">Account &amp; Password Security</strong> — how to lock down your most important accounts
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
                          <strong style="color: #1A1A1A;">Scam Recognition</strong> — the red flags that reveal phishing and fraud attempts
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
                          <strong style="color: #1A1A1A;">Device &amp; Network Safety</strong> — quick wins to protect your phone, computer, and Wi-Fi
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
                          <strong style="color: #1A1A1A;">Privacy Basics</strong> — what you're sharing online and how to take back control
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

              <!-- What's next -->
              <p style="margin: 0 0 12px; font-family: 'Playfair Display', Georgia, serif; font-size: 20px; font-weight: 600; color: #1A1A1A;">
                Want to go deeper?
              </p>
              <p style="margin: 0 0 20px; font-family: 'DM Sans', Arial, sans-serif; font-size: 15px; line-height: 1.7; color: #4A4A4A;">
                Our e-book <em>Click with Confidence</em> covers everything in the checklist and much more — step-by-step, in plain language, at your own pace. Available for just $27.
              </p>

              <!-- Secondary CTA -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 0 12px;">
                <tr>
                  <td style="border: 1.5px solid #C9A84C; border-radius: 3px;">
                    <a
                      href="https://brightpathcyber.com/bright-path-cyber"
                      target="_blank"
                      style="display: inline-block; padding: 13px 28px; font-family: 'DM Sans', Arial, sans-serif; font-size: 14px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #1A1A1A; text-decoration: none;"
                    >
                      Learn About the E-book &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 0; font-family: 'DM Sans', Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #7A7A7A;">
                Or visit our <a href="https://brightpathcyber.com/blog" target="_blank" style="color: #C9A84C; text-decoration: none; font-weight: 500;">free blog</a> for practical cybersecurity tips anytime.
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
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 0 16px;">
                <tr>
                  <td style="padding-right: 16px;">
                    <a href="https://brightpathcyber.com" target="_blank" style="font-family: 'DM Sans', Arial, sans-serif; font-size: 12px; color: #C9A84C; text-decoration: none;">Website</a>
                  </td>
                  <td style="padding-right: 16px;">
                    <a href="https://brightpathcyber.com/blog" target="_blank" style="font-family: 'DM Sans', Arial, sans-serif; font-size: 12px; color: #C9A84C; text-decoration: none;">Blog</a>
                  </td>
                  <td>
                    <a href="mailto:info@brightpathcyber.com" style="font-family: 'DM Sans', Arial, sans-serif; font-size: 12px; color: #C9A84C; text-decoration: none;">Contact Us</a>
                  </td>
                </tr>
              </table>
              <p style="margin: 0; font-family: 'DM Sans', Arial, sans-serif; font-size: 11px; color: rgba(253,250,245,0.4); line-height: 1.5;">
                You received this email because you signed up for the free checklist at brightpathcyber.com.<br />
                Questions? Reply to this email or write to <a href="mailto:info@brightpathcyber.com" style="color: rgba(253,250,245,0.5); text-decoration: none;">info@brightpathcyber.com</a>
              </p>
            </td>
          </tr>

          <!-- Bottom brass bar -->
          <tr>
            <td style="background-color: #C9A84C; height: 4px; font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

        </table>
        <!-- End main card -->
      </td>
    </tr>
  </table>

</body>
</html>`;

  const text = `Hi ${displayName},

Your free Personal Security Audit Checklist from Bright Path Cyber is ready to download:

${CHECKLIST_URL}

This checklist covers the most important steps you can take right now to protect yourself online — no tech background required.

What's inside:
- Account & Password Security
- Scam Recognition
- Device & Network Safety
- Privacy Basics

Want to go deeper? Our e-book "Click with Confidence" covers everything in the checklist and much more, for just $27:
https://brightpathcyber.com/bright-path-cyber

Or visit our free blog anytime:
https://brightpathcyber.com/blog

—
Bright Path Cyber
Personal Cybersecurity Guidance for Individuals & Families
info@brightpathcyber.com
https://brightpathcyber.com
`;

  return { subject, html, text };
}
