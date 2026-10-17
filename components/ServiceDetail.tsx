import Link from 'next/link'
import { ReactNode } from 'react'
import { IconType } from 'react-icons'
import { FaArrowRight } from 'react-icons/fa'
import PageHeroBanner from './PageHeroBanner'

type Pike = { icon: IconType; titulli: string; pershkrimi: string }

export type ServiceDetailProps = {
  titulli: string
  hyrja: string
  image?: string
  h2: string
  paragrafi: string
  listaTitulli: string
  lista: Pike[]
  /** Seksion shtesë (p.sh. "Procesi i punës", "Aplikimet", "Makineritë") */
  shtese?: { titulli: string; content: ReactNode }[]
  /** Kutia anësore */
  sidebarTitulli: string
  sidebarTeksti?: string
  specs: { icon: IconType; text: string }[]
  /** Butoni i dytë në kutinë anësore (si parazgjedhje: Shiko projektet) */
  veprimiDyte?: ReactNode
}

/** Paraqitja e përbashkët e faqeve të shërbimeve (shpime, pilota, ankera, diafragmë). */
export default function ServiceDetail(p: ServiceDetailProps) {
  return (
    <>
      <PageHeroBanner
        title={p.titulli}
        subtitle={p.hyrja}
        image={p.image}
        crumbs={[{ label: 'Ballina', href: '/' }, { label: 'Shërbimet', href: '/sherbimet' }, { label: p.titulli }]}
      />

      <section className="bg-white py-16 sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-20">
          <div>
            <h2 className="display-md">{p.h2}</h2>
            <p className="mt-5 max-w-[68ch] text-[17px] leading-relaxed text-slate-ink">{p.paragrafi}</p>

            <h3 className="mt-14 text-xl font-bold">{p.listaTitulli}</h3>
            <ul className="mt-5 grid gap-px overflow-hidden rounded-lg bg-stone-line ring-1 ring-stone-line sm:grid-cols-2">
              {p.lista.map((l) => (
                <li key={l.titulli} className="bg-white p-5 sm:p-6">
                  <l.icon className="text-xl text-brand" />
                  <h4 className="mt-3 text-[17px] font-bold">{l.titulli}</h4>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-ink">{l.pershkrimi}</p>
                </li>
              ))}
            </ul>

            {p.shtese?.map((s) => (
              <div key={s.titulli} className="mt-14">
                <h3 className="text-xl font-bold">{s.titulli}</h3>
                <div className="mt-5">{s.content}</div>
              </div>
            ))}
          </div>

          <aside className="lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:self-start">
            <div className="overflow-hidden rounded-xl bg-bedrock text-white">
              <div className="p-6">
                <h3 className="text-lg font-bold text-white">{p.sidebarTitulli}</h3>
                {p.sidebarTeksti && <p className="mt-2 text-sm leading-relaxed text-white/70">{p.sidebarTeksti}</p>}
                <ul className="mt-5 divide-y divide-white/10 border-y border-white/10">
                  {p.specs.map((s) => (
                    <li key={s.text} className="flex items-center gap-3 py-3 text-sm">
                      <s.icon className="shrink-0 text-glacier" />
                      {s.text}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 grid gap-2">
                  <Link href="/kontakti" className="btn-signal w-full">
                    Kërko ofertë <FaArrowRight className="text-xs" />
                  </Link>
                  {p.veprimiDyte ?? (
                    <Link href="/projektet" className="btn-ghost-light w-full">
                      Shiko projektet
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

/** Listë me hapa të numëruar (për procese që janë vërtet sekuencë). */
export function ListeHapash({ hapat }: { hapat: string[] }) {
  return (
    <ol className="border-l-2 border-stone-line">
      {hapat.map((h, i) => (
        <li key={h} className="relative py-2.5 pl-8 text-[15px] text-bedrock">
          <span className="absolute -left-[11px] top-3 grid h-5 w-5 place-items-center rounded-full bg-bedrock text-[10px] font-bold text-white tabular">
            {i + 1}
          </span>
          {h}
        </li>
      ))}
    </ol>
  )
}

export function ListeThjeshte({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {items.map((it) => (
        <li key={it} className="flex gap-3 text-[15px] text-bedrock">
          <span className="mt-[10px] h-[2px] w-3 shrink-0 bg-signal" />
          {it}
        </li>
      ))}
    </ul>
  )
}
