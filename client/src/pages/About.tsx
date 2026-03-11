/*
 * About Page — Bright Path Cyber
 * Design: Concept D Editorial — "West Elm meets Apple"
 * Ivory backgrounds, brass gold accents, near-black text
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Heart, Target, Lightbulb, Shield, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const TEAM_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663415118379/JXjpt8aqftuhQ9n25h55pn/about-team-gxU6xrqb4GWCAeeJjRPP8p.webp";

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

const values = [
  { icon: Heart, title: "Genuine Care", desc: "We treat every client like a neighbor, not a number. Our work is personal because the stakes are personal." },
  { icon: Target, title: "Practical Focus", desc: "We skip the theory and get to what actually helps. Every session, every resource is built for real-world use." },
  { icon: Lightbulb, title: "Plain Language", desc: "No jargon. No acronyms without explanation. We speak like humans, because our clients are humans." },
  { icon: Shield, title: "Integrity Always", desc: "We recommend what's right for you, not what's easiest for us. Trust is the foundation of everything we do." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />

      {/* Page Header */}
      <section className="pt-32 pb-20 bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl">
            <div className="brass-bar mb-6" />
            <h1 className="font-display text-5xl sm:text-6xl font-bold mb-5 leading-tight" style={{ color: "#1A1A1A" }}>
              About
              <br />
              <span className="text-brass">Bright Path Cyber</span>
            </h1>
            <p className="font-body text-lg leading-relaxed text-warm-gray">
              Born from a simple belief: that everyone deserves digital safety guidance they can understand and trust.
            </p>
          </div>
        </div>
        <div className="brass-rule mt-16" />
      </section>

      {/* Story Section */}
      <section className="py-24 bg-ivory-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <div className="brass-bar mb-6" />
              <h2 className="font-display text-4xl font-bold mb-6" style={{ color: "#1A1A1A" }}>
                Our Story
              </h2>
              <div className="space-y-4 font-body text-base leading-relaxed text-warm-gray">
                <p>
                  Bright Path Cyber was founded by Nick and Mandie in Kent, Washington — a community they've called home for years and one they're deeply committed to serving.
                </p>
                <p>
                  The idea came from a frustration Nick saw up close: his own parents struggling to navigate an increasingly digital world — not because they weren't intelligent, but because no one had taken the time to explain it in terms that made sense. Scam calls, confusing privacy settings, password anxiety — it was all unnecessarily stressful for people who deserved better.
                </p>
                <p>
                  That experience became the foundation for <strong className="font-semibold" style={{ color: "#1A1A1A" }}>Bright Path Cyber</strong> — focused on giving individuals and families the cybersecurity and privacy knowledge they need to feel safe and confident online.
                </p>
              </div>
            </RevealSection>

            <RevealSection delay={150}>
              <div className="relative">
                <div
                  className="absolute -top-3 -left-3 w-full h-full"
                  style={{ border: "1px solid rgba(201,168,76,0.4)", borderRadius: "4px", zIndex: 0 }}
                />
                <img
                  src={TEAM_IMG}
                  alt="Nick and Mandie — Bright Path Cyber founders"
                  className="relative z-10 w-full object-cover shadow-lg"
                  style={{ aspectRatio: "4/3", borderRadius: "4px" }}
                />
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      <div className="brass-rule" />

      {/* Mission & Vision */}
      <section className="py-24 bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <RevealSection>
              <div
                className="p-10 h-full"
                style={{ backgroundColor: "rgba(255,255,255,0.6)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "4px" }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center mb-5"
                  style={{ border: "1px solid rgba(201,168,76,0.4)", borderRadius: "4px" }}
                >
                  <Target size={22} className="text-brass" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-4" style={{ color: "#1A1A1A" }}>
                  Our Mission
                </h3>
                <p className="font-body leading-relaxed text-warm-gray">
                  To provide clear, accessible, and practical cybersecurity guidance that empowers individuals and families to navigate the digital world with confidence — delivered with honesty, warmth, and a deep commitment to our community.
                </p>
              </div>
            </RevealSection>

            <RevealSection delay={150}>
              <div
                className="p-10 h-full"
                style={{ backgroundColor: "#1A1A1A", borderRadius: "4px" }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center mb-5"
                  style={{ border: "1px solid rgba(201,168,76,0.5)", borderRadius: "4px" }}
                >
                  <Lightbulb size={22} className="text-brass" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-4 text-brass">
                  Our Vision
                </h3>
                <p className="font-body leading-relaxed" style={{ color: "rgba(245,240,232,0.8)" }}>
                  A Pacific Northwest where every person — regardless of age or background — feels safe and confident online. We envision Bright Path Cyber as the trusted digital safety partner for individuals and families across generations — growing our reach, deepening our impact, and never losing sight of the people behind every conversation.
                </p>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      <div className="brass-rule" />

      {/* Core Values */}
      <section className="py-24 bg-ivory-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <RevealSection className="mb-12">
            <div className="brass-bar mb-6" />
            <h2 className="font-display text-4xl font-bold" style={{ color: "#1A1A1A" }}>
              What We Stand For
            </h2>
          </RevealSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <RevealSection key={value.title} delay={i * 100}>
                <div
                  className="p-7 h-full card-lift"
                  style={{ backgroundColor: "rgba(255,255,255,0.6)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "4px" }}
                >
                  <div
                    className="w-11 h-11 flex items-center justify-center mb-4"
                    style={{ border: "1px solid rgba(201,168,76,0.4)", borderRadius: "4px" }}
                  >
                    <value.icon size={20} className="text-brass" />
                  </div>
                  <h4 className="font-display font-semibold text-lg mb-2" style={{ color: "#1A1A1A" }}>
                    {value.title}
                  </h4>
                  <p className="font-body text-sm leading-relaxed text-warm-gray">
                    {value.desc}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      <div className="brass-rule" />

      {/* Team Section */}
      <section className="py-24 bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <RevealSection className="mb-12">
            <div className="brass-bar mb-6" />
            <h2 className="font-display text-4xl font-bold" style={{ color: "#1A1A1A" }}>
              Meet the Team
            </h2>
            <p className="font-body mt-3 text-warm-gray">
              Bright Path Cyber is a family-led business built on personal accountability and genuine relationships.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
            {[
              {
                name: "Nick McMillon",
                title: "Co-Founder & Lead Consultant",
                bio: "Nick brings years of experience in technology and community education to Bright Path Cyber. His passion for helping people navigate the digital world safely stems from watching his own family struggle with the same challenges — and knowing that the right guidance makes all the difference.",
                initials: "NM",
              },
              {
                name: "Mandie McMillon",
                title: "Co-Founder & Consultant",
                bio: "Mandie brings a background in education and community outreach to Bright Path Cyber. She believes that everyone deserves to feel confident and safe in the digital world, and she is dedicated to making cybersecurity guidance accessible, approachable, and genuinely useful for real people.",
                initials: "MM",
              },
            ].map((member, i) => (
              <RevealSection key={member.name} delay={i * 150}>
                <div
                  className="p-8"
                  style={{ backgroundColor: "rgba(255,255,255,0.6)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "4px" }}
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div
                      className="w-16 h-16 flex items-center justify-center text-xl font-display font-bold flex-shrink-0"
                      style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "#C9A84C", borderRadius: "4px", border: "1px solid rgba(201,168,76,0.3)" }}
                    >
                      {member.initials}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg" style={{ color: "#1A1A1A" }}>
                        {member.name}
                      </h3>
                      <p className="font-body text-xs leading-snug mt-0.5 text-warm-gray">
                        {member.title}
                      </p>
                    </div>
                  </div>
                  <p className="font-body text-sm leading-relaxed text-warm-gray">
                    {member.bio}
                  </p>
                </div>
              </RevealSection>
            ))}
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
              Ready to get started?
            </h2>
            <p className="font-body text-lg mb-10 text-warm-gray">
              Explore Bright Path Cyber or reach out to book a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/bright-path-cyber">
                <button className="btn-editorial btn-editorial-filled">
                  <Shield size={15} /> Explore Bright Path Cyber
                </button>
              </Link>
              <Link href="/contact">
                <button className="btn-editorial btn-editorial-outline">
                  <ArrowRight size={15} /> Book a Consultation
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
