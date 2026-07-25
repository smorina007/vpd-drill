// Ndihmës i vogël për të dërguar ngjarje (events) te Google Analytics 4 —
// përdoret për të gjurmuar konvertime reale (dërgim formulari, klikim telefoni),
// jo vetëm shikime faqesh.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params)
  }
}
