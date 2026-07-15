"use client"

import React, { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform, useScroll, MotionValue } from "framer-motion"
import LottiePlayer from "@/components/lottie-player"
import liveChatbotAnimation from "@/public/animations/live-chatbot.json"

function MobileFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[280px] md:w-[320px] aspect-[9/19] mx-auto drop-shadow-[0_30px_50px_rgba(0,0,0,0.7)]" style={{ transformStyle: "preserve-3d" }}>
      
      {/* Edge Band (Hides gap between front and back) */}
      <div className="absolute inset-0 bg-[#d4d4d8] rounded-[2.5rem] md:rounded-[3rem] border border-[#f4f4f5]" style={{ transform: "translateZ(0px)" }} />

      {/* Front Face (Screen) */}
      <div className="absolute inset-0 bg-white rounded-[2.5rem] md:rounded-[3rem] border-[6px] md:border-[10px] border-[#f4f4f5] shadow-2xl flex flex-col ring-1 ring-white/50" style={{ transform: "translateZ(2px)", backfaceVisibility: "hidden" }}>
        {/* Dynamic Island / Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[35%] h-6 bg-black rounded-full z-30 shadow-inner" />
        {/* Inner Screen */}
        <div className="relative w-full h-full bg-background rounded-[1.8rem] md:rounded-[2.2rem] overflow-hidden ring-1 ring-black/20">
          {children}
          {/* Subtle Glare */}
          <div className="absolute top-0 left-0 w-[150%] h-[150%] bg-gradient-to-br from-white/20 via-transparent to-transparent -translate-y-1/4 -translate-x-1/4 rotate-12 pointer-events-none z-20" />
        </div>
      </div>

      {/* Back Face (Hardware Cover) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8f8f8] to-[#e4e4e7] rounded-[2.5rem] md:rounded-[3rem] border border-[#d4d4d8] shadow-inner flex flex-col items-center justify-center" style={{ transform: "translateZ(-2px) rotateY(180deg)", backfaceVisibility: "hidden" }}>
         {/* Logo on the back */}
         <div className="w-16 h-16 opacity-30">
            <img src="/Logo.png" alt="Logo" className="w-full h-full object-contain filter grayscale" />
         </div>
      </div>

    </div>
  )
}

function MonitorFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.8)]" style={{ transformStyle: "preserve-3d" }}>
      
      {/* Monitor Display Screen */}
      <div className="absolute top-0 w-full h-[calc(100%-4rem)] md:h-[calc(100%-5rem)]" style={{ transformStyle: "preserve-3d" }}>
        
        {/* Outer Aluminum Frame (Edge Band) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#a1a1aa] via-[#d4d4d8] to-[#a1a1aa] rounded-[1.2rem] md:rounded-[1.5rem] border border-[#f4f4f5]" style={{ transform: "translateZ(0px)" }} />

        {/* Front Glass Face (White Bezel) */}
        <div className="absolute inset-0 bg-[#f9fafb] rounded-[1.2rem] md:rounded-[1.5rem] p-3 md:p-4 flex flex-col shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05),0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden" style={{ transform: "translateZ(3px)", backfaceVisibility: "hidden" }}>
          
          {/* Inner Screen Area */}
          <div className="relative w-full h-full bg-[#050505] overflow-hidden rounded-md shadow-[0_0_0_1px_rgba(0,0,0,0.1),inset_0_0_20px_rgba(0,0,0,1)]">
            {children}
            {/* Ultra-realistic Glare 1 */}
            <div className="absolute top-0 left-0 w-[200%] h-[200%] bg-gradient-to-br from-white/20 via-white/5 to-transparent -translate-y-1/2 -translate-x-1/2 rotate-[25deg] pointer-events-none z-20" />
            {/* Ultra-realistic Glare 2 */}
            <div className="absolute top-0 right-0 w-[100%] h-[100%] bg-gradient-to-bl from-white/10 to-transparent translate-x-1/4 pointer-events-none z-20" />
            {/* Screen bezel inner shadow */}
            <div className="absolute inset-0 border border-black/10 rounded-md pointer-events-none z-30" />
          </div>

          {/* Camera Dot */}
          <div className="absolute top-1.5 md:top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-black/90 rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] flex items-center justify-center z-30">
             <div className="w-0.5 h-0.5 bg-blue-900/50 rounded-full" />
          </div>
          
        </div>

        {/* Back Face (Aluminum Cover) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8f8f8] to-[#a1a1aa] rounded-[1.2rem] md:rounded-[1.5rem] border border-[#d4d4d8] shadow-inner flex flex-col items-center justify-center" style={{ transform: "translateZ(-3px) rotateY(180deg)", backfaceVisibility: "hidden" }}>
           {/* Logo on the back */}
           <div className="w-24 h-24 opacity-30 drop-shadow-md" style={{ transform: "translateZ(1px)" }}>
              <img src="/Logo.png" alt="Logo" className="w-full h-full object-contain filter grayscale invert" />
           </div>
        </div>
      </div>

      {/* Realistic Aluminum Stand */}
      <div className="absolute bottom-0 w-full flex flex-col items-center" style={{ transformStyle: "preserve-3d", transform: "translateZ(-40px)" }}>
        {/* Stand Neck - Sleek Aluminum */}
        <div className="w-[10%] md:w-[7%] h-16 md:h-24 bg-gradient-to-b from-[#e4e4e7] via-[#d4d4d8] to-[#71717a] shadow-[inset_1px_0_3px_rgba(255,255,255,0.8),inset_-1px_0_3px_rgba(0,0,0,0.3)]" style={{ transform: "translateZ(2px)", backfaceVisibility: "hidden" }} />
        
        {/* Base Plate */}
        <div className="w-[45%] md:w-[35%] h-1.5 md:h-2.5 bg-gradient-to-b from-[#f4f4f5] to-[#71717a] rounded-t-sm rounded-b-xl shadow-[0_20px_40px_rgba(0,0,0,0.8)]" style={{ transform: "translateZ(2px)", backfaceVisibility: "hidden" }} />
        
        {/* Back of Neck & Base */}
        <div className="absolute bottom-1.5 md:bottom-2.5 w-[10%] md:w-[7%] h-16 md:h-24 bg-gradient-to-b from-[#71717a] to-[#d4d4d8] shadow-inner" style={{ transform: "translateZ(-2px) rotateY(180deg)", backfaceVisibility: "hidden" }} />
        <div className="absolute bottom-0 w-[45%] md:w-[35%] h-1.5 md:h-2.5 bg-gradient-to-b from-[#71717a] to-[#e4e4e7] rounded-t-sm rounded-b-xl shadow-[0_20px_40px_rgba(0,0,0,0.8)]" style={{ transform: "translateZ(-2px) rotateY(180deg)", backfaceVisibility: "hidden" }} />
      </div>

    </div>
  )
}

function Immersive3DView({ 
  children, 
}: { 
  children: React.ReactNode
}) {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  // Smooth springs for rotation
  const smoothX = useSpring(rotateX, { stiffness: 50, damping: 20 })
  const smoothY = useSpring(rotateY, { stiffness: 50, damping: 20 })

  return (
    <div style={{ perspective: 3000 }} className="h-full w-full">
      <motion.div
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0}
        onDrag={(e, info) => {
          // Allows 360 degree spinning by dragging!
          rotateY.set(rotateY.get() + info.delta.x * 0.4)
          rotateX.set(rotateX.get() - info.delta.y * 0.4)
        }}
        style={{ rotateX: smoothX, rotateY: smoothY, transformStyle: "preserve-3d" }}
        className="group relative flex h-full w-full items-center justify-center cursor-grab active:cursor-grabbing"
      >
        <div style={{ transform: "translateZ(80px)", transformStyle: "preserve-3d" }} className="relative z-10 flex h-full w-full items-center">
          {children}
        </div>
      </motion.div>
    </div>
  )
}

function SceneCard({ 
  opacity, 
  y, 
  pointerEvents, 
  children 
}: { 
  opacity: MotionValue<number>, 
  y: MotionValue<number>, 
  pointerEvents: MotionValue<string>,
  children: React.ReactNode 
}) {
  return (
    <motion.div 
      style={{ opacity, y, pointerEvents }} 
      className="absolute inset-0 flex items-center justify-center w-full h-full"
    >
      <div className="w-full max-w-[90rem] px-6 md:px-12 h-[80vh] md:h-[70vh]">
        {children}
      </div>
    </motion.div>
  )
}

export default function CoreFeatures() {
  const targetRef = useRef<HTMLDivElement>(null)
  
  // Create a sticky scroll timeline (600vh height gives 100vh per card)
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end end"] })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25, restDelta: 0.001 })
  
  const yVals = [80, 0, 0, -80]
  const opVals = [0, 1, 1, 0]

  // Card 1
  const c1_op = useTransform(smoothProgress, [0, 0.05, 0.14, 0.18], opVals)
  const c1_y = useTransform(smoothProgress, [0, 0.05, 0.14, 0.18], yVals)
  const c1_pt = useTransform(c1_op, v => v > 0.1 ? "auto" : "none")

  // Card 2
  const c2_op = useTransform(smoothProgress, [0.16, 0.21, 0.30, 0.34], opVals)
  const c2_y = useTransform(smoothProgress, [0.16, 0.21, 0.30, 0.34], yVals)
  const c2_pt = useTransform(c2_op, v => v > 0.1 ? "auto" : "none")

  // Card 3
  const c3_op = useTransform(smoothProgress, [0.32, 0.37, 0.46, 0.50], opVals)
  const c3_y = useTransform(smoothProgress, [0.32, 0.37, 0.46, 0.50], yVals)
  const c3_pt = useTransform(c3_op, v => v > 0.1 ? "auto" : "none")

  // Card 4
  const c4_op = useTransform(smoothProgress, [0.48, 0.53, 0.62, 0.66], opVals)
  const c4_y = useTransform(smoothProgress, [0.48, 0.53, 0.62, 0.66], yVals)
  const c4_pt = useTransform(c4_op, v => v > 0.1 ? "auto" : "none")

  // Card 5
  const c5_op = useTransform(smoothProgress, [0.64, 0.69, 0.78, 0.82], opVals)
  const c5_y = useTransform(smoothProgress, [0.64, 0.69, 0.78, 0.82], yVals)
  const c5_pt = useTransform(c5_op, v => v > 0.1 ? "auto" : "none")

  // Card 6
  const c6_op = useTransform(smoothProgress, [0.80, 0.85, 0.96, 1], [0, 1, 1, 1]) // Stays on screen at the very end
  const c6_y = useTransform(smoothProgress, [0.80, 0.85, 0.96, 1], [80, 0, 0, 0])
  const c6_pt = useTransform(c6_op, v => v > 0.1 ? "auto" : "none")

  return (
    <section ref={targetRef} className="relative h-[600vh] bg-black">
      {/* Sticky container that stays on screen while scrolling */}
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover opacity-80"
          >
            <source src="/animatedvideo.mp4" type="video/mp4" />
          </video>
          {/* Subtle darkening for text contrast without hiding the video */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>

        {/* Fixed Title at the Top */}
        <div className="absolute top-10 md:top-16 z-20 w-full px-6 text-center pointer-events-none">
          <span className="mb-4 inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-6 py-2 font-mono text-[11px] md:text-[13px] uppercase tracking-[0.4em] text-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.2)] backdrop-blur-md">
            Core Architecture
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-2xl">
            Next-generation software for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500">modern businesses.</span>
          </h2>
          <p className="mt-4 text-white/50 text-sm md:text-base">Drag the screens to rotate 360°</p>
        </div>

        {/* Container for the Massive Floating Elements */}
        <div className="relative z-10 w-full flex-grow mt-24 md:mt-32">
          
          {/* Feature 1 - Monitor */}
          <SceneCard opacity={c1_op} y={c1_y} pointerEvents={c1_pt}>
            <Immersive3DView>
              <div className="flex flex-col md:flex-row h-full w-full gap-8 md:gap-24 items-center">
                {/* Text Side */}
                <div className="flex flex-col justify-center flex-1 w-full text-center md:text-left" style={{ transform: "translateZ(30px)" }}>
                  <h3 className="mb-6 text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-2xl">Easy Invoicing</h3>
                  <p className="text-xl md:text-3xl leading-relaxed text-white/70 font-light">
                    Create purchase orders, record invoices, and issue sales bills with unprecedented speed and a buttery smooth workflow.
                  </p>
                  <div className="mt-12 md:mt-16 flex items-baseline justify-center md:justify-start gap-4">
                    <span className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 drop-shadow-[0_0_30px_rgba(59,130,246,0.4)]">Lightning</span>
                    <span className="text-lg md:text-2xl font-bold text-white/30 uppercase tracking-[0.5em]">fast</span>
                  </div>
                </div>
                {/* Monitor Side */}
                <div className="relative flex-1 w-full h-[35vh] md:h-[55vh]" style={{ transform: "translateZ(80px)" }}>
                  <MonitorFrame>
                    <video src="/videos/invoicing.mp4" autoPlay loop muted playsInline className="h-full w-full object-cover scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#000000]/40 to-transparent" />
                  </MonitorFrame>
                  <div className="absolute -inset-20 -z-10 bg-blue-600/30 blur-[120px] rounded-full" style={{ transform: "translateZ(-10px)" }} />
                </div>
              </div>
            </Immersive3DView>
          </SceneCard>

          {/* Feature 2 - Exa AI (Floating, No Monitor) */}
          <SceneCard opacity={c2_op} y={c2_y} pointerEvents={c2_pt}>
            <Immersive3DView>
              <div className="flex flex-col md:flex-row h-full w-full gap-8 md:gap-24 items-center">
                <div className="flex flex-col justify-center flex-1 w-full text-center md:text-left" style={{ transform: "translateZ(30px)" }}>
                  <h3 className="mb-6 text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-2xl">AI Automated Billing</h3>
                  <p className="text-xl md:text-3xl leading-relaxed text-white/70 font-light">
                    Let Exa AI instantly generate your bills, predict financial trends, and completely automate repetitive data entry.
                  </p>
                  <div className="mt-12 md:mt-16 flex items-baseline justify-center md:justify-start gap-4">
                    <span className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">Smart</span>
                    <span className="text-lg md:text-2xl font-bold text-white/30 uppercase tracking-[0.5em]">automation</span>
                  </div>
                </div>
                <div className="relative flex-1 w-full h-[35vh] md:h-[55vh]" style={{ transform: "translateZ(80px)" }}>
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="h-56 w-56 md:h-96 md:w-96 drop-shadow-[0_0_50px_rgba(168,85,247,0.6)]">
                      <LottiePlayer animationData={liveChatbotAnimation} loop={true} />
                    </div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 -z-10 bg-purple-600/30 blur-[120px] rounded-full" style={{ transform: "translateZ(-10px)" }} />
                </div>
              </div>
            </Immersive3DView>
          </SceneCard>

          {/* Feature 3 - Monitor */}
          <SceneCard opacity={c3_op} y={c3_y} pointerEvents={c3_pt}>
            <Immersive3DView>
              <div className="flex flex-col md:flex-row h-full w-full gap-8 md:gap-24 items-center">
                <div className="flex flex-col justify-center flex-1 w-full text-center md:text-left" style={{ transform: "translateZ(30px)" }}>
                  <h3 className="mb-6 text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-2xl">Best Custom Reports</h3>
                  <p className="text-xl md:text-3xl leading-relaxed text-white/70 font-light">
                    Generate the absolute best, fully customized IRD-compliant reports tailored exactly to your specific business needs.
                  </p>
                  <div className="mt-12 md:mt-16 flex items-baseline justify-center md:justify-start gap-4">
                    <span className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600 drop-shadow-[0_0_30px_rgba(16,185,129,0.4)]">100%</span>
                    <span className="text-lg md:text-2xl font-bold text-white/30 uppercase tracking-[0.5em]">compliant</span>
                  </div>
                </div>
                <div className="relative flex-1 w-full h-[35vh] md:h-[55vh]" style={{ transform: "translateZ(80px)" }}>
                  <MonitorFrame>
                    <video src="/videos/report-animation.mp4" autoPlay loop muted playsInline className="h-full w-full object-cover scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#000000]/40 to-transparent" />
                  </MonitorFrame>
                  <div className="absolute -inset-20 -z-10 bg-emerald-600/30 blur-[120px] rounded-full" style={{ transform: "translateZ(-10px)" }} />
                </div>
              </div>
            </Immersive3DView>
          </SceneCard>

          {/* Feature 4 - Monitor */}
          <SceneCard opacity={c4_op} y={c4_y} pointerEvents={c4_pt}>
            <Immersive3DView>
              <div className="flex flex-col md:flex-row h-full w-full gap-8 md:gap-24 items-center">
                <div className="flex flex-col justify-center flex-1 w-full text-center md:text-left" style={{ transform: "translateZ(30px)" }}>
                  <h3 className="mb-6 text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-2xl">Built for Every Industry</h3>
                  <p className="text-xl md:text-3xl leading-relaxed text-white/70 font-light">
                    Bespoke setups perfectly adapted for Travel, Construction, Trading, Vehicles, and Retail. It just works.
                  </p>
                  <div className="mt-12 md:mt-16 flex items-baseline justify-center md:justify-start gap-4">
                    <span className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 drop-shadow-[0_0_30px_rgba(249,115,22,0.4)]">Bespoke</span>
                    <span className="text-lg md:text-2xl font-bold text-white/30 uppercase tracking-[0.5em]">setup</span>
                  </div>
                </div>
                <div className="relative flex-1 w-full h-[35vh] md:h-[55vh]" style={{ transform: "translateZ(80px)" }}>
                  <MonitorFrame>
                    <img src="/3d-images/built-for-industry.jpeg" alt="Industry" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#000000]/40 to-transparent" />
                  </MonitorFrame>
                  <div className="absolute -inset-20 -z-10 bg-orange-600/30 blur-[120px] rounded-full" style={{ transform: "translateZ(-10px)" }} />
                </div>
              </div>
            </Immersive3DView>
          </SceneCard>

          {/* Feature 5 - MOBILE PHONE */}
          <SceneCard opacity={c5_op} y={c5_y} pointerEvents={c5_pt}>
            <Immersive3DView>
              <div className="flex flex-col md:flex-row h-full w-full gap-8 md:gap-24 items-center">
                <div className="flex flex-col justify-center flex-1 w-full text-center md:text-left" style={{ transform: "translateZ(30px)" }}>
                  <h3 className="mb-6 text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-2xl">Mobile Billing App</h3>
                  <p className="text-xl md:text-3xl leading-relaxed text-white/70 font-light">
                    Run your entire business from your pocket. Generate bills, check inventory, and view reports seamlessly on mobile.
                  </p>
                  <div className="mt-12 md:mt-16 flex items-baseline justify-center md:justify-start gap-4">
                    <span className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600 drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]">Pocket</span>
                    <span className="text-lg md:text-2xl font-bold text-white/30 uppercase tracking-[0.5em]">power</span>
                  </div>
                </div>
                <div className="relative flex-1 w-full h-[50vh] md:h-[65vh]" style={{ transform: "translateZ(80px)" }}>
                  <MobileFrame>
                    <img src="/3d-images/mobile-billing.jpeg" alt="Mobile" className="h-full w-full object-cover scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#000000]/20 to-transparent" />
                  </MobileFrame>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 -z-10 bg-cyan-600/30 blur-[120px] rounded-full" style={{ transform: "translateZ(-10px)" }} />
                </div>
              </div>
            </Immersive3DView>
          </SceneCard>

          {/* Feature 6 - Monitor */}
          <SceneCard opacity={c6_op} y={c6_y} pointerEvents={c6_pt}>
            <Immersive3DView>
              <div className="flex flex-col md:flex-row h-full w-full gap-8 md:gap-24 items-center">
                <div className="flex flex-col justify-center flex-1 w-full text-center md:text-left" style={{ transform: "translateZ(30px)" }}>
                  <h3 className="mb-6 text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-2xl">Multi-Branch Sync</h3>
                  <p className="text-xl md:text-3xl leading-relaxed text-white/70 font-light">
                    Manage unlimited locations and companies in real-time with enterprise-grade cloud security and instant syncing.
                  </p>
                  <div className="mt-12 md:mt-16 flex items-baseline justify-center md:justify-start gap-4">
                    <span className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600 drop-shadow-[0_0_30px_rgba(236,72,153,0.4)]">Real-time</span>
                    <span className="text-lg md:text-2xl font-bold text-white/30 uppercase tracking-[0.5em]">sync</span>
                  </div>
                </div>
                <div className="relative flex-1 w-full h-[35vh] md:h-[55vh]" style={{ transform: "translateZ(80px)" }}>
                  <MonitorFrame>
                    <img src="/3d-images/multi-branch.jpeg" alt="Multi-Branch" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#000000]/40 to-transparent" />
                  </MonitorFrame>
                  <div className="absolute -inset-20 -z-10 bg-pink-600/30 blur-[120px] rounded-full" style={{ transform: "translateZ(-10px)" }} />
                </div>
              </div>
            </Immersive3DView>
          </SceneCard>

        </div>
      </div>
    </section>
  )
}
