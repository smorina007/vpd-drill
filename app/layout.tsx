import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingAIButton from '@/components/FloatingAIButton'
import BackToTopButton from '@/components/BackToTopButton'
import { OfertaProvider } from '@/app/context/OfertaContext'
import { WeatherProvider } from '@/app/context/WeatherContext'
import ScrollGuard from '@/components/ScrollGuard'
import LoadingScreen from '@/components/LoadingScreen'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'VPD DRILL - Shpime Puse Uji, Pilota dhe Produkte Betoni në Kosovë',
    template: '%s | VPD DRILL'
  },
  description: 'Ekspertizë e thellë, themele të sigurta. Specialiste në shpime puse uji deri 500m, pilota për objekte, ankera stabilizues, germim me diafragmë dhe produkte betoni në Kosovë.',
  keywords: 'shpime puse uji, pilota, ankera, germim diafragme, muri l, gypa betoni, pllaka betoni, gypa per puse, sajla, casagrande, mait, xcmg, kosove, malisheve',
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
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
  alternates: {
    canonical: 'https://vpddrill.com',
    languages: {
      'sq-AL': 'https://vpddrill.com',
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#256D7B',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sq">
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'GeneralContractor',
              name: 'VPD DRILL',
              image: 'https://vpddrill.com/images/og-image.jpg',
              url: 'https://vpddrill.com',
              telephone: ['+383044184114', '+383044204877'],
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Fsh Dragobil',
                addressLocality: 'Malishevë',
                postalCode: '24000',
                addressCountry: 'XK',
              },
              areaServed: 'Kosovë',
              description:
                'Ekspertizë e thellë, themele të sigurta. Specialistë në shpime puse uji deri 500m, pilota për objekte, ankera stabilizues, germim me diafragmë dhe produkte betoni në Kosovë.',
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <LoadingScreen />
        
        <OfertaProvider>
        <WeatherProvider>
          <ScrollGuard />
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 bg-[#256D7B] text-white px-3 py-2 rounded-md z-[100] text-sm">
            Skip to content
          </a>

          <Header />
          
          <main id="main-content" className="min-h-screen">
            {children}
          </main>

          <Footer />

          <FloatingAIButton />
          <BackToTopButton />

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
        </WeatherProvider>
        </OfertaProvider>
      </body>
    </html>
  )
}