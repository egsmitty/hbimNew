'use client'

import dynamic from 'next/dynamic'
import type { ImpactGlobeCanvasProps } from './ImpactGlobeCanvas'

// ssr: false must live in a Client Component per Next.js docs
const ImpactGlobeCanvas = dynamic(() => import('./ImpactGlobeCanvas'), {
  ssr: false,
  loading: () => (
    <div
      className="w-full rounded-xl bg-[#0a1628] flex items-center justify-center"
      style={{ height: '700px' }}
    >
      <div className="h-10 w-10 rounded-full border-2 border-[#C8973A]/25 border-t-[#C8973A] animate-spin" />
    </div>
  ),
})

export default function ImpactGlobe({ region }: ImpactGlobeCanvasProps) {
  return <ImpactGlobeCanvas region={region} />
}
