'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import SectionHeader from '@/components/ui/SectionHeader'
import ScrollReveal from '@/components/ui/ScrollReveal'

const products = [
  { id: 1, src: '/web_product/laundry-manager-rosy.png', alt: 'Laundry Manager', caption: 'Laundry manager dashboard', url: 'https://laundry-manager-rosy.vercel.app/' },
  { id: 2, src: '/web_product/rentivo-six.png', alt: 'Rentivo', caption: 'Rental management platform', url: 'https://rentivo-six.vercel.app/' },
  { id: 3, src: '/web_product/kit-drop-01.png', alt: 'Kit Drop', caption: 'Product delivery experience', url: 'https://kit-drop-01.vercel.app/' },
  { id: 4, src: '/web_product/pass-op-wine.png', alt: 'Pass OP Wine', caption: 'Premium brand landing page', url: 'https://pass-op-wine.vercel.app/' },
]

export default function ProductsCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [loaded, setLoaded] = useState({})
  const [dragOffset, setDragOffset] = useState(0)
  const autoRef = useRef(null)
  const dirRef = useRef(null)
  const drag = useRef({ startX: 0, startTime: 0, dx: 0, dragging: false })

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReducedMotion(mq.matches)
      const handler = (e) => setPrefersReducedMotion(e.matches)
      mq.addEventListener?.('change', handler)
      return () => mq.removeEventListener?.('change', handler)
    }
    return undefined
  }, [])

  useEffect(() => {
    stopAuto()
    if (paused) return undefined
    const delay = prefersReducedMotion ? 7000 : 3800
    autoRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % products.length)
    }, delay)
    return stopAuto
  }, [paused, prefersReducedMotion])

  const stopAuto = () => {
    if (autoRef.current) {
      clearInterval(autoRef.current)
      autoRef.current = null
    }
  }

  const stopDir = () => {
    if (dirRef.current) {
      clearInterval(dirRef.current)
      dirRef.current = null
    }
  }

  const next = () => setIndex((i) => (i + 1) % products.length)
  const prev = () => setIndex((i) => (i - 1 + products.length) % products.length)

  const startDirectional = (direction) => {
    stopDir()
    dirRef.current = setInterval(() => {
      if (direction === 'next') next()
      else prev()
    }, prefersReducedMotion ? 1200 : 750)
  }

  const handleMouseEnter = () => {
    setPaused(true)
    stopAuto()
  }

  const handleMouseLeave = () => {
    setPaused(false)
    stopDir()
  }

  const onPointerDown = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    drag.current.startX = clientX
    drag.current.startTime = Date.now()
    drag.current.dx = 0
    drag.current.dragging = true
    setPaused(true)
    stopAuto()
  }

  const onPointerMove = (e) => {
    if (!drag.current.dragging) return
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    drag.current.dx = clientX - drag.current.startX
    setDragOffset(drag.current.dx)
  }

  const onPointerUp = () => {
    if (!drag.current.dragging) return
    const dx = drag.current.dx
    const elapsed = Math.max(1, Date.now() - drag.current.startTime)
    const velocity = dx / elapsed
    drag.current.dragging = false
    drag.current.dx = 0
    setDragOffset(0)

    if (Math.abs(dx) > 60) {
      const fastFlickSteps = prefersReducedMotion ? 1 : Math.min(3, Math.max(1, Math.round(Math.abs(velocity) / 0.25)))
      if (dx < 0) {
        for (let i = 0; i < fastFlickSteps; i += 1) next()
      } else {
        for (let i = 0; i < fastFlickSteps; i += 1) prev()
      }
    }

    setPaused(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
  }

  const transitionClass = prefersReducedMotion ? 'duration-200' : 'duration-700'

  return (
    <section id="products" aria-labelledby="products-heading" className="relative bg-black py-16 sm:py-20 md:py-24 px-4 sm:px-6" >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <SectionHeader
            id="products-heading"
            heading="Our Products"
            highlight="Products"
            description="A quick look at our live product work. Hover, swipe, or tap to explore each one." 
          />
        </ScrollReveal>

        <div
          className="relative mt-8 sm:mt-10"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={onPointerDown}
          onTouchMove={onPointerMove}
          onTouchEnd={onPointerUp}
          onMouseDown={onPointerDown}
          onMouseMove={onPointerMove}
          onMouseUp={onPointerUp}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
            <div
              className="flex will-change-transform"
              style={{
                transform: `translateX(-${index * 100}%)`,
                transition: drag.current.dragging ? 'none' : `transform ${prefersReducedMotion ? 220 : 900}ms cubic-bezier(0.22,0.9,0.38,1)`,
                width: `${products.length * 100}%`,
              }}
            >
              {products.map((product, i) => (
                <div key={product.id} className="w-full flex-shrink-0 p-4 sm:p-6 md:p-8">
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`group block overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl ${transitionClass} hover:-translate-y-1 hover:shadow-[0_30px_100px_rgba(0,0,0,0.55)]`}
                  >
                    <div className="relative h-[250px] sm:h-[340px] md:h-[460px] overflow-hidden">
                      <div
                        className="absolute inset-0"
                        style={{ transform: `translateX(${dragOffset * 0.05}px)` }}
                      >
                        <Image
                          src={product.src}
                          alt={product.alt}
                          fill
                          priority={i === 0}
                          sizes="(max-width: 768px) 100vw, 1100px"
                          className="object-cover scale-110 blur-xl opacity-45"
                        />
                        <Image
                          src={product.src}
                          alt={product.alt}
                          fill
                          priority={i === index}
                          sizes="(max-width: 768px) 100vw, 1100px"
                          onLoadingComplete={() => setLoaded((s) => ({ ...s, [product.id]: true }))}
                          className={`object-cover transition-all ${transitionClass} ${loaded[product.id] ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'}`}
                          style={{ objectFit: 'contain', objectPosition: 'center' }}
                        />
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-8">
                        <div className="max-w-2xl">
                          <p className="inline-flex items-center rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                            Featured product
                          </p>
                          <h3 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                            {product.alt}
                          </h3>
                          <p className="mt-2 text-sm sm:text-base text-gray-300 max-w-xl">
                            {product.caption}
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={prev}
              onMouseEnter={() => startDirectional('prev')}
              onMouseLeave={stopDir}
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/60 text-white ring-1 ring-white/10 backdrop-blur-md transition hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              aria-label="Previous product"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              onMouseEnter={() => startDirectional('next')}
              onMouseLeave={stopDir}
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/60 text-white ring-1 ring-white/10 backdrop-blur-md transition hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              aria-label="Next product"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
              {products.map((product, i) => (
                <button
                  key={product.id}
                  onClick={() => setIndex(i)}
                  className={`h-2.5 rounded-full transition-all ${i === index ? 'w-8 bg-emerald-400' : 'w-2.5 bg-white/30 hover:bg-white/50'}`}
                  aria-label={`Go to ${product.alt}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-5 sm:mt-6 flex items-start justify-center gap-3 sm:gap-4 overflow-x-auto pb-2">
            {products.map((product, i) => (
              <button
                key={`thumb-${product.id}`}
                type="button"
                onClick={() => setIndex(i)}
                className={`group flex flex-col items-center shrink-0 rounded-xl border p-1.5 transition ${i === index ? 'border-emerald-400 bg-white/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
              >
                <div className="relative h-14 w-24 sm:h-16 sm:w-28 overflow-hidden rounded-lg bg-black/40">
                  <Image
                    src={product.src}
                    alt={product.alt}
                    fill
                    sizes="112px"
                    className={`object-cover transition-all ${loaded[`t_${product.id}`] ? 'opacity-100' : 'opacity-70 blur-sm scale-105'}`}
                    onLoadingComplete={() => setLoaded((s) => ({ ...s, [`t_${product.id}`]: true }))}
                  />
                </div>
                <span className="mt-1.5 max-w-[6.5rem] truncate text-[11px] sm:text-xs text-gray-300 group-hover:text-white">
                  {product.caption}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
