const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/vpddrill\.com\/.*$/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'pages',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
      },
    },
    {
      urlPattern: /\.(jpg|jpeg|png|gif|svg|ico|webp)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 24 * 60 * 60,
        },
      },
    },
    {
      urlPattern: /\.(css|js)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
      },
    },
  ],
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Komento për PWA (service workers nuk punojnë me export)
  // Optimizimi i imazheve (resize/format automatik, lazy-load) tani është AKTIV.
  // U çaktivizua më parë (ndoshta për një export statik të vjetër), gjë që
  // dëmtonte performancën/Lighthouse-in pa asnjë përfitim real me SSR+PWA.
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  turbopack: {}, // Shtohet për të shmangur gabimet
}

module.exports = withPWA(nextConfig)