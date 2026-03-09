/*
 * About Page — McMillon Co.
 * Design: Pacific Northwest Professional
 * Story, mission/vision, team section (Nick & Mandie McMillon)
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Heart, Target, Lightbulb, Shield, Rocket, ArrowRight } from "lucide-react";
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
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

const values = [
  { icon: Heart, title: "Genuine Care", desc: "We treat every client like a neighbor, not a number. Our work is personal because the stakes are personal.", color: "oklch(0.58 0.12 185)" },
  { icon: Target, title: "Practical Focus", desc: "We skip the theory and get to what actually helps. Every session, every resource is built for real-world use.", color: "oklch(0.75 0.16 75)" },
  { icon: Lightbulb, title: "Plain Language", desc: "No jargon. No acronyms without explanation. We speak like humans, because our clients are humans.", color: "oklch(0.58 0.12 185)" },
  { icon: Shield, title: "Integrity Always", desc: "We recommend what's right for you, not what's easiest for us. Trust is the foundation of everything we do.", color: "oklch(0.75 0.16 75)" },
];

export default function About() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
      <Navigation />

      {/* Page Header */}
      <section className="pt-32 pb-16" style={{ backgroundColor: "oklch(0.22 0.06 255)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl">
            <div className="teal-bar mb-5" style={{ backgroundColor: "oklch(0.58 0.12 185)" }} />
            <h1 className="font-display text-5xl sm:text-6xl font-semibold text-white mb-5 leading-tight">
              About<br />McMillon Co.
            </h1>
            <p className="font-body text-lg leading-relaxed" style={{ color: "oklch(0.78 0.03 255)" }}>
              A consulting firm born from a simple belief: that everyone deserves guidance they can understand and trust.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <div className="teal-bar mb-5" />
              <h2 className="font-display text-4xl font-semibold mb-6" style={{ color: "oklch(0.22 0.06 255)" }}>
                Our Story
              </h2>
              <div className="space-y-4 font-body text-base leading-relaxed" style={{ color: "oklch(0.40 0.03 255)" }}>
                <p>
                  McMillon Co. was founded by Nick and Mandie McMillon in Kent, Washington — a community they've called home for years and one they're deeply committed to serving.
                </p>
                <p>
                  The idea came from a frustration Nick saw up close: his own parents struggling to navigate an increasingly digital world — not because they weren't intelligent, but because no one had taken the time to explain it in terms that made sense. Scam calls, confusing privacy settings, password anxiety — it was all unnecessarily stressful for people who deserved better.
                </p>
                <p>
                  That experience became the foundation for <strong className="font-semibold" style={{ color: "oklch(0.30 0.06 255)" }}>ClearPath Cyber</strong> — McMillon Co.'s primary division, focused on giving seniors 60+ the cybersecurity and privacy knowledge they need to feel safe and confident online.
                </p>
                <p>
                  McMillon Co. is built to grow. A youth financial literacy division, <strong className="font-semibold" style={{ color: "oklch(0.30 0.06 255)" }}>Launchpad Money</strong>, is currently in development — reflecting the same commitment to clear, practical guidance across generations.
                </p>
              </div>
            </RevealSection>

            <RevealSection delay={150}>
              <div className="relative">
                <div
                  className="absolute -top-4 -left-4 w-full h-full rounded-2xl"
                  style={{ backgroundColor: "oklch(0.94 0.04 185)", zIndex: 0 }}
                />
                <img
                  src={TEAM_IMG}
                  alt="Nick and Mandie McMillon"
                  className="relative z-10 w-full rounded-2xl object-cover shadow-xl"
                  style={{ aspectRatio: "4/3" }}
                />
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.95 0.008 80)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <RevealSection>
              <div
                className="p-10 rounded-2xl h-full"
                style={{ backgroundColor: "white", border: "1px solid oklch(0.88 0.01 255)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: "oklch(0.94 0.04 185)" }}
                >
                  <Target size={22} style={{ color: "oklch(0.50 0.12 185)" }} />
                </div>
                <h3 className="font-display text-2xl font-semibold mb-4" style={{ color: "oklch(0.22 0.06 255)" }}>
                  Our Mission
                </h3>
                <p className="font-body leading-relaxed" style={{ color: "oklch(0.40 0.03 255)" }}>
                  To provide clear, accessible, and practical consulting services that empower seniors to navigate the digital world with confidence and equip young people with the financial skills they need to build a secure future — all delivered with honesty, warmth, and a deep commitment to our community.
                </p>
              </div>
            </RevealSection>

            <RevealSection delay={150}>
              <div
                className="p-10 rounded-2xl h-full"
                style={{ backgroundColor: "oklch(0.22 0.06 255)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: "oklch(0.58 0.12 185 / 0.25)" }}
                >
                  <Lightbulb size={22} style={{ color: "oklch(0.72 0.10 185)" }} />
                </div>
                <h3 className="font-display text-2xl font-semibold mb-4 text-white">
                  Our Vision
                </h3>
                <p className="font-body leading-relaxed" style={{ color: "oklch(0.78 0.03 255)" }}>
                  A Pacific Northwest where every senior feels safe online and every young adult enters adulthood financially prepared. We envision McMillon Co. as the trusted consulting partner for families across generations — growing our divisions, deepening our impact, and never losing sight of the people behind every conversation.
                </p>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <RevealSection className="mb-12">
            <div className="teal-bar mb-4" />
            <h2 className="font-display text-4xl font-semibold" style={{ color: "oklch(0.22 0.06 255)" }}>
              What We Stand For
            </h2>
          </RevealSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <RevealSection key={value.title} delay={i * 100}>
                <div
                  className="p-7 rounded-xl h-full"
                  style={{ backgroundColor: "white", border: "1px solid oklch(0.88 0.01 255)" }}
                >
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: i % 2 === 0 ? "oklch(0.94 0.04 185)" : "oklch(0.96 0.05 75)" }}
                  >
                    <value.icon size={20} style={{ color: value.color }} />
                  </div>
                  <h4 className="font-display font-semibold text-lg mb-2" style={{ color: "oklch(0.22 0.06 255)" }}>
                    {value.title}
                  </h4>
                  <p className="font-body text-sm leading-relaxed" style={{ color: "oklch(0.45 0.03 255)" }}>
                    {value.desc}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.95 0.008 80)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <RevealSection className="mb-12">
            <div className="teal-bar mb-4" />
            <h2 className="font-display text-4xl font-semibold" style={{ color: "oklch(0.22 0.06 255)" }}>
              Meet the Team
            </h2>
            <p className="font-body mt-3" style={{ color: "oklch(0.45 0.03 255)" }}>
              McMillon Co. is a family-led firm built on personal accountability and genuine relationships.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
            {[
              {
                name: "Nick McMillon",
                title: "Co-Founder & Lead Consultant, ClearPath Cyber",
                bio: "Nick brings years of experience in technology and community education to ClearPath Cyber. His passion for helping seniors navigate the digital world safely stems from watching his own family struggle with the same challenges — and knowing that the right guidance makes all the difference.",
                initials: "NM",
                accent: "oklch(0.94 0.04 185)",
                accentText: "oklch(0.40 0.10 185)",
              },
              {
                name: "Mandie McMillon",
                title: "Co-Founder & Consultant, McMillon Co.",
                bio: "Mandie brings a background in education and community outreach to McMillon Co. She is currently developing Launchpad Money — a financial literacy program for high schoolers and young adults — drawing on her belief that financial confidence is a skill anyone can build with the right support.",
                initials: "MM",
                accent: "oklch(0.96 0.05 75)",
                accentText: "oklch(0.50 0.14 75)",
              },
            ].map((member, i) => (
              <RevealSection key={member.name} delay={i * 150}>
                <div
                  className="p-8 rounded-2xl"
                  style={{ backgroundColor: "white", border: "1px solid oklch(0.88 0.01 255)" }}
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-display font-semibold flex-shrink-0"
                      style={{ backgroundColor: member.accent, color: member.accentText }}
                    >
                      {member.initials}
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-xl" style={{ color: "oklch(0.22 0.06 255)" }}>
                        {member.name}
                      </h3>
                      <p className="font-body text-xs leading-snug mt-0.5" style={{ color: "oklch(0.55 0.03 255)" }}>
                        {member.title}
                      </p>
                    </div>
                  </div>
                  <p className="font-body text-sm leading-relaxed" style={{ color: "oklch(0.40 0.03 255)" }}>
                    {member.bio}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.22 0.06 255)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <RevealSection>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="font-body text-lg mb-8" style={{ color: "oklch(0.78 0.03 255)" }}>
              Explore ClearPath Cyber or reach out to book a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/clearpath-cyber">
                <button
                  className="px-7 py-3.5 rounded-lg font-semibold font-body text-sm flex items-center gap-2 transition-all hover:opacity-90"
                  style={{ backgroundColor: "oklch(0.58 0.12 185)", color: "white" }}
                >
                  <Shield size={15} /> Explore ClearPath Cyber
                </button>
              </Link>
              <Link href="/contact">
                <button
                  className="px-7 py-3.5 rounded-lg font-semibold font-body text-sm flex items-center gap-2 transition-all hover:bg-white/20"
                  style={{ color: "white", border: "1.5px solid oklch(1 0 0 / 0.3)" }}
                >
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
