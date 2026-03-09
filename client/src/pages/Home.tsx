/*
 * Home Page — McMillon Co.
 * Design: Pacific Northwest Professional
 * Left-anchored editorial layout, Fraunces display, DM Sans body
 * Sections: Hero (ClearPath Cyber focus), ClearPath feature, Value Proposition, Testimonials, Coming Soon teaser, CTA
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  Shield, CheckCircle, ArrowRight, Star, Users, BookOpen, Award,
  Lock, Eye, AlertTriangle, Rocket
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663415118379/JXjpt8aqftuhQ9n25h55pn/mcmillon-hero-FFYtHC82fSSjaDdabACeSY.webp";
const CLEARPATH_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663415118379/JXjpt8aqftuhQ9n25h55pn/clearpath-hero-73twxQ26uz5nsRzHqpHNR6.webp";

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
  { icon: AlertTriangle, title: "Scam Awareness", desc: "Learn to recognize the latest scams targeting seniors — before they reach you." },
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
            alt="McMillon Co. consulting"
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
              McMillon Co. helps seniors 60+ navigate the digital world safely — with clear, jargon-free guidance from people who genuinely care.
            </p>
            <p className="text-base font-body leading-relaxed mb-8" style={{ color: "oklch(0.72 0.03 255)" }}>
              Through our <strong className="font-semibold text-white">ClearPath Cyber</strong> division, we offer cybersecurity coaching, scam prevention, and privacy education designed specifically for older adults.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/clearpath-cyber">
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

      {/* ClearPath Cyber Feature Section */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <RevealSection>
              <div className="teal-bar mb-5" />
              <div className="flex items-center gap-2 mb-3">
                <span className="division-badge division-badge-cyber">
                  <Shield size={11} /> ClearPath Cyber
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold mb-5 leading-tight" style={{ color: "oklch(0.22 0.06 255)" }}>
                Digital safety,<br />
                <em className="not-italic" style={{ color: "oklch(0.50 0.12 185)" }}>made clear.</em>
              </h2>
              <p className="font-body text-lg leading-relaxed mb-4" style={{ color: "oklch(0.40 0.03 255)" }}>
                Scammers specifically target older adults — and the threats are more sophisticated than ever. ClearPath Cyber gives seniors the knowledge and confidence to protect themselves online, without needing to become a tech expert.
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
              <Link href="/clearpath-cyber">
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
                  src={CLEARPATH_IMG}
                  alt="ClearPath Cyber — senior cybersecurity coaching"
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
                          The senior's guide to staying safe online — $27
                        </div>
                      </div>
                      <Link href="/clearpath-cyber">
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
                Why McMillon Co.?
              </h2>
              <p className="font-body text-lg leading-relaxed mb-5" style={{ color: "oklch(0.78 0.03 255)" }}>
                We started McMillon Co. because we saw seniors being left behind — overwhelmed by digital threats they couldn't name, targeted by scammers who knew exactly how to exploit that uncertainty.
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

      {/* Testimonials */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.95 0.008 80)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <RevealSection className="text-center mb-12">
            <h2 className="font-display text-3xl font-semibold mb-3" style={{ color: "oklch(0.22 0.06 255)" }}>
              Real People. Real Results.
            </h2>
            <p className="font-body" style={{ color: "oklch(0.45 0.03 255)" }}>
              What our community is saying about ClearPath Cyber.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "I finally feel like I understand what to look out for online. ClearPath Cyber explained everything in a way that actually made sense to me.",
                name: "Margaret T.",
                role: "ClearPath Cyber client, age 74",
              },
              {
                quote: "After being targeted by a phone scam, I was scared to use my computer at all. Nick helped me get my confidence back — and now I know exactly what to watch for.",
                name: "Robert K.",
                role: "ClearPath Cyber client, age 71",
              },
              {
                quote: "Nick and Mandie are the real deal. They genuinely care about the people they work with, and it shows in everything they do.",
                name: "Carol S.",
                role: "ClearPath Cyber client, age 68",
              },
            ].map((testimonial, i) => (
              <RevealSection key={i} delay={i * 120}>
                <div className="p-7 rounded-2xl h-full flex flex-col" style={{ backgroundColor: "white", border: "1px solid oklch(0.88 0.01 255)" }}>
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={14} fill="oklch(0.75 0.16 75)" style={{ color: "oklch(0.75 0.16 75)" }} />
                    ))}
                  </div>
                  <p className="font-body text-sm leading-relaxed flex-1 mb-5 italic" style={{ color: "oklch(0.40 0.03 255)" }}>
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold font-body" style={{ backgroundColor: "oklch(0.94 0.04 185)", color: "oklch(0.35 0.08 185)" }}>
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold font-body text-sm" style={{ color: "oklch(0.22 0.06 255)" }}>{testimonial.name}</div>
                      <div className="text-xs font-body" style={{ color: "oklch(0.55 0.03 255)" }}>{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon — Launchpad Money Teaser */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <RevealSection>
            <div
              className="rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6"
              style={{ backgroundColor: "oklch(0.96 0.04 75 / 0.5)", border: "1.5px dashed oklch(0.80 0.10 75)" }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "oklch(0.96 0.05 75)" }}>
                <Rocket size={22} style={{ color: "oklch(0.55 0.14 75)" }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-semibold font-body px-2.5 py-0.5 rounded-full uppercase tracking-wide" style={{ backgroundColor: "oklch(0.88 0.10 75)", color: "oklch(0.40 0.12 75)" }}>
                    Coming Soon
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold mb-1.5" style={{ color: "oklch(0.28 0.08 60)" }}>
                  Launchpad Money — Financial Education for the Next Generation
                </h3>
                <p className="font-body text-sm" style={{ color: "oklch(0.45 0.08 60)" }}>
                  McMillon Co. is developing a youth financial literacy division for high schoolers and young adults. Stay tuned — or{" "}
                  <Link href="/contact">
                    <span className="font-semibold underline underline-offset-2 cursor-pointer transition-opacity hover:opacity-70" style={{ color: "oklch(0.50 0.14 75)" }}>
                      reach out
                    </span>
                  </Link>{" "}
                  if you'd like to be notified when it launches.
                </p>
              </div>
            </div>
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
                Book a free consultation with ClearPath Cyber and take the first step toward digital confidence — on your terms, at your pace.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/clearpath-cyber">
                  <button
                    className="px-7 py-3.5 rounded-lg font-semibold font-body text-sm transition-all hover:opacity-90"
                    style={{ backgroundColor: "oklch(0.58 0.12 185)", color: "white" }}
                  >
                    <span className="flex items-center gap-2"><Shield size={15} /> Explore ClearPath Cyber</span>
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
