"use client"

import Image from 'next/image'
import ScrollReveal from '@/components/ui/ScrollReveal'

const showcaseCards = [
  {
    id: 'pass-op-wine',
    type: 'Landing page',
    title: 'Pass OP Wine',
    description: 'Minimal editorial storytelling with neon violet, cyan, and warm orange accents.',
    src: '/web_product/pass-op-wine.png',
    href: 'https://pass-op-wine.vercel.app/',
    widthClass: 'min-w-[280px] sm:min-w-[320px] lg:min-w-[340px]',
    aspectClass: 'aspect-[4/5]',
    accentClass: 'from-violet-500/25 via-fuchsia-500/10 to-transparent',
  },
  {
    id: 'kit-drop',
    type: 'Landing page',
    title: 'Kit Drop',
    description: 'A sharp product-led landing page with a dark surface and focused hierarchy.',
    src: '/web_product/kit-drop-01.png',
    href: 'https://kit-drop-01.vercel.app/',
    widthClass: 'min-w-[280px] sm:min-w-[320px] lg:min-w-[340px]',
    aspectClass: 'aspect-[4/5]',
    accentClass: 'from-cyan-500/20 via-sky-500/10 to-transparent',
  },
  {
    id: 'laundry-manager',
    type: 'Central dashboard',
    title: 'Laundry Manager',
    description: 'The anchor screen: compact analytics, crisp widgets, and a polished control-room feel.',
    src: '/web_product/laundry-manager-rosy.png',
    href: 'https://laundry-manager-rosy.vercel.app/',
    widthClass: 'min-w-[380px] sm:min-w-[480px] lg:min-w-[560px]',
    aspectClass: 'aspect-[16/10]',
    accentClass: 'from-lime-400/20 via-emerald-400/10 to-transparent',
    featured: true,
  },
  {
    id: 'rentivo',
    type: 'Landing page',
    title: 'Rentivo',
    description: 'Clean rental-platform framing with strong contrast and a premium systemized layout.',
    src: '/web_product/rentivo-six.png',
    href: 'https://rentivo-six.vercel.app/',
    widthClass: 'min-w-[280px] sm:min-w-[320px] lg:min-w-[340px]',
    aspectClass: 'aspect-[4/5]',
    accentClass: 'from-orange-500/20 via-amber-500/10 to-transparent',
  },
]

const marqueeCards = [...showcaseCards, ...showcaseCards]

function ShowcaseCard({ card, priority }) {
  return (
    <a
      href={card.href}
      target="_blank"
      rel="noreferrer"
      className={`group relative flex ${card.widthClass} ${card.aspectClass} shrink-0 overflow-hidden rounded-[1.65rem] border border-white/10 bg-slate-950/75 p-3 shadow-[0_18px_80px_rgba(2,6,23,0.72)] transition duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:border-white/20`}
    >
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.accentClass}`} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_24%)]" />

      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[1.25rem] border border-white/10 bg-black/60 backdrop-blur-sm">
        <div className="relative flex-1 overflow-hidden">
          <Image
            src={card.src}
            alt={card.title}
            fill
            priority={priority}
            sizes={card.featured ? '(max-width: 1024px) 88vw, 44vw' : '(max-width: 1024px) 72vw, 26vw'}
            className={`object-cover object-top transition duration-700 group-hover:scale-[1.05] ${card.featured ? 'brightness-[1.03] contrast-[1.02]' : 'brightness-[0.95] contrast-[1.05]'}`}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3">
            <span className="rounded-full border border-white/10 bg-black/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.34em] text-slate-100/90 backdrop-blur-md">
              {card.type}
            </span>
            <span className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.32em] ${card.featured ? 'border border-lime-300/30 bg-lime-300/10 text-lime-200' : 'border border-cyan-300/25 bg-cyan-300/10 text-cyan-200'}`}>
              {card.featured ? 'Dashboard focus' : 'Landing screen'}
            </span>
          </div>

          {card.featured && (
            <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4">
              <div className="max-w-[60%] rounded-2xl border border-white/10 bg-black/55 px-4 py-3 backdrop-blur-md">
                <p className="text-[10px] uppercase tracking-[0.34em] text-lime-200/90">Live analytics</p>
                <div className="mt-3 flex items-end gap-2">
                  <span className="h-6 w-2 rounded-full bg-lime-300/80" />
                  <span className="h-10 w-2 rounded-full bg-cyan-300/80" />
                  <span className="h-8 w-2 rounded-full bg-violet-300/80" />
                  <span className="h-12 w-2 rounded-full bg-emerald-300/80" />
                  <span className="h-7 w-2 rounded-full bg-orange-300/80" />
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/55 px-4 py-3 text-right backdrop-blur-md">
                <p className="text-[10px] uppercase tracking-[0.34em] text-slate-300">System status</p>
                <p className="mt-1 text-sm font-semibold text-white">92% efficiency</p>
                <p className="text-xs text-slate-400">Realtime operations</p>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-white/10 bg-black/70 px-4 py-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.38em] text-slate-400">{card.type}</p>
              <h3 className="mt-2 text-lg font-semibold tracking-tight text-white sm:text-xl">{card.title}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-300">{card.description}</p>
            </div>
            <div className="hidden shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.32em] text-slate-200 sm:block">
              High contrast
            </div>
          </div>
        </div>
      </div>
    </a>
  )
}

export default function ProductsCarousel() {
  return (
    <section id="products" aria-labelledby="products-heading" className="relative isolate overflow-hidden bg-black py-20 sm:py-24 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.28),transparent_30%),radial-gradient(circle_at_70%_35%,rgba(34,211,238,0.18),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(163,230,53,0.12),transparent_28%),linear-gradient(180deg,rgba(7,8,14,0.96),rgba(0,0,0,1))]" />
      <div className="absolute left-1/2 top-10 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="absolute -right-24 top-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-lime-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.5em] text-cyan-300/80">Panoramic showcase</p>
              <h2 id="products-heading" className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Continuous dark-mode experiences, stitched into one cinematic banner.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                A wide-angle presentation of landing pages and a central application dashboard, framed with soft depth of field,
                neon gradients, and a premium ambient glow.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-[11px] font-semibold uppercase tracking-[0.34em] text-slate-300">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">Purple / cyan glow</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">Dashboard focus</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">Continuous motion</span>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-10 rounded-[2.25rem] border border-white/10 bg-white/5 p-3 shadow-[0_40px_140px_rgba(2,6,23,0.72)] backdrop-blur-xl sm:p-4">
          <div className="relative overflow-hidden rounded-[1.85rem] border border-white/10 bg-[#05040a]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02),transparent_10%,transparent_90%,rgba(255,255,255,0.02))]" />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black via-black/80 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black via-black/80 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent" />

            <div className="group relative">
              <div className="flex w-max gap-5 px-5 py-6 sm:gap-6 sm:px-8 [animation:carouselMarquee_34s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:[animation:none]">
                {marqueeCards.map((card, index) => (
                  <ShowcaseCard key={`${card.id}-${index}`} card={card} priority={index < 3} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>Four live visuals, duplicated into a seamless loop for the panoramic presentation.</p>
          <p className="text-slate-500">Hover to pause, or let the banner drift like a showroom reel.</p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes carouselMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
      `}</style>
    </section>
  )
}
