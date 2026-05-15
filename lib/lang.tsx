'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

export type Lang = 'en' | 'ar'

interface LangCtx {
  lang:    Lang
  setLang: (l: Lang) => void
  toggle:  () => void
  ready:   boolean
}

const Ctx = createContext<LangCtx>({ lang: 'en', setLang: () => {}, toggle: () => {}, ready: false })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang,  setLangState] = useState<Lang>('en')
  const [ready, setReady]     = useState(false)

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get('lang') as Lang | null
    const saved = localStorage.getItem('lang') as Lang | null
    const lang  = (param === 'en' || param === 'ar') ? param : saved
    if (lang) {
      setLangState(lang)
      localStorage.setItem('lang', lang)
      setReady(true)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  function setLang(l: Lang) {
    setLangState(l)
    localStorage.setItem('lang', l)
    setReady(true)
  }

  return (
    <Ctx.Provider value={{ lang, setLang, toggle: () => setLang(lang === 'en' ? 'ar' : 'en'), ready }}>
      {children}
    </Ctx.Provider>
  )
}

export function useLang() {
  return useContext(Ctx)
}

export function tx(lang: Lang, en: string, ar: string): string {
  return lang === 'en' ? en : ar
}
