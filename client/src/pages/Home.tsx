/*
 * Home Page — McMillon Co.
 * Design: Pacific Northwest Professional
 * Left-anchored editorial layout, Fraunces display, DM Sans body
 * Sections: Hero, Division Cards, Value Proposition, Trust Indicators, CTA
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Shield, Rocket, CheckCircle, ArrowRight, Star, Users, BookOpen, Award } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663415118379/JXjpt8aqftuhQ9n25h55pn/mcmillon-hero-FFYtHC82fSSjaDdabACeSY.webp";
const CLEARPATH_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663415118379/JXjpt8aqftuhQ9n25h55pn/clearpath-hero-73twxQ26uz5nsRzHqpHNR6.webp";
const LAUNCHPAD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663415118379/JXjpt8aqftuhQ9n25h55pn/launchpad-hero-W2ysA8eRndS26sqzTxe2Be.webp";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
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
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const trustIndicators = [
  { icon: Users, label: "Community-Focused", desc: "Serving Kent, WA and the greater Pacific Northwest" },
  { icon: Shield, label: "Trusted Guidance", desc: "Plain-language expertise you can actually use" },
  { icon: BookOpen, label: "Education-First", desc: "We teach, not just tell — empowering lasting change" },
  { icon: Award, label: "Results-Driven", desc: "Practical outcomes measured in real confidence" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-warm-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMG}
            alt="McMillon Co. consulting office"
            className="w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(105deg, oklch(0.22 0.06 255 / 0.88) 0%, oklch(0.22 0.06 255 / 0.70) 50%, oklch(0.22 0.06 255 / 0.30) 100%)",
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-20">
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold font-body uppercase tracking-widest mb-6"
              style={{ backgroundColor: "oklch(0.58 0.12 185 / 0.25)", color: "oklch(0.85 0.08 185)", border: "1px solid oklch(0.58 0.12 185 / 0.4)" }}
            >
              <MapPin size={11} />
              Kent, Washington
            </div>

            <h1
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] text-white mb-6"
              style={{ animationDelay: "0ms" }}
            >
              Guidance you
              <br />
              <em className="not-italic" style={{ color: "oklch(0.72 0.10 185)" }}>can trust.</em>
            </h1>

            <p className="text-lg sm:text-xl font-body leading-relaxed mb-8" style={{ color: "oklch(0.85 0.02 255)" }}>
              McMillon Co. is a consulting firm built on the belief that everyone deserves clear, honest guidance — whether you're protecting your digital life or building your financial future.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/about">
                <button
                  className="px-7 py-3.5 rounded-lg font-semibold font-body text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg"
                  style={{ backgroundColor: "oklch(0.58 0.12 185)" }}
                >
                  Our Story
                </button>
              </Link>
              <Link href="/contact">
                <button
                  className="px-7 py-3.5 rounded-lg font-semibold font-body transition-all duration-200 hover:bg-white/20"
                  style={{ color: "white", border: "1.5px solid oklch(1 0 0 / 0.4)" }}
                >
                  Book a Consultation
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5">
          <div className="w-px h-10 animate-pulse" style={{ background: "linear-gradient(to bottom, oklch(0.72 0.10 185), transparent)" }} />
        </div>
      </section>

      {/* Division Cards */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <RevealSection className="mb-14">
            <div className="teal-bar mb-4" />
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-navy mb-4" style={{ color: "oklch(0.22 0.06 255)" }}>
              Two Divisions.<br />One Mission.
            </h2>
            <p className="text-lg font-body max-w-xl" style={{ color: "oklch(0.45 0.03 255)" }}>
              McMillon Co. operates two specialized divisions, each designed to serve a specific community with focused expertise and genuine care.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* ClearPath Cyber Card */}
            <RevealSection delay={100}>
              <Link href="/clearpath-cyber">
                <div
                  className="group relative overflow-hidden rounded-2xl card-lift cursor-pointer"
                  style={{ backgroundColor: "white", border: "1px solid oklch(0.88 0.01 255)" }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={CLEARPATH_IMG}
                      alt="ClearPath Cyber — senior cybersecurity"
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, oklch(0.35 0.10 185 / 0.7))" }} />
                    <div className="absolute bottom-4 left-4">
                      <span className="division-badge division-badge-cyber">
                        <Shield size={11} />
                        Senior Cyber Safety
                      </span>
                    </div>
                  </div>
                  <div className="p-7">
                    <h3 className="font-display text-2xl font-semibold mb-2" style={{ color: "oklch(0.22 0.06 255)" }}>
                      ClearPath Cyber
                    </h3>
                    <p className="font-body text-sm leading-relaxed mb-5" style={{ color: "oklch(0.45 0.03 255)" }}>
                      Jargon-free cybersecurity and privacy guidance for seniors. We help older adults navigate the digital world safely — without the tech overwhelm.
                    </p>
                    <ul className="space-y-2 mb-6">
                      {["Scam awareness & prevention", "Password & account security", "\"Click with Confidence\" e-book ($27)", "1-on-1 coaching sessions"].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm font-body" style={{ color: "oklch(0.40 0.03 255)" }}>
                          <CheckCircle size={14} style={{ color: "oklch(0.58 0.12 185)" }} className="flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-1.5 font-semibold font-body text-sm group-hover:gap-3 transition-all" style={{ color: "oklch(0.50 0.12 185)" }}>
                      Explore ClearPath Cyber
                      <ArrowRight size={15} />
                    </div>
                  </div>
                </div>
              </Link>
            </RevealSection>

            {/* Launchpad Money Card */}
            <RevealSection delay={200}>
              <Link href="/launchpad-money">
                <div
                  className="group relative overflow-hidden rounded-2xl card-lift cursor-pointer"
                  style={{ backgroundColor: "white", border: "1px solid oklch(0.88 0.01 255)" }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={LAUNCHPAD_IMG}
                      alt="Launchpad Money — youth financial education"
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, oklch(0.50 0.14 75 / 0.7))" }} />
                    <div className="absolute bottom-4 left-4">
                      <span className="division-badge division-badge-money">
                        <Rocket size={11} />
                        Youth Financial Education
                      </span>
                    </div>
                  </div>
                  <div className="p-7">
                    <h3 className="font-display text-2xl font-semibold mb-2" style={{ color: "oklch(0.22 0.06 255)" }}>
                      Launchpad Money
                    </h3>
                    <p className="font-body text-sm leading-relaxed mb-5" style={{ color: "oklch(0.45 0.03 255)" }}>
                      Energetic, empowering financial education for high schoolers and young adults. Real money skills for real life — taught in a way that actually sticks.
                    </p>
                    <ul className="space-y-2 mb-6">
                      {["Budgeting & saving fundamentals", "Credit & debt education", "Investing basics for beginners", "School & parent partnerships"].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm font-body" style={{ color: "oklch(0.40 0.03 255)" }}>
                          <CheckCircle size={14} style={{ color: "oklch(0.75 0.16 75)" }} className="flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-1.5 font-semibold font-body text-sm group-hover:gap-3 transition-all" style={{ color: "oklch(0.55 0.14 75)" }}>
                      Explore Launchpad Money
                      <ArrowRight size={15} />
                    </div>
                  </div>
                </div>
              </Link>
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
              <p className="font-body text-lg leading-relaxed mb-6" style={{ color: "oklch(0.78 0.03 255)" }}>
                We started McMillon Co. because we saw two groups of people being left behind: seniors overwhelmed by digital threats they couldn't name, and young people entering adulthood without the financial foundation they deserved.
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
                  <div
                    className="p-6 rounded-xl"
                    style={{ backgroundColor: "oklch(0.30 0.07 255)" }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                      style={{ backgroundColor: "oklch(0.58 0.12 185 / 0.2)" }}
                    >
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

      {/* Testimonial / Social Proof */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.95 0.008 80)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <RevealSection className="text-center mb-12">
            <h2 className="font-display text-3xl font-semibold mb-3" style={{ color: "oklch(0.22 0.06 255)" }}>
              Real People. Real Results.
            </h2>
            <p className="font-body" style={{ color: "oklch(0.45 0.03 255)" }}>
              What our community is saying about McMillon Co.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "I finally feel like I understand what to look out for online. ClearPath Cyber explained everything in a way that actually made sense to me.",
                name: "Margaret T.",
                role: "ClearPath Cyber client, age 74",
                stars: 5,
                color: "oklch(0.94 0.04 185)",
              },
              {
                quote: "My daughter came home from the Launchpad Money workshop and immediately started a savings plan. I couldn't believe the change in her attitude about money.",
                name: "David R.",
                role: "Parent of Launchpad Money student",
                stars: 5,
                color: "oklch(0.96 0.05 75)",
              },
              {
                quote: "Nick and Mandie are the real deal. They genuinely care about the people they work with, and it shows in everything they do.",
                name: "Carol S.",
                role: "ClearPath Cyber client, age 68",
                stars: 5,
                color: "oklch(0.94 0.04 185)",
              },
            ].map((testimonial, i) => (
              <RevealSection key={i} delay={i * 120}>
                <div
                  className="p-7 rounded-2xl h-full flex flex-col"
                  style={{ backgroundColor: "white", border: "1px solid oklch(0.88 0.01 255)" }}
                >
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: testimonial.stars }).map((_, j) => (
                      <Star key={j} size={14} fill="oklch(0.75 0.16 75)" style={{ color: "oklch(0.75 0.16 75)" }} />
                    ))}
                  </div>
                  <p className="font-body text-sm leading-relaxed flex-1 mb-5 italic" style={{ color: "oklch(0.40 0.03 255)" }}>
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold font-body"
                      style={{ backgroundColor: testimonial.color, color: "oklch(0.35 0.08 185)" }}
                    >
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold font-body text-sm" style={{ color: "oklch(0.22 0.06 255)" }}>
                        {testimonial.name}
                      </div>
                      <div className="text-xs font-body" style={{ color: "oklch(0.55 0.03 255)" }}>
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <RevealSection>
            <div
              className="rounded-2xl p-10 sm:p-14 text-center"
              style={{ backgroundColor: "oklch(0.22 0.06 255)" }}
            >
              <div className="teal-bar mx-auto mb-5" style={{ backgroundColor: "oklch(0.58 0.12 185)" }} />
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white mb-4">
                Ready to take the next step?
              </h2>
              <p className="font-body text-lg mb-8 max-w-xl mx-auto" style={{ color: "oklch(0.78 0.03 255)" }}>
                Whether you're a senior looking for digital peace of mind or a parent wanting financial education for your teen — we're here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/clearpath-cyber">
                  <button
                    className="px-7 py-3.5 rounded-lg font-semibold font-body text-sm transition-all hover:opacity-90"
                    style={{ backgroundColor: "oklch(0.58 0.12 185)", color: "white" }}
                  >
                    <span className="flex items-center gap-2"><Shield size={15} /> ClearPath Cyber</span>
                  </button>
                </Link>
                <Link href="/launchpad-money">
                  <button
                    className="px-7 py-3.5 rounded-lg font-semibold font-body text-sm transition-all hover:opacity-90"
                    style={{ backgroundColor: "oklch(0.75 0.16 75)", color: "white" }}
                  >
                    <span className="flex items-center gap-2"><Rocket size={15} /> Launchpad Money</span>
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
