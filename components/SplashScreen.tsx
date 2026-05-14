'use client'

import { useState } from 'react'
import { useLang } from '@/lib/lang'

export function SplashScreen() {
  const { setLang } = useLang()
  const [leaving, setLeaving] = useState(false)

  function choose(lang: 'en' | 'ar') {
    setLeaving(true)
    setTimeout(() => setLang(lang), 600)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-parchment px-8"
      style={{
        opacity:    leaving ? 0 : 1,
        transition: 'opacity 0.6s ease',
      }}
    >
      {/* Top ornament */}
      <div className="flex items-center gap-4 mb-10">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/40" />
        <span className="text-gold/50 text-xs font-heading tracking-widest">✦</span>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/40" />
      </div>

      {/* Names */}
      <p className="text-[0.65rem] tracking-[6px] uppercase text-walnut-muted font-heading mb-6">
        You are cordially invited
      </p>
      <h1
        className="font-heading font-light text-walnut text-center italic mb-2"
        style={{ fontSize: 'clamp(2.8rem, 8vw, 5rem)', lineHeight: 1.1 }}
      >
        Mahmoud
      </h1>
      <p className="text-gold/60 font-heading text-2xl mb-2">&amp;</p>
      <h1
        className="font-heading font-light text-walnut text-center italic mb-10"
        style={{ fontSize: 'clamp(2.8rem, 8vw, 5rem)', lineHeight: 1.1 }}
      >
        Raghda
      </h1>

      {/* Divider */}
      <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/40 to-transparent mb-10" />

      {/* Prompt */}
      <p className="text-[0.68rem] tracking-[4px] uppercase text-walnut-muted font-heading mb-8">
        Choose your language &nbsp;·&nbsp; اختر لغتك
      </p>

      {/* Language buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => choose('en')}
          className="
            border border-gold/30 bg-white/50 text-walnut
            font-heading tracking-widest uppercase text-sm
            px-10 py-4 transition-all duration-300
            hover:border-gold/70 hover:bg-white hover:-translate-y-0.5
            hover:shadow-[0_8px_24px_rgba(184,146,44,0.15)]
          "
        >
          English
        </button>
        <button
          onClick={() => choose('ar')}
          className="
            border border-gold/30 bg-white/50 text-walnut
            font-heading text-base
            px-10 py-4 transition-all duration-300
            hover:border-gold/70 hover:bg-white hover:-translate-y-0.5
            hover:shadow-[0_8px_24px_rgba(184,146,44,0.15)]
          "
          style={{ fontFamily: 'var(--font-amiri), serif', letterSpacing: 0 }}
        >
          العربية
        </button>
      </div>

      {/* Bottom ornament */}
      <div className="flex items-center gap-4 mt-12">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/40" />
        <span className="text-gold/50 text-xs font-heading tracking-widest">✦</span>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/40" />
      </div>

      <p className="text-[0.6rem] tracking-[4px] uppercase text-walnut-muted/60 font-heading mt-6">
        June 26 · 2026
      </p>
    </div>
  )
}
