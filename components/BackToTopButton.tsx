'use client'

import { useEffect, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa'

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        setIsVisible(window.scrollY > 600)
        const h = document.documentElement.scrollHeight - window.innerHeight
        setProgress(h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const radius = 20
  const c = 2 * Math.PI * radius

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={`Kthehu lart — ${Math.round(progress)}% e faqes u shfletua`}
      tabIndex={isVisible ? 0 : -1}
      className={`fixed bottom-4 left-4 z-40 grid h-12 w-12 place-items-center rounded-full bg-white text-bedrock shadow-[0_10px_30px_-10px_rgba(14,42,48,0.5)] transition-all duration-300 hover:text-brand sm:bottom-6 sm:left-6 ${
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r={radius} fill="none" stroke="#E7ECEB" strokeWidth="2.5" />
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="#256D7B"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (progress / 100) * c}
        />
      </svg>
      <FaArrowUp className="relative text-sm" />
    </button>
  )
}
