/*
 * Footer — Bright Path Cyber
 * Design: Pacific Northwest Professional
 * Deep navy background, warm white text, teal accents
 * 3-column layout: Brand | Company | Cyber Safety
 */

import { Link } from "wouter";
import { MapPin, Mail, ArrowRight } from "lucide-react";

const LOGO_FULL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663415118379/JXjpt8aqftuhQ9n25h55pn/bpc-logo-full_9bdb655a.png";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer style={{ backgroundColor: "oklch(0.22 0.06 255)" }} className="text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="mb-4">
              {/* Logo on dark background — use the full logo with a white/light background pill */}
              <div className="inline-block bg-white rounded-xl px-3 py-2">
                <img
                  src={LOGO_FULL}
                  alt="Bright Path Cyber"
                  className="h-9 w-auto object-contain"
                  style={{ maxWidth: "180px" }}
                />
              </div>
            </div>
            <p className="text-sm leading-relaxed font-body mb-5" style={{ color: "oklch(0.72 0.03 255)" }}>
              Warm, jargon-free cybersecurity and privacy guidance for individuals and families — based in Kent, Washington.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-body" style={{ color: "oklch(0.72 0.03 255)" }}>
                <MapPin size={14} style={{ color: "oklch(0.58 0.12 185)" }} />
                <span>Kent, Washington</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-body" style={{ color: "oklch(0.72 0.03 255)" }}>
                <Mail size={14} style={{ color: "oklch(0.58 0.12 185)" }} />
                <a href="mailto:info@brightpathcyber.com" className="hover:text-white transition-colors">
                  info@brightpathcyber.com
                </a>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm tracking-wide uppercase">Company</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/blog", label: "Blog" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-sm font-body transition-colors hover:text-white flex items-center gap-1 group" style={{ color: "oklch(0.72 0.03 255)" }}>
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "oklch(0.58 0.12 185)" }} />
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cyber Safety */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663415118379/JXjpt8aqftuhQ9n25h55pn/bpc-favicon_e6d7ef2d.png"
                alt=""
                className="w-5 h-5 object-contain"
              />
              <h4 className="font-display font-semibold text-white text-sm tracking-wide uppercase">Cyber Safety</h4>
            </div>
            <p className="text-xs font-body mb-3" style={{ color: "oklch(0.72 0.03 255)" }}>
              Warm, clear cybersecurity guidance for everyone.
            </p>
            <ul className="space-y-2.5">
              {[
                { href: "/bright-path-cyber", label: "Overview" },
                { href: "/bright-path-cyber#services", label: "Services" },
                { href: "/bright-path-cyber#ebook", label: "Click with Confidence" },
                { href: "/contact", label: "Book a Session" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>
                    <span className="text-sm font-body transition-colors hover:text-white flex items-center gap-1 group" style={{ color: "oklch(0.72 0.03 255)" }}>
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "oklch(0.58 0.12 185)" }} />
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: "oklch(0.32 0.05 255)" }}>
          <p className="text-xs font-body" style={{ color: "oklch(0.55 0.03 255)" }}>
            © {currentYear} Bright Path Cyber. All rights reserved. | Kent, Washington
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs font-body" style={{ color: "oklch(0.55 0.03 255)" }}>
              Privacy Policy
            </span>
            <span className="text-xs font-body" style={{ color: "oklch(0.55 0.03 255)" }}>
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
