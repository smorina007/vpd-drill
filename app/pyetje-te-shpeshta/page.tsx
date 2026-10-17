import PageHeroBanner from '@/components/PageHeroBanner'
import { FaQuestionCircle } from 'react-icons/fa'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pyetje të Shpeshta — Shpim Pusesh, Pilota, Çmime',
  description:
    'Përgjigje për pyetjet më të shpeshta rreth shpimit të puseve të ujit, pilotave, ankerave dhe çmimeve në Kosovë.',
  alternates: { canonical: '/pyetje-te-shpeshta' },
}


const pyetjet = [
  {
    q: 'Sa kushton shpimi i një pusi uji?',
    a: 'Çmimi varet nga thellësia, diametri dhe lloji i terrenit (i fortë/shkëmbor apo i butë). Përdorni kalkulatorin tonë të ujit në faqe për një vlerësim fillestar, ose kërkoni ofertë të personalizuar falas përmes formularit të kontaktit.',
  },
  {
    q: 'Sa thellë mund të shpojmë një pus?',
    a: 'Deri në 500 metra në terrene të forta (shkëmbore), dhe deri në 55 metra diametër në terrene të buta (argjilë, rërë), varësisht nga kushtet gjeologjike të lokacionit.',
  },
  {
    q: 'Sa kohë zgjat shpimi i një pusi?',
    a: 'Kohëzgjatja varet nga thellësia dhe lloji i terrenit — një pus standard zakonisht përfundon brenda disa ditësh pune. Ju japim një afat të saktë pas vlerësimit fillestar në terren.',
  },
  {
    q: 'Çfarë është metoda CFA për pilota?',
    a: 'CFA (Continuous Flight Auger) është një metodë shpimi e vazhdueshme për pilota themeli, ku betoni injektohet ndërsa vidhi hiqet — duke lejuar konstruksion të shpejtë dhe të sigurt për themele objektesh.',
  },
  {
    q: 'Në cilat zona të Kosovës operoni?',
    a: 'Operojmë anembanë Kosovës — nga baza jonë në Malishevë, me projekte të realizuara në Prishtinë dhe qytete të tjera. Shihni disa prej tyre te faqja e Projekteve.',
  },
  {
    q: 'A ofroni sondazhe/vlerësim gjeologjik para punës?',
    a: 'Po, para çdo shpimi bëjmë vlerësim të terrenit për të përcaktuar thellësinë, diametrin dhe metodën optimale — kjo ju kursen kohë dhe kosto të panevojshme.',
  },
  {
    q: 'Si mund të kërkoj ofertë?',
    a: 'Plotësoni formularin "Kërko Ofertë" në faqe (nga çdo faqe, ikona lart), ose na kontaktoni direkt në telefon 044 184 114 / 044 204 877. Ju përgjigjemi brenda 24 orëve.',
  },
]

export default function PyetjeTeShpeshtaPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pyetjet.map((p) => ({
      '@type': 'Question',
      name: p.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: p.a,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeroBanner
        icon={FaQuestionCircle}
        title="Pyetje të Shpeshta"
        subtitle="Përgjigje të shpejta për pyetjet më të zakonshme rreth shërbimeve tona."
        crumbs={[{ label: 'Ballina', href: '/' }, { label: 'Pyetje të Shpeshta' }]}
      />

      <section className="bg-white py-16 sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-20">
          <div className="border-b border-stone-line">
            {pyetjet.map((p, i) => (
              <details key={i} className="group border-t border-stone-line" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-lg font-bold text-bedrock marker:hidden [&::-webkit-details-marker]:hidden">
                  {p.q}
                  <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-stone text-brand transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="max-w-[68ch] pb-7 text-[16px] leading-relaxed text-slate-ink">{p.a}</p>
              </details>
            ))}
          </div>

          <aside className="lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:self-start">
            <div className="rounded-xl bg-stone p-6">
              <p className="text-lg font-bold text-bedrock">S&apos;e gjete përgjigjen që kërkoje?</p>
              <Link href="/kontakti" className="btn-brand mt-5 w-full">
                Na kontakto direkt
              </Link>
              <a href="tel:+38344184114" className="btn-ghost mt-2 w-full tabular">
                044 184 114
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
