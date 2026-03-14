/*
 * Admin Dashboard — Bright Path Cyber
 * Password-protected dashboard with tabs: Subscribers, Purchases, Quick Links
 */

import { useState, useCallback } from "react";
import { trpc } from "@/lib/trpc";
import {
  Download, Users, Mail, CheckCircle, XCircle, LogOut, Lock,
  DollarSign, ShoppingBag, ExternalLink,
} from "lucide-react";

const BPC_HEADER_IMAGE_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663415118379/JXjpt8aqftuhQ9n25h55pn/BPC_Header_Logo_cropped_3d4d31ef.png";

type Tab = "subscribers" | "purchases" | "links";

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
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#F5F0E8" }}>
      <div className="w-full max-w-md p-10" style={{ backgroundColor: "rgba(255,255,255,0.8)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "6px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
        <div className="flex justify-center mb-8">
          <img src={BPC_HEADER_IMAGE_URL} alt="Bright Path Cyber" className="h-14 w-auto" />
        </div>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4" style={{ backgroundColor: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)" }}>
            <Lock size={20} style={{ color: "#C9A84C" }} />
          </div>
          <h1 className="font-display font-semibold text-2xl mb-1" style={{ color: "#1A1A1A" }}>Admin Access</h1>
          <p className="font-body text-sm" style={{ color: "#6B6560" }}>Dashboard — authorized access only</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-password" className="block font-body text-xs font-semibold uppercase mb-2" style={{ color: "#1A1A1A", letterSpacing: "0.1em" }}>Password</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              autoFocus
              className="w-full px-4 py-3 font-body text-sm outline-none"
              style={{ backgroundColor: "#F5F0E8", border: error ? "1px solid #c0392b" : "1px solid rgba(201,168,76,0.4)", borderRadius: "4px", color: "#1A1A1A" }}
            />
            {error && <p className="mt-2 font-body text-xs" style={{ color: "#c0392b" }}>{error}</p>}
          </div>
          <button
            type="submit"
            disabled={loading || !password.trim()}
            className="w-full py-3 font-body text-sm font-semibold"
            style={{ backgroundColor: loading || !password.trim() ? "rgba(201,168,76,0.4)" : "#C9A84C", color: "#1A1A1A", borderRadius: "4px", letterSpacing: "0.05em", cursor: loading || !password.trim() ? "not-allowed" : "pointer" }}
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
          <div key={label} className="p-6 flex items-center gap-4" style={{ backgroundColor: "rgba(255,255,255,0.7)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "6px" }}>
            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "4px" }}>
              <Icon size={18} style={{ color: "#C9A84C" }} />
            </div>
            <div>
              <div className="font-display font-semibold text-2xl" style={{ color: "#1A1A1A" }}>{value}</div>
              <div className="font-body text-xs" style={{ color: "#6B6560" }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: "rgba(255,255,255,0.7)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "6px", overflow: "hidden" }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
          <h2 className="font-display font-semibold text-lg" style={{ color: "#1A1A1A" }}>Subscriber List</h2>
          <button
            onClick={handleExport}
            disabled={exportMutation.isPending || isLoading || !data?.total}
            className="flex items-center gap-2 px-4 py-2 font-body text-sm font-medium"
            style={{ backgroundColor: exportMutation.isPending ? "rgba(201,168,76,0.4)" : "#C9A84C", color: "#1A1A1A", borderRadius: "4px", cursor: exportMutation.isPending || !data?.total ? "not-allowed" : "pointer", opacity: !data?.total ? 0.5 : 1 }}
          >
            <Download size={14} />
            {exportMutation.isPending ? "Exporting..." : "Export CSV"}
          </button>
        </div>

        {isLoading && (
          <div className="px-6 py-16 text-center">
            <div className="inline-block w-6 h-6 rounded-full border-2 animate-spin mb-3" style={{ borderColor: "rgba(201,168,76,0.3)", borderTopColor: "#C9A84C" }} />
            <p className="font-body text-sm" style={{ color: "#6B6560" }}>Loading subscribers...</p>
          </div>
        )}

        {!isLoading && data?.total === 0 && (
          <div className="px-6 py-16 text-center">
            <Users size={32} className="mx-auto mb-3" style={{ color: "rgba(201,168,76,0.4)" }} />
            <p className="font-body text-sm" style={{ color: "#6B6560" }}>No subscribers yet. Share the free checklist to start building your list.</p>
          </div>
        )}

        {!isLoading && data && data.total > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
                  {["Name", "Email", "Signup Date", "Email Sent"].map((col) => (
                    <th key={col} className="px-6 py-3 text-left font-body text-xs font-semibold uppercase" style={{ color: "#6B6560", letterSpacing: "0.08em" }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.subscribers.map((sub, i) => (
                  <tr key={sub.id} style={{ borderBottom: i < data.subscribers.length - 1 ? "1px solid rgba(201,168,76,0.08)" : "none", backgroundColor: i % 2 === 0 ? "transparent" : "rgba(201,168,76,0.03)" }}>
                    <td className="px-6 py-4 font-body text-sm font-medium" style={{ color: "#1A1A1A" }}>{sub.name}</td>
                    <td className="px-6 py-4 font-body text-sm">
                      <a href={`mailto:${sub.email}`} style={{ color: "#C9A84C", textDecoration: "none" }}>{sub.email}</a>
                    </td>
                    <td className="px-6 py-4 font-body text-sm" style={{ color: "#6B6560" }}>{formatDate(sub.createdAt)}</td>
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
          <div key={label} className="p-6 flex items-center gap-4" style={{ backgroundColor: "rgba(255,255,255,0.7)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "6px" }}>
            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "4px" }}>
              <Icon size={18} style={{ color: "#C9A84C" }} />
            </div>
            <div>
              <div className="font-display font-semibold text-2xl" style={{ color: "#1A1A1A" }}>{value}</div>
              <div className="font-body text-xs" style={{ color: "#6B6560" }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: "rgba(255,255,255,0.7)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "6px", overflow: "hidden" }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
          <h2 className="font-display font-semibold text-lg" style={{ color: "#1A1A1A" }}>Purchase History</h2>
        </div>

        {isLoading && (
          <div className="px-6 py-16 text-center">
            <div className="inline-block w-6 h-6 rounded-full border-2 animate-spin mb-3" style={{ borderColor: "rgba(201,168,76,0.3)", borderTopColor: "#C9A84C" }} />
            <p className="font-body text-sm" style={{ color: "#6B6560" }}>Loading purchases...</p>
          </div>
        )}

        {!isLoading && data?.total === 0 && (
          <div className="px-6 py-16 text-center">
            <ShoppingBag size={32} className="mx-auto mb-3" style={{ color: "rgba(201,168,76,0.4)" }} />
            <p className="font-body text-sm" style={{ color: "#6B6560" }}>No purchases yet. Sales will appear here after the first e-book checkout.</p>
          </div>
        )}

        {!isLoading && data && data.total > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
                  {["Date", "Customer Email", "Product", "Amount", "Status", "Email Sent"].map((col) => (
                    <th key={col} className="px-6 py-3 text-left font-body text-xs font-semibold uppercase" style={{ color: "#6B6560", letterSpacing: "0.08em" }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.purchases.map((p, i) => (
                  <tr key={p.id} style={{ borderBottom: i < data.purchases.length - 1 ? "1px solid rgba(201,168,76,0.08)" : "none", backgroundColor: i % 2 === 0 ? "transparent" : "rgba(201,168,76,0.03)" }}>
                    <td className="px-6 py-4 font-body text-sm" style={{ color: "#6B6560" }}>{formatDate(p.createdAt)}</td>
                    <td className="px-6 py-4 font-body text-sm">
                      <a href={`mailto:${p.customerEmail}`} style={{ color: "#C9A84C", textDecoration: "none" }}>{p.customerEmail}</a>
                    </td>
                    <td className="px-6 py-4 font-body text-sm font-medium" style={{ color: "#1A1A1A" }}>{p.productName}</td>
                    <td className="px-6 py-4 font-body text-sm font-semibold" style={{ color: "#1A1A1A" }}>{formatAmount(p.amountTotal, p.currency)}</td>
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
        <h2 className="font-display font-semibold text-lg mb-1" style={{ color: "#1A1A1A" }}>Quick Links</h2>
        <p className="font-body text-sm" style={{ color: "#6B6560" }}>Fast access to your tools and services</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {QUICK_LINKS.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 flex items-start gap-4 transition-all duration-200"
            style={{
              backgroundColor: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(201,168,76,0.2)",
              borderRadius: "6px",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <div
              className="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded"
              style={{ backgroundColor: `${link.color}15`, border: `1px solid ${link.color}30` }}
            >
              <span className="font-display font-bold text-base" style={{ color: link.color }}>{link.name[0]}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-display font-semibold text-base" style={{ color: "#1A1A1A" }}>{link.name}</span>
                <ExternalLink size={13} style={{ color: "#C9A84C" }} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="font-body text-xs" style={{ color: "#6B6560" }}>{link.description}</p>
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
    { id: "links", label: "Quick Links", icon: ExternalLink },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F0E8" }}>
      <header className="sticky top-0 z-10" style={{ backgroundColor: "rgba(245,240,232,0.97)", backdropFilter: "blur(8px)", borderBottom: "1px solid rgba(201,168,76,0.25)" }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <img src={BPC_HEADER_IMAGE_URL} alt="Bright Path Cyber" className="h-10 w-auto" />
          <div className="flex items-center gap-3">
            <span className="font-body text-xs font-semibold uppercase px-3 py-1 rounded" style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "#C9A84C", letterSpacing: "0.08em", border: "1px solid rgba(201,168,76,0.3)" }}>Admin</span>
            <button onClick={onLogout} className="flex items-center gap-1.5 font-body text-sm hover:opacity-70" style={{ color: "#6B6560" }}>
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="h-[2px] w-10 mb-4" style={{ backgroundColor: "#C9A84C" }} />
          <h1 className="font-display font-semibold text-3xl mb-1" style={{ color: "#1A1A1A" }}>Admin Dashboard</h1>
          <p className="font-body text-sm" style={{ color: "#6B6560" }}>Manage subscribers, view purchases, and access your tools</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 mb-8 p-1 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.5)", border: "1px solid rgba(201,168,76,0.15)", display: "inline-flex" }}>
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="flex items-center gap-2 px-5 py-2.5 font-body text-sm font-medium rounded-md transition-all duration-200"
              style={{
                backgroundColor: activeTab === id ? "#C9A84C" : "transparent",
                color: activeTab === id ? "#1A1A1A" : "#6B6560",
                cursor: "pointer",
              }}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "subscribers" && <SubscribersTab password={password} />}
        {activeTab === "purchases" && <PurchasesTab password={password} />}
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
