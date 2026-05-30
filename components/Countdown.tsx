'use client'

import { useEffect, useState } from 'react'
import type { Lang } from '@/lib/lang'
import { tx } from '@/lib/lang'

const WEDDING = new Date('2026-06-26T17:30:00').getTime()

function pad(n: number) { return String(n).padStart(2, '0') }

export function Countdown({ lang }: { lang: Lang }) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 })

  useEffect(() => {
    function tick() {
      const diff = Math.max(0, WEDDING - Date.now())
      setT({
        d: Math.floor(diff / 86_400_000),
        h: Math.floor((diff % 86_400_000) / 3_600_000),
        m: Math.floor((diff % 3_600_000)  / 60_000),
        s: Math.floor((diff % 60_000)     / 1_000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { v: t.d, en: 'Days',    ar: 'يوم' },
    { v: t.h, en: 'Hours',   ar: 'ساعة' },
    { v: t.m, en: 'Minutes', ar: 'دقيقة' },
    { v: t.s, en: 'Seconds', ar: 'ثانية' },
  ]

  return (
    <div className="h-a5">
      <p className="text-[0.72rem] tracking-[4px] uppercase text-walnut mb-6 font-heading">
        {tx(lang, 'Counting down to our day', 'العد التنازلي ليومنا الكبير')}
      </p>
      <div className="flex gap-8 justify-center flex-wrap">
        {units.map(u => (
          <div key={u.en} className="text-center min-w-[72px]">
            <span
              className="font-heading font-light text-walnut block leading-none"
              style={{ fontSize: 'clamp(2.2rem, 5.5vw, 3.6rem)', fontStyle: 'italic' }}
            >
              {pad(u.v)}
            </span>
            <span className="block text-[0.68rem] tracking-[3px] uppercase text-walnut mt-2 font-heading">
              {tx(lang, u.en, u.ar)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
