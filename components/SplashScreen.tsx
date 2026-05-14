'use client'

import { useEffect, useState } from 'react'
import { useLang } from '@/lib/lang'

type P = { id: number; x: number; size: number; op: number; dur: number; delay: number; star: boolean; gold: boolean }

function mkParticles(): P[] {
  return Array.from({ length: 22 }, (_, i) => ({
    id: i, x: Math.random() * 100, size: Math.random() * 7 + 5,
    op: Math.random() * 0.08 + 0.04, dur: Math.random() * 20 + 18,
    delay: -(Math.random() * 30), star: Math.random() > 0.45, gold: Math.random() > 0.4,
  }))
}

export function SplashScreen() {
  const { setLang } = useLang()
  const [leaving,   setLeaving]   = useState(false)
  const [particles, setParticles] = useState<P[]>([])

  useEffect(() => { setParticles(mkParticles()) }, [])

  function choose(lang: 'en' | 'ar') {
    setLeaving(true)
    setTimeout(() => setLang(lang), 600)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-parchment px-8 overflow-hidden"
      style={{ opacity: leaving ? 0 : 1, transition: 'opacity 0.6s ease' }}
    >
      {/* Particles inside splash */}
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute top-0 pointer-events-none"
          style={{
            left:      `${p.x}%`,
            opacity:   p.op,
            color:     p.gold ? 'rgb(184,146,44)' : 'rgb(139,58,82)',
            fontSize:  p.star ? `${p.size}px` : undefined,
            animation: `particleFall ${p.dur}s ${p.delay}s linear infinite`,
          }}
        >
          {p.star ? '✦' : (
            <div style={{
              width: `${p.size * 0.3}px`, height: `${p.size * 0.85}px`,
              background: p.gold ? 'rgba(184,146,44,0.5)' : 'rgba(139,58,82,0.5)',
              borderRadius: '50%',
            }} />
          )}
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Top ornament */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/40" />
          <span className="text-gold/50 text-xs font-heading">✦</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/40" />
        </div>

        <p className="text-[0.65rem] tracking-[6px] uppercase text-walnut-muted font-heading mb-6">
          You are cordially invited
        </p>
        <h1 className="font-heading font-light text-walnut text-center italic mb-2"
          style={{ fontSize: 'clamp(2.8rem, 8vw, 5rem)', lineHeight: 1.1 }}>
          Mahmoud
        </h1>
        <p className="text-gold/60 font-heading text-2xl mb-2">&amp;</p>
        <h1 className="font-heading font-light text-walnut text-center italic mb-10"
          style={{ fontSize: 'clamp(2.8rem, 8vw, 5rem)', lineHeight: 1.1 }}>
          Raghda
        </h1>

        <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/40 to-transparent mb-10" />

        <p className="text-[0.68rem] tracking-[4px] uppercase text-walnut-muted font-heading mb-8">
          Choose your language &nbsp;·&nbsp;
          <span style={{ fontFamily: 'var(--font-amiri), serif', letterSpacing: 0 }}> اختر لغتك</span>
        </p>

        <div className="flex gap-4">
          <button onClick={() => choose('en')}
            className="border border-gold/30 bg-white/50 text-walnut font-heading tracking-widest uppercase text-sm px-10 py-4 transition-all duration-300 hover:border-gold/70 hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(184,146,44,0.15)]">
            English
          </button>
          <button onClick={() => choose('ar')}
            className="border border-gold/30 bg-white/50 text-walnut font-heading text-base px-10 py-4 transition-all duration-300 hover:border-gold/70 hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(184,146,44,0.15)]"
            style={{ fontFamily: 'var(--font-amiri), serif', letterSpacing: 0 }}>
            العربية
          </button>
        </div>

        <div className="flex items-center gap-4 mt-12">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/40" />
          <span className="text-gold/50 text-xs font-heading">✦</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/40" />
        </div>

        <p className="text-[0.6rem] tracking-[4px] uppercase text-walnut-muted/60 font-heading mt-6">
          June 26 · 2026
        </p>
      </div>
    </div>
  )
}
