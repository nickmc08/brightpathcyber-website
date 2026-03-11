/*
 * Home Page — Bright Path Cyber
 * Design: Concept D Editorial — "West Elm meets Apple"
 * Ivory backgrounds, brass gold accents, near-black text
 * Sections: Hero, Feature, Value Proposition, Who We Help, CTA
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  Shield, CheckCircle, ArrowRight, Users, BookOpen, Award,
  Lock, Eye, AlertTriangle, User, Home as HomeIcon, Building2, HeartHandshake
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
    <div className="min-h-screen bg-ivory">
      <Navigation />

      {/* Hero Section — Editorial, ivory, clean */}
      <section className="relative min-h-[90vh] flex items-center pt-20 bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-20">
          <div className="max-w-3xl">
            <div className="brass-bar mb-8" />
            <div className="division-badge mb-6">
              <Shield size={11} />
              Personal Cybersecurity Guidance
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6" style={{ color: "#1A1A1A" }}>
              Navigate the digital world
              <br />
              <span className="text-brass">with confidence.</span>
            </h1>

            <p className="font-body text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl text-warm-gray">
              We help individuals and families stay safe online — with warm, jargon-free guidance from people who genuinely care. Based in Kent, Washington.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/bright-path-cyber">
                <button className="btn-editorial btn-editorial-filled">
                  Explore Cyber Safety
                  <ArrowRight size={15} />
                </button>
              </Link>
              <Link href="/contact">
                <button className="btn-editorial btn-editorial-outline">
                  Book a Free Consultation
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative brass line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 brass-rule" />
      </section>

      {/* Bright Path Cyber Feature Section */}
      <section className="py-24 bg-ivory-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <RevealSection>
              <div className="brass-bar mb-6" />
              <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6 leading-tight" style={{ color: "#1A1A1A" }}>
                Digital safety,
                <br />
                <span className="text-brass">made clear.</span>
              </h2>
              <p className="font-body text-lg leading-relaxed mb-4 text-warm-gray">
                Cyber threats are more sophisticated than ever — and they target anyone, regardless of age or background. Bright Path Cyber gives individuals and families the knowledge and confidence to protect themselves online, without needing to become a tech expert.
              </p>
              <p className="font-body text-base leading-relaxed mb-10 text-warm-gray">
                We work one-on-one and in small groups, always at your pace, always in plain English.
              </p>
              <Link href="/bright-path-cyber">
                <button className="btn-editorial btn-editorial-filled">
                  See All Services
                  <ArrowRight size={15} />
                </button>
              </Link>
            </RevealSection>

            <RevealSection delay={150}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {cyberServices.map((s, i) => (
                  <div
                    key={s.title}
                    className="p-6 card-lift"
                    style={{
                      backgroundColor: "rgba(245,240,232,0.6)",
                      border: "1px solid rgba(201,168,76,0.2)",
                      borderRadius: "4px",
                    }}
                  >
                    <div
                      className="w-10 h-10 flex items-center justify-center mb-4"
                      style={{ border: "1px solid rgba(201,168,76,0.4)", borderRadius: "4px" }}
                    >
                      <s.icon size={18} className="text-brass" />
                    </div>
                    <h4 className="font-display font-semibold text-sm mb-1.5" style={{ color: "#1A1A1A" }}>{s.title}</h4>
                    <p className="font-body text-xs leading-relaxed text-warm-gray">{s.desc}</p>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      <div className="brass-rule" />

      {/* Value Proposition */}
      <section className="py-24 bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <div className="brass-bar mb-6" />
              <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6 leading-tight" style={{ color: "#1A1A1A" }}>
                Why Bright Path Cyber?
              </h2>
              <p className="font-body text-lg leading-relaxed mb-5 text-warm-gray">
                We started Bright Path Cyber because we saw everyday people being left behind by the tech industry. Cybersecurity advice is often written for experts, full of jargon, and designed to scare rather than empower.
              </p>
              <p className="font-body text-lg leading-relaxed mb-8 text-warm-gray">
                Our approach is simple: meet people where they are, speak plainly, and give them tools they'll actually use. No jargon. No judgment. Just guidance that works.
              </p>
              <Link href="/about">
                <button className="btn-editorial btn-editorial-outline">
                  Read our full story
                  <ArrowRight size={15} />
                </button>
              </Link>
            </RevealSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {trustIndicators.map((item, i) => (
                <RevealSection key={item.label} delay={i * 100}>
                  <div
                    className="p-7 card-lift"
                    style={{
                      border: "1px solid rgba(201,168,76,0.25)",
                      borderRadius: "4px",
                      backgroundColor: "rgba(245,240,232,0.5)",
                    }}
                  >
                    <div
                      className="w-10 h-10 flex items-center justify-center mb-4"
                      style={{ border: "1px solid rgba(201,168,76,0.4)", borderRadius: "4px" }}
                    >
                      <item.icon size={18} className="text-brass" />
                    </div>
                    <h4 className="font-display font-semibold mb-1.5 text-base" style={{ color: "#1A1A1A" }}>{item.label}</h4>
                    <p className="font-body text-sm leading-relaxed text-warm-gray">
                      {item.desc}
                    </p>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="brass-rule" />

      {/* Who We Help */}
      <section className="py-24 bg-ivory-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <RevealSection className="mb-14">
            <div className="brass-bar mb-6" />
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4 leading-tight" style={{ color: "#1A1A1A" }}>
              Who We Help
            </h2>
            <p className="font-body text-lg max-w-2xl text-warm-gray">
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
              },
              {
                icon: HomeIcon,
                label: "Families",
                desc: "Protect everyone under your roof — from kids learning to navigate social media to parents managing online accounts.",
                highlights: ["Family group sessions", "Parental guidance tools", "Shared safety practices"],
              },
              {
                icon: Building2,
                label: "Small Businesses",
                desc: "Protect your business, your customers, and your reputation with practical cybersecurity guidance built for small teams.",
                highlights: ["Team security training", "Email & account safety", "Data protection basics"],
              },
              {
                icon: HeartHandshake,
                label: "Community Groups",
                desc: "Libraries, faith communities, nonprofits, and civic organizations — we bring cybersecurity education to the people who need it most.",
                highlights: ["Group workshops", "Custom presentations", "Ongoing partnerships"],
              },
            ].map((persona, i) => (
              <RevealSection key={persona.label} delay={i * 100}>
                <div
                  className="p-7 h-full flex flex-col card-lift"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.6)",
                    border: "1px solid rgba(201,168,76,0.2)",
                    borderRadius: "4px",
                  }}
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center mb-5 flex-shrink-0"
                    style={{ border: "1px solid rgba(201,168,76,0.4)", borderRadius: "4px" }}
                  >
                    <persona.icon size={22} className="text-brass" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2" style={{ color: "#1A1A1A" }}>
                    {persona.label}
                  </h3>
                  <p className="font-body text-sm leading-relaxed mb-5 flex-1 text-warm-gray">
                    {persona.desc}
                  </p>
                  <ul className="space-y-2">
                    {persona.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2">
                        <CheckCircle size={13} className="text-brass flex-shrink-0" />
                        <span className="font-body text-xs text-warm-gray">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection className="mt-12 text-center">
            <Link href="/contact">
              <button className="btn-editorial btn-editorial-filled">
                Find the right fit for you
                <ArrowRight size={15} />
              </button>
            </Link>
          </RevealSection>
        </div>
      </section>

      <div className="brass-rule" />

      {/* CTA Section */}
      <section className="py-24 bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <RevealSection>
            <div className="text-center max-w-2xl mx-auto">
              <div className="brass-bar mx-auto mb-6" />
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-5" style={{ color: "#1A1A1A" }}>
                Ready to feel safer online?
              </h2>
              <p className="font-body text-lg mb-10 text-warm-gray">
                Book a free consultation with Bright Path Cyber and take the first step toward digital confidence — on your terms, at your pace.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/bright-path-cyber">
                  <button className="btn-editorial btn-editorial-filled">
                    <Shield size={15} />
                    Explore Bright Path Cyber
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="btn-editorial btn-editorial-outline">
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
