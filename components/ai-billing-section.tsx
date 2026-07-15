"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import LottiePlayer from "./lottie-player"
import chatbotAnimation from "../public/animations/chatbot.json"

export default function AiBillingSection() {
  const containerRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Direct 1:1 scroll mapping — no spring lag, line follows scroll instantly
  const pathLength = useTransform(scrollYProgress, [0, 0.55], [0, 1])
  const pathOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1])
  const curveY = useTransform(scrollYProgress, [0, 1], ["-5%", "25%"])

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-background pt-32 pb-24 md:pt-52 md:pb-32">
      {/* Sweeping Line Background */}
      <motion.div
        style={{ y: curveY }}
        className="pointer-events-none absolute inset-0 z-0 flex items-start justify-start"
      >
        <svg
          viewBox="0 0 1000 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -top-32 left-0 h-[150vh] w-auto max-w-none origin-top-left opacity-80"
        >
          <defs>
            <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="40%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <motion.path
            d="M -100,50 C 500,50 650,400 450,1100"
            stroke="url(#curveGradient)"
            strokeWidth="32"
            strokeLinecap="round"
            filter="url(#glow)"
            style={{ pathLength, opacity: pathOpacity }}
          />
        </svg>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-16 md:grid-cols-12 md:gap-8">
          {/* Massive Typography - Spans 8 cols */}
          <div className="md:col-span-8">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="text-6xl font-medium tracking-tighter text-foreground md:text-[7rem] lg:text-[9rem] lg:leading-[0.85]"
            >
              AI Billing,
              <br />
              <span className="text-foreground/60">Automated</span>
            </motion.h2>
          </div>

          {/* Right Side Description - Spans 4 cols */}
          <div className="flex flex-col justify-end md:col-span-4 md:pb-8 lg:pl-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
              className="text-base leading-relaxed text-foreground/50 md:text-lg"
            >
              We combine intelligent automation, live tracking, and seamless compliance into digital experiences that feel visually striking and functionally effortless. From instant invoice generation to deep financial analytics, we build tools that capture attention and invite growth.
            </motion.p>
          </div>
        </div>

        {/* Exa AI Engine - Floating without Box Container */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
          className="mt-20 md:mt-32 relative flex flex-col items-center justify-center group"
        >
          <div className="relative z-10 text-center flex flex-col items-center px-4">
            {/* Multi-layered glowing icon container (keeping the circular rings for the robot to sit in) */}
            <div className="mb-8 relative flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600/5 to-purple-600/5 shadow-[0_0_80px_-20px_rgba(168,85,247,0.3)] border border-purple-500/10 backdrop-blur-xl transition-all duration-700 group-hover:scale-110 group-hover:shadow-[0_0_120px_-15px_rgba(168,85,247,0.5)]">
              {/* Spinning rings */}
              <div className="absolute inset-2 rounded-full border border-purple-400/20 border-t-purple-400/60 animate-[spin_8s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-indigo-400/10 border-b-indigo-400/50 animate-[spin_12s_linear_infinite_reverse]" />
              
              {/* Lottie Animation */}
              <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 scale-[1.4]">
                <LottiePlayer animationData={chatbotAnimation} loop={true} />
              </div>
            </div>
            
            <h3 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground mb-4 drop-shadow-md">Exa AI Engine</h3>
            <p className="max-w-xl text-sm md:text-lg text-foreground/50 leading-relaxed">
              Powered by advanced machine learning to predict inventory needs, automate data entry, and spot financial anomalies instantly. Designed to work alongside you as a highly capable digital assistant.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
