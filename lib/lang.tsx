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
    const saved = localStorage.getItem('lang') as Lang | null
    if (saved === 'en' || saved === 'ar') {
      setLangState(saved)
      setReady(true)
    }
    // if nothing saved, ready stays false → splash shows
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
