import Hero from '@/components/Hero'
import Sherbimet from '@/components/Sherbimet'
import Makinerite from '@/components/Makinerite'  // Shto këtë
import Prodhimi from '@/components/Prodhimi'
import Produkte from '@/components/Produkte'
import Galeria from '@/components/Galeria'
import Vleresimet from '@/components/Vleresimet'
import FormularOferte from '@/components/FormularOferte'
import LlogaritesMuriL from '@/components/LlogaritesMuriL'
import LlogaritesPilota from '@/components/LlogaritesPilota'
import LlogaritesKonstruksionPilote from '@/components/LlogaritesKonstruksionPilote'
import AIAsistent from '@/components/AIAsistent'
import StatistikatVizitoreve from '@/components/StatistikatVizitoreve'
import CTA from '@/components/CTA'
import Kontakt from '@/components/Kontakt'

export default function Home() {
  return (
    <>
      <Hero />
      <StatistikatVizitoreve />
      <Sherbimet />
      <Makinerite />        {/* Shto këtu pas shërbimeve */}
      <Prodhimi />
      <Produkte />
      <LlogaritesMuriL />
      <LlogaritesPilota />
      <LlogaritesKonstruksionPilote />
      <Galeria />
      <Vleresimet />
      <FormularOferte />
      <AIAsistent />
      <CTA />
      <Kontakt />
    </>
  )
}