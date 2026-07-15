"use client"

import React, { useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion"

const content = {
  en: {
    title: "Why XSIS Exists",
    scene1_0: "Every great product begins with a problem...",
    scene1_1: "For years, we watched businesses spend countless hours writing bills manually, checking stock by hand, searching through registers, and creating reports at the end of every month.",
    scene1_2: "Technology had advanced, but many businesses were still trapped in outdated workflows.",
    scene2: "We believed there had to be a better way.\n\nThat belief became XSIS.",
    scene3: "XSIS wasn't built simply to create invoices. It was created to become the intelligent operating system for modern businesses a platform that connects sales, inventory, accounting, reporting, and AI into one seamless experience.",
    scene4_1: "We believed business could be simpler.",
    scene4_2: "We believed technology should work for people.",
    scene4_3: "We believed AI should help everyone.",
    scene5: "Make business management effortless.",
    scene6_1: "Anytime. Anywhere. On Any Device.",
    scene6_2: "No complicated setup.\nNo endless paperwork.\nNo guessing.\n\nJust real-time insights, automated workflows, and complete control.",
    scene7_1: "Today, Artificial Intelligence is transforming the way businesses operate. Instead of forcing people to learn complicated software, XSIS uses AI to simplify everyday work.",
    scene7_2: "Need to create reports? AI helps.\nNeed business insights? AI explains them.\nNeed smarter decisions? AI provides recommendations.",
    scene7_3: "Technology should adapt to people not the other way around.",
    scene8_1: "We don't just build billing software.\nWe build confidence.\nWe build automation.\nWe build intelligence.\nWe build the future of business.",
    scene8_2: "The future isn't coming.\n\nYou're already using it.",
    scene8_3: "XSIS"
  },
  ne: {
    title: "XSIS किन अस्तित्वमा आयो?",
    scene1_0: "हरेक उत्कृष्ट उत्पादनको सुरुवात एउटा समस्याबाट हुन्छ...",
    scene1_1: "धेरै वर्षसम्म हामीले व्यवसायहरूलाई हातैले बिल लेख्दै, स्टक मिलाउँदै, रजिस्टर पल्टाउँदै र महिनाको अन्त्यमा रिपोर्ट बनाउन घण्टौँ समय खर्च गरेको देख्यौँ।",
    scene1_2: "प्रविधि धेरै अगाडि बढिसकेको थियो, तर धेरै व्यवसायहरू अझै पनि पुरानै तरिकामा सञ्चालन भइरहेका थिए।",
    scene2: "हामीलाई लाग्यो यसको अझ राम्रो समाधान हुनुपर्छ।\n\nत्यही सोचबाट XSIS को जन्म भयो।",
    scene3: "XSIS केवल बिल बनाउने सफ्टवेयर होइन। यो आधुनिक व्यवसायका लागि बनाइएको एउटा बुद्धिमान (Smart) Business Platform हो, जसले बिक्री, खरिद, स्टक, लेखा, रिपोर्टिङ र Artificial Intelligence (AI) लाई एउटै प्रणालीमा जोड्छ।",
    scene4_1: "हाम्रो विश्वास थियो व्यवसाय अझै सरल हुनसक्छ।",
    scene4_2: "प्रविधिले मानिसको काम सजिलो बनाउनुपर्छ।",
    scene4_3: "AI ले सबैलाई सहयोग गर्नुपर्छ।",
    scene5: "व्यवसाय सञ्चालनलाई अझ सरल, छिटो र स्मार्ट बनाउने।",
    scene6_1: "जहाँसुकै। जुनसुकै बेला। जुनसुकै डिभाइसबाट।",
    scene6_2: "झन्झटिलो प्रक्रिया छैन। अनावश्यक कागजी काम छैन। अनुमानका भरमा निर्णय लिनुपर्ने अवस्था छैन।\n\nअब तपाईंले पाउनुहुन्छ वास्तविक समयमा जानकारी, स्वचालित कार्यप्रवाह र आफ्नो व्यवसायमाथिको पूर्ण नियन्त्रण।",
    scene7_1: "आजको युगमा Artificial Intelligence (AI) ले व्यवसाय गर्ने तरिकालाई परिवर्तन गरिरहेको छ। त्यसैले XSIS ले प्रविधिलाई जटिल होइन, सहज बनाउने लक्ष्य राखेको छ।",
    scene7_2: "रिपोर्ट चाहियो? AI ले तयार गर्न सहयोग गर्छ।\nव्यवसायको अवस्था बुझ्नुपर्यो? AI ले विश्लेषण गरेर स्पष्ट रूपमा देखाउँछ।\nराम्रो निर्णय लिनुपर्यो? AI ले उपयोगी सुझाव दिन्छ।",
    scene7_3: "प्रविधिले मानिसलाई परिवर्तन गर्न खोज्नु हुँदैन, प्रविधिले मानिसको कामलाई सजिलो बनाउनुपर्छ।",
    scene8_1: "सफ्टवेयरले केवल कारोबारको रेकर्ड राख्नु हुँदैन। यसले तपाईंको व्यवसायको सबैभन्दा भरपर्दो र बुद्धिमान साझेदार बन्नुपर्छ।",
    scene8_2: "भविष्य आउँदै छैन।\n\nतपाईं यसलाई अहिल्यै प्रयोग गर्दै हुनुहुन्छ।",
    scene8_3: "XSIS"
  }
}

export default function OurStory() {
  const [lang, setLang] = useState<"en" | "ne">("en")
  const c = content[lang]

  const containerRef = useRef<HTMLDivElement>(null)
  
  // Total scroll height 1200vh to give enough time for 8 scenes to breathe
  const { scrollYProgress: rawScroll } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Apply a spring to smooth out stepped mouse wheel scrolling
  const scrollYProgress = useSpring(rawScroll, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  /* --- MAPPINGS --- */
  
  // Scene 1: The Problem (0.0 to 0.12)
  const s1_opacity = useTransform(scrollYProgress, [0, 0.03, 0.1, 0.12], [0, 1, 1, 0])
  const s1_y = useTransform(scrollYProgress, [0, 0.12], [20, -50])

  // Scene 2: Fading old tools + "Better way" (0.12 to 0.22)
  const s2_opacity = useTransform(scrollYProgress, [0.12, 0.15, 0.2, 0.22], [0, 1, 1, 0])
  const s2_scale = useTransform(scrollYProgress, [0.12, 0.22], [0.9, 1.05])
  const s2_blur = useTransform(scrollYProgress, [0.12, 0.15], ["10px", "0px"])

  // Scene 3: Glowing XSIS emerges + Seamless Platform text (0.22 to 0.35)
  const s3_logoScale = useTransform(scrollYProgress, [0.22, 0.28, 0.35], [0.5, 1.2, 1.5])
  const s3_opacity = useTransform(scrollYProgress, [0.22, 0.25, 0.32, 0.35], [0, 1, 1, 0])

  // Scene 4: Core Beliefs sequential fade (0.35 to 0.48)
  const s4_1_opacity = useTransform(scrollYProgress, [0.35, 0.37, 0.46, 0.48], [0, 1, 1, 0])
  const s4_2_opacity = useTransform(scrollYProgress, [0.38, 0.40, 0.46, 0.48], [0, 1, 1, 0])
  const s4_3_opacity = useTransform(scrollYProgress, [0.41, 0.43, 0.46, 0.48], [0, 1, 1, 0])

  // Scene 5: Floating features network (0.48 to 0.60)
  const s5_opacity = useTransform(scrollYProgress, [0.48, 0.51, 0.58, 0.60], [0, 1, 1, 0])
  const s5_scale = useTransform(scrollYProgress, [0.48, 0.60], [0.8, 1.1])

  // Scene 6: World Map / Anywhere (0.60 to 0.72)
  const s6_opacity = useTransform(scrollYProgress, [0.60, 0.63, 0.70, 0.72], [0, 1, 1, 0])
  
  // Scene 7: AI Particles / Today's Reality (0.72 to 0.85)
  const s7_opacity = useTransform(scrollYProgress, [0.72, 0.75, 0.83, 0.85], [0, 1, 1, 0])

  // Scene 8: Final Lockup (0.85 to 1.0)
  const s8_part1_opacity = useTransform(scrollYProgress, [0.85, 0.87, 0.90, 0.92], [0, 1, 1, 0])
  const s8_part2_opacity = useTransform(scrollYProgress, [0.92, 0.94, 1, 1], [0, 1, 1, 1])
  const s8_logo_opacity = useTransform(scrollYProgress, [0.96, 0.98, 1, 1], [0, 1, 1, 1])
  const s8_logo_scale = useTransform(scrollYProgress, [0.96, 1], [0.8, 1])

  return (
    <section ref={containerRef} className="relative h-[1200vh] bg-black" id="story">
      {/* Sticky container that holds the visual frames */}
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-black text-white">
        
        {/* EN / NE Language Toggle */}
        <div className="absolute top-8 z-50 flex gap-2 rounded-full border border-foreground/20 bg-black/50 p-1 backdrop-blur-md">
          <button 
            onClick={() => setLang("en")}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${lang === "en" ? "bg-white text-black" : "text-white/50 hover:text-white"}`}
          >
            ENG
          </button>
          <button 
            onClick={() => setLang("ne")}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${lang === "ne" ? "bg-white text-black" : "text-white/50 hover:text-white"}`}
          >
            नेपाली
          </button>
        </div>

        {/* Global Film Grain */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* SCENE 1: The Problem */}
        <motion.div style={{ opacity: s1_opacity, y: s1_y }} className="absolute flex flex-col items-center justify-center max-w-4xl px-8 text-center">
          <h2 className="mb-12 text-3xl font-light italic tracking-wide text-white/50 md:text-5xl">
            {c.scene1_0}
          </h2>
          <p className="mb-8 text-xl leading-relaxed text-white/80 md:text-2xl">
            {c.scene1_1}
          </p>
          <p className="text-xl leading-relaxed text-white/80 md:text-2xl">
            {c.scene1_2}
          </p>
        </motion.div>

        {/* SCENE 2: Old Tools Fading -> XSIS Belief */}
        <motion.div style={{ opacity: s2_opacity, scale: s2_scale, filter: s2_blur }} className="absolute flex flex-col items-center justify-center max-w-3xl px-8 text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-white md:text-6xl whitespace-pre-line leading-tight">
            {c.scene2}
          </h2>
        </motion.div>

        {/* SCENE 3: Logo Emerges & Ecosystem Text */}
        <motion.div style={{ opacity: s3_opacity }} className="absolute flex flex-col items-center justify-center w-full px-8 h-full">
          {/* Huge glowing logo in background */}
          <motion.div style={{ scale: s3_logoScale }} className="absolute inset-0 flex items-center justify-center opacity-30 blur-[20px]">
            <img src="/Logo.png" alt="Xsis Glow" className="w-[800px] h-auto object-contain brightness-0 invert opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 to-purple-600/30 mix-blend-overlay rounded-full blur-[100px]" />
          </motion.div>
          <div className="relative z-10 max-w-4xl text-center">
            <p className="text-2xl font-medium leading-relaxed text-white md:text-4xl">
              {c.scene3}
            </p>
          </div>
        </motion.div>

        {/* SCENE 4: Belief Sentences */}
        <div className="absolute flex flex-col items-center justify-center w-full px-8 text-center space-y-8 md:space-y-12">
          <motion.h2 style={{ opacity: s4_1_opacity }} className="text-3xl font-bold tracking-tight text-white/90 md:text-5xl">
            {c.scene4_1}
          </motion.h2>
          <motion.h2 style={{ opacity: s4_2_opacity }} className="text-3xl font-bold tracking-tight text-white/90 md:text-5xl">
            {c.scene4_2}
          </motion.h2>
          <motion.h2 style={{ opacity: s4_3_opacity }} className="text-3xl font-bold tracking-tight text-white/90 md:text-5xl">
            {c.scene4_3}
          </motion.h2>
        </div>

        {/* SCENE 5: Network Ecosystem */}
        <motion.div style={{ opacity: s5_opacity, scale: s5_scale }} className="absolute flex flex-col items-center justify-center w-full px-8 h-full">
          {/* Abstract Network SVG */}
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
            <svg viewBox="0 0 800 600" className="w-full max-w-5xl h-auto" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none">
              <path d="M400 300 L200 150 M400 300 L600 150 M400 300 L200 450 M400 300 L600 450 M400 300 L400 100 M400 300 L400 500" />
              <circle cx="400" cy="300" r="40" fill="rgba(59,130,246,0.2)" stroke="rgba(59,130,246,0.8)" strokeWidth="2" />
              <circle cx="200" cy="150" r="30" fill="rgba(255,255,255,0.05)" />
              <circle cx="600" cy="150" r="30" fill="rgba(255,255,255,0.05)" />
              <circle cx="200" cy="450" r="30" fill="rgba(255,255,255,0.05)" />
              <circle cx="600" cy="450" r="30" fill="rgba(255,255,255,0.05)" />
              <circle cx="400" cy="100" r="30" fill="rgba(255,255,255,0.05)" />
              <circle cx="400" cy="500" r="30" fill="rgba(255,255,255,0.05)" />
            </svg>
          </div>
          <h2 className="relative z-10 text-4xl font-bold tracking-tight text-white md:text-6xl text-center max-w-3xl drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            {c.scene5}
          </h2>
        </motion.div>

        {/* SCENE 6: World Map / Anywhere */}
        <motion.div style={{ opacity: s6_opacity }} className="absolute flex flex-col items-center justify-center w-full px-8 h-full">
          {/* Subtle World Map background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 blur-sm pointer-events-none">
            <img src="/3d-images/map.png" alt="Map" className="w-[1200px] object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
          </div>
          <div className="relative z-10 max-w-4xl text-center">
            <h2 className="mb-10 text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 md:text-6xl">
              {c.scene6_1}
            </h2>
            <p className="text-xl font-medium leading-relaxed text-white/70 whitespace-pre-line md:text-3xl">
              {c.scene6_2}
            </p>
          </div>
        </motion.div>

        {/* SCENE 7: AI Particles / Today's Reality */}
        <motion.div style={{ opacity: s7_opacity }} className="absolute flex flex-col items-center justify-center w-full px-8 h-full">
          {/* Fake flowing particles */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
             <div className="absolute w-[600px] h-[600px] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#a855f7_100%)] rounded-full blur-[80px] animate-spin" style={{ animationDuration: '8s' }} />
             <div className="absolute w-[400px] h-[400px] bg-[conic-gradient(from_0deg_at_50%_50%,#00000000_50%,#3b82f6_100%)] rounded-full blur-[60px] animate-spin" style={{ animationDuration: '5s', animationDirection: 'reverse' }} />
          </div>
          <div className="relative z-10 max-w-5xl text-center">
            <p className="mb-12 text-2xl leading-relaxed text-white/90 md:text-4xl font-light">
              {c.scene7_1}
            </p>
            <p className="mb-12 text-xl font-medium leading-relaxed text-purple-300 whitespace-pre-line md:text-3xl">
              {c.scene7_2}
            </p>
            <h3 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
              {c.scene7_3}
            </h3>
          </div>
        </motion.div>

        {/* SCENE 8: Final Cinematic Lockup */}
        <div className="absolute flex flex-col items-center justify-center w-full px-8 h-full text-center">
          <motion.div style={{ opacity: s8_part1_opacity }} className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-3xl font-medium leading-loose text-white/80 whitespace-pre-line md:text-5xl">
              {c.scene8_1}
            </h2>
          </motion.div>
          
          <motion.div style={{ opacity: s8_part2_opacity }} className="absolute inset-0 flex flex-col items-center justify-center mt-[-10vh]">
            <h2 className="mb-16 text-4xl font-light leading-tight text-white/70 whitespace-pre-line md:text-6xl tracking-wide">
              {c.scene8_2}
            </h2>
            <motion.div style={{ opacity: s8_logo_opacity, scale: s8_logo_scale }} className="flex items-center justify-center drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]">
               <img src="/Logo.png" alt="XSIS" className="h-24 md:h-40 w-auto brightness-0 invert object-contain" />
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
