'use client'

import { useLang } from '@/lib/lang'

export function WhatsAppShare() {
  const { lang } = useLang()

  const message = lang === 'en'
    ? `You're invited to Mahmoud & Raghda's wedding — June 26, 2026 🤍\nhttps://wedding-mahmoud-raghda.vercel.app`
    : `https://wedding-mahmoud-raghda.vercel.app\nمحمود ورغدة بيعزموك على فرحهم — ٢٦ يونيو ٢٠٢٦ 🤍`

  const url = `https://wa.me/?text=${encodeURIComponent(message)}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Share on WhatsApp"
      className="
        fixed bottom-6 end-6 z-40
        flex items-center justify-center
        w-13 h-13 rounded-full
        bg-[#25D366] shadow-lg
        transition-all duration-300
        hover:scale-110 hover:shadow-xl
      "
      style={{ width: 52, height: 52 }}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.857L.057 23.428a.5.5 0 0 0 .606.61l5.703-1.453A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.944 9.944 0 0 1-5.13-1.424l-.36-.214-3.733.952.986-3.648-.235-.374A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      </svg>
    </a>
  )
}
