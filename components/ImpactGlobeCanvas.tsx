'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'

const GLOBE_RADIUS = 2
const GOLD_HEX = 0xc8973a
const EARTH_TEXTURE_URL =
  'https://raw.githubusercontent.com/mrdoob/three.js/r160/examples/textures/land_ocean_ice_cloud_2048.jpg'

interface PinData {
  lat: number
  lng: number
  country: string
  region: string
  story?: string
  stats: string
}

const ALL_PINS: PinData[] = [
  // Africa
  { lat: -13.9, lng: 33.7, country: 'Malawi',       region: 'Africa', story: 'Where the vision began',       stats: '2,000 pastors · 1,800 churches' },
  { lat: -18.6, lng: 35.5, country: 'Mozambique',   region: 'Africa', story: 'Original Timothy Project site', stats: '3,500 pastors · 2,200 churches' },
  { lat: -19.0, lng: 29.8, country: 'Zimbabwe',     region: 'Africa',                                         stats: '1,800 pastors · 1,400 churches' },
  { lat: -13.1, lng: 27.8, country: 'Zambia',       region: 'Africa',                                         stats: '1,500 pastors · 1,100 churches' },
  { lat:  -6.3, lng: 34.8, country: 'Tanzania',     region: 'Africa',                                         stats: '1,200 pastors · 900 churches'   },
  { lat:  -0.02,lng: 37.9, country: 'Kenya',        region: 'Africa',                                         stats: '2,100 pastors · 1,600 churches' },
  { lat:   1.37,lng: 32.2, country: 'Uganda',       region: 'Africa',                                         stats: '1,000 pastors · 800 churches'   },
  { lat: -30.5, lng: 22.9, country: 'South Africa', region: 'Africa',                                         stats: '800 pastors · 600 churches'     },
  // Asia
  { lat: 20.5, lng: 78.9, country: 'India',      region: 'Asia', stats: '2,500 churches planted' },
  { lat: 30.3, lng: 69.3, country: 'Pakistan',   region: 'Asia', stats: '800 churches planted'   },
  { lat: 23.6, lng: 90.3, country: 'Bangladesh', region: 'Asia', stats: '700 churches planted'   },
]

// Y rotation that places `lng` in the center of the camera view.
// At rotation.y = 0 the facing longitude is −90°; each radian = 180/π degrees.
function lngToRotY(lng: number): number {
  return -(lng + 90) * (Math.PI / 180)
}

const REGION_CONFIG = {
  africa: {
    initialY: lngToRotY(30),   // eastern Africa center ~lng 30
    initialX: 0.34,             // tilt so lat −10 (Africa center) appears mid-screen
    cameraZ: 4.5,
    rotYMin: lngToRotY(30) - Math.PI / 3,  // ±60° horizontal limit
    rotYMax: lngToRotY(30) + Math.PI / 3,
  },
  asia: {
    initialY: lngToRotY(79),   // South Asia center ~lng 79
    initialX: -0.42,            // tilt so lat +24 (India center) appears mid-screen
    cameraZ: 4.5,
    rotYMin: lngToRotY(79) - Math.PI / 3,
    rotYMax: lngToRotY(79) + Math.PI / 3,
  },
} as const

function latLngToVec3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi   = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
     radius * Math.cos(phi),
     radius * Math.sin(phi) * Math.sin(theta)
  )
}

export interface ImpactGlobeCanvasProps {
  region: 'africa' | 'asia'
}

export default function ImpactGlobeCanvas({ region }: ImpactGlobeCanvasProps) {
  const mountRef     = useRef<HTMLDivElement>(null)
  const globeGroupRef = useRef<THREE.Group | null>(null)
  const isDraggingRef = useRef(false)
  const frameRef      = useRef(0)
  const cfgRef        = useRef(REGION_CONFIG[region])

  const [loading,     setLoading]     = useState(true)
  const [selectedPin, setSelectedPin] = useState<PinData | null>(null)
  const [cardPos,     setCardPos]     = useState({ x: 0, y: 0 })

  const handleResetView = useCallback(() => {
    if (globeGroupRef.current) {
      globeGroupRef.current.rotation.set(
        cfgRef.current.initialX,
        cfgRef.current.initialY,
        0
      )
    }
    setSelectedPin(null)
  }, [])

  useEffect(() => {
    const container = mountRef.current
    if (!container) return
    const cfg  = cfgRef.current
    const pins = ALL_PINS.filter(p => p.region.toLowerCase() === region)

    // Scene + camera
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.z = cfg.cameraZ

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x0a1628, 1)
    container.appendChild(renderer.domElement)
    renderer.domElement.style.cursor = 'grab'

    // Globe group — oriented to continent
    const globeGroup = new THREE.Group()
    globeGroup.rotation.set(cfg.initialX, cfg.initialY, 0)
    scene.add(globeGroup)
    globeGroupRef.current = globeGroup

    // Earth sphere
    let mounted = true
    const loader   = new THREE.TextureLoader()
    const earthTex = loader.load(EARTH_TEXTURE_URL, () => {
      if (mounted) setLoading(false)
    })
    globeGroup.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64),
        new THREE.MeshPhongMaterial({
          map:      earthTex,
          specular: new THREE.Color(0x222222),
          shininess: 12,
        })
      )
    )

    // Atmosphere
    globeGroup.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(GLOBE_RADIUS * 1.035, 32, 32),
        new THREE.MeshBasicMaterial({
          color: 0x2255bb, transparent: true, opacity: 0.06, side: THREE.BackSide,
        })
      )
    )

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.6))
    const sun = new THREE.DirectionalLight(0xffffff, 1.1)
    sun.position.set(5, 3, 5)
    scene.add(sun)

    // Pins — only for this region
    const goldColor = new THREE.Color(GOLD_HEX)
    type PinEntry  = { mesh: THREE.Mesh; pin: PinData }
    type RingEntry = { ring: THREE.Mesh; phase: number }
    const pinEntries:  PinEntry[]  = []
    const ringEntries: RingEntry[] = []

    pins.forEach((pin, i) => {
      const pos    = latLngToVec3(pin.lat, pin.lng, GLOBE_RADIUS)
      const normal = pos.clone().normalize()

      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.046, 10, 10),
        new THREE.MeshBasicMaterial({ color: goldColor })
      )
      dot.position.copy(pos)
      globeGroup.add(dot)
      pinEntries.push({ mesh: dot, pin })

      const ringMat = new THREE.MeshBasicMaterial({
        color: goldColor, transparent: true, opacity: 0.6, side: THREE.DoubleSide,
      })
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.07, 0.115, 28), ringMat)
      ring.position.copy(normal.clone().multiplyScalar(GLOBE_RADIUS + 0.002))
      ring.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal)
      globeGroup.add(ring)
      ringEntries.push({ ring, phase: (i / pins.length) * Math.PI * 2 })
    })

    // Raycaster
    const raycaster   = new THREE.Raycaster()
    const mouse2d     = new THREE.Vector2()
    const pinMeshList = pinEntries.map(e => e.mesh)

    // Drag state (all in closure — no ref needed)
    let startX = 0, startY = 0, prevX = 0, prevY = 0, didDrag = false

    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true
      startX = prevX = e.clientX
      startY = prevY = e.clientY
      didDrag = false
      renderer.domElement.style.cursor = 'grabbing'
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !globeGroupRef.current) return
      const dx = e.clientX - prevX
      const dy = e.clientY - prevY
      if (Math.hypot(e.clientX - startX, e.clientY - startY) > 4) didDrag = true
      globeGroupRef.current.rotation.y = Math.max(
        cfg.rotYMin,
        Math.min(cfg.rotYMax, globeGroupRef.current.rotation.y + dx * 0.005)
      )
      globeGroupRef.current.rotation.x = Math.max(
        -1.2,
        Math.min(1.2, globeGroupRef.current.rotation.x + dy * 0.005)
      )
      prevX = e.clientX
      prevY = e.clientY
    }

    const handleMouseUp = () => {
      isDraggingRef.current = false
      renderer.domElement.style.cursor = 'grab'
    }

    const handleClick = (e: MouseEvent) => {
      if (didDrag) return
      const rect = container.getBoundingClientRect()
      mouse2d.x = ((e.clientX - rect.left) / rect.width)  * 2 - 1
      mouse2d.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1
      raycaster.setFromCamera(mouse2d, camera)
      const hits = raycaster.intersectObjects(pinMeshList)
      if (hits.length > 0) {
        const entry = pinEntries.find(p => p.mesh === hits[0].object)
        if (entry) {
          setSelectedPin(entry.pin)
          setCardPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
        }
      } else {
        setSelectedPin(null)
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      isDraggingRef.current = true
      startX = prevX = e.touches[0].clientX
      startY = prevY = e.touches[0].clientY
      didDrag = false
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || !globeGroupRef.current) return
      const dx = e.touches[0].clientX - prevX
      const dy = e.touches[0].clientY - prevY
      if (Math.hypot(e.touches[0].clientX - startX, e.touches[0].clientY - startY) > 4) didDrag = true
      globeGroupRef.current.rotation.y = Math.max(
        cfg.rotYMin,
        Math.min(cfg.rotYMax, globeGroupRef.current.rotation.y + dx * 0.005)
      )
      globeGroupRef.current.rotation.x = Math.max(
        -1.2,
        Math.min(1.2, globeGroupRef.current.rotation.x + dy * 0.005)
      )
      prevX = e.touches[0].clientX
      prevY = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      isDraggingRef.current = false
      if (didDrag) return
      const rect  = container.getBoundingClientRect()
      const touch = e.changedTouches[0]
      mouse2d.x = ((touch.clientX - rect.left) / rect.width)  * 2 - 1
      mouse2d.y = -((touch.clientY - rect.top)  / rect.height) * 2 + 1
      raycaster.setFromCamera(mouse2d, camera)
      const hits = raycaster.intersectObjects(pinMeshList)
      if (hits.length > 0) {
        const entry = pinEntries.find(p => p.mesh === hits[0].object)
        if (entry) {
          setSelectedPin(entry.pin)
          setCardPos({ x: touch.clientX - rect.left, y: touch.clientY - rect.top })
        }
      } else {
        setSelectedPin(null)
      }
    }

    const handleResize = () => {
      if (!mountRef.current) return
      const w = mountRef.current.clientWidth
      const h = mountRef.current.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    renderer.domElement.addEventListener('mousedown',  handleMouseDown)
    window.addEventListener('mousemove',  handleMouseMove)
    window.addEventListener('mouseup',    handleMouseUp)
    renderer.domElement.addEventListener('click',      handleClick)
    renderer.domElement.addEventListener('touchstart', handleTouchStart, { passive: true })
    renderer.domElement.addEventListener('touchmove',  handleTouchMove,  { passive: true })
    renderer.domElement.addEventListener('touchend',   handleTouchEnd)
    window.addEventListener('resize', handleResize)

    // Animation — no auto-rotate; only pulses
    const clock = new THREE.Clock()
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      ringEntries.forEach(({ ring, phase }) => {
        const s = 1 + 0.55 * Math.sin(t * 1.8 + phase)
        ring.scale.setScalar(s)
        ;(ring.material as THREE.MeshBasicMaterial).opacity =
          0.2 + 0.45 * (0.5 + 0.5 * Math.sin(t * 1.8 + phase))
      })
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      mounted = false
      cancelAnimationFrame(frameRef.current)
      renderer.domElement.removeEventListener('mousedown',  handleMouseDown)
      window.removeEventListener('mousemove',  handleMouseMove)
      window.removeEventListener('mouseup',    handleMouseUp)
      renderer.domElement.removeEventListener('click',      handleClick)
      renderer.domElement.removeEventListener('touchstart', handleTouchStart)
      renderer.domElement.removeEventListener('touchmove',  handleTouchMove)
      renderer.domElement.removeEventListener('touchend',   handleTouchEnd)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
    }
  }, [region]) // region is stable per page mount; included for ESLint

  const clampCard = (x: number, y: number) => ({
    left: Math.min(x + 18, (mountRef.current?.clientWidth  ?? 600) - 252),
    top:  Math.min(Math.max(y - 80, 8), (mountRef.current?.clientHeight ?? 480) - 230),
  })

  return (
    <div className="relative w-full rounded-xl overflow-hidden" style={{ height: '700px' }}>
      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0a1628]">
          <div className="h-10 w-10 rounded-full border-2 border-[#C8973A]/25 border-t-[#C8973A] animate-spin" />
        </div>
      )}

      <div ref={mountRef} className="w-full h-full" />

      {/* Reset View */}
      <button
        onClick={handleResetView}
        className="absolute top-4 right-4 z-20 rounded px-3 py-1.5 font-body text-xs font-semibold text-gold border border-gold/40 hover:bg-gold/10 transition-colors"
      >
        Reset View
      </button>

      {/* Info card */}
      {selectedPin && (
        <div
          className="absolute z-20 w-60 rounded-xl border border-gold/30 bg-navy p-5 shadow-2xl"
          style={clampCard(cardPos.x, cardPos.y)}
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <span className="block font-body text-[10px] font-semibold uppercase tracking-widest text-gold">
                {selectedPin.region}
              </span>
              <h3 className="font-heading font-bold text-xl leading-tight text-white">
                {selectedPin.country}
              </h3>
            </div>
            <button
              aria-label="Close"
              onClick={() => setSelectedPin(null)}
              className="ml-2 mt-0.5 text-xl leading-none text-white/40 hover:text-white transition-colors"
            >
              ×
            </button>
          </div>

          {selectedPin.story && (
            <p className="mb-2 font-body text-sm italic text-gold/80">
              &ldquo;{selectedPin.story}&rdquo;
            </p>
          )}

          <p className="mb-4 font-body text-sm text-white/70">{selectedPin.stats}</p>

          <a
            href="/give"
            className="block rounded-lg bg-gold py-2 text-center font-body text-sm font-semibold text-navy hover:opacity-90 transition-opacity"
          >
            Give to {selectedPin.region}
          </a>
        </div>
      )}
    </div>
  )
}
