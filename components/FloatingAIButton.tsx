'use client'

import { useEffect, useState } from 'react'
import { FaRobot } from 'react-icons/fa'
import { useMjete } from '@/app/context/MjeteContext'

export default function FloatingAIButton() {
  const { hap } = useMjete()
  const [showTooltip, setShowTooltip] = useState(false)

  // Tregon ftesën vetëm një herë, pak pas ngarkimit, dhe e fsheh pas 5 sekondash
  useEffect(() => {
    const a = setTimeout(() => setShowTooltip(true), 2500)
    const b = setTimeout(() => setShowTooltip(false), 7500)
    return () => {
      clearTimeout(a)
      clearTimeout(b)
    }
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-3 sm:bottom-6 sm:right-6">
      <span
        className={`pointer-events-none hidden rounded-md bg-bedrock px-3 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 sm:block ${
          showTooltip ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
        }`}
      >
        Pyet Asistentin AI! 🤖
      </span>
      <button
        type="button"
        onClick={() => {
          setShowTooltip(false)
          hap('ai')
        }}
        aria-label="Asistenti AI"
        className="relative grid h-14 w-14 place-items-center rounded-full bg-bedrock text-xl text-glacier shadow-[0_10px_30px_-8px_rgba(14,42,48,0.7)] ring-1 ring-white/10 transition-transform hover:scale-105 active:scale-95"
      >
        <FaRobot />
        <span className="absolute right-0.5 top-0.5 h-3 w-3 rounded-full border-2 border-bedrock bg-emerald-400" />
      </button>
    </div>
  )
}
