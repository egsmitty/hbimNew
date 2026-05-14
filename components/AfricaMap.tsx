const countries = [
  { name: "Uganda", x: 148, y: 152 },
  { name: "Kenya", x: 170, y: 148 },
  { name: "Tanzania", x: 162, y: 172 },
  { name: "Zambia", x: 136, y: 186 },
  { name: "Malawi", x: 162, y: 190 },
  { name: "Mozambique", x: 168, y: 202 },
  { name: "Zimbabwe", x: 142, y: 200 },
  { name: "South Africa", x: 122, y: 224 },
];

// Label anchor: put label to the left for western countries, right for eastern
const labelConfig: Record<string, { anchor: "start" | "end"; dx: number }> = {
  Uganda:       { anchor: "end",   dx: -10 },
  Kenya:        { anchor: "start", dx: 10 },
  Tanzania:     { anchor: "start", dx: 10 },
  Zambia:       { anchor: "end",   dx: -10 },
  Malawi:       { anchor: "start", dx: 10 },
  Mozambique:   { anchor: "start", dx: 10 },
  Zimbabwe:     { anchor: "end",   dx: -10 },
  "South Africa": { anchor: "end", dx: -10 },
};

export default function AfricaMap() {
  return (
    <div className="bg-navy rounded-xl overflow-hidden p-6 flex flex-col gap-3">
      <p className="font-body text-sm text-gold uppercase tracking-widest font-semibold text-center">
        HBM Partner Nations
      </p>
      <svg
        viewBox="0 0 220 260"
        className="w-full max-w-[320px] mx-auto"
        aria-label="Map of Africa highlighting the 8 HBM partner nations"
        role="img"
      >
        {/* Africa continent outline */}
        <path
          d="M 48 14 L 95 8 L 140 10 L 162 20 L 172 38 L 176 58 L 182 80 L 194 102 L 178 130 L 168 165 L 154 200 L 140 228 L 118 242 L 96 236 L 72 214 L 50 180 L 30 147 L 14 114 L 10 88 L 16 62 L 22 38 Z"
          fill="rgba(255,255,255,0.05)"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Country dots + labels */}
        {countries.map((country) => {
          const cfg = labelConfig[country.name];
          return (
            <g key={country.name}>
              {/* Outer ring */}
              <circle cx={country.x} cy={country.y} r={7} fill="rgba(200,151,58,0.25)" />
              {/* Inner dot */}
              <circle cx={country.x} cy={country.y} r={3.5} fill="#C8973A" />
              {/* Label */}
              <text
                x={country.x + cfg.dx}
                y={country.y + 1}
                textAnchor={cfg.anchor}
                dominantBaseline="middle"
                fontSize="7.5"
                fontFamily="sans-serif"
                fill="rgba(255,255,255,0.85)"
                fontWeight="600"
              >
                {country.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend count */}
      <p className="font-body text-xs text-white/50 text-center">
        8 nations · Eastern &amp; Southern Africa
      </p>
    </div>
  );
}
