import Galeria from '@/components/Galeria'
import PageHeroBanner from '@/components/PageHeroBanner'
import ShowreelButon from '@/components/ShowreelButon'
import { FaYoutube } from 'react-icons/fa'
import { YOUTUBE_URL } from '@/lib/site'
import { FaImages } from 'react-icons/fa'
import { BIZNESI_ID, QYTETET_E_PUNES, SITE_URL } from '@/lib/site'
import { mediaTeReja, teGjithaMediat } from '@/lib/galeriaMedia'

/** Përmbajtja e faqes /projektet (edhe për /projektet/<id>, që hap direkt një foto/video). */
export default function FaqjaProjekteve({ hapId }: { hapId?: string }) {
  const nrVideo = teGjithaMediat.filter((m) => m.lloji === 'video').length
  const nrFoto = teGjithaMediat.length - nrVideo
  const shifrat = [
    ['100+', 'projekte të realizuara'],
    [String(QYTETET_E_PUNES.length), 'qytete anembanë Kosovës'],
    [String(nrFoto), 'foto nga kantieri'],
    [String(nrVideo), 'video nga punimet'],
  ]

  const galeriaLd = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Projektet e VPD DRILL — foto dhe video nga kantieri',
    url: `${SITE_URL}/projektet`,
    author: { '@id': BIZNESI_ID },
    associatedMedia: mediaTeReja.map((m) =>
      m.lloji === 'video'
        ? { '@type': 'VideoObject', name: m.titulli, description: `${m.titulli} — ${m.kategoria}`, contentUrl: `${SITE_URL}${m.src}`, thumbnailUrl: `${SITE_URL}${m.poster}`, uploadDate: '2026-10-31' }
        : { '@type': 'ImageObject', name: m.titulli, contentUrl: `${SITE_URL}${m.src}`, caption: `${m.titulli} — ${m.kategoria}` },
    ),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(galeriaLd) }} />
      <PageHeroBanner
        icon={FaImages}
        title="Projektet Tona"
        subtitle="Foto dhe video reale nga kantieret tona — pilota, ankera, gërmime me diafragmë, puse dhe mure L anembanë Kosovës."
        crumbs={[{ label: 'Ballina', href: '/' }, { label: 'Projektet' }]}
        image="/images/galeria/diafragme/d7.jpg"
      >
        <div className="flex flex-wrap items-center gap-3">
          <ShowreelButon />
          <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost-light px-6 py-3">
            <FaYoutube className="text-[#FF4E45]" /> Kanali në YouTube
          </a>
        </div>
      </PageHeroBanner>
      <div className="border-b border-stone-line bg-white">
        <dl className="shell grid grid-cols-2 lg:grid-cols-4">
          {shifrat.map(([v, l], k) => (
            <div key={l} className={`py-7 ${k % 2 === 1 ? 'border-l border-stone-line pl-5 sm:pl-8' : ''} ${k >= 2 ? 'border-t border-stone-line lg:border-t-0' : ''} ${k > 0 ? 'lg:border-l lg:pl-8' : ''}`}>
              <dt className="sr-only">{l}</dt>
              <dd className="text-3xl font-extrabold font-xwide tabular text-bedrock sm:text-4xl">{v}</dd>
              <dd className="mt-1 text-sm text-slate-mute">{l}</dd>
            </div>
          ))}
        </dl>
      </div>
      <Galeria showHeading={false} hapId={hapId} />
    </>
  )
}
