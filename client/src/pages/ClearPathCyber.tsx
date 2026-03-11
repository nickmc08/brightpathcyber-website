/*
 * Bright Path Cyber Page
 * Design: Concept D Editorial — "West Elm meets Apple"
 * Ivory backgrounds, brass gold accents, near-black text
 * Services overview, value ladder, "Click with Confidence" e-book, consultation CTA
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  Shield, CheckCircle, ArrowRight, BookOpen, Users, Video,
  Lock, AlertTriangle, Eye, Smartphone, Download, ChevronRight
} from "lucide-react";
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

const services = [
  { icon: AlertTriangle, title: "Scam Awareness & Prevention", desc: "Learn to recognize phishing emails, phone scams, and online fraud before they cost you. We cover the most common tactics targeting everyday people today." },
  { icon: Lock, title: "Password & Account Security", desc: "Set up strong passwords, understand two-factor authentication, and learn how to manage your accounts safely — without the tech headache." },
  { icon: Eye, title: "Privacy Settings Review", desc: "We walk through your devices and accounts to adjust privacy settings in plain English, so you're sharing only what you want to share." },
  { icon: Smartphone, title: "Device Safety Basics", desc: "From smartphones to tablets to computers — we help you understand your devices, keep them updated, and use them with confidence." },
  { icon: Users, title: "Family & Group Sessions", desc: "We offer sessions designed for families, caregivers, and small groups who want to learn digital safety together." },
  { icon: Video, title: "B2B & Community Workshops", desc: "We partner with libraries, healthcare providers, employers, and community organizations to deliver group cybersecurity education." },
];

const valueLadder = [
  { step: "01", title: "Free Checklist", desc: "Download our Personal Digital Safety Checklist — 10 steps to a safer online life, completely free.", cta: "Download Free", price: "Free", highlight: false },
  { step: "02", title: "Click with Confidence E-Book", desc: "Our flagship guide covers everything you need to know about staying safe online — written in plain English, no tech background required.", cta: "Get the E-Book", price: "$27", highlight: true },
  { step: "03", title: "Online Course", desc: "A self-paced video course that walks through each topic in depth, with real examples and step-by-step walkthroughs.", cta: "Coming Soon", price: "$97", highlight: false },
  { step: "04", title: "1-on-1 Coaching", desc: "Personalized sessions with our lead consultant — we look at your specific devices, accounts, and concerns together.", cta: "Book a Session", price: "From $75/hr", highlight: false },
  { step: "05", title: "B2B Partnerships", desc: "Custom workshops and ongoing education programs for employers, libraries, healthcare providers, and community organizations.", cta: "Contact Us", price: "Custom", highlight: false },
];

export default function BrightPathCyber() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl">
            <div className="brass-bar mb-6" />
            <div className="division-badge mb-5">
              <Shield size={11} /> Bright Path Cyber
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-5" style={{ color: "#1A1A1A" }}>
              Bright Path
              <br />
              <span className="text-brass">Cyber</span>
            </h1>
            <p className="font-body text-xl leading-relaxed mb-3 text-warm-gray">
              Warm, clear cybersecurity and privacy guidance for everyone.
            </p>
            <p className="font-body text-base leading-relaxed mb-8 text-warm-gray">
              We help individuals and families navigate the digital world safely — without the tech overwhelm, the confusing acronyms, or the condescending explanations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <button className="btn-editorial btn-editorial-filled">
                  Book a Free Consultation
                </button>
              </Link>
              <a href="#ebook">
                <button className="btn-editorial btn-editorial-outline">
                  Get the E-Book — $27
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className="brass-rule mt-16" />
      </section>

      {/* Who We Serve */}
      <section className="py-20 bg-ivory-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <RevealSection className="max-w-3xl">
            <div className="brass-bar mb-6" />
            <h2 className="font-display text-4xl font-bold mb-5" style={{ color: "#1A1A1A" }}>
              Who We Serve
            </h2>
            <p className="font-body text-lg leading-relaxed mb-4 text-warm-gray">
              Bright Path Cyber was built for anyone who wants to use technology confidently — without living in fear of doing something wrong.
            </p>
            <p className="font-body text-base leading-relaxed text-warm-gray">
              Our clients are sharp, capable people who simply haven't had anyone take the time to explain digital safety in terms that make sense. That's exactly what we do. We also work with families who want to protect their loved ones, and with organizations that want to keep their people safe.
            </p>
          </RevealSection>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { label: "Individuals", desc: "Direct 1-on-1 and group education" },
              { label: "Families", desc: "Protecting everyone you care about" },
              { label: "Organizations", desc: "B2B workshops and partnerships" },
            ].map((item, i) => (
              <RevealSection key={item.label} delay={i * 100}>
                <div
                  className="p-5 flex items-start gap-3 card-lift"
                  style={{ border: "1px solid rgba(201,168,76,0.3)", borderRadius: "4px", backgroundColor: "rgba(255,255,255,0.5)" }}
                >
                  <CheckCircle size={18} className="text-brass flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-display font-semibold text-sm mb-0.5" style={{ color: "#1A1A1A" }}>{item.label}</div>
                    <div className="font-body text-xs text-warm-gray">{item.desc}</div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      <div className="brass-rule" />

      {/* Services */}
      <section id="services" className="py-24 bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <RevealSection className="mb-12">
            <div className="brass-bar mb-6" />
            <h2 className="font-display text-4xl font-bold" style={{ color: "#1A1A1A" }}>
              What We Cover
            </h2>
            <p className="font-body mt-3 max-w-xl text-warm-gray">
              Every service is designed to be practical, accessible, and immediately useful.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <RevealSection key={service.title} delay={i * 80}>
                <div
                  className="p-7 h-full card-lift"
                  style={{ backgroundColor: "rgba(255,255,255,0.6)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "4px" }}
                >
                  <div
                    className="w-11 h-11 flex items-center justify-center mb-4"
                    style={{ border: "1px solid rgba(201,168,76,0.4)", borderRadius: "4px" }}
                  >
                    <service.icon size={20} className="text-brass" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2" style={{ color: "#1A1A1A" }}>
                    {service.title}
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-warm-gray">
                    {service.desc}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      <div className="brass-rule" />

      {/* Value Ladder */}
      <section className="py-24" style={{ backgroundColor: "#1A1A1A" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <RevealSection className="mb-12">
            <div className="brass-bar mb-6" />
            <h2 className="font-display text-4xl font-bold text-brass">
              Start Where You Are
            </h2>
            <p className="font-body mt-3 max-w-xl" style={{ color: "rgba(245,240,232,0.7)" }}>
              Our value ladder is designed to meet you exactly where you are — from a free first step to comprehensive coaching.
            </p>
          </RevealSection>

          <div className="space-y-4">
            {valueLadder.map((item, i) => (
              <RevealSection key={item.step} delay={i * 80}>
                <div
                  className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5"
                  style={{
                    backgroundColor: item.highlight ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.05)",
                    border: item.highlight ? "1px solid rgba(201,168,76,0.5)" : "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "4px",
                  }}
                >
                  <div className="flex-shrink-0">
                    <span className="font-display text-3xl font-bold text-brass">
                      {item.step}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3
                        className="font-display font-semibold text-xl"
                        style={{ color: item.highlight ? "#C9A84C" : "rgba(245,240,232,0.9)" }}
                      >
                        {item.title}
                      </h3>
                      {item.highlight && (
                        <span className="text-xs font-semibold font-body px-2 py-0.5" style={{ backgroundColor: "#C9A84C", color: "#1A1A1A", borderRadius: "2px" }}>
                          Most Popular
                        </span>
                      )}
                    </div>
                    <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(245,240,232,0.6)" }}>
                      {item.desc}
                    </p>
                  </div>
                  <div className="flex-shrink-0 flex flex-col items-end gap-2">
                    <span className="font-display font-bold text-xl text-brass">
                      {item.price}
                    </span>
                    <Link href={item.cta === "Coming Soon" ? "#" : item.cta === "Contact Us" ? "/contact" : item.cta === "Book a Session" ? "/contact" : "#ebook"}>
                      <button
                        className="flex items-center gap-1.5 text-sm font-semibold font-body px-4 py-2 transition-all"
                        style={
                          item.highlight
                            ? { backgroundColor: "#C9A84C", color: "#1A1A1A", borderRadius: "2px" }
                            : item.cta === "Coming Soon"
                            ? { backgroundColor: "rgba(255,255,255,0.05)", color: "rgba(245,240,232,0.4)", cursor: "default", borderRadius: "2px" }
                            : { backgroundColor: "rgba(201,168,76,0.15)", color: "#C9A84C", borderRadius: "2px" }
                        }
                        disabled={item.cta === "Coming Soon"}
                      >
                        {item.cta}
                        {item.cta !== "Coming Soon" && <ChevronRight size={13} />}
                      </button>
                    </Link>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      <div className="brass-rule" />

      {/* E-Book Feature */}
      <section id="ebook" className="py-24 bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <div className="brass-bar mb-6" />
              <div className="division-badge mb-4">
                <BookOpen size={11} /> Featured Resource
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold mb-5" style={{ color: "#1A1A1A" }}>
                Click with
                <br />
                <span className="text-brass">Confidence</span>
              </h2>
              <p className="font-body text-lg leading-relaxed mb-4 text-warm-gray">
                The complete guide to staying safe online — written in plain English, with no tech background required. Practical, clear, and built for real life.
              </p>
              <p className="font-body text-base leading-relaxed mb-6 text-warm-gray">
                This e-book covers everything from recognizing scams to setting up secure passwords to protecting your personal information — all in clear, step-by-step language that actually makes sense.
              </p>

              <ul className="space-y-2.5 mb-8">
                {[
                  "How to spot phishing emails and fake websites",
                  "The password system that actually works",
                  "What to do if you think you've been scammed",
                  "Privacy settings explained in plain English",
                  "Safe online shopping and banking habits",
                  "How to protect your personal and financial info",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm font-body text-warm-gray">
                    <CheckCircle size={15} className="text-brass flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link href="/contact">
                <button className="btn-editorial btn-editorial-filled">
                  <Download size={15} />
                  Get the E-Book — $27
                </button>
              </Link>
            </RevealSection>

            <RevealSection delay={150}>
              <div
                className="relative p-10 text-center"
                style={{ border: "1px solid rgba(201,168,76,0.4)", borderRadius: "4px", backgroundColor: "rgba(201,168,76,0.06)" }}
              >
                <div
                  className="w-32 h-40 mx-auto mb-6 flex flex-col items-center justify-center shadow-lg"
                  style={{ backgroundColor: "#1A1A1A", borderRadius: "4px" }}
                >
                  <Shield size={36} className="text-brass mb-2" />
                  <span className="font-display text-xs font-semibold text-center leading-tight px-2" style={{ color: "rgba(245,240,232,0.9)" }}>Click with Confidence</span>
                </div>
                <h3 className="font-display text-2xl font-bold mb-2" style={{ color: "#1A1A1A" }}>
                  Click with Confidence
                </h3>
                <p className="font-body text-sm mb-4 text-warm-gray">
                  Your Complete Guide to Online Safety
                </p>
                <div className="text-4xl font-display font-bold mb-1 text-brass">$27</div>
                <p className="text-xs font-body mb-6 text-warm-gray">Instant digital download</p>
                <Link href="/contact">
                  <button className="w-full btn-editorial btn-editorial-filled">
                    Purchase Now — $27
                  </button>
                </Link>
                <p className="text-xs font-body mt-3 text-warm-gray">
                  100% satisfaction guarantee
                </p>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      <div className="brass-rule" />

      {/* CTA */}
      <section className="py-24 bg-ivory-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <RevealSection>
            <div className="brass-bar mx-auto mb-6" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-5" style={{ color: "#1A1A1A" }}>
              Ready to feel confident online?
            </h2>
            <p className="font-body text-lg mb-10 text-warm-gray">
              Book a free 30-minute consultation with our team. No pressure, no jargon — just an honest conversation about where you are and how we can help.
            </p>
            <Link href="/contact">
              <button className="btn-editorial btn-editorial-filled">
                Book Your Free Consultation
                <ArrowRight size={15} />
              </button>
            </Link>
          </RevealSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
