import { ImageResponse } from 'next/og'
import { NextRequest }   from 'next/server'

export const runtime = 'edge'

async function loadArabicFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      'https://fonts.googleapis.com/css2?family=Amiri&display=swap',
      { headers: { 'User-Agent': 'Mozilla/5.0 (compatible)' } }
    ).then(r => r.text())

    const url = css.match(/src: url\(([^)]+)\) format\('woff2'\)/)?.[1]
    if (!url) return null
    return fetch(url).then(r => r.arrayBuffer())
  } catch {
    return null
  }
}

function buildImage(isAr: boolean) {
  return (
    <div
      style={{
        width: '100%', height: '100%',
        background: '#FAF5ED',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: isAr ? 'Amiri, serif' : 'Georgia, serif',
        position: 'relative',
      }}
    >
      <div style={{ position: 'absolute', top: 32, right: 32, bottom: 32, left: 32, border: '1px solid rgba(184,146,44,0.35)', display: 'flex' }} />
      <div style={{ position: 'absolute', top: 42, right: 42, bottom: 42, left: 42, border: '1px solid rgba(184,146,44,0.15)', display: 'flex' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
        <div style={{ width: 70, height: 1, background: 'rgba(184,146,44,0.4)' }} />
        <div style={{ color: '#B8922C', fontSize: 20 }}>&#x2726;</div>
        <div style={{ width: 70, height: 1, background: 'rgba(184,146,44,0.4)' }} />
      </div>

      <div style={{ fontSize: 18, letterSpacing: isAr ? 0 : 6, color: '#7A6248', marginBottom: 24 }}>
        {isAr ? 'أنتم مدعوون' : 'YOU ARE INVITED'}
      </div>

      <div style={{ fontSize: isAr ? 80 : 88, color: '#1C140A', fontWeight: 300, lineHeight: 1.2 }}>
        {isAr ? 'محمود ورغدة' : 'Mahmoud & Raghda'}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 28, marginBottom: 28 }}>
        <div style={{ width: 100, height: 1, background: 'rgba(184,146,44,0.4)' }} />
        <div style={{ color: '#B8922C', fontSize: 22 }}>&#x2726;</div>
        <div style={{ width: 100, height: 1, background: 'rgba(184,146,44,0.4)' }} />
      </div>

      <div style={{ fontSize: 28, color: '#B8922C', letterSpacing: 6 }}>
        26 · 6 · 26
      </div>

      <div style={{ fontSize: 16, color: '#7A6248', letterSpacing: isAr ? 0 : 4, marginTop: 12 }}>
        {isAr ? 'الجمعة ٢٦ يونيو ٢٠٢٦ · تراسينا، الجيزة' : 'Friday, June 26, 2026  ·  Taracina, Giza'}
      </div>
    </div>
  )
}

export async function GET(req: NextRequest) {
  const lang      = req.nextUrl.searchParams.get('lang') === 'ar' ? 'ar' : 'en'
  const isAr      = lang === 'ar'
  const arabicBuf = isAr ? await loadArabicFont() : null

  if (arabicBuf) {
    return new ImageResponse(buildImage(true), {
      width: 1200, height: 630,
      fonts: [{ name: 'Amiri', data: arabicBuf, style: 'normal' }],
    })
  }

  // Fall back to English image — Arabic text can't render without the font
  return new ImageResponse(buildImage(false), { width: 1200, height: 630 })
}
