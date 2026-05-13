import type { Metadata } from "next";
import Image from "next/image";
import Hero from "@/components/Hero";
import ImpactBar from "@/components/ImpactBar";
import GiveCTA from "@/components/GiveCTA";

export const metadata: Metadata = {
  title: "Asia — Hope Builders Ministries",
  description:
    "HBM's Asia ministry coordinates pastor training and discipleship across 4,000+ churches in India, Pakistan, and Bangladesh.",
};

const asiaStats = [
  { value: "3", label: "Nations Reached" },
  { value: "4,000+", label: "Partner Churches" },
  { value: "1,000+", label: "New Churches Planted" },
  { value: "2013", label: "Year Expansion Began" },
];

const countries = [
  {
    name: "India",
    description:
      "The largest field of HBM's Asia work. Over 4,000 partner churches receive pastor training, discipleship materials, and Bibles. New churches continue to be planted across India's diverse regions.",
  },
  {
    name: "Pakistan",
    description:
      "In one of the world's most challenging mission fields, HBM supports indigenous believers and church leaders with training and resources to advance the Gospel with wisdom and courage.",
  },
  {
    name: "Bangladesh",
    description:
      "HBM coordinates discipleship and church planting partnerships in Bangladesh, equipping local leaders to reach their communities with the transforming message of Christ.",
  },
];

const fieldReports = [
  {
    title: "Training Day in India",
    caption: "Indigenous pastors equipped to multiply disciples across their regions — one of 4,000+ partner churches strengthened by HBM.",
    seed: "hbm-asia-field1",
  },
  {
    title: "A Church Is Born",
    caption: "A new congregation established in South Asia — one of over 1,000 churches planted since HBM's 2013 expansion.",
    seed: "hbm-asia-field2",
  },
  {
    title: "First Bibles in Bangladesh",
    caption: "Believers receiving God's Word in their native language — some holding a Bible for the very first time.",
    seed: "hbm-asia-field3",
  },
];

export default function AsiaPage() {
  return (
    <>
      <Hero
        title="The Gospel is Advancing Across Asia"
        subtitle="Since 2013, HBM has partnered with indigenous leaders in India, Pakistan, and Bangladesh to train pastors and plant churches."
        ctaPrimary={{ label: "Give to Asia", href: "/give" }}
        imageSrc="https://picsum.photos/seed/hbm-asia/1920/1080"
        imageAlt="Community gathering in South Asia"
      />

      {/* Overview — split with large portrait image */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-body text-xs text-gold uppercase tracking-widest font-semibold">The Work</span>
              <h2 className="font-heading font-bold text-4xl md:text-5xl text-navy mt-3 leading-tight">
                Reaching Asia<br />Through Its<br />Own People.
              </h2>
              <p className="font-body text-base text-text mt-6 leading-relaxed">
                In 2013, HBM expanded its proven model of indigenous ministry into South Asia. The same principles that built 11,000 churches in Africa are now at work across India, Pakistan, and Bangladesh — equipping local pastors to lead, disciple, and multiply.
              </p>
              <p className="font-body text-base text-text mt-4 leading-relaxed">
                We work through established indigenous partner networks, providing training materials, Bibles in native languages, and leadership development — trusting local believers to carry the Gospel into communities that outsiders cannot reach.
              </p>
            </div>
            <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://picsum.photos/seed/hbm-asia2/800/1000"
                alt="Indigenous pastor in South Asia"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Asia Impact Stats */}
      <ImpactBar stats={asiaStats} />

      {/* Countries — editorial list layout */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-24">
          <div className="mb-16">
            <span className="font-body text-xs text-gold uppercase tracking-widest font-semibold">Where We Work</span>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-navy mt-3">Three Nations</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
            {countries.map((country, i) => (
              <div key={country.name} className="flex gap-6 py-8 border-b border-divider">
                {/* Number accent */}
                <div className="shrink-0 w-10 text-right">
                  <span className="font-heading font-bold text-3xl text-gold/30 leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                {/* Content */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-heading font-bold text-xl text-navy">{country.name}</h3>
                  <p className="font-body text-base text-text leading-relaxed">{country.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Field Reports — large portrait cards with overlay text */}
      <section className="bg-surface">
        <div className="max-w-[1200px] mx-auto px-6 py-24">
          <div className="mb-14">
            <span className="font-body text-xs text-gold uppercase tracking-widest font-semibold">From the Field</span>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-navy mt-3">Stories &amp; Reports</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fieldReports.map((report, i) => (
              <div key={i} className="group relative rounded-lg overflow-hidden">
                {/* Large portrait image */}
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
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/30 to-transparent" />
                  {/* Text overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <span className="block font-body text-xs text-gold uppercase tracking-widest font-semibold mb-2">
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
        heading="Support the Work in Asia"
        subtext="Your gift trains pastors and plants churches across India, Pakistan, and Bangladesh."
        buttonLabel="Give to Asia"
      />
    </>
  );
}
