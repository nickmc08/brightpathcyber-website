/**
 * Tests for the weekly blog post generator
 *
 * Tests cover:
 * - Brand rule enforcement (no emojis, no em/en dashes)
 * - Slug generation
 * - Week index calculation (12-week cycle)
 * - Prompt building (Brand Voice Playbook embedded)
 * - Content roadmap completeness and structure
 */

import { describe, it, expect } from "vitest";
import {
  applyBrandRules,
  titleToSlug,
  getCurrentWeekIndex,
  buildBrandVoiceSystemPrompt,
  buildUserPrompt,
  CONTENT_ROADMAP,
} from "./blogGenerator";

// ── Brand Rule Enforcement ───────────────────────────────────────────────────

describe("applyBrandRules", () => {
  it("replaces em dashes with regular hyphens", () => {
    const input = "Protect yourself\u2014here's how";
    const result = applyBrandRules(input);
    expect(result).toBe("Protect yourself-here's how");
    expect(result).not.toContain("\u2014");
  });

  it("replaces en dashes with regular hyphens", () => {
    const input = "Pages 5\u201310 cover this topic";
    const result = applyBrandRules(input);
    expect(result).toBe("Pages 5-10 cover this topic");
    expect(result).not.toContain("\u2013");
  });

  it("removes common BMP symbol emojis", () => {
    const input = "Stay safe \u2764 online \u2705";
    const result = applyBrandRules(input);
    expect(result).not.toContain("\u2764");
    expect(result).not.toContain("\u2705");
  });

  it("preserves normal text without modification", () => {
    const input = "Protect your accounts with a strong password - it matters.";
    const result = applyBrandRules(input);
    expect(result).toBe(input);
  });

  it("handles multiple em dashes in one string", () => {
    const input = "First\u2014second\u2014third";
    const result = applyBrandRules(input);
    expect(result).toBe("First-second-third");
  });

  it("handles empty string", () => {
    expect(applyBrandRules("")).toBe("");
  });
});

// ── Slug Generation ──────────────────────────────────────────────────────────

describe("titleToSlug", () => {
  it("converts a title to a lowercase hyphenated slug", () => {
    const title = "How to Recognize a Phishing Email";
    expect(titleToSlug(title)).toBe("how-to-recognize-a-phishing-email");
  });

  it("removes special characters", () => {
    const title = "5 Scams Targeting Everyday People (Right Now!)";
    expect(titleToSlug(title)).toBe("5-scams-targeting-everyday-people-right-now");
  });

  it("collapses multiple spaces into a single hyphen", () => {
    const title = "Stay  Safe   Online";
    expect(titleToSlug(title)).toBe("stay-safe-online");
  });

  it("strips leading and trailing hyphens", () => {
    const title = "  The Best Password Tips  ";
    expect(titleToSlug(title)).toBe("the-best-password-tips");
  });

  it("handles titles with numbers", () => {
    const title = "10 Ways to Stay Safe in 2025";
    expect(titleToSlug(title)).toBe("10-ways-to-stay-safe-in-2025");
  });
});

// ── Week Index Calculation ───────────────────────────────────────────────────

describe("getCurrentWeekIndex", () => {
  it("returns a number between 0 and 11 inclusive", () => {
    const index = getCurrentWeekIndex(new Date());
    expect(index).toBeGreaterThanOrEqual(0);
    expect(index).toBeLessThanOrEqual(11);
  });

  it("returns a consistent value for the same date", () => {
    const date = new Date("2025-01-04T06:00:00Z"); // A Saturday
    const index1 = getCurrentWeekIndex(date);
    const index2 = getCurrentWeekIndex(date);
    expect(index1).toBe(index2);
  });

  it("returns different values for dates 7 days apart", () => {
    const date1 = new Date("2025-01-04T06:00:00Z");
    const date2 = new Date("2025-01-11T06:00:00Z");
    const index1 = getCurrentWeekIndex(date1);
    const index2 = getCurrentWeekIndex(date2);
    // They should differ by 1 (mod 12)
    expect((index2 - index1 + 12) % 12).toBe(1);
  });

  it("wraps around after 12 weeks", () => {
    const date1 = new Date("2025-01-04T06:00:00Z");
    const date12 = new Date(date1.getTime() + 12 * 7 * 24 * 60 * 60 * 1000);
    const index1 = getCurrentWeekIndex(date1);
    const index12 = getCurrentWeekIndex(date12);
    expect(index1).toBe(index12);
  });
});

// ── Content Roadmap ──────────────────────────────────────────────────────────

describe("CONTENT_ROADMAP", () => {
  it("has exactly 12 entries", () => {
    expect(CONTENT_ROADMAP).toHaveLength(12);
  });

  it("has weeks numbered 1 through 12", () => {
    const weeks = CONTENT_ROADMAP.map(e => e.week);
    expect(weeks).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  });

  it("has months 1, 2, and 3 with 4 entries each", () => {
    const month1 = CONTENT_ROADMAP.filter(e => e.month === 1);
    const month2 = CONTENT_ROADMAP.filter(e => e.month === 2);
    const month3 = CONTENT_ROADMAP.filter(e => e.month === 3);
    expect(month1).toHaveLength(4);
    expect(month2).toHaveLength(4);
    expect(month3).toHaveLength(4);
  });

  it("has all required fields for each entry", () => {
    for (const entry of CONTENT_ROADMAP) {
      expect(entry.week).toBeTypeOf("number");
      expect(entry.month).toBeTypeOf("number");
      expect(entry.monthTheme).toBeTypeOf("string");
      expect(entry.topic).toBeTypeOf("string");
      expect(entry.category).toBeTypeOf("string");
      expect(entry.angle).toBeTypeOf("string");
      expect(entry.topic.length).toBeGreaterThan(5);
      expect(entry.angle.length).toBeGreaterThan(20);
    }
  });

  it("has unique topics across all 12 weeks", () => {
    const topics = CONTENT_ROADMAP.map(e => e.topic);
    const uniqueTopics = new Set(topics);
    expect(uniqueTopics.size).toBe(12);
  });

  it("uses only valid categories", () => {
    const validCategories = ["Scam Awareness", "Account Security", "Online Safety", "Privacy Protection", "Device Security", "General"];
    for (const entry of CONTENT_ROADMAP) {
      expect(validCategories).toContain(entry.category);
    }
  });
});

// ── Prompt Building ──────────────────────────────────────────────────────────

describe("buildBrandVoiceSystemPrompt", () => {
  it("returns a non-empty string", () => {
    const prompt = buildBrandVoiceSystemPrompt();
    expect(typeof prompt).toBe("string");
    expect(prompt.length).toBeGreaterThan(500);
  });

  it("includes the brand name", () => {
    const prompt = buildBrandVoiceSystemPrompt();
    expect(prompt).toContain("Bright Path Cyber");
  });

  it("includes the no-emojis rule", () => {
    const prompt = buildBrandVoiceSystemPrompt();
    expect(prompt.toLowerCase()).toContain("no emojis");
  });

  it("includes the no-em-dashes rule", () => {
    const prompt = buildBrandVoiceSystemPrompt();
    expect(prompt.toLowerCase()).toContain("em dash");
  });

  it("includes the CTA rules mentioning the e-book", () => {
    const prompt = buildBrandVoiceSystemPrompt();
    expect(prompt).toContain("Click with Confidence");
  });

  it("includes the no-coaching rule", () => {
    const prompt = buildBrandVoiceSystemPrompt();
    expect(prompt.toLowerCase()).toContain("coaching");
  });

  it("mentions the target audience (older adults / seniors)", () => {
    const prompt = buildBrandVoiceSystemPrompt();
    expect(prompt.toLowerCase()).toMatch(/older adults|seniors/);
  });
});

describe("buildUserPrompt", () => {
  const sampleEntry = CONTENT_ROADMAP[0];

  it("includes the topic from the roadmap entry", () => {
    const prompt = buildUserPrompt(sampleEntry, []);
    expect(prompt).toContain(sampleEntry.topic);
  });

  it("includes the category from the roadmap entry", () => {
    const prompt = buildUserPrompt(sampleEntry, []);
    expect(prompt).toContain(sampleEntry.category);
  });

  it("includes the editorial angle", () => {
    const prompt = buildUserPrompt(sampleEntry, []);
    expect(prompt).toContain(sampleEntry.angle.slice(0, 30));
  });

  it("includes existing titles in the avoid list when provided", () => {
    const existingTitles = ["5 Scams Targeting Everyday People Right Now", "How to Tell If a Website Is Safe"];
    const prompt = buildUserPrompt(sampleEntry, existingTitles);
    expect(prompt).toContain(existingTitles[0]);
    expect(prompt).toContain(existingTitles[1]);
  });

  it("does not include avoid list section when no existing titles", () => {
    const prompt = buildUserPrompt(sampleEntry, []);
    expect(prompt).not.toContain("already exist on the site");
  });

  it("requests JSON output format", () => {
    const prompt = buildUserPrompt(sampleEntry, []);
    expect(prompt.toLowerCase()).toContain("json");
  });

  it("includes all required output fields", () => {
    const prompt = buildUserPrompt(sampleEntry, []);
    expect(prompt).toContain('"title"');
    expect(prompt).toContain('"slug"');
    expect(prompt).toContain('"excerpt"');
    expect(prompt).toContain('"content"');
    expect(prompt).toContain('"readTime"');
  });
});
