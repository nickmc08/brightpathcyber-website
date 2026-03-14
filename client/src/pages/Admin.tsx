/*
 * Admin Dashboard — Bright Path Cyber
 * Password-protected subscriber management page
 */

import { useState, useCallback } from "react";
import { trpc } from "@/lib/trpc";
import { Download, Users, Mail, CheckCircle, XCircle, LogOut, Lock } from "lucide-react";

const BPC_HEADER_IMAGE_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663415118379/JXjpt8aqftuhQ9n25h55pn/BPC_Header_Logo_cropped_3d4d31ef.png";

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
          <p className="font-body text-sm" style={{ color: "#6B6560" }}>Subscriber dashboard — authorized access only</p>
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
            {loading ? "Verifying…" : "Access Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Dashboard({ password, onLogout }: { password: string; onLogout: () => void }) {
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
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="text-center">
          <p className="font-body text-sm" style={{ color: "#c0392b" }}>Session expired. Please log in again.</p>
          <button onClick={onLogout} className="mt-4 px-6 py-2 font-body text-sm" style={{ color: "#C9A84C", border: "1px solid #C9A84C", borderRadius: "4px" }}>Back to Login</button>
        </div>
      </div>
    );
  }

  const emailSentCount = data?.subscribers.filter((s) => s.emailSent).length ?? 0;
  const stats = [
    { icon: Users, label: "Total Subscribers", value: isLoading ? "—" : String(data?.total ?? 0) },
    { icon: Mail, label: "Emails Sent", value: isLoading ? "—" : String(emailSentCount) },
    { icon: CheckCircle, label: "Delivery Rate", value: isLoading || !data?.total ? "—" : `${Math.round((emailSentCount / data.total) * 100)}%` },
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
          <h1 className="font-display font-semibold text-3xl mb-1" style={{ color: "#1A1A1A" }}>Subscriber Dashboard</h1>
          <p className="font-body text-sm" style={{ color: "#6B6560" }}>All email subscribers who signed up for the free checklist</p>
        </div>

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
              {exportMutation.isPending ? "Exporting…" : "Export CSV"}
            </button>
          </div>

          {isLoading && (
            <div className="px-6 py-16 text-center">
              <div className="inline-block w-6 h-6 rounded-full border-2 animate-spin mb-3" style={{ borderColor: "rgba(201,168,76,0.3)", borderTopColor: "#C9A84C" }} />
              <p className="font-body text-sm" style={{ color: "#6B6560" }}>Loading subscribers…</p>
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
      </main>
    </div>
  );
}

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
