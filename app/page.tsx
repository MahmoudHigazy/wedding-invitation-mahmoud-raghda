import type { Metadata } from 'next'
import { Suspense } from 'react'
import { HomeClient } from '@/components/HomeClient'

interface Props {
  searchParams: { lang?: string }
}

export function generateMetadata({ searchParams }: Props): Metadata {
  const lang = searchParams.lang === 'ar' ? 'ar' : 'en'
  return {
    openGraph: {
      title:       'Mahmoud & Raghda — Wedding Invitation',
      description: lang === 'ar'
        ? 'محمود ورغدة بيعزموكم على فرحهم — ٢٦ يونيو ٢٠٢٦'
        : 'Join us as we begin forever — June 26, 2026',
      images: [{ url: `/api/og?lang=${lang}&v=2`, width: 1200, height: 630 }],
    },
  }
}

export default function Home() {
  return <Suspense><HomeClient /></Suspense>
}
