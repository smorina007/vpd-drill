'use client'

import { useState, useEffect } from 'react'

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-40 bg-white text-[#256D7B] w-10 h-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-[#256D7B]/20 hidden md:flex items-center justify-center"
      aria-label="Back to top"
    >
      ↑
    </button>
  )
}