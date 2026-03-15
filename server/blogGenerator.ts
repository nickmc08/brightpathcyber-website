/**
 * Automated Weekly Blog Post Generator
 *
 * Runs every Saturday at 6:00 AM (server local time).
 * Generates a new blog post using the LLM with the full Brand Voice and
 * Content Playbook embedded, then saves it as a draft in the database.
 * The admin must review and publish it manually from the Blog Posts tab.
 *
 * 3-Month Content Roadmap:
 *   Month 1 (Weeks 1-4):  Build Trust and Awareness
 *   Month 2 (Weeks 5-8):  Educate and Engage
 *   Month 3 (Weeks 9-12): Community and Conversion
 */

import { invokeLLM } from "./_core/llm";
import { insertBlogPost, getAllBlogPosts } from "./db";

// ── Content Roadmap ──────────────────────────────────────────────────────────

/**
 * 12-week topic queue aligned to the 3-month content strategy.
 * Each entry defines the topic, category, and which month it belongs to.
 * After week 12, the cycle repeats with fresh angles on the same themes.
 */
export const CONTENT_ROADMAP: Array<{
  week: number;
  month: number;
  monthTheme: string;
  topic: string;
  category: string;
  angle: string;
}> = [
  // Month 1: Build Trust and Awareness
  {
    week: 1,
    month: 1,
    monthTheme: "Build Trust and Awareness",
    topic: "How to Recognize a Phishing Email",
    category: "Scam Awareness",
    angle: "Teach readers the 5 telltale signs of a phishing email using everyday examples. Focus on what to look for in the sender address, subject line, and links. Normalize the threat by noting that these emails fool millions of smart people every year.",
  },
  {
    week: 2,
    month: 1,
    monthTheme: "Build Trust and Awareness",
    topic: "The One Password Habit That Could Save Your Accounts",
    category: "Account Security",
    angle: "Explain why reusing passwords across sites is the single biggest risk most people take online. Use the analogy of using the same key for your house, car, and office. Introduce the concept of a password manager as the simple solution.",
  },
  {
    week: 3,
    month: 1,
    monthTheme: "Build Trust and Awareness",
    topic: "Real Scam Stories: What Happened and What to Watch For",
    category: "Scam Awareness",
    angle: "Walk through 2-3 realistic scam scenarios that target everyday people (fake delivery texts, IRS phone calls, grandparent scams). Describe what the scam looks like, why it works, and the one thing the victim could have done differently.",
  },
  {
    week: 4,
    month: 1,
    monthTheme: "Build Trust and Awareness",
    topic: "Why Two-Factor Authentication Is Your Best Defense",
    category: "Account Security",
    angle: "Explain two-factor authentication (2FA) in plain language using the analogy of a deadbolt plus a chain lock. Cover how to turn it on for email, banking, and social media. Reassure readers that it takes less than 5 minutes to set up.",
  },

  // Month 2: Educate and Engage
  {
    week: 5,
    month: 2,
    monthTheme: "Educate and Engage",
    topic: "Is Your Home Wi-Fi Actually Secure?",
    category: "Online Safety",
    angle: "Explain what an unsecured home network means in practical terms (neighbors or strangers accessing your devices). Cover the 3 most important router settings to change: default password, network name, and encryption type. Keep it action-oriented.",
  },
  {
    week: 6,
    month: 2,
    monthTheme: "Educate and Engage",
    topic: "What Your Phone Knows About You (And How to Take Back Control)",
    category: "Privacy Protection",
    angle: "Walk through the privacy settings most people have never changed on their smartphones. Cover location permissions, app data access, and ad tracking. Frame it as a 10-minute audit that gives readers immediate peace of mind.",
  },
  {
    week: 7,
    month: 2,
    monthTheme: "Educate and Engage",
    topic: "Data Brokers: Who Is Selling Your Personal Information?",
    category: "Privacy Protection",
    angle: "Explain what data brokers are and how they collect and sell personal information without most people knowing. Describe the risks (targeted scams, identity theft) and give readers 2-3 concrete steps to start reducing their data footprint.",
  },
  {
    week: 8,
    month: 2,
    monthTheme: "Educate and Engage",
    topic: "How to Shop Online Without Getting Scammed",
    category: "Online Safety",
    angle: "Cover the key signs of a trustworthy online store versus a fake one. Include how to verify a site is legitimate, what to do if a deal seems too good to be true, and how to use credit cards safely for online purchases.",
  },

  // Month 3: Community and Conversion
  {
    week: 9,
    month: 3,
    monthTheme: "Community and Conversion",
    topic: "Social Engineering: When the Biggest Threat Is a Phone Call",
    category: "Scam Awareness",
    angle: "Explain social engineering in plain language as the art of manipulating people rather than hacking computers. Use real-world examples like tech support scams and bank impersonation calls. Give readers a simple script for what to say when they get a suspicious call.",
  },
  {
    week: 10,
    month: 3,
    monthTheme: "Community and Conversion",
    topic: "Keeping Your Phone Safe: The Basics Everyone Should Know",
    category: "Account Security",
    angle: "Cover the 5 most important mobile security habits: screen lock, app updates, public Wi-Fi caution, Bluetooth settings, and what to do if your phone is lost or stolen. Write it as a friendly checklist that feels achievable, not overwhelming.",
  },
  {
    week: 11,
    month: 3,
    monthTheme: "Community and Conversion",
    topic: "What to Do If You Think You've Been Hacked",
    category: "Online Safety",
    angle: "Give readers a calm, step-by-step action plan for what to do immediately after a suspected account breach. Cover changing passwords, enabling 2FA, checking for unauthorized activity, and who to contact. Normalize the situation and focus on recovery.",
  },
  {
    week: 12,
    month: 3,
    monthTheme: "Community and Conversion",
    topic: "Your Digital Security Checklist: 10 Things to Do This Weekend",
    category: "Online Safety",
    angle: "Create a motivating, action-oriented post that summarizes the most important security habits from the past 3 months. Frame it as a weekend project that anyone can complete. Use this post as a strong CTA bridge to the free checklist and the e-book.",
  },
];

// ── Prompt Builder ───────────────────────────────────────────────────────────

/**
 * Builds the full system prompt embedding the Brand Voice and Content Playbook.
 */
export function buildBrandVoiceSystemPrompt(): string {
  return `You are the editorial voice of Bright Path Cyber, a cybersecurity education brand for everyday consumers, with a strong focus on older adults and seniors. Your writing must follow the Brand Voice and Content Playbook exactly.

BRAND IDENTITY
Bright Path Cyber is a division of McMillon Co. LLC. The brand vibe is "West Elm meets Apple": premium, clean, warm, and highly trustworthy. Sophisticated but never cold or clinical.

AUDIENCE
Everyday consumers who are not tech experts. Many feel intimidated or anxious about digital threats. Write for someone who is intelligent and capable but has never worked in technology. Never talk down to them.

VOICE AND TONE
- Empowering, not fearful: Never use scare tactics. State the threat plainly, then quickly pivot to the solution. Make the reader feel capable and in control.
- Conversational and warm: Write like a trusted friend who happens to know a lot about security. Use relatable analogies (for example, "Think of a password like the front door to your house").
- Plain English only: Strictly avoid IT jargon. If a technical term must be used (like "phishing" or "2FA"), immediately define it in simple, everyday language in the same sentence or the next one.
- Non-judgmental: Never make the reader feel foolish for falling for a scam or not knowing a technical concept. Normalize the threat (for example, "These scams fool thousands of smart people every day").

FORMATTING RULES
- No emojis anywhere in the article.
- No em dashes or en dashes. Use regular hyphens or commas instead.
- Short paragraphs: 2 to 4 sentences maximum. No large blocks of text.
- Use clear, descriptive headings for each section.
- Use italicized callouts for the single most important practical tip in each section (wrap in *asterisks* for Markdown).
- The article must be written in Markdown format.

CONTENT STRATEGY: THE BLOG AS THE BRIDGE
- Goal: Deepen trust, provide SEO value, and capture email leads.
- Rule: Provide a thorough overview of the topic. The blog tells readers WHAT the issue is and WHY it matters. The e-book tells them HOW to implement the full solution step by step.
- Do NOT give away the complete system. Give enough to be genuinely valuable, but leave the reader wanting the comprehensive guide.
- The free checklist tells them what to do; the "Click with Confidence" e-book tells them how to do it.

POST STRUCTURE
1. Benefit-driven title (already provided to you - use it exactly as given).
2. Category tag (already provided to you - use it exactly as given).
3. Relatable intro paragraph: open with a scenario or question the reader will recognize from their own life.
4. 3 to 5 sections with clear headings. Each section covers one key point.
5. At least one italicized practical tip per section.
6. Closing paragraph that summarizes the key takeaway and transitions naturally to the CTA.
7. CTA paragraph: point readers to the free "5-Minute Personal Security Audit Checklist" at brightpathcyber.com and/or the "Click with Confidence" e-book ($27). Do NOT mention 1-on-1 coaching or personalized guidance. Do NOT mention any future services not yet available.

CTA RULES (STRICTLY ENFORCED)
- End every post with a CTA pointing to the free checklist and/or the "Click with Confidence" e-book.
- Do NOT mention 1-on-1 coaching, personalized guidance, or any service not available at launch.
- Do NOT give away the complete step-by-step system that belongs in the e-book.

BRAND RULES (STRICTLY ENFORCED)
- No emojis.
- No em dashes (the long dash: -) or en dashes (the medium dash: -). Use regular hyphens or commas.
- No jargon without an immediate plain-English definition.
- No scare tactics or alarmist language.
- No judgment toward readers who have been scammed or made security mistakes.`;
}

/**
 * Builds the user prompt for a specific topic from the roadmap.
 */
export function buildUserPrompt(entry: typeof CONTENT_ROADMAP[0], existingTitles: string[]): string {
  const avoidList = existingTitles.length > 0
    ? `\n\nIMPORTANT: The following blog post titles already exist on the site. Do not duplicate these topics or titles:\n${existingTitles.map(t => `- ${t}`).join("\n")}`
    : "";

  return `Write a complete blog post for Bright Path Cyber following all Brand Voice and Content Playbook guidelines.

TOPIC: ${entry.topic}
CATEGORY: ${entry.category}
MONTH THEME: ${entry.monthTheme} (Month ${entry.month} of 3)
EDITORIAL ANGLE: ${entry.angle}
${avoidList}

OUTPUT FORMAT (JSON only, no markdown code fences, no extra text):
{
  "title": "The exact benefit-driven title for this post",
  "slug": "url-friendly-slug-with-hyphens",
  "category": "${entry.category}",
  "excerpt": "A 1-2 sentence excerpt that summarizes the post and entices the reader to click. No emojis. No em dashes.",
  "content": "The full Markdown content of the post. Use ## for section headings. Use *italics* for practical tip callouts. Short paragraphs only. No emojis. No em dashes.",
  "readTime": "X min read"
}

The title must be benefit-driven and written for a non-technical audience. The content must follow all Brand Voice guidelines exactly. The excerpt must be compelling but not sensationalist.`;
}

// ── Blog Generation Logic ────────────────────────────────────────────────────

/**
 * Determines which week of the 12-week cycle to generate based on the current date.
 * Week 1 starts from the first Saturday of the deployment month.
 * After 12 weeks, the cycle repeats.
 */
export function getCurrentWeekIndex(now: Date = new Date()): number {
  // Use the ISO week number to determine position in the 12-week cycle
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
  const weekOfYear = Math.floor(dayOfYear / 7);
  // 0-indexed position in the 12-week cycle (0 to 11)
  return weekOfYear % 12;
}

/**
 * Enforces brand rules on generated content: removes emojis and replaces
 * em dashes / en dashes with regular hyphens.
 */
export function applyBrandRules(text: string): string {
  // Replace em dashes and en dashes with regular hyphens
  let cleaned = text.replace(/\u2014/g, "-").replace(/\u2013/g, "-");
  // Remove emoji surrogate pairs
  cleaned = cleaned.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "");
  // Remove common BMP symbol emojis
  cleaned = cleaned.replace(/[\u2600-\u27BF\uFE00-\uFE0F\u2702-\u27B0]/g, "");
  return cleaned;
}

/**
 * Generates a URL-safe slug from a title.
 */
export function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Main function: generates a weekly blog post and saves it as a draft.
 * Returns the inserted blog post ID, or null if generation failed.
 */
export async function generateWeeklyBlogPost(now: Date = new Date()): Promise<{
  success: boolean;
  postId?: number;
  title?: string;
  error?: string;
}> {
  try {
    console.log("[BlogGenerator] Starting weekly blog post generation...");

    // Determine which topic to generate based on the current week
    const weekIndex = getCurrentWeekIndex(now);
    const roadmapEntry = CONTENT_ROADMAP[weekIndex];

    console.log(`[BlogGenerator] Week index ${weekIndex}, topic: "${roadmapEntry.topic}"`);

    // Fetch existing post titles to avoid duplicates
    let existingTitles: string[] = [];
    try {
      const existingPosts = await getAllBlogPosts();
      existingTitles = existingPosts.map(p => p.title);
    } catch (err) {
      console.warn("[BlogGenerator] Could not fetch existing posts for dedup check:", err);
    }

    // Build prompts
    const systemPrompt = buildBrandVoiceSystemPrompt();
    const userPrompt = buildUserPrompt(roadmapEntry, existingTitles);

    // Call the LLM
    console.log("[BlogGenerator] Calling LLM...");
    const response = await invokeLLM({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "blog_post",
          strict: true,
          schema: {
            type: "object",
            properties: {
              title: { type: "string", description: "Benefit-driven post title" },
              slug: { type: "string", description: "URL-friendly slug" },
              category: { type: "string", description: "Post category" },
              excerpt: { type: "string", description: "1-2 sentence excerpt" },
              content: { type: "string", description: "Full Markdown content" },
              readTime: { type: "string", description: "Estimated read time, e.g. '5 min read'" },
            },
            required: ["title", "slug", "category", "excerpt", "content", "readTime"],
            additionalProperties: false,
          },
        },
      },
    });

    const rawContent = response.choices?.[0]?.message?.content;
    if (!rawContent) {
      throw new Error("LLM returned empty response");
    }
    // When using json_schema response_format, the content is always a string
    const rawContentStr = typeof rawContent === "string" ? rawContent : JSON.stringify(rawContent);

    // Parse the JSON response
    let parsed: {
      title: string;
      slug: string;
      category: string;
      excerpt: string;
      content: string;
      readTime: string;
    };

    try {
      parsed = JSON.parse(rawContentStr);
    } catch {
      throw new Error(`LLM returned invalid JSON: ${rawContentStr.slice(0, 200)}`);
    }

    // Validate required fields
    if (!parsed.title || !parsed.content || !parsed.excerpt) {
      throw new Error("LLM response missing required fields (title, content, or excerpt)");
    }

    // Apply brand rules to all text fields
    const cleanTitle = applyBrandRules(parsed.title);
    const cleanExcerpt = applyBrandRules(parsed.excerpt);
    const cleanContent = applyBrandRules(parsed.content);
    const cleanSlug = parsed.slug ? titleToSlug(applyBrandRules(parsed.slug)) : titleToSlug(cleanTitle);

    // Format the date as "Month Day, Year"
    const dateStr = now.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Insert as a draft (admin must review and publish)
    const postId = await insertBlogPost({
      title: cleanTitle,
      slug: cleanSlug,
      category: parsed.category || roadmapEntry.category,
      excerpt: cleanExcerpt,
      content: cleanContent,
      date: dateStr,
      readTime: parsed.readTime || "5 min read",
      imageUrl: null,
      status: "draft",
    });

    console.log(`[BlogGenerator] Successfully generated draft post ID ${postId}: "${cleanTitle}"`);

    return { success: true, postId, title: cleanTitle };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("[BlogGenerator] Failed to generate blog post:", errorMessage);
    return { success: false, error: errorMessage };
  }
}
