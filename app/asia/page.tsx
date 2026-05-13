import type { Metadata } from "next";
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
    caption: "Pastor training in India — indigenous leaders equipped to multiply disciples across their regions.",
    imageLabel: "Field photo — India training",
  },
  {
    caption: "A new church plant in South Asia — one of over 1,000 congregations established since HBM's 2013 expansion.",
    imageLabel: "Field photo — Asia church plant",
  },
  {
    caption: "Bible distribution in Bangladesh — believers receiving God's Word in their native language for the first time.",
    imageLabel: "Field photo — Bangladesh Bibles",
  },
];

export default function AsiaPage() {
  return (
    <>
      <Hero
        title="The Gospel is Advancing Across Asia"
        subtitle="Since 2013, HBM has partnered with indigenous leaders in India, Pakistan, and Bangladesh to train pastors and plant churches."
        ctaPrimary={{ label: "Give to Asia", href: "/give" }}
        imageLabel="Asia — field photography"
      />

      {/* Overview */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="w-full aspect-[4/3] bg-gradient-to-br from-navy/80 to-navy/50 rounded-lg flex items-center justify-center">
              <span className="font-body text-xs text-white/30 uppercase tracking-widest">Asia field photo</span>
            </div>
            <div>
              <span className="font-body text-xs text-gold uppercase tracking-widest font-semibold">The Work</span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy mt-3 leading-tight">
                Reaching Asia Through Its Own People
              </h2>
              <p className="font-body text-text mt-6 leading-relaxed">
                In 2013, HBM expanded its proven model of indigenous ministry into South Asia. The same principles that built 11,000 churches in Africa are now at work across India, Pakistan, and Bangladesh — equipping local pastors to lead, disciple, and multiply.
              </p>
              <p className="font-body text-text mt-4 leading-relaxed">
                We work through established indigenous partner networks, providing training materials, Bibles in native languages, and leadership development — trusting local believers to carry the Gospel into communities that outsiders cannot reach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Asia Stats */}
      <ImpactBar stats={asiaStats} />

      {/* Countries */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <span className="font-body text-xs text-gold uppercase tracking-widest font-semibold">Where We Work</span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy mt-3">Three Nations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {countries.map((country) => (
              <div key={country.name} className="p-8 border border-divider rounded-lg hover:border-gold/40 hover:shadow-sm transition-all">
                <h3 className="font-heading font-bold text-navy text-xl mb-3">{country.name}</h3>
                <p className="font-body text-sm text-text leading-relaxed">{country.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Field Reports */}
      <section className="bg-surface">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <span className="font-body text-xs text-gold uppercase tracking-widest font-semibold">From the Field</span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy mt-3">Stories &amp; Reports</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fieldReports.map((report, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden border border-divider">
                <div className="w-full h-48 bg-gradient-to-br from-navy/80 to-navy/50 flex items-center justify-center">
                  <span className="font-body text-xs text-white/30 uppercase tracking-widest px-4 text-center">
                    {report.imageLabel}
                  </span>
                </div>
                <div className="p-6">
                  <p className="font-body text-sm text-text leading-relaxed">{report.caption}</p>
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
