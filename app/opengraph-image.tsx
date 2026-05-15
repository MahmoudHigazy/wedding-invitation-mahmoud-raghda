import { ImageResponse } from 'next/og'

export const runtime     = 'edge'
export const alt         = 'Mahmoud & Raghda — Wedding Invitation'
export const size        = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%',
          background: '#FAF5ED',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Georgia, serif',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', inset: 32, border: '1px solid rgba(184,146,44,0.35)', display: 'flex' }} />
        <div style={{ position: 'absolute', inset: 42, border: '1px solid rgba(184,146,44,0.15)', display: 'flex' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
          <div style={{ width: 70, height: 1, background: 'rgba(184,146,44,0.4)' }} />
          <div style={{ color: '#B8922C', fontSize: 16 }}>✦</div>
          <div style={{ width: 70, height: 1, background: 'rgba(184,146,44,0.4)' }} />
        </div>

        <div style={{ fontSize: 18, letterSpacing: 6, color: '#7A6248', textTransform: 'uppercase', marginBottom: 24 }}>
          You are cordially invited
        </div>

        <div style={{ fontSize: 88, color: '#1C140A', fontStyle: 'italic', fontWeight: 300, lineHeight: 1.1 }}>
          Mahmoud &amp; Raghda
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '28px 0' }}>
          <div style={{ width: 100, height: 1, background: 'rgba(184,146,44,0.4)' }} />
          <div style={{ color: '#B8922C', fontSize: 18 }}>✦</div>
          <div style={{ width: 100, height: 1, background: 'rgba(184,146,44,0.4)' }} />
        </div>

        <div style={{ fontSize: 28, color: '#B8922C', fontStyle: 'italic', letterSpacing: 6 }}>
          26 · 6 · 26
        </div>

        <div style={{ fontSize: 16, color: '#7A6248', letterSpacing: 4, marginTop: 12, textTransform: 'uppercase' }}>
          Friday, June 26, 2026  ·  Taracina, Giza
        </div>
      </div>
    ),
    { ...size }
  )
}
