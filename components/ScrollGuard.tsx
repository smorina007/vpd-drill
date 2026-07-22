'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollGuard() {
  const pathname = usePathname()

  useEffect(() => {
    // 1. Çaktivizo restaurimin e scroll-it nga browseri
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    // 2. Forco pozicionin në krye menjëherë
    window.scrollTo(0, 0)

    // 3. Blloko çdo përpjekje për të lëvizur gjatë 300ms të para
    const handleScroll = () => {
      if (window.scrollY !== 0) {
        window.scrollTo(0, 0)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: false })
    
    const timer = setTimeout(() => {
      window.removeEventListener('scroll', handleScroll)
    }, 300)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [pathname])

  return null
}