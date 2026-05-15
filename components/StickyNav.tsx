'use client'

import { useEffect, useState } from 'react'
import { useLang, tx } from '@/lib/lang'

export function StickyNav() {
  const { lang } = useLang()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.6)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="fixed top-0 inset-x-0 z-40 bg-parchment/90 backdrop-blur-sm border-b border-gold/15 px-6 py-3 flex items-center justify-between transition-all duration-500"
      style={{
        transform:  visible ? 'translateY(0)' : 'translateY(-100%)',
        opacity:    visible ? 1 : 0,
      }}
    >
      <span
        className="font-heading font-light text-walnut italic"
        style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}
      >
        {tx(lang, 'Mahmoud & Raghda', 'محمود ورغدة')}
      </span>

      <a
        href="#rsvp"
        className="
          border border-gold/40 bg-white/60 text-walnut
          font-heading text-[0.72rem] tracking-widest uppercase
          px-5 py-2 transition-all duration-300
          hover:border-gold/70 hover:bg-white hover:-translate-y-0.5
        "
        style={{ fontStyle: lang === 'en' ? 'italic' : 'normal' }}
      >
        {tx(lang, 'RSVP', 'تأكيد الحضور')}
      </a>
    </div>
  )
}
