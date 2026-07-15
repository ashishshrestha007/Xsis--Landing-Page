"use client"

import { motion } from "framer-motion"

export default function DevelopersSection() {
  return (
    <section className="relative z-10 border-t border-foreground/5 bg-background py-24 md:py-32 overflow-hidden">
      <style>{`
        @keyframes static-flash {
          0%, 90% { opacity: 0; }
          91% { opacity: 0.8; }
          93% { opacity: 0; }
          94% { opacity: 0.9; }
          95% { opacity: 0; }
          97% { opacity: 0.6; }
          98%, 100% { opacity: 0; }
        }
        @keyframes scanline {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
        .glitch-overlay-1 {
          animation: static-flash 5s infinite;
        }
        .glitch-overlay-2 {
          animation: static-flash 7s infinite 3s;
        }
        .scanline-bg {
          background-image: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 0, 0.4) 3px,
            rgba(0, 255, 0, 0.4) 4px
          );
          background-size: 100% 4px;
          animation: scanline 10s linear infinite;
        }
      `}</style>

      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-[1000px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-blue-600/5 to-purple-600/5 blur-[120px] opacity-70" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-12 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h3 className="text-5xl font-black tracking-tight text-foreground md:text-7xl lg:text-8xl mb-6">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-500">Developers</span>
          </h3>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-24 md:gap-32 max-w-5xl mx-auto">
          {/* Card 1 - Ashish */}
          <motion.div 
            initial={{ opacity: 0, x: -50, rotateY: -10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            whileHover={{ scale: 1.05, y: -15, rotateX: 5, rotateY: -5 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.4, duration: 1 }}
            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
            className="group relative flex flex-col items-center justify-center transition-all cursor-pointer"
          >
            <div className="relative z-10 flex flex-col items-center text-center translate-z-[50px]">
              <div className="relative mb-8 h-48 w-48 overflow-hidden rounded-[2rem] border-2 border-foreground/10 shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(59,130,246,0.4)] group-hover:border-blue-400/50">
                {/* Background matrix-like glow behind the image on hover */}
                <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 mix-blend-color" />
                
                {/* Static Green Glitch Overlay */}
                <div className="absolute inset-0 z-20 pointer-events-none glitch-overlay-1 mix-blend-screen">
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-80" />
                  <div className="absolute inset-0 scanline-bg" />
                  <div className="absolute inset-0 bg-green-500/30 mix-blend-overlay" />
                </div>

                <img 
                  src="/developer1.jpeg" 
                  alt="Ashish Shrestha" 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale-[0.2] contrast-[1.1]"
                />
              </div>
              <h4 className="text-4xl font-black text-foreground mb-2 tracking-tight drop-shadow-lg transition-colors group-hover:text-blue-400">
                Ashish Shrestha
              </h4>
              <p className="text-xl font-medium tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white/60 to-white/40 uppercase">
                The Developer
              </p>
            </div>
          </motion.div>

          {/* Card 2 - Om */}
          <motion.div 
            initial={{ opacity: 0, x: 50, rotateY: 10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            whileHover={{ scale: 1.05, y: -15, rotateX: 5, rotateY: 5 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.4, duration: 1, delay: 0.2 }}
            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
            className="group relative flex flex-col items-center justify-center transition-all cursor-pointer"
          >
            <div className="relative z-10 flex flex-col items-center text-center translate-z-[50px]">
              <div className="relative mb-8 h-48 w-48 overflow-hidden rounded-[2rem] border-2 border-foreground/10 shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(168,85,247,0.4)] group-hover:border-purple-400/50">
                {/* Background matrix-like glow behind the image on hover */}
                <div className="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 mix-blend-color" />
                
                {/* Static Green Glitch Overlay */}
                <div className="absolute inset-0 z-20 pointer-events-none glitch-overlay-2 mix-blend-screen">
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-80" />
                  <div className="absolute inset-0 scanline-bg" />
                  <div className="absolute inset-0 bg-green-500/30 mix-blend-overlay" />
                </div>

                <img 
                  src="/developer2.jpeg" 
                  alt="Om Kumar Pandey" 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale-[0.2] contrast-[1.1]"
                />
              </div>
              <h4 className="text-4xl font-black text-foreground mb-2 tracking-tight drop-shadow-lg transition-colors group-hover:text-purple-400">
                Om Kumar Pandey
              </h4>
              <p className="text-xl font-medium tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white/60 to-white/40 uppercase">
                The Developer
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
