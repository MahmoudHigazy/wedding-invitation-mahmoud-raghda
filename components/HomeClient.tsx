'use client'

import { useSearchParams }  from 'next/navigation'
import { useLang }          from '@/lib/lang'
import { SplashScreen }     from '@/components/SplashScreen'
import { LangToggle }       from '@/components/LangToggle'
import { Particles }        from '@/components/Particles'
import { Hero }             from '@/components/Hero'
import { Divider }          from '@/components/Divider'
import { Details }          from '@/components/Details'
import { RsvpSection }      from '@/components/RsvpSection'
import { Footer }           from '@/components/Footer'

export function HomeClient() {
  const { ready } = useLang()
  const params    = useSearchParams()
  const infoOnly  = params.get('info') === '1'

  if (!ready) return <SplashScreen />

  return (
    <>
      <Particles />
      <LangToggle />
      <main>
        <Hero />
        <Divider />
        <Details />
        {!infoOnly && (
          <>
            <Divider />
            <RsvpSection />
          </>
        )}
      </main>
      <Footer />
    </>
  )
}
