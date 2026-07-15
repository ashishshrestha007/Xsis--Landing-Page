"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const faqs = [
  {
    question: "Is Xsis approved by the IRD (Inland Revenue Department) in Nepal?",
    answer: "Yes, Xsis is fully IRD-approved and automatically handles all necessary tax calculations, including VAT, TDS, and automated filings."
  },
  {
    question: "Does it support Multi-Currency billing?",
    answer: "Absolutely. You can invoice clients in NPR, USD, INR, and more. The system automatically fetches real-time exchange rates or allows you to set custom rates."
  },
  {
    question: "Can I track inventory across multiple locations?",
    answer: "Yes, our multi-branch sync allows you to track stock levels, transfer items between warehouses, and monitor real-time inventory from a single dashboard."
  },
  {
    question: "Do you support barcode scanning and POS?",
    answer: "Yes, Xsis has a built-in Point of Sale (POS) system that seamlessly integrates with standard barcode scanners and receipt printers for fast retail billing."
  },
  {
    question: "Can I use Xsis on my mobile phone?",
    answer: "Yes, Xsis is fully cloud-based and responsive. You can generate bills, track expenses, and view live analytics directly from your smartphone or tablet."
  },
  {
    question: "How long does it take to integrate Xsis?",
    answer: "Integration is typically completed within 24 hours. Our onboarding team maps your existing data structures and configures the automated pipelines so you experience zero downtime."
  },
  {
    question: "Is my financial data secure?",
    answer: "We use bank-level AES-256 encryption for data at rest and TLS 1.3 for data in transit. Xsis is fully compliant with international financial regulations and undergoes regular third-party audits."
  },
  {
    question: "Do you offer dedicated support?",
    answer: "All enterprise plans include a dedicated account manager and 24/7 priority support with a guaranteed 1-hour response time."
  },
  {
    question: "Does Xsis support multiple users?",
    answer: "Yes, you can add unlimited users with custom granular role-based access controls for different departments like Sales, HR, and Accounting."
  },
  {
    question: "Is training provided for new employees?",
    answer: "We offer free onboarding sessions, extensive video tutorials, and live training for your staff to ensure maximum adoption."
  },
  {
    question: "Can I migrate data from my old software?",
    answer: "Yes, our team provides free guided data migration services from systems like Tally, QuickBooks, Swastik, and Excel."
  },
  {
    question: "What happens if I lose internet connection?",
    answer: "Xsis has an offline-first POS mode that saves your bills locally and syncs automatically as soon as your device reconnects."
  },
  {
    question: "Are updates included in my subscription?",
    answer: "Absolutely. All feature updates, security patches, and new modules are automatically applied to your cloud instance at no extra cost."
  },
  {
    question: "Can I print customized invoices?",
    answer: "Yes, Xsis features a drag-and-drop invoice builder allowing you to add your logo, custom fields, and personalized terms."
  },
  {
    question: "Does it support automatic payment reminders?",
    answer: "Yes, you can set up automated SMS and email reminders for overdue invoices to significantly improve your cash flow."
  },
  {
    question: "Can my accountant access my data directly?",
    answer: "You can grant your accountant a special 'Auditor' role which allows them to extract reports without modifying your core business data."
  },
  {
    question: "How does the predictive cashflow work?",
    answer: "Our AI analyzes your historical sales and expense patterns to accurately forecast your financial runway up to 6 months in advance."
  },
  {
    question: "Is there a limit on invoices I can create?",
    answer: "No, Xsis offers truly unlimited invoicing on all premium plans with zero hidden transaction fees."
  }
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // Split FAQs into 3 columns (6 questions each)
  const col1 = faqs.slice(0, 6)
  const col2 = faqs.slice(6, 12)
  const col3 = faqs.slice(12, 18)

  const renderFaqColumn = (columnFaqs: typeof faqs, offset: number) => (
    <div className="flex flex-col space-y-4">
      {columnFaqs.map((faq, i) => {
        const globalIndex = offset + i;
        return (
          <div key={globalIndex} className="rounded-2xl border border-foreground/10 bg-white/[0.02] overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === globalIndex ? null : globalIndex)}
              className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-white/[0.04]"
            >
              <span className="text-[15px] font-medium text-foreground/90 pr-4 leading-snug">{faq.question}</span>
              <span className={`flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full border border-foreground/20 text-foreground/50 transition-transform duration-300 ${openIndex === globalIndex ? "rotate-45" : ""}`}>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </span>
            </button>
            <AnimatePresence>
              {openIndex === globalIndex && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-5 pb-5 pt-1 text-[13px] text-foreground/50 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  )

  return (
    <section className="relative bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-16 text-center">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-blue-400/60">
            Answers
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>

        {/* 3 Column Grid for FAQs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {renderFaqColumn(col1, 0)}
          {renderFaqColumn(col2, 6)}
          {renderFaqColumn(col3, 12)}
        </div>

        {/* Call to Action Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 rounded-3xl border border-blue-500/20 bg-blue-900/10 p-10 text-center backdrop-blur-md"
        >
          <h3 className="mb-2 text-2xl font-semibold text-foreground">Still have questions?</h3>
          <p className="mb-8 text-foreground/60">Our team is ready to help you discover how Xsis can transform your business operations.</p>
          <a href="#" className="inline-block rounded-full bg-red-600 px-8 py-3.5 text-sm font-bold text-white transition-all hover:scale-105 hover:bg-red-500 active:scale-95 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
            Contact Us & Request Demo
          </a>
        </motion.div>
      </div>
    </section>
  )
}
