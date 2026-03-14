/*
 * Home Page — Bright Path Cyber
 * Design: Concept D Editorial — "West Elm meets Apple"
 * Ivory backgrounds, brass gold accents, near-black text
 * Sections: Hero, Mission, E-book Feature, Blog Preview, CTA
 * Business model: Blog (free) → E-book ($27) → Self-paced course (coming soon)
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  Shield, ArrowRight, BookOpen, AlertTriangle, Lock, Eye
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChecklistSignupForm from "@/components/ChecklistSignupForm";

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

const topics = [
  { icon: AlertTriangle, title: "Scam Awareness", desc: "Learn to recognize the latest scams targeting everyday people — before they reach you." },
  { icon: Lock, title: "Password & Account Security", desc: "Simple systems to protect your accounts without memorizing a hundred passwords." },
  { icon: Eye, title: "Privacy Protection", desc: "Understand what you're sharing online and how to take back control of your data." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center pt-20 bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-20">
          <div className="max-w-3xl">
            <div className="brass-bar mb-8" />

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6" style={{ color: "#1A1A1A" }}>
              Navigate the digital world
              <br />
              <span className="text-brass">with confidence.</span>
            </h1>

            <p className="font-body text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl text-warm-gray">
              Practical, jargon-free cybersecurity education for individuals and families — from people who genuinely care.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/blog">
                <button className="btn-editorial btn-editorial-filled">
                  Read the Blog
                  <ArrowRight size={15} />
                </button>
              </Link>
              <Link href="/bright-path-cyber">
                <button className="btn-editorial btn-editorial-outline">
                  Explore Our Resources
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 brass-rule" />
      </section>

      {/* Mission Section */}
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
                We started Bright Path Cyber because we watched people we love fall prey to online scams. The cybersecurity world is full of jargon, fear tactics, and advice written for experts — not for the rest of us.
              </p>
              <p className="font-body text-base leading-relaxed text-warm-gray">
                So we created something different: plain-language education that meets you where you are. Through our blog, our e-book, and our upcoming self-paced course, we teach the practical steps that actually keep you safe online.
              </p>
            </RevealSection>

            <RevealSection delay={150}>
              <div className="grid grid-cols-1 gap-5">
                {topics.map((s) => (
                  <div
                    key={s.title}
                    className="p-6 card-lift flex items-start gap-5"
                    style={{
                      backgroundColor: "rgba(245,240,232,0.6)",
                      border: "1px solid rgba(201,168,76,0.2)",
                      borderRadius: "4px",
                    }}
                  >
                    <div
                      className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                      style={{ border: "1px solid rgba(201,168,76,0.4)", borderRadius: "4px" }}
                    >
                      <s.icon size={18} className="text-brass" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-base mb-1" style={{ color: "#1A1A1A" }}>{s.title}</h4>
                      <p className="font-body text-sm leading-relaxed text-warm-gray">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      <div className="brass-rule" />

      {/* E-book Feature */}
      <section className="py-24 bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <div className="brass-bar mb-6" />
              <div className="division-badge mb-4">
                <BookOpen size={11} />
                Featured Resource
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold mb-5 leading-tight" style={{ color: "#1A1A1A" }}>
                Click with
                <br />
                <span className="text-brass">Confidence</span>
              </h2>
              <p className="font-body text-lg leading-relaxed mb-4 text-warm-gray">
                Our comprehensive e-book covers everything you need to stay safe online — from spotting scams and securing your accounts to protecting your privacy on every device. Written in plain language, with step-by-step guidance you can follow at your own pace.
              </p>
              <p className="font-body text-base leading-relaxed mb-8 text-warm-gray">
                No tech background required. Just practical knowledge that works.
              </p>
              <Link href="/bright-path-cyber">
                <button className="btn-editorial btn-editorial-filled">
                  Learn More
                  <ArrowRight size={15} />
                </button>
              </Link>
            </RevealSection>

            <RevealSection delay={150}>
              <div
                className="p-10 text-center"
                style={{
                  backgroundColor: "rgba(255,255,255,0.6)",
                  border: "1px solid rgba(201,168,76,0.25)",
                  borderRadius: "4px",
                }}
              >
                <div
                  className="w-48 h-64 mx-auto mb-6 flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #1A1A1A 0%, #2a2a2a 100%)",
                    borderRadius: "4px",
                    boxShadow: "8px 8px 24px rgba(0,0,0,0.12)",
                  }}
                >
                  <div className="text-center px-4">
                    <Shield size={28} style={{ color: "#C9A84C" }} className="mx-auto mb-3" />
                    <div className="font-display text-sm font-bold" style={{ color: "#F5F0E8" }}>
                      Click with
                    </div>
                    <div className="font-display text-lg font-bold" style={{ color: "#C9A84C" }}>
                      Confidence
                    </div>
                    <div className="mt-2 text-[9px] font-body" style={{ color: "rgba(245,240,232,0.6)" }}>
                      Bright Path Cyber
                    </div>
                  </div>
                </div>
                <div className="font-display text-3xl font-bold mb-1" style={{ color: "#1A1A1A" }}>$27</div>
                <p className="font-body text-sm text-warm-gray mb-5">Instant digital download</p>
                <button className="btn-editorial btn-editorial-filled mx-auto">
                  Get the E-book
                  <ArrowRight size={15} />
                </button>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      <div className="brass-rule" />

      {/* Free Checklist Section */}
      <section id="free-checklist" className="py-24 bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <div className="brass-bar mb-6" />
              <div className="division-badge mb-4">
                Free Resource
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold mb-5 leading-tight" style={{ color: "#1A1A1A" }}>
                Protect Yourself
                <br />
                <span className="text-brass">in 5 Minutes</span>
              </h2>
              <p className="font-body text-lg leading-relaxed mb-4 text-warm-gray">
                Download your free Personal Security Audit Checklist — no technical knowledge required.
              </p>
              <p className="font-body text-base leading-relaxed text-warm-gray">
                A simple, actionable list of the most important steps you can take right now to protect yourself online. Takes about five minutes to go through. Could save you from a lot of headaches.
              </p>
            </RevealSection>

            <RevealSection delay={150}>
              <div
                className="p-8 sm:p-10"
                style={{
                  backgroundColor: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(201,168,76,0.3)",
                  borderRadius: "4px",
                }}
              >
                <ChecklistSignupForm />
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      <div className="brass-rule" />

      {/* Blog Preview */}
      <section className="py-24 bg-ivory-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <RevealSection className="mb-12">
            <div className="brass-bar mb-6" />
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4 leading-tight" style={{ color: "#1A1A1A" }}>
              From the <span className="text-brass">Blog</span>
            </h2>
            <p className="font-body text-lg max-w-2xl text-warm-gray">
              Free, practical articles to help you stay informed and stay safe. New posts regularly.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "5 Scams Targeting Everyday People Right Now",
                excerpt: "From fake delivery texts to AI-generated voice calls — here's what to watch for and how to protect yourself.",
                tag: "Scam Awareness",
              },
              {
                title: "How to Tell If a Website Is Safe",
                excerpt: "Before you enter your information anywhere online, check for these simple signs that a site can be trusted.",
                tag: "Online Safety",
              },
              {
                title: "Why Your Password Is the Front Door to Your Digital Life",
                excerpt: "If someone guessed your password today, what could they access? Here's how to lock that door properly.",
                tag: "Account Security",
              },
            ].map((post, i) => (
              <RevealSection key={post.title} delay={i * 100}>
                <Link href="/blog">
                  <div
                    className="p-7 h-full flex flex-col card-lift cursor-pointer"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.6)",
                      border: "1px solid rgba(201,168,76,0.2)",
                      borderRadius: "4px",
                    }}
                  >
                    <div className="division-badge mb-4">
                      {post.tag}
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-3 leading-snug" style={{ color: "#1A1A1A" }}>
                      {post.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed flex-1 text-warm-gray">
                      {post.excerpt}
                    </p>
                    <div className="mt-5 flex items-center gap-1.5 text-brass font-body text-sm font-medium">
                      Read article <ArrowRight size={13} />
                    </div>
                  </div>
                </Link>
              </RevealSection>
            ))}
          </div>

          <RevealSection className="mt-10 text-center">
            <Link href="/blog">
              <button className="btn-editorial btn-editorial-outline">
                View All Articles
                <ArrowRight size={15} />
              </button>
            </Link>
          </RevealSection>
        </div>
      </section>

      <div className="brass-rule" />

      {/* Simple CTA */}
      <section className="py-24 bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <RevealSection>
            <div className="text-center max-w-2xl mx-auto">
              <div className="brass-bar mx-auto mb-6" />
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-5" style={{ color: "#1A1A1A" }}>
                Ready to feel safer online?
              </h2>
              <p className="font-body text-lg mb-8 text-warm-gray">
                Start with the blog — it's free, practical, and written for real people. When you're ready for the full picture, our e-book has you covered.
              </p>
              <Link href="/bright-path-cyber">
                <button className="btn-editorial btn-editorial-filled">
                  <Shield size={15} />
                  Explore Our Resources
                </button>
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
