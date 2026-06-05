'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import comparisonData from '@/data/whychooseus.json'
import SectionHeader from '@/components/ui/SectionHeader'
import ScrollReveal from '@/components/ui/ScrollReveal'

const ElectricBorder = dynamic(() => import('./ElectricBorder'), {
  ssr: false,
  loading: () => null,
})

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-emerald-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

function CrossIcon() {
  return (
    <svg className="w-5 h-5 text-red-400/70 shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  )
}

function ComparisonItem({ icon, text }) {
  return (
    <li className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0">
      {icon}
      <span className="text-sm text-gray-300">{text}</span>
    </li>
  )
}

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="bg-black py-16 sm:py-20 md:py-24 px-4 sm:px-6" aria-labelledby="why-heading">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <SectionHeader
            id="why-heading"
            tag="Why Choose Us"
            heading="Know What We Do Differently"
            highlight="Differently"
          />
        </ScrollReveal>

        {/* Comparison columns */}
        <ScrollReveal animation="reveal-scale">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Hasharc Studio column */}
          <ElectricBorder color="#34d399" speed={1} chaos={0.12} borderRadius={16}>
            <div className="relative rounded-2xl bg-[rgba(7,39,39,0.4)] p-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              {comparisonData.hasharc.title}
            </h3>
            <ul>
              {comparisonData.hasharc.items.map((item, i) => (
                <ComparisonItem key={i} icon={<CheckIcon />} text={item} />
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-emerald-500/20">
              <p className="text-xs text-emerald-400/80 font-medium uppercase tracking-wider mb-3">Bonuses included</p>
              <div className="flex flex-col gap-2">
                {comparisonData.hasharc.bonuses.map((bonus, i) => (
                  <span key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckIcon /> {bonus}
                  </span>
                ))}
              </div>
            </div>
          </div>
          </ElectricBorder>

          {/* Other Agencies column */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <h3 className="text-xl font-bold text-gray-400 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gray-500" />
              {comparisonData.others.title}
            </h3>
            <ul>
              {comparisonData.others.items.map((item, i) => (
                <ComparisonItem key={i} icon={<CrossIcon />} text={item} />
              ))}
            </ul>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
