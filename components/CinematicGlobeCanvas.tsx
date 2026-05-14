'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import {
  COUNTRY_IMPACTS,
  COUNTRY_IMPACT_MAP,
  type CountryImpact,
} from './countryImpactData'

const GLOBE_RADIUS = 2
const GOLD = 0xc8973a
const GOLD_BRIGHT = 0xffdf89
const GOLD_DIM = 0x7f6231
const EARTH_URL = 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
const CLOUDS_URL = 'https://unpkg.com/three-globe/example/img/earth-clouds.png'
const GEOJSON_URL = 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson'

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

type Stage = 'space' | 'transitioning' | 'continent' | 'country'
type CardSide = 'left' | 'right'

interface RegionCfg {
  s1Cam: { x: number; y: number; z: number }
  s1Rot: { x: number; y: number }
  s2: { cam: { x: number; y: number; z: number }; rotX: number; rotY: number }
  countries: string[]
}

interface CountryRender {
  id: string
  lineMaterials: THREE.LineBasicMaterial[]
  dotMesh: THREE.Mesh
  dotMaterial: THREE.MeshBasicMaterial
  ringMesh: THREE.Mesh
  ringMaterial: THREE.MeshBasicMaterial
}

interface RingAnim {
  id: string
  mesh: THREE.Mesh
  phase: number
}

const CARD_VERTICAL_BIAS: Partial<Record<string, number>> = {
  india: 36,
  'south-africa': 64,
}

const CFG: Record<'africa' | 'asia', RegionCfg> = {
  africa: {
    s1Cam: { x: -2.9, y: -1.65, z: 8.3 },
    s1Rot: { x: -0.16, y: lngToRotY(-4) - 0.02 },
    s2: { cam: { x: 0.02, y: 0.0, z: 3.78 }, rotX: -0.31, rotY: lngToRotY(31.8) },
    countries: [
      'Malawi',
      'Mozambique',
      'Zimbabwe',
      'Zambia',
      'United Republic of Tanzania',
      'Tanzania',
      'Kenya',
      'Uganda',
      'South Africa',
    ],
  },
  asia: {
    s1Cam: { x: -3.0, y: -1.45, z: 8.35 },
    s1Rot: { x: 0.18, y: lngToRotY(124) - 0.03 },
    s2: { cam: { x: -0.03, y: 0.02, z: 3.52 }, rotX: 0.34, rotY: lngToRotY(79.2) },
    countries: ['India', 'Pakistan', 'Bangladesh'],
  },
}

const FEATURE_ALIASES: Record<string, string> = {
  'united republic of tanzania': 'tanzania',
}

export interface CinematicGlobeCanvasProps {
  region: 'africa' | 'asia'
}

function projectCountryToScreen(
  country: CountryImpact,
  globeGroup: THREE.Group,
  camera: THREE.PerspectiveCamera,
  container: HTMLDivElement
) {
  const worldPoint = latLngToVec3(country.lat, country.lng, GLOBE_RADIUS + 0.02)
  globeGroup.localToWorld(worldPoint)
  worldPoint.project(camera)

  return {
    x: ((worldPoint.x + 1) / 2) * container.clientWidth,
    y: ((-worldPoint.y + 1) / 2) * container.clientHeight,
  }
}

export default function CinematicGlobeCanvas({ region }: CinematicGlobeCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef(0)
  const ringAnimsRef = useRef<RingAnim[]>([])
  const goToContiRef = useRef<() => void>(() => {})
  const goToSpaceRef = useRef<() => void>(() => {})
  const goToMapRef = useRef<() => void>(() => {})

  const [loading, setLoading] = useState(true)
  const [stage, setStage] = useState<Stage>('space')
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null)
  const [anchorPos, setAnchorPos] = useState<{ x: number; y: number } | null>(null)
  const [cardSide, setCardSide] = useState<CardSide>('right')
  const [viewport, setViewport] = useState({ width: 0, height: 0 })

  const regionCountries = useMemo(
    () => COUNTRY_IMPACTS.filter((country) => country.region === region),
    [region]
  )

  const selectedCountry = selectedCountryId ? COUNTRY_IMPACT_MAP[selectedCountryId] : null

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    setLoading(true)
    setStage('space')
    setSelectedCountryId(null)
    setAnchorPos(null)
    setCardSide('right')

    const cfg = CFG[region]
    const regionCenter = regionCountries.reduce(
      (acc, country) => {
        acc.lat += country.lat
        acc.lng += country.lng
        return acc
      },
      { lat: 0, lng: 0 }
    )
    regionCenter.lat /= regionCountries.length
    regionCenter.lng /= regionCountries.length

    const countryByName = new Map<string, CountryImpact>()
    regionCountries.forEach((country) => {
      countryByName.set(country.name.toLowerCase(), country)
    })
    countryByName.set('united republic of tanzania', COUNTRY_IMPACT_MAP.tanzania)

    let mounted = true
    let currentStage: Stage = 'space'
    let selectedIdLocal: string | null = null
    let overlayGroup: THREE.Group | null = null
    let lastAnchorX = -1000
    let lastAnchorY = -1000

    const scene = new THREE.Scene()
    const raycaster = new THREE.Raycaster()
    ;(raycaster.params.Line as { threshold: number }).threshold = 0.12
    const pointer = new THREE.Vector2()
    const clickableObjects: THREE.Object3D[] = []
    const countryRenders = new Map<string, CountryRender>()

    function addStarLayer(
      count: number,
      size: number,
      radiusMin: number,
      radiusSpread: number,
      brightMin: number,
      brightSpread: number
    ) {
      const positions = new Float32Array(count * 3)
      const colors = new Float32Array(count * 3)

      for (let i = 0; i < count; i++) {
        const radius = radiusMin + Math.random() * radiusSpread
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        const brightness = brightMin + Math.random() * brightSpread
        const blueShift = Math.random() < 0.18

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
        positions[i * 3 + 2] = radius * Math.cos(phi)

        colors[i * 3] = brightness * (blueShift ? 0.88 : 1)
        colors[i * 3 + 1] = brightness * (blueShift ? 0.93 : 1)
        colors[i * 3 + 2] = brightness * (blueShift ? 1.08 : 1)
      }

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
      scene.add(
        new THREE.Points(
          geometry,
          new THREE.PointsMaterial({
            size,
            sizeAttenuation: true,
            vertexColors: true,
            transparent: true,
            opacity: 0.95,
            depthWrite: false,
          })
        )
      )
    }

    addStarLayer(3600, 0.016, 46, 30, 0.1, 0.28)
    addStarLayer(1350, 0.038, 48, 26, 0.22, 0.35)
    addStarLayer(520, 0.074, 50, 22, 0.42, 0.34)
    addStarLayer(160, 0.13, 52, 18, 0.72, 0.24)
    addStarLayer(28, 0.22, 55, 14, 0.92, 0.08)

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      200
    )
    camera.position.set(cfg.s1Cam.x, cfg.s1Cam.y, cfg.s1Cam.z)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x050a14, 1)
    container.appendChild(renderer.domElement)
    renderer.domElement.style.cursor = 'pointer'
    setViewport({ width: container.clientWidth, height: container.clientHeight })

    const globeGroup = new THREE.Group()
    globeGroup.rotation.set(cfg.s1Rot.x, cfg.s1Rot.y, 0)
    scene.add(globeGroup)

    const textureLoader = new THREE.TextureLoader()

    const earthTex = textureLoader.load(EARTH_URL, () => {
      if (mounted) setLoading(false)
    })
    earthTex.colorSpace = THREE.SRGBColorSpace

    globeGroup.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64),
        new THREE.MeshPhongMaterial({
          map: earthTex,
          specular: new THREE.Color(0x4d5863),
          shininess: 24,
        })
      )
    )

    const cloudTex = textureLoader.load(CLOUDS_URL)
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

    const atmosphereVertex = `
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vViewDir = normalize(-vec3(modelViewMatrix * vec4(position, 1.0)));
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `

    const atmosphereFragment = `
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        float rim = 1.0 - clamp(dot(vNormal, vViewDir), 0.0, 1.0);
        float intensity = pow(rim, 4.0) * 0.72;
        gl_FragColor = vec4(0.25, 0.55, 1.0, intensity);
      }
    `

    globeGroup.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(GLOBE_RADIUS * 1.14, 32, 32),
        new THREE.ShaderMaterial({
          vertexShader: atmosphereVertex,
          fragmentShader: atmosphereFragment,
          blending: THREE.AdditiveBlending,
          side: THREE.FrontSide,
          transparent: true,
          depthWrite: false,
        })
      )
    )

    scene.add(new THREE.AmbientLight(0x47566a, 0.08))
    const sunLight = new THREE.DirectionalLight(0xffefc0, 3.25)
    sunLight.position.set(-10.5, 8.4, 5.8)
    scene.add(sunLight)

    const sunGlow = new THREE.PointLight(0xffe8a6, 2.4, 48, 2)
    sunGlow.position.copy(sunLight.position)
    scene.add(sunGlow)

    const sunCanvas = document.createElement('canvas')
    sunCanvas.width = sunCanvas.height = 128
    const sunCtx = sunCanvas.getContext('2d')!
    const sunGradient = sunCtx.createRadialGradient(64, 64, 0, 64, 64, 64)
    sunGradient.addColorStop(0, 'rgba(255,250,220,0.95)')
    sunGradient.addColorStop(0.25, 'rgba(255,230,140,0.55)')
    sunGradient.addColorStop(1, 'rgba(255,200,80,0)')
    sunCtx.fillStyle = sunGradient
    sunCtx.fillRect(0, 0, 128, 128)
    const sunSprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: new THREE.CanvasTexture(sunCanvas),
        blending: THREE.AdditiveBlending,
        transparent: true,
      })
    )
    sunSprite.scale.set(6.4, 6.4, 1)
    sunSprite.position.set(-11.2, 8.9, 3.4)
    scene.add(sunSprite)

    const rayCanvas = document.createElement('canvas')
    rayCanvas.width = rayCanvas.height = 512
    const rayCtx = rayCanvas.getContext('2d')!
    rayCtx.translate(256, 256)
    for (let i = 0; i < 18; i++) {
      rayCtx.save()
      rayCtx.rotate((Math.PI * 2 * i) / 18 + (i % 2) * 0.08)
      const width = i % 3 === 0 ? 28 : 16
      const length = i % 4 === 0 ? 250 : 190
      const gradient = rayCtx.createLinearGradient(0, 0, length, 0)
      gradient.addColorStop(0, 'rgba(255,244,210,0.18)')
      gradient.addColorStop(0.32, 'rgba(255,223,145,0.09)')
      gradient.addColorStop(1, 'rgba(255,223,145,0)')
      rayCtx.fillStyle = gradient
      rayCtx.beginPath()
      rayCtx.moveTo(0, 0)
      rayCtx.lineTo(length, width / 2)
      rayCtx.lineTo(length, -width / 2)
      rayCtx.closePath()
      rayCtx.fill()
      rayCtx.restore()
    }
    const sunRays = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: new THREE.CanvasTexture(rayCanvas),
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
      })
    )
    sunRays.scale.set(22, 22, 1)
    sunRays.position.set(-13.4, 10.9, 2.7)
    scene.add(sunRays)

    const haloCanvas = document.createElement('canvas')
    haloCanvas.width = haloCanvas.height = 256
    const haloCtx = haloCanvas.getContext('2d')!
    const haloGradient = haloCtx.createRadialGradient(128, 128, 0, 128, 128, 128)
    haloGradient.addColorStop(0, 'rgba(255,245,215,0.45)')
    haloGradient.addColorStop(0.3, 'rgba(255,220,130,0.18)')
    haloGradient.addColorStop(1, 'rgba(255,220,130,0)')
    haloCtx.fillStyle = haloGradient
    haloCtx.fillRect(0, 0, 256, 256)
    const haloSprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: new THREE.CanvasTexture(haloCanvas),
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
      })
    )
    haloSprite.scale.set(11, 11, 1)
    haloSprite.position.set(-11.9, 9.6, 3.2)
    scene.add(haloSprite)

    function animateCountryStyle(selectedId: string | null) {
      countryRenders.forEach((render) => {
        const selected = selectedId === render.id
        const dimmed = Boolean(selectedId) && !selected
        const lineOpacity = selected ? 1 : dimmed ? 0.22 : 0.88
        const dotOpacity = selected ? 1 : dimmed ? 0.35 : 1
        const ringOpacity = selected ? 0.95 : dimmed ? 0.12 : 0.42
        const dotScale = selected ? 1.45 : 1
        const ringScale = selected ? 1.28 : 1

        render.lineMaterials.forEach((material) => {
          gsap.to(material, { opacity: lineOpacity, duration: 0.4, overwrite: true })
          material.color.set(selected ? GOLD_BRIGHT : dimmed ? GOLD_DIM : GOLD)
        })

        render.dotMaterial.color.set(selected ? GOLD_BRIGHT : dimmed ? GOLD_DIM : GOLD)
        render.ringMaterial.color.set(selected ? GOLD_BRIGHT : dimmed ? GOLD_DIM : GOLD)

        gsap.to(render.dotMaterial, { opacity: dotOpacity, duration: 0.4, overwrite: true })
        gsap.to(render.ringMaterial, { opacity: ringOpacity, duration: 0.4, overwrite: true })
        gsap.to(render.dotMesh.scale, {
          x: dotScale,
          y: dotScale,
          z: dotScale,
          duration: 0.45,
          overwrite: true,
        })
        gsap.to(render.ringMesh.scale, {
          x: ringScale,
          y: ringScale,
          z: 1,
          duration: 0.45,
          overwrite: true,
        })
      })
    }

    async function buildOverlay() {
      if (!geojsonCache) {
        const response = await fetch(GEOJSON_URL)
        geojsonCache = await response.json()
      }

      type Feature = {
        properties: Record<string, string>
        geometry: { type: string; coordinates: unknown }
      }

      const data = geojsonCache as { features: Feature[] }
      const group = new THREE.Group()

      regionCountries.forEach((country) => {
        const dotMaterial = new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 1 })
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: GOLD,
          transparent: true,
          opacity: 0.42,
          side: THREE.DoubleSide,
        })

        const position = latLngToVec3(country.lat, country.lng, GLOBE_RADIUS)
        const normal = position.clone().normalize()

        const dotMesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.02, 10, 10),
          dotMaterial
        )
        dotMesh.position.copy(position)
        dotMesh.userData.countryId = country.id

        const ringMesh = new THREE.Mesh(
          new THREE.RingGeometry(0.028, 0.048, 28),
          ringMaterial
        )
        ringMesh.position.copy(normal.clone().multiplyScalar(GLOBE_RADIUS + 0.006))
        ringMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal)
        ringMesh.userData.countryId = country.id

        const hitMesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.11, 10, 10),
          new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })
        )
        hitMesh.position.copy(normal.clone().multiplyScalar(GLOBE_RADIUS + 0.03))
        hitMesh.userData.countryId = country.id

        group.add(dotMesh)
        group.add(ringMesh)
        group.add(hitMesh)
        clickableObjects.push(dotMesh, ringMesh, hitMesh)
        ringAnimsRef.current.push({ id: country.id, mesh: ringMesh, phase: 0 })

        countryRenders.set(country.id, {
          id: country.id,
          lineMaterials: [],
          dotMesh,
          dotMaterial,
          ringMesh,
          ringMaterial,
        })
      })

      ringAnimsRef.current = ringAnimsRef.current.map((entry, index) => ({
        ...entry,
        phase: (index / ringAnimsRef.current.length) * Math.PI * 2,
      }))

      for (const feature of data.features) {
        const featureName = (feature.properties.ADMIN ?? feature.properties.name ?? '').toLowerCase()
        const matchName = FEATURE_ALIASES[featureName] ?? featureName
        const country = countryByName.get(matchName)
        if (!country) continue

        const geometry = feature.geometry
        let rings: number[][][]

        if (geometry.type === 'Polygon') {
          rings = geometry.coordinates as number[][][]
        } else if (geometry.type === 'MultiPolygon') {
          rings = (geometry.coordinates as number[][][][]).flat()
        } else {
          continue
        }

        const render = countryRenders.get(country.id)
        if (!render) continue

        for (const ring of rings) {
          const points = (ring as [number, number][]).map(([lng, lat]) =>
            latLngToVec3(lat, lng, GLOBE_RADIUS * 1.002)
          )

          if (points.length < 2) continue
          points.push(points[0])

          const lineMaterial = new THREE.LineBasicMaterial({
            color: GOLD,
            transparent: true,
            opacity: 0.88,
          })
          const line = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(points),
            lineMaterial
          )
          line.userData.countryId = country.id
          group.add(line)
          clickableObjects.push(line)
          render.lineMaterials.push(lineMaterial)
        }
      }

      animateCountryStyle(null)
      return group
    }

    function updateCardSide(country: CountryImpact) {
      const host = container
      if (!host) return
      const projected = projectCountryToScreen(country, globeGroup, camera, host)
      setCardSide(projected.x > host.clientWidth * 0.56 ? 'left' : 'right')
      setAnchorPos(projected)
      lastAnchorX = projected.x
      lastAnchorY = projected.y
    }

    function getCountryFocus(country: CountryImpact) {
      const blendedLat = regionCenter.lat + (country.lat - regionCenter.lat) * 0.72
      const blendedLng = regionCenter.lng + (country.lng - regionCenter.lng) * 0.78

      return {
        rotX: cfg.s2.rotX + ((blendedLat - regionCenter.lat) * Math.PI) / 180 * 0.9,
        rotY: lngToRotY(blendedLng),
        cam: {
          x: cfg.s2.cam.x + (country.lng - regionCenter.lng) * 0.0015,
          y: cfg.s2.cam.y - (country.lat - regionCenter.lat) * 0.002,
          z: Math.max(3.18, cfg.s2.cam.z - 0.26),
        },
      }
    }

    function pickCountry(clientX: number, clientY: number) {
      const host = container
      if (!host) return null
      const rect = host.getBoundingClientRect()
      pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(pointer, camera)

      const hits = raycaster.intersectObjects(clickableObjects, false)
      for (const hit of hits) {
        const countryId = hit.object.userData.countryId as string | undefined
        if (countryId) return countryId
      }
      return null
    }

    async function goToContinent() {
      if (currentStage !== 'space') return
      currentStage = 'transitioning'
      setStage('transitioning')

      const overlayPromise = buildOverlay()

      await new Promise<void>((resolve) => {
        const timeline = gsap.timeline({ onComplete: resolve })
        timeline.to(
          camera.position,
          {
            x: cfg.s2.cam.x,
            y: cfg.s2.cam.y,
            z: cfg.s2.cam.z,
            duration: 2.5,
            ease: 'power2.inOut',
          },
          0
        )
        timeline.to(
          globeGroup.rotation,
          {
            x: cfg.s2.rotX,
            y: cfg.s2.rotY,
            duration: 2.5,
            ease: 'power2.inOut',
          },
          0
        )
      })

      if (!mounted) return

      const overlay = await overlayPromise
      if (!mounted) return
      overlayGroup = overlay
      globeGroup.add(overlay)
      ringAnimsRef.current = ringAnimsRef.current.map((entry, index) => ({
        ...entry,
        phase: (index / ringAnimsRef.current.length) * Math.PI * 2,
      }))
      animateCountryStyle(null)

      currentStage = 'continent'
      setStage('continent')
    }

    async function goToCountry(countryId: string) {
      const country = COUNTRY_IMPACT_MAP[countryId]
      if (!country || currentStage === 'space' || currentStage === 'transitioning') return

      const target = getCountryFocus(country)
      selectedIdLocal = countryId
      setSelectedCountryId(countryId)
      updateCardSide(country)
      animateCountryStyle(countryId)

      currentStage = 'transitioning'
      setStage('transitioning')

      await new Promise<void>((resolve) => {
        const timeline = gsap.timeline({ onComplete: resolve })
        timeline.to(
          camera.position,
          {
            x: target.cam.x,
            y: target.cam.y,
            z: target.cam.z,
            duration: 1.05,
            ease: 'power2.out',
          },
          0
        )
        timeline.to(
          globeGroup.rotation,
          {
            x: target.rotX,
            y: target.rotY,
            duration: 1.05,
            ease: 'power2.out',
          },
          0
        )
      })

      if (!mounted) return
      updateCardSide(country)
      currentStage = 'country'
      setStage('country')
    }

    async function goToMap() {
      if (currentStage !== 'country') return
      selectedIdLocal = null
      setSelectedCountryId(null)
      setAnchorPos(null)
      animateCountryStyle(null)

      currentStage = 'transitioning'
      setStage('transitioning')

      await new Promise<void>((resolve) => {
        const timeline = gsap.timeline({ onComplete: resolve })
        timeline.to(
          camera.position,
          {
            x: cfg.s2.cam.x,
            y: cfg.s2.cam.y,
            z: cfg.s2.cam.z,
            duration: 0.95,
            ease: 'power2.out',
          },
          0
        )
        timeline.to(
          globeGroup.rotation,
          {
            x: cfg.s2.rotX,
            y: cfg.s2.rotY,
            duration: 0.95,
            ease: 'power2.out',
          },
          0
        )
      })

      if (!mounted) return
      currentStage = 'continent'
      setStage('continent')
    }

    async function goToSpace() {
      if (currentStage === 'space' || currentStage === 'transitioning') return

      if (currentStage === 'country') {
        selectedIdLocal = null
        setSelectedCountryId(null)
        setAnchorPos(null)
      }

      currentStage = 'transitioning'
      setStage('transitioning')
      animateCountryStyle(null)

      if (overlayGroup) {
        globeGroup.remove(overlayGroup)
        overlayGroup = null
        ringAnimsRef.current = []
        countryRenders.clear()
        clickableObjects.length = 0
      }

      await new Promise<void>((resolve) => {
        const timeline = gsap.timeline({ onComplete: resolve })
        timeline.to(
          camera.position,
          {
            x: cfg.s1Cam.x,
            y: cfg.s1Cam.y,
            z: cfg.s1Cam.z,
            duration: 2.2,
            ease: 'power2.inOut',
          },
          0
        )
        timeline.to(
          globeGroup.rotation,
          {
            x: cfg.s1Rot.x,
            y: cfg.s1Rot.y,
            duration: 2.2,
            ease: 'power2.inOut',
          },
          0
        )
      })

      if (!mounted) return
      currentStage = 'space'
      setStage('space')
    }

    goToContiRef.current = goToContinent
    goToSpaceRef.current = goToSpace
    goToMapRef.current = goToMap

    const handleCanvasClick = (event: MouseEvent) => {
      if (currentStage === 'space') {
        void goToContinent()
        return
      }

      if (currentStage === 'transitioning') return

      const hitCountryId = pickCountry(event.clientX, event.clientY)
      if (hitCountryId) {
        void goToCountry(hitCountryId)
        return
      }

      if (currentStage === 'country') {
        void goToMap()
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || currentStage === 'transitioning') return
      event.preventDefault()

      if (currentStage === 'country') {
        void goToMap()
        return
      }

      if (currentStage === 'continent') {
        void goToSpace()
      }
    }

    const handleResize = () => {
      if (!mountRef.current) return
      const width = mountRef.current.clientWidth
      const height = mountRef.current.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      setViewport({ width, height })

      if (selectedIdLocal) {
        updateCardSide(COUNTRY_IMPACT_MAP[selectedIdLocal])
      }
    }

    renderer.domElement.addEventListener('click', handleCanvasClick)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)

    const clock = new THREE.Clock()

    function animate() {
      frameRef.current = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      cloudMesh.rotation.y += 0.00072

      if (currentStage === 'space') {
        globeGroup.rotation.x = cfg.s1Rot.x + Math.sin(elapsed * 0.09) * 0.018
        globeGroup.rotation.y = cfg.s1Rot.y + Math.sin(elapsed * 0.12) * 0.022
      }

      ringAnimsRef.current.forEach(({ id, mesh, phase }) => {
        const selected = selectedIdLocal === id
        const scale = selected ? 1.18 : 1
        const pulse = 1 + 0.22 * Math.sin(elapsed * 1.8 + phase)
        mesh.scale.set(scale * pulse, scale * pulse, 1)
      })

      if (selectedIdLocal && mounted) {
        const host = container
        if (!host) return
        const projected = projectCountryToScreen(
          COUNTRY_IMPACT_MAP[selectedIdLocal],
          globeGroup,
          camera,
          host
        )

        if (
          Math.abs(projected.x - lastAnchorX) > 1.2 ||
          Math.abs(projected.y - lastAnchorY) > 1.2
        ) {
          lastAnchorX = projected.x
          lastAnchorY = projected.y
          setAnchorPos(projected)
        }
      }

      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      mounted = false
      cancelAnimationFrame(frameRef.current)
      renderer.domElement.removeEventListener('click', handleCanvasClick)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
      gsap.killTweensOf(camera.position)
      gsap.killTweensOf(globeGroup.rotation)
      renderer.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
    }
  }, [region, regionCountries])

  const containerWidth = viewport.width
  const containerHeight = viewport.height
  const isMobile = containerWidth > 0 && containerWidth < 768
  const desktopCardWidth = Math.min(400, Math.max(340, containerWidth * 0.32 || 380))
  const desktopCardHeight = 476
  const desktopCardTop = anchorPos && selectedCountry
    ? Math.min(
        Math.max(
          anchorPos.y - 170 - (CARD_VERTICAL_BIAS[selectedCountry.id] ?? 0),
          24
        ),
        Math.max(24, containerHeight - desktopCardHeight - 24)
      )
    : 96

  const desktopCardLeft =
    cardSide === 'left' ? 24 : Math.max(24, containerWidth - desktopCardWidth - 24)
  const cardAnchorX = cardSide === 'left' ? desktopCardLeft + desktopCardWidth : desktopCardLeft
  const cardAnchorY = desktopCardTop + 120
  const connectorMidX = anchorPos
    ? cardSide === 'left'
      ? Math.max(cardAnchorX + 34, anchorPos.x + 30)
      : Math.min(cardAnchorX - 34, anchorPos.x - 30)
    : 0
  const showCountryCard = stage === 'country' && selectedCountry && anchorPos

  return (
    <div className="relative h-full w-full overflow-hidden">
      {loading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#050a14]">
          <div className="h-10 w-10 rounded-full border-2 border-[#C8973A]/25 border-t-[#C8973A] animate-spin" />
        </div>
      )}

      <div ref={mountRef} className="h-full w-full" />

      {stage === 'space' && !loading && (
        <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center">
          <button
            className="pointer-events-auto flex flex-col items-center gap-2 text-white/35 transition-colors duration-300 hover:text-white/65"
            onClick={() => goToContiRef.current()}
          >
            <span className="font-body text-[11px] font-semibold uppercase tracking-[0.22em]">
              Explore the Mission
            </span>
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
              <path
                d="M1 1l7 7 7-7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}

      {stage !== 'space' && (
        <>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 38%, rgba(5,10,20,0.9) 100%)',
            }}
          />

          {stage === 'continent' && (
            <button
              onClick={() => goToSpaceRef.current()}
              className="absolute left-5 top-5 z-20 flex items-center gap-3 rounded-xl border border-white/25 bg-[#050a14]/72 px-4 py-2.5 font-body text-sm font-semibold text-white/80 shadow-lg shadow-black/30 backdrop-blur-sm transition-colors hover:border-white/45 hover:text-white"
              aria-label="Back to space view"
            >
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
                <path
                  d="M15 6H1M1 6l5-5M1 6l5 5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Back</span>
              <span className="rounded-md border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-white/55">
                Esc
              </span>
            </button>
          )}
        </>
      )}

      {showCountryCard && (
        <>
          {!isMobile && (
            <svg className="pointer-events-none absolute inset-0 z-20 hidden md:block">
              <defs>
                <filter id="connector-glow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <polyline
                points={`${anchorPos.x},${anchorPos.y} ${connectorMidX},${anchorPos.y} ${cardAnchorX},${cardAnchorY}`}
                fill="none"
                stroke="rgba(200,151,58,0.85)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#connector-glow)"
                className="transition-all duration-500"
              />
              <circle
                cx={anchorPos.x}
                cy={anchorPos.y}
                r="4"
                fill="rgba(255,223,145,0.95)"
                filter="url(#connector-glow)"
              />
            </svg>
          )}

          <div
            className={`absolute z-30 transition-[opacity,transform] duration-300 ease-out will-change-transform ${
              showCountryCard
                ? 'opacity-100 translate-y-0'
                : 'pointer-events-none opacity-0 translate-y-4'
            } ${
              isMobile
                ? 'inset-x-0 bottom-0 px-3 pb-3'
                : 'hidden md:block'
            }`}
            style={
              isMobile
                ? undefined
                : {
                    top: desktopCardTop,
                    left: desktopCardLeft,
                    width: desktopCardWidth,
                  }
            }
          >
            <div className="flex min-h-[476px] max-h-[476px] flex-col overflow-hidden rounded-[22px] border border-gold/40 bg-[#07111d]/94 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-md">
              <div
                className="relative h-32 border-b border-gold/20 bg-cover bg-center"
                style={{ backgroundImage: `linear-gradient(180deg, rgba(7,17,29,0.04) 0%, rgba(7,17,29,0.58) 100%), url(${selectedCountry.image})` }}
              >
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="font-heading text-[30px] font-bold text-white">
                    {selectedCountry.name}
                  </h3>
                </div>
              </div>

              <div className="flex min-h-0 flex-1 flex-col gap-4 p-4 md:p-5">
                <p className="font-body text-[13px] leading-relaxed text-white/76">
                  {selectedCountry.description}
                </p>

                <div className="grid grid-cols-2 gap-2.5">
                  {selectedCountry.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex min-h-[66px] flex-col justify-between rounded-2xl border border-white/8 bg-white/[0.04] px-3 py-2.5"
                    >
                      <p className="font-body text-[10px] uppercase tracking-[0.16em] text-white/45">
                        {stat.label}
                      </p>
                      <p className="mt-1 break-words font-heading text-[13px] leading-snug text-gold">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-auto grid grid-cols-2 gap-3">
                  <a
                    href="/give"
                    className="inline-flex items-center justify-center rounded-full bg-gold px-4 py-3 text-center font-body text-sm font-semibold text-navy transition-colors hover:bg-gold/90"
                  >
                    Give to {selectedCountry.name}
                  </a>
                  <button
                    type="button"
                    onClick={() => goToMapRef.current()}
                    className="inline-flex items-center justify-center rounded-full border border-gold/35 bg-white/[0.03] px-4 py-3 text-center font-body text-sm font-semibold text-white/80 transition-colors hover:border-gold/60 hover:text-white"
                  >
                    Back to map
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`absolute inset-x-0 bottom-0 z-30 px-3 pb-3 transition-[opacity,transform] duration-300 ease-out will-change-transform md:hidden ${
              showCountryCard
                ? 'translate-y-0 opacity-100'
                : 'pointer-events-none translate-y-6 opacity-0'
            }`}
          >
            <div className="flex max-h-[68vh] flex-col overflow-hidden rounded-[22px] border border-gold/40 bg-[#07111d]/96 shadow-[0_18px_60px_rgba(0,0,0,0.42)] backdrop-blur-md">
              <div
                className="relative h-28 border-b border-gold/20 bg-cover bg-center"
                style={{ backgroundImage: `linear-gradient(180deg, rgba(7,17,29,0.06) 0%, rgba(7,17,29,0.68) 100%), url(${selectedCountry.image})` }}
              >
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="font-heading text-2xl font-bold text-white">
                    {selectedCountry.name}
                  </h3>
                </div>
              </div>
              <div className="flex min-h-0 flex-1 flex-col gap-3 p-4">
                <p className="font-body text-[13px] leading-relaxed text-white/76">
                  {selectedCountry.description}
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {selectedCountry.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex min-h-[62px] flex-col justify-between rounded-2xl border border-white/8 bg-white/[0.04] px-3 py-2.5"
                    >
                      <p className="font-body text-[10px] uppercase tracking-[0.16em] text-white/45">
                        {stat.label}
                      </p>
                      <p className="mt-1 break-words font-heading text-[12px] leading-snug text-gold">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-auto grid grid-cols-2 gap-3">
                  <a
                    href="/give"
                    className="inline-flex items-center justify-center rounded-full bg-gold px-4 py-3 text-center font-body text-sm font-semibold text-navy transition-colors hover:bg-gold/90"
                  >
                    Give to {selectedCountry.name}
                  </a>
                  <button
                    type="button"
                    onClick={() => goToMapRef.current()}
                    className="inline-flex items-center justify-center rounded-full border border-gold/35 bg-white/[0.03] px-4 py-3 text-center font-body text-sm font-semibold text-white/80 transition-colors hover:border-gold/60 hover:text-white"
                  >
                    Back to map
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
