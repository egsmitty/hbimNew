import Link from "next/link";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Africa", href: "/africa" },
  { label: "Asia", href: "/asia" },
  { label: "Give", href: "/give" },
  { label: "Contact", href: "/contact" },
  { label: "Subscribe", href: "/subscribe" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white mt-auto">
      <div className="max-w-[1440px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-block">
              <span className="font-heading text-xl font-bold tracking-wide">
                HOPE BUILDERS
              </span>
              <span className="block font-body text-xs font-semibold tracking-widest uppercase text-gold mt-0.5">
                Ministries
              </span>
            </Link>
            <p className="font-body text-sm text-white/70 leading-relaxed max-w-xs">
              Advancing the Gospel of Jesus Christ through the Great Commission
              in Africa, South Asia, and the United States.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 mt-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-white/60 hover:text-gold transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav Links Column */}
          <div className="flex flex-col gap-3">
            <h3 className="font-body text-xs font-semibold tracking-widest uppercase text-gold mb-1">
              Navigate
            </h3>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-sm text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact + Trust Column */}
          <div className="flex flex-col gap-3">
            <h3 className="font-body text-xs font-semibold tracking-widest uppercase text-gold mb-1">
              Contact
            </h3>
            <p className="font-body text-sm text-white/70 leading-relaxed">
              PO Box 317<br />
              Greenwood, VA 22943
            </p>
            <a
              href="tel:9314017310"
              className="font-body text-sm text-white/70 hover:text-white transition-colors"
            >
              (931) 401-7310
            </a>
            <a
              href="mailto:Ministry@HBMIN.org"
              className="font-body text-sm text-white/70 hover:text-white transition-colors"
            >
              Ministry@HBMIN.org
            </a>
            {/* Trust signals */}
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-1.5">
              <p className="font-body text-xs text-white/50">
                501(c)(3) Nonprofit Organization
              </p>
              <p className="font-body text-xs text-white/50">
                ECFA Accredited — All gifts tax deductible
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-body text-xs text-white/40">
            © {currentYear} Hope Builders Ministries. All rights reserved.
          </p>
          <p className="font-body text-xs text-white/40">
            #HOPEBUILDER · #AdvancingTheGospel
          </p>
        </div>
      </div>
    </footer>
  );
}
