import Hero from '@/components/Hero'
import Sherbimet from '@/components/Sherbimet'
import Makinerite from '@/components/Makinerite'
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
import type { Viewport } from 'next'
import LlogaritesUji from '@/components/LlogaritesUji'


export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#256D7B',
}

export default function Home() {
  return (
    <>
      <Hero />
      
      {/* Statistikat e vjetra janë LARGUAR - nuk shfaqen më në mobile */}
      
      <div className="hidden sm:block">
        <StatistikatVizitoreve />
      </div>
      
      <Sherbimet />
      <Makinerite />
      <Prodhimi />
      <Produkte />
      
      {/* Llogaritësit me më pak hapësirë në mobile */}
      <div className="space-y-3 sm:space-y-6">
        <LlogaritesMuriL />
        <LlogaritesPilota />
        <LlogaritesKonstruksionPilote />
        <LlogaritesUji />
      </div>
      
      <Galeria />
      <Vleresimet />
      
      {/* Formular i thjeshtuar në mobile */}
      <div className="block sm:hidden">
        <div className="text-center py-2 bg-[#256D7B] text-white text-sm">
          <a href="/kontakti">Kliko për ofertë të shpejtë →</a>
        </div>
      </div>
      
      <div className="hidden sm:block">
        <FormularOferte />
      </div>
      
      {/* AI Asistent */}
      <div className="sm:hidden">
        <AIAsistent />
      </div>
      
      <div className="hidden sm:block">
        <AIAsistent />
      </div>
      
      <CTA />
      <Kontakt />
    </>
  )
}