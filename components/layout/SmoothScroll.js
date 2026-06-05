'use client'

import { useEffect, useRef } from 'react'

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    // Defer Lenis initialization to after first paint
    const initLenis = () => {
      import('lenis').then(({ default: Lenis }) => {
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        })
        lenisRef.current = lenis

        // Handle anchor link clicks for smooth scrolling
        const handleAnchorClick = (e) => {
          const link = e.target.closest('a[href^="#"]')
          if (!link) return
          const hash = link.getAttribute('href')
          if (!hash || hash === '#') return
          const target = document.querySelector(hash)
          if (target) {
            e.preventDefault()
            lenis.scrollTo(target, { offset: -80 })
          }
        }
        document.addEventListener('click', handleAnchorClick)
        lenisRef.current._handleAnchorClick = handleAnchorClick

        function raf(time) {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
      })
    }

    if ('requestIdleCallback' in window) {
      requestIdleCallback(initLenis)
    } else {
      setTimeout(initLenis, 200)
    }

    return () => {
      if (lenisRef.current) {
        if (lenisRef.current._handleAnchorClick) {
          document.removeEventListener('click', lenisRef.current._handleAnchorClick)
        }
        lenisRef.current.destroy()
        lenisRef.current = null
      }
    }
  }, [])

  return <>{children}</>
}