/**
 * Broadcast Email Templates
 * Three types: Blog Update, Course Launch, Custom
 * All use the Bright Path Cyber brand: ivory #F5F0E8, brass gold #C9A84C, near-black #1A1A1A
 * No em dashes, no emojis.
 */

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663415118379/JXjpt8aqftuhQ9n25h55pn/BPC_Shield_Transparent_8f7be6a6.png";
const SITE_URL = "https://brightpathcyber.com";

const emailWrapper = (content: string, subject: string, unsubscribeUrl?: string) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin:0; padding:0; background-color:#F5F0E8; font-family:'DM Sans',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F0E8;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:#FFFFFF; border:1px solid rgba(201,168,76,0.2); border-radius:4px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="padding:28px 40px 20px; border-bottom:2px solid #C9A84C; text-align:center;">
              <img src="${LOGO_URL}" alt="Bright Path Cyber" width="44" height="44" style="display:inline-block; vertical-align:middle; margin-right:12px;" />
              <span style="font-family:Georgia,'Times New Roman',serif; font-size:20px; font-weight:700; color:#1A1A1A; vertical-align:middle;">Bright Path Cyber</span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px 28px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px 28px; border-top:1px solid rgba(201,168,76,0.2); text-align:center;">
              <p style="margin:0 0 8px; font-size:12px; color:#888; font-family:'DM Sans',Arial,sans-serif;">
                You are receiving this email because you subscribed to Bright Path Cyber updates.
              </p>
              <p style="margin:0 0 8px; font-size:12px; color:#888; font-family:'DM Sans',Arial,sans-serif;">
                <a href="${SITE_URL}" style="color:#C9A84C; text-decoration:none;">brightpathcyber.com</a>
              </p>
              ${unsubscribeUrl ? `<p style="margin:0; font-size:11px; color:#aaa; font-family:'DM Sans',Arial,sans-serif;">
                <a href="${unsubscribeUrl}" style="color:#aaa; text-decoration:underline;">Unsubscribe</a> from this mailing list.
              </p>` : ''}
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

// ---- Blog Update ----

export interface BlogUpdateFields {
  blogTitle: string;
  snippet: string;
  postUrl: string;
}

export function buildBlogUpdateEmail(fields: BlogUpdateFields, unsubscribeUrl?: string): { subject: string; html: string; text: string } {
  const subject = `New Post: ${fields.blogTitle}`;

  const content = `
    <h1 style="margin:0 0 8px; font-family:Georgia,'Times New Roman',serif; font-size:26px; font-weight:700; color:#1A1A1A; line-height:1.2;">
      ${fields.blogTitle}
    </h1>
    <div style="width:48px; height:2px; background-color:#C9A84C; margin:0 0 24px;"></div>
    <p style="margin:0 0 28px; font-size:16px; line-height:1.7; color:#4A4A4A;">
      ${fields.snippet}
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0">
      <tr>
        <td style="background-color:#1A1A1A; border-radius:3px;">
          <a href="${fields.postUrl}" target="_blank"
            style="display:inline-block; padding:14px 32px; font-family:'DM Sans',Arial,sans-serif; font-size:13px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:#FDFAF5; text-decoration:none; border-radius:3px;">
            Read the Article
          </a>
        </td>
      </tr>
    </table>
  `;

  const text = `New Post: ${fields.blogTitle}

${fields.snippet}

Read the full article: ${fields.postUrl}

---
Bright Path Cyber
${SITE_URL}${unsubscribeUrl ? `\n\nTo unsubscribe: ${unsubscribeUrl}` : ''}`;

  return { subject, html: emailWrapper(content, subject, unsubscribeUrl), text };
}

// ---- Course Launch ----

export interface CourseLaunchFields {
  courseName: string;
  description: string;
  price: string;
  enrollUrl: string;
}

export function buildCourseLaunchEmail(fields: CourseLaunchFields, unsubscribeUrl?: string): { subject: string; html: string; text: string } {
  const subject = `Now Available: ${fields.courseName}`;

  const content = `
    <div style="display:inline-block; padding:4px 12px; border:1px solid #C9A84C; border-radius:2px; font-size:11px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:#C9A84C; margin-bottom:16px;">
      New Course
    </div>
    <h1 style="margin:0 0 8px; font-family:Georgia,'Times New Roman',serif; font-size:26px; font-weight:700; color:#1A1A1A; line-height:1.2;">
      ${fields.courseName}
    </h1>
    <div style="width:48px; height:2px; background-color:#C9A84C; margin:0 0 24px;"></div>
    <p style="margin:0 0 20px; font-size:16px; line-height:1.7; color:#4A4A4A;">
      ${fields.description}
    </p>
    <p style="margin:0 0 28px; font-size:22px; font-weight:700; color:#1A1A1A; font-family:Georgia,'Times New Roman',serif;">
      ${fields.price}
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0">
      <tr>
        <td style="background-color:#C9A84C; border-radius:3px;">
          <a href="${fields.enrollUrl}" target="_blank"
            style="display:inline-block; padding:14px 32px; font-family:'DM Sans',Arial,sans-serif; font-size:13px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:#1A1A1A; text-decoration:none; border-radius:3px;">
            Enroll Now
          </a>
        </td>
      </tr>
    </table>
  `;

  const text = `New Course: ${fields.courseName}

${fields.description}

Price: ${fields.price}

Enroll here: ${fields.enrollUrl}

---
Bright Path Cyber
${SITE_URL}${unsubscribeUrl ? `\n\nTo unsubscribe: ${unsubscribeUrl}` : ''}`;

  return { subject, html: emailWrapper(content, subject, unsubscribeUrl), text };
}

// ---- Custom ----

export interface CustomFields {
  htmlBody: string;
  textBody: string;
}

export function buildCustomEmail(subject: string, fields: CustomFields, unsubscribeUrl?: string): { subject: string; html: string; text: string } {
  return {
    subject,
    html: emailWrapper(fields.htmlBody, subject, unsubscribeUrl),
    text: `${fields.textBody}\n\n---\nBright Path Cyber\n${SITE_URL}${unsubscribeUrl ? `\n\nTo unsubscribe: ${unsubscribeUrl}` : ''}`,
  };
}

// ---- Dispatcher ----

export type BroadcastTemplateType = "blog_update" | "course_launch" | "custom";

export function buildBroadcastEmail(
  templateType: BroadcastTemplateType,
  subject: string,
  bodyJson: string,
  unsubscribeUrl?: string
): { subject: string; html: string; text: string } {
  const fields = JSON.parse(bodyJson);

  switch (templateType) {
    case "blog_update":
      return buildBlogUpdateEmail(fields as BlogUpdateFields, unsubscribeUrl);
    case "course_launch":
      return buildCourseLaunchEmail(fields as CourseLaunchFields, unsubscribeUrl);
    case "custom":
      return buildCustomEmail(subject, fields as CustomFields, unsubscribeUrl);
    default:
      throw new Error(`Unknown template type: ${templateType}`);
  }
}
