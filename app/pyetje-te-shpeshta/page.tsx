import PageHeroBanner from '@/components/PageHeroBanner'
import { FaQuestionCircle } from 'react-icons/fa'
import Link from 'next/link'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Pyetje të Shpeshta — Shpim Pusesh, Pilota, Çmime',
  description:
    'Përgjigje për pyetjet më të shpeshta rreth shpimit të puseve të ujit, pilotave, ankerave dhe çmimeve në Kosovë.',
  alternates: { canonical: '/pyetje-te-shpeshta' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#256D7B',
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

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="space-y-4">
            {pyetjet.map((p, i) => (
              <details
                key={i}
                className="group bg-gray-50 rounded-xl border border-gray-100 open:border-[#256D7B]/30 open:bg-[#256D7B]/5 transition-colors"
              >
                <summary className="cursor-pointer select-none px-5 py-4 font-semibold text-gray-900 flex items-center justify-between gap-3">
                  {p.q}
                  <span className="text-[#256D7B] group-open:rotate-45 transition-transform text-xl flex-shrink-0">+</span>
                </summary>
                <p className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{p.a}</p>
              </details>
            ))}
          </div>

          <div className="text-center mt-12 bg-gray-50 rounded-2xl p-8">
            <p className="text-gray-600 mb-4">S'e gjete përgjigjen që kërkoje?</p>
            <Link
              href="/kontakti"
              className="inline-flex items-center gap-2 bg-[#256D7B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1a4f5a] transition"
            >
              Na kontakto direkt
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
