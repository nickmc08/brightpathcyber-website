/*
 * Home Page — Bright Path Cyber
 * Design: Pacific Northwest Professional
 * Left-anchored editorial layout, Fraunces display, DM Sans body
 * Sections: Hero, Feature section, Value Proposition, Who We Help, CTA
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  Shield, CheckCircle, ArrowRight, Users, BookOpen, Award,
  Lock, Eye, AlertTriangle, User, Home as HomeIcon, Building2, HeartHandshake
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663415118379/JXjpt8aqftuhQ9n25h55pn/mcmillon-hero-FFYtHC82fSSjaDdabACeSY.webp";
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

const trustIndicators = [
  { icon: Users, label: "Community-Focused", desc: "Serving Kent, WA and the greater Pacific Northwest" },
  { icon: Shield, label: "Plain-Language Guidance", desc: "No jargon, no overwhelm — just clear, honest advice" },
  { icon: BookOpen, label: "Education-First", desc: "We teach, not just tell — empowering lasting confidence" },
  { icon: Award, label: "Results-Driven", desc: "Practical outcomes measured in real peace of mind" },
];

const cyberServices = [
  { icon: AlertTriangle, title: "Scam Awareness", desc: "Learn to recognize the latest scams targeting everyday people — before they reach you." },
  { icon: Lock, title: "Password & Account Security", desc: "Simple systems to protect your accounts without memorizing a hundred passwords." },
  { icon: Eye, title: "Privacy Protection", desc: "Understand what you're sharing online and how to take back control." },
  { icon: Shield, title: "1-on-1 Coaching", desc: "Personalized sessions at your pace — no tech background required." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-warm-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMG}
            alt="Bright Path Cyber — personal cybersecurity coaching"
            className="w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(105deg, oklch(0.22 0.06 255 / 0.90) 0%, oklch(0.22 0.06 255 / 0.72) 55%, oklch(0.22 0.06 255 / 0.28) 100%)" }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-20">
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold font-body uppercase tracking-widest mb-6"
              style={{ backgroundColor: "oklch(0.58 0.12 185 / 0.25)", color: "oklch(0.85 0.08 185)", border: "1px solid oklch(0.58 0.12 185 / 0.4)" }}
            >
              <MapPin size={11} />
              Kent, Washington
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] text-white mb-4">
              Stay safe online.
              <br />
              <em className="not-italic" style={{ color: "oklch(0.72 0.10 185)" }}>Feel confident.</em>
            </h1>

            <p className="text-lg sm:text-xl font-body leading-relaxed mb-3" style={{ color: "oklch(0.85 0.02 255)" }}>
              We help individuals and families navigate the digital world safely — with warm, jargon-free guidance from people who genuinely care.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/bright-path-cyber">
                <button
                  className="px-7 py-3.5 rounded-lg font-semibold font-body text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg"
                  style={{ backgroundColor: "oklch(0.58 0.12 185)" }}
                >
                  Explore Cyber Safety
                </button>
              </Link>
              <Link href="/contact">
                <button
                  className="px-7 py-3.5 rounded-lg font-semibold font-body transition-all duration-200 hover:bg-white/20"
                  style={{ color: "white", border: "1.5px solid oklch(1 0 0 / 0.4)" }}
                >
                  Book a Free Consultation
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-px h-10 animate-pulse" style={{ background: "linear-gradient(to bottom, oklch(0.72 0.10 185), transparent)" }} />
        </div>
      </section>

      {/* Bright Path Cyber Feature Section */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <RevealSection>
              <div className="teal-bar mb-5" />
              <div className="flex items-center gap-2 mb-3">
                <span className="division-badge division-badge-cyber">
                  <Shield size={11} /> Bright Path Cyber
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold mb-5 leading-tight" style={{ color: "oklch(0.22 0.06 255)" }}>
                Digital safety,<br />
                <em className="not-italic" style={{ color: "oklch(0.50 0.12 185)" }}>made clear.</em>
              </h2>
              <p className="font-body text-lg leading-relaxed mb-4" style={{ color: "oklch(0.40 0.03 255)" }}>
                Cyber threats are more sophisticated than ever — and they target anyone, regardless of age or background. Bright Path Cyber gives individuals and families the knowledge and confidence to protect themselves online, without needing to become a tech expert.
              </p>
              <p className="font-body text-base leading-relaxed mb-8" style={{ color: "oklch(0.50 0.03 255)" }}>
                We work one-on-one and in small groups, always at your pace, always in plain English.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {cyberServices.map((s, i) => (
                  <div key={s.title} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: "oklch(0.94 0.04 185)" }}>
                      <s.icon size={16} style={{ color: "oklch(0.50 0.12 185)" }} />
                    </div>
                    <div>
                      <div className="font-display font-semibold text-sm mb-0.5" style={{ color: "oklch(0.22 0.06 255)" }}>{s.title}</div>
                      <div className="font-body text-xs leading-relaxed" style={{ color: "oklch(0.50 0.03 255)" }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/bright-path-cyber">
                <button
                  className="flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold font-body text-sm text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: "oklch(0.50 0.12 185)" }}
                >
                  See All Services
                  <ArrowRight size={15} />
                </button>
              </Link>
            </RevealSection>

            <RevealSection delay={150}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={BRIGHTPATH_IMG}
                  alt="Bright Path Cyber — personal cybersecurity coaching"
                  className="w-full h-80 lg:h-96 object-cover object-center"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, oklch(0.22 0.06 255 / 0.6) 0%, transparent 50%)" }} />
                {/* Featured product badge */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="p-4 rounded-xl" style={{ backgroundColor: "white", boxShadow: "0 4px 20px oklch(0 0 0 / 0.15)" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "oklch(0.94 0.04 185)" }}>
                        <BookOpen size={18} style={{ color: "oklch(0.50 0.12 185)" }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-display font-semibold text-sm" style={{ color: "oklch(0.22 0.06 255)" }}>
                          "Click with Confidence" E-Book
                        </div>
                        <div className="font-body text-xs" style={{ color: "oklch(0.50 0.03 255)" }}>
                          Your guide to staying safe online — $27
                        </div>
                      </div>
                      <Link href="/bright-path-cyber">
                        <button
                          className="flex-shrink-0 px-3 py-1.5 rounded-lg font-semibold font-body text-xs text-white transition-all hover:opacity-90"
                          style={{ backgroundColor: "oklch(0.58 0.12 185)" }}
                        >
                          Learn More
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.22 0.06 255)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <div className="teal-bar mb-5" style={{ backgroundColor: "oklch(0.58 0.12 185)" }} />
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-white mb-6 leading-tight">
                Why Bright Path Cyber?
              </h2>
              <p className="font-body text-lg leading-relaxed mb-5" style={{ color: "oklch(0.78 0.03 255)" }}>
                We started Bright Path Cyber because we saw everyday people being left behind — overwhelmed by digital threats they couldn't name, targeted by scammers who knew exactly how to exploit that uncertainty.
              </p>
              <p className="font-body text-lg leading-relaxed mb-8" style={{ color: "oklch(0.78 0.03 255)" }}>
                Our approach is simple: meet people where they are, speak plainly, and give them tools they'll actually use. No jargon. No judgment. Just guidance that works.
              </p>
              <Link href="/about">
                <button
                  className="flex items-center gap-2 font-semibold font-body text-sm transition-all hover:gap-3"
                  style={{ color: "oklch(0.72 0.10 185)" }}
                >
                  Read our full story
                  <ArrowRight size={15} />
                </button>
              </Link>
            </RevealSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {trustIndicators.map((item, i) => (
                <RevealSection key={item.label} delay={i * 100}>
                  <div className="p-6 rounded-xl" style={{ backgroundColor: "oklch(0.30 0.07 255)" }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: "oklch(0.58 0.12 185 / 0.2)" }}>
                      <item.icon size={18} style={{ color: "oklch(0.72 0.10 185)" }} />
                    </div>
                    <h4 className="font-display font-semibold text-white mb-1.5 text-base">{item.label}</h4>
                    <p className="font-body text-sm leading-relaxed" style={{ color: "oklch(0.65 0.03 255)" }}>
                      {item.desc}
                    </p>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who We Help */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.95 0.008 80)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <RevealSection className="mb-14">
            <div className="teal-bar mb-5" style={{ backgroundColor: "oklch(0.58 0.12 185)" }} />
            <h2 className="font-display text-4xl sm:text-5xl font-semibold mb-4 leading-tight" style={{ color: "oklch(0.22 0.06 255)" }}>
              Who We Help
            </h2>
            <p className="font-body text-lg max-w-2xl" style={{ color: "oklch(0.45 0.03 255)" }}>
              Bright Path Cyber serves anyone who wants to feel safer and more confident online — no matter your background, age, or tech experience.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: User,
                label: "Individuals",
                desc: "Anyone who wants to understand and manage their own digital safety — at their own pace, without the tech overwhelm.",
                highlights: ["1-on-1 coaching sessions", "Device & account reviews", "Scam awareness training"],
                accent: "oklch(0.94 0.04 185)",
                accentStrong: "oklch(0.50 0.12 185)",
                accentText: "oklch(0.35 0.10 185)",
              },
              {
                icon: HomeIcon,
                label: "Families",
                desc: "Protect everyone under your roof — from kids learning to navigate social media to parents managing online accounts.",
                highlights: ["Family group sessions", "Parental guidance tools", "Shared safety practices"],
                accent: "oklch(0.93 0.04 220)",
                accentStrong: "oklch(0.48 0.12 220)",
                accentText: "oklch(0.32 0.10 220)",
              },
              {
                icon: Building2,
                label: "Small Businesses",
                desc: "Protect your business, your customers, and your reputation with practical cybersecurity guidance built for small teams.",
                highlights: ["Team security training", "Email & account safety", "Data protection basics"],
                accent: "oklch(0.94 0.03 260)",
                accentStrong: "oklch(0.45 0.10 260)",
                accentText: "oklch(0.30 0.08 260)",
              },
              {
                icon: HeartHandshake,
                label: "Community Groups",
                desc: "Libraries, faith communities, nonprofits, and civic organizations — we bring cybersecurity education to the people who need it most.",
                highlights: ["Group workshops", "Custom presentations", "Ongoing partnerships"],
                accent: "oklch(0.95 0.04 145)",
                accentStrong: "oklch(0.45 0.12 145)",
                accentText: "oklch(0.30 0.10 145)",
              },
            ].map((persona, i) => (
              <RevealSection key={persona.label} delay={i * 100}>
                <div
                  className="rounded-2xl p-7 h-full flex flex-col"
                  style={{ backgroundColor: "white", border: "1px solid oklch(0.88 0.01 255)", boxShadow: "0 2px 12px oklch(0 0 0 / 0.04)" }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 flex-shrink-0"
                    style={{ backgroundColor: persona.accent }}
                  >
                    <persona.icon size={22} style={{ color: persona.accentStrong }} />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2" style={{ color: "oklch(0.22 0.06 255)" }}>
                    {persona.label}
                  </h3>
                  <p className="font-body text-sm leading-relaxed mb-5 flex-1" style={{ color: "oklch(0.45 0.03 255)" }}>
                    {persona.desc}
                  </p>
                  <ul className="space-y-2">
                    {persona.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2">
                        <CheckCircle size={13} style={{ color: persona.accentStrong }} className="flex-shrink-0" />
                        <span className="font-body text-xs" style={{ color: "oklch(0.40 0.03 255)" }}>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection className="mt-10 text-center">
            <Link href="/contact">
              <button
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold font-body text-sm text-white transition-all hover:opacity-90"
                style={{ backgroundColor: "oklch(0.50 0.12 185)" }}
              >
                Find the right fit for you
                <ArrowRight size={15} />
              </button>
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <RevealSection>
            <div className="rounded-2xl p-10 sm:p-14 text-center" style={{ backgroundColor: "oklch(0.22 0.06 255)" }}>
              <div className="teal-bar mx-auto mb-5" style={{ backgroundColor: "oklch(0.58 0.12 185)" }} />
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white mb-4">
                Ready to feel safer online?
              </h2>
              <p className="font-body text-lg mb-8 max-w-xl mx-auto" style={{ color: "oklch(0.78 0.03 255)" }}>
                Book a free consultation with Bright Path Cyber and take the first step toward digital confidence — on your terms, at your pace.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/bright-path-cyber">
                  <button
                    className="px-7 py-3.5 rounded-lg font-semibold font-body text-sm transition-all hover:opacity-90"
                    style={{ backgroundColor: "oklch(0.58 0.12 185)", color: "white" }}
                  >
                    <span className="flex items-center gap-2"><Shield size={15} /> Explore Bright Path Cyber</span>
                  </button>
                </Link>
                <Link href="/contact">
                  <button
                    className="px-7 py-3.5 rounded-lg font-semibold font-body text-sm transition-all hover:bg-white/20"
                    style={{ color: "white", border: "1.5px solid oklch(1 0 0 / 0.3)" }}
                  >
                    Book a Free Consultation
                  </button>
                </Link>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function MapPin({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
