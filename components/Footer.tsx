'use client'

import { useLang, tx } from '@/lib/lang'

export function Footer() {
  const { lang } = useLang()

  return (
    <footer className="relative z-20 bg-parchment-mid border-t border-gold/15 text-center px-6 py-20">

      {/* Ornament */}
      <div className="flex items-center justify-center gap-5 mb-10">
        <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold/40" />
        <span className="text-gold/50 text-sm font-heading tracking-widest">✦</span>
        <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold/40" />
      </div>

      <h2
        className="font-heading font-light text-walnut mb-5"
        style={{
          fontSize:  'clamp(2rem, 5vw, 3.4rem)',
          fontStyle: lang === 'en' ? 'italic' : 'normal',
        }}
      >
        {tx(lang, 'Mahmoud & Raghda', 'محمود و رغدة')}
      </h2>

      <p
        className="font-body text-walnut-muted max-w-md mx-auto mb-10"
        style={{
          fontSize:  lang === 'ar' ? '1.05rem' : '1rem',
          lineHeight: lang === 'ar' ? '2.4' : '2.1',
        }}
      >
        {tx(lang,
          'Your presence is the greatest gift of all. We are endlessly grateful to share this moment with you.',
          'حضوركم هو أعظم هدية على الإطلاق. نحن ممتنون لا حدود لامتناننا لمشاركتكم هذه اللحظة.',
        )}
      </p>

      {/* Bottom ornament */}
      <div className="flex items-center justify-center gap-5 mb-8">
        <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold/40" />
        <span className="text-gold/50 text-sm font-heading tracking-widest">✦</span>
        <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold/40" />
      </div>

      <p className="text-[0.65rem] tracking-[4px] uppercase text-walnut-muted/40 font-heading">
        {tx(lang, 'June 26 · 2026 · Taracina, Manial Shiha, Giza', '٢٦ يونيو · ٢٠٢٦ · تاراتشينا، منيل شيحة، الجيزة')}
      </p>
    </footer>
  )
}
