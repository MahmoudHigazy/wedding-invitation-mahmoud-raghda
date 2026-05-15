'use client'

import { useEffect, useState } from 'react'
import { useLang, tx } from '@/lib/lang'
import { Reveal } from './Reveal'

const GOOGLE_CAL = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mahmoud+%26+Raghda+%E2%80%94+Wedding&dates=20260626T190000/20260627T000000&ctz=Africa%2FCairo&details=Wedding+at+7%3A00+PM.+Venue%3A+Taracina+Wedding+on+the+Nile%2C+Manial+Shiha%2C+Giza&location=Taracina+Wedding+on+the+Nile%2C+Manial+Shiha%2C+Giza'

function CalendarButton({ lang }: { lang: 'en' | 'ar' }) {
  const [isApple, setIsApple] = useState(false)
  useEffect(() => {
    setIsApple(/iphone|ipad|ipod|macintosh/i.test(navigator.userAgent))
  }, [])

  const calIcon = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="4" width="18" height="17" rx="2" stroke="#B8922C" strokeWidth="1.5"/>
      <path d="M3 9h18" stroke="#B8922C" strokeWidth="1.5"/>
      <path d="M8 2v4M16 2v4" stroke="#B8922C" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )

  const cls = "inline-flex items-center gap-2 border border-gold/30 bg-white/60 text-walnut px-4 py-2 font-heading text-[0.72rem] tracking-[2px] uppercase transition-all duration-300 hover:border-gold/60 hover:bg-white hover:-translate-y-0.5 mt-5"

  if (isApple) {
    return (
      <a href="/api/calendar" download="mahmoud-raghda-wedding.ics" className={cls}>
        {calIcon}
        {tx(lang, 'Add to Calendar', 'أضف للتقويم')}
      </a>
    )
  }

  return (
    <a href={GOOGLE_CAL} target="_blank" rel="noopener noreferrer" className={cls}>
      {calIcon}
      {tx(lang, 'Add to Calendar', 'أضف للتقويم')}
    </a>
  )
}

const CARDS = [
  {
    icon:  '◈',
    title: ['Date & Time',   'التاريخ والوقت'],
    body:  [
      'Friday, June 26th, 2026\nWedding: 7:00 PM',
      'الجمعة، ٢٦ يونيو ٢٠٢٦\nحفل الزفاف: الساعة ٧:٠٠ بالليل',
    ],
    calendar: true,
  },
  {
    icon:  '◈',
    title: ['Venue',         'مكان الفرح'],
    body:  [
      'Taracina Wedding on the Nile\nManial Shiha, Giza\nA semi-island on the banks of the Nile',
      'تراسينا — حفلات على النيل\nمنيل شيحة، الجيزة\nجزيرة صغيرة على ضفاف نهر النيل',
    ],
  },
  {
    icon:  '◈',
    title: ['Getting There', 'إزاي توصل'],
    body:  [
      'Via Maadi (Cairo side):\nFree faluka crossing from Maadi Corniche — a scenic Nile boat ride to the venue.\n\nVia Manial Shiha (Giza side):\nCairo–Assiut Agricultural Road · 3 km south of Mounib Bridge\n~15 min from Dokki & Mohandessin',
      'من المعادي (القاهرة):\nفلوكة مجانية من كورنيش المعادي — تعدّي النيل بالقارب لحد القاعة.\n\nمن منيل شيحة (الجيزة):\nطريق مصر–أسيوط الزراعي · ٣ كم جنوب كوبري المنيب\n~ربع ساعة من الدقي والمهندسين',
    ],
  },
]

export function Details() {
  const { lang } = useLang()
  const i = lang === 'en' ? 0 : 1

  return (
    <section id="details" className="relative z-20 py-28 px-6 bg-parchment-mid">
      <div className="max-w-4xl mx-auto">
        <Reveal className="text-center mb-14">
          <p className="text-[0.72rem] tracking-[6px] uppercase text-walnut mb-5 font-heading">
            {tx(lang, 'Mark Your Calendar', 'سجّل الموعد في أجندتك')}
          </p>
          <h2
            className="font-heading font-light text-walnut"
            style={{
              fontSize:   'clamp(2.6rem, 6vw, 4.2rem)',
              fontStyle:  lang === 'en' ? 'italic' : 'normal',
              lineHeight: lang === 'ar' ? '1.55' : '1.1',
            }}
          >
            {tx(lang, 'Event Details', 'تفاصيل الفرح')}
          </h2>
          <div className="rule-gold mt-6 max-w-[120px] mx-auto" />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {CARDS.map((c, idx) => (
            <Reveal key={idx} className={idx === 2 ? 'sm:col-span-2' : ''}>
              <div className="border border-gold/20 p-10 bg-parchment/70 relative group transition-all duration-300 hover:border-gold/45 hover:bg-white/50">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                <span className="text-gold/60 text-sm block mb-4 font-heading tracking-widest">{c.icon}</span>
                <h3
                  className="font-heading text-walnut mb-3"
                  style={{ fontSize: '1.15rem', fontStyle: lang === 'en' ? 'italic' : 'normal', fontWeight: 400 }}
                >
                  {c.title[i]}
                </h3>
                <p
                  className="font-body text-walnut-muted text-[0.97rem]"
                  style={{ lineHeight: lang === 'ar' ? '2.4' : '2.0', whiteSpace: 'pre-line' }}
                >
                  {c.body[i]}
                </p>
                {'calendar' in c && <CalendarButton lang={lang} />}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Maps */}
        <Reveal className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="border border-gold/20 overflow-hidden relative">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent z-10" />
              <div className="px-5 py-3 bg-parchment/80 flex items-center gap-3">
                <span className="text-gold/70 text-xs font-heading tracking-widest">◈</span>
                <p className="font-heading text-walnut text-[0.78rem] tracking-[2px] uppercase">
                  {tx(lang, 'Venue — Taracina, Manial Shiha', 'القاعة — تراسينا، منيل شيحة')}
                </p>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3458.0!2d31.222!3d29.948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458471960f8591f%3A0x613ff21816de1067!2sTaracina%20Events%20Hall!5e0!3m2!1sen!2seg!4v1715000000001!5m2!1sen!2seg"
                className="w-full h-[280px] border-0 block"
                style={{ filter: 'sepia(15%) saturate(0.85) brightness(1.05)' }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title={tx(lang, 'Taracina venue — Manial Shiha', 'تراسينا — منيل شيحة')}
              />
            </div>
            <div className="border border-gold/20 overflow-hidden relative">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent z-10" />
              <div className="px-5 py-3 bg-parchment/80 flex items-center gap-3">
                <span className="text-gold/70 text-xs font-heading tracking-widest">◈</span>
                <p className="font-heading text-walnut text-[0.78rem] tracking-[2px] uppercase">
                  {tx(lang, 'Boat Pickup — Maadi Corniche', 'نقطة الفلوكة — كورنيش المعادي')}
                </p>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.0!2d31.256!3d29.962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14584760a8ff10d9%3A0x8368ddce0b5cd6e4!2sTaracina%20wedding%20venue!5e0!3m2!1sen!2seg!4v1715000000002!5m2!1sen!2seg"
                className="w-full h-[280px] border-0 block"
                style={{ filter: 'sepia(15%) saturate(0.85) brightness(1.05)' }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title={tx(lang, 'Boat pickup — Maadi Corniche', 'نقطة الفلوكة — كورنيش المعادي')}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
