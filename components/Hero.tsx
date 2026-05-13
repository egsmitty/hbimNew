import Link from "next/link";

interface HeroProps {
  title: string;
  subtitle?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  imageLabel?: string;
  tall?: boolean;
}

export default function Hero({
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  imageLabel = "Photo placeholder",
  tall = false,
}: HeroProps) {
  return (
    <section
      className={`relative w-full flex items-center justify-center bg-gradient-to-br from-navy via-navy/95 to-navy/80 ${
        tall ? "min-h-[85vh]" : "min-h-[420px] md:min-h-[520px]"
      }`}
    >
      {/* Placeholder label — remove when real photo is dropped in */}
      <span className="absolute inset-0 flex items-end justify-end p-4 font-body text-xs text-white/20 uppercase tracking-widest pointer-events-none">
        {imageLabel}
      </span>

      {/* Overlay gradient for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-20 text-center text-white">
        <h1
          className={`font-heading font-bold leading-tight tracking-tight ${
            tall
              ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
              : "text-3xl sm:text-4xl md:text-5xl"
          }`}
        >
          {title}
        </h1>

        {subtitle && (
          <p className="font-body text-lg md:text-xl text-white/80 mt-6 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}

        {(ctaPrimary || ctaSecondary) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            {ctaPrimary && (
              <Link
                href={ctaPrimary.href}
                className="font-body font-semibold text-base bg-gold text-white px-8 py-3.5 rounded hover:bg-gold/90 transition-colors"
              >
                {ctaPrimary.label}
              </Link>
            )}
            {ctaSecondary && (
              <Link
                href={ctaSecondary.href}
                className="font-body font-semibold text-base border border-white/50 text-white px-8 py-3.5 rounded hover:bg-white/10 transition-colors"
              >
                {ctaSecondary.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
