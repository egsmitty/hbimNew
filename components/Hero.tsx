import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  title: string;
  subtitle?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  imageSrc?: string;
  imageAlt?: string;
  tall?: boolean;
}

export default function Hero({
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  imageSrc,
  imageAlt = "",
  tall = false,
}: HeroProps) {
  return (
    <section className={`relative w-full flex items-end overflow-hidden ${tall ? "min-h-[620px] md:min-h-[680px]" : "min-h-[380px] md:min-h-[460px]"}`}>
      {/* Background */}
      {imageSrc ? (
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" priority sizes="100vw" />
      ) : (
        <div className="absolute inset-0 bg-navy" />
      )}

      {/* Gradient — heavier at bottom where text sits */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/20" />

      {/* Content — left-aligned, sits above gradient at bottom */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 pb-16 pt-32">
        <h1
          className={`font-heading font-bold text-white leading-[1.1] tracking-tight max-w-3xl ${
            tall ? "text-4xl sm:text-5xl md:text-6xl" : "text-3xl sm:text-4xl md:text-5xl"
          }`}
        >
          {title}
        </h1>

        {subtitle && (
          <p className="font-body text-lg md:text-xl text-white/80 mt-5 max-w-xl leading-relaxed">
            {subtitle}
          </p>
        )}

        {(ctaPrimary || ctaSecondary) && (
          <div className="flex flex-wrap gap-4 mt-8">
            {ctaPrimary && (
              <Link
                href={ctaPrimary.href}
                className="font-body font-semibold text-base bg-gold text-white px-8 py-3.5 rounded-full hover:bg-gold/90 transition-colors shadow-lg shadow-black/30"
              >
                {ctaPrimary.label}
              </Link>
            )}
            {ctaSecondary && (
              <Link
                href={ctaSecondary.href}
                className="font-body font-semibold text-base border-2 border-white/60 text-white px-8 py-3.5 rounded-full hover:border-white hover:bg-white/10 transition-colors"
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
