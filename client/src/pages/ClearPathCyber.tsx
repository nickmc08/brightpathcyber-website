/*
 * Bright Path Cyber Page
 * Design: Pacific Northwest Professional — Warm teal tones
 * Services overview, value ladder, "Click with Confidence" e-book, consultation CTA
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  Shield, CheckCircle, ArrowRight, BookOpen, Users, Video,
  Lock, AlertTriangle, Eye, Smartphone, Download, Star, ChevronRight
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const BRIGHTPATH_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663415118379/JXjpt8aqftuhQ9n25h55pn/clearpath-hero-73twxQ26uz5nsRzHqpHNR6.webp";

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

const services = [
  { icon: AlertTriangle, title: "Scam Awareness & Prevention", desc: "Learn to recognize phishing emails, phone scams, and online fraud before they cost you. We cover the most common tactics targeting everyday people today.", color: "oklch(0.94 0.04 185)" },
  { icon: Lock, title: "Password & Account Security", desc: "Set up strong passwords, understand two-factor authentication, and learn how to manage your accounts safely — without the tech headache.", color: "oklch(0.94 0.04 185)" },
  { icon: Eye, title: "Privacy Settings Review", desc: "We walk through your devices and accounts to adjust privacy settings in plain English, so you're sharing only what you want to share.", color: "oklch(0.94 0.04 185)" },
  { icon: Smartphone, title: "Device Safety Basics", desc: "From smartphones to tablets to computers — we help you understand your devices, keep them updated, and use them with confidence.", color: "oklch(0.94 0.04 185)" },
  { icon: Users, title: "Family & Group Sessions", desc: "We offer sessions designed for families, caregivers, and small groups who want to learn digital safety together.", color: "oklch(0.94 0.04 185)" },
  { icon: Video, title: "B2B & Community Workshops", desc: "We partner with libraries, healthcare providers, employers, and community organizations to deliver group cybersecurity education.", color: "oklch(0.94 0.04 185)" },
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
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
      <Navigation />

      {/* Hero */}
      <section className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={BRIGHTPATH_IMG} alt="Bright Path Cyber" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, oklch(0.30 0.10 200 / 0.92) 0%, oklch(0.30 0.10 200 / 0.75) 50%, oklch(0.30 0.10 200 / 0.35) 100%)" }} />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-24 lg:py-32">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-5">
              <span className="division-badge division-badge-cyber" style={{ backgroundColor: "oklch(0.94 0.04 185 / 0.2)", color: "oklch(0.85 0.08 185)", border: "1px solid oklch(0.72 0.10 185 / 0.4)" }}>
                <Shield size={11} /> Bright Path Cyber
              </span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-tight mb-5">
              Bright Path<br />
              <em className="not-italic" style={{ color: "oklch(0.80 0.10 185)" }}>Cyber</em>
            </h1>
            <p className="font-body text-xl leading-relaxed mb-3" style={{ color: "oklch(0.90 0.03 200)" }}>
              Warm, clear cybersecurity and privacy guidance for everyone.
            </p>
            <p className="font-body text-base leading-relaxed mb-8" style={{ color: "oklch(0.80 0.03 200)" }}>
              We help individuals and families navigate the digital world safely — without the tech overwhelm, the confusing acronyms, or the condescending explanations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact">
                <button className="px-7 py-3.5 rounded-lg font-semibold font-body text-sm text-white transition-all hover:opacity-90" style={{ backgroundColor: "oklch(0.58 0.12 185)" }}>
                  Book a Free Consultation
                </button>
              </Link>
              <a href="#ebook">
                <button className="px-7 py-3.5 rounded-lg font-semibold font-body text-sm transition-all hover:bg-white/20" style={{ color: "white", border: "1.5px solid oklch(1 0 0 / 0.4)" }}>
                  Get the E-Book — $27
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <RevealSection className="max-w-3xl">
            <div className="w-12 h-0.5 mb-5" style={{ backgroundColor: "oklch(0.58 0.12 185)" }} />
            <h2 className="font-display text-4xl font-semibold mb-5" style={{ color: "oklch(0.22 0.06 255)" }}>
              Who We Serve
            </h2>
            <p className="font-body text-lg leading-relaxed mb-4" style={{ color: "oklch(0.40 0.03 255)" }}>
              Bright Path Cyber was built for anyone who wants to use technology confidently — without living in fear of doing something wrong.
            </p>
            <p className="font-body text-base leading-relaxed" style={{ color: "oklch(0.45 0.03 255)" }}>
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
                <div className="p-5 rounded-xl flex items-start gap-3" style={{ backgroundColor: "oklch(0.94 0.04 185)", border: "1px solid oklch(0.85 0.06 185)" }}>
                  <CheckCircle size={18} style={{ color: "oklch(0.50 0.12 185)" }} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-display font-semibold text-sm mb-0.5" style={{ color: "oklch(0.28 0.08 200)" }}>{item.label}</div>
                    <div className="font-body text-xs" style={{ color: "oklch(0.45 0.08 200)" }}>{item.desc}</div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24" style={{ backgroundColor: "oklch(0.95 0.008 80)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <RevealSection className="mb-12">
            <div className="w-12 h-0.5 mb-4" style={{ backgroundColor: "oklch(0.58 0.12 185)" }} />
            <h2 className="font-display text-4xl font-semibold" style={{ color: "oklch(0.22 0.06 255)" }}>
              What We Cover
            </h2>
            <p className="font-body mt-3 max-w-xl" style={{ color: "oklch(0.45 0.03 255)" }}>
              Every service is designed to be practical, accessible, and immediately useful.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <RevealSection key={service.title} delay={i * 80}>
                <div className="p-7 rounded-xl h-full" style={{ backgroundColor: "white", border: "1px solid oklch(0.88 0.01 255)" }}>
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: service.color }}>
                    <service.icon size={20} style={{ color: "oklch(0.45 0.12 185)" }} />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2" style={{ color: "oklch(0.22 0.06 255)" }}>
                    {service.title}
                  </h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: "oklch(0.45 0.03 255)" }}>
                    {service.desc}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Value Ladder */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.22 0.06 255)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <RevealSection className="mb-12">
            <div className="w-12 h-0.5 mb-4" style={{ backgroundColor: "oklch(0.58 0.12 185)" }} />
            <h2 className="font-display text-4xl font-semibold text-white">
              Start Where You Are
            </h2>
            <p className="font-body mt-3 max-w-xl" style={{ color: "oklch(0.78 0.03 255)" }}>
              Our value ladder is designed to meet you exactly where you are — from a free first step to comprehensive coaching.
            </p>
          </RevealSection>

          <div className="space-y-4">
            {valueLadder.map((item, i) => (
              <RevealSection key={item.step} delay={i * 80}>
                <div
                  className="p-6 sm:p-8 rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-5"
                  style={{
                    backgroundColor: item.highlight ? "oklch(0.58 0.12 185)" : "oklch(0.30 0.07 255)",
                    border: item.highlight ? "2px solid oklch(0.72 0.10 185)" : "1px solid oklch(0.35 0.06 255)",
                  }}
                >
                  <div className="flex-shrink-0">
                    <span
                      className="font-display text-3xl font-bold"
                      style={{ color: item.highlight ? "white" : "oklch(0.55 0.08 185)" }}
                    >
                      {item.step}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3
                        className="font-display font-semibold text-xl"
                        style={{ color: item.highlight ? "white" : "oklch(0.90 0.02 255)" }}
                      >
                        {item.title}
                      </h3>
                      {item.highlight && (
                        <span className="text-xs font-semibold font-body px-2 py-0.5 rounded-full" style={{ backgroundColor: "white", color: "oklch(0.45 0.12 185)" }}>
                          Most Popular
                        </span>
                      )}
                    </div>
                    <p
                      className="font-body text-sm leading-relaxed"
                      style={{ color: item.highlight ? "oklch(0.92 0.04 185)" : "oklch(0.68 0.03 255)" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                  <div className="flex-shrink-0 flex flex-col items-end gap-2">
                    <span
                      className="font-display font-semibold text-xl"
                      style={{ color: item.highlight ? "white" : "oklch(0.80 0.08 185)" }}
                    >
                      {item.price}
                    </span>
                    <Link href={item.cta === "Coming Soon" ? "#" : item.cta === "Contact Us" ? "/contact" : item.cta === "Book a Session" ? "/contact" : "#ebook"}>
                      <button
                        className="flex items-center gap-1.5 text-sm font-semibold font-body px-4 py-2 rounded-lg transition-all"
                        style={
                          item.highlight
                            ? { backgroundColor: "white", color: "oklch(0.45 0.12 185)" }
                            : item.cta === "Coming Soon"
                            ? { backgroundColor: "oklch(0.38 0.06 255)", color: "oklch(0.60 0.03 255)", cursor: "default" }
                            : { backgroundColor: "oklch(0.58 0.12 185 / 0.25)", color: "oklch(0.80 0.08 185)" }
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

      {/* E-Book Feature */}
      <section id="ebook" className="py-24" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <div className="w-12 h-0.5 mb-5" style={{ backgroundColor: "oklch(0.58 0.12 185)" }} />
              <span className="division-badge division-badge-cyber mb-4 inline-flex">
                <BookOpen size={11} /> Featured Resource
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold mb-5" style={{ color: "oklch(0.22 0.06 255)" }}>
                Click with<br />Confidence
              </h2>
              <p className="font-body text-lg leading-relaxed mb-4" style={{ color: "oklch(0.40 0.03 255)" }}>
                The complete guide to staying safe online — written in plain English, with no tech background required. Practical, clear, and built for real life.
              </p>
              <p className="font-body text-base leading-relaxed mb-6" style={{ color: "oklch(0.45 0.03 255)" }}>
                This e-book covers everything from recognizing scams to setting up secure passwords to protecting your personal information — all in clear, step-by-step language that actually makes sense.
              </p>

              <ul className="space-y-2.5 mb-8">
                {[
                  "How to spot phishing emails and fake websites",
                  "The password system that actually works",
                  "What to do if you think you've been scammed",
                  "Privacy settings explained in plain English",
                  "Safe online shopping and banking habits",
                  "How to protect your Social Security and Medicare info",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm font-body" style={{ color: "oklch(0.40 0.03 255)" }}>
                    <CheckCircle size={15} style={{ color: "oklch(0.58 0.12 185)" }} className="flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-4">
                <Link href="/contact">
                  <button
                    className="flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold font-body text-sm text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: "oklch(0.58 0.12 185)" }}
                  >
                    <Download size={15} />
                    Get the E-Book — $27
                  </button>
                </Link>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => <Star key={i} size={13} fill="oklch(0.75 0.16 75)" style={{ color: "oklch(0.75 0.16 75)" }} />)}
                  <span className="text-xs font-body ml-1" style={{ color: "oklch(0.55 0.03 255)" }}>5.0</span>
                </div>
              </div>
            </RevealSection>

            <RevealSection delay={150}>
              <div
                className="relative p-10 rounded-2xl text-center"
                style={{ backgroundColor: "oklch(0.94 0.04 185)", border: "2px solid oklch(0.85 0.08 185)" }}
              >
                <div
                  className="w-32 h-40 mx-auto mb-6 rounded-xl flex flex-col items-center justify-center shadow-xl"
                  style={{ backgroundColor: "oklch(0.30 0.10 200)" }}
                >
                  <Shield size={36} style={{ color: "oklch(0.72 0.10 185)" }} className="mb-2" />
                  <span className="font-display text-white text-xs font-semibold text-center leading-tight px-2">Click with Confidence</span>
                </div>
                <h3 className="font-display text-2xl font-semibold mb-2" style={{ color: "oklch(0.25 0.08 200)" }}>
                  Click with Confidence
                </h3>
                <p className="font-body text-sm mb-4" style={{ color: "oklch(0.40 0.08 200)" }}>
                  Your Complete Guide to Online Safety
                </p>
                <div className="text-4xl font-display font-bold mb-1" style={{ color: "oklch(0.30 0.10 200)" }}>$27</div>
                <p className="text-xs font-body mb-6" style={{ color: "oklch(0.50 0.08 200)" }}>Instant digital download</p>
                <Link href="/contact">
                  <button
                    className="w-full py-3 rounded-lg font-semibold font-body text-sm text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: "oklch(0.50 0.12 185)" }}
                  >
                    Purchase Now — $27
                  </button>
                </Link>
                <p className="text-xs font-body mt-3" style={{ color: "oklch(0.50 0.08 200)" }}>
                  100% satisfaction guarantee
                </p>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.30 0.10 200)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <RevealSection>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white mb-4">
              Ready to feel confident online?
            </h2>
            <p className="font-body text-lg mb-8" style={{ color: "oklch(0.80 0.04 200)" }}>
              Book a free 30-minute consultation with our team. No pressure, no jargon — just an honest conversation about where you are and how we can help.
            </p>
            <Link href="/contact">
              <button
                className="px-8 py-4 rounded-lg font-semibold font-body text-sm text-white transition-all hover:opacity-90"
                style={{ backgroundColor: "oklch(0.58 0.12 185)" }}
              >
                Book Your Free Consultation
                <ArrowRight size={15} className="inline ml-2" />
              </button>
            </Link>
          </RevealSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
