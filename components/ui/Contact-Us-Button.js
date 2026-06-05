'use client'

export default function ContactUsButton() {
  return (
    <span className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold text-sm overflow-hidden transition-all duration-300 hover:bg-emerald-500 hover:text-black hover:border-emerald-400 hover:shadow-[0_0_24px_rgba(16,185,129,0.35)] hover:scale-105 active:scale-95 cursor-pointer">
      {/* Animated shine sweep */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      {/* Pulse dot */}
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 group-hover:bg-black transition-colors duration-300" />
      </span>

      Contact Us
    </span>
  )
}
