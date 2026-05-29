'use client'

import { useState } from 'react'
import { useLang, tx } from '@/lib/lang'
import { Reveal } from './Reveal'
import { Confetti } from './Confetti'

type Att  = 'solo' | 'family'
type Side = 'bride' | 'groom'

interface FormState {
  name:      string
  side:      Side | ''
  att:       Att | ''
  partySize: string
}

export function RsvpSection() {
  const { lang } = useLang()
  const [form,    setForm]    = useState<FormState>({ name: '', side: '', att: '', partySize: '' })
  const [done,    setDone]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!form.name.trim()) { setError(tx(lang, 'Please enter your name.', 'اكتب اسمك الأول.')); return }
    if (!form.side)        { setError(tx(lang, 'Please choose bride or groom side.', 'اختار جهة العروسة أو العريس.')); return }
    if (!form.att)          { setError(tx(lang, 'Please choose attendance type.', 'اختار نوع الحضور.')); return }
    if (form.att === 'family' && (!form.partySize || Number(form.partySize) < 2)) {
      setError(tx(lang, 'Please enter family size (min 2).', 'اكتب عدد الأفراد (٢ على الأقل).')); return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/rsvp', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:       form.name.trim(),
          side:       form.side,
          attendance: form.att,
          partySize:  form.att === 'family' ? Number(form.partySize) : 1,
        }),
      })
      if (!res.ok) throw new Error('Server error')
      setDone(true)
    } catch {
      setError(tx(lang, 'Something went wrong. Please try again.', 'في غلطة حصلت. حاول تاني.'))
    } finally {
      setLoading(false)
    }
  }

  const inputCls = `
    w-full bg-white/70 border border-gold/25 text-walnut px-5 py-3.5
    font-body text-base outline-none rounded-none
    focus:border-gold/60 focus:bg-white/90
    transition-colors duration-300
    placeholder:text-walnut-muted/40
  `

  const attBtnCls = (active: boolean) => `
    flex-1 border py-4 px-3 text-center cursor-pointer transition-all duration-300 font-body text-[0.9rem]
    ${active
      ? 'border-gold bg-gold/10 text-walnut'
      : 'border-gold/25 text-walnut-muted hover:border-gold/45 hover:bg-gold/5'}
  `

  return (
    <section id="rsvp" className="relative z-20 py-28 px-6 bg-parchment">
      <div className="max-w-xl mx-auto">
        <Reveal className="text-center">
          <p className="block text-[0.68rem] tracking-[6px] uppercase text-walnut mb-5 font-heading">
            {tx(lang, `We’d love to see you there`, 'تعالوا احتفلوا معانا')}
          </p>
          <h2
            className="font-heading font-light text-walnut mb-4"
            style={{
              fontSize:  'clamp(2.6rem, 5.5vw, 4rem)',
              fontStyle: lang === 'en' ? 'italic' : 'normal',
              lineHeight: lang === 'ar' ? '1.55' : '1.1',
            }}
          >
            {tx(lang, 'RSVP', 'تأكيد الحضور')}
          </h2>
          <div className="rule-gold mt-4 mb-6 max-w-[100px] mx-auto" />
          <p className="font-body text-walnut-muted text-base" style={{ lineHeight: lang === 'ar' ? '2.3' : '2' }}>
            {lang === 'en' ? (
              <>Please confirm your attendance by <strong className="text-walnut">June 15th, 2026</strong>.</>
            ) : (
              <>أكدولنا حضوركم قبل <strong className="text-walnut">١٥ يونيو ٢٠٢٦</strong>.</>
            )}
          </p>
        </Reveal>

        <Reveal className="mt-10">
          {done ? (
            <>
            <Confetti />
            <div className="border border-gold/30 p-12 text-center bg-white/40">
              <div className="rule-gold mb-8" />
              <span className="text-gold text-3xl block mb-5 font-heading">✦</span>
              <h3
                className="font-heading font-light text-walnut text-2xl mb-3"
                style={{ fontStyle: lang === 'en' ? 'italic' : 'normal' }}
              >
                {tx(lang, "You're confirmed!", 'اتأكدت!')}
              </h3>
              <p className="font-body text-walnut-muted" style={{ lineHeight: lang === 'ar' ? '2.3' : '2' }}>
                {lang === 'en' ? (
                  <>Thank you — we cannot wait to celebrate with you.<br /><em>With love, Mahmoud &amp; Raghda</em></>
                ) : (
                  <>شكراً — مستنيينك أوي.<br /><em>بكل الحب، محمود ورغدة</em></>
                )}
              </p>
            </div>
            </>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-7">
              {/* Name */}
              <div>
                <label className="block text-[0.68rem] tracking-[4px] uppercase text-walnut mb-2 font-heading">
                  {tx(lang, 'Your Name', 'اسمك')}
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder={tx(lang, 'Enter your name…', 'اكتب اسمك…')}
                  className={inputCls}
                />
              </div>

              {/* Side */}
              <div>
                <label className="block text-[0.68rem] tracking-[4px] uppercase text-walnut mb-2 font-heading">
                  {tx(lang, "You're joining from", 'أنت من جهة')}
                </label>
                <div className="flex gap-3">
                  <button type="button" className={attBtnCls(form.side === 'bride')}
                    onClick={() => setForm(f => ({ ...f, side: 'bride' }))}>
                    <span className="block font-semibold">{tx(lang, "Bride's Side", 'جهة العروسة')}</span>
                    <span className="block text-xs opacity-60 mt-0.5">{tx(lang, 'Raghda', 'رغدة')}</span>
                  </button>
                  <button type="button" className={attBtnCls(form.side === 'groom')}
                    onClick={() => setForm(f => ({ ...f, side: 'groom' }))}>
                    <span className="block font-semibold">{tx(lang, "Groom's Side", 'جهة العريس')}</span>
                    <span className="block text-xs opacity-60 mt-0.5">{tx(lang, 'Mahmoud', 'محمود')}</span>
                  </button>
                </div>
              </div>

              {/* Attendance */}
              <div>
                <label className="block text-[0.68rem] tracking-[4px] uppercase text-walnut mb-2 font-heading">
                  {tx(lang, 'Attendance', 'هتيجي إزاي؟')}
                </label>
                <div className="flex gap-3">
                  <button type="button" className={attBtnCls(form.att === 'solo')}
                    onClick={() => setForm(f => ({ ...f, att: 'solo', partySize: '' }))}>
                    <span className="block font-semibold">{tx(lang, 'Just Me', 'لوحدي')}</span>
                  </button>
                  <button type="button" className={attBtnCls(form.att === 'family')}
                    onClick={() => setForm(f => ({ ...f, att: 'family' }))}>
                    <span className="block font-semibold">{tx(lang, 'With Family', 'مع العيلة')}</span>
                  </button>
                </div>

                {form.att === 'family' && (
                  <div className="mt-4">
                    <label className="block text-[0.68rem] tracking-[4px] uppercase text-walnut mb-2 font-heading">
                      {tx(lang, 'Number of guests (including you)', 'عدد الأفراد (انت جوا)')}
                    </label>
                    <input
                      type="number" min="2" max="30"
                      value={form.partySize}
                      onChange={e => setForm(f => ({ ...f, partySize: e.target.value }))}
                      placeholder="e.g. 2"
                      className={inputCls}
                    />
                  </div>
                )}
              </div>

              {error && (
                <p className="text-rose text-sm font-body text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full bg-walnut text-parchment
                  font-heading py-5 tracking-widest uppercase text-sm
                  transition-all duration-300
                  hover:bg-walnut-light hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(28,20,10,0.18)]
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                "
                style={{ fontStyle: lang === 'en' ? 'italic' : 'normal' }}
              >
                {loading
                  ? tx(lang, 'Confirming…', 'جارٍ التأكيد…')
                  : tx(lang, 'Confirm Attendance ✦', 'أكد حضورك ✦')}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
