/*
 * Admin Dashboard - Bright Path Cyber
 * Password-protected dashboard with tabs: Subscribers, Purchases, Blog Posts, Broadcast, Quick Links
 */

import { useState, useCallback } from "react";
import { trpc } from "@/lib/trpc";
import {
  Download, Users, Mail, CheckCircle, XCircle, LogOut, Lock,
  DollarSign, ShoppingBag, ExternalLink, Send, Clock, Eye, FileText,
  ChevronDown, AlertCircle, Plus, Edit2, Trash2, ToggleLeft, ToggleRight,
  BookOpen, ArrowLeft,
} from "lucide-react";

const BPC_HEADER_IMAGE_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663415118379/JXjpt8aqftuhQ9n25h55pn/BPC_Header_Logo_cropped_3d4d31ef.png";

type Tab = "subscribers" | "purchases" | "blog" | "broadcast" | "links";
type TemplateType = "blog_update" | "course_launch" | "custom";

const BRASS = "#C9A84C";
const NEAR_BLACK = "#1A1A1A";
const WARM_GRAY = "#6B6560";
const IVORY = "#F5F0E8";
const WHITE_CARD = "rgba(255,255,255,0.7)";
const CARD_BORDER = "rgba(201,168,76,0.2)";

// ── Login Screen ────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: (pw: string) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginMutation = trpc.admin.login.useMutation({
    onSuccess: () => { onLogin(password); },
    onError: (err) => {
      setError(err.message || "Incorrect password");
      setLoading(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setError("");
    setLoading(true);
    loginMutation.mutate({ password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: IVORY }}>
      <div className="w-full max-w-md p-10" style={{ backgroundColor: "rgba(255,255,255,0.8)", border: `1px solid ${CARD_BORDER}`, borderRadius: "6px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
        <div className="flex justify-center mb-8">
          <img src={BPC_HEADER_IMAGE_URL} alt="Bright Path Cyber" className="h-14 w-auto" />
        </div>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4" style={{ backgroundColor: "rgba(201,168,76,0.12)", border: `1px solid ${CARD_BORDER}` }}>
            <Lock size={20} style={{ color: BRASS }} />
          </div>
          <h1 className="font-display font-semibold text-2xl mb-1" style={{ color: NEAR_BLACK }}>Admin Access</h1>
          <p className="font-body text-sm" style={{ color: WARM_GRAY }}>Dashboard - authorized access only</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-password" className="block font-body text-xs font-semibold uppercase mb-2" style={{ color: NEAR_BLACK, letterSpacing: "0.1em" }}>Password</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              autoFocus
              className="w-full px-4 py-3 font-body text-sm outline-none"
              style={{ backgroundColor: IVORY, border: error ? "1px solid #c0392b" : `1px solid rgba(201,168,76,0.4)`, borderRadius: "4px", color: NEAR_BLACK }}
            />
            {error && <p className="mt-2 font-body text-xs" style={{ color: "#c0392b" }}>{error}</p>}
          </div>
          <button
            type="submit"
            disabled={loading || !password.trim()}
            className="w-full py-3 font-body text-sm font-semibold"
            style={{ backgroundColor: loading || !password.trim() ? "rgba(201,168,76,0.4)" : BRASS, color: NEAR_BLACK, borderRadius: "4px", letterSpacing: "0.05em", cursor: loading || !password.trim() ? "not-allowed" : "pointer" }}
          >
            {loading ? "Verifying..." : "Access Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Subscribers Tab ─────────────────────────────────────────────────────────

function SubscribersTab({ password }: { password: string }) {
  const { data, isLoading, error } = trpc.admin.listSubscribers.useQuery({ password }, { retry: false });

  const exportMutation = trpc.admin.exportCsv.useMutation({
    onSuccess: ({ csv }) => {
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `brightpathcyber-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    },
  });

  const handleExport = useCallback(() => { exportMutation.mutate({ password }); }, [password, exportMutation]);

  const formatDate = (d: Date | string) => {
    const date = d instanceof Date ? d : new Date(d);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  if (error) {
    return <div className="px-6 py-16 text-center"><p className="font-body text-sm" style={{ color: "#c0392b" }}>Failed to load subscribers.</p></div>;
  }

  const emailSentCount = data?.subscribers.filter((s) => s.emailSent).length ?? 0;
  const stats = [
    { icon: Users, label: "Total Subscribers", value: isLoading ? "..." : String(data?.total ?? 0) },
    { icon: Mail, label: "Emails Sent", value: isLoading ? "..." : String(emailSentCount) },
    { icon: CheckCircle, label: "Delivery Rate", value: isLoading || !data?.total ? "..." : `${Math.round((emailSentCount / data.total) * 100)}%` },
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="p-6 flex items-center gap-4" style={{ backgroundColor: WHITE_CARD, border: `1px solid ${CARD_BORDER}`, borderRadius: "6px" }}>
            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(201,168,76,0.1)", border: `1px solid rgba(201,168,76,0.25)`, borderRadius: "4px" }}>
              <Icon size={18} style={{ color: BRASS }} />
            </div>
            <div>
              <div className="font-display font-semibold text-2xl" style={{ color: NEAR_BLACK }}>{value}</div>
              <div className="font-body text-xs" style={{ color: WARM_GRAY }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: WHITE_CARD, border: `1px solid ${CARD_BORDER}`, borderRadius: "6px", overflow: "hidden" }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
          <h2 className="font-display font-semibold text-lg" style={{ color: NEAR_BLACK }}>Subscriber List</h2>
          <button
            onClick={handleExport}
            disabled={exportMutation.isPending || isLoading || !data?.total}
            className="flex items-center gap-2 px-4 py-2 font-body text-sm font-medium"
            style={{ backgroundColor: exportMutation.isPending ? "rgba(201,168,76,0.4)" : BRASS, color: NEAR_BLACK, borderRadius: "4px", cursor: exportMutation.isPending || !data?.total ? "not-allowed" : "pointer", opacity: !data?.total ? 0.5 : 1 }}
          >
            <Download size={14} />
            {exportMutation.isPending ? "Exporting..." : "Export CSV"}
          </button>
        </div>

        {isLoading && (
          <div className="px-6 py-16 text-center">
            <div className="inline-block w-6 h-6 rounded-full border-2 animate-spin mb-3" style={{ borderColor: "rgba(201,168,76,0.3)", borderTopColor: BRASS }} />
            <p className="font-body text-sm" style={{ color: WARM_GRAY }}>Loading subscribers...</p>
          </div>
        )}

        {!isLoading && data?.total === 0 && (
          <div className="px-6 py-16 text-center">
            <Users size={32} className="mx-auto mb-3" style={{ color: "rgba(201,168,76,0.4)" }} />
            <p className="font-body text-sm" style={{ color: WARM_GRAY }}>No subscribers yet. Share the free checklist to start building your list.</p>
          </div>
        )}

        {!isLoading && data && data.total > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
                  {["Name", "Email", "Signup Date", "Email Sent"].map((col) => (
                    <th key={col} className="px-6 py-3 text-left font-body text-xs font-semibold uppercase" style={{ color: WARM_GRAY, letterSpacing: "0.08em" }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.subscribers.map((sub, i) => (
                  <tr key={sub.id} style={{ borderBottom: i < data.subscribers.length - 1 ? "1px solid rgba(201,168,76,0.08)" : "none", backgroundColor: i % 2 === 0 ? "transparent" : "rgba(201,168,76,0.03)" }}>
                    <td className="px-6 py-4 font-body text-sm font-medium" style={{ color: NEAR_BLACK }}>{sub.name}</td>
                    <td className="px-6 py-4 font-body text-sm">
                      <a href={`mailto:${sub.email}`} style={{ color: BRASS, textDecoration: "none" }}>{sub.email}</a>
                    </td>
                    <td className="px-6 py-4 font-body text-sm" style={{ color: WARM_GRAY }}>{formatDate(sub.createdAt)}</td>
                    <td className="px-6 py-4">
                      {sub.emailSent
                        ? <span className="flex items-center gap-1.5 font-body text-xs font-medium" style={{ color: "#2e7d32" }}><CheckCircle size={14} /> Sent</span>
                        : <span className="flex items-center gap-1.5 font-body text-xs" style={{ color: "#9e9e9e" }}><XCircle size={14} /> Pending</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

// ── Purchases Tab ───────────────────────────────────────────────────────────

function PurchasesTab({ password }: { password: string }) {
  const { data, isLoading, error } = trpc.admin.listPurchases.useQuery({ password }, { retry: false });

  const formatDate = (d: Date | string) => {
    const date = d instanceof Date ? d : new Date(d);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  const formatAmount = (cents: number, currency: string) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format(cents / 100);
  };

  if (error) {
    return <div className="px-6 py-16 text-center"><p className="font-body text-sm" style={{ color: "#c0392b" }}>Failed to load purchases.</p></div>;
  }

  const totalRevenue = data?.purchases.reduce((sum, p) => sum + p.amountTotal, 0) ?? 0;
  const stats = [
    { icon: ShoppingBag, label: "Total Purchases", value: isLoading ? "..." : String(data?.total ?? 0) },
    { icon: DollarSign, label: "Total Revenue", value: isLoading ? "..." : formatAmount(totalRevenue, "usd") },
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="p-6 flex items-center gap-4" style={{ backgroundColor: WHITE_CARD, border: `1px solid ${CARD_BORDER}`, borderRadius: "6px" }}>
            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(201,168,76,0.1)", border: `1px solid rgba(201,168,76,0.25)`, borderRadius: "4px" }}>
              <Icon size={18} style={{ color: BRASS }} />
            </div>
            <div>
              <div className="font-display font-semibold text-2xl" style={{ color: NEAR_BLACK }}>{value}</div>
              <div className="font-body text-xs" style={{ color: WARM_GRAY }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: WHITE_CARD, border: `1px solid ${CARD_BORDER}`, borderRadius: "6px", overflow: "hidden" }}>
        <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
          <h2 className="font-display font-semibold text-lg" style={{ color: NEAR_BLACK }}>Purchase History</h2>
        </div>

        {isLoading && (
          <div className="px-6 py-16 text-center">
            <div className="inline-block w-6 h-6 rounded-full border-2 animate-spin mb-3" style={{ borderColor: "rgba(201,168,76,0.3)", borderTopColor: BRASS }} />
            <p className="font-body text-sm" style={{ color: WARM_GRAY }}>Loading purchases...</p>
          </div>
        )}

        {!isLoading && data?.total === 0 && (
          <div className="px-6 py-16 text-center">
            <ShoppingBag size={32} className="mx-auto mb-3" style={{ color: "rgba(201,168,76,0.4)" }} />
            <p className="font-body text-sm" style={{ color: WARM_GRAY }}>No purchases yet.</p>
          </div>
        )}

        {!isLoading && data && data.total > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
                  {["Date", "Email", "Product", "Amount", "Status"].map((col) => (
                    <th key={col} className="px-6 py-3 text-left font-body text-xs font-semibold uppercase" style={{ color: WARM_GRAY, letterSpacing: "0.08em" }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.purchases.map((p, i) => (
                  <tr key={p.id} style={{ borderBottom: i < data.purchases.length - 1 ? "1px solid rgba(201,168,76,0.08)" : "none", backgroundColor: i % 2 === 0 ? "transparent" : "rgba(201,168,76,0.03)" }}>
                    <td className="px-6 py-4 font-body text-sm" style={{ color: WARM_GRAY }}>{formatDate(p.createdAt)}</td>
                    <td className="px-6 py-4 font-body text-sm"><a href={`mailto:${p.customerEmail}`} style={{ color: BRASS, textDecoration: "none" }}>{p.customerEmail}</a></td>
                    <td className="px-6 py-4 font-body text-sm font-medium" style={{ color: NEAR_BLACK }}>{p.productName}</td>
                    <td className="px-6 py-4 font-body text-sm font-semibold" style={{ color: NEAR_BLACK }}>{formatAmount(p.amountTotal, p.currency)}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 font-body text-xs font-medium" style={{ color: p.paymentStatus === "paid" ? "#2e7d32" : WARM_GRAY }}>
                        {p.paymentStatus === "paid" ? <CheckCircle size={14} /> : <Clock size={14} />}
                        {p.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

// ── Blog Posts Tab ──────────────────────────────────────────────────────────

type BlogFormData = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  imageUrl: string;
  status: "draft" | "published";
};

const EMPTY_FORM: BlogFormData = {
  title: "",
  slug: "",
  category: "Scam Awareness",
  excerpt: "",
  content: "",
  date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
  readTime: "5 min read",
  imageUrl: "",
  status: "draft",
};

const CATEGORIES = ["Scam Awareness", "Account Security", "Online Safety", "Privacy Protection", "Device Security", "General"];

function BlogPostsTab({ password }: { password: string }) {
  const utils = trpc.useUtils();
  const { data, isLoading } = trpc.admin.listBlogPosts.useQuery({ password }, { retry: false });
  const [view, setView] = useState<"list" | "form" | "preview">("list");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<BlogFormData>(EMPTY_FORM);
  const [previewContent, setPreviewContent] = useState("");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const createMutation = trpc.admin.createBlogPost.useMutation({
    onSuccess: () => {
      setFeedback({ type: "success", msg: "Post created successfully." });
      utils.admin.listBlogPosts.invalidate();
      setTimeout(() => { setView("list"); setFeedback(null); setForm(EMPTY_FORM); setEditingId(null); }, 1200);
    },
    onError: (err) => setFeedback({ type: "error", msg: err.message }),
  });

  const updateMutation = trpc.admin.updateBlogPost.useMutation({
    onSuccess: () => {
      setFeedback({ type: "success", msg: "Post updated successfully." });
      utils.admin.listBlogPosts.invalidate();
      setTimeout(() => { setView("list"); setFeedback(null); setForm(EMPTY_FORM); setEditingId(null); }, 1200);
    },
    onError: (err) => setFeedback({ type: "error", msg: err.message }),
  });

  const deleteMutation = trpc.admin.deleteBlogPost.useMutation({
    onSuccess: () => {
      setFeedback({ type: "success", msg: "Post deleted." });
      utils.admin.listBlogPosts.invalidate();
      setConfirmDelete(null);
      setTimeout(() => setFeedback(null), 2000);
    },
    onError: (err) => setFeedback({ type: "error", msg: err.message }),
  });

  const toggleMutation = trpc.admin.toggleBlogPostStatus.useMutation({
    onSuccess: (result) => {
      const msg = result.newStatus === "published"
        ? "Post published. A broadcast email will be sent to subscribers."
        : "Post moved to draft.";
      setFeedback({ type: "success", msg });
      utils.admin.listBlogPosts.invalidate();
      setTimeout(() => setFeedback(null), 3000);
    },
    onError: (err) => setFeedback({ type: "error", msg: err.message }),
  });

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  };

  const handleTitleChange = (title: string) => {
    setForm(f => ({
      ...f,
      title,
      slug: editingId ? f.slug : generateSlug(title),
    }));
  };

  const handleSave = () => {
    if (!form.title || !form.slug || !form.excerpt || !form.content) {
      setFeedback({ type: "error", msg: "Please fill in all required fields (title, slug, excerpt, content)." });
      return;
    }
    if (editingId) {
      updateMutation.mutate({ password, id: editingId, ...form, imageUrl: form.imageUrl || undefined });
    } else {
      createMutation.mutate({ password, ...form, imageUrl: form.imageUrl || undefined });
    }
  };

  const handleEdit = (post: NonNullable<typeof data>["posts"][number]) => {
    setForm({
      title: post.title,
      slug: post.slug,
      category: post.category,
      excerpt: post.excerpt,
      content: post.content,
      date: post.date,
      readTime: post.readTime,
      imageUrl: post.imageUrl ?? "",
      status: post.status as "draft" | "published",
    });
    setEditingId(post.id);
    setFeedback(null);
    setView("form");
  };

  const handleNewPost = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setFeedback(null);
    setView("form");
  };

  const handlePreview = () => {
    setPreviewContent(form.content);
    setView("preview");
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  // ── Preview View ──
  if (view === "preview") {
    return (
      <div>
        <button onClick={() => setView("form")} className="flex items-center gap-2 mb-6 font-body text-sm" style={{ color: BRASS, cursor: "pointer", background: "none", border: "none" }}>
          <ArrowLeft size={14} /> Back to editor
        </button>
        <div style={{ backgroundColor: WHITE_CARD, border: `1px solid ${CARD_BORDER}`, borderRadius: "6px", overflow: "hidden" }}>
          <div className="px-8 py-6" style={{ borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
            <span className="inline-block px-3 py-1 mb-3 font-body text-xs font-semibold uppercase rounded" style={{ backgroundColor: "rgba(201,168,76,0.12)", color: BRASS, letterSpacing: "0.08em" }}>{form.category}</span>
            <h1 className="font-display text-3xl font-bold mb-2" style={{ color: NEAR_BLACK }}>{form.title || "Untitled Post"}</h1>
            <p className="font-body text-sm" style={{ color: WARM_GRAY }}>{form.date} - {form.readTime}</p>
          </div>
          <div className="px-8 py-6">
            <p className="font-body text-base mb-6 italic" style={{ color: WARM_GRAY }}>{form.excerpt}</p>
            <div className="font-body text-base leading-relaxed prose max-w-none" style={{ color: NEAR_BLACK }}>
              {previewContent.split("\n").map((line, i) => {
                if (line.startsWith("### ")) return <h3 key={i} className="font-display text-lg font-semibold mt-6 mb-2" style={{ color: NEAR_BLACK }}>{line.slice(4)}</h3>;
                if (line.startsWith("## ")) return <h2 key={i} className="font-display text-xl font-bold mt-8 mb-3" style={{ color: NEAR_BLACK }}>{line.slice(3)}</h2>;
                if (line.startsWith("# ")) return <h1 key={i} className="font-display text-2xl font-bold mt-8 mb-3" style={{ color: NEAR_BLACK }}>{line.slice(2)}</h1>;
                if (line.startsWith("*") && line.endsWith("*") && !line.startsWith("**")) return <p key={i} className="italic my-3 pl-4" style={{ color: BRASS, borderLeft: `2px solid ${BRASS}` }}>{line.slice(1, -1)}</p>;
                if (line.startsWith("- ")) return <li key={i} className="ml-4 mb-1">{line.slice(2)}</li>;
                if (line.trim() === "") return <br key={i} />;
                return <p key={i} className="mb-3">{line}</p>;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Form View ──
  if (view === "form") {
    return (
      <div>
        <button onClick={() => { setView("list"); setFeedback(null); }} className="flex items-center gap-2 mb-6 font-body text-sm" style={{ color: BRASS, cursor: "pointer", background: "none", border: "none" }}>
          <ArrowLeft size={14} /> Back to posts
        </button>

        <div className="mb-6">
          <h2 className="font-display font-semibold text-lg mb-1" style={{ color: NEAR_BLACK }}>{editingId ? "Edit Post" : "New Post"}</h2>
          <p className="font-body text-sm" style={{ color: WARM_GRAY }}>
            {editingId ? "Update the post details below." : "Fill in the details to create a new blog post."}
          </p>
        </div>

        <div style={{ backgroundColor: WHITE_CARD, border: `1px solid ${CARD_BORDER}`, borderRadius: "6px" }} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block font-body text-xs font-semibold uppercase mb-2" style={{ color: NEAR_BLACK, letterSpacing: "0.08em" }}>Title *</label>
            <input
              value={form.title}
              onChange={e => handleTitleChange(e.target.value)}
              placeholder="e.g. 5 Scams Targeting Everyday People Right Now"
              className="w-full px-4 py-3 font-body text-sm outline-none"
              style={{ backgroundColor: IVORY, border: `1px solid rgba(201,168,76,0.35)`, borderRadius: "4px", color: NEAR_BLACK }}
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block font-body text-xs font-semibold uppercase mb-2" style={{ color: NEAR_BLACK, letterSpacing: "0.08em" }}>Slug</label>
            <input
              value={form.slug}
              onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
              placeholder="auto-generated-from-title"
              className="w-full px-4 py-3 font-body text-sm outline-none"
              style={{ backgroundColor: IVORY, border: `1px solid rgba(201,168,76,0.35)`, borderRadius: "4px", color: NEAR_BLACK }}
            />
            <p className="mt-1 font-body text-xs" style={{ color: WARM_GRAY }}>URL: brightpathcyber.com/blog/{form.slug || "..."}</p>
          </div>

          {/* Category + Read Time + Date row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-body text-xs font-semibold uppercase mb-2" style={{ color: NEAR_BLACK, letterSpacing: "0.08em" }}>Category</label>
              <select
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="w-full px-4 py-3 font-body text-sm outline-none"
                style={{ backgroundColor: IVORY, border: `1px solid rgba(201,168,76,0.35)`, borderRadius: "4px", color: NEAR_BLACK }}
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-body text-xs font-semibold uppercase mb-2" style={{ color: NEAR_BLACK, letterSpacing: "0.08em" }}>Read Time</label>
              <input
                value={form.readTime}
                onChange={e => setForm(f => ({ ...f, readTime: e.target.value }))}
                placeholder="5 min read"
                className="w-full px-4 py-3 font-body text-sm outline-none"
                style={{ backgroundColor: IVORY, border: `1px solid rgba(201,168,76,0.35)`, borderRadius: "4px", color: NEAR_BLACK }}
              />
            </div>
            <div>
              <label className="block font-body text-xs font-semibold uppercase mb-2" style={{ color: NEAR_BLACK, letterSpacing: "0.08em" }}>Date</label>
              <input
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                placeholder="March 10, 2025"
                className="w-full px-4 py-3 font-body text-sm outline-none"
                style={{ backgroundColor: IVORY, border: `1px solid rgba(201,168,76,0.35)`, borderRadius: "4px", color: NEAR_BLACK }}
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block font-body text-xs font-semibold uppercase mb-2" style={{ color: NEAR_BLACK, letterSpacing: "0.08em" }}>Hero Image URL (optional)</label>
            <input
              value={form.imageUrl}
              onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))}
              placeholder="https://cdn.example.com/image.jpg"
              className="w-full px-4 py-3 font-body text-sm outline-none"
              style={{ backgroundColor: IVORY, border: `1px solid rgba(201,168,76,0.35)`, borderRadius: "4px", color: NEAR_BLACK }}
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block font-body text-xs font-semibold uppercase mb-2" style={{ color: NEAR_BLACK, letterSpacing: "0.08em" }}>Excerpt *</label>
            <textarea
              value={form.excerpt}
              onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
              rows={3}
              placeholder="A brief summary that appears on the blog listing page..."
              className="w-full px-4 py-3 font-body text-sm outline-none resize-y"
              style={{ backgroundColor: IVORY, border: `1px solid rgba(201,168,76,0.35)`, borderRadius: "4px", color: NEAR_BLACK }}
            />
          </div>

          {/* Content */}
          <div>
            <label className="block font-body text-xs font-semibold uppercase mb-2" style={{ color: NEAR_BLACK, letterSpacing: "0.08em" }}>Content (Markdown) *</label>
            <textarea
              value={form.content}
              onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
              rows={16}
              placeholder={"## Introduction\n\nWrite your blog post content here using Markdown...\n\n### Tips Section\n\n*Italicized callouts will appear as brass-colored highlights.*\n\n- Bullet points for practical tips\n- Keep it jargon-free and relatable"}
              className="w-full px-4 py-3 font-body text-sm outline-none resize-y font-mono"
              style={{ backgroundColor: IVORY, border: `1px solid rgba(201,168,76,0.35)`, borderRadius: "4px", color: NEAR_BLACK, lineHeight: "1.6" }}
            />
            <p className="mt-1 font-body text-xs" style={{ color: WARM_GRAY }}>
              Brand rules: no emojis, no em dashes. Use regular hyphens or commas. Content is auto-cleaned on save.
            </p>
          </div>

          {/* Status */}
          <div>
            <label className="block font-body text-xs font-semibold uppercase mb-2" style={{ color: NEAR_BLACK, letterSpacing: "0.08em" }}>Status</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setForm(f => ({ ...f, status: "draft" }))}
                className="px-4 py-2 font-body text-sm font-medium rounded"
                style={{
                  backgroundColor: form.status === "draft" ? "rgba(107,101,96,0.15)" : "transparent",
                  border: `1px solid ${form.status === "draft" ? WARM_GRAY : "rgba(201,168,76,0.3)"}`,
                  color: form.status === "draft" ? NEAR_BLACK : WARM_GRAY,
                  cursor: "pointer",
                }}
              >
                Draft
              </button>
              <button
                type="button"
                onClick={() => setForm(f => ({ ...f, status: "published" }))}
                className="px-4 py-2 font-body text-sm font-medium rounded"
                style={{
                  backgroundColor: form.status === "published" ? "rgba(46,125,50,0.12)" : "transparent",
                  border: `1px solid ${form.status === "published" ? "#2e7d32" : "rgba(201,168,76,0.3)"}`,
                  color: form.status === "published" ? "#2e7d32" : WARM_GRAY,
                  cursor: "pointer",
                }}
              >
                Published
              </button>
            </div>
            {form.status === "published" && !editingId && (
              <p className="mt-2 font-body text-xs" style={{ color: BRASS }}>
                Publishing will automatically send a broadcast email to all subscribers.
              </p>
            )}
          </div>

          {/* Feedback */}
          {feedback && (
            <div className="p-3 rounded flex items-start gap-2" style={{
              backgroundColor: feedback.type === "success" ? "rgba(46,125,50,0.08)" : "rgba(192,57,43,0.08)",
              border: `1px solid ${feedback.type === "success" ? "rgba(46,125,50,0.2)" : "rgba(192,57,43,0.2)"}`,
            }}>
              {feedback.type === "success" ? <CheckCircle size={16} style={{ color: "#2e7d32", flexShrink: 0, marginTop: 1 }} /> : <AlertCircle size={16} style={{ color: "#c0392b", flexShrink: 0, marginTop: 1 }} />}
              <p className="font-body text-sm" style={{ color: feedback.type === "success" ? "#2e7d32" : "#c0392b" }}>{feedback.msg}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handlePreview}
              disabled={!form.content}
              className="flex items-center gap-2 px-4 py-2.5 font-body text-sm font-medium"
              style={{ border: `1px solid ${BRASS}`, borderRadius: "4px", color: BRASS, backgroundColor: "transparent", cursor: !form.content ? "not-allowed" : "pointer", opacity: !form.content ? 0.5 : 1 }}
            >
              <Eye size={14} /> Preview
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-2.5 font-body text-sm font-semibold"
              style={{ backgroundColor: isSaving ? "rgba(201,168,76,0.4)" : BRASS, color: NEAR_BLACK, borderRadius: "4px", cursor: isSaving ? "not-allowed" : "pointer" }}
            >
              {isSaving ? "Saving..." : editingId ? "Update Post" : "Create Post"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── List View ──
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display font-semibold text-lg mb-1" style={{ color: NEAR_BLACK }}>Blog Posts</h2>
          <p className="font-body text-sm" style={{ color: WARM_GRAY }}>
            {isLoading ? "Loading..." : `${data?.total ?? 0} posts total`}
          </p>
        </div>
        <button
          onClick={handleNewPost}
          className="flex items-center gap-2 px-4 py-2.5 font-body text-sm font-semibold"
          style={{ backgroundColor: BRASS, color: NEAR_BLACK, borderRadius: "4px", cursor: "pointer" }}
        >
          <Plus size={14} /> New Post
        </button>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className="mb-4 p-3 rounded flex items-start gap-2" style={{
          backgroundColor: feedback.type === "success" ? "rgba(46,125,50,0.08)" : "rgba(192,57,43,0.08)",
          border: `1px solid ${feedback.type === "success" ? "rgba(46,125,50,0.2)" : "rgba(192,57,43,0.2)"}`,
        }}>
          {feedback.type === "success" ? <CheckCircle size={16} style={{ color: "#2e7d32", flexShrink: 0, marginTop: 1 }} /> : <AlertCircle size={16} style={{ color: "#c0392b", flexShrink: 0, marginTop: 1 }} />}
          <p className="font-body text-sm" style={{ color: feedback.type === "success" ? "#2e7d32" : "#c0392b" }}>{feedback.msg}</p>
        </div>
      )}

      <div style={{ backgroundColor: WHITE_CARD, border: `1px solid ${CARD_BORDER}`, borderRadius: "6px", overflow: "hidden" }}>
        {isLoading && (
          <div className="px-6 py-16 text-center">
            <div className="inline-block w-6 h-6 rounded-full border-2 animate-spin mb-3" style={{ borderColor: "rgba(201,168,76,0.3)", borderTopColor: BRASS }} />
            <p className="font-body text-sm" style={{ color: WARM_GRAY }}>Loading posts...</p>
          </div>
        )}

        {!isLoading && data?.total === 0 && (
          <div className="px-6 py-16 text-center">
            <BookOpen size={32} className="mx-auto mb-3" style={{ color: "rgba(201,168,76,0.4)" }} />
            <p className="font-body text-sm mb-4" style={{ color: WARM_GRAY }}>No blog posts yet. Create your first post to get started.</p>
            <button
              onClick={handleNewPost}
              className="inline-flex items-center gap-2 px-4 py-2 font-body text-sm font-medium"
              style={{ backgroundColor: BRASS, color: NEAR_BLACK, borderRadius: "4px", cursor: "pointer" }}
            >
              <Plus size={14} /> Create First Post
            </button>
          </div>
        )}

        {!isLoading && data && data.total > 0 && (
          <div>
            {data.posts.map((post, i) => (
              <div
                key={post.id}
                className="px-6 py-5"
                style={{ borderBottom: i < data.posts.length - 1 ? "1px solid rgba(201,168,76,0.1)" : "none" }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="inline-block px-2 py-0.5 font-body text-[10px] font-semibold uppercase rounded" style={{ backgroundColor: "rgba(201,168,76,0.12)", color: BRASS, letterSpacing: "0.06em" }}>{post.category}</span>
                      <span
                        className="inline-block px-2 py-0.5 font-body text-[10px] font-semibold uppercase rounded"
                        style={{
                          backgroundColor: post.status === "published" ? "rgba(46,125,50,0.1)" : "rgba(107,101,96,0.1)",
                          color: post.status === "published" ? "#2e7d32" : WARM_GRAY,
                          letterSpacing: "0.06em",
                        }}
                      >
                        {post.status}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-base mb-1 truncate" style={{ color: NEAR_BLACK }}>{post.title}</h3>
                    <p className="font-body text-xs" style={{ color: WARM_GRAY }}>{post.date} - {post.readTime}</p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Toggle status */}
                    <button
                      onClick={() => toggleMutation.mutate({ password, id: post.id })}
                      disabled={toggleMutation.isPending}
                      title={post.status === "published" ? "Unpublish (move to draft)" : "Publish"}
                      className="p-2 rounded transition-colors"
                      style={{ color: post.status === "published" ? "#2e7d32" : WARM_GRAY, cursor: "pointer", backgroundColor: "transparent" }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(201,168,76,0.1)"; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; }}
                    >
                      {post.status === "published" ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => handleEdit(post)}
                      title="Edit post"
                      className="p-2 rounded transition-colors"
                      style={{ color: BRASS, cursor: "pointer", backgroundColor: "transparent" }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(201,168,76,0.1)"; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; }}
                    >
                      <Edit2 size={16} />
                    </button>

                    {/* Delete */}
                    {confirmDelete === post.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => deleteMutation.mutate({ password, id: post.id })}
                          disabled={deleteMutation.isPending}
                          className="px-2 py-1 font-body text-xs font-medium rounded"
                          style={{ backgroundColor: "rgba(192,57,43,0.1)", color: "#c0392b", cursor: "pointer", border: "1px solid rgba(192,57,43,0.3)" }}
                        >
                          {deleteMutation.isPending ? "..." : "Confirm"}
                        </button>
                        <button
                          onClick={() => setConfirmDelete(null)}
                          className="px-2 py-1 font-body text-xs rounded"
                          style={{ color: WARM_GRAY, cursor: "pointer", backgroundColor: "transparent" }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDelete(post.id)}
                        title="Delete post"
                        className="p-2 rounded transition-colors"
                        style={{ color: WARM_GRAY, cursor: "pointer", backgroundColor: "transparent" }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(192,57,43,0.08)"; e.currentTarget.style.color = "#c0392b"; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = WARM_GRAY; }}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

// ── Broadcast Tab ──────────────────────────────────────────────────────────

const TEMPLATE_LABELS: Record<TemplateType, string> = {
  blog_update: "Blog Update",
  course_launch: "Course Launch",
  custom: "Custom",
};

function BroadcastTab({ password }: { password: string }) {
  const utils = trpc.useUtils();
  const { data: historyData, isLoading: historyLoading } = trpc.admin.listBroadcasts.useQuery({ password }, { retry: false });

  const [templateType, setTemplateType] = useState<TemplateType>("blog_update");
  const [subject, setSubject] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogSnippet, setBlogSnippet] = useState("");
  const [blogLink, setBlogLink] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [courseLink, setCourseLink] = useState("");
  const [customBody, setCustomBody] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [previewHtml, setPreviewHtml] = useState("");
  const [sendSuccess, setSendSuccess] = useState<{ sentCount: number; total: number } | null>(null);
  const [sendError, setSendError] = useState("");
  const [isSending, setIsSending] = useState(false);

  const previewMutation = trpc.admin.previewBroadcast.useMutation({
    onSuccess: (data) => { setPreviewHtml(data.html); setShowPreview(true); },
    onError: (err) => setSendError(err.message),
  });

  const createMutation = trpc.admin.createBroadcast.useMutation();
  const sendMutation = trpc.admin.sendBroadcast.useMutation();

  const buildBodyJson = () => {
    if (templateType === "blog_update") return JSON.stringify({ blogTitle, previewSnippet: blogSnippet, postLink: blogLink });
    if (templateType === "course_launch") return JSON.stringify({ courseName, courseDescription: courseDesc, price: coursePrice, enrollmentLink: courseLink });
    return JSON.stringify({ htmlBody: customBody });
  };

  const isFormValid = () => {
    if (!subject.trim()) return false;
    if (templateType === "blog_update" && (!blogTitle.trim() || !blogSnippet.trim())) return false;
    if (templateType === "course_launch" && (!courseName.trim() || !courseDesc.trim())) return false;
    if (templateType === "custom" && !customBody.trim()) return false;
    return true;
  };

  const handlePreview = () => {
    setSendError("");
    previewMutation.mutate({ password, templateType, subject, bodyJson: buildBodyJson() });
  };

  const handleSend = async () => {
    setSendError("");
    setSendSuccess(null);
    setIsSending(true);
    try {
      const bodyJson = buildBodyJson();
      const scheduledAt = scheduleDate && scheduleTime ? new Date(`${scheduleDate}T${scheduleTime}`) : undefined;
      const { id } = await createMutation.mutateAsync({ password, templateType, subject, bodyJson, scheduledAt });
      if (scheduledAt) {
        setSendSuccess({ sentCount: 0, total: 0 });
        setIsSending(false);
        utils.admin.listBroadcasts.invalidate();
        return;
      }
      const result = await sendMutation.mutateAsync({ password, broadcastId: id });
      setSendSuccess({ sentCount: result.sentCount, total: result.total });
      utils.admin.listBroadcasts.invalidate();
    } catch (err: unknown) {
      setSendError(err instanceof Error ? err.message : "Failed to send broadcast");
    } finally {
      setIsSending(false);
    }
  };

  const formatDate = (d: Date | string) => {
    const date = d instanceof Date ? d : new Date(d);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  const statusBadge = (status: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      sent: { bg: "rgba(46,125,50,0.1)", text: "#2e7d32" },
      sending: { bg: "rgba(201,168,76,0.15)", text: BRASS },
      scheduled: { bg: "rgba(33,150,243,0.1)", text: "#1976d2" },
      draft: { bg: "rgba(107,101,96,0.1)", text: WARM_GRAY },
      failed: { bg: "rgba(192,57,43,0.1)", text: "#c0392b" },
    };
    const c = colors[status] ?? colors.draft;
    return <span className="inline-block px-2.5 py-0.5 font-body text-[10px] font-semibold uppercase rounded" style={{ backgroundColor: c.bg, color: c.text, letterSpacing: "0.06em" }}>{status}</span>;
  };

  return (
    <div className="space-y-8">
      {/* Compose */}
      <div style={{ backgroundColor: WHITE_CARD, border: `1px solid ${CARD_BORDER}`, borderRadius: "6px" }} className="p-6 space-y-5">
        <div>
          <h2 className="font-display font-semibold text-lg mb-1" style={{ color: NEAR_BLACK }}>Compose Broadcast</h2>
          <p className="font-body text-sm" style={{ color: WARM_GRAY }}>Send an email to all subscribers</p>
        </div>

        {/* Template Type */}
        <div>
          <label className="block font-body text-xs font-semibold uppercase mb-2" style={{ color: NEAR_BLACK, letterSpacing: "0.08em" }}>Template</label>
          <div className="relative">
            <select
              value={templateType}
              onChange={e => { setTemplateType(e.target.value as TemplateType); setSendSuccess(null); setSendError(""); }}
              className="w-full px-4 py-3 font-body text-sm outline-none appearance-none"
              style={{ backgroundColor: IVORY, border: `1px solid rgba(201,168,76,0.35)`, borderRadius: "4px", color: NEAR_BLACK }}
            >
              {Object.entries(TEMPLATE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: WARM_GRAY }} />
          </div>
        </div>

        {/* Subject */}
        <div>
          <label className="block font-body text-xs font-semibold uppercase mb-2" style={{ color: NEAR_BLACK, letterSpacing: "0.08em" }}>Subject Line</label>
          <input
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder="e.g. New Blog Post: 5 Scams to Watch For"
            className="w-full px-4 py-3 font-body text-sm outline-none"
            style={{ backgroundColor: IVORY, border: `1px solid rgba(201,168,76,0.35)`, borderRadius: "4px", color: NEAR_BLACK }}
          />
        </div>

        {/* Template-specific fields */}
        {templateType === "blog_update" && (
          <div className="space-y-4">
            <div>
              <label className="block font-body text-xs font-semibold uppercase mb-2" style={{ color: NEAR_BLACK, letterSpacing: "0.08em" }}>Blog Title</label>
              <input value={blogTitle} onChange={e => setBlogTitle(e.target.value)} placeholder="Title of the blog post" className="w-full px-4 py-3 font-body text-sm outline-none" style={{ backgroundColor: IVORY, border: `1px solid rgba(201,168,76,0.35)`, borderRadius: "4px", color: NEAR_BLACK }} />
            </div>
            <div>
              <label className="block font-body text-xs font-semibold uppercase mb-2" style={{ color: NEAR_BLACK, letterSpacing: "0.08em" }}>Preview Snippet</label>
              <textarea value={blogSnippet} onChange={e => setBlogSnippet(e.target.value)} rows={3} placeholder="A short preview of the post..." className="w-full px-4 py-3 font-body text-sm outline-none resize-y" style={{ backgroundColor: IVORY, border: `1px solid rgba(201,168,76,0.35)`, borderRadius: "4px", color: NEAR_BLACK }} />
            </div>
            <div>
              <label className="block font-body text-xs font-semibold uppercase mb-2" style={{ color: NEAR_BLACK, letterSpacing: "0.08em" }}>Link to Post</label>
              <input value={blogLink} onChange={e => setBlogLink(e.target.value)} placeholder="https://brightpathcyber.com/blog/..." className="w-full px-4 py-3 font-body text-sm outline-none" style={{ backgroundColor: IVORY, border: `1px solid rgba(201,168,76,0.35)`, borderRadius: "4px", color: NEAR_BLACK }} />
            </div>
          </div>
        )}

        {templateType === "course_launch" && (
          <div className="space-y-4">
            <div>
              <label className="block font-body text-xs font-semibold uppercase mb-2" style={{ color: NEAR_BLACK, letterSpacing: "0.08em" }}>Course Name</label>
              <input value={courseName} onChange={e => setCourseName(e.target.value)} placeholder="Course title" className="w-full px-4 py-3 font-body text-sm outline-none" style={{ backgroundColor: IVORY, border: `1px solid rgba(201,168,76,0.35)`, borderRadius: "4px", color: NEAR_BLACK }} />
            </div>
            <div>
              <label className="block font-body text-xs font-semibold uppercase mb-2" style={{ color: NEAR_BLACK, letterSpacing: "0.08em" }}>Description</label>
              <textarea value={courseDesc} onChange={e => setCourseDesc(e.target.value)} rows={3} placeholder="What students will learn..." className="w-full px-4 py-3 font-body text-sm outline-none resize-y" style={{ backgroundColor: IVORY, border: `1px solid rgba(201,168,76,0.35)`, borderRadius: "4px", color: NEAR_BLACK }} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-xs font-semibold uppercase mb-2" style={{ color: NEAR_BLACK, letterSpacing: "0.08em" }}>Price</label>
                <input value={coursePrice} onChange={e => setCoursePrice(e.target.value)} placeholder="$97" className="w-full px-4 py-3 font-body text-sm outline-none" style={{ backgroundColor: IVORY, border: `1px solid rgba(201,168,76,0.35)`, borderRadius: "4px", color: NEAR_BLACK }} />
              </div>
              <div>
                <label className="block font-body text-xs font-semibold uppercase mb-2" style={{ color: NEAR_BLACK, letterSpacing: "0.08em" }}>Enrollment Link</label>
                <input value={courseLink} onChange={e => setCourseLink(e.target.value)} placeholder="https://..." className="w-full px-4 py-3 font-body text-sm outline-none" style={{ backgroundColor: IVORY, border: `1px solid rgba(201,168,76,0.35)`, borderRadius: "4px", color: NEAR_BLACK }} />
              </div>
            </div>
          </div>
        )}

        {templateType === "custom" && (
          <div>
            <label className="block font-body text-xs font-semibold uppercase mb-2" style={{ color: NEAR_BLACK, letterSpacing: "0.08em" }}>Email Body (HTML or plain text)</label>
            <textarea value={customBody} onChange={e => setCustomBody(e.target.value)} rows={8} placeholder="Write your email content here..." className="w-full px-4 py-3 font-body text-sm outline-none resize-y font-mono" style={{ backgroundColor: IVORY, border: `1px solid rgba(201,168,76,0.35)`, borderRadius: "4px", color: NEAR_BLACK }} />
          </div>
        )}

        {/* Schedule */}
        <div>
          <label className="block font-body text-xs font-semibold uppercase mb-2" style={{ color: NEAR_BLACK, letterSpacing: "0.08em" }}>Schedule (optional)</label>
          <div className="flex gap-3">
            <input type="date" value={scheduleDate} onChange={e => setScheduleDate(e.target.value)} className="px-3 py-2.5 font-body text-sm" style={{ backgroundColor: IVORY, border: `1px solid rgba(201,168,76,0.35)`, borderRadius: "4px", color: NEAR_BLACK, outline: "none" }} />
            <input type="time" value={scheduleTime} onChange={e => setScheduleTime(e.target.value)} className="px-3 py-2.5 font-body text-sm" style={{ backgroundColor: IVORY, border: `1px solid rgba(201,168,76,0.35)`, borderRadius: "4px", color: NEAR_BLACK, outline: "none" }} />
          </div>
        </div>

        {/* Feedback */}
        {sendSuccess && (
          <div className="p-3 rounded flex items-start gap-2" style={{ backgroundColor: "rgba(46,125,50,0.08)", border: "1px solid rgba(46,125,50,0.2)" }}>
            <CheckCircle size={16} style={{ color: "#2e7d32", flexShrink: 0, marginTop: 1 }} />
            <p className="font-body text-sm" style={{ color: "#2e7d32" }}>
              {scheduleDate ? "Broadcast scheduled successfully." : `Sent to ${sendSuccess.sentCount} of ${sendSuccess.total} subscribers.`}
            </p>
          </div>
        )}
        {sendError && (
          <div className="p-3 rounded flex items-start gap-2" style={{ backgroundColor: "rgba(192,57,43,0.08)", border: "1px solid rgba(192,57,43,0.2)" }}>
            <AlertCircle size={16} style={{ color: "#c0392b", flexShrink: 0, marginTop: 1 }} />
            <p className="font-body text-sm" style={{ color: "#c0392b" }}>{sendError}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handlePreview}
            disabled={!isFormValid() || previewMutation.isPending}
            className="flex items-center gap-2 px-4 py-2.5 font-body text-sm font-medium"
            style={{ border: `1px solid ${BRASS}`, borderRadius: "4px", color: BRASS, backgroundColor: "transparent", cursor: !isFormValid() ? "not-allowed" : "pointer", opacity: !isFormValid() ? 0.5 : 1 }}
          >
            <Eye size={14} />
            {previewMutation.isPending ? "Generating..." : "Preview"}
          </button>
          <button
            onClick={handleSend}
            disabled={!isFormValid() || isSending}
            className="flex items-center gap-2 px-5 py-2.5 font-body text-sm font-semibold"
            style={{ backgroundColor: !isFormValid() || isSending ? "rgba(201,168,76,0.4)" : BRASS, color: NEAR_BLACK, borderRadius: "4px", cursor: !isFormValid() || isSending ? "not-allowed" : "pointer" }}
          >
            {scheduleDate ? <Clock size={14} /> : <Send size={14} />}
            {isSending ? "Sending..." : scheduleDate ? "Schedule" : "Send Now"}
          </button>
        </div>
      </div>

      {/* Broadcast History */}
      <div>
        <div className="mb-6">
          <h2 className="font-display font-semibold text-lg mb-1" style={{ color: NEAR_BLACK }}>Broadcast History</h2>
          <p className="font-body text-sm" style={{ color: WARM_GRAY }}>Past and scheduled email campaigns</p>
        </div>

        <div style={{ backgroundColor: WHITE_CARD, border: `1px solid ${CARD_BORDER}`, borderRadius: "6px", overflow: "hidden" }}>
          {historyLoading && (
            <div className="px-6 py-12 text-center">
              <div className="inline-block w-6 h-6 rounded-full border-2 animate-spin mb-3" style={{ borderColor: "rgba(201,168,76,0.3)", borderTopColor: BRASS }} />
              <p className="font-body text-sm" style={{ color: WARM_GRAY }}>Loading history...</p>
            </div>
          )}

          {!historyLoading && (!historyData || historyData.total === 0) && (
            <div className="px-6 py-12 text-center">
              <FileText size={32} className="mx-auto mb-3" style={{ color: "rgba(201,168,76,0.4)" }} />
              <p className="font-body text-sm" style={{ color: WARM_GRAY }}>No broadcasts sent yet. Compose your first email above.</p>
            </div>
          )}

          {!historyLoading && historyData && historyData.total > 0 && (
            <div>
              {historyData.broadcasts.map((b, i) => (
                <div key={b.id} className="px-6 py-4" style={{ borderBottom: i < historyData.broadcasts.length - 1 ? "1px solid rgba(201,168,76,0.1)" : "none" }}>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm font-medium truncate" style={{ color: NEAR_BLACK }}>{b.subject}</p>
                      <p className="font-body text-xs mt-0.5" style={{ color: WARM_GRAY }}>{TEMPLATE_LABELS[b.templateType as TemplateType] ?? b.templateType}</p>
                    </div>
                    {statusBadge(b.status)}
                  </div>
                  <div className="flex items-center gap-4 flex-wrap">
                    {b.status === "sent" && (
                      <span className="font-body text-xs" style={{ color: WARM_GRAY }}>
                        <span style={{ color: NEAR_BLACK, fontWeight: 600 }}>{b.sentCount}</span> sent
                        {(b.failedCount ?? 0) > 0 && <span style={{ color: "#c0392b" }}>, {b.failedCount} failed</span>}
                      </span>
                    )}
                    {b.status === "scheduled" && b.scheduledAt && (
                      <span className="font-body text-xs flex items-center gap-1" style={{ color: WARM_GRAY }}>
                        <Clock size={11} /> Scheduled for {formatDate(b.scheduledAt)}
                      </span>
                    )}
                    <span className="font-body text-xs" style={{ color: WARM_GRAY }}>Created {formatDate(b.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Email Preview Modal */}
      {showPreview && previewHtml && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} onClick={() => setShowPreview(false)}>
          <div className="w-full max-w-2xl max-h-[90vh] overflow-auto rounded-lg" style={{ backgroundColor: "#fff" }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
              <h3 className="font-display font-semibold text-base" style={{ color: NEAR_BLACK }}>Email Preview</h3>
              <button onClick={() => setShowPreview(false)} className="font-body text-sm" style={{ color: WARM_GRAY }}>Close</button>
            </div>
            <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Quick Links Tab ─────────────────────────────────────────────────────────

const QUICK_LINKS = [
  { name: "Cloudflare", url: "https://dash.cloudflare.com", color: "#F48120", description: "DNS, CDN, and security settings" },
  { name: "Stripe", url: "https://dashboard.stripe.com", color: "#635BFF", description: "Payments, subscriptions, and invoices" },
  { name: "Bluevine", url: "https://app.bluevine.com", color: "#0066FF", description: "Business banking and finances" },
  { name: "Facebook", url: "https://facebook.com", color: "#1877F2", description: "Social media management" },
  { name: "Instagram", url: "https://instagram.com", color: "#E4405F", description: "Social media content and engagement" },
];

function QuickLinksTab() {
  return (
    <>
      <div className="mb-6">
        <h2 className="font-display font-semibold text-lg mb-1" style={{ color: NEAR_BLACK }}>Quick Links</h2>
        <p className="font-body text-sm" style={{ color: WARM_GRAY }}>Fast access to your tools and services</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {QUICK_LINKS.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 flex items-start gap-4 transition-all duration-200"
            style={{ backgroundColor: WHITE_CARD, border: `1px solid ${CARD_BORDER}`, borderRadius: "6px", textDecoration: "none" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = CARD_BORDER; e.currentTarget.style.boxShadow = "none"; }}
          >
            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded" style={{ backgroundColor: `${link.color}15`, border: `1px solid ${link.color}30` }}>
              <span className="font-display font-bold text-base" style={{ color: link.color }}>{link.name[0]}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-display font-semibold text-base" style={{ color: NEAR_BLACK }}>{link.name}</span>
                <ExternalLink size={13} style={{ color: BRASS }} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="font-body text-xs" style={{ color: WARM_GRAY }}>{link.description}</p>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}

// ── Dashboard Shell ─────────────────────────────────────────────────────────

function Dashboard({ password, onLogout }: { password: string; onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>("subscribers");

  const tabs: { id: Tab; label: string; icon: typeof Users }[] = [
    { id: "subscribers", label: "Subscribers", icon: Users },
    { id: "purchases", label: "Purchases", icon: ShoppingBag },
    { id: "blog", label: "Blog Posts", icon: BookOpen },
    { id: "broadcast", label: "Broadcast", icon: Send },
    { id: "links", label: "Quick Links", icon: ExternalLink },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: IVORY }}>
      <header className="sticky top-0 z-10" style={{ backgroundColor: "rgba(245,240,232,0.97)", backdropFilter: "blur(8px)", borderBottom: "1px solid rgba(201,168,76,0.25)" }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <img src={BPC_HEADER_IMAGE_URL} alt="Bright Path Cyber" className="h-10 w-auto" />
          <div className="flex items-center gap-3">
            <span className="font-body text-xs font-semibold uppercase px-3 py-1 rounded" style={{ backgroundColor: "rgba(201,168,76,0.15)", color: BRASS, letterSpacing: "0.08em", border: `1px solid rgba(201,168,76,0.3)` }}>Admin</span>
            <button onClick={onLogout} className="flex items-center gap-1.5 font-body text-sm hover:opacity-70" style={{ color: WARM_GRAY }}>
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="h-[2px] w-10 mb-4" style={{ backgroundColor: BRASS }} />
          <h1 className="font-display font-semibold text-3xl mb-1" style={{ color: NEAR_BLACK }}>Admin Dashboard</h1>
          <p className="font-body text-sm" style={{ color: WARM_GRAY }}>Manage subscribers, purchases, blog posts, broadcasts, and tools</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 mb-8 p-1 rounded-lg flex-wrap" style={{ backgroundColor: "rgba(255,255,255,0.5)", border: `1px solid rgba(201,168,76,0.15)`, display: "inline-flex" }}>
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="flex items-center gap-2 px-5 py-2.5 font-body text-sm font-medium rounded-md transition-all duration-200"
              style={{ backgroundColor: activeTab === id ? BRASS : "transparent", color: activeTab === id ? NEAR_BLACK : WARM_GRAY, cursor: "pointer" }}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "subscribers" && <SubscribersTab password={password} />}
        {activeTab === "purchases" && <PurchasesTab password={password} />}
        {activeTab === "blog" && <BlogPostsTab password={password} />}
        {activeTab === "broadcast" && <BroadcastTab password={password} />}
        {activeTab === "links" && <QuickLinksTab />}
      </main>
    </div>
  );
}

// ── Root Component ──────────────────────────────────────────────────────────

export default function Admin() {
  const [adminPassword, setAdminPassword] = useState<string | null>(() => {
    try { return sessionStorage.getItem("bpc_admin_pw"); } catch { return null; }
  });

  const handleLogin = (pw: string) => {
    try { sessionStorage.setItem("bpc_admin_pw", pw); } catch {}
    setAdminPassword(pw);
  };

  const handleLogout = () => {
    try { sessionStorage.removeItem("bpc_admin_pw"); } catch {}
    setAdminPassword(null);
  };

  if (!adminPassword) return <LoginScreen onLogin={handleLogin} />;
  return <Dashboard password={adminPassword} onLogout={handleLogout} />;
}
