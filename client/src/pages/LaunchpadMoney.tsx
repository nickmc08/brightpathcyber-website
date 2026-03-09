/*
 * Launchpad Money — Coming Soon Page
 * McMillon Co. — in development division
 */

import { useState } from "react";
import { Link } from "wouter";
import { Rocket, ArrowLeft, CheckCircle, Send } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function LaunchpadMoney() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
      <Navigation />

      <main className="flex-1 flex items-center justify-center py-32 px-4">
        <div className="max-w-xl w-full text-center">
          {/* Icon */}
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-7"
            style={{ backgroundColor: "oklch(0.96 0.05 75)" }}
          >
            <Rocket size={36} style={{ color: "oklch(0.55 0.14 75)" }} />
          </div>

          {/* Badge */}
          <span
            className="inline-block text-xs font-semibold font-body px-3 py-1 rounded-full uppercase tracking-wide mb-5"
            style={{ backgroundColor: "oklch(0.88 0.10 75)", color: "oklch(0.40 0.12 75)" }}
          >
            Coming Soon
          </span>

          <h1 className="font-display text-4xl sm:text-5xl font-semibold mb-4 leading-tight" style={{ color: "oklch(0.22 0.06 255)" }}>
            Launchpad Money
          </h1>
          <p className="font-display text-xl font-medium mb-5" style={{ color: "oklch(0.55 0.14 75)" }}>
            Financial Education for the Next Generation
          </p>

          <p className="font-body text-base leading-relaxed mb-8" style={{ color: "oklch(0.45 0.03 255)" }}>
            McMillon Co. is developing a youth financial literacy division designed to give high schoolers and young adults the money skills that school never taught. Real budgeting, credit, investing, and income knowledge — taught in a way that actually sticks.
          </p>

          {/* What's coming */}
          <div className="text-left p-6 rounded-xl mb-8" style={{ backgroundColor: "white", border: "1px solid oklch(0.88 0.01 255)" }}>
            <h3 className="font-display font-semibold text-base mb-4" style={{ color: "oklch(0.22 0.06 255)" }}>
              What's in development:
            </h3>
            <ul className="space-y-2.5">
              {[
                "1-on-1 financial coaching for teens and young adults",
                "Group workshops for schools and youth organizations",
                "Self-paced online courses on budgeting, credit, and investing",
                "Parent + teen family sessions",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle size={15} style={{ color: "oklch(0.65 0.14 75)" }} className="flex-shrink-0 mt-0.5" />
                  <span className="font-body text-sm" style={{ color: "oklch(0.40 0.03 255)" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Email signup */}
          {submitted ? (
            <div
              className="p-5 rounded-xl mb-8 flex items-center gap-3"
              style={{ backgroundColor: "oklch(0.96 0.05 75)", border: "1px solid oklch(0.88 0.10 75)" }}
            >
              <CheckCircle size={20} style={{ color: "oklch(0.55 0.14 75)" }} className="flex-shrink-0" />
              <p className="font-body text-sm text-left" style={{ color: "oklch(0.35 0.10 75)" }}>
                <strong className="font-semibold">You're on the list!</strong> We'll reach out when Launchpad Money launches.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mb-8">
              <p className="font-body text-sm mb-3" style={{ color: "oklch(0.45 0.03 255)" }}>
                Want to be notified when we launch? Leave your email:
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-body"
                  style={{
                    border: "1.5px solid oklch(0.88 0.01 255)",
                    backgroundColor: "white",
                    color: "oklch(0.22 0.06 255)",
                    outline: "none",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "oklch(0.75 0.16 75)")}
                  onBlur={(e) => (e.target.style.borderColor = "oklch(0.88 0.01 255)")}
                />
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg font-semibold font-body text-sm text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: "oklch(0.65 0.16 75)" }}
                >
                  <Send size={13} />
                  Notify Me
                </button>
              </div>
            </form>
          )}

          {/* Back links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <button className="flex items-center gap-2 font-body text-sm font-medium transition-opacity hover:opacity-70" style={{ color: "oklch(0.50 0.03 255)" }}>
                <ArrowLeft size={14} />
                Back to Home
              </button>
            </Link>
            <span style={{ color: "oklch(0.75 0.01 255)" }}>·</span>
            <Link href="/clearpath-cyber">
              <button className="font-body text-sm font-medium transition-opacity hover:opacity-70" style={{ color: "oklch(0.50 0.12 185)" }}>
                Explore ClearPath Cyber →
              </button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
