"use client"

import { motion } from "framer-motion"

export default function MetricsSection() {
  const metrics = [
    { value: "$10M+", label: "Invoices Processed", icon: "💰" },
    { value: "99.9%", label: "Uptime SLA", icon: "⚡" },
    { value: "45hrs", label: "Saved per Month", icon: "⏳" },
    { value: "10k+", label: "Active Businesses", icon: "🏢" }
  ]

  return (
    <section className="relative border-y border-foreground/5 bg-background py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05),transparent_50%)]" />
      
      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.8, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.8, type: "spring", bounce: 0.5 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group relative rounded-3xl border border-foreground/5 bg-white/[0.02] p-8 text-center transition-colors hover:bg-white/[0.05] hover:border-foreground/10 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.15)]"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-3xl" />
              <div className="relative z-10">
                <div className="mb-6 flex justify-center text-4xl opacity-50 transition-all duration-300 group-hover:scale-125 group-hover:opacity-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">{metric.icon}</div>
                <div className="mb-2 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl drop-shadow-md">{metric.value}</div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/40">{metric.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
