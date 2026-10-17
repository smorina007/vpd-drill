import Image from 'next/image'
import { FaCog, FaTruck, FaHammer, FaCubes, FaArrowsAltV, FaAward, FaShieldAlt } from 'react-icons/fa'
import { GiCrane } from 'react-icons/gi'
import SectionHeading from './ui/SectionHeading'

const makinerite = [
  { kategoria: 'Makina Shpimi Casagrande', icon: FaCog, items: ['4 x Casagrande (makina të ndryshme)', 'Mait 100', 'Mait 120'] },
  { kategoria: 'Makina Shpimi MDT dhe XCMG', icon: FaHammer, items: ['3 x MDT', 'XCMG makinë shpimi'] },
  { kategoria: 'Puntell dhe Eskavatorë', icon: FaTruck, items: ['2 x Puntell', 'Eskavatorë të ndryshëm'] },
  { kategoria: 'Gërmim me Diafragmë', icon: FaCubes, items: ['Bauer MC 32 — deri mbi 50m thellësi'] },
  { kategoria: 'Krane dhe Ngritës', icon: GiCrane, items: ['XCMG kran i peshave të rënda', 'Krane të tjera ndihmëse'] },
]

const bauerSpecs = [
  { icon: FaArrowsAltV, value: '50m+', label: 'Thellësi gërmimi' },
  { icon: FaShieldAlt, value: 'Bauer', label: 'Prodhues gjerman' },
  { icon: FaAward, value: '1-of-a-kind', label: 'Në treg' },
]

export default function Makinerite() {
  return (
    <section id="makinerite" data-shtresa="Makineritë" className="bg-bedrock-2 py-20 text-white sm:py-28">
      <div className="shell">
        <SectionHeading tone="dark" title="Makineritë tona" lede="Flotë e pasur me makineri të specializuara për çdo lloj pune" />

        {/* Makineria kryesuese — Bauer MC 32 */}
        <article className="grid overflow-hidden rounded-xl bg-bedrock ring-1 ring-white/10 lg:grid-cols-2">
          <div className="relative min-h-[300px] sm:min-h-[420px]">
            <Image
              src="/images/makinerite/bauer-mc32.jpg"
              alt="Bauer MC 32 — makineri gërmimi me diafragmë deri mbi 50m thellësi"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded bg-signal px-3 py-1.5 text-xs font-bold text-bedrock sm:left-6 sm:top-6">
              <FaAward /> RISI NË TREG
            </span>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
            <p className="text-sm font-semibold text-glacier">Bauer MC 32 · Gjermani</p>
            <h3 className="display-md mt-2 text-white">Gërmim me Diafragmë deri mbi 50 Metra Thellësi</h3>
            <p className="mt-5 text-[15px] leading-relaxed text-white/70">
              VPD DRILL sjell në Kosovë Bauer MC 32 — një nga ndër të paktat makineri të këtij lloji në treg, e
              specializuar për gërmim precize me diafragmë (mure nëntokësore) në thellësi që shumica e kompanive vendase
              s&apos;i ofrojnë. Teknologji gjermane e nivelit botëror, e ndërtuar për projekte ku çdo centimetër
              precizioni dhe siguria e strukturave fqinje kanë rëndësi kritike.
            </p>
            <dl className="mt-8 grid grid-cols-3 border-y border-white/10">
              {bauerSpecs.map((s, k) => (
                <div key={s.label} className={`py-4 ${k > 0 ? 'border-l border-white/10 pl-4' : 'pr-4'}`}>
                  <s.icon className="mb-2 text-glacier" />
                  <dd className="text-lg font-bold font-wide text-white sm:text-2xl">{s.value}</dd>
                  <dt className="mt-0.5 text-xs text-white/55">{s.label}</dt>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm leading-relaxed text-white/60">
              <strong className="text-white/85">Ideale për:</strong> parkingje nëntokësore, themele pranë ndërtesave
              ekzistuese, mure mbajtëse për projekte urbane komplekse, dhe çdo situatë ku metodat tradicionale të
              gërmimit rrezikojnë strukturat fqinje.
            </p>
          </div>
        </article>

        {/* Flota — si tabelë specifikimesh */}
        <dl className="mt-14 border-b border-white/15">
          {makinerite.map((k) => (
            <div key={k.kategoria} className="grid gap-3 border-t border-white/15 py-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] sm:gap-10">
              <dt className="flex items-center gap-3 text-lg font-bold font-wide text-white">
                <k.icon className="shrink-0 text-glacier" />
                {k.kategoria}
              </dt>
              <dd className="flex flex-wrap gap-2 sm:items-center">
                {k.items.map((it) => (
                  <span key={it} className="rounded border border-white/15 px-3 py-1.5 text-sm text-white/85">
                    {it}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
