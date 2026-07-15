"use client"

import { useRef, useMemo, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { RoundedBox, useTexture, Environment, ContactShadows, Float, Text, Html } from "@react-three/drei"
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from "framer-motion"
import * as THREE from "three"
import HeroBackground from "./hero-background"

type ProgressRef = { current: number }

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v))
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

// smooth window centered at `center`, fades in over `fade` on both sides
function windowWeight(p: number, start: number, end: number, fade: number) {
  const rampIn = clamp01((p - start) / fade)
  const rampOut = 1 - clamp01((p - (end - fade)) / fade)
  return Math.min(rampIn, rampOut)
}

const baseW = 3.6
const baseD = 2.4
const baseH = 0.12
const screenW = 3.4
const screenH = 1.95

function BacklitKeyboard() {
  const kbW = baseW * 0.88
  const kbD = baseD * 0.45
  const kbCenterZ = 0.02

  const keys = useMemo(() => {
    const arr: { x: number; z: number; w: number; d: number; label: string }[] = []

    // Total logical units across the width
    const totalU = 19.25
    const unitW = kbW / totalU
    const gapX = unitW * 0.15

    const rows = 6 // Esc row, Number row, QWERTY, ASDF, ZXCV, Space
    const unitD = kbD / rows
    const gapZ = unitD * 0.15
    const keyD = unitD - gapZ

    // Row definitions in logical units (U)
    // Main layout is exactly 15U wide. Gap is 0.25U. Numpad is 4U wide.
    const layout = [
      { main: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], mainLabels: ['Esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'Prt', 'Del'], gap: 0.25, num: [1, 1, 1, 1], numLabels: ['Num', '/', '*', '-'] },
      { main: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2], mainLabels: ['~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'], gap: 0.25, num: [1, 1, 1, 1], numLabels: ['7', '8', '9', '+'] },
      { main: [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5], mainLabels: ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'], gap: 0.25, num: [1, 1, 1, 1], numLabels: ['4', '5', '6', ''] },
      { main: [1.75, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.25], mainLabels: ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'], gap: 0.25, num: [1, 1, 1, 1], numLabels: ['1', '2', '3', 'Ent'] },
      { main: [2.25, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.75], mainLabels: ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'], gap: 0.25, num: [1, 1, 1, 1], numLabels: ['', '', '', ''] },
      { main: [1.25, 1.25, 1.25, 5.5, 1.25, 1.25, 1.25, 1, 1], mainLabels: ['Ctrl', 'Win', 'Alt', '', 'Alt', 'Fn', 'Ctrl', '<', '>'], gap: 0.25, num: [2, 1, 1], numLabels: ['0', '.', ''] },
    ]

    layout.forEach((row, r) => {
      let cursor = -kbW / 2

      row.main.forEach((u, i) => {
        const w = u * unitW
        arr.push({
          x: cursor + w / 2,
          z: kbCenterZ - kbD / 2 + r * unitD + unitD / 2,
          w: w - gapX,
          d: keyD,
          label: row.mainLabels[i] || '',
        })
        cursor += w
      })

      cursor += row.gap * unitW

      row.num.forEach((u, i) => {
        const w = u * unitW
        arr.push({
          x: cursor + w / 2,
          z: kbCenterZ - kbD / 2 + r * unitD + unitD / 2,
          w: w - gapX,
          d: keyD,
          label: row.numLabels[i] || '',
        })
        cursor += w
      })
    })

    return arr
  }, [])

  return (
    <group position={[0, baseH / 2 + 0.002, -0.15]}>
      {/* red glowing base panel beneath keys (backlight) */}
      <mesh position={[0, -0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[kbW + 0.04, kbD + 0.04]} />
        <meshStandardMaterial color="#3a0000" emissive="#ff1a1a" emissiveIntensity={2.4} toneMapped={false} />
      </mesh>

      {/* individual keys */}
      {keys.map((k, i) => (
        <group key={i} position={[k.x, 0.03, k.z]}>
          <RoundedBox args={[k.w, 0.05, k.d]} radius={0.012} smoothness={3} castShadow>
            <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.6} />
          </RoundedBox>
          {k.label && (
            <Text
              position={[0, 0.027, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              fontSize={0.024}
              color="#ffffff"
              material-toneMapped={false}
              anchorX="center"
              anchorY="middle"
              maxWidth={k.w - 0.01}
            >
              {k.label}
            </Text>
          )}
          {/* red glow ring around each key from the light bleeding up the sides */}
          <mesh position={[0, -0.018, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[k.w * 1.14, k.d * 1.2]} />
            <meshStandardMaterial
              color="#2a0000"
              emissive="#ff2323"
              emissiveIntensity={1.6}
              transparent
              opacity={0.9}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Laptop({ progress }: { progress: ProgressRef }) {
  const root = useRef<THREE.Group>(null)
  const lid = useRef<THREE.Group>(null)

  const screens = useTexture({
    dashboard: "/xsis-dashboard.png",
    stock: "/xsis-stock.png",
    sales: "/xsis-sales-report.png",
    ai: "/xsis-ai.png",
    logo: "/xsis-logo.png",
  }) as Record<string, THREE.Texture>

  Object.values(screens).forEach((t) => {
    t.colorSpace = THREE.SRGBColorSpace
    t.anisotropy = 8
  })

  // refs to the 3 stacked overlay screens (dashboard is the always-on base)
  const stockMat = useRef<THREE.MeshBasicMaterial>(null)
  const salesMat = useRef<THREE.MeshBasicMaterial>(null)
  const aiMat = useRef<THREE.MeshBasicMaterial>(null)

  const bootMat = useRef<THREE.MeshBasicMaterial>(null)
  const logoMat = useRef<THREE.MeshBasicMaterial>(null)
  const blackScreenMat = useRef<THREE.MeshBasicMaterial>(null)
  const htmlLogoRef = useRef<HTMLImageElement>(null)

  useFrame(() => {
    const p = progress.current
    if (!root.current || !lid.current) return

    // Phase 1: lid opens
    const openT = easeInOut(clamp01(p / 0.15))

    // boot screen fade out
    const bootOpacity = 1 - clamp01((p - 0.1) / 0.08)
    if (bootMat.current) bootMat.current.opacity = bootOpacity
    if (logoMat.current) logoMat.current.opacity = bootOpacity

    // reveal rotation
    const spinT = easeInOut(clamp01(p / 0.20))

    // continuous smooth zoom from 0.20 to 1.0 (no pause)
    const zP = clamp01((p - 0.20) / 0.80)

    // Z: Smoothly accelerating forward (deep zoom into screen)
    root.current.position.z = 1.1 * zP + 4.4 * zP * zP * zP

    // Y: Smooth arc (goes down to -0.9 so keyboard deck exits, but arc keeps it high during zoom)
    root.current.position.y = THREE.MathUtils.lerp(-0.50, -0.9, zP) + Math.sin(zP * Math.PI) * 0.3

    // RotX: Smoothly levels out
    const easeOutCubic = 1 - Math.pow(1 - zP, 3)
    root.current.rotation.x = THREE.MathUtils.lerp(0.55, 0, easeOutCubic)

    // Wobble fading smoothly as it zooms
    let wobble = Math.sin(Date.now() * 0.0004) * 0.02 * (1 - zP)
    const baseRotY = THREE.MathUtils.lerp(-0.9, 0, spinT)
    root.current.rotation.y = baseRotY + wobble

    // Lid opening further to flat
    const lidTargetX = THREE.MathUtils.lerp(-Math.PI * 0.06, 0, zP * zP)
    lid.current.rotation.x = THREE.MathUtils.lerp(-Math.PI * 0.5, lidTargetX, openT)

    // cycle the screen content as you scroll deeper
    // We only fade IN, stacking them over the previous screens to avoid glitches
    if (aiMat.current) aiMat.current.opacity = clamp01((p - 0.25) / 0.05)
    if (salesMat.current) salesMat.current.opacity = clamp01((p - 0.35) / 0.05)
    if (stockMat.current) stockMat.current.opacity = clamp01((p - 0.45) / 0.05)
    
    // Screen goes fully black
    if (blackScreenMat.current) blackScreenMat.current.opacity = clamp01((p - 0.50) / 0.05)
    // HTML faint logo inside the dark screen
    if (htmlLogoRef.current) {
      htmlLogoRef.current.style.opacity = (clamp01((p - 0.52) / 0.08) * 0.4).toString()
    }
  })

  return (
    <group ref={root} position={[0, -0.50, 0]}>
      {/* Base / keyboard deck */}
      <RoundedBox args={[baseW, baseH, baseD]} radius={0.05} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color="#1c1c1f" metalness={0.9} roughness={0.35} />
      </RoundedBox>

      {/* Backlit red keyboard */}
      <BacklitKeyboard />

      {/* Trackpad */}
      <mesh position={[0, baseH / 2 + 0.003, baseD * 0.31]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[baseW * 0.34, baseD * 0.24]} />
        <meshStandardMaterial color="#242428" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* Hinged lid */}
      <group ref={lid} position={[0, baseH / 2, -baseD / 2]}>
        <group position={[0, screenH / 2 + 0.02, 0]}>
          {/* Lid back panel */}
          <RoundedBox args={[baseW, screenH + 0.12, 0.06]} radius={0.04} smoothness={4} castShadow>
            <meshStandardMaterial color="#141416" metalness={0.9} roughness={0.4} />
          </RoundedBox>

          {/* Screen bezel */}
          <mesh position={[0, 0, 0.032]}>
            <planeGeometry args={[screenW + 0.08, screenH + 0.08]} />
            <meshStandardMaterial color="#050505" metalness={0.4} roughness={0.5} />
          </mesh>

          {/* Base screen: dashboard (always visible) */}
          <mesh position={[0, 0, 0.035]}>
            <planeGeometry args={[screenW, screenH]} />
            <meshBasicMaterial map={screens.dashboard} toneMapped={false} />
          </mesh>

          {/* Boot screen cover */}
          <mesh position={[0, 0, 0.0351]}>
            <planeGeometry args={[screenW, screenH]} />
            <meshBasicMaterial ref={bootMat} color="#ffffff" transparent opacity={1} toneMapped={false} />
          </mesh>
          <mesh position={[0, 0, 0.0352]}>
            <planeGeometry args={[0.8, 0.8]} />
            <meshBasicMaterial ref={logoMat} map={screens.logo} transparent opacity={1} toneMapped={false} />
          </mesh>

          {/* Overlay: AI assistant */}
          <mesh position={[0, 0, 0.036]}>
            <planeGeometry args={[screenW, screenH]} />
            <meshBasicMaterial ref={aiMat} map={screens.ai} transparent opacity={0} toneMapped={false} />
          </mesh>

          {/* Overlay: sales report */}
          <mesh position={[0, 0, 0.037]}>
            <planeGeometry args={[screenW, screenH]} />
            <meshBasicMaterial ref={salesMat} map={screens.sales} transparent opacity={0} toneMapped={false} />
          </mesh>

          {/* Overlay: stock report */}
          <mesh position={[0, 0, 0.038]}>
            <planeGeometry args={[screenW, screenH]} />
            <meshBasicMaterial ref={stockMat} map={screens.stock} transparent opacity={0} toneMapped={false} />
          </mesh>

          {/* Final Black overlay on screen */}
          <mesh position={[0, 0, 0.039]}>
            <planeGeometry args={[screenW, screenH]} />
            <meshBasicMaterial ref={blackScreenMat} color="#050505" transparent opacity={0} toneMapped={false} />
          </mesh>

          {/* Huge faint white logo directly on the laptop screen */}
          <Html position={[0, 0, 0.040]} transform scale={0.015} zIndexRange={[100, 0]}>
            <div style={{ width: '2000px', height: '2000px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img 
                ref={htmlLogoRef}
                src="/Logo.png" 
                className="w-full h-full object-contain brightness-0 invert" 
                style={{ opacity: 0 }} 
                alt="Xsis Logo"
              />
            </div>
          </Html>

          {/* Xsis logo glow on lid back */}
          <mesh position={[0, 0, -0.032]} rotation={[0, Math.PI, 0]}>
            <circleGeometry args={[0.16, 32]} />
            <meshStandardMaterial color="#2563eb" emissive="#2563eb" emissiveIntensity={0.6} />
          </mesh>
        </group>
      </group>
    </group>
  )
}

function Scene({ progress }: { progress: ProgressRef }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 4]} intensity={1.4} castShadow />
      <directionalLight position={[-5, 3, -2]} intensity={0.5} color="#2563eb" />
      {/* red bounce light from the backlit keyboard */}
      <pointLight position={[0, 0.4, 0.6]} intensity={1.2} distance={4} color="#ff2b2b" />
      <Suspense fallback={null}>
        <Float speed={1.2} rotationIntensity={0} floatIntensity={0.25}>
          <Laptop progress={progress} />
        </Float>
        <Environment preset="city" />
      </Suspense>
      <ContactShadows position={[0, -1.4, 0]} opacity={0.5} scale={9} blur={2.6} far={4} />
    </>
  )
}

export default function LaptopScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    restDelta: 0.001,
  })

  useMotionValueEvent(smoothProgress, "change", (v) => {
    progressRef.current = v
  })

  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const step1Opacity = useTransform(scrollYProgress, [0.20, 0.23, 0.27, 0.30], [0, 1, 1, 0])
  const step2Opacity = useTransform(scrollYProgress, [0.30, 0.33, 0.37, 0.40], [0, 1, 1, 0])
  const step3Opacity = useTransform(scrollYProgress, [0.40, 0.43, 0.47, 0.50], [0, 1, 1, 0])
  
  const finalTextOpacity = useTransform(scrollYProgress, [0.65, 0.70, 0.97, 1], [0, 1, 1, 0])
  // Exponential scaling to physically match the camera getting closer to the laptop screen
  // Text starts at 0.65 after a deliberate pause (dead zone from 0.55 to 0.65)
  const finalTextScale = useTransform(scrollYProgress, [0.65, 0.75, 0.85, 0.95, 1], [0.1, 0.3, 0.8, 3.5, 18])

  return (
    <div ref={containerRef} className="relative h-[2000vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-transparent">
        <HeroBackground />
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0.6, 6], fov: 40 }} gl={{ antialias: true, alpha: true }}>
          <Scene progress={progressRef} />
        </Canvas>

        {/* Text overlays */}
        <div className="pointer-events-none absolute inset-0 z-20">
          <motion.div className="absolute inset-x-0 bottom-0" style={{ opacity: titleOpacity }}>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
            <div className="relative px-6 pb-16 md:px-12 md:pb-20 lg:px-20">
              <motion.p
                className="mb-4 md:mb-6 text-[10px] font-semibold uppercase tracking-[0.5em] text-blue-400/80 relative z-10"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Billing Software
              </motion.p>
              <motion.div
                className="-my-8 md:-my-12 lg:-my-20 relative z-0"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <img 
                  src="/Logo.png" 
                  alt="Xsis" 
                  className="-ml-4 md:-ml-8 lg:-ml-12 h-32 md:h-48 lg:h-64 w-auto brightness-0 invert object-contain drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]" 
                />
              </motion.div>
              <motion.p
                className="max-w-md text-xl md:text-2xl font-light tracking-wider text-white/90 relative z-10 mt-2 drop-shadow-md"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                नयाँ युगको डिजिटल अनुभव
              </motion.p>
              <motion.div
                className="mt-12 flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
              >
                <div className="h-[1px] w-12 bg-foreground/30" />
                <span className="text-[10px] font-medium tracking-[0.2em] text-white/50 uppercase">
                  Scroll down
                </span>
                <svg className="h-3 w-3 animate-bounce text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </div>
          </motion.div>

          <motion.div className="absolute inset-x-0 bottom-0" style={{ opacity: step1Opacity }}>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent" />
            <div className="relative px-6 pb-16 md:px-12 md:pb-20 lg:px-20">
              <p className="mb-3 font-mono text-[10px] font-medium uppercase tracking-[0.4em] text-blue-400/70">01</p>
              <h2
                className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
                style={{ textShadow: "0 4px 30px rgba(0,0,0,0.4)" }}
              >
                Meet Exa AI.
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60 md:text-base">
                Your built-in AI analyst answers sales, customer and inventory questions in plain language.
              </p>
            </div>
          </motion.div>

          <motion.div className="absolute inset-x-0 bottom-0" style={{ opacity: step2Opacity }}>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent" />
            <div className="relative flex justify-end px-6 pb-16 md:px-12 md:pb-20 lg:px-20">
              <div className="text-right">
                <p className="mb-3 font-mono text-[10px] font-medium uppercase tracking-[0.4em] text-blue-400/70">02</p>
                <h2
                  className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
                  style={{ textShadow: "0 4px 30px rgba(0,0,0,0.4)" }}
                >
                  IRD-Ready
                  <br />
                  Sales Register.
                </h2>
                <p className="ml-auto mt-4 max-w-sm text-sm leading-relaxed text-white/60 md:text-base">
                  Bikri khata, credit notes and tax breakdowns formatted for compliance, exportable to Excel.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div className="absolute inset-x-0 bottom-0" style={{ opacity: step3Opacity }}>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
            <div className="relative px-6 pb-16 md:px-12 md:pb-20 lg:px-20">
              <p className="mb-3 font-mono text-[10px] font-medium uppercase tracking-[0.4em] text-blue-400/70">03</p>
              <h2
                className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
                style={{ textShadow: "0 4px 30px rgba(0,0,0,0.4)" }}
              >
                Live Stock &amp;
                <br />
                Inventory Ledger.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60 md:text-base">
                Track opening, inward, outward and closing values per item with instant gross-profit visibility.
              </p>
            </div>
          </motion.div>

          <div className="absolute inset-0 flex flex-col items-center justify-center pb-[25vh]">
            <motion.div 
              className="text-center px-6" 
              style={{ opacity: finalTextOpacity, scale: finalTextScale }}
            >
              <p className="mb-2 font-mono text-[4px] md:text-[6px] uppercase tracking-[0.3em] text-blue-400/60">Features</p>
              <h2 className="mx-auto max-w-3xl text-xl font-semibold tracking-tight text-white md:text-3xl leading-snug" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>
                Everything your business needs
                <br />
                to{" "}
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  operate smarter.
                </span>
              </h2>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
