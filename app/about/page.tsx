import type { Metadata } from "next";
import Image from "next/image";
import Hero from "@/components/Hero";
import GiveCTA from "@/components/GiveCTA";

export const metadata: Metadata = {
  title: "About — Hope Builders Ministries",
  description:
    "Learn the story of Hope Builders Ministries — from a 1984 calling in Mozambique to a global movement equipping pastors and planting churches across Africa and Asia.",
};

const timeline = [
  { year: "1984", event: "Four men receive a calling while working with Open Doors in Southern Africa. The Timothy Project is born to address pastor shortages in Mozambique — then the poorest country in the world, ravaged by civil war, its pastors specifically targeted.", milestone: true },
  { year: "1990", event: "The Timothy Training Institute is formally established, beginning decades of pastoral education.", milestone: false },
  { year: "2001", event: "HBM establishes its 11,000th village church across eight African nations through indigenous partnerships.", milestone: false },
  { year: "2002", event: "Johan Gous joins the ministry, bringing renewed vision and leadership to the work in Africa.", milestone: false },
  { year: "2010", event: "Johan Gous becomes President of Hope Builders Ministries, headquartered in Charlottesville, Virginia.", milestone: false },
  { year: "2013", event: "HBM expands into Asia — coordinating pastor training and discipleship across 4,000+ churches in India, Pakistan, and Bangladesh.", milestone: true },
];

const threeEs = [
  {
    letter: "E",
    word: "Equip",
    description: "Providing indigenous pastors and church leaders with theology, leadership training, Bibles in native languages, and the practical tools they need for ministry.",
  },
  {
    letter: "E",
    word: "Empower",
    description: "Empowering local believers — those who already know the language, culture, and community — to reach their own people in ways that no outsider ever could.",
  },
  {
    letter: "E",
    word: "Encourage",
    description: "Walking alongside leaders for the long haul, encouraging one another to grow to maturity and multiply disciples generation after generation.",
  },
];

const beliefs = [
  "The Bible is the inspired and only infallible and authoritative Word of God.",
  "Jesus Christ has paid the penalty of sin for all mankind by dying in man's place.",
  "We believe in one God, eternally existing in three persons: Father, Son, and Holy Spirit.",
  "We believe in the bodily resurrection of Jesus Christ and His ascension to the right hand of the Father.",
  "We believe that salvation is by grace alone, through faith alone, in Christ alone.",
  "We believe in the Great Commission — the call of every believer to make disciples of all nations.",
];

const programs = [
  {
    title: "Pastor Training Program",
    description: "A rigorous three-year curriculum equipping indigenous pastors with theology, leadership, and practical ministry skills. Over 25,000 graduates have planted and led village churches across Africa and Asia.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
  },
  {
    title: "Timothy Training Institute",
    description: "Established in 1990, the TTI has trained 13,000+ students in foundational ministry. It remains a cornerstone of HBM's long-term discipleship strategy.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    title: "Bibles for Disciples",
    description: "Nearly 600,000 Bibles distributed in native languages. Every pastor trained receives their own copy of God's Word — often for the first time.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    title: "Disciple Makers Program",
    description: "A congregation-wide initiative that moves beyond pastoral training to equip entire churches for spiritual multiplication and community transformation.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
  {
    title: "Dignity Project",
    description: "Holistic care for orphans and widows — combining practical skills training with spiritual formation to restore dignity and self-sufficiency.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
  },
  {
    title: "Prison Ministry",
    description: "HBM partners with chaplains and church leaders to bring discipleship into correctional facilities. Working in 13 prisons in Mozambique, the program has documented an 80% improvement in prison culture and inmate wellbeing.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    title: "U.S. Conferences",
    description: "HBM hosts and participates in conferences across the United States, equipping American Christians to become disciple-makers and deepening the partnership between Western donors and indigenous field leaders.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
  {
    title: "Emergency Medical Fund",
    description: "A dedicated fund providing emergency medical assistance to indigenous missionaries and field partners who face life-threatening health needs with no access to standard healthcare.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    title: "Practical Support",
    description: "Bicycles, motorcycles, seeds, garden tools, and water wells — meeting the practical needs that allow pastors to reach remote communities and serve their congregations.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
      </svg>
    ),
  },
];

const team = [
  {
    name: "Johan Gous",
    title: "Founder & President (2010–2025)",
    imageSeed: "hbm-team-jg",
    bio: "Johan joined HBM in 2002 and served as President from 2010 until his passing on May 27, 2025. His vision — forged in the fields of Malawi — shaped HBM's strategy of equipping indigenous leaders rather than importing Western models. His legacy endures in every pastor trained and every church planted.",
  },
  {
    name: "Lawrence Gunnells",
    title: "President",
    imageSeed: "hbm-team-lg",
    email: "lawrence@hbmin.org",
    bio: "Lawrence now serves as President of Hope Builders Ministries, carrying forward the vision and strategy that has built a global movement of indigenous church leaders across Africa and Asia.",
  },
  {
    name: "Jeff Hawkins",
    title: "Team Member",
    imageSeed: "hbm-team-jh",
    email: "jeff@hbmin.org",
    bio: "Jeff serves on the HBM team, helping advance the ministry's mission in Africa and Asia.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Hero
        title="Forty Years of Advancing the Gospel"
        subtitle="A story of faithfulness, partnership, and the unstoppable power of the local church."
        imageSrc="https://picsum.photos/seed/hbm-about/1920/1080"
        imageAlt="A large community gathering representing HBM's global reach"
      />

      {/* Mission + Vision */}
      <section id="mission" className="bg-[#F8F7F5] border-t border-[#C8C0B4]">
        <div className="max-w-[1440px] mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-body text-sm text-gold uppercase tracking-widest font-semibold">
                Our Mission
              </span>
              <h2 className="font-heading font-bold text-4xl md:text-5xl text-navy mt-3 leading-tight">
                Advancing the Gospel Through the Great Commission
              </h2>
              <p className="font-body text-lg text-text mt-6 leading-relaxed">
                Hope Builders Ministries exists to equip indigenous leaders — pastors, teachers, and church planters — with the training, Bibles, and resources they need to reach their own communities with the Gospel of Jesus Christ.
              </p>
              <p className="font-body text-lg text-text mt-4 leading-relaxed">
                We work in Africa, South Asia, and the United States, always through the local church, always through indigenous leadership.
              </p>
            </div>
            <div className="bg-navy rounded-lg p-10 flex flex-col justify-center">
              <blockquote>
                <p className="font-heading text-xl text-white italic leading-snug">
                  &ldquo;To equip the saints for the work of ministry, for building up the body of Christ, until we all attain to the unity of the faith.&rdquo;
                </p>
                <cite className="block font-body text-sm text-gold mt-4 not-italic font-semibold">
                  Ephesians 4:12–13
                </cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* What We Believe */}
      <section id="beliefs" className="bg-white">
        <div className="max-w-[1440px] mx-auto px-6 py-24">
          <div className="text-center mb-12">
            <span className="font-body text-sm text-gold uppercase tracking-widest font-semibold">Foundation</span>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-navy mt-3">What We Believe</h2>
          </div>
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
            {beliefs.map((belief, i) => (
              <div key={i} className="bg-white rounded-lg p-8 border border-divider flex gap-4 items-start">
                <span className="shrink-0 w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center mt-0.5">
                  <span className="font-heading font-bold text-sm text-gold">{i + 1}</span>
                </span>
                <p className="font-body text-lg text-text leading-relaxed">{belief}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 py-24">
          <div className="text-center mb-14">
            <span className="font-body text-sm text-gold uppercase tracking-widest font-semibold">History</span>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-navy mt-3">Our Journey</h2>
          </div>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-10 top-0 bottom-0 w-px bg-navy/20" />
            <div className="flex flex-col gap-0">
              {timeline.map((item) => (
                <div key={item.year} className="relative pl-28 pb-10">
                  <div className={`absolute left-0 top-0 flex items-center justify-center shrink-0 rounded-full ${
                    item.milestone
                      ? "w-20 h-20 bg-gold"
                      : "w-20 h-20 bg-white border-2 border-navy/20"
                  }`}>
                    <span className={`font-heading font-bold leading-none -translate-y-0.5 ${
                      item.milestone ? "text-white text-2xl" : "text-navy text-xl"
                    }`}>
                      {item.year}
                    </span>
                  </div>
                  <div className={`pt-2 ${item.milestone ? "pl-2" : ""}`}>
                    {item.milestone && (
                      <span className="inline-block font-body text-sm text-gold uppercase tracking-widest font-semibold mb-1">
                        Milestone
                      </span>
                    )}
                    <p className={`font-body leading-relaxed ${
                      item.milestone ? "text-navy font-semibold text-lg" : "text-text text-base"
                    }`}>
                      {item.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Three E's */}
      <section id="threeEs" className="bg-white">
        <div className="max-w-[1440px] mx-auto px-6 py-24">
          <div className="text-center mb-14">
            <span className="font-body text-sm text-gold uppercase tracking-widest font-semibold">Our Approach</span>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-navy mt-3">The Three E&rsquo;s</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {threeEs.map((item) => (
              <div key={item.word} className="bg-white rounded-lg p-10 border border-divider flex flex-col gap-5">
                <h3 className="font-heading font-bold text-navy leading-none">
                  <span className="font-heading font-bold italic text-[5.5rem] text-gold leading-none pr-2">{item.word[0]}</span>
                  <span className="font-heading font-bold text-4xl md:text-5xl">{item.word.slice(1)}</span>
                </h3>
                <p className="font-body text-lg text-text leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="bg-navy">
        <div className="max-w-[1440px] mx-auto px-6 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <span className="font-body text-sm text-gold uppercase tracking-widest font-semibold">Where We Are Headed</span>
            <blockquote className="mt-8">
              <p className="font-heading text-2xl md:text-3xl font-medium text-white italic leading-relaxed">
                &ldquo;Hope Builders Ministries&rsquo; vision is to equip, encourage and empower Christian leaders in the Word of God, enabling them to better enlist their congregations to the Great Commission mission, making disciples in their communities and beyond as they share the Gospel of Grace and then encouraging one another to grow to maturity.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Programs Detail */}
      <section id="programs" className="bg-white">
        <div className="max-w-[1440px] mx-auto px-6 py-24">
          <div className="text-center mb-12">
            <span className="font-body text-sm text-gold uppercase tracking-widest font-semibold">What We Do</span>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-navy mt-3">Programs &amp; Initiatives</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <div key={program.title} className="flex flex-col gap-5 p-9 bg-white border border-divider rounded-lg hover:border-gold/40 hover:shadow-sm transition-all">
                <div className="text-gold">{program.icon}</div>
                <h3 className="font-heading font-semibold text-xl text-navy">{program.title}</h3>
                <p className="font-body text-lg text-text leading-relaxed">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 py-24">
          <div className="text-center mb-12">
            <span className="font-body text-sm text-gold uppercase tracking-widest font-semibold">The People</span>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-navy mt-3">Our Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-lg overflow-hidden border border-divider flex flex-col">
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={`https://picsum.photos/seed/${member.imageSeed}/400/300`}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <div>
                    <h3 className="font-heading font-bold text-navy text-xl">{member.name}</h3>
                    <p className="font-body text-sm text-gold uppercase tracking-widest font-semibold mt-0.5">{member.title}</p>
                  </div>
                  <p className="font-body text-sm text-text leading-relaxed">{member.bio}</p>
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="font-body text-sm text-gold hover:text-gold/80 transition-colors mt-auto">
                      {member.email}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GiveCTA />
    </>
  );
}
