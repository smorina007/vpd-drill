import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingAIButton from '@/components/FloatingAIButton'
import BackToTopButton from '@/components/BackToTopButton'
import { OfertaProvider } from '@/app/context/OfertaContext'
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
  manifest: '/site.webmanifest',
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
      </head>
      <body className={`${inter.className} antialiased`}>
        <LoadingScreen />
        
        <OfertaProvider>
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
        </OfertaProvider>
      </body>
    </html>
  )
}