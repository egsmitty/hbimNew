import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ImpactBar from "@/components/ImpactBar";
import GiveCTA from "@/components/GiveCTA";

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

const countries = [
  {
    name: "Malawi",
    description:
      "Where the vision began. Johan Gous's exchange of 100 Bibles for one shared copy sparked the founding of HBM. Malawi remains a cornerstone of the Africa ministry.",
  },
  {
    name: "Mozambique",
    description:
      "The original focus of the Timothy Project in 1984. HBM has trained hundreds of pastors to lead churches in some of Mozambique's most remote regions.",
  },
  {
    name: "Zimbabwe",
    description:
      "Indigenous church partnerships have multiplied village congregations throughout Zimbabwe, equipped with trained pastors and native-language Bibles.",
  },
  {
    name: "Zambia",
    description:
      "HBM's work in Zambia focuses on pastor training and Disciple Makers Programs to build spiritually mature congregations.",
  },
  {
    name: "Tanzania",
    description:
      "Church planting and pastoral training continue to expand HBM's footprint across Tanzania's diverse regions.",
  },
  {
    name: "Kenya",
    description:
      "Training and resources flow through indigenous partner networks, equipping Kenyan pastors to lead and multiply their congregations.",
  },
  {
    name: "Uganda",
    description:
      "HBM supports church leadership development in Uganda, with a focus on long-term discipleship and community transformation.",
  },
  {
    name: "South Africa",
    description:
      "A strategic hub for training and resource distribution reaching into neighboring nations across Southern Africa.",
  },
];

const fieldReports = [
  {
    caption: "Pastor training graduation, Malawi — Class of local church leaders completing three years of study.",
    imageLabel: "Field photo — Malawi graduation",
  },
  {
    caption: "Bible distribution in a remote village — congregants receiving their first copy of God's Word in their own language.",
    imageLabel: "Field photo — Bible distribution",
  },
  {
    caption: "A village church service in Zimbabwe — one of over 11,000 congregations established through HBM partnerships.",
    imageLabel: "Field photo — Zimbabwe church",
  },
];

export default function AfricaPage() {
  return (
    <>
      <Hero
        title="The Church Is Rising Across Africa"
        subtitle="Eight nations. Thousands of pastors. Hundreds of thousands of Bibles. The Gospel is advancing — one village church at a time."
        ctaPrimary={{ label: "Give to Africa", href: "/give" }}
        imageLabel="Africa — field photography"
      />

      {/* Overview */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-body text-xs text-gold uppercase tracking-widest font-semibold">The Work</span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy mt-3 leading-tight">
                Indigenous Leaders. Local Churches. Lasting Impact.
              </h2>
              <p className="font-body text-text mt-6 leading-relaxed">
                HBM's strategy in Africa is simple and proven: equip the people who are already there. Rather than sending Western missionaries to do the work, we come alongside indigenous pastors — training them, resourcing them, and trusting them to reach their own communities.
              </p>
              <p className="font-body text-text mt-4 leading-relaxed">
                The result is a movement that cannot be stopped. Trained pastors train other pastors. Village churches plant more village churches. The Gospel multiplies organically, deeply rooted in local culture and language.
              </p>
            </div>
            <div className="w-full aspect-[4/3] bg-gradient-to-br from-navy/80 to-navy/50 rounded-lg flex items-center justify-center">
              <span className="font-body text-xs text-white/30 uppercase tracking-widest">Africa field photo</span>
            </div>
          </div>
        </div>
      </section>

      {/* Africa Impact Stats */}
      <ImpactBar stats={africaStats} />

      {/* Countries Grid */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <span className="font-body text-xs text-gold uppercase tracking-widest font-semibold">Where We Work</span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy mt-3">Eight African Nations</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {countries.map((country) => (
              <div key={country.name} className="p-6 border border-divider rounded-lg hover:border-gold/40 hover:shadow-sm transition-all">
                <h3 className="font-heading font-bold text-navy text-lg mb-2">{country.name}</h3>
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
        heading="Support the Work in Africa"
        subtext="Your gift equips pastors, distributes Bibles, and plants churches across eight African nations."
        buttonLabel="Give to Africa"
      />
    </>
  );
}
