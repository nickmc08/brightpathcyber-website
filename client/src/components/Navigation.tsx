/*
 * Navigation — Bright Path Cyber
 * Design: Pacific Northwest Professional
 * Deep navy background, teal accent on active/hover, DM Sans labels
 * Sticky top nav with smooth scroll behavior
 * Bright Path Cyber is the primary brand
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const LOGO_FULL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663415118379/JXjpt8aqftuhQ9n25h55pn/bpc-logo-full_9bdb655a.png";
const LOGO_ICON = "https://d2xsxph8kpxj0f.cloudfront.net/310519663415118379/JXjpt8aqftuhQ9n25h55pn/bpc-favicon_e6d7ef2d.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/bright-path-cyber", label: "Cyber Safety" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

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
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center group">
              {/* Full logo on desktop, icon-only on mobile */}
              <img
                src={LOGO_FULL}
                alt="Bright Path Cyber"
                className="hidden sm:block h-10 w-auto object-contain"
                style={{ maxWidth: "200px" }}
              />
              <img
                src={LOGO_ICON}
                alt="Bright Path Cyber"
                className="block sm:hidden h-9 w-9 object-contain"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`px-3 py-2 rounded-md text-sm font-medium font-body transition-colors ${
                    isActive(link.href)
                      ? "font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                  style={
                    isActive(link.href)
                      ? { color: "oklch(0.22 0.06 255)", backgroundColor: "oklch(0.95 0.008 80)" }
                      : {}
                  }
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/contact">
              <button
                className="px-5 py-2.5 rounded-lg text-sm font-semibold font-body text-white transition-all duration-200 hover:opacity-90 hover:shadow-md"
                style={{ backgroundColor: "oklch(0.58 0.12 185)" }}
              >
                Book a Consultation
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-100 py-3 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`block px-3 py-2.5 rounded-md text-sm font-medium font-body transition-colors ${
                    isActive(link.href)
                      ? "font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                  style={isActive(link.href) ? { color: "oklch(0.22 0.06 255)" } : {}}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <div className="pt-2 px-3">
              <Link href="/contact">
                <button
                  className="w-full px-5 py-2.5 rounded-lg text-sm font-semibold font-body text-white transition-all"
                  style={{ backgroundColor: "oklch(0.58 0.12 185)" }}
                >
                  Book a Consultation
                </button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
