/*
 * Contact Page — Bright Path Cyber
 * Design: Concept D Editorial — "West Elm meets Apple"
 * Ivory backgrounds, brass gold accents, near-black text
 * Contact form, email, location (Kent, WA), booking placeholder
 */

import { useState, useEffect, useRef } from "react";
import { Mail, MapPin, Clock, Shield, Send, CheckCircle, Calendar } from "lucide-react";
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
  phone: string;
  division: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    division: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
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
              Let's
              <br />
              <span className="text-brass">Talk</span>
            </h1>
            <p className="font-body text-lg text-warm-gray">
              Whether you have a question, want to book a consultation, or are interested in a partnership — we'd love to hear from you.
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
            <div className="lg:col-span-1 space-y-6">
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
                        <MapPin size={16} className="text-brass" />
                      </div>
                      <div>
                        <div className="font-body text-xs font-semibold uppercase tracking-wide mb-0.5 text-warm-gray">Location</div>
                        <div className="font-body text-sm" style={{ color: "#1A1A1A" }}>Kent, Washington</div>
                        <div className="font-body text-xs text-warm-gray">Serving the greater Pacific Northwest</div>
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
                        <div className="font-body text-sm" style={{ color: "#1A1A1A" }}>Within 1 business day</div>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealSection>

              <RevealSection delay={100}>
                <div
                  className="p-7"
                  style={{ backgroundColor: "rgba(255,255,255,0.6)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "4px" }}
                >
                  <h3 className="font-display font-semibold text-base mb-4" style={{ color: "#1A1A1A" }}>
                    What we can help with
                  </h3>
                  <div className="space-y-3">
                    <div
                      className="p-4"
                      style={{ border: "1px solid rgba(201,168,76,0.2)", borderRadius: "4px", backgroundColor: "rgba(201,168,76,0.06)" }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Shield size={14} className="text-brass" />
                        <span className="font-body font-semibold text-sm" style={{ color: "#1A1A1A" }}>Bright Path Cyber</span>
                      </div>
                      <p className="font-body text-xs text-warm-gray">
                        Personal cybersecurity & digital safety
                      </p>
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
                  {submitted ? (
                    <div className="text-center py-12">
                      <div
                        className="w-16 h-16 flex items-center justify-center mx-auto mb-5"
                        style={{ border: "1px solid rgba(201,168,76,0.4)", borderRadius: "4px" }}
                      >
                        <CheckCircle size={32} className="text-brass" />
                      </div>
                      <h3 className="font-display text-2xl font-bold mb-3" style={{ color: "#1A1A1A" }}>
                        Message Sent
                      </h3>
                      <p className="font-body text-base text-warm-gray">
                        Thank you for reaching out. Nick or Mandie will be in touch within one business day.
                      </p>
                    </div>
                  ) : (
                    <>
                      <h2 className="font-display text-2xl font-bold mb-2" style={{ color: "#1A1A1A" }}>
                        Send Us a Message
                      </h2>
                      <p className="font-body text-sm mb-7 text-warm-gray">
                        Fill out the form below and we'll get back to you within one business day.
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block font-body text-xs font-semibold uppercase tracking-wide mb-1.5 text-warm-gray">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Your full name"
                              style={inputStyle}
                              onFocus={e => { e.target.style.borderColor = "#C9A84C"; e.target.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.1)"; }}
                              onBlur={e => { e.target.style.borderColor = "rgba(201,168,76,0.25)"; e.target.style.boxShadow = "none"; }}
                            />
                          </div>
                          <div>
                            <label className="block font-body text-xs font-semibold uppercase tracking-wide mb-1.5 text-warm-gray">
                              Email Address *
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

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block font-body text-xs font-semibold uppercase tracking-wide mb-1.5 text-warm-gray">
                              Phone (optional)
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="(555) 000-0000"
                              style={inputStyle}
                              onFocus={e => { e.target.style.borderColor = "#C9A84C"; e.target.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.1)"; }}
                              onBlur={e => { e.target.style.borderColor = "rgba(201,168,76,0.25)"; e.target.style.boxShadow = "none"; }}
                            />
                          </div>
                          <div>
                            <label className="block font-body text-xs font-semibold uppercase tracking-wide mb-1.5 text-warm-gray">
                              Inquiry Type
                            </label>
                            <select
                              name="division"
                              value={formData.division}
                              onChange={handleChange}
                              style={{ ...inputStyle, appearance: "none" }}
                              onFocus={e => { e.target.style.borderColor = "#C9A84C"; e.target.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.1)"; }}
                              onBlur={e => { e.target.style.borderColor = "rgba(201,168,76,0.25)"; e.target.style.boxShadow = "none"; }}
                            >
                              <option value="">Select a topic</option>
                              <option value="brightpath">Bright Path Cyber</option>
                              <option value="general">General Inquiry</option>
                              <option value="partnership">Partnership Inquiry</option>
                            </select>
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
                            placeholder="How can we help?"
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
                            placeholder="Tell us a bit about what you're looking for..."
                            rows={5}
                            style={{ ...inputStyle, resize: "vertical" }}
                            onFocus={e => { e.target.style.borderColor = "#C9A84C"; e.target.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.1)"; }}
                            onBlur={e => { e.target.style.borderColor = "rgba(201,168,76,0.25)"; e.target.style.boxShadow = "none"; }}
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className="btn-editorial btn-editorial-filled disabled:opacity-60"
                        >
                          {loading ? (
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

      {/* Booking Section */}
      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <RevealSection className="mb-10">
            <div className="brass-bar mb-6" />
            <h2 className="font-display text-3xl font-bold" style={{ color: "#1A1A1A" }}>
              Book a Consultation
            </h2>
            <p className="font-body mt-2 text-warm-gray">
              Prefer to schedule directly? Choose a time that works for you.
            </p>
          </RevealSection>

          <RevealSection delay={100}>
            <div
              className="p-12 text-center"
              style={{ backgroundColor: "rgba(255,255,255,0.6)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "4px" }}
            >
              <div
                className="w-16 h-16 flex items-center justify-center mx-auto mb-5"
                style={{ border: "1px solid rgba(201,168,76,0.4)", borderRadius: "4px" }}
              >
                <Calendar size={28} className="text-brass" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3" style={{ color: "#1A1A1A" }}>
                Online Scheduling
              </h3>
              <p className="font-body text-sm max-w-md mx-auto mb-6 text-warm-gray">
                Our online booking system is being set up. In the meantime, send us a message using the form above or email us directly at{" "}
                <a href="mailto:info@brightpathcyber.com" className="font-semibold text-brass transition-colors hover:opacity-70">
                  info@brightpathcyber.com
                </a>{" "}
                and we'll find a time that works.
              </p>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold font-body"
                style={{ border: "1px solid rgba(201,168,76,0.3)", borderRadius: "2px", color: "#C9A84C" }}
              >
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#C9A84C" }} />
                Online booking — available soon
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      <div className="brass-rule" />

      {/* FAQ */}
      <section className="py-20 bg-ivory-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <RevealSection className="mb-10">
            <div className="brass-bar mb-6" />
            <h2 className="font-display text-3xl font-bold" style={{ color: "#1A1A1A" }}>
              Common Questions
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {[
              { q: "Do you offer virtual sessions?", a: "Yes — all of our coaching and consulting sessions are available both in-person (Kent, WA area) and virtually via video call." },
              { q: "How long is a typical consultation?", a: "Initial consultations are 30 minutes and free of charge. Follow-up coaching sessions are typically 60 minutes." },
              { q: "Do you work with organizations?", a: "Absolutely. We offer B2B workshops and partnership programs for employers, schools, libraries, healthcare providers, and community organizations." },
              { q: "What topics do your workshops cover?", a: "Our workshops cover scam awareness, password and account security, privacy settings, safe browsing, and device safety basics — all in plain, jargon-free language." },
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
