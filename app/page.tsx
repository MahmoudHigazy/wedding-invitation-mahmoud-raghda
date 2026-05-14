import { LangToggle }  from '@/components/LangToggle'
import { Particles }   from '@/components/Particles'
import { Hero }        from '@/components/Hero'
import { Divider }     from '@/components/Divider'
import { Details }     from '@/components/Details'
import { RsvpSection } from '@/components/RsvpSection'
import { Footer }      from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Particles />
      <LangToggle />
      <main>
        <Hero />
        <Divider />
        <Details />
        <Divider />
        <RsvpSection />
      </main>
      <Footer />
    </>
  )
}
