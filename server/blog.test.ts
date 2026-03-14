import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the db module
vi.mock("./db", () => {
  const mockPosts = [
    {
      id: 1,
      title: "Test Published Post",
      slug: "test-published-post",
      category: "Scam Awareness",
      excerpt: "A test excerpt for the published post.",
      content: "## Test Content\n\nThis is a test post with markdown content.",
      date: "March 14, 2026",
      readTime: "5 min read",
      imageUrl: null,
      status: "published",
      createdAt: new Date("2026-03-14T00:00:00Z"),
      updatedAt: new Date("2026-03-14T00:00:00Z"),
    },
    {
      id: 2,
      title: "Test Draft Post",
      slug: "test-draft-post",
      category: "Account Security",
      excerpt: "A test excerpt for the draft post.",
      content: "## Draft Content\n\nThis is a draft post.",
      date: "March 13, 2026",
      readTime: "3 min read",
      imageUrl: null,
      status: "draft",
      createdAt: new Date("2026-03-13T00:00:00Z"),
      updatedAt: new Date("2026-03-13T00:00:00Z"),
    },
  ];

  return {
    getDb: vi.fn().mockResolvedValue({}),
    upsertUser: vi.fn(),
    getUserByOpenId: vi.fn(),
    insertSubscriber: vi.fn().mockResolvedValue({ success: true, alreadyExists: false }),
    markEmailSent: vi.fn(),
    getAllSubscribers: vi.fn().mockResolvedValue([]),
    getAllPurchases: vi.fn().mockResolvedValue([]),
    insertPurchase: vi.fn(),
    markPurchaseEmailSent: vi.fn(),
    insertBroadcast: vi.fn().mockResolvedValue(1),
    getAllBroadcasts: vi.fn().mockResolvedValue([]),
    getBroadcastById: vi.fn(),
    markBroadcastSending: vi.fn(),
    updateBroadcastAfterSend: vi.fn(),
    markBroadcastFailed: vi.fn(),
    // Blog post helpers
    insertBlogPost: vi.fn().mockResolvedValue(3),
    updateBlogPost: vi.fn(),
    deleteBlogPost: vi.fn(),
    getAllBlogPosts: vi.fn().mockResolvedValue(mockPosts),
    getPublishedBlogPosts: vi.fn().mockResolvedValue(
      mockPosts.filter((p) => p.status === "published")
    ),
    getBlogPostBySlug: vi.fn().mockImplementation(async (slug: string) => {
      return mockPosts.find((p) => p.slug === slug) ?? null;
    }),
    getBlogPostById: vi.fn().mockImplementation(async (id: number) => {
      return mockPosts.find((p) => p.id === id) ?? null;
    }),
  };
});

// Mock emailService
vi.mock("./emailService", () => ({
  sendChecklistEmail: vi.fn().mockResolvedValue({ success: true }),
}));

// Mock notificationService
vi.mock("./notificationService", () => ({
  notifyNewSubscriber: vi.fn().mockResolvedValue(undefined),
}));

// Mock broadcastEmailTemplate
vi.mock("./broadcastEmailTemplate", () => ({
  buildBroadcastEmail: vi.fn().mockReturnValue({
    subject: "Test Subject",
    html: "<p>Test</p>",
    text: "Test",
  }),
}));

// Mock sendgrid
vi.mock("@sendgrid/mail", () => ({
  default: {
    setApiKey: vi.fn(),
    send: vi.fn().mockResolvedValue([{ statusCode: 202 }]),
  },
}));

// Mock ENV to set admin password for tests
vi.mock("./_core/env", () => ({
  ENV: {
    appId: "",
    cookieSecret: "",
    databaseUrl: "",
    oAuthServerUrl: "",
    ownerOpenId: "",
    isProduction: false,
    forgeApiUrl: "",
    forgeApiKey: "",
    adminPassword: "test-admin-password",
    stripeSecretKey: "",
    sendgridApiKey: "",
  },
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

// ---- Public Blog API Tests ----

describe("blog.list (public)", () => {
  it("returns only published posts without full content", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.blog.list();

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Test Published Post");
    expect(result[0].slug).toBe("test-published-post");
    expect(result[0].category).toBe("Scam Awareness");
    // Should not include content in list view
    expect((result[0] as Record<string, unknown>).content).toBeUndefined();
  });
});

describe("blog.getBySlug (public)", () => {
  it("returns a published post by slug", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.blog.getBySlug({ slug: "test-published-post" });

    expect(result.title).toBe("Test Published Post");
    expect(result.content).toContain("## Test Content");
    expect(result.status).toBe("published");
  });

  it("throws NOT_FOUND for non-existent slug", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.blog.getBySlug({ slug: "non-existent-post" })
    ).rejects.toThrow("Post not found");
  });

  it("throws NOT_FOUND for draft post slug", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.blog.getBySlug({ slug: "test-draft-post" })
    ).rejects.toThrow("Post not found");
  });
});

// ---- Admin Blog CMS Tests ----

describe("admin.listBlogPosts", () => {
  it("returns all posts (including drafts) for admin", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.admin.listBlogPosts({
      password: "test-admin-password",
    });

    expect(result.total).toBe(2);
    expect(result.posts).toHaveLength(2);
  });

  it("rejects with wrong password", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.admin.listBlogPosts({ password: "wrong-password" })
    ).rejects.toThrow("Incorrect password");
  });
});

describe("admin.createBlogPost", () => {
  it("creates a new blog post and returns its ID", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.admin.createBlogPost({
      password: "test-admin-password",
      title: "New Test Post",
      slug: "new-test-post",
      category: "Online Safety",
      excerpt: "A new test post excerpt.",
      content: "## New Post\n\nContent goes here.",
      date: "March 15, 2026",
      readTime: "4 min read",
      status: "draft",
    });

    expect(result.id).toBe(3);
  });

  it("enforces brand rules (strips em dashes)", async () => {
    const { insertBlogPost } = await import("./db");
    const caller = appRouter.createCaller(createPublicContext());

    await caller.admin.createBlogPost({
      password: "test-admin-password",
      title: "Brand Test",
      slug: "brand-test",
      category: "Online Safety",
      excerpt: "Test with em dash \u2014 here",
      content: "Content with em dash \u2014 and en dash \u2013 here",
      date: "March 15, 2026",
      readTime: "3 min read",
      status: "draft",
    });

    // Verify the insertBlogPost was called with cleaned content
    expect(insertBlogPost).toHaveBeenCalledWith(
      expect.objectContaining({
        content: expect.not.stringContaining("\u2014"),
        excerpt: expect.not.stringContaining("\u2014"),
      })
    );
  });

  it("rejects with wrong password", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.admin.createBlogPost({
        password: "wrong",
        title: "Test",
        slug: "test",
        category: "Test",
        excerpt: "Test",
        content: "Test",
        date: "March 15, 2026",
        readTime: "3 min read",
      })
    ).rejects.toThrow("Incorrect password");
  });
});

describe("admin.updateBlogPost", () => {
  it("updates an existing blog post", async () => {
    const { updateBlogPost } = await import("./db");
    const caller = appRouter.createCaller(createPublicContext());

    const result = await caller.admin.updateBlogPost({
      password: "test-admin-password",
      id: 1,
      title: "Updated Title",
    });

    expect(result.success).toBe(true);
    expect(updateBlogPost).toHaveBeenCalledWith(
      1,
      expect.objectContaining({ title: "Updated Title" })
    );
  });

  it("throws NOT_FOUND for non-existent post", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.admin.updateBlogPost({
        password: "test-admin-password",
        id: 999,
        title: "Updated",
      })
    ).rejects.toThrow("Post not found");
  });
});

describe("admin.deleteBlogPost", () => {
  it("deletes a blog post", async () => {
    const { deleteBlogPost } = await import("./db");
    const caller = appRouter.createCaller(createPublicContext());

    const result = await caller.admin.deleteBlogPost({
      password: "test-admin-password",
      id: 1,
    });

    expect(result.success).toBe(true);
    expect(deleteBlogPost).toHaveBeenCalledWith(1);
  });
});

describe("admin.toggleBlogPostStatus", () => {
  it("toggles a published post to draft", async () => {
    const { updateBlogPost } = await import("./db");
    const caller = appRouter.createCaller(createPublicContext());

    const result = await caller.admin.toggleBlogPostStatus({
      password: "test-admin-password",
      id: 1,
    });

    expect(result.newStatus).toBe("draft");
    expect(updateBlogPost).toHaveBeenCalledWith(1, { status: "draft" });
  });

  it("toggles a draft post to published", async () => {
    const { updateBlogPost } = await import("./db");
    const caller = appRouter.createCaller(createPublicContext());

    const result = await caller.admin.toggleBlogPostStatus({
      password: "test-admin-password",
      id: 2,
    });

    expect(result.newStatus).toBe("published");
    expect(updateBlogPost).toHaveBeenCalledWith(2, { status: "published" });
  });

  it("throws NOT_FOUND for non-existent post", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.admin.toggleBlogPostStatus({
        password: "test-admin-password",
        id: 999,
      })
    ).rejects.toThrow("Post not found");
  });
});
