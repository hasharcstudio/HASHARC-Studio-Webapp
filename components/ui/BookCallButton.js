'use client'
import Link from 'next/link'

export default function BookCallButton() {
  return (
    <Link
      href="#contact"
      className="group relative inline-flex items-center gap-3 bg-emerald-500 text-black font-semibold px-7 py-3.5 rounded-full text-base overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-105 active:scale-95"
    >
      {/* Shine sweep on hover */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

      <span className="relative z-[1]">Book a call</span>

      <span className="relative z-[1] flex items-center justify-center w-7 h-7 rounded-full bg-black/20 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-black/30 transition-all duration-300">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  )
}
