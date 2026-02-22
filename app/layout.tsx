import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingAIButton from '@/components/FloatingAIButton'
import BackToTopButton from '@/components/BackToTopButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VPD DRILL - Shpime, Pilota, Ankera dhe Produkte Betoni',
  description: 'Ekspertizë e thellë, themele të sigurta. Specialiste në shpime puse uji deri 500m, pilota për objekte, ankera stabilizues, germim me diafragmë, prodhim betoni dhe produkte për puse.',
  keywords: 'shpime puse uji, pilota per objekte, ankera, germim diafragme, muri l, gypa betoni, pllaka betoni, gypa per puse, sajla, casagrande, mait, xcmg, kosove, malisheve',
  authors: [{ name: 'VPD DRILL' }],
  creator: 'VPD DRILL',
  publisher: 'VPD DRILL',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'VPD DRILL - Ekspertizë Gjeoteknike',
    description: 'Specialiste në shpime puse uji, pilota, ankera dhe produkte betoni',
    url: 'https://vpddrill.com',
    siteName: 'VPD DRILL',
    locale: 'sq_AL',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sq">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#256D7B" />
      </head>
      <body className={inter.className}>
        {/* Skip to main content for accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#256D7B] text-white px-4 py-2 rounded-md z-[100]">
          Skip to main content
        </a>

        {/* Header */}
        <Header />

        {/* Main Content */}
        <main id="main-content" className="min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating AI Assistant Button */}
        <FloatingAIButton />

        {/* Back to top button (Client Component) */}
        <BackToTopButton />
      </body>
    </html>
  )
}