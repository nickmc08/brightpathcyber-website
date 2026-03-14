/*
 * Bright Path Cyber — Resources Page
 * Design: Concept D Editorial — "West Elm meets Apple"
 * Ivory backgrounds, brass gold accents, near-black text
 * Business model: Blog (free) → E-book ($27) → Self-paced course (coming soon)
 * No coaching, consulting, workshops, or B2B
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  Shield, CheckCircle, ArrowRight, BookOpen,
  Lock, AlertTriangle, Eye, Smartphone, Download
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useEbookCheckout } from "@/hooks/useEbookCheckout";

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
  { icon: AlertTriangle, title: "Scam Awareness & Prevention", desc: "Learn to recognize phishing emails, phone scams, fake texts, and online fraud — before they cost you time, money, or peace of mind." },
  { icon: Lock, title: "Password & Account Security", desc: "Understand how to create strong passwords, use two-factor authentication, and manage your accounts safely — no tech headache required." },
  { icon: Eye, title: "Privacy Protection", desc: "Know what you're sharing online, who can see it, and how to adjust your settings so you're only sharing what you choose to." },
  { icon: Smartphone, title: "Device Safety", desc: "From smartphones to laptops — learn how to keep your devices updated, secure, and running smoothly." },
];

const ebookFeatures = [
  "How to spot the most common scams targeting everyday people",
  "Step-by-step password and account security setup",
  "Privacy settings walkthroughs for your devices and apps",
  "What to do if you think you've been compromised",
  "A personal digital safety checklist you can use right away",
  "Written in plain English — no tech background needed",
];

export default function BrightPathCyber() {
  const { checkout, loading: checkoutLoading } = useEbookCheckout();

  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl">
            <div className="brass-bar mb-6" />
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-5" style={{ color: "#1A1A1A" }}>
              Cyber Safety
              <br />
              <span className="text-brass">Resources</span>
            </h1>
            <p className="font-body text-xl leading-relaxed mb-3 text-warm-gray">
              Practical cybersecurity education you can actually use.
            </p>
            <p className="font-body text-base leading-relaxed text-warm-gray">
              Everything we create is designed to help you protect yourself online — in plain language, at your own pace. Start with the blog, go deeper with the e-book, and stay tuned for our upcoming self-paced course.
            </p>
          </div>
        </div>
        <div className="brass-rule mt-16" />
      </section>

      {/* What We Teach */}
      <section className="py-24 bg-ivory-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <RevealSection className="mb-12">
            <div className="brass-bar mb-6" />
            <h2 className="font-display text-4xl font-bold" style={{ color: "#1A1A1A" }}>
              What We Teach
            </h2>
            <p className="font-body mt-3 max-w-xl text-warm-gray">
              These are the core topics we cover across our blog, e-book, and upcoming course.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topics.map((topic, i) => (
              <RevealSection key={topic.title} delay={i * 80}>
                <div
                  className="p-7 h-full flex items-start gap-5 card-lift"
                  style={{ backgroundColor: "rgba(255,255,255,0.6)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "4px" }}
                >
                  <div
                    className="w-11 h-11 flex items-center justify-center flex-shrink-0"
                    style={{ border: "1px solid rgba(201,168,76,0.4)", borderRadius: "4px" }}
                  >
                    <topic.icon size={20} className="text-brass" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg mb-2" style={{ color: "#1A1A1A" }}>
                      {topic.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed text-warm-gray">
                      {topic.desc}
                    </p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      <div className="brass-rule" />

      {/* E-book Section */}
      <section id="ebook" className="py-24 bg-ivory">
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
              <p className="font-body text-lg leading-relaxed mb-6 text-warm-gray">
                Our comprehensive e-book covers everything you need to stay safe online — from spotting scams and securing your accounts to protecting your privacy on every device. Written in plain language, with step-by-step guidance you can follow at your own pace.
              </p>

              <ul className="space-y-3 mb-8">
                {ebookFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-brass flex-shrink-0 mt-0.5" />
                    <span className="font-body text-sm text-warm-gray">{feature}</span>
                  </li>
                ))}
              </ul>
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
                {/* Book mockup */}
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
                <button
                  onClick={checkout}
                  disabled={checkoutLoading}
                  className="btn-editorial btn-editorial-filled mx-auto"
                >
                  <Download size={15} />
                  {checkoutLoading ? "Loading..." : "Get the E-book"}
                </button>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      <div className="brass-rule" />

      {/* Self-Paced Course — Coming Soon */}
      <section className="py-24" style={{ backgroundColor: "#1A1A1A" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl mx-auto text-center">
            <RevealSection>
              <div className="brass-bar mx-auto mb-6" />
              <div
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold font-body mb-6"
                style={{ border: "1px solid rgba(201,168,76,0.4)", borderRadius: "2px", color: "#C9A84C" }}
              >
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#C9A84C" }} />
                Coming Soon
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold mb-5 text-brass">
                Self-Paced Course
              </h2>
              <p className="font-body text-lg leading-relaxed mb-4" style={{ color: "rgba(245,240,232,0.8)" }}>
                Everything in the e-book — and more — delivered as a guided, self-paced video course. Watch on your own schedule, revisit any lesson, and build your digital confidence step by step.
              </p>
              <p className="font-body text-base leading-relaxed mb-8" style={{ color: "rgba(245,240,232,0.6)" }}>
                We're building this now. Want to be the first to know when it launches?
              </p>
              <Link href="/contact">
                <button className="btn-editorial btn-editorial-outline" style={{ borderColor: "rgba(201,168,76,0.5)", color: "#C9A84C" }}>
                  Get Notified
                  <ArrowRight size={15} />
                </button>
              </Link>
            </RevealSection>
          </div>
        </div>
      </section>

      <div className="brass-rule" />

      {/* Blog CTA */}
      <section className="py-24 bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <RevealSection>
            <div className="brass-bar mx-auto mb-6" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-5" style={{ color: "#1A1A1A" }}>
              Start learning — for free
            </h2>
            <p className="font-body text-lg mb-8 max-w-xl mx-auto text-warm-gray">
              Our blog is packed with practical, jargon-free articles on scam awareness, account security, privacy, and more. New posts regularly.
            </p>
            <Link href="/blog">
              <button className="btn-editorial btn-editorial-filled">
                Read the Blog
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
