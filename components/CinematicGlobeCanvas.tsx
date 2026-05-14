'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'

const GLOBE_RADIUS = 2
const GOLD = 0xc8973a
const EARTH_URL = 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
const CLOUDS_URL = 'https://unpkg.com/three-globe/example/img/earth-clouds.png'
const GEOJSON_URL = 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson'

// Module-level cache — survives hot reload, avoids re-fetching on every mount
let geojsonCache: unknown = null

function lngToRotY(lng: number) {
  return -(lng + 90) * (Math.PI / 180)
}

function latLngToVec3(lat: number, lng: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta)
  )
}

interface PinCfg { lat: number; lng: number; country: string }
interface RegionCfg {
  s1Cam: { x: number; y: number; z: number }
  s1Rot: { x: number; y: number }
  s2:    { cam: { x: number; y: number; z: number }; rotX: number; rotY: number }
  countries: string[]
  pins: PinCfg[]
}

const CFG: Record<'africa' | 'asia', RegionCfg> = {
  africa: {
    s1Cam: { x: -2.25, y: -2.15, z: 7.0 },
    s1Rot: { x: -0.58, y: lngToRotY(25) + 0.04 },
    s2:    { cam: { x: -0.08, y: -0.26, z: 3.68 }, rotX: -0.82, rotY: lngToRotY(24) },
    // Both spellings because the dataset uses the long form
    countries: ['Malawi', 'Mozambique', 'Zimbabwe', 'Zambia', 'United Republic of Tanzania', 'Tanzania', 'Kenya', 'Uganda', 'South Africa'],
    pins: [
      { lat: -13.9, lng: 33.7, country: 'Malawi' },
      { lat: -18.6, lng: 35.5, country: 'Mozambique' },
      { lat: -19.0, lng: 29.8, country: 'Zimbabwe' },
      { lat: -13.1, lng: 27.8, country: 'Zambia' },
      { lat:  -6.3, lng: 34.8, country: 'Tanzania' },
      { lat: -0.02, lng: 37.9, country: 'Kenya' },
      { lat:  1.37, lng: 32.2, country: 'Uganda' },
      { lat: -30.5, lng: 22.9, country: 'South Africa' },
    ],
  },
  asia: {
    s1Cam: { x: -2.2, y: -2.25, z: 6.95 },
    s1Rot: { x: 0.42, y: lngToRotY(78.5) - 0.02 },
    s2:    { cam: { x: -0.03, y: 0.12, z: 3.52 }, rotX: 0.62, rotY: lngToRotY(78.8) },
    countries: ['India', 'Pakistan', 'Bangladesh'],
    pins: [
      { lat: 20.5, lng: 78.9, country: 'India' },
      { lat: 30.3, lng: 69.3, country: 'Pakistan' },
      { lat: 23.6, lng: 90.3, country: 'Bangladesh' },
    ],
  },
}

export interface CinematicGlobeCanvasProps {
  region: 'africa' | 'asia'
}

export default function CinematicGlobeCanvas({ region }: CinematicGlobeCanvasProps) {
  const mountRef      = useRef<HTMLDivElement>(null)
  const frameRef      = useRef(0)
  // Refs so React overlay buttons can call functions defined inside the effect closure
  const goToContiRef  = useRef<() => void>(() => {})
  const goToSpaceRef  = useRef<() => void>(() => {})
  // Updated every frame by the effect — rings are added/removed dynamically
  const ringAnimsRef  = useRef<Array<{ mesh: THREE.Mesh; phase: number }>>([])

  const [loading, setLoading] = useState(true)
  const [stage,   setStage]   = useState<'space' | 'transitioning' | 'continent'>('space')

  useEffect(() => {
    const container = mountRef.current
    if (!container) return
    const cfg = CFG[region]

    let mounted = true
    // Closure variable mirrors React state — avoids stale closure in async functions
    let currentStage: 'space' | 'transitioning' | 'continent' = 'space'

    // ── Scene ──────────────────────────────────────────────────────────────
    const scene = new THREE.Scene()

    // Starfield — layered sizes + brightness create a deeper night sky
    function addStarLayer(count: number, size: number, radiusMin: number, radiusSpread: number, brightMin: number, brightSpread: number) {
      const positions = new Float32Array(count * 3)
      const colors = new Float32Array(count * 3)

      for (let i = 0; i < count; i++) {
        const r  = radiusMin + Math.random() * radiusSpread
        const th = Math.random() * Math.PI * 2
        const ph = Math.acos(2 * Math.random() - 1)
        const brightness = brightMin + Math.random() * brightSpread
        const blueShift = Math.random() < 0.18

        positions[i * 3]     = r * Math.sin(ph) * Math.cos(th)
        positions[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th)
        positions[i * 3 + 2] = r * Math.cos(ph)

        colors[i * 3] = brightness * (blueShift ? 0.88 : 1)
        colors[i * 3 + 1] = brightness * (blueShift ? 0.93 : 1)
        colors[i * 3 + 2] = brightness * (blueShift ? 1.08 : 1)
      }

      const starGeo = new THREE.BufferGeometry()
      starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      starGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
      scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({
        size,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
      })))
    }
    addStarLayer(3600, 0.016, 46, 30, 0.1, 0.28)
    addStarLayer(1350, 0.038, 48, 26, 0.22, 0.35)
    addStarLayer(520, 0.074, 50, 22, 0.42, 0.34)
    addStarLayer(160, 0.13, 52, 18, 0.72, 0.24)
    addStarLayer(28, 0.22, 55, 14, 0.92, 0.08)

    // ── Camera ─────────────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 200)
    camera.position.set(cfg.s1Cam.x, cfg.s1Cam.y, cfg.s1Cam.z)
    camera.lookAt(0, 0, 0)

    // ── Renderer ───────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x050a14, 1)
    container.appendChild(renderer.domElement)
    renderer.domElement.style.cursor = 'pointer'

    // ── Globe group ────────────────────────────────────────────────────────
    const globeGroup = new THREE.Group()
    globeGroup.rotation.set(cfg.s1Rot.x, cfg.s1Rot.y, 0)
    scene.add(globeGroup)

    // Earth sphere
    const loader = new THREE.TextureLoader()
    const earthTex = loader.load(EARTH_URL, () => { if (mounted) setLoading(false) })
    earthTex.colorSpace = THREE.SRGBColorSpace
    globeGroup.add(new THREE.Mesh(
      new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64),
      new THREE.MeshPhongMaterial({
        map: earthTex,
        specular: new THREE.Color(0x4d5863),
        shininess: 24,
      })
    ))

    // Cloud layer — slightly larger, semi-transparent, rotates independently
    const cloudTex = loader.load(CLOUDS_URL)
    cloudTex.colorSpace = THREE.SRGBColorSpace
    const cloudMesh = new THREE.Mesh(
      new THREE.SphereGeometry(GLOBE_RADIUS * 1.02, 64, 64),
      new THREE.MeshPhongMaterial({
        map: cloudTex,
        color: 0xffffff,
        transparent: true,
        opacity: 0.58,
        depthWrite: false,
        side: THREE.DoubleSide,
        shininess: 14,
      })
    )
    cloudMesh.renderOrder = 3
    globeGroup.add(cloudMesh)

    // Atmospheric glow — rim lighting via custom shader
    const atmVert = `
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        vNormal  = normalize(normalMatrix * normal);
        vViewDir = normalize(-vec3(modelViewMatrix * vec4(position, 1.0)));
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `
    const atmFrag = `
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        float rim       = 1.0 - clamp(dot(vNormal, vViewDir), 0.0, 1.0);
        float intensity = pow(rim, 4.0) * 0.72;
        gl_FragColor    = vec4(0.25, 0.55, 1.0, intensity);
      }
    `
    globeGroup.add(new THREE.Mesh(
      new THREE.SphereGeometry(GLOBE_RADIUS * 1.14, 32, 32),
      new THREE.ShaderMaterial({
        vertexShader: atmVert,
        fragmentShader: atmFrag,
        blending: THREE.AdditiveBlending,
        side: THREE.FrontSide,
        transparent: true,
        depthWrite: false,
      })
    ))

    // ── Lights ─────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x47566a, 0.08))
    const sunLight = new THREE.DirectionalLight(0xffefc0, 3.25)
    sunLight.position.set(-10.5, 8.4, 5.8)
    scene.add(sunLight)
    const sunGlow = new THREE.PointLight(0xffe8a6, 2.4, 48, 2)
    sunGlow.position.copy(sunLight.position)
    scene.add(sunGlow)

    // Sun glow sprite at the light source position for lens-flare feel
    const sunCanvas = document.createElement('canvas')
    sunCanvas.width = sunCanvas.height = 128
    const sctx = sunCanvas.getContext('2d')!
    const grd = sctx.createRadialGradient(64, 64, 0, 64, 64, 64)
    grd.addColorStop(0,    'rgba(255,250,220,0.95)')
    grd.addColorStop(0.25, 'rgba(255,230,140,0.55)')
    grd.addColorStop(1,    'rgba(255,200,80,0)')
    sctx.fillStyle = grd
    sctx.fillRect(0, 0, 128, 128)
    const sunSprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(sunCanvas),
      blending: THREE.AdditiveBlending,
      transparent: true,
    }))
    sunSprite.scale.set(6.4, 6.4, 1)
    sunSprite.position.set(-11.2, 8.9, 3.4)
    scene.add(sunSprite)

    const rayCanvas = document.createElement('canvas')
    rayCanvas.width = rayCanvas.height = 512
    const rctx = rayCanvas.getContext('2d')!
    rctx.translate(256, 256)
    for (let i = 0; i < 18; i++) {
      rctx.save()
      rctx.rotate((Math.PI * 2 * i) / 18 + (i % 2) * 0.08)
      const width = i % 3 === 0 ? 28 : 16
      const length = i % 4 === 0 ? 250 : 190
      const grad = rctx.createLinearGradient(0, 0, length, 0)
      grad.addColorStop(0, 'rgba(255,244,210,0.18)')
      grad.addColorStop(0.32, 'rgba(255,223,145,0.09)')
      grad.addColorStop(1, 'rgba(255,223,145,0)')
      rctx.fillStyle = grad
      rctx.beginPath()
      rctx.moveTo(0, 0)
      rctx.lineTo(length, width / 2)
      rctx.lineTo(length, -width / 2)
      rctx.closePath()
      rctx.fill()
      rctx.restore()
    }
    const rayTexture = new THREE.CanvasTexture(rayCanvas)
    const sunRaySprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: rayTexture,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    }))
    sunRaySprite.scale.set(22, 22, 1)
    sunRaySprite.position.set(-13.4, 10.9, 2.7)
    scene.add(sunRaySprite)

    const haloCanvas = document.createElement('canvas')
    haloCanvas.width = haloCanvas.height = 256
    const hctx = haloCanvas.getContext('2d')!
    const haloGrad = hctx.createRadialGradient(128, 128, 0, 128, 128, 128)
    haloGrad.addColorStop(0, 'rgba(255,245,215,0.45)')
    haloGrad.addColorStop(0.3, 'rgba(255,220,130,0.18)')
    haloGrad.addColorStop(1, 'rgba(255,220,130,0)')
    hctx.fillStyle = haloGrad
    hctx.fillRect(0, 0, 256, 256)
    const haloSprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(haloCanvas),
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    }))
    haloSprite.scale.set(11, 11, 1)
    haloSprite.position.set(-11.9, 9.6, 3.2)
    scene.add(haloSprite)

    // ── Overlay helpers ────────────────────────────────────────────────────
    let overlayGroup: THREE.Group | null = null

    async function buildOverlay(): Promise<THREE.Group> {
      if (!geojsonCache) {
        const res = await fetch(GEOJSON_URL)
        geojsonCache = await res.json()
      }
      type Feature = {
        properties: Record<string, string>
        geometry: { type: string; coordinates: unknown }
      }
      const data = geojsonCache as { features: Feature[] }
      const group  = new THREE.Group()
      const hbmSet = new Set(cfg.countries.map(s => s.toLowerCase()))

      for (const feat of data.features) {
        const name = (feat.properties.ADMIN ?? feat.properties.name ?? '').toLowerCase()
        if (!hbmSet.has(name)) continue

        const geom = feat.geometry
        let rings: number[][][]
        if (geom.type === 'Polygon') {
          rings = geom.coordinates as number[][][]
        } else if (geom.type === 'MultiPolygon') {
          rings = (geom.coordinates as number[][][][]).flat()
        } else {
          continue
        }

        for (const ring of rings) {
          // Project GeoJSON [lng, lat] pairs onto globe surface with tiny offset to avoid z-fighting
          const pts = (ring as [number, number][]).map(([lng, lat]) =>
            latLngToVec3(lat, lng, GLOBE_RADIUS * 1.002)
          )
          if (pts.length < 2) continue
          pts.push(pts[0]) // close the loop
          const geo = new THREE.BufferGeometry().setFromPoints(pts)
          group.add(new THREE.Line(geo, new THREE.LineBasicMaterial({
            color: GOLD, transparent: true, opacity: 0.88,
          })))
        }
      }

      // Pulsing gold pins
      const goldColor = new THREE.Color(GOLD)
      const newRings: Array<{ mesh: THREE.Mesh; phase: number }> = []

      cfg.pins.forEach((pin, i) => {
        const pos    = latLngToVec3(pin.lat, pin.lng, GLOBE_RADIUS)
        const normal = pos.clone().normalize()

        const dot = new THREE.Mesh(
          new THREE.SphereGeometry(0.02, 10, 10),
          new THREE.MeshBasicMaterial({ color: goldColor })
        )
        dot.position.copy(pos)
        group.add(dot)

        const ringMat = new THREE.MeshBasicMaterial({
          color: goldColor, transparent: true, opacity: 0.42, side: THREE.DoubleSide,
        })
        const ring = new THREE.Mesh(new THREE.RingGeometry(0.028, 0.048, 28), ringMat)
        ring.position.copy(normal.clone().multiplyScalar(GLOBE_RADIUS + 0.006))
        ring.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal)
        group.add(ring)
        newRings.push({ mesh: ring, phase: (i / cfg.pins.length) * Math.PI * 2 })
      })

      ringAnimsRef.current = newRings
      return group
    }

    // ── Stage transitions ──────────────────────────────────────────────────
    async function goToContinent() {
      if (currentStage !== 'space') return
      currentStage = 'transitioning'
      setStage('transitioning')

      // Fetch GeoJSON concurrently with the camera animation so both finish around the same time
      const overlayPromise = buildOverlay()

      await new Promise<void>(resolve => {
        const tl = gsap.timeline({ onComplete: resolve })
        tl.to(camera.position,   {
          x: cfg.s2.cam.x,
          y: cfg.s2.cam.y,
          z: cfg.s2.cam.z,
          duration: 2.5,
          ease: 'power2.inOut',
        }, 0)
        tl.to(globeGroup.rotation, { x: cfg.s2.rotX, y: cfg.s2.rotY, duration: 2.5, ease: 'power2.inOut' }, 0)
      })

      if (!mounted) return
      currentStage = 'continent'
      setStage('continent')

      const overlay = await overlayPromise
      if (!mounted) return
      overlayGroup = overlay
      globeGroup.add(overlay)
    }

    async function goToSpace() {
      if (currentStage !== 'continent') return
      currentStage = 'transitioning'
      setStage('transitioning')

      // Remove overlay before animating so it doesn't trail back visually
      if (overlayGroup) {
        globeGroup.remove(overlayGroup)
        overlayGroup = null
        ringAnimsRef.current = []
      }

      await new Promise<void>(resolve => {
        const tl = gsap.timeline({ onComplete: resolve })
        tl.to(camera.position,     { x: cfg.s1Cam.x, y: cfg.s1Cam.y, z: cfg.s1Cam.z, duration: 2.2, ease: 'power2.inOut' }, 0)
        tl.to(globeGroup.rotation, { x: cfg.s1Rot.x, y: cfg.s1Rot.y, duration: 2.2, ease: 'power2.inOut' }, 0)
      })

      if (!mounted) return
      currentStage = 'space'
      setStage('space')
    }

    goToContiRef.current = goToContinent
    goToSpaceRef.current = goToSpace

    // ── Event listeners ────────────────────────────────────────────────────
    const handleCanvasClick = () => {
      if (currentStage === 'space') goToContinent()
    }
    renderer.domElement.addEventListener('click', handleCanvasClick)

    const handleResize = () => {
      if (!mountRef.current) return
      const w = mountRef.current.clientWidth
      const h = mountRef.current.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    // ── Render loop ────────────────────────────────────────────────────────
    const clock = new THREE.Clock()
    function animate() {
      frameRef.current = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Clouds spin independently of the globe group's orientation
      cloudMesh.rotation.y += 0.00072

      // Subtle drift in Stage 1 — a few degrees over ~13s loop; gives the scene life
      if (currentStage === 'space') {
        globeGroup.rotation.x = cfg.s1Rot.x + Math.sin(t * 0.09) * 0.018
        globeGroup.rotation.y = cfg.s1Rot.y + Math.sin(t * 0.12) * 0.022
      }

      // Pulsing pin rings
      ringAnimsRef.current.forEach(({ mesh, phase }) => {
        const s = 1 + 0.22 * Math.sin(t * 1.8 + phase)
        mesh.scale.setScalar(s)
        ;(mesh.material as THREE.MeshBasicMaterial).opacity =
          0.1 + 0.22 * (0.5 + 0.5 * Math.sin(t * 1.8 + phase))
      })

      // Always track origin — camera.position is animated by GSAP, lookAt follows each frame
      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      mounted = false
      cancelAnimationFrame(frameRef.current)
      renderer.domElement.removeEventListener('click', handleCanvasClick)
      window.removeEventListener('resize', handleResize)
      gsap.killTweensOf(camera.position)
      gsap.killTweensOf(globeGroup.rotation)
      renderer.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
    }
  }, [region])

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Loading spinner — shown until Earth texture resolves */}
      {loading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#050a14]">
          <div className="h-10 w-10 rounded-full border-2 border-[#C8973A]/25 border-t-[#C8973A] animate-spin" />
        </div>
      )}

      <div ref={mountRef} className="w-full h-full" />

      {/* Stage 1 — explore prompt */}
      {stage === 'space' && !loading && (
        <div className="absolute inset-x-0 bottom-8 flex justify-center pointer-events-none">
          <button
            className="pointer-events-auto flex flex-col items-center gap-2 text-white/35 hover:text-white/65 transition-colors duration-300"
            onClick={() => goToContiRef.current()}
          >
            <span className="font-body text-[11px] font-semibold uppercase tracking-[0.22em]">
              Explore the Mission
            </span>
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
              <path d="M1 1l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}

      {/* Stage 2 — dark edge vignette + back button */}
      {stage === 'continent' && (
        <>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, transparent 38%, rgba(5,10,20,0.9) 100%)' }}
          />
          <button
            onClick={() => goToSpaceRef.current()}
            className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded px-3 py-1.5 font-body text-xs font-semibold text-white/55 border border-white/20 hover:text-white hover:border-white/40 transition-colors bg-[#050a14]/60 backdrop-blur-sm"
          >
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
              <path d="M13 5H1M1 5l4-4M1 5l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>
        </>
      )}
    </div>
  )
}
