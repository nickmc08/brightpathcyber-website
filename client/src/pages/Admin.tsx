/*
 * Admin Dashboard - Bright Path Cyber
 * Password-protected dashboard with tabs: Subscribers, Purchases, Broadcast, Quick Links
 */

import { useState, useCallback } from "react";
import { trpc } from "@/lib/trpc";
import {
  Download, Users, Mail, CheckCircle, XCircle, LogOut, Lock,
  DollarSign, ShoppingBag, ExternalLink, Send, Clock, Eye, FileText,
  ChevronDown, AlertCircle,
} from "lucide-react";

const BPC_HEADER_IMAGE_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663415118379/JXjpt8aqftuhQ9n25h55pn/BPC_Header_Logo_cropped_3d4d31ef.png";

type Tab = "subscribers" | "purchases" | "broadcast" | "links";
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

  const stats = [
    { icon: ShoppingBag, label: "Total Purchases", value: isLoading ? "..." : String(data?.total ?? 0) },
    { icon: DollarSign, label: "Total Revenue", value: isLoading ? "..." : formatAmount(data?.totalRevenue ?? 0, "usd") },
    { icon: Mail, label: "Delivery Emails Sent", value: isLoading ? "..." : String(data?.purchases.filter(p => p.emailSent).length ?? 0) },
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
            <p className="font-body text-sm" style={{ color: WARM_GRAY }}>No purchases yet. Sales will appear here after the first e-book checkout.</p>
          </div>
        )}

        {!isLoading && data && data.total > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
                  {["Date", "Customer Email", "Product", "Amount", "Status", "Email Sent"].map((col) => (
                    <th key={col} className="px-6 py-3 text-left font-body text-xs font-semibold uppercase" style={{ color: WARM_GRAY, letterSpacing: "0.08em" }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.purchases.map((p, i) => (
                  <tr key={p.id} style={{ borderBottom: i < data.purchases.length - 1 ? "1px solid rgba(201,168,76,0.08)" : "none", backgroundColor: i % 2 === 0 ? "transparent" : "rgba(201,168,76,0.03)" }}>
                    <td className="px-6 py-4 font-body text-sm" style={{ color: WARM_GRAY }}>{formatDate(p.createdAt)}</td>
                    <td className="px-6 py-4 font-body text-sm">
                      <a href={`mailto:${p.customerEmail}`} style={{ color: BRASS, textDecoration: "none" }}>{p.customerEmail}</a>
                    </td>
                    <td className="px-6 py-4 font-body text-sm font-medium" style={{ color: NEAR_BLACK }}>{p.productName}</td>
                    <td className="px-6 py-4 font-body text-sm font-semibold" style={{ color: NEAR_BLACK }}>{formatAmount(p.amountTotal, p.currency)}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-body text-xs font-medium" style={{ backgroundColor: "rgba(46,125,50,0.1)", color: "#2e7d32" }}>
                        <CheckCircle size={12} /> {p.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {p.emailSent
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

// ── Broadcast Tab ───────────────────────────────────────────────────────────

const TEMPLATE_LABELS: Record<TemplateType, string> = {
  blog_update: "Blog Update",
  course_launch: "Course Launch",
  custom: "Custom",
};

function fieldInput(label: string, value: string, onChange: (v: string) => void, placeholder?: string, multiline?: boolean) {
  const style: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    fontFamily: "inherit",
    fontSize: "14px",
    backgroundColor: IVORY,
    border: `1px solid rgba(201,168,76,0.35)`,
    borderRadius: "4px",
    color: NEAR_BLACK,
    outline: "none",
    resize: multiline ? "vertical" : undefined,
  };
  return (
    <div className="mb-4">
      <label className="block font-body text-xs font-semibold uppercase mb-1.5" style={{ color: NEAR_BLACK, letterSpacing: "0.08em" }}>{label}</label>
      {multiline
        ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={5} style={style} />
        : <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={style} />
      }
    </div>
  );
}

function BroadcastTab({ password }: { password: string }) {
  const [templateType, setTemplateType] = useState<TemplateType>("blog_update");
  const [subject, setSubject] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogSnippet, setBlogSnippet] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [enrollUrl, setEnrollUrl] = useState("");
  const [customHtml, setCustomHtml] = useState("");
  const [customText, setCustomText] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [sendSuccess, setSendSuccess] = useState<{ sentCount: number; total: number } | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);

  const { data: historyData, isLoading: historyLoading, refetch: refetchHistory } = trpc.admin.listBroadcasts.useQuery({ password }, { retry: false });

  const buildBodyJson = () => {
    if (templateType === "blog_update") return JSON.stringify({ blogTitle, snippet: blogSnippet, postUrl: blogUrl });
    if (templateType === "course_launch") return JSON.stringify({ courseName, description: courseDesc, price: coursePrice, enrollUrl });
    return JSON.stringify({ htmlBody: customHtml, textBody: customText });
  };

  const autoSubject = () => {
    if (templateType === "blog_update" && blogTitle) return `New Post: ${blogTitle}`;
    if (templateType === "course_launch" && courseName) return `Now Available: ${courseName}`;
    return subject;
  };

  const effectiveSubject = subject || autoSubject();

  const previewMutation = trpc.admin.previewBroadcast.useMutation({
    onSuccess: (data) => {
      setPreviewHtml(data.html);
      setShowPreview(true);
    },
  });

  const createMutation = trpc.admin.createBroadcast.useMutation();
  const sendMutation = trpc.admin.sendBroadcast.useMutation({
    onSuccess: (data) => {
      setSendSuccess({ sentCount: data.sentCount, total: data.total });
      setSendError(null);
      refetchHistory();
    },
    onError: (err) => {
      setSendError(err.message || "Failed to send broadcast");
    },
  });

  const handlePreview = () => {
    previewMutation.mutate({ password, templateType, subject: effectiveSubject, bodyJson: buildBodyJson() });
  };

  const handleSend = async () => {
    setSendSuccess(null);
    setSendError(null);
    const scheduledAt = scheduleDate && scheduleTime ? new Date(`${scheduleDate}T${scheduleTime}`) : undefined;
    const { id } = await createMutation.mutateAsync({ password, templateType, subject: effectiveSubject, bodyJson: buildBodyJson(), scheduledAt });
    if (!scheduledAt) {
      sendMutation.mutate({ password, broadcastId: id });
    } else {
      setSendSuccess({ sentCount: 0, total: 0 });
      refetchHistory();
    }
  };

  const isFormValid = () => {
    if (!effectiveSubject.trim()) return false;
    if (templateType === "blog_update") return !!(blogTitle && blogSnippet && blogUrl);
    if (templateType === "course_launch") return !!(courseName && courseDesc && coursePrice && enrollUrl);
    return !!(customHtml && customText);
  };

  const isSending = createMutation.isPending || sendMutation.isPending;

  const formatDate = (d: Date | string | null) => {
    if (!d) return "-";
    const date = d instanceof Date ? d : new Date(d);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  const statusBadge = (status: string) => {
    const styles: Record<string, { bg: string; color: string }> = {
      sent: { bg: "rgba(46,125,50,0.1)", color: "#2e7d32" },
      sending: { bg: "rgba(201,168,76,0.15)", color: "#8a6a00" },
      scheduled: { bg: "rgba(25,118,210,0.1)", color: "#1565c0" },
      draft: { bg: "rgba(0,0,0,0.06)", color: "#555" },
      failed: { bg: "rgba(192,57,43,0.1)", color: "#c0392b" },
    };
    const s = styles[status] ?? styles.draft;
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-body text-xs font-medium capitalize" style={{ backgroundColor: s.bg, color: s.color }}>
        {status}
      </span>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Compose Form */}
      <div>
        <div className="mb-6">
          <h2 className="font-display font-semibold text-lg mb-1" style={{ color: NEAR_BLACK }}>Compose Broadcast</h2>
          <p className="font-body text-sm" style={{ color: WARM_GRAY }}>Send an email to all {historyData ? "" : ""}subscribers</p>
        </div>

        <div style={{ backgroundColor: WHITE_CARD, border: `1px solid ${CARD_BORDER}`, borderRadius: "6px", padding: "24px" }}>
          {/* Template type selector */}
          <div className="mb-5">
            <label className="block font-body text-xs font-semibold uppercase mb-2" style={{ color: NEAR_BLACK, letterSpacing: "0.08em" }}>Template Type</label>
            <div className="relative">
              <select
                value={templateType}
                onChange={e => setTemplateType(e.target.value as TemplateType)}
                className="w-full appearance-none px-4 py-2.5 font-body text-sm pr-10"
                style={{ backgroundColor: IVORY, border: `1px solid rgba(201,168,76,0.35)`, borderRadius: "4px", color: NEAR_BLACK, outline: "none" }}
              >
                {(Object.keys(TEMPLATE_LABELS) as TemplateType[]).map(t => (
                  <option key={t} value={t}>{TEMPLATE_LABELS[t]}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: WARM_GRAY }} />
            </div>
          </div>

          {/* Subject override */}
          {fieldInput("Subject Line (optional - auto-generated if blank)", subject, setSubject, autoSubject())}

          {/* Template-specific fields */}
          {templateType === "blog_update" && (
            <>
              {fieldInput("Blog Post Title", blogTitle, setBlogTitle, "e.g. 5 Scams Targeting Everyday People Right Now")}
              {fieldInput("Preview Snippet", blogSnippet, setBlogSnippet, "A short excerpt or teaser (1-2 sentences)", true)}
              {fieldInput("Link to Post", blogUrl, setBlogUrl, "https://brightpathcyber.com/blog/...")}
            </>
          )}

          {templateType === "course_launch" && (
            <>
              {fieldInput("Course Name", courseName, setCourseName, "e.g. Cyber Safety Foundations")}
              {fieldInput("Description", courseDesc, setCourseDesc, "What will students learn?", true)}
              {fieldInput("Price", coursePrice, setCoursePrice, "e.g. $97")}
              {fieldInput("Enrollment Link", enrollUrl, setEnrollUrl, "https://...")}
            </>
          )}

          {templateType === "custom" && (
            <>
              {fieldInput("HTML Body", customHtml, setCustomHtml, "<p>Your HTML content here...</p>", true)}
              {fieldInput("Plain Text Body", customText, setCustomText, "Plain text version of your email...", true)}
            </>
          )}

          {/* Schedule */}
          <div className="mb-5">
            <label className="block font-body text-xs font-semibold uppercase mb-2" style={{ color: NEAR_BLACK, letterSpacing: "0.08em" }}>Schedule (optional - leave blank to send now)</label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                value={scheduleDate}
                onChange={e => setScheduleDate(e.target.value)}
                className="px-3 py-2.5 font-body text-sm"
                style={{ backgroundColor: IVORY, border: `1px solid rgba(201,168,76,0.35)`, borderRadius: "4px", color: NEAR_BLACK, outline: "none" }}
              />
              <input
                type="time"
                value={scheduleTime}
                onChange={e => setScheduleTime(e.target.value)}
                className="px-3 py-2.5 font-body text-sm"
                style={{ backgroundColor: IVORY, border: `1px solid rgba(201,168,76,0.35)`, borderRadius: "4px", color: NEAR_BLACK, outline: "none" }}
              />
            </div>
          </div>

          {/* Feedback */}
          {sendSuccess && (
            <div className="mb-4 p-3 rounded flex items-start gap-2" style={{ backgroundColor: "rgba(46,125,50,0.08)", border: "1px solid rgba(46,125,50,0.2)" }}>
              <CheckCircle size={16} style={{ color: "#2e7d32", flexShrink: 0, marginTop: 1 }} />
              <p className="font-body text-sm" style={{ color: "#2e7d32" }}>
                {scheduleDate ? "Broadcast scheduled successfully." : `Sent to ${sendSuccess.sentCount} of ${sendSuccess.total} subscribers.`}
              </p>
            </div>
          )}
          {sendError && (
            <div className="mb-4 p-3 rounded flex items-start gap-2" style={{ backgroundColor: "rgba(192,57,43,0.08)", border: "1px solid rgba(192,57,43,0.2)" }}>
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
                <div
                  key={b.id}
                  className="px-6 py-4"
                  style={{ borderBottom: i < historyData.broadcasts.length - 1 ? "1px solid rgba(201,168,76,0.1)" : "none" }}
                >
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
                    <span className="font-body text-xs" style={{ color: WARM_GRAY }}>
                      Created {formatDate(b.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Email Preview Modal */}
      {showPreview && previewHtml && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setShowPreview(false)}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-auto rounded-lg"
            style={{ backgroundColor: "#fff" }}
            onClick={e => e.stopPropagation()}
          >
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
          <p className="font-body text-sm" style={{ color: WARM_GRAY }}>Manage subscribers, view purchases, send broadcasts, and access your tools</p>
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
