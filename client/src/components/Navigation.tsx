/*
 * Navigation — Bright Path Cyber
 * Design: Concept D Editorial — "West Elm meets Apple"
 * Ivory background, brass gold accents, near-black text
 * Inline shield emblem SVG, Playfair Display wordmark
 * Minimal nav: Home, About, Cyber Safety, Blog, Contact
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/bright-path-cyber", label: "Cyber Safety" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const BPC_LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663415118379/JXjpt8aqftuhQ9n25h55pn/BPC_Shield_Logo_v2_2958d9ed.png";

function ShieldLogo({ className = "" }: { className?: string }) {
  return (
    <img
      src={BPC_LOGO_URL}
      alt="Bright Path Cyber shield logo"
      className={className}
    />
  );
}

export default function Navigation() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isActive = (href: string) => location === href;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "shadow-[0_1px_0_0_rgba(201,168,76,0.2)]"
          : ""
      }`}
      style={{ backgroundColor: "rgba(245,240,232,0.97)", backdropFilter: "blur(8px)" }}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-5 group">
              {/* Shield — 52px, vertically centered with the full text block */}
              <ShieldLogo className="h-[52px] w-auto flex-shrink-0" />
              {/* Wordmark block: title + horizontal brass rule + subtitle */}
              <div className="flex flex-col justify-center">
                <span
                  className="font-display font-semibold"
                  style={{ color: "#1A1A1A", fontSize: "26px", lineHeight: 1.15, letterSpacing: "0" }}
                >
                  Bright Path Cyber
                </span>
                {/* Horizontal brass gold rule */}
                <div style={{ height: "1.5px", backgroundColor: "#C9A84C", margin: "4px 0 5px" }} />
                <span
                  className="font-body font-normal"
                  style={{ color: "#6B6560", fontSize: "12px", letterSpacing: "0.01em", lineHeight: 1.3 }}
                >
                  Cybersecurity Designed for Your Life
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`px-3 py-2 text-sm font-body transition-colors duration-200 ${
                    isActive(link.href)
                      ? "font-semibold"
                      : "hover:opacity-80"
                  }`}
                  style={{
                    color: isActive(link.href) ? "#C9A84C" : "#1A1A1A",
                    borderBottom: isActive(link.href) ? "1px solid #C9A84C" : "1px solid transparent",
                  }}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <a
              href="/#free-checklist"
              className="ml-3 px-4 py-2 text-sm font-body font-medium transition-all duration-200"
              style={{
                border: "1px solid #C9A84C",
                borderRadius: "4px",
                color: "#C9A84C",
                letterSpacing: "0.05em",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#C9A84C"; (e.currentTarget as HTMLAnchorElement).style.color = "#1A1A1A"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = "#C9A84C"; }}
            >
              Free Checklist
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 transition-colors"
            style={{ color: "#1A1A1A" }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden py-3 pb-4 space-y-1" style={{ borderTop: "1px solid rgba(201,168,76,0.3)" }}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`block px-3 py-2.5 text-sm font-body transition-colors ${
                    isActive(link.href) ? "font-semibold" : ""
                  }`}
                  style={{
                    color: isActive(link.href) ? "#C9A84C" : "#1A1A1A",
                  }}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <div className="px-3 pt-2">
              <a
                href="/#free-checklist"
                className="block w-full text-center py-2.5 text-sm font-body font-medium"
                style={{
                  border: "1px solid #C9A84C",
                  borderRadius: "4px",
                  color: "#C9A84C",
                  letterSpacing: "0.05em",
                }}
              >
                Free Checklist
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
