'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

export type Lang = 'en' | 'ar'

interface LangCtx {
  lang:   Lang
  toggle: () => void
}

const Ctx = createContext<LangCtx>({ lang: 'en', toggle: () => {} })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')

  // Sync html[lang] and html[dir] on every change
  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  return (
    <Ctx.Provider value={{ lang, toggle: () => setLang(l => l === 'en' ? 'ar' : 'en') }}>
      {children}
    </Ctx.Provider>
  )
}

export function useLang() {
  return useContext(Ctx)
}

/** Inline bilingual helper — picks the right string based on current lang. */
export function tx(lang: Lang, en: string, ar: string): string {
  return lang === 'en' ? en : ar
}
