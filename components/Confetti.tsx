'use client'

import { useEffect, useState } from 'react'

type Piece = { id: number; x: number; delay: number; dur: number; char: string; color: string }

const CHARS  = ['✦', '·', '✦', '◈', '✦']
const COLORS = ['#B8922C', '#D4AF5A', '#E8C96B', '#B8922C', '#8B3A52']

export function Confetti() {
  const [pieces, setPieces] = useState<Piece[]>([])

  useEffect(() => {
    setPieces(Array.from({ length: 30 }, (_, i) => ({
      id:    i,
      x:     Math.random() * 100,
      delay: Math.random() * 0.8,
      dur:   Math.random() * 1.5 + 2,
      char:  CHARS[i % CHARS.length],
      color: COLORS[i % COLORS.length],
    })))

    const t = setTimeout(() => setPieces([]), 4000)
    return () => clearTimeout(t)
  }, [])

  if (!pieces.length) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden" aria-hidden>
      {pieces.map(p => (
        <div
          key={p.id}
          className="absolute top-0"
          style={{
            left:      `${p.x}%`,
            color:     p.color,
            fontSize:  `${Math.random() * 14 + 10}px`,
            animation: `particleFall ${p.dur}s ${p.delay}s ease-in forwards`,
          }}
        >
          {p.char}
        </div>
      ))}
    </div>
  )
}
