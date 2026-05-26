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
  metadataBase: new URL('https://wedding-mahmoud-raghda.vercel.app'),
  title:       'Mahmoud & Raghda — Wedding Invitation',
  description: 'You are invited to celebrate the wedding of Mahmoud and Raghda — June 26, 2026',
  openGraph: {
    title:       'Mahmoud & Raghda — Wedding Invitation',
    description: 'Mahmoud & Raghda — June 26, 2026 · Taracina, Giza',
    type:        'website',
    images: [{ url: '/api/og?lang=en', width: 1200, height: 630, alt: 'Mahmoud & Raghda — Wedding Invitation' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      translate="no"
      className={`${cormorant.variable} ${amiri.variable}`}
    >
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  )
}
