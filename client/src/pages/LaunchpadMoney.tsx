/*
 * Launchpad Money Page — McMillon Co.
 * Design: Pacific Northwest Professional — Amber-gold energy
 * Services, coaching programs, courses, school/parent partnerships, CTA
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  Rocket, CheckCircle, ArrowRight, TrendingUp, CreditCard,
  PiggyBank, GraduationCap, Users, BookOpen, Star, ChevronRight, DollarSign
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const LAUNCHPAD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663415118379/JXjpt8aqftuhQ9n25h55pn/launchpad-hero-W2ysA8eRndS26sqzTxe2Be.webp";

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
  { icon: PiggyBank, title: "Budgeting & Saving", desc: "Learn to build a budget that actually works — not just a spreadsheet, but a system you'll stick to. We cover income tracking, expense categories, and building an emergency fund from scratch." },
  { icon: CreditCard, title: "Credit & Debt Education", desc: "Understand how credit scores work, how to build credit responsibly, and how to avoid the debt traps that derail so many young adults in their first years of financial independence." },
  { icon: TrendingUp, title: "Investing Basics", desc: "Demystify the stock market, retirement accounts, and compound interest. We make investing approachable for complete beginners — because starting early is the biggest advantage you have." },
  { icon: DollarSign, title: "Income & Career Money Skills", desc: "From understanding your first paycheck to negotiating a raise — we cover the money skills that school never taught but employers expect you to know." },
  { icon: GraduationCap, title: "College & Student Loan Planning", desc: "Navigate financial aid, scholarships, and student loans with a clear strategy. We help students and families make informed decisions before signing anything." },
  { icon: Users, title: "Group Workshops", desc: "High-energy, interactive workshops for classrooms, youth groups, and community organizations. Designed to engage teens and young adults where they are." },
];

const programs = [
  {
    name: "Money Launchpad",
    subtitle: "Foundations Course",
    desc: "A 6-week self-paced course covering all the fundamentals — budgeting, saving, credit, and investing basics. Perfect for high schoolers and college freshmen.",
    price: "Coming Soon",
    features: ["6 video modules", "Workbook & exercises", "Real-world scenarios", "Lifetime access"],
    highlight: false,
    accent: "oklch(0.96 0.05 75)",
    accentBorder: "oklch(0.88 0.10 75)",
  },
  {
    name: "1-on-1 Coaching",
    subtitle: "Personalized Sessions",
    desc: "Work directly with Mandie McMillon on your specific financial situation — whether you're a teen setting up your first budget or a young adult tackling student loans.",
    price: "From $65/hr",
    features: ["Personalized financial plan", "Accountability check-ins", "Goal setting & tracking", "Flexible scheduling"],
    highlight: true,
    accent: "oklch(0.75 0.16 75)",
    accentBorder: "oklch(0.65 0.16 75)",
  },
  {
    name: "Family Package",
    subtitle: "Parent + Teen Together",
    desc: "A structured program for parents and teens to build financial literacy together — because the money conversations at home matter as much as any classroom lesson.",
    price: "From $120/session",
    features: ["Joint parent-teen sessions", "Family budget workshop", "Communication tools", "Resource library"],
    highlight: false,
    accent: "oklch(0.96 0.05 75)",
    accentBorder: "oklch(0.88 0.10 75)",
  },
];

const topics = [
  "How to build a budget in 30 minutes",
  "What a credit score actually is (and how to build one)",
  "The difference between a Roth IRA and a 401(k)",
  "How to negotiate your first salary",
  "What to do with your first paycheck",
  "Understanding student loans before you sign",
  "How compound interest works — and why it matters now",
  "Emergency funds: how much, where, and why",
];

export default function LaunchpadMoney() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
      <Navigation />

      {/* Hero */}
      <section className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={LAUNCHPAD_IMG} alt="Launchpad Money" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, oklch(0.35 0.12 60 / 0.90) 0%, oklch(0.35 0.12 60 / 0.72) 50%, oklch(0.35 0.12 60 / 0.30) 100%)" }} />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-24 lg:py-32">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-5">
              <span className="division-badge" style={{ backgroundColor: "oklch(0.75 0.16 75 / 0.25)", color: "oklch(0.95 0.08 75)", border: "1px solid oklch(0.75 0.16 75 / 0.5)" }}>
                <Rocket size={11} /> A McMillon Co. Division
              </span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-tight mb-5">
              Launchpad<br />
              <em className="not-italic" style={{ color: "oklch(0.88 0.14 75)" }}>Money</em>
            </h1>
            <p className="font-body text-xl leading-relaxed mb-3" style={{ color: "oklch(0.95 0.05 75)" }}>
              Financial education for high schoolers and young adults.
            </p>
            <p className="font-body text-base leading-relaxed mb-8" style={{ color: "oklch(0.85 0.05 75)" }}>
              Real money skills for real life — taught in a way that actually sticks. No boring lectures. No textbook jargon. Just practical knowledge that empowers young people to take control of their financial future.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact">
                <button className="px-7 py-3.5 rounded-lg font-semibold font-body text-sm text-white transition-all hover:opacity-90" style={{ backgroundColor: "oklch(0.65 0.16 75)" }}>
                  Get Started Today
                </button>
              </Link>
              <a href="#programs">
                <button className="px-7 py-3.5 rounded-lg font-semibold font-body text-sm transition-all hover:bg-white/20" style={{ color: "white", border: "1.5px solid oklch(1 0 0 / 0.4)" }}>
                  View Programs
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <div className="w-12 h-0.5 mb-5" style={{ backgroundColor: "oklch(0.75 0.16 75)" }} />
              <h2 className="font-display text-4xl font-semibold mb-5" style={{ color: "oklch(0.22 0.06 255)" }}>
                The Money Talk<br />Schools Skip
              </h2>
              <p className="font-body text-lg leading-relaxed mb-4" style={{ color: "oklch(0.40 0.03 255)" }}>
                Most young people leave high school without ever learning how to build a budget, understand a credit score, or open an investment account. That's not a character flaw — it's a gap in the system.
              </p>
              <p className="font-body text-base leading-relaxed mb-4" style={{ color: "oklch(0.45 0.03 255)" }}>
                Launchpad Money fills that gap. We meet teens and young adults where they are — energetic, curious, and ready to learn when the material actually connects to their lives.
              </p>
              <p className="font-body text-base leading-relaxed" style={{ color: "oklch(0.45 0.03 255)" }}>
                Our approach is practical, engaging, and judgment-free. Whether a student is starting from zero or just wants to level up, we have a path for them.
              </p>
            </RevealSection>

            <RevealSection delay={150}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { stat: "78%", label: "of teens say they wish they'd learned more about money in school" },
                  { stat: "$1.7T", label: "in student loan debt — much of it from uninformed decisions" },
                  { stat: "1 in 3", label: "young adults have no emergency savings at all" },
                  { stat: "Age 22", label: "is the average age when financial regret begins — we start earlier" },
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-xl" style={{ backgroundColor: i % 2 === 0 ? "oklch(0.96 0.05 75)" : "oklch(0.22 0.06 255)" }}>
                    <div className="font-display text-3xl font-bold mb-1" style={{ color: i % 2 === 0 ? "oklch(0.50 0.14 75)" : "oklch(0.88 0.14 75)" }}>
                      {item.stat}
                    </div>
                    <p className="font-body text-xs leading-relaxed" style={{ color: i % 2 === 0 ? "oklch(0.45 0.08 75)" : "oklch(0.72 0.03 255)" }}>
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.95 0.008 80)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <RevealSection className="mb-12">
            <div className="w-12 h-0.5 mb-4" style={{ backgroundColor: "oklch(0.75 0.16 75)" }} />
            <h2 className="font-display text-4xl font-semibold" style={{ color: "oklch(0.22 0.06 255)" }}>
              What We Teach
            </h2>
            <p className="font-body mt-3 max-w-xl" style={{ color: "oklch(0.45 0.03 255)" }}>
              Every topic is taught with real examples, relatable scenarios, and zero condescension.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <RevealSection key={service.title} delay={i * 80}>
                <div className="p-7 rounded-xl h-full" style={{ backgroundColor: "white", border: "1px solid oklch(0.88 0.01 255)" }}>
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: "oklch(0.96 0.05 75)" }}>
                    <service.icon size={20} style={{ color: "oklch(0.55 0.14 75)" }} />
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

      {/* Programs */}
      <section id="programs" className="py-24" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <RevealSection className="mb-12">
            <div className="w-12 h-0.5 mb-4" style={{ backgroundColor: "oklch(0.75 0.16 75)" }} />
            <h2 className="font-display text-4xl font-semibold" style={{ color: "oklch(0.22 0.06 255)" }}>
              Programs & Coaching
            </h2>
            <p className="font-body mt-3 max-w-xl" style={{ color: "oklch(0.45 0.03 255)" }}>
              Choose the format that fits your life.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programs.map((program, i) => (
              <RevealSection key={program.name} delay={i * 100}>
                <div
                  className="p-8 rounded-2xl h-full flex flex-col"
                  style={{
                    backgroundColor: program.highlight ? "oklch(0.22 0.06 255)" : "white",
                    border: program.highlight ? "2px solid oklch(0.75 0.16 75)" : "1px solid oklch(0.88 0.01 255)",
                  }}
                >
                  {program.highlight && (
                    <span className="text-xs font-semibold font-body px-2.5 py-1 rounded-full mb-4 self-start" style={{ backgroundColor: "oklch(0.75 0.16 75)", color: "white" }}>
                      Most Popular
                    </span>
                  )}
                  <h3 className="font-display text-xl font-semibold mb-0.5" style={{ color: program.highlight ? "white" : "oklch(0.22 0.06 255)" }}>
                    {program.name}
                  </h3>
                  <p className="font-body text-xs mb-3" style={{ color: program.highlight ? "oklch(0.75 0.16 75)" : "oklch(0.55 0.03 255)" }}>
                    {program.subtitle}
                  </p>
                  <p className="font-body text-sm leading-relaxed mb-5 flex-1" style={{ color: program.highlight ? "oklch(0.78 0.03 255)" : "oklch(0.45 0.03 255)" }}>
                    {program.desc}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {program.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm font-body" style={{ color: program.highlight ? "oklch(0.85 0.03 255)" : "oklch(0.40 0.03 255)" }}>
                        <CheckCircle size={13} style={{ color: program.highlight ? "oklch(0.75 0.16 75)" : "oklch(0.65 0.14 75)" }} className="flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <div className="font-display text-2xl font-bold mb-3" style={{ color: program.highlight ? "oklch(0.88 0.14 75)" : "oklch(0.22 0.06 255)" }}>
                      {program.price}
                    </div>
                    <Link href="/contact">
                      <button
                        className="w-full py-2.5 rounded-lg font-semibold font-body text-sm transition-all hover:opacity-90"
                        style={
                          program.highlight
                            ? { backgroundColor: "oklch(0.75 0.16 75)", color: "white" }
                            : program.price === "Coming Soon"
                            ? { backgroundColor: "oklch(0.92 0.01 255)", color: "oklch(0.55 0.03 255)", cursor: "default" }
                            : { backgroundColor: "oklch(0.96 0.05 75)", color: "oklch(0.45 0.12 75)" }
                        }
                        disabled={program.price === "Coming Soon"}
                      >
                        {program.price === "Coming Soon" ? "Notify Me" : "Get Started"}
                        {program.price !== "Coming Soon" && <ChevronRight size={13} className="inline ml-1" />}
                      </button>
                    </Link>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* School & Parent Partnerships */}
      <section id="schools" className="py-24" style={{ backgroundColor: "oklch(0.22 0.06 255)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <div className="w-12 h-0.5 mb-5" style={{ backgroundColor: "oklch(0.75 0.16 75)" }} />
              <h2 className="font-display text-4xl font-semibold text-white mb-5">
                School & Parent<br />Partnerships
              </h2>
              <p className="font-body text-lg leading-relaxed mb-4" style={{ color: "oklch(0.78 0.03 255)" }}>
                We partner with schools, youth organizations, and community groups to bring financial literacy education directly to students — in classrooms, after-school programs, and community events.
              </p>
              <p className="font-body text-base leading-relaxed mb-8" style={{ color: "oklch(0.65 0.03 255)" }}>
                Our workshops are designed to complement existing curriculum, not compete with it. We bring energy, real-world relevance, and a format that keeps students engaged.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "Custom workshop design for your student population",
                  "In-person and virtual delivery options",
                  "Parent information sessions available",
                  "Flexible scheduling around the school calendar",
                  "Follow-up resources for students and families",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle size={15} style={{ color: "oklch(0.75 0.16 75)" }} className="flex-shrink-0 mt-0.5" />
                    <span className="font-body text-sm" style={{ color: "oklch(0.78 0.03 255)" }}>{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact">
                <button
                  className="flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold font-body text-sm text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: "oklch(0.65 0.16 75)" }}
                >
                  Inquire About Partnerships
                  <ArrowRight size={15} />
                </button>
              </Link>
            </RevealSection>

            <RevealSection delay={150}>
              <div className="space-y-3">
                <h3 className="font-display text-xl font-semibold text-white mb-5">Topics We Cover in Schools</h3>
                {topics.map((topic, i) => (
                  <div
                    key={topic}
                    className="flex items-center gap-3 p-4 rounded-lg"
                    style={{ backgroundColor: "oklch(0.30 0.07 255)" }}
                  >
                    <span className="font-display text-sm font-bold flex-shrink-0" style={{ color: "oklch(0.75 0.16 75)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-body text-sm" style={{ color: "oklch(0.85 0.02 255)" }}>{topic}</span>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.96 0.05 75)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <RevealSection>
            <Rocket size={36} className="mx-auto mb-5" style={{ color: "oklch(0.55 0.14 75)" }} />
            <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-4" style={{ color: "oklch(0.25 0.08 60)" }}>
              Ready to launch your financial future?
            </h2>
            <p className="font-body text-lg mb-8 max-w-xl mx-auto" style={{ color: "oklch(0.40 0.08 60)" }}>
              Whether you're a student, a parent, or a school administrator — we'd love to talk about how Launchpad Money can help.
            </p>
            <Link href="/contact">
              <button
                className="px-8 py-4 rounded-lg font-semibold font-body text-sm text-white transition-all hover:opacity-90"
                style={{ backgroundColor: "oklch(0.55 0.14 75)" }}
              >
                Get in Touch
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
