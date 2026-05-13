'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

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

function parseNumber(value: string): { num: number; suffix: string } | null {
  const match = value.match(/^([\d,]+)(K\+|\+|K)?$/)
  if (!match) return null
  const num = parseInt(match[1].replace(/,/g, ''), 10)
  const suffix = match[2] ?? ''
  return { num, suffix }
}

function formatNumber(n: number, originalValue: string): string {
  const parsed = parseNumber(originalValue)
  if (!parsed) return originalValue
  const { suffix } = parsed
  if (suffix === 'K+' || suffix === 'K') {
    if (n >= 1000) return `${Math.round(n / 1000)}K${suffix.includes('+') ? '+' : ''}`
    return `${n}${suffix}`
  }
  if (n >= 1000) return n.toLocaleString()
  return `${n}${suffix}`
}

function CountStat({ value, label }: Stat) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    if (!inView) return
    const parsed = parseNumber(value)
    if (!parsed) return

    const { num } = parsed
    const duration = 1200
    const startTime = performance.now()

    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * num)
      setDisplay(formatNumber(current, value))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [inView, value])

  return (
    <div ref={ref} className="flex flex-col items-center text-center gap-2">
      <span className="font-heading font-bold text-4xl md:text-5xl text-gold tabular-nums">
        {display}
      </span>
      <span className="font-body text-sm uppercase tracking-widest font-medium text-white/60">
        {label}
      </span>
    </div>
  )
}

interface ImpactBarProps {
  stats?: Stat[];
}

export default function ImpactBar({ stats = defaultStats }: ImpactBarProps) {
  return (
    <section className="bg-surface py-14">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="bg-navy rounded-2xl px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 border border-white/5">
          {stats.map((stat) => (
            <CountStat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
