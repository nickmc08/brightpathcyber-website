/*
 * Blog Page — Bright Path Cyber
 * Design: Pacific Northwest Professional
 * 4 blog posts: scams, website safety, passwords, all Bright Path Cyber
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Shield, Clock, ArrowRight, ChevronLeft } from "lucide-react";
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
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

const posts = [
  {
    id: "scams-targeting-seniors",
    title: "5 Scams Targeting Everyday People Right Now (And How to Spot Them)",
    excerpt: "Scammers are sophisticated, organized, and ruthless — and they target anyone, regardless of age. Here's what's circulating right now and exactly how to recognize it.",
    division: "Bright Path Cyber",
    divisionColor: "cyber",
    date: "February 28, 2026",
    readTime: "7 min read",
    icon: Shield,
    content: `
Every year, Americans lose billions of dollars to fraud. Not because they're naive — but because today's scammers are sophisticated, organized, and specifically trained to exploit trust. The good news? Once you know what to look for, these scams become much easier to spot.

Here are five of the most common scams targeting everyday people right now, along with exactly how to recognize and avoid them.

## 1. The Grandparent Scam

You get a frantic call. Someone who sounds like your grandchild — or claims to be them — is in trouble. They've been in a car accident, they're in jail, they need money immediately. They beg you not to tell their parents. A "lawyer" or "police officer" gets on the phone to confirm the story and explain how to wire money or buy gift cards.

**How to spot it:** The urgency is artificial. Real emergencies don't require gift cards. Before doing anything, hang up and call your grandchild directly on a number you already have. If they're fine, you've confirmed it's a scam. If you can't reach them, call another family member.

**What scammers count on:** Your love for your family and your instinct to help immediately.

## 2. The Government Impersonation Scam

A caller claims to be from the IRS, Social Security Administration, or Medicare. They say your account has been compromised, you owe back taxes, or your benefits are at risk. They ask you to confirm your Social Security number, bank account information, or make an immediate payment to "protect" your account.

**How to spot it:** Government agencies never call you out of the blue to demand personal information or payment. They communicate primarily by mail. If you receive this call, hang up. You can call the real agency directly using the number on their official website.

**What scammers count on:** Fear of legal trouble and the authority that comes with a government name.

## 3. The Tech Support Scam

A pop-up appears on your computer warning that your device has been infected with a virus. It displays a phone number to call immediately. When you call, a "technician" asks for remote access to your computer to "fix" the problem — and uses that access to steal your files, passwords, or install actual malware.

**How to spot it:** Legitimate tech companies like Microsoft and Apple do not send unsolicited pop-ups with phone numbers. If you see one, don't call the number. Close the browser window (or restart your computer if needed). If you're concerned about your device, take it to a trusted local repair shop.

**What scammers count on:** The fear of losing your computer or your data.

## 4. The Romance Scam

This one is particularly painful because it involves genuine emotional connection. A stranger contacts you online — through social media, a dating site, or even email. They're warm, attentive, and seem genuinely interested in you. Over weeks or months, a relationship develops. Then, just before you were supposed to meet in person, a crisis strikes. They need money for a plane ticket, a medical emergency, or to get out of a difficult situation.

**How to spot it:** Anyone who builds an online relationship but can never meet in person — and eventually asks for money — is almost certainly a scammer. Run their profile photo through a reverse image search (Google Images). If the photo appears under a different name, it's stolen.

**What scammers count on:** Loneliness, genuine connection, and the reluctance to believe someone you care about is lying.

## 5. The Lottery or Prize Scam

You receive a letter, email, or call telling you that you've won a lottery, sweepstakes, or prize. To claim it, you just need to pay a small fee — taxes, processing, or shipping. Once you pay, the prize never arrives, and the scammers disappear.

**How to spot it:** You cannot win a contest you didn't enter. Legitimate prizes never require you to pay fees upfront. If it sounds too good to be true, it is.

**What scammers count on:** Excitement and the sunk-cost feeling of "I've already paid, I might as well see it through."

---

## The Most Important Rule

When in doubt, **slow down**. Scammers create artificial urgency because they know that if you have time to think — or talk to someone you trust — you'll see through the scheme. Hang up. Call someone. Look it up. You have every right to take your time.

If you think you've been targeted by a scam, report it to the FTC at reportfraud.ftc.gov and to your local police department. And if you'd like personalized guidance on protecting yourself online, Bright Path Cyber is here to help.
    `.trim(),
  },
  {
    id: "is-this-website-safe",
    title: "How to Tell If a Website Is Safe Before You Enter Your Information",
    excerpt: "Before you type your name, email, or credit card number into any website, there are a few quick checks that can tell you a lot about whether it's trustworthy — or not.",
    division: "Bright Path Cyber",
    divisionColor: "cyber",
    date: "March 7, 2026",
    readTime: "6 min read",
    icon: Shield,
    content: `
Every day, people enter personal information into websites without thinking twice. Your name, your address, your credit card number, your Social Security number. And most of the time, that's fine — the site is legitimate, the connection is secure, and nothing bad happens.

But sometimes it's not fine. Fake websites, phishing pages, and lookalike sites are designed specifically to trick you into handing over your information. The good news is that a few simple checks can tell you a lot about whether a site is trustworthy — before you type a single character.

## Check for HTTPS — But Don't Stop There

You've probably heard that you should look for the padlock icon in your browser's address bar. That padlock means the connection between your browser and the website is encrypted — which is a good thing. It means your information can't be intercepted in transit.

But here's what a lot of people don't realize: the padlock does not mean the website itself is legitimate. Scammers can — and do — set up fake websites with valid HTTPS certificates. The padlock just means the connection is secure. It says nothing about whether the people running the site are trustworthy.

So yes, check for HTTPS. But don't stop there.

## Look Carefully at the Web Address

The web address (also called the URL) is one of the most reliable ways to spot a fake site — if you know what to look for.

Legitimate websites have clean, recognizable addresses. A scam site might look almost identical but with a small change: an extra letter, a hyphen, or a different ending. For example:

**Real:** www.paypal.com
**Fake:** www.paypa1.com or www.paypal-secure-login.com

Always look at the part of the address just before the first single slash. That's the actual domain. Everything before it is just a subdomain and can say anything. A site at "paypal.fake-login.com" is not a PayPal site — it belongs to fake-login.com.

When in doubt, don't click a link. Instead, type the address directly into your browser, or search for the company and navigate from the official search result.

## Look Up the Company Before You Buy

If you've landed on an unfamiliar shopping site or a business you've never heard of, take two minutes to look them up before entering any payment information.

Search for the company name along with words like "reviews," "scam," or "complaints." Check sites like the Better Business Bureau (bbb.org) or Trustpilot. Look for a physical address and a real phone number on their contact page — and consider calling it.

A legitimate business will have a traceable presence. A scam site often has none.

## Watch for Pressure Tactics and Urgency

Legitimate websites don't pressure you. If a site is flashing countdown timers, warning you that your account will be suspended if you don't act immediately, or offering a deal that expires in the next 10 minutes — slow down.

Urgency is a manipulation tactic. It's designed to short-circuit your judgment and get you to act before you think. Whenever you feel rushed online, that's exactly the moment to pause.

## Check the Privacy Policy and Contact Information

This sounds boring, but it's genuinely useful. A real company will have a privacy policy that explains how they handle your data. They'll have a real contact page with an address, a phone number, or at minimum a working email.

If a site has no contact information, no privacy policy, or only a generic contact form with no other details — that's a red flag.

## When Something Feels Off, Trust That Feeling

This is perhaps the most underrated piece of advice: if something about a website feels wrong, pay attention to that feeling. Maybe the design looks slightly off. Maybe the writing has unusual grammar. Maybe the deal seems too good to be true.

Your instincts are often picking up on real signals, even when you can't articulate exactly what they are. You don't need to be able to explain why something feels suspicious to decide not to enter your information.

The cost of being cautious is low. The cost of ignoring a warning sign can be significant.

---

## A Quick Checklist Before You Enter Your Information

1. Does the address bar show HTTPS and a padlock?
2. Does the web address look exactly right — no extra letters, hyphens, or unfamiliar domains?
3. Have you verified the company through a quick search?
4. Is there real contact information on the site?
5. Does anything feel off?

If you answered no to any of these, take a step back before proceeding. And if you'd like to walk through how to spot unsafe sites on your own devices — that's exactly the kind of thing Bright Path Cyber is here to help with.
    `.trim(),
  },
  {
    id: "password-front-door",
    title: "Why Your Password Is the Front Door to Your Digital Life",
    excerpt: "Most people use the same password for everything. Here's why that's a problem — and a simple system that actually works for real people.",
    division: "Bright Path Cyber",
    divisionColor: "cyber",
    date: "February 21, 2026",
    readTime: "6 min read",
    icon: Shield,
    content: `
Think about the front door of your home. You probably have a good lock on it. You don't leave it propped open. You don't give your key to strangers. And you definitely don't use the same key for your house, your car, your mailbox, and your safe-deposit box.

But that's exactly what most people do with their passwords online.

## The Problem with "One Password for Everything"

It's understandable. Passwords are annoying. There are dozens of them. They have to be long, complicated, and different from your last five. So most people settle on one or two passwords they can remember and use them everywhere.

Here's the risk: when a company gets hacked — and it happens constantly — your username and password get stolen. Criminals then take that combination and automatically try it on hundreds of other websites. Your email. Your bank. Your Amazon account. Your Medicare portal. If you use the same password, they're in.

This is called "credential stuffing," and it's one of the most common ways accounts get compromised. Not because someone guessed your password — but because they got it from a completely different website you forgot you even had an account on.

## What Makes a Strong Password?

Forget the old advice about replacing letters with numbers and symbols (P@$$w0rd is not secure). Modern guidance from security experts is simpler and more effective:

**Length beats complexity.** A password like "correct-horse-battery-staple" is far stronger than "P@$$w0rd1!" because it's longer. Every additional character exponentially increases the difficulty of cracking it.

**Use a passphrase.** Pick three or four random words and string them together. "PurpleTruckMapleSunday" is long, memorable, and genuinely difficult to crack. Add a number or symbol if the site requires it.

**Never use personal information.** Birthdays, pet names, addresses, and family names are the first things a targeted attacker will try.

## The Real Solution: A Password Manager

Here's the honest truth: the best password practice is to use a different, long, random password for every single account — and the only realistic way to do that is with a password manager.

A password manager is an app that stores all your passwords in an encrypted vault. You only need to remember one master password to unlock it. The app generates strong, unique passwords for every site and fills them in automatically.

Popular options include **Bitwarden** (free and excellent), **1Password**, and **LastPass**. Many are available on your phone, tablet, and computer.

If a password manager feels like too big a step right now, start with this: at minimum, use a unique, strong password for your email account and your bank. Those two are the most critical. If someone gets into your email, they can reset every other password you have.

## Two-Factor Authentication: The Deadbolt

Even the best password can be stolen. Two-factor authentication (2FA) is your second line of defense — the deadbolt on your digital front door.

When 2FA is enabled, logging in requires two things: your password, and a second verification — usually a code sent to your phone or generated by an app. Even if someone has your password, they can't get in without that second code.

Enable 2FA on every account that offers it, starting with your email and bank. It takes about two minutes to set up and dramatically reduces your risk.

## A Simple Starting Point

You don't have to overhaul everything at once. Start here:

1. Change your email password to a unique passphrase you don't use anywhere else.
2. Enable two-factor authentication on your email.
3. Do the same for your bank account.
4. Consider downloading a free password manager and adding accounts one at a time as you log in to them.

Small steps, taken consistently, add up to real protection. And if you'd like to walk through any of this with someone who can explain it in plain English — that's exactly what Bright Path Cyber is here for.
    `.trim(),
  },
];

function BlogPost({ post, onBack }: { post: typeof posts[0]; onBack: () => void }) {
  const isCyber = post.divisionColor === "cyber";
  const accentColor = isCyber ? "oklch(0.58 0.12 185)" : "oklch(0.75 0.16 75)";
  const badgeStyle = isCyber
    ? { backgroundColor: "oklch(0.94 0.04 185)", color: "oklch(0.40 0.10 185)" }
    : { backgroundColor: "oklch(0.96 0.05 75)", color: "oklch(0.45 0.12 75)" };

  // Parse the markdown-like content
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactElement[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];
      if (line.startsWith("## ")) {
        elements.push(
          <h2 key={i} className="font-display text-2xl font-semibold mt-8 mb-3" style={{ color: "oklch(0.22 0.06 255)" }}>
            {line.replace("## ", "")}
          </h2>
        );
      } else if (line.startsWith("**") && line.endsWith("**")) {
        elements.push(
          <p key={i} className="font-body font-semibold text-base mb-3" style={{ color: "oklch(0.30 0.06 255)" }}>
            {line.replace(/\*\*/g, "")}
          </p>
        );
      } else if (line.startsWith("---")) {
        elements.push(<hr key={i} className="my-8 border-0 h-px" style={{ backgroundColor: "oklch(0.88 0.01 255)" }} />);
      } else if (line.trim() !== "") {
        // Handle inline bold
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        const rendered = parts.map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={j} className="font-semibold" style={{ color: "oklch(0.28 0.06 255)" }}>{part.replace(/\*\*/g, "")}</strong>;
          }
          return part;
        });
        elements.push(
          <p key={i} className="font-body text-base leading-relaxed mb-4" style={{ color: "oklch(0.38 0.03 255)" }}>
            {rendered}
          </p>
        );
      }
      i++;
    }
    return elements;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-body mb-8 transition-colors hover:opacity-70"
            style={{ color: "oklch(0.50 0.03 255)" }}
          >
            <ChevronLeft size={15} />
            Back to Blog
          </button>

          <div className="flex items-center gap-2 mb-5">
            <span className="division-badge" style={badgeStyle}>
              <post.icon size={11} />
              {post.division}
            </span>
            <span className="text-xs font-body" style={{ color: "oklch(0.55 0.03 255)" }}>{post.date}</span>
            <span className="text-xs font-body" style={{ color: "oklch(0.55 0.03 255)" }}>·</span>
            <span className="text-xs font-body flex items-center gap-1" style={{ color: "oklch(0.55 0.03 255)" }}>
              <Clock size={11} /> {post.readTime}
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-tight mb-6" style={{ color: "oklch(0.22 0.06 255)" }}>
            {post.title}
          </h1>

          <div className="w-12 h-0.5 mb-10" style={{ backgroundColor: accentColor }} />

          <div className="prose-content">
            {renderContent(post.content)}
          </div>

          <div className="mt-12 p-7 rounded-2xl" style={{ backgroundColor: isCyber ? "oklch(0.94 0.04 185)" : "oklch(0.96 0.05 75)", border: `1px solid ${isCyber ? "oklch(0.85 0.08 185)" : "oklch(0.88 0.10 75)"}` }}>
            <h3 className="font-display font-semibold text-lg mb-2" style={{ color: "oklch(0.22 0.06 255)" }}>
              Want personalized guidance?
            </h3>
            <p className="font-body text-sm mb-4" style={{ color: "oklch(0.40 0.03 255)" }}>
              Bright Path Cyber offers 1-on-1 coaching sessions to help you navigate digital safety at your own pace.
            </p>
            <Link href="/contact">
              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold font-body text-sm text-white transition-all hover:opacity-90"
                style={{ backgroundColor: accentColor }}
              >
                Book a Free Consultation
                <ArrowRight size={13} />
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function Blog() {
  const [activePost, setActivePost] = useState<string | null>(null);

  const currentPost = posts.find(p => p.id === activePost);

  if (currentPost) {
    return <BlogPost post={currentPost} onBack={() => setActivePost(null)} />;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-16" style={{ backgroundColor: "oklch(0.22 0.06 255)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl">
            <div className="teal-bar mb-5" style={{ backgroundColor: "oklch(0.58 0.12 185)" }} />
            <h1 className="font-display text-5xl sm:text-6xl font-semibold text-white mb-5">
              Insights &<br />Resources
            </h1>
            <p className="font-body text-lg" style={{ color: "oklch(0.78 0.03 255)" }}>
              Practical guidance on cybersecurity, online safety, and digital privacy — written in plain English for individuals, families, and anyone who wants to stay safe online.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Featured Post */}
          <RevealSection className="mb-10">
            <button
              onClick={() => setActivePost(posts[0].id)}
              className="w-full text-left group"
            >
              <div
                className="rounded-2xl overflow-hidden card-lift"
                style={{ backgroundColor: "white", border: "1px solid oklch(0.88 0.01 255)" }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-5">
                  <div
                    className="lg:col-span-2 min-h-48 flex items-center justify-center p-12"
                    style={{ backgroundColor: "oklch(0.94 0.04 185)" }}
                  >
                    <Shield size={64} style={{ color: "oklch(0.50 0.12 185)" }} />
                  </div>
                  <div className="lg:col-span-3 p-8 sm:p-10">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="division-badge division-badge-cyber">
                        <Shield size={11} /> Bright Path Cyber
                      </span>
                      <span className="text-xs font-body" style={{ color: "oklch(0.55 0.03 255)" }}>Featured</span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-3 group-hover:opacity-80 transition-opacity" style={{ color: "oklch(0.22 0.06 255)" }}>
                      {posts[0].title}
                    </h2>
                    <p className="font-body text-sm leading-relaxed mb-5" style={{ color: "oklch(0.45 0.03 255)" }}>
                      {posts[0].excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs font-body" style={{ color: "oklch(0.55 0.03 255)" }}>
                        <span>{posts[0].date}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1"><Clock size={11} /> {posts[0].readTime}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-semibold font-body text-sm group-hover:gap-3 transition-all" style={{ color: "oklch(0.50 0.12 185)" }}>
                        Read Article <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </RevealSection>

          {/* Other Bright Path Cyber Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.slice(1).filter(p => p.divisionColor === "cyber").map((post, i) => (
              <RevealSection key={post.id} delay={i * 100}>
                <button onClick={() => setActivePost(post.id)} className="w-full text-left group">
                  <div className="rounded-2xl overflow-hidden card-lift h-full flex flex-col" style={{ backgroundColor: "white", border: "1px solid oklch(0.88 0.01 255)" }}>
                    <div className="h-36 flex items-center justify-center" style={{ backgroundColor: "oklch(0.94 0.04 185)" }}>
                      <Shield size={48} style={{ color: "oklch(0.50 0.12 185)" }} />
                    </div>
                    <div className="p-7 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="division-badge division-badge-cyber">
                          <Shield size={11} /> {post.division}
                        </span>
                      </div>
                      <h2 className="font-display text-xl font-semibold mb-3 group-hover:opacity-80 transition-opacity" style={{ color: "oklch(0.22 0.06 255)" }}>
                        {post.title}
                      </h2>
                      <p className="font-body text-sm leading-relaxed mb-4 flex-1" style={{ color: "oklch(0.45 0.03 255)" }}>
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2 text-xs font-body" style={{ color: "oklch(0.55 0.03 255)" }}>
                          <span>{post.date}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-semibold font-body text-xs group-hover:gap-2.5 transition-all" style={{ color: "oklch(0.50 0.12 185)" }}>
                          Read <ArrowRight size={12} />
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </RevealSection>
            ))}
          </div>

          {/* Newsletter CTA */}
          <RevealSection className="mt-16">
            <div
              className="rounded-2xl p-10 text-center"
              style={{ backgroundColor: "oklch(0.22 0.06 255)" }}
            >
              <h3 className="font-display text-2xl font-semibold text-white mb-3">
                Stay in the loop
              </h3>
              <p className="font-body text-sm mb-6" style={{ color: "oklch(0.78 0.03 255)" }}>
                New articles on cybersecurity and financial literacy — delivered to your inbox, no spam ever.
              </p>
              <Link href="/contact">
                <button
                  className="px-7 py-3 rounded-lg font-semibold font-body text-sm text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: "oklch(0.58 0.12 185)" }}
                >
                  Subscribe to Updates
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
