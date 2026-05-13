import type { Metadata } from "next";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "Give — Hope Builders Ministries",
  description:
    "Support Hope Builders Ministries. Give to the General Fund, a specific project, a country, or a team member. All gifts are tax deductible.",
};

const pathways = [
  {
    title: "General Fund",
    description:
      "Your gift goes where it's needed most — funding pastor training, Bible distribution, and church planting across Africa and Asia.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    // Replace with actual Virtuous giving URL
    href: "#",
  },
  {
    title: "Give to a Project",
    description:
      "Direct your gift to a specific initiative — Pastor Training, Bibles for Disciples, the Dignity Project, or another program close to your heart.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    href: "#",
  },
  {
    title: "Give to a Country",
    description:
      "Support the work in a specific nation — choose from any of HBM's eight African nations or three South Asian countries.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
    href: "#",
  },
  {
    title: "Give to a Team Member",
    description:
      "Support an HBM team member directly — funding their ministry and the work they're doing on the ground.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
    href: "#",
  },
];

export default function GivePage() {
  return (
    <>
      <Hero
        title="Your Gift Advances the Gospel"
        subtitle="Every dollar equips an indigenous pastor, places a Bible in someone's hands, or helps plant a village church."
        imageLabel="Give — ministry photography"
      />

      {/* Giving Pathways */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <span className="font-body text-xs text-gold uppercase tracking-widest font-semibold">How to Give</span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy mt-3">Choose Your Giving Path</h2>
            <p className="font-body text-text mt-4 max-w-xl mx-auto leading-relaxed">
              Whether you want to give broadly or direct your gift to a specific place or purpose, we make it easy.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {pathways.map((pathway) => (
              <a
                key={pathway.title}
                href={pathway.href}
                className="group flex flex-col gap-5 p-8 border border-divider rounded-lg hover:border-gold hover:shadow-md transition-all"
              >
                <div className="text-gold">{pathway.icon}</div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-navy group-hover:text-gold transition-colors">
                    {pathway.title}
                  </h3>
                  <p className="font-body text-sm text-text mt-2 leading-relaxed">{pathway.description}</p>
                </div>
                <span className="font-body text-sm font-semibold text-gold flex items-center gap-2 mt-auto">
                  Give Now
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Give by Check */}
      <section className="bg-surface border-y border-divider">
        <div className="max-w-[1200px] mx-auto px-6 py-14">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-heading font-bold text-2xl text-navy">Give by Check</h3>
            <p className="font-body text-text mt-4 leading-relaxed">
              Make checks payable to <strong>Hope Builders Ministries</strong> and mail to:
            </p>
            <address className="font-body text-text not-italic mt-4 leading-relaxed">
              PO Box 317<br />
              Greenwood, VA 22943
            </address>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-3 p-8 border border-divider rounded-lg">
              <span className="font-heading font-bold text-2xl text-navy">501(c)(3)</span>
              <p className="font-body text-sm text-text leading-relaxed">
                Hope Builders Ministries is a registered 501(c)(3) nonprofit. All gifts are tax deductible to the fullest extent allowed by law.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 p-8 border border-divider rounded-lg">
              <span className="font-heading font-bold text-2xl text-navy">ECFA</span>
              <p className="font-body text-sm text-text leading-relaxed">
                We are an accredited member of the Evangelical Council for Financial Accountability, committed to transparency and financial integrity.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 p-8 border border-divider rounded-lg">
              <span className="font-heading font-bold text-2xl text-navy">Donor Portal</span>
              <p className="font-body text-sm text-text leading-relaxed">
                Existing donors can log in to view giving history, update information, and manage recurring gifts.
              </p>
              {/* Replace with actual Virtuous donor portal URL */}
              <a href="#" className="font-body text-sm font-semibold text-gold hover:text-gold/80 transition-colors">
                Donor Login →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
