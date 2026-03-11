/*
 * Footer — Bright Path Cyber
 * Design: Concept D Editorial — "West Elm meets Apple"
 * Ivory background, brass gold accents, near-black text
 * Clean editorial layout with thin brass rule dividers
 */

import { Link } from "wouter";
import { Mail } from "lucide-react";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-ivory-dark">
      {/* Top brass rule */}
      <div className="brass-rule" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="mb-5">
              <h3 className="font-display text-xl font-semibold" style={{ color: "#1A1A1A" }}>
                Bright Path Cyber
              </h3>
              <div className="brass-bar mt-2" />
            </div>
            <p className="text-sm leading-relaxed font-body mb-5 text-warm-gray">
              Practical, jargon-free cybersecurity education for individuals and families.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-body text-warm-gray">
                <Mail size={14} className="text-brass" />
                <a href="mailto:info@brightpathcyber.com" className="hover:text-near-black transition-colors">
                  info@brightpathcyber.com
                </a>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-body font-semibold text-near-black mb-4 text-xs tracking-[0.12em] uppercase">Company</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/blog", label: "Blog" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-sm font-body text-warm-gray transition-colors hover:text-near-black">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cyber Safety */}
          <div>
            <h4 className="font-body font-semibold text-near-black mb-4 text-xs tracking-[0.12em] uppercase">Cyber Safety</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/bright-path-cyber", label: "Overview" },
                { href: "/blog", label: "Blog Articles" },
                { href: "/bright-path-cyber#ebook", label: "Click with Confidence" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>
                    <span className="text-sm font-body text-warm-gray transition-colors hover:text-near-black">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(201,168,76,0.3)" }}>
          <p className="text-xs font-body text-warm-gray">
            &copy; {currentYear} Bright Path Cyber. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs font-body text-warm-gray hover:text-near-black transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="text-xs font-body text-warm-gray hover:text-near-black transition-colors cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
