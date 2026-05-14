import Link from "next/link";

interface GiveCTAProps {
  heading?: string;
  subtext?: string;
  buttonLabel?: string;
  href?: string;
  showTrustLine?: boolean;
}

export default function GiveCTA({
  heading = "Partner With Us",
  subtext = "Every gift advances the Gospel by equipping pastors, distributing Bibles, and planting churches across Africa and Asia.",
  buttonLabel = "Give Now",
  href = "/give",
  showTrustLine = true,
}: GiveCTAProps) {
  return (
    <section
      className="relative text-white border-t-2 border-gold/60"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(200,151,58,0.10) 0%, rgba(15,32,60,0) 65%), #0f2040",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 py-16 md:py-20 flex justify-center">
        <div className="w-full max-w-[860px] border border-white/20 rounded-2xl bg-white/5 px-10 md:px-16 py-14 text-center">
          <span className="font-body text-sm text-gold uppercase tracking-widest font-semibold">
            Join the Mission
          </span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mt-4">
            {heading}
          </h2>
          <p className="font-body text-xl md:text-2xl text-white/75 mt-6 max-w-2xl mx-auto leading-relaxed">
            {subtext}
          </p>
          <Link
            href={href}
            className="inline-flex items-center justify-center mt-7 font-body font-semibold text-base bg-gold text-white px-10 py-4 rounded-full hover:bg-gold/90 transition-colors shadow-lg shadow-black/30"
          >
            {buttonLabel}
          </Link>
          {showTrustLine && (
            <p className="font-body text-sm text-white/35 mt-5 tracking-wide">
              501(c)(3) Nonprofit &middot; ECFA Accredited &middot; 100% Tax Deductible
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
