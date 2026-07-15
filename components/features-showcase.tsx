"use client"

import React, { Suspense, useRef, MouseEvent, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, RoundedBox, Text, Sparkles, ContactShadows, Html, Cylinder, useVideoTexture } from "@react-three/drei"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useScroll,
  useTransform as useScrollTransform,
  AnimatePresence,
} from "framer-motion"
import * as THREE from "three"

/* ─── Premium 3D Scenes ─── */

function AiInvoiceScene() {
  const groupRef = useRef<THREE.Group>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const chipRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (groupRef.current) groupRef.current.rotation.y = Math.sin(t * 0.35) * 0.25
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.4
      ringRef.current.rotation.z = t * 0.25
    }
    if (chipRef.current) {
      chipRef.current.position.y = 0.95 + Math.sin(t * 2) * 0.05
    }
  })

  return (
    <>
      <color attach="background" args={["#0d0520"]} />
      <fog attach="fog" args={["#0d0520", 5, 12]} />
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 4, 4]} intensity={3} color="#c084fc" />
      <pointLight position={[-4, -1, 3]} intensity={2} color="#818cf8" />
      <spotLight position={[0, 5, 2]} intensity={1.5} color="#e879f9" angle={0.4} penumbra={1} />

      <Sparkles count={60} scale={5} size={2} speed={0.4} color="#c084fc" opacity={0.6} />

      <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.4}>
        <group ref={groupRef}>
          {/* Invoice paper — bright white */}
          <RoundedBox args={[1.7, 2.2, 0.06]} radius={0.05} smoothness={6}>
            <meshPhysicalMaterial
              color="#f0eeff"
              metalness={0.1}
              roughness={0.15}
              clearcoat={1}
              clearcoatRoughness={0.1}
              emissive="#1e1040"
              emissiveIntensity={0.05}
            />
          </RoundedBox>

          {/* Purple header bar */}
          <RoundedBox args={[1.7, 0.35, 0.04]} radius={0.03} position={[0, 0.92, 0.04]}>
            <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.8} metalness={0.5} roughness={0.2} />
          </RoundedBox>

          {/* Text lines */}
          {[
            { y: 0.55, w: 1.1, color: "#a78bfa", emissive: 0.6 },
            { y: 0.2, w: 0.9, color: "#6b7280", emissive: 0.1 },
            { y: -0.1, w: 1.0, color: "#6b7280", emissive: 0.1 },
            { y: -0.4, w: 0.7, color: "#6b7280", emissive: 0.1 },
            { y: -0.75, w: 0.5, color: "#7c3aed", emissive: 0.5 },
          ].map((line, i) => (
            <RoundedBox key={i} args={[line.w, 0.05, 0.02]} radius={0.01} position={[0, line.y, 0.04]}>
              <meshStandardMaterial color={line.color} emissive={line.color} emissiveIntensity={line.emissive} />
            </RoundedBox>
          ))}

          {/* AI chip badge */}
          <group ref={chipRef} position={[0.55, 0.95, 0.1]}>
            <RoundedBox args={[0.45, 0.45, 0.08]} radius={0.06}>
              <meshStandardMaterial color="#9333ea" emissive="#a855f7" emissiveIntensity={2} metalness={0.9} roughness={0.05} />
            </RoundedBox>
            <Text position={[0, 0, 0.05]} fontSize={0.12} color="#fff" anchorX="center" anchorY="middle">
              AI
            </Text>
          </group>
        </group>
      </Float>

      {/* Glowing orbit ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.5, 0.025, 16, 100]} />
        <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={3} transparent opacity={0.8} />
      </mesh>

      <ContactShadows position={[0, -1.4, 0]} opacity={0.4} scale={5} blur={2.5} far={4} color="#4c1d95" />
    </>
  )
}

function EasyInvoiceScene() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) groupRef.current.rotation.y = clock.getElapsedTime() * 0.2
  })

  return (
    <>
      <color attach="background" args={["#020f1f"]} />
      <fog attach="fog" args={["#020f1f", 5, 12]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 3, 3]} intensity={3} color="#38bdf8" />
      <pointLight position={[-3, 1, 2]} intensity={2} color="#0ea5e9" />

      <Sparkles count={40} scale={4} size={1.5} speed={0.6} color="#38bdf8" opacity={0.5} />

      <group ref={groupRef}>
        {[0, 1, 2].map((i) => (
          <Float key={i} speed={1.2 + i * 0.3} floatIntensity={0.25}>
            <RoundedBox
              args={[1.5, 1.9, 0.05]}
              radius={0.04}
              smoothness={6}
              position={[i * 0.18 - 0.18, i * 0.1, -i * 0.08]}
              rotation={[0, i * 0.06, 0]}
            >
              <meshPhysicalMaterial
                color={i === 2 ? "#dbeafe" : "#eff6ff"}
                metalness={0.05}
                roughness={0.1}
                clearcoat={0.8}
                transparent
                opacity={0.85 + i * 0.05}
                emissive="#1e40af"
                emissiveIntensity={i === 2 ? 0.15 : 0.05}
              />
            </RoundedBox>
          </Float>
        ))}
      </group>

      {/* Lightning bolt — 3 segments */}
      <Float speed={4} floatIntensity={0.8}>
        <group position={[0.85, 0.3, 0.2]} rotation={[0, 0, -0.2]}>
          {[
            { y: 0.35, h: 0.55, rot: 0 },
            { y: -0.05, h: 0.35, rot: 0.6, x: -0.08 },
            { y: -0.35, h: 0.3, rot: -0.4, x: 0.06 },
          ].map((seg, i) => (
            <mesh key={i} position={[seg.x ?? 0, seg.y, 0.05]} rotation={[0, 0, seg.rot]}>
              <boxGeometry args={[0.07, seg.h, 0.04]} />
              <meshStandardMaterial color="#38bdf8" emissive="#7dd3fc" emissiveIntensity={5} />
            </mesh>
          ))}
        </group>
      </Float>

      {/* Speed streaks */}
      {[-0.6, -0.3, 0.0].map((y, i) => (
        <mesh key={i} position={[-1.1, y, 0.1]}>
          <boxGeometry args={[0.6 - i * 0.12, 0.025, 0.015]} />
          <meshStandardMaterial color="#3b82f6" emissive="#60a5fa" emissiveIntensity={2} transparent opacity={0.7 - i * 0.2} />
        </mesh>
      ))}

      <ContactShadows position={[0, -1.2, 0]} opacity={0.35} scale={4} blur={2} far={3} color="#1e3a8a" />
    </>
  )
}

function CustomReportsScene() {
  const barsRef = useRef<THREE.Group>(null)
  const heights = [0.7, 1.3, 0.9, 1.7, 1.1, 1.5, 0.8]
  const colors = ["#059669", "#10b981", "#34d399", "#6ee7b7", "#047857", "#a7f3d0", "#064e3b"]

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (barsRef.current) barsRef.current.rotation.y = Math.sin(t * 0.25) * 0.35
  })

  return (
    <>
      <color attach="background" args={["#021208"]} />
      <fog attach="fog" args={["#021208", 5, 12]} />
      <ambientLight intensity={0.45} />
      <pointLight position={[2, 5, 3]} intensity={3} color="#34d399" />
      <pointLight position={[-3, 0, 2]} intensity={1.5} color="#059669" />

      <Sparkles count={35} scale={4} size={1.5} speed={0.3} color="#34d399" opacity={0.4} />

      <group ref={barsRef} position={[0, -0.7, 0]}>
        {heights.map((h, i) => (
          <RoundedBox
            key={i}
            args={[0.3, h, 0.3]}
            radius={0.04}
            smoothness={6}
            position={[(i - 3) * 0.42, h / 2, 0]}
          >
            <meshStandardMaterial
              color={colors[i]}
              emissive={colors[i]}
              emissiveIntensity={1.2}
              metalness={0.4}
              roughness={0.2}
            />
          </RoundedBox>
        ))}

        {/* Platform */}
        <RoundedBox args={[3.4, 0.06, 0.7]} radius={0.02} position={[0, 0, 0]}>
          <meshStandardMaterial color="#064e3b" emissive="#059669" emissiveIntensity={0.3} metalness={0.8} roughness={0.2} />
        </RoundedBox>

        {/* Trend line dots */}
        {heights.map((h, i) => (
          <mesh key={`dot-${i}`} position={[(i - 3) * 0.42, h + 0.15, 0.05]}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial color="#fff" emissive="#6ee7b7" emissiveIntensity={3} />
          </mesh>
        ))}
      </group>

      {/* IRD badge */}
      <Float speed={2} floatIntensity={0.4}>
        <RoundedBox args={[0.9, 0.35, 0.06]} radius={0.06} position={[0, 1.6, 0]}>
          <meshStandardMaterial color="#059669" emissive="#10b981" emissiveIntensity={1.5} metalness={0.6} roughness={0.2} />
        </RoundedBox>
        <Text position={[0, 1.6, 0.05]} fontSize={0.13} color="#fff" anchorX="center" anchorY="middle">
          IRD ✓
        </Text>
      </Float>

      <ContactShadows position={[0, -0.7, 0]} opacity={0.4} scale={5} blur={2.5} far={4} color="#064e3b" />
    </>
  )
}

function SceneCanvas({ scene }: { scene: "ai" | "easy" | "reports" }) {
  return (
    <Canvas camera={{ position: [0, 0, 4.2], fov: 42 }} dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
      <Suspense fallback={null}>
        {scene === "ai" && <EasyInvoiceScene />}
        {scene === "easy" && <AiInvoiceScene />}
        {scene === "reports" && <CustomReportsScene />}
      </Suspense>
    </Canvas>
  )
}

function AnimatedImageSequence({ images, alt }: { images: string[], alt: string }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [images])

  const currentMedia = images[index]
  const isVideo = currentMedia?.endsWith('.mp4') || currentMedia?.endsWith('.webm')

  return (
    <div className="absolute inset-0 w-full h-full bg-black">
      {isVideo ? (
        <video
          key={currentMedia}
          src={currentMedia}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ transform: "translateZ(0)" }}
        />
      ) : (
        <img
          key={currentMedia}
          src={currentMedia}
          alt={alt}
          className="w-full h-full object-cover"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-black/20 transition-opacity duration-700 group-hover:opacity-0 z-10" />
    </div>
  )
}

/* ─── Premium Mini Feature Card ─── */

function MiniTiltCard({
  children,
  className,
  glowColor = "rgba(59, 130, 246, 0.15)",
  iconBg = "from-blue-500/20 to-blue-600/5",
}: {
  children: React.ReactNode
  className?: string
  glowColor?: string
  iconBg?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseX = useSpring(useMotionValue(0), { stiffness: 500, damping: 50 })
  const mouseY = useSpring(useMotionValue(0), { stiffness: 500, damping: 50 })

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  const rotateX = useTransform(y, [-0.5, 0.5], ["6deg", "-6deg"])
  const rotateY = useTransform(x, [-0.5, 0.5], ["-6deg", "6deg"])

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-md transition-all duration-300 hover:border-foreground/20 hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)] ${className}`}
    >
      <div className="relative z-10 p-5" style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(350px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 45%)
          `,
        }}
      />
      <div className={`pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br ${iconBg} blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
    </motion.div>
  )
}

/* ─── Feature data ─── */

const mainFeatures = [
  {
    id: "ai",
    scene: "ai" as const,
    tag: "01 — Operations",
    title: "Smart Inventory",
    headline: "Track stock levels across all locations.",
    description:
      "Get real-time visibility into your inventory. XSIS tracks stock movements, alerts you on low levels, and manages multiple warehouses effortlessly from a single dashboard.",
    stats: [{ value: "Live", label: "Tracking" }, { value: "Multi", label: "Warehouse" }],
    images: ["/videos/inventory.mp4"],
    accent: "text-purple-400",
    badgeBg: "bg-purple-500/10",
    badgeBorder: "border-purple-500/30",
    blobBg: "bg-purple-500/20",
    dotBg: "bg-purple-500",
    dotShadow: "shadow-purple-500/50",
    glow: "shadow-[0_0_80px_-20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_120px_-20px_rgba(168,85,247,0.5)]",
  },
  {
    id: "easy",
    scene: "easy" as const,
    tag: "02 — One-Click",
    title: "Easy Invoicing",
    headline: "Create bills at the speed of thought.",
    description:
      "Purchase orders, sales bills, and payment records — all in a buttery-smooth workflow. One click to create, one click to send, one click to track.",
    stats: [{ value: "3 sec", label: "Avg. bill time" }, { value: "Zero", label: "Training needed" }],
    images: ["/videos/invoicing.mp4"],
    accent: "text-blue-400",
    badgeBg: "bg-blue-500/10",
    badgeBorder: "border-blue-500/30",
    blobBg: "bg-blue-500/20",
    dotBg: "bg-blue-500",
    dotShadow: "shadow-blue-500/50",
    glow: "shadow-[0_0_80px_-20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_120px_-20px_rgba(59,130,246,0.5)]",
  },
  {
    id: "reports",
    scene: "reports" as const,
    tag: "03 — Analytics",
    title: "Custom Reports",
    headline: "Reports tailored to your business.",
    description:
      "Generate fully customized IRD-compliant reports — VAT summaries, ledger statements, profit & loss — configured exactly how your accountant needs them.",
    stats: [{ value: "100%", label: "IRD Compliant" }, { value: "50+", label: "Report types" }],
    images: ["/videos/report-animation.mp4"],
    accent: "text-emerald-400",
    badgeBg: "bg-emerald-500/10",
    badgeBorder: "border-emerald-500/30",
    blobBg: "bg-emerald-500/20",
    dotBg: "bg-emerald-500",
    dotShadow: "shadow-emerald-500/50",
    glow: "shadow-[0_0_80px_-20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_120px_-20px_rgba(16,185,129,0.5)]",
  },
]

const extraFeatures = [
  {
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>,
    title: "Mobile Billing", desc: "Run your entire business from your pocket.",
    color: "text-cyan-400", glow: "rgba(6,182,212,0.18)", iconBg: "from-cyan-500/30 to-cyan-600/5",
  },
  {
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" /></svg>,
    title: "Cloud Sync", desc: "Real-time sync across all branches.",
    color: "text-indigo-400", glow: "rgba(99,102,241,0.18)", iconBg: "from-indigo-500/30 to-indigo-600/5",
  },
  {
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" /></svg>,
    title: "Every Industry", desc: "Travel, Construction, Trading & more.",
    color: "text-orange-400", glow: "rgba(249,115,22,0.18)", iconBg: "from-orange-500/30 to-orange-600/5",
  },
  {
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
    title: "Enterprise Security", desc: "Bank-grade encryption & access control.",
    color: "text-pink-400", glow: "rgba(236,72,153,0.18)", iconBg: "from-pink-500/30 to-pink-600/5",
  },
  {
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM7.518 19.67a8.25 8.25 0 1113.184-4.184A8.25 8.25 0 017.518 19.67z" /></svg>,
    title: "Multi-Branch Sync", desc: "Manage unlimited locations in real-time.",
    color: "text-violet-400", glow: "rgba(139,92,246,0.18)", iconBg: "from-violet-500/30 to-violet-600/5",
  },
  {
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg>,
    title: "Inventory Control", desc: "Track stock levels across all warehouses.",
    color: "text-amber-400", glow: "rgba(245,158,11,0.18)", iconBg: "from-amber-500/30 to-amber-600/5",
  },
  {
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>,
    title: "Payment Tracking", desc: "Monitor receivables and payables live.",
    color: "text-teal-400", glow: "rgba(20,184,166,0.18)", iconBg: "from-teal-500/30 to-teal-600/5",
  },
  {
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
    title: "VAT & Tax Reports", desc: "Auto-calculated VAT, TDS & IRD filings.",
    color: "text-lime-400", glow: "rgba(132,204,22,0.18)", iconBg: "from-lime-500/30 to-lime-600/5",
  },
  {
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>,
    title: "User Roles", desc: "Granular permissions for every team member.",
    color: "text-rose-400", glow: "rgba(244,63,94,0.18)", iconBg: "from-rose-500/30 to-rose-600/5",
  },
  {
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
    title: "Live Dashboard", desc: "Real-time KPIs and business analytics.",
    color: "text-sky-400", glow: "rgba(14,165,233,0.18)", iconBg: "from-sky-500/30 to-sky-600/5",
  },
  {
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>,
    title: "Auto Backup", desc: "Daily encrypted cloud backups, always safe.",
    color: "text-fuchsia-400", glow: "rgba(217,70,239,0.18)", iconBg: "from-fuchsia-500/30 to-fuchsia-600/5",
  },
  {
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>,
    title: "Customer CRM", desc: "Manage clients, history & credit limits.",
    color: "text-yellow-400", glow: "rgba(234,179,8,0.18)", iconBg: "from-yellow-500/30 to-yellow-600/5",
  },
  {
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: "Multi-Currency", desc: "NPR, USD, INR — all in one system.",
    color: "text-emerald-400", glow: "rgba(16,185,129,0.18)", iconBg: "from-emerald-500/30 to-emerald-600/5",
  },
]

function VideoScreenMaterial({ url }: { url: string }) {
  const texture = useVideoTexture(url)
  return <meshBasicMaterial map={texture} toneMapped={false} />
}

function ThreeDMonitor({ feature }: { feature: any }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    // Subtle continuous floating
    const t = state.clock.getElapsedTime()
    groupRef.current.position.y = Math.sin(t * 1.5) * 0.05 - 0.2

    // Smooth follow mouse for parallax tilt (subtle)
    const targetRotX = (state.pointer.y * 0.1)
    const targetRotY = (state.pointer.x * 0.15)

    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.05
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05
  })

  return (
    <group ref={groupRef}>
      {/* Base */}
      <RoundedBox args={[1.0, 0.05, 0.7]} radius={0.02} position={[0, -1.2, 0]}>
        <meshPhysicalMaterial color="#f8f8f8" metalness={0.2} roughness={0.1} />
      </RoundedBox>

      {/* Stand Neck */}
      <mesh position={[0, -0.6, -0.2]} rotation={[0.1, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 1.3, 32]} />
        <meshPhysicalMaterial color="#f4f4f5" metalness={0.2} roughness={0.1} />
      </mesh>

      {/* Monitor Body (Bezel) */}
      <RoundedBox args={[3.2, 2.0, 0.08]} radius={0.05} position={[0, 0, 0.05]}>
        <meshPhysicalMaterial color="#ffffff" metalness={0.1} roughness={0.1} />
      </RoundedBox>

      {/* Metallic trim around bezel */}
      <RoundedBox args={[3.22, 2.02, 0.07]} radius={0.06} position={[0, 0, 0.045]}>
        <meshPhysicalMaterial color="#f8f8f8" metalness={0.3} roughness={0.1} />
      </RoundedBox>

      {/* Screen Area (Video Texture) */}
      <mesh position={[0, 0, 0.091]}>
        <planeGeometry args={[3.1, 1.9]} />
        <Suspense fallback={<meshBasicMaterial color="#111111" />}>
          <VideoScreenMaterial url={feature.images[0]} />
        </Suspense>
      </mesh>
    </group>
  )
}

/* ─── Main Component ─── */

export default function FeaturesShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
  const bgY = useScrollTransform(scrollYProgress, [0, 1], ["0%", "15%"])

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050505] pb-24 md:pb-32"
      style={{ perspective: "2000px" }}
    >
      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-purple-600/5 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-blue-600/5 blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-600/5 blur-[80px]" />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_20%,transparent_100%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 pt-24 md:pt-32">
        {/* Main 3 Feature Blocks */}
        <div className="relative space-y-24 md:space-y-32">

          {/* Vertical Connecting Line */}
          <div className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent z-0" />

          {mainFeatures.map((feature, index) => {
            const isReversed = index % 2 === 1;

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 100, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                className="relative z-10"
              >
                {/* Central Timeline Dot */}
                <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background border border-foreground/10 items-center justify-center z-20 shadow-[0_0_20px_rgba(255,255,255,0.02)]">
                  <div className={`w-3 h-3 rounded-full ${feature.dotBg} shadow-[0_0_15px_rgba(255,255,255,0.5)] ${feature.dotShadow}`} />
                </div>

                <div
                  className={`group relative grid items-center gap-12 md:gap-16 lg:gap-24 md:grid-cols-2 ${isReversed ? "md:[direction:rtl]" : ""} py-8`}
                  style={{ perspective: "2000px" }}
                >

                  {/* TEXT COLUMN */}
                  <div className={`${isReversed ? "md:[direction:ltr]" : ""} flex flex-col justify-center`}>

                    {/* Badge */}
                    <div className="mb-8 inline-flex">
                      <div className={`rounded-full border ${feature.badgeBorder} ${feature.badgeBg} px-5 py-2 backdrop-blur-md`}>
                        <p className={`font-mono text-[11px] uppercase tracking-[0.25em] ${feature.accent} font-semibold`}>
                          {feature.tag}
                        </p>
                      </div>
                    </div>

                    <h3 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-md">
                      {feature.title}
                    </h3>
                    <p className="mb-6 text-xl font-medium text-white/80 md:text-2xl leading-snug drop-shadow-sm">
                      {feature.headline}
                    </p>
                    <p className="mb-10 max-w-md text-base leading-relaxed text-white/50 font-light">
                      {feature.description}
                    </p>

                    {/* Stats */}
                    <div className="flex gap-12 mt-4">
                      {feature.stats.map((stat: any) => (
                        <div key={stat.label} className="flex flex-col items-start justify-center">
                          <p className={`text-4xl font-bold ${feature.accent} drop-shadow-sm tracking-tight`}>{stat.value}</p>
                          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* MEDIA COLUMN */}
                  <div
                    className={`${isReversed ? "md:[direction:ltr]" : ""}`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full" style={{ perspective: "2000px" }}>

                      {/* Ambient breathing glow behind the video */}
                      <motion.div
                        animate={{ opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className={`absolute -inset-4 md:-inset-8 rounded-[2rem] bg-gradient-to-br from-white/5 to-${feature.accent.replace('text-', '').split('-')[0]}-500/20 blur-3xl z-0`}
                      />

                      {/* 3D Monitor Canvas */}
                      <div className={`relative h-full w-full transition-transform duration-700 ease-out z-10`}>
                        <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
                          <ambientLight intensity={1.5} />
                          <spotLight position={[5, 10, 5]} intensity={2.5} penumbra={1} castShadow />
                          <directionalLight position={[-5, 5, 5]} intensity={1} color="#ffffff" />
                          <Suspense fallback={null}>
                            <ThreeDMonitor feature={feature} />
                          </Suspense>
                        </Canvas>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Extra Features Grid — 13 cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mt-24 md:mt-32"
        >
          <p className="mb-10 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
            And much more
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-4" style={{ perspective: "1200px" }}>
            {extraFeatures.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 60, scale: 0.8, rotateX: -20 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08, duration: 0.6, type: "spring", bounce: 0.4 }}
              >
                <MiniTiltCard glowColor={feat.glow} iconBg={feat.iconBg} className="h-full">
                  <div className={`mb-3 inline-flex rounded-xl bg-gradient-to-br ${feat.iconBg} p-2.5 ${feat.color} ring-1 ring-white/10`}>
                    {feat.icon}
                  </div>
                  <h4 className="mb-1 text-sm font-bold text-white leading-tight">{feat.title}</h4>
                  <p className="text-[11px] leading-relaxed text-white/40">{feat.desc}</p>
                </MiniTiltCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
