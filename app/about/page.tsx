import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ImpactBar from "@/components/ImpactBar";
import GiveCTA from "@/components/GiveCTA";

export const metadata: Metadata = {
  title: "About — Hope Builders Ministries",
  description:
    "Learn the story of Hope Builders Ministries — from a 1984 calling in Mozambique to a global movement equipping pastors and planting churches across Africa and Asia.",
};

const timeline = [
  { year: "1984", event: "Four men receive a calling while working with Open Doors in Southern Africa. The Timothy Project is born to address pastor shortages in Mozambique." },
  { year: "1990", event: "The Timothy Training Institute is formally established, beginning decades of pastoral education." },
  { year: "2001", event: "HBM establishes its 11,000th village church across eight African nations through indigenous partnerships." },
  { year: "2002", event: "Johan Gous joins the ministry, bringing renewed vision and leadership to the work in Africa." },
  { year: "2010", event: "Johan Gous becomes President of Hope Builders Ministries, headquartered in Charlottesville, Virginia." },
  { year: "2013", event: "HBM expands into Asia — coordinating pastor training and discipleship across 4,000+ churches in India, Pakistan, and Bangladesh." },
];

const programs = [
  {
    title: "Pastor Training Program",
    description:
      "A rigorous three-year curriculum equipping indigenous pastors with theology, leadership, and practical ministry skills. Over 25,000 graduates have planted and led village churches across Africa and Asia.",
  },
  {
    title: "Timothy Training Institute",
    description:
      "Established in 1990, the TTI has trained 13,000+ students in foundational ministry. It remains a cornerstone of HBM's long-term discipleship strategy.",
  },
  {
    title: "Bibles for Disciples",
    description:
      "Nearly 600,000 Bibles distributed in native languages. Every pastor trained receives their own copy of God's Word — often for the first time.",
  },
  {
    title: "Disciple Makers Program",
    description:
      "A congregation-wide initiative that moves beyond pastoral training to equip entire churches for spiritual multiplication and community transformation.",
  },
  {
    title: "Dignity Project",
    description:
      "Holistic care for orphans and widows — combining practical skills training with spiritual formation to restore dignity and self-sufficiency.",
  },
  {
    title: "Practical Support",
    description:
      "Bicycles, motorcycles, seeds, garden tools, and water wells — meeting the practical needs that allow pastors to reach remote communities and serve their congregations.",
  },
];

const team = [
  {
    name: "Johan Gous",
    title: "President",
    bio: "Johan joined HBM in 2002 and has served as President since 2010. His vision — forged in the fields of Malawi — has shaped HBM's strategy of equipping indigenous leaders rather than importing Western models.",
  },
  {
    name: "Lawrence Gunnells",
    title: "Team Member",
    email: "lawrence@hbmin.org",
    bio: "Lawrence serves on the HBM team, supporting ministry partnerships and donor relations.",
  },
  {
    name: "Jeff Hawkins",
    title: "Team Member",
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
        imageLabel="About — field photography"
      />

      {/* Mission + Vision */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <span className="font-body text-xs text-gold uppercase tracking-widest font-semibold">
                Our Mission
              </span>
              <h2 className="font-heading font-bold text-3xl text-navy mt-3 leading-tight">
                Advancing the Gospel Through the Great Commission
              </h2>
              <p className="font-body text-text mt-6 leading-relaxed">
                Hope Builders Ministries exists to equip indigenous leaders — pastors, teachers, and church planters — with the training, Bibles, and resources they need to reach their own communities with the Gospel of Jesus Christ.
              </p>
              <p className="font-body text-text mt-4 leading-relaxed">
                We work in Africa, South Asia, and the United States, always through the local church, always through indigenous leadership.
              </p>
            </div>
            <div className="bg-surface rounded-lg p-10 flex flex-col justify-center">
              <blockquote>
                <p className="font-heading text-xl text-navy italic leading-snug">
                  &ldquo;To equip the saints for the work of ministry, for building up the body of Christ, until we all attain to the unity of the faith.&rdquo;
                </p>
                <cite className="block font-body text-sm text-text-muted mt-4 not-italic font-semibold">
                  Ephesians 4:12–13
                </cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-surface">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <span className="font-body text-xs text-gold uppercase tracking-widest font-semibold">History</span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy mt-3">Our Journey</h2>
          </div>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-divider" />
            <div className="flex flex-col gap-10">
              {timeline.map((item) => (
                <div key={item.year} className="relative pl-16">
                  <div className="absolute left-0 top-1 w-12 h-12 bg-navy rounded-full flex items-center justify-center shrink-0">
                    <span className="font-heading text-gold text-xs font-bold">{item.year}</span>
                  </div>
                  <p className="font-body text-text leading-relaxed">{item.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <ImpactBar />

      {/* Programs Detail */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <span className="font-body text-xs text-gold uppercase tracking-widest font-semibold">What We Do</span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy mt-3">Programs &amp; Initiatives</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program) => (
              <div key={program.title} className="p-8 border border-divider rounded-lg">
                <h3 className="font-heading font-semibold text-xl text-navy mb-3">{program.title}</h3>
                <p className="font-body text-text text-sm leading-relaxed">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-surface">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <span className="font-body text-xs text-gold uppercase tracking-widest font-semibold">The People</span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy mt-3">Our Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-lg p-8 border border-divider flex flex-col gap-4">
                <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center">
                  <span className="font-heading font-bold text-navy text-xl">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-navy text-lg">{member.name}</h3>
                  <p className="font-body text-xs text-gold uppercase tracking-widest font-semibold mt-0.5">{member.title}</p>
                </div>
                <p className="font-body text-sm text-text leading-relaxed">{member.bio}</p>
                {member.email && (
                  <a href={`mailto:${member.email}`} className="font-body text-sm text-gold hover:text-gold/80 transition-colors">
                    {member.email}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <GiveCTA />
    </>
  );
}
