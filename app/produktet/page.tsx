import Produkte from '@/components/Produkte'
import PageHeroBanner from '@/components/PageHeroBanner'
import KatalogLiber from '@/components/KatalogLiber'
import { FaCube } from 'react-icons/fa'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Produkte Betoni: Muri L, Gypa Betoni, Pllaka, Kosha Armature',
  description:
    'Katalog i plotë produktesh betoni dhe hekuri për ndërtim dhe puse: Muri L, gypa betoni dhe plastikë, pllaka betoni, gypa hekuri, kosha armature dhe sajla. Prodhim dhe furnizim në Kosovë.',
  keywords: 'muri l, gypa betoni, pllaka betoni, gypa per puse, kosha armature, hekur ndertimi, sajla, produkte betoni Kosove, concrete products Kosovo, rebar cages',
  alternates: { canonical: '/produktet' },
  openGraph: {
    title: 'Katalogu i Produkteve — VPD DRILL',
    description: 'Shfletoni katalogun: Muri L, gypa betoni, pllaka, gypa për puse, kosha armature dhe më shumë.',
    url: '/produktet',
    images: [{ url: '/images/katalogu/kopertina.jpg' }],
  },
}

export default function ProduktetPage() {
  return (
    <>
      <PageHeroBanner
        icon={FaCube}
        title="Katalogu i Produkteve"
        subtitle="Shfletojeni si libër — Muri L, gypa betoni, pllaka, gypa për puse, kosha armature dhe më shumë. Kërkoni ofertë direkt nga faqja e produktit."
        crumbs={[{ label: 'Ballina', href: '/' }, { label: 'Produktet' }]}
        image="/images/katalogu/kopertina.jpg"
      />

      {/* Libri */}
      <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_50%_35%,#1C4750_0%,#0E2A30_55%,#081a1e_100%)] py-12 sm:py-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'repeating-linear-gradient(90deg,#fff 0 1px,transparent 1px 120px),repeating-linear-gradient(0deg,#fff 0 1px,transparent 1px 120px)' }}
          aria-hidden="true"
        />
        <div className="shell relative">
          <KatalogLiber />
        </div>
      </section>

      {/* Lista me kërkim — për kush do të gjejë shpejt një artikull */}
      <section className="bg-stone pt-16 sm:pt-20">
        <div className="shell">
          <h2 className="display-md">Të gjitha produktet</h2>
          <p className="mt-2 text-slate-mute">Kërkoni sipas emrit ose filtroni sipas kategorisë.</p>
        </div>
      </section>
      <Produkte showHeading={false} />
    </>
  )
}
