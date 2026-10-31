'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/** Video pa zë që luan vetëm kur del në ekran dhe ngarkohet vetëm kur i afrohesh. */
export default function VideoNePamje({ src, poster, className = '' }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const reduce = useReducedMotion()
  useEffect(() => {
    const v = ref.current
    if (!v || reduce) return
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), {
      threshold: 0.25,
    })
    io.observe(v)
    return () => io.disconnect()
  }, [reduce])
  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload="none" aria-hidden="true" className={className} />
}
