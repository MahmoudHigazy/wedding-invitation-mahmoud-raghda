'use client'

import { useEffect, useRef } from 'react'

type Particle = {
  x: number; y: number; vx: number; vy: number
  sz: number; op: number; rot: number; drot: number
  r: number; g: number; b: number; star: boolean; ph: number
}

function mkParticle(W: number, H: number): Particle {
  const gold = Math.random() > 0.4
  return {
    x:    Math.random() * W,
    y:    Math.random() * H,
    vx:   (Math.random() - 0.5) * 0.25,
    vy:   Math.random() * 0.25 + 0.08,
    sz:   Math.random() * 1.8 + 0.5,
    op:   Math.random() * 0.22 + 0.04,
    rot:  Math.random() * Math.PI * 2,
    drot: (Math.random() - 0.5) * 0.012,
    r:    gold ? 184 : 139,
    g:    gold ? 146 :  58,
    b:    gold ?  44 :  82,
    star: Math.random() > 0.48,
    ph:   Math.random() * Math.PI * 2,
  }
}

export function Particles() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0, H = 0, animId: number

    function resize() {
      if (!canvas) return
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles: Particle[] = Array.from({ length: 55 }, () => mkParticle(W, H))

    function frame(ts: number) {
      ctx!.clearRect(0, 0, W, H)

      for (const p of particles) {
        ctx!.save()
        ctx!.translate(p.x, p.y)

        if (p.star) {
          ctx!.fillStyle    = `rgba(${p.r},${p.g},${p.b},${p.op})`
          ctx!.font         = `${p.sz * 5}px serif`
          ctx!.textAlign    = 'center'
          ctx!.textBaseline = 'middle'
          ctx!.fillText('✦', 0, 0)
        } else {
          ctx!.rotate(p.rot)
          ctx!.beginPath()
          ctx!.ellipse(0, 0, p.sz, p.sz * 2.8, 0, 0, Math.PI * 2)
          ctx!.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.op * 0.45})`
          ctx!.fill()
        }

        ctx!.restore()

        p.x   += p.vx
        p.y   += p.vy
        p.rot += p.drot
        p.op  += Math.sin(ts * 0.0007 + p.ph) * 0.0015
        p.op   = Math.max(0.02, Math.min(0.28, p.op))

        if (p.y > H + 20) { p.y = -20; p.x = Math.random() * W }
        if (p.x < -20)     p.x = W + 20
        if (p.x > W + 20)  p.x = -20
      }

      animId = requestAnimationFrame(frame)
    }

    animId = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 pointer-events-none z-10"
      aria-hidden
    />
  )
}
