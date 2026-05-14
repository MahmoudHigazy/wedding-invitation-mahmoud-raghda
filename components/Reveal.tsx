'use client'

import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

interface Props {
  children:   ReactNode
  className?: string
  delay?:     string  // e.g. 'delay-150'
}

/**
 * Wraps children in a div that fades + slides up when scrolled into view.
 * Uses the `.reveal` / `.visible` CSS classes defined in globals.css.
 */
export function Reveal({ children, className = '', delay = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          obs.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal ${delay} ${className}`}>
      {children}
    </div>
  )
}
