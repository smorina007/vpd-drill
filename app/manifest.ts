import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'VPD DRILL - Shpime dhe Produkte Betoni',
    short_name: 'VPD DRILL',
    description: 'Ekspertizë e thellë, themele të sigurta. Specialiste në shpime puse uji, pilota, ankera dhe produkte betoni.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#256D7B',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}