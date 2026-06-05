'use client'

import React from 'react'
import processData from '@/data/process.json'
import ScrollReveal from '@/components/ui/ScrollReveal'

function StepIcon({ children }) {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  )
}

function ProcessStep({ number, title, description, icon, isLast }) {
  return (
    <div className="flex flex-col items-center relative group">
      {/* Connector line - hidden on last item */}
      {!isLast && (
        <>
          {/* Horizontal line for desktop */}
          <div className="hidden md:block absolute top-7 left-[calc(50%+28px)] w-[calc(100%-56px)] h-px">
            <div className="w-full h-full bg-gradient-to-r from-emerald-500/40 to-emerald-500/10" />
          </div>
          {/* Vertical line for mobile */}
          <div className="md:hidden absolute top-[56px] left-7 w-px h-[calc(100%-16px)]">
            <div className="w-full h-full bg-gradient-to-b from-emerald-500/40 to-emerald-500/10" />
          </div>
        </>
      )}

      {/* Mobile: horizontal layout / Desktop: vertical layout */}
      <div className="flex md:flex-col items-center md:items-center gap-5 md:gap-0 w-full md:w-auto">
        {/* Number circle */}
        <div className="relative shrink-0">
          <div className="w-14 h-14 rounded-full border-2 border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold text-lg group-hover:border-emerald-400 group-hover:bg-emerald-500/20 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-500">
            {number}
          </div>
        </div>

        {/* Content */}
        <div className="md:mt-6 md:text-center text-left">
          <div className="flex items-center gap-2 md:justify-center mb-2">
            <span className="text-emerald-400">{icon}</span>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-[220px]">{description}</p>
        </div>
      </div>
    </div>
  )
}

const stepIcons = {
  search: (
    <StepIcon>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </StepIcon>
  ),
  pencil: (
    <StepIcon>
      <path d="M12 20h9" />
      <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
    </StepIcon>
  ),
  code: (
    <StepIcon>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </StepIcon>
  ),
  shield: (
    <StepIcon>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </StepIcon>
  ),
  rocket: (
    <StepIcon>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </StepIcon>
  ),
}

export default function Process() {
  return (
    <section id="process" className="bg-black py-16 sm:py-20 md:py-24 px-4 sm:px-6" aria-labelledby="process-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-4">How We Work</p>
          <h2 id="process-heading" className="text-4xl md:text-5xl font-bold text-white">
            From <span className="text-emerald-400">Idea</span> to <span className="text-emerald-400">Launch</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            A streamlined process designed to bring your vision to life on time and beyond expectations.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between gap-12 md:gap-4 relative">
          {processData.map((step, index) => (
            <ScrollReveal key={step.number} delay={index * 120} animation="reveal-fade-up">
              <ProcessStep
                number={step.number}
                title={step.title}
                description={step.description}
                icon={stepIcons[step.iconId]}
                isLast={index === processData.length - 1}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
