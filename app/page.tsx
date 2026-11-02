import Hero from '@/components/Hero'
import Sherbimet from '@/components/Sherbimet'
import SiPunojme from '@/components/SiPunojme'
import ShpimiNeThellesi from '@/components/ShpimiNeThellesi'
import VleresuesiCmimit from '@/components/VleresuesiCmimit'
import Makinerite from '@/components/Makinerite'
import Prodhimi from '@/components/Prodhimi'
import Galeria from '@/components/Galeria'
import MuriIUjit from '@/components/MuriIUjit'
import GrupiVPD from '@/components/GrupiVPD'
import Vleresimet from '@/components/Vleresimet'
import Bashkepunetoret from '@/components/Bashkepunetoret'
import CTA from '@/components/CTA'
import Kontakt from '@/components/Kontakt'
import DepthGauge from '@/components/DepthGauge'

/**
 * Ballina — e përmbledhur: çdo seksion ka një qëllim të vetëm.
 * (Shifrat janë në hyrje; katalogu i plotë është te /produktet; llogaritësit hapen nga
 * "Sa kushton pusi im?" ose menuja "Mjete"; oferta dhe asistenti AI nga butonat lart dhe poshtë.)
 */
export default function Home() {
  return (
    <>
      <DepthGauge />
      <Hero />
      <Sherbimet />
      <SiPunojme />
      <ShpimiNeThellesi />
      <VleresuesiCmimit />
      <Makinerite />
      <Prodhimi />
      <MuriIUjit />
      <Galeria />
      <GrupiVPD />
      <Vleresimet />
      <Bashkepunetoret />
      <CTA />
      <Kontakt />
    </>
  )
}
