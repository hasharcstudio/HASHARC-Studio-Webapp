'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function ProductsCarousel() {
  const products = [
    { id: 1, src: '/web_product/laundry-manager-rosy.png', alt: 'Laundry Manager', url: 'https://laundry-manager-rosy.vercel.app/' },
    { id: 2, src: '/web_product/rentivo-six.png', alt: 'Rentivo', url: 'https://rentivo-six.vercel.app/' },
    { id: 3, src: '/web_product/kit-drop-01.png', alt: 'Kit Drop', url: 'https://kit-drop-01.vercel.app/' },
    { id: 4, src: '/web_product/pass-op-wine.png', alt: 'Pass OP Wine', url: 'https://pass-op-wine.vercel.app/' },
  ]

  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const autoRef = useRef(null)
   const [dragOffset, setDragOffset] = useState(0)
  const dirRef = useRef(null)
  const containerRef = useRef(null)
  const drag = useRef({ startX: 0, dx: 0, dragging: false })
  const [loaded, setLoaded] = useState({})
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const motionFast = prefersReducedMotion ? 250 : 900

  useEffect(() => {
    startAuto()
    return () => {
      stopAuto()
      stopDir()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused])

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
    // keep index within bounds
    if (index < 0) setIndex(products.length - 1)
    if (index >= products.length) setIndex(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  const startAuto = () => {
    stopAuto()
    if (paused) return
    const delay = prefersReducedMotion ? 6000 : 3800
    autoRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % products.length)
    }, delay)
  }

  const stopAuto = () => {
    if (autoRef.current) {
      clearInterval(autoRef.current)
      autoRef.current = null
    }
  }

  const next = () => setIndex((i) => (i + 1) % products.length)
  const prev = () => setIndex((i) => (i - 1 + products.length) % products.length)

  const startDirectional = (direction) => {
    stopDir()
    dirRef.current = setInterval(() => {
      if (direction === 'next') next()
      else prev()
    }, 750)
  }
  const stopDir = () => {
    if (dirRef.current) {
      clearInterval(dirRef.current)
      dirRef.current = null
    }
  }

  const handleMouseEnter = () => {
    setPaused(true)
    stopAuto()
  }
  const handleMouseLeave = () => {
    setPaused(false)
    stopDir()
    startAuto()
  }

  // Touch / Drag handlers for swipe support
  const onPointerDown = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    drag.current.startX = clientX
    drag.current.dx = 0
    drag.current.dragging = true
    stopAuto()
  }
  const onPointerMove = (e) => {
    if (!drag.current.dragging) return
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    drag.current.dx = clientX - drag.current.startX
  }
  const onPointerUp = () => {
    if (!drag.current.dragging) return
    const dx = drag.current.dx
    drag.current.dragging = false
    if (Math.abs(dx) > 60) {
      if (dx < 0) next()
      else prev()
    }
    drag.current.dx = 0
    startAuto()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
  }

  return (
    <section aria-labelledby="products-heading" className="relative bg-black py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 id="products-heading" className="text-3xl md:text-4xl font-bold text-white mb-8">Our Products</h2>

        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-2xl"
          onMouseEnter={handleMouseEnter}
          onTouchStart={onPointerDown}
          onTouchMove={onPointerMove}
          onTouchEnd={onPointerUp}
          onMouseDown={onPointerDown}
          onMouseMove={onPointerMove}
          onMouseUp={onPointerUp}
          onMouseLeave={() => { onPointerUp(); handleMouseLeave(); }}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Slides container */}
          <div
            className="flex will-change-transform"
            style={{
              transform: `translateX(-${index * 100}%)`,
              transition: drag.current.dragging ? 'none' : 'transform 900ms cubic-bezier(0.22, 0.9, 0.38, 1.0)',
              width: `${products.length * 100}%`,
            }}
          >
            {products.map((p) => (
              <div key={p.id} className="w-full flex-shrink-0 px-4 py-8 flex items-center justify-center">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`block w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/5 transform transition-all ${prefersReducedMotion ? 'duration-200' : 'duration-700'}`}
                >
                  <div className="relative w-full h-64 bg-gray-900 overflow-hidden">
                    <div
                      className="absolute inset-0 will-change-transform"
                      style={{
                        transform: `translateX(${dragOffset * 0.05}px)`,
                        transition: drag.current.dragging ? 'none' : `transform ${motionFast}ms cubic-bezier(0.22,0.9,0.38,1.0)`,
                      }}
                    >
                      <Image
                        src={p.src}
                        alt={p.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 800px"
                        style={{ objectFit: 'cover' }}
                        onLoadingComplete={() => setLoaded((s) => ({ ...s, [p.id]: true }))}
                        className={`${loaded[p.id] ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-md scale-105'} transition-all ${prefersReducedMotion ? 'duration-150' : 'duration-700'}`}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                  <div className="p-4 bg-gradient-to-r from-white/3 to-transparent">
                    <h3 className="text-lg text-white font-semibold">{p.alt}</h3>
                  </div>
                </a>
              </div>
            ))}
              <div className="flex gap-2">
                {products.map((p, i) => (
                  <button
                    key={`thumb-${p.id}`}
                    onClick={() => setIndex(i)}
                    className={`p-0.5 rounded-md ring-1 ring-white/5 ${i === index ? 'ring-emerald-400' : 'ring-transparent'}`}
                  >
                    <div className="w-20 h-12 relative overflow-hidden rounded-sm">
                      <Image
                        src={p.src}
                        alt={p.alt}
                        fill
                        sizes="80px"
                        style={{ objectFit: 'cover' }}
                        onLoadingComplete={() => setLoaded((s) => ({ ...s, [`t_${p.id}`]: true }))}
                        className={`${loaded[`t_${p.id}`] ? 'opacity-100' : 'opacity-60 blur-sm'} transition-all ${prefersReducedMotion ? 'duration-150' : 'duration-400'}`}
                      />
                    </div>
                    <div className="mt-1 text-xs text-white/80 text-center hidden sm:block w-20 truncate">{p.alt}</div>
                  </button>
                ))}
              </div>
          </div>

          {/* Left hover/click area */}
          <div
            onMouseEnter={() => startDirectional('prev')}
            onMouseLeave={stopDir}
            onClick={prev}
            className="absolute left-0 top-0 h-full w-1/6 flex items-center justify-start px-4 cursor-pointer"
            aria-hidden
          >
            <div className="hidden sm:flex items-center justify-center w-12 h-12 bg-white/5 hover:bg-white/10 text-white rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </div>

          {/* Right hover/click area */}
          <div
            onMouseEnter={() => startDirectional('next')}
            onMouseLeave={stopDir}
            onClick={next}
            className="absolute right-0 top-0 h-full w-1/6 flex items-center justify-end px-4 cursor-pointer"
            aria-hidden
          >
            <div className="hidden sm:flex items-center justify-center w-12 h-12 bg-white/5 hover:bg-white/10 text-white rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Dots + Thumbnails */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-6 flex flex-col items-center gap-3">
            <div className="flex gap-2">
              {products.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setIndex(i)}
                  className={`w-2 h-2 rounded-full ${i === index ? 'bg-emerald-400' : 'bg-white/20'}`}
                  aria-label={`Go to ${p.alt}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              {products.map((p, i) => (
                <button
                  key={`thumb-${p.id}`}
                  onClick={() => setIndex(i)}
                  className={`p-0.5 rounded-md ring-1 ring-white/5 ${i === index ? 'ring-emerald-400' : 'ring-transparent'}`}
                >
                  <div className="w-16 h-10 relative overflow-hidden rounded-sm">
                    <Image src={p.src} alt={p.alt} fill sizes="64px" style={{ objectFit: 'cover' }} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
