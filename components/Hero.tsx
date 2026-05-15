'use client'

import { useLang, tx } from '@/lib/lang'
import { Countdown }   from './Countdown'

export function Hero() {
  const { lang } = useLang()

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden z-20"
      style={{
        background: `
          radial-gradient(ellipse 120% 60% at 50% 0%, #EDE0C8 0%, #FAF5ED 55%),
          #FAF5ED
        `,
      }}
    >
      {/* Top fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-parchment-mid/60 to-transparent z-0" />
      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-parchment-mid/40 to-transparent z-0" />

      {/* Thin gold border lines — top and bottom */}
      <div className="rule-gold absolute inset-x-12 top-10 z-0" />
      <div className="rule-gold absolute inset-x-12 bottom-10 z-0" />

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">

        {/* ── Pre-title ── */}
        <p className="h-a1 font-heading text-[0.72rem] tracking-[6px] uppercase text-walnut mb-10">
          {tx(lang, 'Together with their families', 'مع عيلتيهم الكريمة')}
        </p>

        {/* ── Couple names ── */}
        <h1
          className="h-a2 font-heading font-light text-walnut mb-8"
          style={{
            fontSize:   'clamp(3.4rem, 11vw, 9rem)',
            lineHeight: lang === 'ar' ? '1.5' : '1.05',
            fontStyle:  lang === 'en' ? 'italic' : 'normal',
            letterSpacing: lang === 'en' ? '-0.01em' : '0',
          }}
        >
          {lang === 'en' ? (
            <>Mahmoud <span className="gold-shimmer">&amp;</span> Raghda</>
          ) : (
            <>محمود <span className="gold-shimmer">و</span> رغدة</>
          )}
        </h1>

        {/* ── Divider ornament ── */}
        <div className="h-a3 flex items-center gap-5 mb-8 w-full max-w-xs">
          <div className="flex-1 rule-gold" />
          <span className="text-gold text-xs">✦</span>
          <div className="flex-1 rule-gold" />
        </div>

        {/* ── Tagline ── */}
        <p
          className="h-a3 font-body text-walnut-muted mb-14"
          style={{
            fontSize:  'clamp(1rem, 1.8vw, 1.25rem)',
            fontStyle: lang === 'en' ? 'italic' : 'normal',
          }}
        >
          {tx(lang,
            '"Two souls, one story — beginning forever"',
            '«روحين، حكاية واحدة — وبداية للأبد»',
          )}
        </p>

        {/* ── Date block ── */}
        <div className="h-a4 flex flex-col items-center gap-5 mb-14">

          {/* Palindrome date */}
          <div className="relative flex items-center justify-center gap-4">
            <div className="hidden sm:block h-px w-14 bg-gradient-to-r from-transparent to-gold/40" />

            <div className="flex items-center gap-4 select-none">
              <span
                className="font-heading font-light gold-shimmer leading-none"
                style={{ fontSize: 'clamp(3.8rem, 10vw, 7.5rem)', fontStyle: 'italic' }}
              >
                26
              </span>
              <span className="text-gold/40 text-3xl font-light leading-none">·</span>
              <span
                className="font-heading font-light gold-shimmer leading-none"
                style={{ fontSize: 'clamp(3.8rem, 10vw, 7.5rem)', fontStyle: 'italic' }}
              >
                6
              </span>
              <span className="text-gold/40 text-3xl font-light leading-none">·</span>
              <span
                className="font-heading font-light gold-shimmer leading-none"
                style={{ fontSize: 'clamp(3.8rem, 10vw, 7.5rem)', fontStyle: 'italic' }}
              >
                26
              </span>
            </div>

            <div className="hidden sm:block h-px w-14 bg-gradient-to-l from-transparent to-gold/40" />
          </div>

          {/* Palindrome caption */}
          <p
            className="font-heading text-walnut tracking-[4px] uppercase"
            style={{ fontSize: '0.72rem' }}
          >
            {tx(lang, 'A date that mirrors itself', 'تاريخ بيعكس نفسه')}
          </p>

          {/* Full written date */}
          <div className="border border-gold/30 px-10 py-4 relative bg-white/30">
            <span className="absolute -start-2.5 top-1/2 -translate-y-1/2 text-gold text-xs">✦</span>
            <span className="absolute -end-2.5   top-1/2 -translate-y-1/2 text-gold text-xs">✦</span>
            <p
              className="font-heading text-walnut tracking-widest uppercase"
              style={{ fontSize: 'clamp(0.82rem, 1.8vw, 1.1rem)' }}
            >
              {tx(lang, 'Friday · June 26 · 2026', 'الجمعة · ٢٦ يونيو · ٢٠٢٦')}
            </p>
          </div>
        </div>

        {/* ── Countdown ── */}
        <Countdown lang={lang} />

        {/* ── RSVP CTA ── */}
        <div className="h-a6 mt-10">
          <a
            href="#rsvp"
            className="
              inline-block border border-gold/40 bg-white/50 text-walnut
              font-heading text-[0.78rem] tracking-widest uppercase
              px-10 py-4 transition-all duration-300
              hover:border-gold/70 hover:bg-white hover:-translate-y-0.5
              hover:shadow-[0_8px_24px_rgba(184,146,44,0.18)]
            "
            style={{ fontStyle: lang === 'en' ? 'italic' : 'normal' }}
          >
            {tx(lang, 'Confirm Attendance ✦', 'أكد حضورك ✦')}
          </a>
        </div>
      </div>

      {/* ── Scroll arrow ── */}
      <div className="h-a6 absolute bottom-9 left-1/2 -translate-x-1/2">
        <div
          aria-hidden
          className="w-5 h-5 border-e border-b border-gold/50"
          style={{ transform: 'rotate(45deg)', animation: 'scrollBounce 2s ease-in-out infinite' }}
        />
      </div>
    </section>
  )
}
