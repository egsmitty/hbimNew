"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Africa", href: "/africa" },
  { label: "Asia", href: "/asia" },
  { label: "Give", href: "/give" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 bg-navy border-b border-white/10">
      <div className="max-w-[1200px] mx-auto px-6 h-18 flex items-center justify-between gap-8" style={{ height: "72px" }}>

        {/* Logo lockup */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          {/* Cross emblem */}
          <div className="w-9 h-9 rounded-sm bg-gold/15 border border-gold/30 flex items-center justify-center group-hover:bg-gold/25 transition-colors">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-gold" fill="currentColor" aria-hidden="true">
              <rect x="10.5" y="3" width="3" height="18" rx="1" />
              <rect x="4" y="9" width="16" height="3" rx="1" />
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-heading text-white font-bold text-base tracking-wide">Hope Builders</span>
            <span className="font-body text-gold text-[10px] tracking-[0.18em] uppercase mt-0.5">Ministries</span>
          </div>
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`font-body text-sm tracking-wide transition-colors relative pb-0.5 ${
                isActive(link.href)
                  ? "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-gold after:rounded-full"
                  : "text-white/65 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link
            href="/subscribe"
            className="font-body text-sm text-white/65 hover:text-white transition-colors"
          >
            Subscribe
          </Link>
          <Link
            href="/give"
            className="font-body text-sm font-semibold bg-gold text-white px-5 py-2 rounded-full hover:bg-gold/90 transition-colors"
          >
            Give Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 flex flex-col gap-[5px]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-200 ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-opacity duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-200 ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div id="mobile-menu" className="md:hidden bg-navy border-t border-white/10">
          <nav className="max-w-[1200px] mx-auto px-6 py-6 flex flex-col gap-5" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body text-base transition-colors ${isActive(link.href) ? "text-gold font-semibold" : "text-white/75 hover:text-white"}`}
                onClick={() => setMobileOpen(false)}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-2 border-t border-white/10">
              <Link href="/subscribe" className="font-body text-sm text-white/65 hover:text-white transition-colors" onClick={() => setMobileOpen(false)}>
                Subscribe to Updates
              </Link>
              <Link href="/give" className="font-body text-sm font-semibold bg-gold text-white px-5 py-3 rounded-full text-center hover:bg-gold/90 transition-colors" onClick={() => setMobileOpen(false)}>
                Give Now
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
