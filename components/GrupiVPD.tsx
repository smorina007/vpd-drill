'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FaGasPump, FaCarSide, FaHandSparkles, FaUtensils, FaShoppingBasket, FaChild } from 'react-icons/fa'
import Lightbox from './ui/Lightbox'

const FOTOT = [
  { src: '/images/vpd-oil/o5.jpg', titulli: 'VPD Center natën — restorant, market dhe kënd lojërash', cls: 'col-span-2 row-span-2' },
  { src: '/images/vpd-oil/o1.jpg', titulli: 'Pika e karburantit VPD OIL', cls: '' },
  { src: '/images/vpd-oil/o3.jpg', titulli: 'Larja automatike e veturave', cls: '' },
  { src: '/images/vpd-oil/o4.jpg', titulli: 'Self-service — larje me vetëshërbim', cls: '' },
  { src: '/images/vpd-oil/o6.jpg', titulli: 'VPD OIL ditën dhe natën', cls: '' },
  { src: '/images/vpd-oil/o2.jpg', titulli: 'VPD OIL dhe VPD Center buzë rrugës', cls: '' },
]

const SHERBIMET = [
  { icon: FaGasPump, t: 'Karburant' },
  { icon: FaCarSide, t: 'Larje automatike' },
  { icon: FaHandSparkles, t: 'Self-service larje' },
  { icon: FaUtensils, t: 'Restorant' },
  { icon: FaShoppingBasket, t: 'Market' },
  { icon: FaChild, t: 'Kënd lojërash' },
]

/** "Familja VPD" — VPD OIL dhe VPD Center, pjesë e të njëjtit grup me VPD DRILL. */
export default function GrupiVPD() {
  const [hapur, setHapur] = useState<number | null>(null)

  return (
    <section id="grupi-vpd" data-shtresa="Grupi VPD" className="relative overflow-hidden bg-bedrock py-20 text-white sm:py-28">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-brand/25 blur-[120px]" aria-hidden="true" />
      <div className="shell relative grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
        <div>
          <p className="flex items-center gap-3 text-sm font-semibold text-glacier">
            <span className="h-px w-10 bg-signal" /> Familja VPD
          </p>
          <h2 className="display-lg mt-4 text-white">VPD OIL &amp; VPD Center</h2>
          <p className="mt-5 max-w-[52ch] text-[17px] leading-relaxed text-white/70">
            Përveç shpimeve, themeleve dhe produkteve të betonit, familja VPD operon edhe pikën e karburantit
            <strong className="font-semibold text-white"> VPD OIL</strong> dhe <strong className="font-semibold text-white">VPD Center</strong> — një
            ndalesë e plotë për ju dhe veturën tuaj.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {SHERBIMET.map((s) => (
              <li key={s.t} className="flex items-center gap-3 rounded-lg bg-white/[0.06] px-3.5 py-3 text-sm font-semibold ring-1 ring-white/10">
                <s.icon className="shrink-0 text-glacier" />
                {s.t}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid auto-rows-[120px] grid-cols-3 gap-3 sm:auto-rows-[150px]">
          {FOTOT.map((f, i) => (
            <button
              key={f.src}
              type="button"
              onClick={() => setHapur(i)}
              data-kursor="Shiko"
              aria-label={`Hap foton: ${f.titulli}`}
              className={`group relative overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10 ${f.cls}`}
            >
              <Image
                src={f.src}
                alt={f.titulli}
                fill
                sizes={i === 0 ? '(max-width: 1024px) 66vw, 40vw' : '(max-width: 1024px) 33vw, 20vw'}
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        items={FOTOT.map((f) => ({ src: f.src, title: f.titulli, meta: 'VPD OIL · VPD Center' }))}
        index={hapur}
        onClose={() => setHapur(null)}
        onIndex={setHapur}
      />
    </section>
  )
}
