'use client'

import { useLang, tx } from '@/lib/lang'
import { Reveal } from './Reveal'

const SWATCHES = [
  { bg: '#6b1226', en: 'Burgundy',    ar: 'برغندي' },
  { bg: '#c9a84c', en: 'Champagne',   ar: 'شمبانيا' },
  { bg: '#f5f0e8', en: 'Ivory',       ar: 'عاجي',   border: true },
  { bg: '#2c1a1a', en: 'Deep Brown',  ar: 'بني داكن' },
  { bg: '#9e9890', en: 'Taupe',       ar: 'توب' },
]

export function DressCode() {
  const { lang } = useLang()

  return (
    <section
      id="dresscode"
      className="relative z-20 py-28 px-6"
      style={{ background: 'linear-gradient(180deg,#08030a,#110710)' }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <Reveal>
          <span className="block text-[0.72rem] tracking-[5px] uppercase text-gold mb-4 font-heading">
            {tx(lang, 'What to Wear', 'الزي المناسب')}
          </span>
          <h2
            className="font-heading font-normal text-ivory mb-6"
            style={{
              fontSize:  'clamp(2.4rem, 5.5vw, 3.8rem)',
              fontStyle: lang === 'en' ? 'italic' : 'normal',
              lineHeight: lang === 'ar' ? '1.55' : '1.2',
            }}
          >
            {tx(lang, 'Dress Code', 'كود اللباس')}
          </h2>
          <p
            className="font-body text-ivory-dark max-w-xl mx-auto"
            style={{
              fontSize:  lang === 'ar' ? '1.15rem' : '1.05rem',
              fontStyle: lang === 'en' ? 'italic' : 'normal',
              lineHeight: lang === 'ar' ? '2.4' : '2.1',
            }}
          >
            {tx(lang,
              'We invite you to join us in formal evening attire. To complement our décor, we kindly suggest staying within our colour palette.',
              'ندعوكم للارتداء بأناقة رسمية مسائية. لتتناسقوا مع ديكورنا، نقترح بلطف الالتزام بألواننا المختارة.',
            )}
          </p>
        </Reveal>

        {/* Swatches */}
        <Reveal className="mt-12">
          <div className="flex justify-center gap-8 flex-wrap">
            {SWATCHES.map(s => (
              <div key={s.en} className="text-center">
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-3 shadow-[0_8px_28px_rgba(0,0,0,.55)] transition-transform duration-300 hover:scale-110"
                  style={{
                    background: s.bg,
                    border: s.border ? '2px solid rgba(201,168,76,.5)' : '2px solid rgba(201,168,76,.18)',
                  }}
                />
                <p className="text-[0.72rem] tracking-widest uppercase text-gold font-heading">
                  {lang === 'ar' ? s.ar : s.en}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-8">
          <p
            className="font-body text-ivory/40"
            style={{
              fontSize:  lang === 'ar' ? '1.05rem' : '0.92rem',
              fontStyle: lang === 'en' ? 'italic'  : 'normal',
              lineHeight: '2',
            }}
          >
            {tx(lang,
              'Please avoid white, off-white, and neon colours. Thank you for keeping our aesthetic cohesive.',
              'يُرجى تجنّب الأبيض وشبه الأبيض والألوان الفلورية. شكراً لمساعدتكم في الحفاظ على تناسق المظهر العام.',
            )}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
