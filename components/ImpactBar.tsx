interface Stat {
  value: string;
  label: string;
}

const defaultStats: Stat[] = [
  { value: "600K+", label: "Bibles Distributed" },
  { value: "25,000", label: "Pastors Trained" },
  { value: "11,000", label: "Village Churches" },
  { value: "4,000+", label: "Churches in Asia" },
];

interface ImpactBarProps {
  stats?: Stat[];
  dark?: boolean;
}

export default function ImpactBar({ stats = defaultStats, dark = true }: ImpactBarProps) {
  return (
    <section className={dark ? "bg-navy text-white" : "bg-surface text-navy"}>
      <div className="max-w-[1200px] mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2">
              <span
                className={`font-heading font-bold text-4xl md:text-5xl ${
                  dark ? "text-gold" : "text-navy"
                }`}
              >
                {stat.value}
              </span>
              <span
                className={`font-body text-sm uppercase tracking-widest font-medium ${
                  dark ? "text-white/70" : "text-text-muted"
                }`}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
