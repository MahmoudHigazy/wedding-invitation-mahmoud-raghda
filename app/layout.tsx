import type { Metadata } from 'next'
import { Cormorant_Garamond, Amiri } from 'next/font/google'
import './globals.css'
import { LangProvider } from '@/lib/lang'

const cormorant = Cormorant_Garamond({
  subsets:  ['latin'],
  weight:   ['300', '400', '500', '600'],
  style:    ['normal', 'italic'],
  variable: '--font-cormorant',
  display:  'swap',
})

const amiri = Amiri({
  subsets:  ['arabic', 'latin'],
  weight:   ['400', '700'],
  style:    ['normal', 'italic'],
  variable: '--font-amiri',
  display:  'swap',
})

export const metadata: Metadata = {
  title:       'Mahmoud & Raghda — Wedding Invitation',
  description: 'You are cordially invited to celebrate the wedding of Mahmoud and Raghda — June 26, 2026',
  openGraph: {
    title:       'Mahmoud & Raghda — Wedding Invitation',
    description: 'Join us as we begin forever — June 26, 2026',
    type:        'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${cormorant.variable} ${amiri.variable}`}
    >
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  )
}
