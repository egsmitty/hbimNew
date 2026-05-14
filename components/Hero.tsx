'use client'

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface HeroProps {
  title: string;
  subtitle?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  imageSrc?: string;
  imageAlt?: string;
  tall?: boolean;
  compact?: boolean;
  roomy?: boolean;
}

export default function Hero({
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  imageSrc,
  imageAlt = "",
  tall = false,
  compact = false,
  roomy = false,
}: HeroProps) {
  const heightClass = tall
    ? "min-h-[620px] md:min-h-[680px]"
    : roomy
    ? "min-h-[260px] md:min-h-[320px]"
    : compact
    ? "min-h-[180px] md:min-h-[220px]"
    : "min-h-[380px] md:min-h-[460px]";
  return (
    <section className={`relative w-full flex items-end overflow-hidden border-t-2 border-gold/60 ${heightClass}`}>
      {/* Background */}
      {imageSrc ? (
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" priority sizes="100vw" />
      ) : (
        <div className="absolute inset-0 bg-navy" />
      )}

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/20" />

      {/* Content */}
      <div className={`relative z-10 w-full max-w-[1440px] mx-auto px-6 ${
        compact ? "pb-6 pt-14" : roomy ? "pb-10 pt-22 md:pt-28" : "pb-16 pt-32"
      }`}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={`font-heading font-bold text-white leading-[1.1] tracking-tight max-w-3xl ${
            tall ? "text-4xl sm:text-5xl md:text-6xl" : "text-3xl sm:text-4xl md:text-5xl"
          }`}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-lg md:text-xl text-white/80 mt-5 max-w-xl leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}

        {(ctaPrimary || ctaSecondary) && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-4 mt-8"
          >
            {ctaPrimary && (
              <Link
                href={ctaPrimary.href}
                className="inline-flex items-center justify-center font-body font-semibold text-base bg-gold text-white px-8 py-3.5 rounded-full hover:bg-gold/90 transition-colors shadow-lg shadow-black/30"
              >
                {ctaPrimary.label}
              </Link>
            )}
            {ctaSecondary && (
              <Link
                href={ctaSecondary.href}
                className="inline-flex items-center justify-center font-body font-semibold text-base border-2 border-white/60 text-white px-8 py-3.5 rounded-full hover:border-white hover:bg-white/10 transition-colors"
              >
                {ctaSecondary.label}
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
