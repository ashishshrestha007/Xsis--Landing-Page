"use client"

import React, { useRef, useState, MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
    },
  },
}

// 3D Tilt Card Component with Spotlight
function TiltCard({ children, className, glowColor = "rgba(147, 51, 234, 0.15)" }: { children: React.ReactNode, className?: string, glowColor?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(useMotionValue(0), { stiffness: 500, damping: 50 })
  const mouseY = useSpring(useMotionValue(0), { stiffness: 500, damping: 50 })

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const clientX = e.clientX - rect.left
    const clientY = e.clientY - rect.top

    const xPct = clientX / width - 0.5
    const yPct = clientY / height - 0.5

    x.set(xPct)
    y.set(yPct)

    mouseX.set(clientX)
    mouseY.set(clientY)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  const rotateX = useTransform(y, [-0.5, 0.5], ["7deg", "-7deg"])
  const rotateY = useTransform(x, [-0.5, 0.5], ["-7deg", "7deg"])

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`group relative overflow-hidden rounded-3xl border border-foreground/10 bg-[#0a0a0a] transition-colors duration-500 hover:bg-[#111] ${className}`}
    >
      {/* 3D Inner Content Wrapper */}
      <div 
        className="relative h-full w-full p-8 z-10 flex flex-col justify-between"
        style={{ transform: "translateZ(50px)" }}
      >
        {children}
      </div>

      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              ${glowColor},
              transparent 40%
            )
          `,
        }}
      />
      {/* Subtle border glow that follows mouse */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-20 mix-blend-overlay"
        style={{
          border: '1px solid transparent',
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.3),
              transparent 20%
            ) border-box
          `,
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
    </motion.div>
  )
}

export default function BentoFeatures() {
  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32" style={{ perspective: "2000px" }}>
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 md:mb-20 text-center"
        >
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-purple-400/60">Capabilities</p>
          <h2 className="mx-auto max-w-3xl text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">scale faster.</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[280px]"
        >
          {/* Predictive Cashflow - Large Box */}
          <TiltCard className="md:col-span-2 md:row-span-2" glowColor="rgba(245, 158, 11, 0.15)">
            <div>
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="mb-8 inline-flex rounded-2xl bg-amber-500/10 p-5 text-amber-400 backdrop-blur-md border border-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.2)]"
              >
                <svg className="h-10 w-10 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                </svg>
              </motion.div>
              <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight drop-shadow-md">Predictive Cashflow</h3>
              <p className="text-foreground/50 max-w-md text-lg leading-relaxed">
                Anticipate financial bottlenecks before they happen. Our intelligent engine maps historical data to predict future revenue and expenses with stunning accuracy.
              </p>
            </div>
          </TiltCard>

          {/* Mobile Access - Tall Box */}
          <TiltCard className="md:col-span-1 md:row-span-2" glowColor="rgba(59, 130, 246, 0.15)">
            <motion.div 
              whileHover={{ scale: 1.1, y: -5 }}
              className="mb-8 inline-flex rounded-2xl bg-blue-500/10 p-4 text-blue-400 backdrop-blur-md w-fit border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.2)]"
            >
              <svg className="h-8 w-8 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-3 drop-shadow-md">Access Anywhere</h3>
              <p className="text-foreground/50 text-base leading-relaxed">
                Generate invoices directly from your mobile phone. Your entire business in your pocket.
              </p>
            </div>
          </TiltCard>

          {/* Cloud Sync - Square Box */}
          <TiltCard className="md:col-span-1 lg:col-span-1" glowColor="rgba(6, 182, 212, 0.15)">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: -5 }}
              className="mb-6 inline-flex rounded-2xl bg-cyan-500/10 p-4 text-cyan-400 backdrop-blur-md w-fit border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.2)]"
            >
              <svg className="h-8 w-8 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" /></svg>
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2 drop-shadow-md">Cloud Sync</h3>
              <p className="text-foreground/50 text-sm leading-relaxed">Real-time data synchronization across all branches securely.</p>
            </div>
          </TiltCard>

          {/* IRD Reports - Square Box */}
          <TiltCard className="md:col-span-1 lg:col-span-1" glowColor="rgba(16, 185, 129, 0.15)">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="mb-6 inline-flex rounded-2xl bg-emerald-500/10 p-4 text-emerald-400 backdrop-blur-md w-fit border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
            >
                <svg className="h-8 w-8 drop-shadow-[0_0_15px_rgba(16,185,129,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2 drop-shadow-md">IRD Reports</h3>
              <p className="text-foreground/50 text-sm leading-relaxed">Best custom reports seamlessly synced and 100% compliant with IRD.</p>
            </div>
          </TiltCard>

          {/* Industry Wide Box */}
          <TiltCard className="md:col-span-2 lg:col-span-2" glowColor="rgba(249, 115, 22, 0.15)">
            <div className="flex items-center gap-8 h-full">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="hidden md:flex rounded-3xl bg-orange-500/10 p-6 text-orange-400 backdrop-blur-md border border-orange-500/20 shadow-[0_0_40px_rgba(249,115,22,0.2)]"
              >
                <svg className="h-12 w-12 drop-shadow-[0_0_20px_rgba(249,115,22,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" /></svg>
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3 drop-shadow-md">Built for Every Industry</h3>
                <p className="text-foreground/50 text-base mb-6 leading-relaxed">
                  Bespoke configurations ready out of the box for specialized sectors.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Travel', 'Vehicle', 'Construction', 'Trading'].map((industry, i) => (
                    <motion.span 
                      key={industry}
                      initial={{ opacity: 0, scale: 0.8, z: -20 }}
                      whileInView={{ opacity: 1, scale: 1, z: 0 }}
                      transition={{ delay: 0.5 + (i * 0.1), type: "spring" }}
                      className="px-5 py-2 rounded-full bg-foreground/5 border border-foreground/10 text-sm font-semibold text-foreground/90 hover:bg-foreground/10 hover:border-foreground/30 transition-colors cursor-default"
                      style={{ transform: "translateZ(30px)" }}
                    >
                      {industry}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  )
}
