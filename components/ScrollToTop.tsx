'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Parandalo scroll restoration automatik
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    
    // Kthehu në krye të faqes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // 'smooth' për animacion, 'instant' për menjëherë
    })
  }, [pathname]) // Ekzekutohet sa herë ndryshon rruga

  return null
}