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
        {/* Border frames */}
        <div style={{ position: 'absolute', inset: 32, border: '1px solid rgba(184,146,44,0.35)', display: 'flex' }} />
        <div style={{ position: 'absolute', inset: 42, border: '1px solid rgba(184,146,44,0.15)', display: 'flex' }} />

        {/* Top ornament */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
          <div style={{ width: 70, height: 1, background: 'rgba(184,146,44,0.4)' }} />
          <div style={{ color: '#B8922C', fontSize: 16 }}>✦</div>
          <div style={{ width: 70, height: 1, background: 'rgba(184,146,44,0.4)' }} />
        </div>

        {/* Bilingual invite line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 22 }}>
          <span style={{ fontSize: 16, letterSpacing: 5, color: '#7A6248', textTransform: 'uppercase' }}>
            You are cordially invited
          </span>
          <span style={{ color: '#B8922C', fontSize: 14 }}>·</span>
          <span style={{ fontSize: 18, color: '#7A6248' }}>
            أنتم مدعوون
          </span>
        </div>

        {/* English names */}
        <div style={{ fontSize: 80, color: '#1C140A', fontStyle: 'italic', fontWeight: 300, lineHeight: 1.1 }}>
          Mahmoud &amp; Raghda
        </div>

        {/* Arabic names */}
        <div style={{ fontSize: 52, color: '#1C140A', fontWeight: 300, lineHeight: 1.4, marginTop: 8 }}>
          محمود ورغدة
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '24px 0' }}>
          <div style={{ width: 100, height: 1, background: 'rgba(184,146,44,0.4)' }} />
          <div style={{ color: '#B8922C', fontSize: 18 }}>✦</div>
          <div style={{ width: 100, height: 1, background: 'rgba(184,146,44,0.4)' }} />
        </div>

        {/* Date */}
        <div style={{ fontSize: 26, color: '#B8922C', fontStyle: 'italic', letterSpacing: 4 }}>
          26 · 6 · 26
        </div>

        {/* Bilingual venue line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 10 }}>
          <span style={{ fontSize: 15, color: '#7A6248', letterSpacing: 3, textTransform: 'uppercase' }}>
            Friday, June 26, 2026 · Taracina, Giza
          </span>
          <span style={{ color: '#B8922C', fontSize: 12 }}>·</span>
          <span style={{ fontSize: 16, color: '#7A6248' }}>
            تراسينا، الجيزة
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
