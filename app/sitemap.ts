import type { MetadataRoute } from 'next'
import fs from 'node:fs'
import path from 'node:path'
import { SITE_URL } from '@/lib/site'
import { mediaTeReja } from '@/lib/galeriaMedia'

/** Të gjitha fotot e një dosjeje në /public (për sitemap-in e imazheve). */
function fotot(dosja: string): string[] {
  const rrenja = path.join(process.cwd(), 'public', dosja)
  try {
    return fs
      .readdirSync(rrenja, { recursive: true, withFileTypes: false })
      .map(String)
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .map((f) => `${SITE_URL}/${dosja}/${f.split(path.sep).join('/')}`)
  } catch {
    return []
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/kontakti',
    '/produktet',
    '/projektet',
    '/sherbimet',
    '/sherbimet/ankera',
    '/sherbimet/germim-diafragme',
    '/sherbimet/pilota',
    '/sherbimet/shpime-puse',
    '/pyetje-te-shpeshta',
    '/politika-e-privatesise',
  ]

  const videot = mediaTeReja
    .filter((m) => m.lloji === 'video')
    .map((m) => ({
      title: `${m.titulli} — VPD DRILL`,
      description: `${m.titulli}. Video nga kantieri i VPD DRILL — ${m.kategoria.toLowerCase()} në Kosovë.`,
      thumbnail_loc: `${SITE_URL}${m.poster}`,
      content_loc: `${SITE_URL}${m.src}`,
    }))

  const shtesa: Record<string, Partial<MetadataRoute.Sitemap[number]>> = {
    '': { images: [`${SITE_URL}/images/og-image.jpg`, ...fotot('images/hero')] },
    '/projektet': { images: fotot('images/galeria'), videos: videot },
    '/produktet': { images: fotot('images/produktet') },
    '/sherbimet/germim-diafragme': { images: fotot('images/galeria/diafragme'), videos: videot },
  }

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/projektet' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/politika-e-privatesise' ? 0.3 : 0.7,
    ...shtesa[route],
  }))
}
