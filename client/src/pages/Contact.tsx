/*
 * Contact Page - Bright Path Cyber
 * Design: Concept D Editorial - "West Elm meets Apple"
 * Simple contact form + email + FAQ
 * No booking, no consultation, no partnership inquiry
 * Form submits to Formspree (no-account endpoint) via fetch POST
 */

import { useState, useEffect, useRef } from "react";
import { Mail, Clock, Send, CheckCircle, AlertCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type SubmitStatus = "idle" | "loading" | "success" | "error";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/info@brightpathcyber.com";

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const data = await response.json().catch(() => ({}));
        const msg = (data as { error?: string }).error || "Something went wrong. Please try again or email us directly.";
        setErrorMessage(msg);
        setStatus("error");
      }
    } catch {
      setErrorMessage("Unable to send your message. Please check your connection or email us at info@brightpathcyber.com.");
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "4px",
    border: "1px solid rgba(201,168,76,0.25)",
    backgroundColor: "rgba(255,255,255,0.6)",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.9rem",
    color: "#1A1A1A",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-20 bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl">
            <div className="brass-bar mb-6" />
            <h1 className="font-display text-5xl sm:text-6xl font-bold mb-5" style={{ color: "#1A1A1A" }}>
              Get in
              <br />
              <span className="text-brass">Touch</span>
            </h1>
            <p className="font-body text-lg text-warm-gray">
              Have a question about something you read, or want to suggest a topic? We'd love to hear from you.
            </p>
          </div>
        </div>
        <div className="brass-rule mt-16" />
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-ivory-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <RevealSection>
                <div
                  className="p-7"
                  style={{ backgroundColor: "rgba(255,255,255,0.6)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "4px" }}
                >
                  <h3 className="font-display font-bold text-lg mb-5" style={{ color: "#1A1A1A" }}>
                    Contact Information
                  </h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <div
                        className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                        style={{ border: "1px solid rgba(201,168,76,0.4)", borderRadius: "4px" }}
                      >
                        <Mail size={16} className="text-brass" />
                      </div>
                      <div>
                        <div className="font-body text-xs font-semibold uppercase tracking-wide mb-0.5 text-warm-gray">Email</div>
                        <a href="mailto:info@brightpathcyber.com" className="font-body text-sm transition-colors hover:text-brass" style={{ color: "#1A1A1A" }}>
                          info@brightpathcyber.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div
                        className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                        style={{ border: "1px solid rgba(201,168,76,0.4)", borderRadius: "4px" }}
                      >
                        <Clock size={16} className="text-brass" />
                      </div>
                      <div>
                        <div className="font-body text-xs font-semibold uppercase tracking-wide mb-0.5 text-warm-gray">Response Time</div>
                        <div className="font-body text-sm" style={{ color: "#1A1A1A" }}>Within 1-2 business days</div>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealSection>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <RevealSection delay={150}>
                <div
                  className="p-8 sm:p-10"
                  style={{ backgroundColor: "rgba(255,255,255,0.6)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "4px" }}
                >
                  {status === "success" ? (
                    <div className="text-center py-12">
                      <div
                        className="w-16 h-16 flex items-center justify-center mx-auto mb-5"
                        style={{ border: "1px solid rgba(201,168,76,0.4)", borderRadius: "4px" }}
                      >
                        <CheckCircle size={32} className="text-brass" />
                      </div>
                      <h3 className="font-display text-2xl font-bold mb-3" style={{ color: "#1A1A1A" }}>
                        Message Sent!
                      </h3>
                      <p className="font-body text-base text-warm-gray mb-6">
                        Thank you for reaching out. We read every message and will get back to you within 1-2 business days.
                      </p>
                      <button
                        onClick={() => setStatus("idle")}
                        className="btn-editorial btn-editorial-outline"
                        style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <>
                      <h2 className="font-display text-2xl font-bold mb-2" style={{ color: "#1A1A1A" }}>
                        Send Us a Message
                      </h2>
                      <p className="font-body text-sm mb-7 text-warm-gray">
                        Questions, feedback, topic suggestions - we read every message.
                      </p>

                      {status === "error" && (
                        <div
                          className="flex items-start gap-3 p-4 mb-6"
                          style={{ backgroundColor: "rgba(220,53,69,0.06)", border: "1px solid rgba(220,53,69,0.25)", borderRadius: "4px" }}
                        >
                          <AlertCircle size={18} style={{ color: "#dc3545", flexShrink: 0, marginTop: "1px" }} />
                          <p className="font-body text-sm" style={{ color: "#dc3545" }}>
                            {errorMessage}
                          </p>
                        </div>
                      )}

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block font-body text-xs font-semibold uppercase tracking-wide mb-1.5 text-warm-gray">
                              Name *
                            </label>
                            <input
                              type="text"
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Your name"
                              style={inputStyle}
                              onFocus={e => { e.target.style.borderColor = "#C9A84C"; e.target.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.1)"; }}
                              onBlur={e => { e.target.style.borderColor = "rgba(201,168,76,0.25)"; e.target.style.boxShadow = "none"; }}
                            />
                          </div>
                          <div>
                            <label className="block font-body text-xs font-semibold uppercase tracking-wide mb-1.5 text-warm-gray">
                              Email *
                            </label>
                            <input
                              type="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="your@email.com"
                              style={inputStyle}
                              onFocus={e => { e.target.style.borderColor = "#C9A84C"; e.target.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.1)"; }}
                              onBlur={e => { e.target.style.borderColor = "rgba(201,168,76,0.25)"; e.target.style.boxShadow = "none"; }}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-body text-xs font-semibold uppercase tracking-wide mb-1.5 text-warm-gray">
                            Subject *
                          </label>
                          <input
                            type="text"
                            name="subject"
                            required
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="What's on your mind?"
                            style={inputStyle}
                            onFocus={e => { e.target.style.borderColor = "#C9A84C"; e.target.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.1)"; }}
                            onBlur={e => { e.target.style.borderColor = "rgba(201,168,76,0.25)"; e.target.style.boxShadow = "none"; }}
                          />
                        </div>

                        <div>
                          <label className="block font-body text-xs font-semibold uppercase tracking-wide mb-1.5 text-warm-gray">
                            Message *
                          </label>
                          <textarea
                            name="message"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell us what you're thinking..."
                            rows={5}
                            style={{ ...inputStyle, resize: "vertical" }}
                            onFocus={e => { e.target.style.borderColor = "#C9A84C"; e.target.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.1)"; }}
                            onBlur={e => { e.target.style.borderColor = "rgba(201,168,76,0.25)"; e.target.style.boxShadow = "none"; }}
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={status === "loading"}
                          className="btn-editorial btn-editorial-filled disabled:opacity-60"
                        >
                          {status === "loading" ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send size={14} />
                              Send Message
                            </>
                          )}
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </RevealSection>
            </div>
          </div>
        </div>
      </section>

      <div className="brass-rule" />

      {/* FAQ */}
      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <RevealSection className="mb-10">
            <div className="brass-bar mb-6" />
            <h2 className="font-display text-3xl font-bold" style={{ color: "#1A1A1A" }}>
              Common Questions
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {[
              { q: "Who is the e-book for?", a: "Anyone who wants a comprehensive, plain-language guide to staying safe online. No tech background needed. It's designed to be read at your own pace." },
              { q: "Will there be a course?", a: "Yes - we're building a self-paced video course that covers everything in the e-book and more. Sign up on our contact form to be notified when it launches." },
              { q: "Can I suggest a blog topic?", a: "Absolutely. Use the form above or email us at info@brightpathcyber.com. We love hearing what our readers want to learn about." },
            ].map((faq, i) => (
              <RevealSection key={i} delay={i * 80}>
                <div
                  className="p-6"
                  style={{ backgroundColor: "rgba(255,255,255,0.6)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "4px" }}
                >
                  <h4 className="font-display font-semibold text-base mb-2" style={{ color: "#1A1A1A" }}>
                    {faq.q}
                  </h4>
                  <p className="font-body text-sm leading-relaxed text-warm-gray">
                    {faq.a}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
