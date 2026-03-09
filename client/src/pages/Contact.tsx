/*
 * Contact Page — Bright Path Cyber
 * Design: Pacific Northwest Professional
 * Contact form, email, location (Kent, WA), Calendly-style booking placeholder
 */

import { useState, useEffect, useRef } from "react";
import { Mail, MapPin, Clock, Shield, Rocket, Send, CheckCircle, Calendar } from "lucide-react";
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
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
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
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "0.5rem",
    border: "1.5px solid oklch(0.88 0.01 255)",
    backgroundColor: "white",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.9rem",
    color: "oklch(0.22 0.06 255)",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-16" style={{ backgroundColor: "oklch(0.22 0.06 255)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl">
            <div className="teal-bar mb-5" style={{ backgroundColor: "oklch(0.58 0.12 185)" }} />
            <h1 className="font-display text-5xl sm:text-6xl font-semibold text-white mb-5">
              Let's Talk
            </h1>
            <p className="font-body text-lg" style={{ color: "oklch(0.78 0.03 255)" }}>
              Whether you have a question, want to book a consultation, or are interested in a partnership — we'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <RevealSection>
                <div className="p-7 rounded-xl" style={{ backgroundColor: "white", border: "1px solid oklch(0.88 0.01 255)" }}>
                  <h3 className="font-display font-semibold text-lg mb-5" style={{ color: "oklch(0.22 0.06 255)" }}>
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "oklch(0.94 0.04 185)" }}>
                        <Mail size={16} style={{ color: "oklch(0.50 0.12 185)" }} />
                      </div>
                      <div>
                        <div className="font-body text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: "oklch(0.55 0.03 255)" }}>Email</div>
                        <a href="mailto:info@brightpathcyber.com" className="font-body text-sm transition-colors hover:opacity-70" style={{ color: "oklch(0.22 0.06 255)" }}>
                          info@brightpathcyber.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "oklch(0.94 0.04 185)" }}>
                        <MapPin size={16} style={{ color: "oklch(0.50 0.12 185)" }} />
                      </div>
                      <div>
                        <div className="font-body text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: "oklch(0.55 0.03 255)" }}>Location</div>
                        <div className="font-body text-sm" style={{ color: "oklch(0.22 0.06 255)" }}>Kent, Washington</div>
                        <div className="font-body text-xs" style={{ color: "oklch(0.55 0.03 255)" }}>Serving the greater Pacific Northwest</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "oklch(0.94 0.04 185)" }}>
                        <Clock size={16} style={{ color: "oklch(0.50 0.12 185)" }} />
                      </div>
                      <div>
                        <div className="font-body text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: "oklch(0.55 0.03 255)" }}>Response Time</div>
                        <div className="font-body text-sm" style={{ color: "oklch(0.22 0.06 255)" }}>Within 1 business day</div>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealSection>

              {/* Division Quick Links */}
              <RevealSection delay={100}>
                <div className="p-7 rounded-xl" style={{ backgroundColor: "white", border: "1px solid oklch(0.88 0.01 255)" }}>
                  <h3 className="font-display font-semibold text-base mb-4" style={{ color: "oklch(0.22 0.06 255)" }}>
                    Which division are you interested in?
                  </h3>
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg" style={{ backgroundColor: "oklch(0.94 0.04 185)" }}>
                      <div className="flex items-center gap-2 mb-1">
                        <Shield size={14} style={{ color: "oklch(0.45 0.12 185)" }} />
                        <span className="font-body font-semibold text-sm" style={{ color: "oklch(0.30 0.10 185)" }}>Bright Path Cyber</span>
                      </div>
                      <p className="font-body text-xs" style={{ color: "oklch(0.45 0.08 185)" }}>
                        Senior cybersecurity & digital safety
                      </p>
                    </div>
                    <div className="p-4 rounded-lg" style={{ backgroundColor: "oklch(0.96 0.05 75)" }}>
                      <div className="flex items-center gap-2 mb-1">
                        <Rocket size={14} style={{ color: "oklch(0.50 0.14 75)" }} />
                        <span className="font-body font-semibold text-sm" style={{ color: "oklch(0.35 0.12 75)" }}>Launchpad Money</span>
                      </div>
                      <p className="font-body text-xs" style={{ color: "oklch(0.50 0.08 75)" }}>
                        Youth financial education & coaching
                      </p>
                    </div>
                  </div>
                </div>
              </RevealSection>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <RevealSection delay={150}>
                <div className="p-8 sm:p-10 rounded-2xl" style={{ backgroundColor: "white", border: "1px solid oklch(0.88 0.01 255)" }}>
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: "oklch(0.94 0.04 185)" }}>
                        <CheckCircle size={32} style={{ color: "oklch(0.50 0.12 185)" }} />
                      </div>
                      <h3 className="font-display text-2xl font-semibold mb-3" style={{ color: "oklch(0.22 0.06 255)" }}>
                        Message Sent!
                      </h3>
                      <p className="font-body text-base" style={{ color: "oklch(0.45 0.03 255)" }}>
                        Thank you for reaching out. Nick or Mandie will be in touch within one business day.
                      </p>
                    </div>
                  ) : (
                    <>
                      <h2 className="font-display text-2xl font-semibold mb-2" style={{ color: "oklch(0.22 0.06 255)" }}>
                        Send Us a Message
                      </h2>
                      <p className="font-body text-sm mb-7" style={{ color: "oklch(0.50 0.03 255)" }}>
                        Fill out the form below and we'll get back to you within one business day.
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block font-body text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "oklch(0.40 0.03 255)" }}>
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
                              onFocus={e => (e.target.style.borderColor = "oklch(0.58 0.12 185)")}
                              onBlur={e => (e.target.style.borderColor = "oklch(0.88 0.01 255)")}
                            />
                          </div>
                          <div>
                            <label className="block font-body text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "oklch(0.40 0.03 255)" }}>
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
                              onFocus={e => (e.target.style.borderColor = "oklch(0.58 0.12 185)")}
                              onBlur={e => (e.target.style.borderColor = "oklch(0.88 0.01 255)")}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block font-body text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "oklch(0.40 0.03 255)" }}>
                              Phone (optional)
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="(555) 000-0000"
                              style={inputStyle}
                              onFocus={e => (e.target.style.borderColor = "oklch(0.58 0.12 185)")}
                              onBlur={e => (e.target.style.borderColor = "oklch(0.88 0.01 255)")}
                            />
                          </div>
                          <div>
                            <label className="block font-body text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "oklch(0.40 0.03 255)" }}>
                              Division of Interest
                            </label>
                            <select
                              name="division"
                              value={formData.division}
                              onChange={handleChange}
                              style={{ ...inputStyle, appearance: "none" }}
                              onFocus={e => (e.target.style.borderColor = "oklch(0.58 0.12 185)")}
                              onBlur={e => (e.target.style.borderColor = "oklch(0.88 0.01 255)")}
                            >
                              <option value="">Select a division</option>
                              <option value="brightpath">Bright Path Cyber</option>
                              <option value="launchpad">Launchpad Money</option>
                              <option value="general">General Inquiry</option>
                              <option value="partnership">Partnership Inquiry</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block font-body text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "oklch(0.40 0.03 255)" }}>
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
                            onFocus={e => (e.target.style.borderColor = "oklch(0.58 0.12 185)")}
                            onBlur={e => (e.target.style.borderColor = "oklch(0.88 0.01 255)")}
                          />
                        </div>

                        <div>
                          <label className="block font-body text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "oklch(0.40 0.03 255)" }}>
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
                            onFocus={e => (e.target.style.borderColor = "oklch(0.58 0.12 185)")}
                            onBlur={e => (e.target.style.borderColor = "oklch(0.88 0.01 255)")}
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className="flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold font-body text-sm text-white transition-all hover:opacity-90 disabled:opacity-60"
                          style={{ backgroundColor: "oklch(0.58 0.12 185)" }}
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

      {/* Booking Section */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.95 0.008 80)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <RevealSection className="mb-10">
            <div className="teal-bar mb-4" />
            <h2 className="font-display text-3xl font-semibold" style={{ color: "oklch(0.22 0.06 255)" }}>
              Book a Consultation
            </h2>
            <p className="font-body mt-2" style={{ color: "oklch(0.45 0.03 255)" }}>
              Prefer to schedule directly? Choose a time that works for you.
            </p>
          </RevealSection>

          <RevealSection delay={100}>
            <div
              className="rounded-2xl p-12 text-center"
              style={{ backgroundColor: "white", border: "1px solid oklch(0.88 0.01 255)" }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ backgroundColor: "oklch(0.94 0.04 185)" }}
              >
                <Calendar size={28} style={{ color: "oklch(0.50 0.12 185)" }} />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-3" style={{ color: "oklch(0.22 0.06 255)" }}>
                Online Scheduling
              </h3>
              <p className="font-body text-sm max-w-md mx-auto mb-6" style={{ color: "oklch(0.45 0.03 255)" }}>
                Our online booking system is coming soon. In the meantime, send us a message using the form above or email us directly at{" "}
                <a href="mailto:info@brightpathcyber.com" className="font-semibold transition-colors hover:opacity-70" style={{ color: "oklch(0.50 0.12 185)" }}>
                  info@brightpathcyber.com
                </a>{" "}
                and we'll find a time that works.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold font-body" style={{ backgroundColor: "oklch(0.94 0.04 185)", color: "oklch(0.40 0.10 185)" }}>
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "oklch(0.50 0.12 185)" }} />
                Online booking coming soon
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <RevealSection className="mb-10">
            <h2 className="font-display text-3xl font-semibold" style={{ color: "oklch(0.22 0.06 255)" }}>
              Common Questions
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {[
              { q: "Do you offer virtual sessions?", a: "Yes — all of our coaching and consulting sessions are available both in-person (Kent, WA area) and virtually via video call." },
              { q: "How long is a typical consultation?", a: "Initial consultations are 30 minutes and free of charge. Follow-up coaching sessions are typically 60 minutes." },
              { q: "Do you work with organizations?", a: "Absolutely. We offer B2B workshops and partnership programs for senior centers, schools, libraries, and community organizations." },
              { q: "What age range does Launchpad Money serve?", a: "Our primary focus is high school students (14–18) and young adults (18–25), though we adapt our approach for each individual." },
            ].map((faq, i) => (
              <RevealSection key={i} delay={i * 80}>
                <div className="p-6 rounded-xl" style={{ backgroundColor: "white", border: "1px solid oklch(0.88 0.01 255)" }}>
                  <h4 className="font-display font-semibold text-base mb-2" style={{ color: "oklch(0.22 0.06 255)" }}>
                    {faq.q}
                  </h4>
                  <p className="font-body text-sm leading-relaxed" style={{ color: "oklch(0.45 0.03 255)" }}>
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
