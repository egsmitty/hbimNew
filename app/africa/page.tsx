import type { Metadata } from "next";
import Image from "next/image";
import Hero from "@/components/Hero";
import ImpactBar from "@/components/ImpactBar";
import GiveCTA from "@/components/GiveCTA";
import CinematicGlobe from "@/components/CinematicGlobe";

export const metadata: Metadata = {
  title: "Africa — Hope Builders Ministries",
  description:
    "Discover HBM's work across eight African nations — 11,000 village churches planted, 25,000 pastors trained, and hundreds of thousands of Bibles distributed.",
};

const africaStats = [
  { value: "8", label: "Nations Reached" },
  { value: "11,000", label: "Village Churches" },
  { value: "25,000", label: "Trained Pastors" },
  { value: "600K+", label: "Bibles Distributed" },
];

const fieldReports = [
  {
    title: "Graduation Day in Malawi",
    caption: "Pastors completing three years of training — equipped to lead and multiply village churches.",
    seed: "hbm-africa-field1",
  },
  {
    title: "First Bibles in Their Hands",
    caption: "Congregants receive their first copy of God's Word in their own language — some for the very first time.",
    seed: "hbm-africa-field2",
  },
  {
    title: "The Church Is Rising",
    caption: "A village church service in Zimbabwe — one of over 11,000 congregations established through HBM partnerships.",
    seed: "hbm-africa-field3",
  },
];

export default function AfricaPage() {
  return (
    <>
      <Hero
        title="The Church Is Rising Across Africa"
        subtitle="Eight nations. Thousands of pastors. Hundreds of thousands of Bibles. The Gospel is advancing — one village church at a time."
        ctaPrimary={{ label: "Give to Africa", href: "/give" }}
        imageSrc="https://picsum.photos/seed/hbm-africa/1920/1080"
        imageAlt="Church community gathered in rural Africa"
      />

      {/* Overview — split with large image */}
      <section id="overview" className="bg-[#F8F7F5] border-t border-[#C8C0B4]">
        <div className="max-w-[1440px] mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-body text-sm text-gold uppercase tracking-widest font-semibold">The Strategy</span>
              <h2 className="font-heading font-bold text-4xl md:text-5xl text-navy mt-3 leading-tight">
                Indigenous Leaders.<br />Local Churches.<br />Lasting Impact.
              </h2>
              <p className="font-body text-base text-text mt-6 leading-relaxed">
                HBM's strategy in Africa is simple and proven: equip the people who are already there. Rather than sending Western missionaries to do the work, we come alongside indigenous pastors — training them, resourcing them, and trusting them to reach their own communities.
              </p>
              <p className="font-body text-base text-text mt-4 leading-relaxed">
                The result is a movement that cannot be stopped. Trained pastors train other pastors. Village churches plant more village churches. The Gospel multiplies organically, deeply rooted in local culture and language.
              </p>
            </div>
            <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://picsum.photos/seed/hbm-africa2/800/1000"
                alt="Indigenous pastor leading a community in Africa"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Africa Impact Stats */}
      <ImpactBar stats={africaStats} />

      {/* Interactive Globe */}
      <section id="map" className="bg-[#050a14]">
        <div className="max-w-[1440px] mx-auto px-6 py-16">
          <div className="mb-10 text-center">
            <span className="font-body text-sm text-gold uppercase tracking-widest font-semibold">
              Interactive Map
            </span>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-white mt-3">
              Where God Has Led Us
            </h2>
            <p className="font-body text-base text-white/60 mt-3">
              Eight nations. Thousands of pastors. Hundreds of thousands of Bibles.
            </p>
            <p className="font-body text-sm text-white/40 mt-4 tracking-wide">
              8 Nations &nbsp;·&nbsp; 11,000 Village Churches &nbsp;·&nbsp; 25,000 Trained Pastors &nbsp;·&nbsp; 600K+ Bibles Distributed
            </p>
          </div>

          <div
            className="mx-auto max-w-[1300px] rounded-2xl border border-navy/60 overflow-hidden"
            style={{ height: '700px', background: '#050a14' }}
          >
            <CinematicGlobe region="africa" />
          </div>
        </div>
      </section>

      {/* Field Reports — large portrait cards with overlay text */}
      <section id="reports" className="bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 py-24">
          <div className="mb-14">
            <span className="font-body text-sm text-gold uppercase tracking-widest font-semibold">From the Field</span>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-navy mt-3">Stories &amp; Reports</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fieldReports.map((report, i) => (
              <div key={i} className="group relative rounded-lg overflow-hidden">
                <div className="relative w-full h-[420px] overflow-hidden">
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                    <Image
                      src={`https://picsum.photos/seed/${report.seed}/600/800`}
                      alt={report.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <span className="block font-body text-sm text-gold uppercase tracking-widest font-semibold mb-2">
                      Field Report
                    </span>
                    <h3 className="font-heading font-bold text-white text-xl leading-snug mb-2">
                      {report.title}
                    </h3>
                    <p className="font-body text-sm text-white/70 leading-relaxed">
                      {report.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GiveCTA
        heading="Support the Work in Africa"
        subtext="Your gift equips pastors, distributes Bibles, and plants churches across eight African nations."
        buttonLabel="Give to Africa"
      />
    </>
  );
}
