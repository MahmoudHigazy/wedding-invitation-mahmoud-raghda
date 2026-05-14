'use client'

import { useLang, tx } from '@/lib/lang'
import { Reveal } from './Reveal'

const EVENTS = [
  {
    year: ['2020', '٢٠٢٠'],
    head: ['The First Hello', 'أوّل لقاء'],
    body: [
      'It started with a chance encounter — a shared laugh over something neither of us can quite remember. But neither of us forgot each other after that moment.',
      'بدأت القصة بلقاء عابر — ضحكة مشتركة على شيء لم يعد أحدنا يتذكره تماماً. لكن لم يستطع أحدنا أن ينسى الآخر بعد تلك اللحظة.',
    ],
  },
  {
    year: ['2021', '٢٠٢١'],
    head: ['Growing Together', 'النمو معاً'],
    body: [
      'Long conversations turned into late nights. We discovered shared dreams, endless curiosity, and a quiet comfort in each other\'s presence that felt like coming home.',
      'تحوّلت المحادثات الطويلة إلى ليالٍ مضيئة. اكتشفنا أحلاماً مشتركة، وفضولاً لا ينتهي، وراحةً هادئة في حضور بعضنا — كأنه العودة إلى البيت.',
    ],
  },
  {
    year: ['2023', '٢٠٢٣'],
    head: ['The Question', 'السؤال العظيم'],
    body: [
      'Under a sky full of stars, Mahmoud asked the question that would change everything. Raghda said yes — and the rest became history.',
      'تحت سماء مليئة بالنجوم، سأل محمود السؤال الذي غيّر كل شيء. قالت رغدة نعم — والباقي صار تاريخاً.',
    ],
  },
  {
    year: ['2026', '٢٠٢٦'],
    head: ['Forever Begins', 'بداية الأبد'],
    body: [
      'Today, surrounded by everyone we love, we begin the greatest chapter of our lives. We are endlessly grateful you are here to witness it.',
      'اليوم، محاطَين بكل من نحبهم، نبدأ أعظم فصل في حياتنا. نحن ممتنون لا حدود لامتناننا لأنك هنا لتشهد هذه اللحظة.',
    ],
  },
]

export function Story() {
  const { lang } = useLang()
  const i = lang === 'en' ? 0 : 1

  return (
    <section
      id="story"
      className="relative z-20 py-28 px-6"
      style={{ background: 'linear-gradient(180deg,#08030a 0%,#110710 50%,#08030a 100%)' }}
    >
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <span className="block text-[0.72rem] tracking-[5px] uppercase text-gold mb-4 font-heading">
            {tx(lang, 'Our Journey', 'رحلتنا')}
          </span>
          <h2
            className="font-heading font-normal text-ivory"
            style={{
              fontSize:  'clamp(2.4rem, 5.5vw, 3.8rem)',
              fontStyle: lang === 'en' ? 'italic' : 'normal',
              lineHeight: lang === 'ar' ? '1.55' : '1.2',
            }}
          >
            {tx(lang, 'Our Story', 'قصّتنا')}
          </h2>
        </Reveal>

        {/* Timeline */}
        <div className="relative mt-12">
          {/* Vertical line */}
          <div
            className="absolute start-0 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(180deg,transparent,rgba(201,168,76,.4) 10%,rgba(201,168,76,.4) 90%,transparent)' }}
          />

          <div className="ps-12 space-y-10">
            {EVENTS.map((ev, idx) => (
              <Reveal key={idx}>
                <div className="relative">
                  {/* Dot */}
                  <span
                    className="absolute text-gold text-xs"
                    style={{ insetInlineStart: '-3.2rem', top: '4px' }}
                  >
                    ✦
                  </span>

                  <p className="font-heading text-gold tracking-widest text-sm mb-1">
                    {ev.year[i]}
                  </p>
                  <h3
                    className="font-heading text-ivory mb-2"
                    style={{
                      fontSize:  '1.4rem',
                      fontStyle: lang === 'en' ? 'italic' : 'normal',
                      lineHeight: lang === 'ar' ? '1.8' : '1.3',
                    }}
                  >
                    {ev.head[i]}
                  </h3>
                  <p className="font-body text-ivory-dark text-base" style={{ lineHeight: lang === 'ar' ? '2.3' : '2' }}>
                    {ev.body[i]}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
