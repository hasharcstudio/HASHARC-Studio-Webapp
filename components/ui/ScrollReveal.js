'use client'

import { useRef, useEffect, useState } from 'react'

/**
 * Lightweight scroll-triggered reveal wrapper.
 * Uses IntersectionObserver to add a CSS class when the element enters the viewport.
 * No external dependencies — pure CSS animations via globals.css.
 *
 * @param {string}  animation  - CSS class applied on reveal (default: 'reveal-fade-up')
 * @param {number}  threshold  - Visibility ratio to trigger (0–1, default: 0.15)
 * @param {number}  delay      - Extra delay in ms before the animation class is applied
 * @param {string}  className  - Additional classes for the wrapper div
 * @param {boolean} once       - If true (default), only animate once
 */
export default function ScrollReveal({
  children,
  animation = 'reveal-fade-up',
  threshold = 0.15,
  delay = 0,
  className = '',
  once = true,
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            const timer = setTimeout(() => setVisible(true), delay)
            if (once) observer.unobserve(el)
            return () => clearTimeout(timer)
          }
          setVisible(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, delay, once])

  return (
    <div
      ref={ref}
      className={`reveal-hidden ${visible ? animation : ''} ${className}`}
    >
      {children}
    </div>
  )
}
