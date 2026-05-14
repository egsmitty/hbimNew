'use client'

import dynamic from 'next/dynamic'
import type { CinematicGlobeCanvasProps } from './CinematicGlobeCanvas'

const CinematicGlobeCanvas = dynamic(() => import('./CinematicGlobeCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#050a14]">
      <div className="h-10 w-10 rounded-full border-2 border-[#C8973A]/25 border-t-[#C8973A] animate-spin" />
    </div>
  ),
})

export default function CinematicGlobe({ region }: CinematicGlobeCanvasProps) {
  return <CinematicGlobeCanvas region={region} />
}
