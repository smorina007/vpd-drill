import Link from 'next/link'
import PageHeroBanner from '@/components/PageHeroBanner'
import { FaShieldAlt } from 'react-icons/fa'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Politika e Privatësisë',
  description: 'Si i mbledhim, përdorim dhe mbrojmë të dhënat tuaja personale kur vizitoni ose kontaktoni VPD DRILL.',
  alternates: { canonical: '/politika-e-privatesise' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#256D7B',
}

export default function PolitikaPrivatesisePage() {
  return (
    <>
      <PageHeroBanner
        icon={FaShieldAlt}
        title="Politika e Privatësisë"
        subtitle="Si i trajtojmë të dhënat tuaja personale kur përdorni faqen ose na kontaktoni."
        crumbs={[{ label: 'Ballina', href: '/' }, { label: 'Politika e Privatësisë' }]}
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-gray-700 leading-relaxed [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-2 [&_a]:text-[#256D7B] [&_a]:font-medium [&_a]:hover:underline">
          <p className="text-sm text-gray-400">Përditësuar së fundmi: Korrik 2026</p>

          <h2>1. Kush jemi</h2>
          <p>
            VPD DRILL ("ne", "tona") operon faqen <strong>vpddrill.com</strong>. Kjo faqe shpjegon
            çfarë të dhënash personale mbledhim, pse i mbledhim, dhe si i mbrojmë, kur vizitoni
            faqen tonë ose na kontaktoni përmes formularëve.
          </p>

          <h2>2. Çfarë të dhënash mbledhim</h2>
          <ul>
            <li>
              <strong>Të dhëna që na jepni vetë</strong>: emër, email, numër telefoni, lokacioni
              i projektit dhe përmbajtja e mesazhit — kur plotësoni formularin e kontaktit,
              formularin e ofertës, ose lini një vlerësim.
            </li>
            <li>
              <strong>Të dhëna përdorimi (automatike)</strong>: faqet që vizitoni, pajisja dhe
              shfletuesi juaj, koha e vizitës — përmes Google Analytics, për të kuptuar si
              përdoret faqja dhe për ta përmirësuar atë.
            </li>
          </ul>

          <h2>3. Si i përdorim të dhënat tuaja</h2>
          <ul>
            <li>Për t'ju kontaktuar në lidhje me kërkesën/ofertën tuaj</li>
            <li>Për të përmirësuar shërbimet dhe përmbajtjen e faqes</li>
            <li>Për të kuptuar statistika të përgjithshme përdorimi (Google Analytics)</li>
          </ul>
          <p>
            <strong>S'i shesim dhe s'i ndajmë</strong> të dhënat tuaja personale me palë të treta
            për qëllime marketingu.
          </p>

          <h2>4. Shërbime të palëve të treta</h2>
          <p>Për funksionimin e faqes, përdorim këto shërbime të palëve të treta:</p>
          <ul>
            <li>
              <strong>EmailJS</strong> — për të dërguar mesazhet e formularëve direkt te email-i
              ynë, pa i ruajtur ato në ndonjë bazë të dhënash tonën.
            </li>
            <li>
              <strong>Google Analytics</strong> — për statistika anonime vizitorësh (përdor
              "cookies").
            </li>
            <li>
              <strong>Open-Meteo</strong> — për shfaqjen e motit aktual, pa dërguar të dhëna
              personale.
            </li>
          </ul>

          <h2>5. Sa kohë i ruajmë të dhënat</h2>
          <p>
            Mesazhet e dërguara përmes formularëve mbërrijnë direkt në email-in tonë të biznesit
            dhe ruhen aq sa nevojitet për t'iu përgjigjur kërkesës suaj. Të dhënat e Google
            Analytics ruhen sipas politikave standarde të Google (zakonisht 14 muaj).
          </p>

          <h2>6. Të drejtat tuaja</h2>
          <p>Keni të drejtë të kërkoni:</p>
          <ul>
            <li>Të dini çfarë të dhënash kemi për ju</li>
            <li>Korrigjim ose fshirje të të dhënave tuaja</li>
            <li>Të kundërshtoni përdorimin e të dhënave tuaja për qëllime të caktuara</li>
          </ul>
          <p>
            Për çdo kërkesë lidhur me të dhënat tuaja, na kontaktoni te{' '}
            <a href="mailto:info@vllezeritpaqarizi.com">info@vllezeritpaqarizi.com</a> ose në
            telefon 044 184 114.
          </p>

          <h2>7. Cookies</h2>
          <p>
            Faqja përdor "cookies" bazë (kryesisht nga Google Analytics) për të mbledhur
            statistika anonime. Mund t'i çaktivizoni cookies nga cilësimet e shfletuesit tuaj,
            megjithëse kjo mund të ndikojë disa funksione të faqes.
          </p>

          <h2>8. Ndryshime në këtë politikë</h2>
          <p>
            Mund ta përditësojmë këtë politikë herë pas here. Ndryshimet do të publikohen në këtë
            faqe me datën e përditësimit të fundit.
          </p>

          <h2>9. Na kontaktoni</h2>
          <p>
            Për pyetje rreth kësaj politike, na shkruani te{' '}
            <a href="mailto:info@vllezeritpaqarizi.com">info@vllezeritpaqarizi.com</a> ose vizitoni{' '}
            <Link href="/kontakti">faqen e kontaktit</Link>.
          </p>
        </div>
      </section>
    </>
  )
}
