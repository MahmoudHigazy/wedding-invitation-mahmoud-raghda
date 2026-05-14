'use client'

import { useEffect, useState } from 'react'

type P = {
  id: number; x: number; size: number; op: number
  dur: number; delay: number; star: boolean; gold: boolean
}

function mkParticles(): P[] {
  return Array.from({ length: 8 }, (_, i) => ({
    id:    i,
    x:     Math.random() * 100,
    size:  Math.random() * 7 + 5,
    op:    Math.random() * 0.12 + 0.06,
    dur:   Math.random() * 18 + 14,
    delay: -(Math.random() * 25),
    star:  Math.random() > 0.45,
    gold:  Math.random() > 0.4,
  }))
}

export function Particles() {
  const [particles, setParticles] = useState<P[]>([])

  useEffect(() => { setParticles(mkParticles()) }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden>
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute top-0"
          style={{
            left:              `${p.x}%`,
            opacity:           p.op,
            color:             p.gold ? 'rgb(184,146,44)' : 'rgb(139,58,82)',
            fontSize:          p.star ? `${p.size}px` : undefined,
            animation:         `particleFall ${p.dur}s ${p.delay}s linear infinite`,
          }}
        >
          {p.star ? '✦' : (
            <div style={{
              width:        `${p.size * 0.3}px`,
              height:       `${p.size * 0.85}px`,
              background:   p.gold ? 'rgba(184,146,44,0.55)' : 'rgba(139,58,82,0.55)',
              borderRadius: '50%',
            }} />
          )}
        </div>
      ))}
    </div>
  )
}
