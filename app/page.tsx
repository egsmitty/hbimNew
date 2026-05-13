import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import ImpactBar from "@/components/ImpactBar";
import GiveCTA from "@/components/GiveCTA";

const programs = [
  {
    title: "Pastor Training Program",
    description: "A three-year program equipping indigenous pastors to lead and multiply village churches across Africa and Asia.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
  },
  {
    title: "Bibles for Disciples",
    description: "Nearly 600,000 Bibles distributed in native languages so every believer can read God's Word in their own tongue.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    title: "Dignity Project",
    description: "Caring for orphans and training widows with practical skills, restoring dignity and hope to the most vulnerable.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
  },
  {
    title: "Disciple Makers Program",
    description: "Congregation-wide discipleship training that multiplies spiritual maturity from the inside out.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
  {
    title: "Timothy Training Institute",
    description: "Established in 1990, the TTI has equipped over 13,000 students in foundational ministry and theological training.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
  },
];

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
      <section className="bg-white border-b border-divider">
        <div className="max-w-[1200px] mx-auto px-6 py-10 text-center">
          <p className="font-heading text-xl md:text-2xl text-navy font-semibold leading-snug max-w-3xl mx-auto">
            Since 1984, Hope Builders Ministries has partnered with the local church to bring the Gospel to the
            unreached — one village, one pastor, one Bible at a time.
          </p>
        </div>
      </section>

      {/* 3. Impact Numbers */}
      <ImpactBar />

      {/* 4. Africa + Asia Cards */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy text-center mb-12">
            Where We Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/africa" className="group block">
              <div className="relative overflow-hidden rounded-lg">
                <div className="relative w-full h-72">
                  <Image
                    src="https://picsum.photos/seed/hbm-africa-card/800/600"
                    alt="Ministry work in Africa"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-navy/60" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="block font-body text-xs text-gold uppercase tracking-widest font-semibold mb-2">8 Nations</span>
                    <h3 className="font-heading text-white text-2xl font-bold">Africa</h3>
                    <p className="font-body text-white/70 text-sm mt-1">11,000 village churches · 25,000 trained pastors</p>
                  </div>
                </div>
                <div className="bg-surface px-8 py-4 flex items-center justify-between group-hover:bg-divider transition-colors">
                  <span className="font-body text-sm font-semibold text-navy">Explore Africa Ministry</span>
                  <svg className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>

            <Link href="/asia" className="group block">
              <div className="relative overflow-hidden rounded-lg">
                <div className="relative w-full h-72">
                  <Image
                    src="https://picsum.photos/seed/hbm-asia-card/800/600"
                    alt="Ministry work in Asia"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-navy/60" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="block font-body text-xs text-gold uppercase tracking-widest font-semibold mb-2">India · Pakistan · Bangladesh</span>
                    <h3 className="font-heading text-white text-2xl font-bold">Asia</h3>
                    <p className="font-body text-white/70 text-sm mt-1">4,000+ churches · 1,000+ new churches planted</p>
                  </div>
                </div>
                <div className="bg-surface px-8 py-4 flex items-center justify-between group-hover:bg-divider transition-colors">
                  <span className="font-body text-sm font-semibold text-navy">Explore Asia Ministry</span>
                  <svg className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Story Section */}
      <section className="bg-surface">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
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
              <span className="font-body text-xs text-gold uppercase tracking-widest font-semibold">Our Story</span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy mt-3 leading-tight">
                It Started With One Shared Bible
              </h2>
              <p className="font-body text-text mt-6 leading-relaxed">
                When Johan Gous arrived in Malawi, he found an entire congregation sharing a single Bible. He exchanged 100 new Bibles for that one worn copy — and the vision of Hope Builders Ministries was born.
              </p>
              <p className="font-body text-text mt-4 leading-relaxed">
                What began in 1984 as a calling to address pastor shortages in Mozambique has grown into a movement spanning eight African nations and three countries in South Asia — equipping thousands of indigenous leaders to reach their own people with the Gospel.
              </p>
              <blockquote className="mt-8 border-l-4 border-gold pl-6">
                <p className="font-heading text-lg text-navy italic leading-snug">
                  &ldquo;Equipping the saints for the work of ministry, for building up the body of Christ.&rdquo;
                </p>
                <cite className="block font-body text-sm text-text-muted mt-2 not-italic">Ephesians 4:12</cite>
              </blockquote>
              <Link href="/about" className="inline-block mt-8 font-body text-sm font-semibold text-gold hover:text-gold/80 transition-colors">
                Read the full story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Programs Overview */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <span className="font-body text-xs text-gold uppercase tracking-widest font-semibold">What We Do</span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy mt-3">Programs &amp; Initiatives</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <div key={program.title} className="flex flex-col gap-4 p-8 border border-divider rounded-lg hover:border-gold/40 hover:shadow-sm transition-all">
                <div className="text-gold">{program.icon}</div>
                <h3 className="font-heading font-semibold text-lg text-navy">{program.title}</h3>
                <p className="font-body text-sm text-text leading-relaxed">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Trust Bar */}
      <section className="bg-surface border-y border-divider">
        <div className="max-w-[1200px] mx-auto px-6 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-center">
            {[
              { value: "1984", label: "Founded" },
              { value: "501(c)(3)", label: "Registered Nonprofit" },
              { value: "ECFA", label: "Accredited Member" },
              { value: "100%", label: "Tax Deductible" },
            ].map((item, i, arr) => (
              <div key={item.label} className="contents">
                <div className="flex flex-col gap-1">
                  <span className="font-heading font-bold text-2xl text-navy">{item.value}</span>
                  <span className="font-body text-xs text-text-muted uppercase tracking-widest">{item.label}</span>
                </div>
                {i < arr.length - 1 && <div className="hidden sm:block w-px h-10 bg-divider" />}
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
