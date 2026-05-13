"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Africa", href: "/africa" },
  { label: "Asia", href: "/asia" },
  { label: "Give", href: "/give" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {/* Placeholder — swap for <Image> when logo file is provided */}
          <span className="font-heading text-white text-xl font-bold tracking-wide">
            HOPE BUILDERS
          </span>
          <span className="font-body text-gold text-xs font-semibold tracking-widest uppercase leading-tight hidden sm:block">
            Ministries
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            href="/give"
            className="font-body text-sm font-semibold bg-gold text-white px-5 py-2 rounded hover:bg-gold/90 transition-colors"
          >
            Give Now
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-transform duration-200 ${
              mobileOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-opacity duration-200 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-transform duration-200 ${
              mobileOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-navy border-t border-white/10">
          <nav className="max-w-[1200px] mx-auto px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-base font-medium text-white/80 hover:text-white transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/give"
              className="font-body text-sm font-semibold bg-gold text-white px-5 py-2.5 rounded text-center hover:bg-gold/90 transition-colors mt-2"
              onClick={() => setMobileOpen(false)}
            >
              Give Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
