"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DropdownItem {
  label: string;
  href: string;
}

const navLinks: { label: string; href: string; dropdown?: DropdownItem[] }[] = [
  {
    label: "About",
    href: "/about",
    dropdown: [
      { label: "Our Mission", href: "/about#mission" },
      { label: "What We Believe", href: "/about#beliefs" },
      { label: "Our Journey", href: "/about#timeline" },
      { label: "The Three E's", href: "/about#threeEs" },
      { label: "Programs", href: "/about#programs" },
      { label: "Our Team", href: "/about#team" },
    ],
  },
  {
    label: "Africa",
    href: "/africa",
    dropdown: [
      { label: "Overview", href: "/africa#overview" },
      { label: "Where We Work", href: "/africa#nations" },
      { label: "Stories & Reports", href: "/africa#reports" },
    ],
  },
  {
    label: "Asia",
    href: "/asia",
    dropdown: [
      { label: "Overview", href: "/asia#overview" },
      { label: "Where We Work", href: "/asia#nations" },
      { label: "Stories & Reports", href: "/asia#reports" },
    ],
  },
  {
    label: "Give",
    href: "/give",
    dropdown: [
      { label: "General Fund", href: "/give#general-fund" },
      { label: "Give to a Project", href: "/give#project" },
      { label: "Give to a Country", href: "/give#country" },
      { label: "Give to a Team Member", href: "/give#team-member" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 bg-navy border-b border-white/10">
      <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between gap-8" style={{ height: "88px" }}>

        {/* Logo lockup */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-11 h-11 rounded-sm bg-gold/15 border border-gold/30 flex items-center justify-center group-hover:bg-gold/25 transition-colors">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-gold" fill="currentColor" aria-hidden="true">
              <rect x="10.5" y="3" width="3" height="18" rx="1" />
              <rect x="4" y="9" width="16" height="3" rx="1" />
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-heading text-white font-bold text-lg tracking-wide">Hope Builders</span>
            <span className="font-body text-gold text-xs tracking-[0.18em] uppercase mt-0.5">Ministries</span>
          </div>
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Primary navigation">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`font-body text-base tracking-wide transition-colors relative pb-0.5 flex items-center gap-1 ${
                    isActive(link.href)
                      ? "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-gold after:rounded-full"
                      : "text-white/65 hover:text-white"
                  }`}
                >
                  {link.label}
                  <svg className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                  </svg>
                </Link>
                {/* Dropdown */}
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200">
                  <div className="bg-navy border border-white/10 rounded-lg shadow-2xl shadow-black/40 py-2 min-w-[180px]">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block font-body text-sm text-white/70 hover:text-white hover:bg-white/5 px-5 py-2.5 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`font-body text-base tracking-wide transition-colors relative pb-0.5 ${
                  isActive(link.href)
                    ? "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-gold after:rounded-full"
                    : "text-white/65 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link
            href="/subscribe"
            className="font-body text-sm text-white border border-white/40 rounded-full px-5 py-2.5 hover:border-white hover:bg-white/10 transition-colors"
          >
            Subscribe
          </Link>
          <Link
            href="/give"
            className="font-body text-sm font-semibold bg-gold text-white px-6 py-2.5 rounded-full hover:bg-gold/90 transition-colors"
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
          <nav className="max-w-[1440px] mx-auto px-6 py-6 flex flex-col gap-5" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <div key={link.href} className="flex flex-col gap-2">
                <Link
                  href={link.href}
                  className={`font-body text-base transition-colors ${isActive(link.href) ? "text-gold font-semibold" : "text-white/75 hover:text-white"}`}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
                {link.dropdown && (
                  <div className="flex flex-col gap-1 pl-3 border-l border-white/10">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="font-body text-sm text-white/50 hover:text-white/80 transition-colors py-0.5"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex flex-col gap-3 pt-2 border-t border-white/10">
              <Link href="/subscribe" className="font-body text-sm text-white border border-white/40 rounded-full px-5 py-3 text-center hover:border-white hover:bg-white/10 transition-colors" onClick={() => setMobileOpen(false)}>
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
