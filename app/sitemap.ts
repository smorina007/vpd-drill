import type { MetadataRoute } from 'next'

const BASE_URL = 'https://vpddrill.com'

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
  ]

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }))
}
