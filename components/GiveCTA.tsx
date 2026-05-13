import Link from "next/link";

interface GiveCTAProps {
  heading?: string;
  subtext?: string;
  buttonLabel?: string;
  href?: string;
}

export default function GiveCTA({
  heading = "Partner With Us",
  subtext = "Every gift advances the Gospel — equipping pastors, distributing Bibles, and planting churches in Africa and Asia.",
  buttonLabel = "Give Now",
  href = "/give",
}: GiveCTAProps) {
  return (
    <section className="bg-navy text-white">
      <div className="max-w-[1200px] mx-auto px-6 py-20 text-center">
        <h2 className="font-heading font-bold text-3xl md:text-4xl leading-tight">
          {heading}
        </h2>
        <p className="font-body text-lg text-white/75 mt-5 max-w-xl mx-auto leading-relaxed">
          {subtext}
        </p>
        <Link
          href={href}
          className="inline-block mt-8 font-body font-semibold text-base bg-gold text-white px-10 py-4 rounded hover:bg-gold/90 transition-colors"
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
