"use client"

import Image from 'next/image'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionHeader from '@/components/ui/SectionHeader'

const showcaseCards = [
  {
    id: 'pass-op-wine',
    type: 'Landing page',
    title: 'Pass OP Wine',
    description: 'Minimal editorial storytelling with neon emerald and warm orange accents.',
    src: '/web_product/pass-op-wine.png',
    href: 'https://pass-op-wine.vercel.app/',
    aspectClass: 'aspect-[16/9]',
    accentClass: 'from-emerald-400/20 via-emerald-400/08 to-transparent',
  },
  {
    id: 'kit-drop',
    type: 'Landing page',
    title: 'Kit Drop',
    description: 'A sharp product-led landing page with a dark surface and focused hierarchy.',
    src: '/web_product/kit-drop-01.png',
    href: 'https://kit-drop-01.vercel.app/',
    widthClass: 'min-w-[280px] sm:min-w-[320px] lg:min-w-[340px]',
    aspectClass: 'aspect-[16/9]',
    accentClass: 'from-cyan-500/20 via-sky-500/10 to-transparent',
  },
  {
    id: 'laundry-manager',
    type: 'Central dashboard',
    title: 'Laundry Manager',
    description: 'The anchor screen: compact widgets and a polished control-room feel.',
    src: '/web_product/laundry-manager-rosy.png',
    href: 'https://laundry-manager-rosy.vercel.app/',
    aspectClass: 'aspect-[16/9]',
    accentClass: 'from-emerald-300/18 via-emerald-400/08 to-transparent',
    featured: true,
  },
  {
    id: 'rentivo',
    type: 'Landing page',
    title: 'Rentivo',
    description: 'Clean rental-platform framing with strong contrast and a premium systemized layout.',
    src: '/web_product/rentivo-six.png',
    href: 'https://rentivo-six.vercel.app/',
    aspectClass: 'aspect-[16/9]',
    accentClass: 'from-orange-500/18 via-amber-500/08 to-transparent',
  },
  {
    id: 'succu-cactus-hut',
    type: 'Landing page',
    title: 'SUCCU & CACTUS HUT',
    description: 'A boutique plant shop landing with bold product imagery.',
    src: '/web_product/SUCCU_&_CACTUS_HUT.png',
    href: 'https://website-rosy-five-11.vercel.app',
    aspectClass: 'aspect-[16/9]',
    accentClass: 'from-emerald-400/18 via-emerald-300/08 to-transparent',
  },
]

const marqueeCards = [...showcaseCards, ...showcaseCards]

function ShowcaseCard({ card, priority }) {
  // Use smaller fixed min-widths on phones so items are easier to identify
  // Phone: compact; sm/lg: wider so images occupy more horizontal space
  const sizeClasses = card.featured
    ? 'min-w-[220px] sm:min-w-[560px] lg:min-w-[720px]'
    : 'min-w-[160px] sm:min-w-[360px] lg:min-w-[420px]'
  return (
    <a
      href={card.href}
      target="_blank"
      rel="noreferrer"
      className={`group relative ${sizeClasses} ${card.aspectClass} shrink-0 overflow-hidden rounded-[1.65rem] border border-white/10 bg-slate-950/75 p-3 shadow-[0_18px_80px_rgba(2,6,23,0.72)] transition duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:border-white/20`}
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
            sizes={card.featured ? '(max-width: 1024px) 100vw, 56vw' : '(max-width: 1024px) 100vw, 36vw'}
            className={`object-cover object-center transition duration-500 group-hover:scale-[1.03] ${card.featured ? 'brightness-[1.03] contrast-[1.02]' : 'brightness-[0.98] contrast-[1.02]'}`}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="absolute inset-x-4 top-4 flex items-center justify-start gap-3">
            <span className="rounded-full border border-white/10 bg-black/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.34em] text-slate-100/90 backdrop-blur-md">
              {card.type}
            </span>
          </div>
        </div>

        <div className="border-t border-white/10 bg-black/70 px-3 py-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.38em] text-slate-400">{card.type}</p>
              <h3 className="mt-1 text-base font-semibold tracking-tight text-white sm:text-lg">{card.title}</h3>
              <p className="mt-1 text-sm leading-5 text-slate-300">{card.description}</p>
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.28),transparent_30%),radial-gradient(circle_at_70%_35%,rgba(34,211,238,0.18),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(163,230,53,0.12),transparent_28%),linear-gradient(180deg,rgba(7,8,14,0.96),rgba(0,0,0,1))]" />
      <div className="absolute left-1/2 top-10 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-emerald-400/14 blur-3xl" />
      <div className="absolute -right-24 top-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-lime-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeader
            id="products-heading"
            heading="Our Products"
            highlight="Products"
            description="A quick look at our live product work. Hover, swipe, or tap to explore each one."
          />
        </ScrollReveal>

        <div className="mt-10 rounded-[2.25rem] border border-white/10 bg-white/5 p-3 shadow-[0_40px_140px_rgba(2,6,23,0.72)] backdrop-blur-xl sm:p-4">
          <div className="relative overflow-hidden rounded-[1.85rem] border border-white/10 bg-[#05040a]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02),transparent_10%,transparent_90%,rgba(255,255,255,0.02))]" />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black via-black/80 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black via-black/80 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent" />

            <div className="group relative">
              <div className="flex w-max gap-5 px-5 py-4 sm:gap-6 sm:px-8 [animation:carouselMarquee_34s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:[animation:none]">
                {marqueeCards.map((card, index) => (
                  <ShowcaseCard key={`${card.id}-${index}`} card={card} priority={index < 3} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
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
