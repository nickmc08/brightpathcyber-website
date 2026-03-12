/*
 * About Page — Bright Path Cyber
 * Design: Concept D Editorial — "West Elm meets Apple"
 * Ivory backgrounds, brass gold accents, near-black text
 * Mission-driven story: saw family/community fall prey to scams
 * Business model: Blog → E-book → Self-paced course
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
  { icon: Heart, title: "Genuine Care", desc: "This started because people we love were being targeted. That personal stake drives everything we create." },
  { icon: Target, title: "Practical Focus", desc: "We skip the theory and get to what actually helps. Every article, every resource is built for real-world use." },
  { icon: Lightbulb, title: "Plain Language", desc: "No jargon. No acronyms without explanation. We write like humans, because our readers are humans." },
  { icon: Shield, title: "Integrity Always", desc: "We recommend what's right for you, not what sells. Trust is the foundation of everything we do." },
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
                  Nick has worked in cybersecurity since 2019, helping businesses and individuals protect their systems and data. Over time, a clear pattern became impossible to ignore. The industry focused almost entirely on enterprises, while everyday people were increasingly vulnerable. With expertise in social engineering defense, cyber defense and perimeter-less security, Nick saw the need to make cybersecurity practical and accessible. And so Bright Path Cyber was born.
                </p>
                <p>
                  Meanwhile, the personal risks were getting higher. We saw people in our families and communities fall victim to scams and struggle with confusing privacy settings. These were smart, capable individuals, targeted simply because no one had ever shown them what to watch for.
                </p>
                <p>
                  <strong className="font-semibold" style={{ color: "#1A1A1A" }}>Bright Path Cyber</strong> exists to bridge that gap. Taking the knowledge often locked inside IT departments and making it accessible to everyone. Through our blog, e-book, and upcoming self-paced course, we share practical steps that truly make a difference.
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
                  To teach cybersecurity in a way that real people can actually use — through free blog content, practical resources, and self-paced education. We want to be the trusted voice that keeps you informed and helps you protect yourself online.
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
                  A world where nobody has to feel anxious, confused, or vulnerable online. We believe that with the right education — delivered plainly and honestly — anyone can navigate the digital world with confidence. We're building that resource one article, one guide, and one reader at a time.
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
              Bright Path Cyber is a family-led project built on personal experience and genuine care.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
            {[
              {
                name: "Nick McMillon",
                title: "Co-Founder",
                bio: "Nick is the technical mind behind Bright Path Cyber. With years of experience in cybersecurity, he specializes in areas like social engineering defense, cyber defense, and perimeterless security. Along the way, he noticed a growing disconnect — the industry was focused on protecting companies while everyday people were facing increasing digital risks. Bright Path Cyber was created to bridge that gap by turning complex security concepts into clear, practical guidance anyone can use.",
                initials: "NM",
              },
              {
                name: "Mandie McMillon",
                title: "Co-Founder",
                bio: "Mandie brings a sharp creative eye and a talent for visual storytelling to Bright Path Cyber. As a partner in vision and a trusted sounding board, she helps shape the brand's voice and direction — making sure everything we put out into the world feels warm, clear, and genuinely connects with the people who need it most.",
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
              Want to learn more?
            </h2>
            <p className="font-body text-lg mb-8 text-warm-gray">
              Start with the blog — it's free, practical, and written for real people.
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
