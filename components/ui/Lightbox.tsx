'use client'

import { type MouseEvent, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
import Shperndaj from './Shperndaj'
import { FaChevronLeft, FaChevronRight, FaTimes, FaPlay, FaPause, FaSearchPlus, FaSearchMinus } from 'react-icons/fa'

export type LightboxItem = {
  src: string
  title: string
  meta?: ReactNode
  /** 'video' luan videon; parazgjedhja është 'foto'. */
  type?: 'foto' | 'video'
  poster?: string
  /** Nëse jepet, shfaqet butoni "Shpërndaj" për këtë foto/video */
  shareUrl?: string
}

type Props = {
  items: LightboxItem[]
  index: number | null
  onClose: () => void
  onIndex: (i: number) => void
}

const KOHA_SLIDESHOW = 4500

/*
 * Efekti i kalimit: fotoja e re hyn nga ana me një rrotullim të lehtë 3D,
 * zmadhim dhe turbullim që zbehet — si një faqe që kthehet. Drejtimi ndjek
 * shigjetën / rrëshqitjen e gishtit.
 */
const variants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? '38%' : '-38%',
    rotateY: dir >= 0 ? -28 : 28,
    scale: 0.82,
    opacity: 0,
    filter: 'blur(10px)',
  }),
  center: { x: 0, rotateY: 0, scale: 1, opacity: 1, filter: 'blur(0px)' },
  exit: (dir: number) => ({
    x: dir >= 0 ? '-30%' : '30%',
    rotateY: dir >= 0 ? 24 : -24,
    scale: 0.86,
    opacity: 0,
    filter: 'blur(8px)',
  }),
}

/** Shikuesi i fotove/videove në ekran të plotë — Esc mbyll, ← → ndërrojnë, Hapësira nis/ndal shfaqjen. */
export default function Lightbox({ items, index, onClose, onIndex }: Props) {
  const open = index !== null && index >= 0 && index < items.length
  const item = open ? items[index!] : null
  const isVideo = item?.type === 'video'

  const [dir, setDir] = useState(1)
  const [playing, setPlaying] = useState(false)
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null)
  const thumbsRef = useRef<HTMLDivElement>(null)

  const go = useCallback(
    (delta: number) => {
      if (!open || items.length < 2) return
      setDir(delta)
      setZoom(null)
      onIndex((index! + delta + items.length) % items.length)
    },
    [open, index, items.length, onIndex],
  )

  const jump = (i: number) => {
    if (i === index) return
    setDir(i > index! ? 1 : -1)
    setZoom(null)
    onIndex(i)
  }

  // Tastiera + bllokimi i scroll-it
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === ' ' && !isVideo) {
        e.preventDefault()
        setPlaying((p) => !p)
      }
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, go, onClose, isVideo])

  // Ndal shfaqjen kur mbyllet
  useEffect(() => {
    if (!open) {
      setPlaying(false)
      setZoom(null)
    }
  }, [open])

  // Shfaqja automatike (vetëm për fotot; videot kalojnë kur mbarojnë)
  useEffect(() => {
    if (!open || !playing || isVideo || zoom) return
    const t = window.setTimeout(() => go(1), KOHA_SLIDESHOW)
    return () => window.clearTimeout(t)
  }, [open, playing, isVideo, zoom, index, go])

  // Mbaj miniaturën aktive në pamje
  useEffect(() => {
    if (!open) return
    const el = thumbsRef.current?.querySelector<HTMLElement>(`[data-i="${index}"]`)
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [open, index])

  // Parangarko fotot fqinje që kalimi të jetë i menjëhershëm
  useEffect(() => {
    if (!open || items.length < 2) return
    ;[1, -1].forEach((d) => {
      const n = items[(index! + d + items.length) % items.length]
      if (n.type !== 'video') {
        const img = new window.Image()
        img.src = `/_next/image?url=${encodeURIComponent(n.src)}&w=1920&q=75`
      }
    })
  }, [open, index, items])

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const power = info.offset.x + info.velocity.x * 0.2
    if (power < -80) go(1)
    else if (power > 80) go(-1)
  }

  const toggleZoom = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (isVideo) return
    if (zoom) return setZoom(null)
    const r = e.currentTarget.getBoundingClientRect()
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
    setPlaying(false)
  }

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          className="fixed inset-0 z-[90] flex flex-col overflow-hidden bg-bedrock/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Sfond i turbullt me ngjyrat e fotos aktuale */}
          <AnimatePresence initial={false}>
            <motion.div
              key={'bg' + item.src}
              className="pointer-events-none absolute inset-0 -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src={isVideo ? item.poster ?? item.src : item.src}
                alt=""
                fill
                sizes="64px"
                className="scale-110 object-cover blur-3xl saturate-150"
              />
            </motion.div>
          </AnimatePresence>

          {/* Shiriti i progresit të shfaqjes */}
          {playing && !isVideo && !zoom && (
            <motion.div
              key={'bar' + index}
              className="absolute left-0 top-0 h-[3px] bg-signal"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: KOHA_SLIDESHOW / 1000, ease: 'linear' }}
            />
          )}

          <div className="flex items-center justify-between gap-2 px-4 py-3 text-white sm:px-6">
            <span className="text-sm font-semibold tabular text-white/70">
              {index! + 1} / {items.length}
            </span>
            <div className="flex items-center gap-1">
              {item.shareUrl && <Shperndaj url={item.shareUrl} titulli={item.title} tema="dark" drejtimi="poshte" />}
              {!isVideo && (
                <button
                  type="button"
                  onClick={() => (zoom ? setZoom(null) : setZoom({ x: 50, y: 50 }))}
                  aria-label={zoom ? 'Zvogëlo' : 'Zmadho'}
                  className="grid h-11 w-11 place-items-center rounded-md text-lg hover:bg-white/10"
                >
                  {zoom ? <FaSearchMinus /> : <FaSearchPlus />}
                </button>
              )}
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => setPlaying((p) => !p)}
                  aria-label={playing ? 'Ndal shfaqjen' : 'Nis shfaqjen automatike'}
                  aria-pressed={playing}
                  className={`grid h-11 w-11 place-items-center rounded-md text-base hover:bg-white/10 ${playing ? 'text-signal' : ''}`}
                >
                  {playing ? <FaPause /> : <FaPlay />}
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Mbyll"
                className="grid h-11 w-11 place-items-center rounded-md text-xl hover:bg-white/10"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          <div className="relative flex-1 [perspective:1600px]" onClick={onClose}>
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={item.src + index}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 260, damping: 30, mass: 0.9 }}
                drag={items.length > 1 && !zoom ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={onDragEnd}
                className="absolute inset-0 flex items-center justify-center px-4 [transform-style:preserve-3d] sm:px-20"
              >
                {isVideo ? (
                  <video
                    key={item.src}
                    src={item.src}
                    poster={item.poster}
                    controls
                    autoPlay
                    playsInline
                    preload="metadata"
                    onEnded={() => playing && go(1)}
                    onClick={(e) => e.stopPropagation()}
                    className="max-h-full max-w-full rounded-lg bg-black shadow-2xl shadow-black/50"
                  />
                ) : (
                  <div
                    className={`relative h-full w-full overflow-hidden ${zoom ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                    onClick={toggleZoom}
                    onMouseMove={(e) => {
                      if (!zoom) return
                      const r = e.currentTarget.getBoundingClientRect()
                      setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
                    }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      style={{ transformOrigin: zoom ? `${zoom.x}% ${zoom.y}%` : '50% 50%' }}
                      animate={{ scale: zoom ? 2.2 : playing ? 1.08 : 1 }}
                      transition={
                        zoom
                          ? { type: 'spring', stiffness: 200, damping: 28 }
                          : { duration: playing ? KOHA_SLIDESHOW / 1000 + 0.6 : 0.4, ease: 'easeOut' }
                      }
                    >
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        sizes="100vw"
                        draggable={false}
                        className="select-none object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
                        priority
                      />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    go(-1)
                  }}
                  aria-label="E mëparshmja"
                  className="absolute left-2 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:scale-110 hover:bg-white/20 sm:left-5"
                >
                  <FaChevronLeft />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    go(1)
                  }}
                  aria-label="Tjetra"
                  className="absolute right-2 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:scale-110 hover:bg-white/20 sm:right-5"
                >
                  <FaChevronRight />
                </button>
              </>
            )}
          </div>

          <div className="px-4 pt-4 text-center text-white sm:px-6">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={'cap' + index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <p className="font-semibold">{item.title}</p>
                {item.meta && <div className="mt-1 text-sm text-white/60">{item.meta}</div>}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Miniaturat */}
          {items.length > 1 && (
            <div
              ref={thumbsRef}
              className="no-scrollbar mx-auto mt-3 flex max-w-full gap-2 overflow-x-auto px-4 pb-5 sm:px-6"
            >
              {items.map((it, i) => {
                const on = i === index
                return (
                  <button
                    key={it.src + i}
                    data-i={i}
                    type="button"
                    onClick={() => jump(i)}
                    aria-label={`Shko te: ${it.title}`}
                    aria-current={on}
                    className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-md transition-all duration-300 sm:h-14 sm:w-20 ${
                      on ? 'opacity-100 ring-2 ring-signal ring-offset-2 ring-offset-bedrock' : 'opacity-45 hover:opacity-90'
                    }`}
                  >
                    <Image
                      src={it.type === 'video' ? it.poster ?? it.src : it.src}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                    {it.type === 'video' && (
                      <span className="absolute inset-0 grid place-items-center bg-black/30 text-[10px] text-white">
                        <FaPlay />
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
