'use client'

import { useEffect, useState } from 'react'
import { useLang, tx } from '@/lib/lang'
import { Reveal } from './Reveal'


const GOOGLE_CAL = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mahmoud+%26+Raghda+%E2%80%94+Wedding&dates=20260626T173000/20260627T000000&ctz=Africa%2FCairo&details=Wedding+at+5%3A30+PM.+Venue%3A+Taracina+Wedding+on+the+Nile%2C+Manial+Shiha%2C+Giza&location=Taracina+Wedding+on+the+Nile%2C+Manial+Shiha%2C+Giza'

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

const ROUTES = {
  maadi: {
    label:  ['Maadi', 'المعادي'],
    body:   [
      'Free boat from Maadi Corniche — a scenic Nile ride to the venue.',
      'قارب مجاني من كورنيش المعادي — تعدّي النيل لحد القاعة.',
    ],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.0!2d31.256!3d29.962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14584760a8ff10d9%3A0x8368ddce0b5cd6e4!2sTaracina%20wedding%20venue!5e0!3m2!1sen!2seg!4v1715000000002!5m2!1sen!2seg',
    mapTitle: ['Boat pickup — Maadi Corniche', 'نقطة القارب — كورنيش المعادي'],
  },
  giza: {
    label:  ['Manial Shiha', 'منيل شيحة'],
    body:   [
      'Cairo–Assiut Agricultural Road · 3 km south of Mounib Bridge\n~15 min from Dokki & Mohandessin',
      'طريق مصر–أسيوط الزراعي · ٣ كم جنوب كوبري المنيب\n~ربع ساعة من الدقي والمهندسين',
    ],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3458.0!2d31.222!3d29.948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458471960f8591f%3A0x613ff21816de1067!2sTaracina%20Events%20Hall!5e0!3m2!1sen!2seg!4v1715000000001!5m2!1sen!2seg',
    mapTitle: ['Taracina venue — Manial Shiha', 'تراسينا — منيل شيحة'],
  },
}

function GettingThereCard({ lang }: { lang: 'en' | 'ar' }) {
  const [tab, setTab] = useState<'maadi' | 'giza'>('maadi')
  const i = lang === 'en' ? 0 : 1
  const route = ROUTES[tab]

  return (
    <div className="border border-gold/20 bg-parchment/70 relative transition-all duration-300 hover:border-gold/45 hover:bg-white/50">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="p-6">
        <span className="text-gold/60 text-sm block mb-4 font-heading tracking-widest">◈</span>

        {/* Venue + Time */}
        <p className="font-heading text-walnut mb-1" style={{ fontSize: '1.15rem', fontStyle: lang === 'en' ? 'italic' : 'normal', fontWeight: 400 }}>
          {tx(lang, 'Taracina Wedding on the Nile', 'تراسينا — حفلات على النيل')}
        </p>
        <p className="font-body text-walnut-muted text-[0.97rem] mb-1">
          {tx(lang, 'Manial Shiha, Giza', 'منيل شيحة، الجيزة')}
        </p>
        <p className="font-body text-walnut-muted text-[0.97rem] mb-5">
          {tx(lang, 'Friday, June 26th · 5:30 PM', 'الجمعة ٢٦ يونيو · ٥:٣٠ مساءً')}
        </p>

        <CalendarButton lang={lang} />

        <div className="h-px bg-gold/15 my-6" />

        {/* Getting There */}
        <h3 className="font-heading text-walnut mb-4" style={{ fontSize: '1rem', fontStyle: lang === 'en' ? 'italic' : 'normal', fontWeight: 400 }}>
          {tx(lang, 'Getting There', 'إزاي توصل')}
        </h3>

        <p className="font-body text-walnut-muted text-[0.9rem] mb-5 border border-gold/20 bg-parchment-mid/60 px-4 py-3" dir="rtl" style={{ lineHeight: '2.2', letterSpacing: 0 }}>
          عشان توصل للقاعة، عندك طريقين:<br />
          <br />
          <strong className="text-walnut">منيل شيحة</strong> — تركن عربيتك في باركينج القاعة<br />
          <div className="flex items-center gap-2 my-1" dir="rtl">
            <div className="flex-1 h-px bg-gold/20" />
            <span className="text-walnut-muted text-[0.8rem]">أو</span>
            <div className="flex-1 h-px bg-gold/20" />
          </div>
          <strong className="text-walnut">كورنيش المعادي</strong> <span className="text-gold text-[0.8rem]">(مُستحسن)</span> — تركن عربيتك في باركينج عالكورنيش، وادخل من <strong className="text-walnut">بوابة ٣ مرسى النهر الخالد</strong> واسأل على قاعة تراسينا، هيقولولك المكان اللي هتركب منه المركب. المركب مجانية ومش بتاخد أكتر من ١٠ دقايق<br />
        </p>

        <div className="flex gap-2 mb-5">
          {(['maadi', 'giza'] as const).map(key => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`font-heading text-[0.72rem] tracking-[2px] uppercase px-4 py-2 border transition-all duration-200 ${
                tab === key
                  ? 'border-gold/60 bg-white/70 text-walnut'
                  : 'border-gold/20 text-walnut-muted hover:border-gold/40'
              }`}
            >
              {ROUTES[key].label[i]}
            </button>
          ))}
        </div>

        <p className="font-body text-walnut-muted text-[0.97rem]" style={{ lineHeight: lang === 'ar' ? '2.4' : '2.0', whiteSpace: 'pre-line' }}>
          {route.body[i]}
        </p>
      </div>

      <div className="border-t border-gold/20">
        <iframe
          key={tab}
          src={route.mapSrc}
          className="w-full h-[260px] border-0 block"
          style={{ filter: 'sepia(15%) saturate(0.85) brightness(1.05)' }}
          allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          title={route.mapTitle[i]}
        />
      </div>
    </div>
  )
}

export function Details() {
  const { lang } = useLang()

  return (
    <section id="details" className="relative z-20 py-20 px-6 bg-parchment-mid">
      <div className="max-w-2xl mx-auto">
        <Reveal>
          <GettingThereCard lang={lang} />
        </Reveal>
      </div>
    </section>
  )
}
