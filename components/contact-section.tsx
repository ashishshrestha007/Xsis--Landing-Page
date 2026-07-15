"use client"

import React, { useRef, useState } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion"

// Magnetic Button Component
function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  const { x, y } = position
  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="relative w-full rounded-[1px] bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-[2px] mt-4 overflow-hidden group"
    >
      <div className="absolute inset-0 bg-foreground/20 group-hover:opacity-0 transition-opacity" />
      <div className="relative w-full rounded-[1px] bg-black/50 backdrop-blur-md px-8 py-4 transition-all group-hover:bg-transparent">
        <span className="relative z-10 text-sm font-bold tracking-widest text-white uppercase flex items-center justify-center gap-2">
          {children}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
            →
          </span>
        </span>
      </div>
    </motion.button>
  )
}

// 3D Tilt Card Component
function TiltCard({ children, delay }: { children: React.ReactNode, delay: number }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 10 })
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 10 })
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, type: "spring" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative group perspective-[1000px] w-full"
    >
      {children}
    </motion.div>
  )
}

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  })

  // Parallax background
  const yBg = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"])
  const opacityBg = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1])

  return (
    <footer ref={containerRef} className="relative border-t border-foreground/10 bg-[#020202] pt-32 pb-12 overflow-hidden z-10">
      {/* Animated Background Mesh */}
      <motion.div style={{ y: yBg, opacity: opacityBg }} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] mix-blend-screen animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
          
          {/* Animated Content */}
          <div className="flex flex-col items-center text-center">
            <motion.a 
              href="#"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, rotate: -2 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="mb-12 inline-block origin-center"
            >
              <img src="/Logo.png" alt="Xsis" className="h-48 md:h-64 w-auto brightness-0 invert object-contain filter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]" />
            </motion.a>
            
            <div className="overflow-hidden mb-6">
              <motion.h2 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl font-black tracking-tight text-white md:text-6xl drop-shadow-2xl"
              >
                Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500">Connect.</span>
              </motion.h2>
            </div>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-16 max-w-xl text-lg text-white/60 font-light leading-relaxed"
            >
              Ready to transform your business? Get in touch with us to see how Xsis can help you streamline operations and scale seamlessly.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full perspective-[1000px]">
              
              <TiltCard delay={0.3}>
                <div className="group flex flex-col items-center text-center gap-4 rounded-[1px] border border-foreground/10 bg-white/[0.03] p-8 transition-all hover:bg-white/[0.08] hover:border-blue-500/50 shadow-lg hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] backdrop-blur-md h-full" style={{ transform: "translateZ(30px)" }}>
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 transition-all duration-500 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-2">Email Us</p>
                    <a href="mailto:xsispress@gmail.com" className="text-lg font-medium text-white transition-colors hover:text-blue-300">xsispress@gmail.com</a>
                  </div>
                </div>
              </TiltCard>

              <TiltCard delay={0.4}>
                <div className="group flex flex-col items-center text-center gap-4 rounded-[1px] border border-foreground/10 bg-white/[0.03] p-8 transition-all hover:bg-white/[0.08] hover:border-emerald-500/50 shadow-lg hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] backdrop-blur-md h-full" style={{ transform: "translateZ(30px)" }}>
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 transition-all duration-500 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(16,185,129,0.6)]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-2">Call Us</p>
                    <a href="tel:+9779805533804" className="text-lg font-medium text-white transition-colors hover:text-emerald-300">9805533804 / 9805533806</a>
                  </div>
                </div>
              </TiltCard>

              <TiltCard delay={0.5}>
                <div className="group flex flex-col items-center text-center gap-4 rounded-[1px] border border-foreground/10 bg-white/[0.03] p-8 transition-all hover:bg-white/[0.08] hover:border-purple-500/50 shadow-lg hover:shadow-[0_0_40px_rgba(168,85,247,0.3)] backdrop-blur-md h-full" style={{ transform: "translateZ(30px)" }}>
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-400 transition-all duration-500 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 mb-2">Visit Us</p>
                    <p className="text-lg font-medium text-white group-hover:text-purple-300 transition-colors">Kathmandu, Nepal</p>
                  </div>
                </div>
              </TiltCard>

            </div>
          </div>
        </div>
        {/* Bottom Copyright Row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-32 flex flex-col items-center justify-between gap-6 border-t border-foreground/10 pt-10 md:flex-row text-sm text-white/40 font-light"
        >
          <p>© {new Date().getFullYear()} Xsis Software. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="transition-colors hover:text-white">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-white">Terms of Service</a>
            <a href="#" className="transition-colors hover:text-white">Cookie Policy</a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
