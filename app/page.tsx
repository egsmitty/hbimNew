import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import ImpactBar from "@/components/ImpactBar";
import GiveCTA from "@/components/GiveCTA";
import AnimateFadeUp from "@/components/AnimateFadeUp";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <Hero
        title="Advancing the Gospel Through the Great Commission"
        subtitle="Equipping indigenous leaders with Bibles, training, and resources to plant churches across Africa and Asia."
        ctaPrimary={{ label: "Give Now", href: "/give" }}
        ctaSecondary={{ label: "Learn More", href: "/about" }}
        imageSrc="https://picsum.photos/seed/hbm-hero/1920/1080"
        imageAlt="A community gathering in rural Africa"
        tall
      />

      {/* 2. Mission Bar */}
      <section className="bg-[#F8F7F5] border-t border-[#C8C0B4] border-b border-divider">
        <div className="max-w-[1440px] mx-auto px-6 py-10 text-center">
          <p className="font-heading text-2xl md:text-3xl text-navy font-semibold leading-snug max-w-4xl mx-auto">
            Since 1984, Hope Builders Ministries has partnered with the local church to bring the Gospel to the
            unreached — one village, one pastor, one Bible at a time.
          </p>
        </div>
      </section>

      {/* 3. Impact Numbers */}
      <ImpactBar />

      {/* 4. Africa + Asia Cards */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-6 py-20">
          <AnimateFadeUp>
            <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-navy text-left mb-12 tracking-wide">
              Where We Work
            </h2>
          </AnimateFadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                href: "/africa",
                src: "https://picsum.photos/seed/hbm-africa-card/800/600",
                alt: "Ministry work in Africa",
                label: "8 Nations",
                title: "Africa",
                stat: "11,000 village churches · 25,000 trained pastors",
                cta: "Explore Africa Ministry",
              },
              {
                href: "/asia",
                src: "https://picsum.photos/seed/hbm-asia-card/800/600",
                alt: "Ministry work in Asia",
                label: "India · Pakistan · Bangladesh",
                title: "Asia",
                stat: "4,000+ churches · 1,000+ new churches planted",
                cta: "Explore Asia Ministry",
              },
            ].map((card) => (
              <Link key={card.href} href={card.href} className="group block rounded-lg overflow-hidden">
                {/* Image container — overflow-hidden here clips the scale correctly */}
                <div className="relative w-full h-80 overflow-hidden">
                  {/* Scale wrapper — only the image zooms, not the overlay or text */}
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                    <Image src={card.src} alt={card.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                  </div>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
                  {/* Text */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="block font-body text-sm text-gold uppercase tracking-widest font-semibold mb-2">{card.label}</span>
                    <h3 className="font-heading text-white text-3xl font-bold">{card.title}</h3>
                    <p className="font-body text-white/70 text-sm mt-2">{card.stat}</p>
                  </div>
                </div>
                {/* Footer bar */}
                <div className="bg-surface px-8 py-4 flex items-center justify-between group-hover:bg-divider transition-colors">
                  <span className="font-body text-sm font-semibold text-navy">{card.cta}</span>
                  <svg className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Story Section */}
      <section className="bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="https://picsum.photos/seed/hbm-story/800/600"
                alt="Johan Gous, founder of Hope Builders Ministries"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <AnimateFadeUp>
                <span className="font-body text-sm text-gold uppercase tracking-widest font-semibold">Our Story</span>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy mt-3 leading-tight">
                  It Started With One Shared Bible
                </h2>
              </AnimateFadeUp>
              <p className="font-body text-base text-text mt-6 leading-relaxed">
                When Johan Gous arrived in Malawi, he found an entire congregation sharing a single Bible. He exchanged 100 new Bibles for that one worn copy — and the vision of Hope Builders Ministries was born.
              </p>
              <p className="font-body text-base text-text mt-4 leading-relaxed">
                What began in 1984 as a calling to address pastor shortages in Mozambique has grown into a movement spanning eight African nations and three countries in South Asia — equipping thousands of indigenous leaders to reach their own people with the Gospel.
              </p>
              <blockquote className="mt-8 border-l-4 border-gold pl-6">
                <p className="font-heading text-lg text-navy italic leading-snug">
                  &ldquo;We equip, encourage, and empower Christian leaders in the Word of God so they can make disciples in their communities and beyond.&rdquo;
                </p>
                <cite className="block font-body text-sm text-text-muted mt-2 not-italic">Hope Builders Ministries Vision</cite>
              </blockquote>
              <Link href="/about" className="inline-block mt-8 font-body text-sm font-semibold text-gold hover:text-gold/80 transition-colors">
                Read the full story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Trust Bar */}
      <section className="bg-surface border-y border-divider">
        <div className="max-w-[1440px] mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "1984", label: "Founded" },
              { value: "501(c)(3)", label: "Registered Nonprofit" },
              { value: "ECFA", label: "Accredited Member" },
              { value: "100%", label: "Tax Deductible" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center justify-center text-center gap-2 bg-white border border-divider rounded-lg px-6 py-8">
                <span className="font-heading font-bold text-3xl md:text-4xl text-navy">{item.value}</span>
                <span className="font-body text-xs text-text-muted uppercase tracking-widest leading-snug">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Give CTA */}
      <GiveCTA />
    </>
  );
}
