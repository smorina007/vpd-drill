'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

/**
 * Ekrani hyrës — shfaqet vetëm një herë për session (tab).
 * Rregullime: (1) renderohet që nga serveri, kështu faqja nuk "kërcen" më
 * (më parë faqja shfaqej, pastaj mbulohej papritur); një skript i vogël në
 * layout e fsheh menjëherë nëse është parë më parë. (2) Audio shkarkohet vetëm
 * nëse vizitori klikon "Aktivizo zërin" (më parë 837KB shkarkoheshin gjithmonë).
 */
const LOADING_DURATION_MS = 1700
const SESSION_KEY = 'vpd-drill-loading-shown'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    let shown = false
    try {
      shown = sessionStorage.getItem(SESSION_KEY) === '1'
    } catch {}
    if (shown || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsLoading(false)
      try {
        sessionStorage.setItem(SESSION_KEY, '1')
      } catch {}
      return
    }

    document.body.style.overflow = 'hidden'
    const start = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / LOADING_DURATION_MS)
      setProgress(Math.round((1 - Math.pow(1 - p, 2)) * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const timer = setTimeout(() => {
      setIsLoading(false)
      document.body.style.overflow = ''
      try {
        sessionStorage.setItem(SESSION_KEY, '1')
      } catch {}
      audioRef.current?.pause()
    }, LOADING_DURATION_MS + 150)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timer)
      document.body.style.overflow = ''
      audioRef.current?.pause()
    }
  }, [])

  const toggleAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/sounds/impact.mp3')
      audioRef.current.volume = 0.3
      audioRef.current.loop = true
    }
    if (audioPlaying) {
      audioRef.current.pause()
      setAudioPlaying(false)
    } else {
      audioRef.current
        .play()
        .then(() => setAudioPlaying(true))
        .catch(() => {})
    }
  }

  const thellesia = Math.round((progress / 100) * 500)

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          id="intro-vpd"
          key="loading"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-bedrock text-white"
          aria-hidden="true"
        >
          <button
            type="button"
            onClick={toggleAudio}
            className="absolute right-4 top-4 rounded-md border border-white/20 px-3.5 py-2 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10"
          >
            {audioPlaying ? (
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> Zëri aktiv
              </span>
            ) : (
              <>🔊 Aktivizo zërin</>
            )}
          </button>

          <div className="flex items-center gap-8 sm:gap-12">
            {/* Shpimi: shirit vertikal që zbret deri në 500 m */}
            <div className="relative h-56 w-[3px] rounded-full bg-white/10 sm:h-72">
              <div className="absolute inset-x-0 top-0 rounded-full bg-signal" style={{ height: `${progress}%` }} />
              <div className="absolute -left-[5px] h-[13px] w-[13px] rounded-sm bg-signal" style={{ top: `calc(${progress}% - 6px)` }} />
              {[0, 1, 2, 3, 4, 5].map((k) => (
                <span key={k} className="absolute -left-3 h-px w-2 bg-white/30" style={{ top: `${k * 20}%` }} />
              ))}
            </div>

            <div>
              <div className="mb-6 h-24 w-24 sm:h-28 sm:w-28">
                <Image src="/images/logo1.png" alt="VPD DRILL Logo" width={112} height={112} className="h-full w-full object-contain" priority />
              </div>
              <p className="display-xl leading-[0.9] text-white">VPD</p>
              <p className="display-lg text-glacier">DRILL</p>
              <p className="mt-4 text-base text-white/70 sm:text-lg">Duke shpuar thellësitë e tokës</p>
              <p className="mt-8 flex items-baseline gap-3 text-sm text-white/50">
                <span className="text-3xl font-extrabold font-xwide tabular text-white">−{thellesia} m</span>
                <span className="tabular">{progress}%</span>
              </p>
              <p className="mt-2 text-[11px] font-semibold tracking-[0.18em] text-white/40">DUKE NGARKUAR SISTEMET</p>
            </div>
          </div>

          <div className="absolute bottom-6 left-0 right-0 flex flex-wrap justify-center gap-x-6 gap-y-1 px-4 text-xs text-white/40">
            <span>⚡ 500m -Teren i fortë</span>
            <span>💧 55m -Teren i but</span>
            <span>⛰️ 10+ MAKINERI</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
