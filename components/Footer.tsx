'use client'

import { useLang, tx } from '@/lib/lang'

export function Footer() {
  const { lang } = useLang()

  return (
    <footer className="relative z-20 bg-parchment-mid border-t border-gold/15 text-center px-6 py-10">
      <div className="flex items-center justify-center gap-5 mb-6">
        <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold/40" />
        <span className="text-gold/50 text-sm font-heading tracking-widest">✦</span>
        <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold/40" />
      </div>
      <p className="text-[0.68rem] tracking-[4px] uppercase text-walnut-muted font-heading">
        {tx(lang, 'June 26 · 2026 · Taracina, Manial Shiha, Giza', '٢٦ يونيو · ٢٠٢٦ · تراسينا، منيل شيحة، الجيزة')}
      </p>
    </footer>
  )
}
