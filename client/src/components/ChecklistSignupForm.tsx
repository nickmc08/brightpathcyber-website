/**
 * ChecklistSignupForm — Bright Path Cyber
 * Custom email capture form that replaces the Kit.com embed.
 * Submits to the tRPC subscribe.signup endpoint.
 * Design: Concept D Editorial — ivory/cream, brass gold accents
 */

import { useState } from "react";
import { CheckCircle, AlertCircle, Download, ArrowRight } from "lucide-react";
import { trpc } from "@/lib/trpc";

type FormState = "idle" | "loading" | "success" | "error";

export default function ChecklistSignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const signupMutation = trpc.subscribe.signup.useMutation({
    onSuccess: () => {
      setState("success");
      setName("");
      setEmail("");
    },
    onError: (err) => {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      setState("error");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setState("loading");
    setErrorMsg("");
    signupMutation.mutate({ name: name.trim(), email: email.trim() });
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "4px",
    border: "1px solid rgba(201,168,76,0.3)",
    backgroundColor: "rgba(255,255,255,0.7)",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.9rem",
    color: "#1A1A1A",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  if (state === "success") {
    return (
      <div className="text-center py-8">
        <div
          className="w-14 h-14 flex items-center justify-center mx-auto mb-4"
          style={{ border: "1px solid rgba(201,168,76,0.4)", borderRadius: "4px" }}
        >
          <CheckCircle size={28} className="text-brass" />
        </div>
        <h3 className="font-display text-xl font-bold mb-2" style={{ color: "#1A1A1A" }}>
          Check Your Inbox!
        </h3>
        <p className="font-body text-sm leading-relaxed text-warm-gray">
          Your Personal Security Audit Checklist is on its way. Check your email — it should arrive within a minute or two.
        </p>
        <p className="font-body text-xs mt-3 text-warm-gray opacity-70">
          Don't see it? Check your spam folder and mark us as safe.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Eyebrow */}
      <div className="division-badge mb-4" style={{ display: "inline-flex" }}>
        <Download size={11} />
        Free Download
      </div>

      <h3 className="font-display text-2xl font-bold mb-2" style={{ color: "#1A1A1A" }}>
        Get Your Free Checklist
      </h3>
      <p className="font-body text-sm leading-relaxed mb-6 text-warm-gray">
        Enter your name and email — we'll send the <strong style={{ color: "#1A1A1A" }}>Personal Security Audit Checklist</strong> straight to your inbox. No confirmation step, no spam.
      </p>

      {/* Error banner */}
      {state === "error" && (
        <div
          className="flex items-start gap-3 p-3 mb-5"
          style={{
            backgroundColor: "rgba(220,53,69,0.06)",
            border: "1px solid rgba(220,53,69,0.25)",
            borderRadius: "4px",
          }}
        >
          <AlertCircle size={16} style={{ color: "#dc3545", flexShrink: 0, marginTop: "2px" }} />
          <p className="font-body text-sm" style={{ color: "#dc3545" }}>
            {errorMsg}
          </p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label
            htmlFor="checklist-name"
            className="block font-body text-xs font-semibold uppercase tracking-wide mb-1.5 text-warm-gray"
          >
            Your Name *
          </label>
          <input
            id="checklist-name"
            type="text"
            name="name"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="First name"
            style={inputStyle}
            disabled={state === "loading"}
            onFocus={e => {
              e.target.style.borderColor = "#C9A84C";
              e.target.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.1)";
            }}
            onBlur={e => {
              e.target.style.borderColor = "rgba(201,168,76,0.3)";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        <div>
          <label
            htmlFor="checklist-email"
            className="block font-body text-xs font-semibold uppercase tracking-wide mb-1.5 text-warm-gray"
          >
            Email Address *
          </label>
          <input
            id="checklist-email"
            type="email"
            name="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            style={inputStyle}
            disabled={state === "loading"}
            onFocus={e => {
              e.target.style.borderColor = "#C9A84C";
              e.target.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.1)";
            }}
            onBlur={e => {
              e.target.style.borderColor = "rgba(201,168,76,0.3)";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        <button
          type="submit"
          disabled={state === "loading" || !name.trim() || !email.trim()}
          className="btn-editorial btn-editorial-filled disabled:opacity-60"
          style={{ width: "100%", justifyContent: "center" }}
        >
          {state === "loading" ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Me the Checklist
              <ArrowRight size={14} />
            </>
          )}
        </button>
      </div>

      <p className="font-body text-xs mt-4 text-warm-gray opacity-70 text-center">
        No spam, ever. Unsubscribe anytime by emailing{" "}
        <a href="mailto:info@brightpathcyber.com" className="hover:text-brass transition-colors" style={{ color: "inherit" }}>
          info@brightpathcyber.com
        </a>
      </p>
    </form>
  );
}
