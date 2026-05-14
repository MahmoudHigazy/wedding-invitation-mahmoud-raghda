'use client'

import { useLang } from '@/lib/lang'

export function LangToggle() {
  const { lang, toggle } = useLang()

  return (
    <button
      onClick={toggle}
      aria-label="Toggle language / تغيير اللغة"
      className="
        fixed top-5 end-5 z-50
        border border-gold/40 bg-parchment/90
        text-walnut backdrop-blur-sm
        px-6 py-2.5 rounded-sm
        shadow-[0_2px_16px_rgba(28,20,10,0.08)]
        transition-all duration-300
        hover:border-gold/70 hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(28,20,10,0.12)]
        active:scale-95
      "
      style={{ lineHeight: 1 }}
    >
      {lang === 'en' ? (
        <span className="font-amiri text-xl text-walnut">عربي</span>
      ) : (
        <span className="font-cormorant italic text-base tracking-wide text-walnut">English</span>
      )}
    </button>
  )
}
