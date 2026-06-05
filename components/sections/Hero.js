'use client'

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import BookCallButton from '@/components/ui/BookCallButton'
import siteData from '@/data/site.json'

// LightPillar is heavy (Three.js) — lazy-load, render on all devices
const LightPillar = dynamic(() => import('@/components/sections/LightPillar'), {
  ssr: false,
  loading: () => null,
})

export default function Hero() {
  const videoRef = useRef(null)
  const videoContainerRef = useRef(null)
  const lightPillarRef = useRef(null)
  const [showPillar, setShowPillar] = useState(false)
  const [qualityLevel, setQualityLevel] = useState('medium')
  const [videoVisible, setVideoVisible] = useState(false)

  // Detect device to adjust LightPillar quality
  useEffect(() => {
    // Avoid calling setState directly within the render/initial effect synchronously if we can
    // It's better to just do this once.
    const updateQuality = () => {
      setQualityLevel(window.innerWidth < 768 ? 'low' : 'medium')
    }

    updateQuality() // Initial setting

    // Optional: add listener if it should change on resize
    // window.addEventListener('resize', updateQuality)
    // return () => window.removeEventListener('resize', updateQuality)
  }, [])

  // Lazy-load video: only play when visible
  useEffect(() => {
    if (!videoContainerRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(videoContainerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (videoVisible && videoRef.current) {
      // Small timeout to ensure DOM is ready before playing (helps with some hydration/IntersectionObserver edge cases)
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => { /* Auto-play was prevented */ });
      }
    }
  }, [videoVisible])

  // LightPillar visibility — show on all devices when in viewport
  useEffect(() => {
    if (!lightPillarRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => setShowPillar(entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(lightPillarRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="home" className="relative min-h-screen bg-black overflow-hidden" style={{ marginTop: 0, paddingTop: 0, top: 0 }}>
      {/* LightPillar Animation - Background Layer */}
      <div ref={lightPillarRef} className="absolute inset-0 z-[1] pointer-events-none">
        {showPillar && (
          <LightPillar
            topColor="#69ff29"
            bottomColor="#9efdff"
            intensity={1.1}
            rotationSpeed={0.7}
            glowAmount={0.003}
            pillarWidth={3}
            pillarHeight={0.4}
            noiseIntensity={0.5}
            pillarRotation={25}
            interactive={false}
            mixBlendMode="screen"
            quality={qualityLevel}
          />
        )}
      </div>

      {/* Background Glow Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-black" />
        <div className="hero-glow" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 md:pt-40 pb-16 sm:pb-20">
        {/* Text Content */}
        <div className="text-center">
          <div className="hero-fade-in hero-fade-in-1">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight sm:leading-tight tracking-tight px-2">
              <span className="text-gray-400">Professional Websites for{' '}<br className="hidden sm:block" />Premium </span>
              <span className="text-white">Businesses</span>
            </h1>
          </div>

          <div className="hero-fade-in hero-fade-in-2 mt-4 sm:mt-5 md:mt-6 px-2 sm:px-0">
            <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
              We craft custom websites that drive results, helping your business get found, build trust, and convert visitors into customers.
            </p>
          </div>

          {/* Social Proof Avatars */}
          <div className="hero-fade-in hero-fade-in-3">
            <div className="mt-8 md:mt-10 flex flex-col items-center gap-3 sm:gap-4">
              <div className="flex items-center -space-x-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full border-2 border-black ring-1 ring-white/10 overflow-hidden shrink-0">
                  <Image src="/Images/client 1.jpg" alt="Client 1" width={44} height={44} className="w-full h-full object-cover" priority />
                </div>
                <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full border-2 border-black ring-1 ring-white/10 overflow-hidden shrink-0">
                  <Image src="/Images/client 2.jpg" alt="Client 2" width={44} height={44} className="w-full h-full object-cover" priority />
                </div>
                <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full border-2 border-black ring-1 ring-white/10 overflow-hidden shrink-0">
                  <Image src="/Images/client 6.jpg" alt="Client 3" width={44} height={44} className="w-full h-full object-cover" priority />
                </div>
                <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full border-2 border-black ring-1 ring-white/10 overflow-hidden shrink-0">
                  <Image src="/Images/client 4.jpg" alt="Client 4" width={44} height={44} className="w-full h-full object-cover" priority />
                </div>
                <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full border-2 border-black ring-1 ring-white/10 overflow-hidden shrink-0">
                  <Image src="/Images/client 5.jpg" alt="Client 5" width={44} height={44} className="w-full h-full object-cover" priority />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <span className="text-white font-medium">{siteData.hero.socialProof}</span>
                <span className="text-gray-500">{siteData.hero.socialProofSub}</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hero-fade-in hero-fade-in-4">
            <div className="mt-8 md:mt-10">
              <BookCallButton />
            </div>
          </div>
        </div>

        {/* Video Section with 3D Perspective */}
        <div ref={videoContainerRef} className="hero-fade-in hero-fade-in-5 mt-12 sm:mt-16 md:mt-20 w-full max-w-full" style={{ perspective: '1200px' }}>
          <div
            className="hero-video-tilt relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-emerald-500/5 w-full"
          >
            {videoVisible ? (
              <video
                ref={videoRef}
                loop
                muted
                playsInline
                preload="metadata"
                aria-hidden="true"
                className="w-full h-auto block object-cover"
                suppressHydrationWarning
              >
                <source src="/Videos/hero.mp4" type="video/mp4" />
              </video>
            ) : (
              <div className="w-full aspect-video bg-black" />
            )}
          </div>
        </div>
      </div>

    </section>
  )
}

