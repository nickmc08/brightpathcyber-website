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

function ShieldLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 46" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 2L4 10v12c0 11 7 18 16 22 9-4 16-11 16-22V10L20 2z"
        stroke="#C9A84C"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M20 14l-5 14h3.5l1.5-4.5 1.5 4.5H25l-5-14z"
        fill="#C9A84C"
      />
      <circle cx="20" cy="10" r="1.5" fill="#C9A84C" />
    </svg>
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
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2.5 group">
              <ShieldLogo className="h-8 w-auto" />
              <div className="flex flex-col leading-none">
                <span className="font-display text-lg font-semibold tracking-wide" style={{ color: "#1A1A1A" }}>
                  Bright Path Cyber
                </span>
                <span className="text-[10px] font-body font-medium tracking-[0.15em] uppercase" style={{ color: "#C9A84C" }}>
                  Personal Cybersecurity
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
          </div>
        )}
      </nav>
    </header>
  );
}
