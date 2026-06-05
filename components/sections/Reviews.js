'use client'
import React from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import reviewsData from '@/data/reviews.json'
import SectionHeader from '@/components/ui/SectionHeader'
import ScrollReveal from '@/components/ui/ScrollReveal'

const MagicBento = dynamic(() => import('./MagicBento'), {
  ssr: false,
  loading: () => <div className="min-h-[400px]" />,
})

const CARD_COLOR = '#031a14'

const reviews = reviewsData.map(r => ({ ...r, color: CARD_COLOR }))

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }, (_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function ReviewCardContent(review) {
  return (
    <div className="flex flex-col justify-between h-full p-1 relative z-10">
      {/* Quote Icon */}
      <svg className="w-8 h-8 text-emerald-500/30 mb-3 shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
      </svg>

      {/* Review Text */}
      <p className="text-gray-300/90 text-sm leading-relaxed mb-4 flex-1">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Author Info */}
      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/10">
        <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-emerald-500/30 shrink-0">
          <Image
            src={review.image}
            alt={review.name}
            width={44}
            height={44}
            sizes="44px"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white text-sm font-semibold">{review.name}</h3>
          <p className="text-emerald-400/70 text-xs">{review.role}</p>
        </div>
        <div className="shrink-0">
          <StarRating count={review.rating} />
        </div>
      </div>
    </div>
  )
}

export default function Reviews() {
  return (
    <section id="reviews" className="relative bg-black py-16 sm:py-20 md:py-24 px-4 sm:px-6 overflow-hidden" aria-labelledby="reviews-heading">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <ScrollReveal>
          <SectionHeader
            id="reviews-heading"
            heading="Client Reviews"
            highlight="Reviews"
            description="Don't just take our word for it, hear what our clients have to say about working with us."
          />
        </ScrollReveal>

        {/* Bento Review Grid */}
        <ScrollReveal animation="reveal-fade-in" threshold={0.1}>
        <MagicBento
          textAutoHide={false}
          enableStars
          enableSpotlight
          enableBorderGlow
          enableTilt={false}
          enableMagnetism={false}
          clickEffect
          spotlightRadius={400}
          particleCount={8}
          glowColor="16, 185, 129"
          disableAnimations={false}
          cards={reviews}
          renderCardContent={ReviewCardContent}
          uniformGrid
        />
        </ScrollReveal>
      </div>
    </section>
  )
}
