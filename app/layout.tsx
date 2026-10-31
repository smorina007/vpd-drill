import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ButoniKontaktit from '@/components/ButoniKontaktit'
import BackToTopButton from '@/components/BackToTopButton'
import { OfertaProvider } from '@/app/context/OfertaContext'
import { WeatherProvider } from '@/app/context/WeatherContext'
import { MjeteProvider } from '@/app/context/MjeteContext'
import KursoriShiko from '@/components/KursoriShiko'
import { BIZNESI_ID, FACEBOOK_URL, GOOGLE_PROFILE_URL, QYTETET_E_PUNES, SITE_URL } from '@/lib/site'

// Archivo (variabël: pesha 100–900, gjerësia 62–125%) — e ngarkuar lokalisht,
// pa varësi nga Google Fonts gjatë build-it. Licenca: app/fonts/OFL-Archivo.txt
const archivo = localFont({
  src: './fonts/archivo-latin-standard-normal.woff2',
  variable: '--font-archivo',
  weight: '100 900',
  display: 'swap',
  declarations: [{ prop: 'font-stretch', value: '62% 125%' }],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://vpddrill.com'),
  title: {
    default: 'VPD DRILL - Shpime Puse Uji, Pilota dhe Produkte Betoni në Kosovë',
    template: '%s | VPD DRILL'
  },
  description: 'Ekspertizë e thellë, themele të sigurta. Specialiste në shpime puse uji deri 500m, pilota për objekte, ankera stabilizues, germim me diafragmë dhe produkte betoni në Kosovë.',
  keywords: 'shpime puse uji, shpim bunari, pilota, ankera, germim diafragme, mur diafragme, muri l, gypa betoni, pllaka betoni, gypa per puse, sajla, casagrande, mait, xcmg, kosove, malisheve, prishtine, prizren, peje, gjakove, ferizaj, gjilan, mitrovice, vllezerit paqarizi',
  authors: [{ name: 'VPD DRILL', url: 'https://vpddrill.com' }],
  creator: 'VPD DRILL',
  publisher: 'VPD DRILL',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'VPD DRILL - Ekspertizë Gjeoteknike',
    description: 'Specialiste në shpime puse uji, pilota, ankera dhe produkte betoni në Kosovë',
    url: 'https://vpddrill.com',
    siteName: 'VPD DRILL',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VPD DRILL - Makineri shpimi Casagrande në punë',
      },
    ],
    locale: 'sq_AL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VPD DRILL - Shpime dhe Produkte Betoni',
    description: 'Ekspertizë e thellë, themele të sigurta',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
  // Kodi i Google Search Console: vendoseni te Vercel → Settings → Environment Variables
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  alternates: {
    canonical: 'https://vpddrill.com',
    languages: {
      sq: 'https://vpddrill.com',
      de: 'https://vpddrill.com/de',
      en: 'https://vpddrill.com/en',
      'x-default': 'https://vpddrill.com',
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0E2A30',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sq" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'GeneralContractor',
              '@id': BIZNESI_ID,
              name: 'VPD DRILL',
              alternateName: ['VPD DRILL SHPK', 'Vëllezërit Paqarizi', 'Vllezerit Paqarizi'],
              image: `${SITE_URL}/images/og-image.jpg`,
              logo: `${SITE_URL}/images/logo1.png`,
              url: SITE_URL,
              telephone: ['+38344184114', '+38344204877', '+38345700201'],
              email: 'info@vllezeritpaqarizi.com',
              hasMap: GOOGLE_PROFILE_URL,
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                  opens: '07:00',
                  closes: '19:00',
                },
              ],
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Fsh Dragobil',
                addressLocality: 'Malishevë',
                postalCode: '24000',
                addressCountry: 'XK',
              },
              areaServed: [
                { '@type': 'Country', name: 'Kosovë' },
                ...QYTETET_E_PUNES.map((q) => ({ '@type': 'City', name: q })),
              ],
              knowsAbout: ['Shpim pusesh uji', 'Pilota CFA', 'Ankera', 'Gërmim me diafragmë', 'Mure L', 'Gypa betoni', 'Pllaka betoni'],
              sameAs: [
                GOOGLE_PROFILE_URL,
                FACEBOOK_URL,
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Shërbimet dhe Produktet',
                itemListElement: [
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Shpim Pusesh Uji (Water Well Drilling)' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pilota për Objekte (Piling Foundations)' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Ankera dhe Stabilizim (Ground Anchors)' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Germim me Diafragmë (Diaphragm Wall Excavation)' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Gypa Betoni dhe Muri L (Concrete Pipes & L-Walls)' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Kosha Armature dhe Hekur (Rebar Cages & Steel)' } },
                ],
              },
              description:
                'Ekspertizë e thellë, themele të sigurta. Specialistë në shpime puse uji deri 500m, pilota për objekte, ankera stabilizues, germim me diafragmë dhe produkte betoni në Kosovë.',
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': `${SITE_URL}/#website`,
              url: SITE_URL,
              name: 'VPD DRILL',
              inLanguage: 'sq',
              publisher: { '@id': BIZNESI_ID },
            }),
          }}
        />
      </head>
      <body className={`${archivo.variable} font-sans`}>
        <OfertaProvider>
        <WeatherProvider>
        <MjeteProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-md focus:bg-bedrock focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
          >
            Kalo te përmbajtja
          </a>

          <Header />

          <main id="main-content" tabIndex={-1} className="outline-none">
            {children}
          </main>

          <Footer />

          <ButoniKontaktit />
          <BackToTopButton />
          <KursoriShiko />

          {/* Google Analytics */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-TJJ6MKWXBL"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TJJ6MKWXBL');
            `}
          </Script>
        </MjeteProvider>
        </WeatherProvider>
        </OfertaProvider>
      </body>
    </html>
  )
}