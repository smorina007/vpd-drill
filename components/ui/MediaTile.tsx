'use client'

import { type PointerEvent, type ReactNode, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { FaPlay } from 'react-icons/fa'

type Props = {
  src: string
  poster?: string
  type?: 'foto' | 'video'
  title: string
  badge?: string
  sizes: string
  className?: string
  /** Vonesa e animacionit të shfaqjes (sekonda). */
  delay?: number
  onOpen: () => void
  children?: ReactNode
  /** true kur pllaka duhet të mbushë lartësinë e prindit (rrjeta masonry). */
  fill?: boolean
}

/**
 * Pllaka e një fotoje/videoje në rrjetë: shfaqet me një "perde" që hapet
 * nga poshtë kur del në ekran, anon pak sipas maus-it dhe — për videot —
 * luan një parapamje pa zë kur kalon maus-i sipër.
 */
export default function MediaTile({ src, poster, type = 'foto', title, badge, sizes, className = '', delay = 0, onOpen, children, fill = false }: Props) {
  const ref = useRef<HTMLButtonElement>(null)
  const vid = useRef<HTMLVideoElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hover, setHover] = useState(false)
  const isVideo = type === 'video'
  // Vëzhgojmë mbështjellësin (pa clip-path) që shfaqja të ndizet me siguri edhe në celular.
  const wrap = useRef<HTMLDivElement>(null)
  const shown = useInView(wrap, { once: true, amount: 0.1 })
  const reduce = useReducedMotion()

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * -6, y: ((e.clientX - r.left) / r.width - 0.5) * 6 })
  }

  const enter = () => {
    setHover(true)
    if (isVideo && vid.current) {
      vid.current.currentTime = 0
      vid.current.play().catch(() => {})
    }
  }
  const leave = () => {
    setHover(false)
    setTilt({ x: 0, y: 0 })
    vid.current?.pause()
  }

  return (
    <div ref={wrap} className={`${fill ? 'h-full ' : ''}[perspective:900px]`}>
    <motion.div
      initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0% round 8px)', y: 24 }}
      animate={shown || reduce ? { clipPath: 'inset(0% 0% 0% 0% round 8px)', y: 0 } : undefined}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={fill ? 'h-full' : undefined}
    >
      <motion.button
        ref={ref}
        type="button"
        data-kursor={isVideo ? 'Luaj' : 'Shiko'}
        onClick={onOpen}
        onPointerMove={onMove}
        onPointerEnter={enter}
        onPointerLeave={leave}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        className={`group relative block w-full cursor-zoom-in overflow-hidden rounded-lg bg-stone-2 ${className}`}
        aria-label={`${isVideo ? 'Luaj videon' : 'Hap foton'}: ${title}`}
      >
        <Image
          src={isVideo ? poster ?? src : src}
          alt={title}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]"
        />

        {isVideo && (
          <video
            ref={vid}
            src={hover ? src : undefined}
            muted
            loop
            playsInline
            preload="none"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${hover ? 'opacity-100' : 'opacity-0'}`}
          />
        )}

        {/* Shkëlqim që kalon mbi foto */}
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {badge && (
          <span className="absolute left-3 top-3 rounded bg-bedrock/85 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur">
            {badge}
          </span>
        )}

        {isVideo && (
          <span
            className={`absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 pl-1 text-lg text-bedrock shadow-lg transition-all duration-500 ${
              hover ? 'scale-75 opacity-0' : 'scale-100 opacity-100'
            }`}
          >
            <FaPlay />
          </span>
        )}
        {isVideo && (
          <span className="absolute right-3 top-3 rounded bg-signal px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-bedrock">
            Video
          </span>
        )}
        {children}
      </motion.button>
    </motion.div>
    </div>
  )
}
