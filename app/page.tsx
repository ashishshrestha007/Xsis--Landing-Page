import LaptopScroll from "@/components/laptop-scroll"
import AiBillingSection from "@/components/ai-billing-section"
import LottiePlayer from "@/components/lottie-player"
import CoreFeatures from "@/components/core-features"
import FeaturesShowcase from "@/components/features-showcase"
import FaqSection from "@/components/faq-section"
import OurStory from "@/components/our-story"
import ContactSection from "@/components/contact-section"

export default function Home() {
  return (
    <main className="relative bg-background">
      {/* Navigation */}
      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-4 md:px-10">
        {/* Logo - Left */}
        <a href="#" className="flex items-center transition-opacity hover:opacity-70">
          <img src="/Logo.png" alt="Xsis" className="h-32 md:h-40 w-auto brightness-0 invert object-contain" />
        </a>

        {/* Nav Links - Center (hidden on mobile) */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          <a href="#features" className="text-xs uppercase tracking-widest text-white/50 transition-colors hover:text-white">
            Features
          </a>
          <a href="#story" className="text-xs uppercase tracking-widest text-white/50 transition-colors hover:text-white">
            Story
          </a>
          <a href="#faq" className="text-xs uppercase tracking-widest text-white/50 transition-colors hover:text-white">
            FAQ
          </a>
        </div>

        {/* CTA - Right */}
        <div className="flex items-center gap-4">
          <button className="rounded-full border border-red-500 bg-red-600 px-5 py-2 text-xs font-medium text-white transition-all hover:bg-red-500 shadow-[0_0_15px_rgba(220,38,38,0.4)]">
            Request Demo
          </button>
        </div>
      </nav>

      {/* Scrollytelling Section */}
      <LaptopScroll />

      {/* Premium 3D Features Showcase */}
      <div id="features">
        <FeaturesShowcase />
      </div>

      {/* New AI Billing Animated Section */}
      <AiBillingSection />

      {/* Animated Core Features Section */}
      <CoreFeatures />

      {/* FAQ Section */}
      <div id="faq">
        <FaqSection />
      </div>

      {/* Premium Cinematic Story Section */}
      <div id="story">
        <OurStory />
      </div>

      {/* Fully Animated Contact & Footer Section */}
      <div id="contact">
        <ContactSection />
      </div>
    </main>
  )
}
