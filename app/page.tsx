import Hero from '@/components/Hero'
import StatistikatVizitoreve from '@/components/StatistikatVizitoreve'
import Sherbimet from '@/components/Sherbimet'
import Makinerite from '@/components/Makinerite'
import Prodhimi from '@/components/Prodhimi'
import Produkte from '@/components/Produkte'
import Llogaritesit from '@/components/Llogaritesit'
import Galeria from '@/components/Galeria'
import Vleresimet from '@/components/Vleresimet'
import FormularOferte from '@/components/FormularOferte'
import AIAsistent from '@/components/AIAsistent'
import CTA from '@/components/CTA'
import Kontakt from '@/components/Kontakt'
import DepthGauge from '@/components/DepthGauge'
import ShpimiNeThellesi from '@/components/ShpimiNeThellesi'
import VleresuesiCmimit from '@/components/VleresuesiCmimit'

export default function Home() {
  return (
    <>
      <DepthGauge />
      <Hero />
      <StatistikatVizitoreve />
      <Sherbimet />
      <ShpimiNeThellesi />
      <VleresuesiCmimit />
      <Makinerite />
      <Prodhimi />
      <Produkte />
      <Llogaritesit />
      <Galeria />
      <Vleresimet />
      <FormularOferte />
      <AIAsistent />
      <CTA />
      <Kontakt />
    </>
  )
}
