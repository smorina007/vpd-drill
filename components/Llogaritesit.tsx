'use client'

import { useState } from 'react'
import { FaColumns, FaDraftingCompass, FaLayerGroup, FaWater } from 'react-icons/fa'
import SectionHeading from './ui/SectionHeading'
import LlogaritesMuriL from './LlogaritesMuriL'
import LlogaritesPilota from './LlogaritesPilota'
import LlogaritesKonstruksionPilote from './LlogaritesKonstruksionPilote'
import LlogaritesUji from './LlogaritesUji'

const skedat = [
  { id: 'muri-l', emri: 'Muri L', titulli: 'Llogaritësi i Murit L', icon: FaLayerGroup, C: LlogaritesMuriL },
  { id: 'pilota', emri: 'Pilota', titulli: 'Llogaritësi i Pilotave', icon: FaColumns, C: LlogaritesPilota },
  { id: 'konstr', emri: 'Armatura', titulli: 'Llogaritësi i Konstruksionit të Pilotave', icon: FaDraftingCompass, C: LlogaritesKonstruksionPilote },
  { id: 'uji', emri: 'Uji në pus', titulli: 'Llogaritësi i Vëllimit të Ujit në Pus', icon: FaWater, C: LlogaritesUji },
]

/** Të katër llogaritësit në një panel me skeda (në vend të 4 seksioneve njëri pas tjetrit). */
export default function Llogaritesit() {
  const [aktiv, setAktiv] = useState(skedat[0].id)
  const s = skedat.find((x) => x.id === aktiv)!

  return (
    <section id="llogaritesit" data-shtresa="Llogaritësit" className="bg-stone-2 py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          title="Llogaritësit tanë"
          lede="Kemi 4 kalkulatorë falas — secili ka edhe simulim 3D live që përditësohet ndërsa fut vlerat."
        />

        <div className="overflow-hidden rounded-xl bg-white shadow-[0_1px_0_rgba(14,42,48,0.08),0_24px_60px_-30px_rgba(14,42,48,0.35)] ring-1 ring-stone-line">
          <div role="tablist" aria-label="Llogaritësit" className="no-scrollbar flex overflow-x-auto border-b border-stone-line bg-stone/60">
            {skedat.map((t) => {
              const on = t.id === aktiv
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={on}
                  aria-controls={`panel-${t.id}`}
                  id={`tab-${t.id}`}
                  onClick={() => setAktiv(t.id)}
                  className={`relative flex shrink-0 items-center gap-2 px-5 py-4 text-sm font-semibold transition-colors sm:px-7 ${
                    on ? 'bg-white text-bedrock' : 'text-slate-mute hover:text-bedrock'
                  }`}
                >
                  <t.icon className={on ? 'text-brand' : ''} />
                  {t.emri}
                  {on && <span className="absolute inset-x-0 top-0 h-[3px] bg-signal" />}
                </button>
              )
            })}
          </div>
          <div role="tabpanel" id={`panel-${s.id}`} aria-labelledby={`tab-${s.id}`} className="p-5 sm:p-8 lg:p-10">
            <h3 className="display-md mb-6">{s.titulli}</h3>
            <s.C />
          </div>
        </div>
      </div>
    </section>
  )
}
