/*
 * Navigation — McMillon Co.
 * Design: Pacific Northwest Professional
 * Deep navy background, teal accent on active/hover, DM Sans labels
 * Sticky top nav with smooth scroll behavior
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Shield, Rocket, ChevronDown } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  {
    label: "Divisions",
    children: [
      { href: "/clearpath-cyber", label: "ClearPath Cyber", icon: Shield, color: "text-teal-600" },
      { href: "/launchpad-money", label: "Launchpad Money", icon: Rocket, color: "text-amber-500" },
    ],
  },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [divisionsOpen, setDivisionsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDivisionsOpen(false);
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
            <div className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "oklch(0.22 0.06 255)" }}>
                <span className="text-white font-display font-bold text-sm leading-none">M</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-semibold text-base tracking-tight" style={{ color: "oklch(0.22 0.06 255)" }}>
                  McMillon Co.
                </span>
                <span className="text-xs font-body" style={{ color: "oklch(0.50 0.03 255)" }}>
                  Professional Consulting
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="relative">
                  <button
                    onClick={() => setDivisionsOpen(!divisionsOpen)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium font-body transition-colors ${
                      divisionsOpen
                        ? "text-teal-600 bg-teal-50"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                    style={divisionsOpen ? { color: "oklch(0.50 0.12 185)", backgroundColor: "oklch(0.96 0.03 185)" } : {}}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${divisionsOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {divisionsOpen && (
                    <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
                      {link.children.map((child) => (
                        <Link key={child.href} href={child.href}>
                          <div
                            className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-slate-50 transition-colors"
                            onClick={() => setDivisionsOpen(false)}
                          >
                            <child.icon size={15} className={child.color} />
                            <span className="text-sm font-medium font-body text-slate-700">{child.label}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={link.href} href={link.href!}>
                  <span
                    className={`px-3 py-2 rounded-md text-sm font-medium font-body transition-colors ${
                      isActive(link.href!)
                        ? "font-semibold"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                    style={
                      isActive(link.href!)
                        ? { color: "oklch(0.22 0.06 255)", backgroundColor: "oklch(0.95 0.008 80)" }
                        : {}
                    }
                  >
                    {link.label}
                  </span>
                </Link>
              )
            )}
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
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <div className="px-3 py-2 text-xs font-semibold uppercase tracking-widest font-body" style={{ color: "oklch(0.50 0.03 255)" }}>
                    Divisions
                  </div>
                  {link.children.map((child) => (
                    <Link key={child.href} href={child.href}>
                      <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-md hover:bg-slate-50 transition-colors">
                        <child.icon size={15} className={child.color} />
                        <span className="text-sm font-medium font-body text-slate-700">{child.label}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <Link key={link.href} href={link.href!}>
                  <span
                    className={`block px-3 py-2.5 rounded-md text-sm font-medium font-body transition-colors ${
                      isActive(link.href!)
                        ? "font-semibold"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                    style={isActive(link.href!) ? { color: "oklch(0.22 0.06 255)" } : {}}
                  >
                    {link.label}
                  </span>
                </Link>
              )
            )}
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
