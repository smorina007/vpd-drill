'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FaBars, FaTimes, FaCloudSun, FaRobot, FaStar, FaImages, FaWater,
  FaLayerGroup, FaColumns, FaDraftingCompass, FaMapMarkerAlt, FaChevronDown, FaPhoneAlt, FaFileAlt,
} from 'react-icons/fa'
import { useOferta } from '@/app/context/OfertaContext'
import { useWeather } from '@/app/context/WeatherContext'
import { useMjete, Mjet } from '@/app/context/MjeteContext'
import { trackEvent } from '@/lib/gtag'

const navLinks = [
  { href: '/', label: 'Ballina' },
  { href: '/sherbimet', label: 'Shërbimet' },
  { href: '/produktet', label: 'Produktet' },
  { href: '/projektet', label: 'Projektet' },
  { href: '/kontakti', label: 'Kontakti' },
]

const grupetMjeteve: { titulli: string; items: { id: Mjet; label: string; icon: React.ComponentType<{ className?: string }> }[] }[] = [
  {
    titulli: 'Llogaritësit',
    items: [
      { id: 'muriL', label: 'Muri L', icon: FaLayerGroup },
      { id: 'pilota', label: 'Pilota', icon: FaColumns },
      { id: 'konstruksion', label: 'Konstr.', icon: FaDraftingCompass },
      { id: 'uji', label: 'Uji', icon: FaWater },
    ],
  },
  {
    titulli: 'Më shumë',
    items: [
      { id: 'ai', label: 'Asistenti AI', icon: FaRobot },
      { id: 'galeria', label: 'Galeria', icon: FaImages },
      { id: 'vleresime', label: 'Vlerëso', icon: FaStar },
      { id: 'naGjeni', label: 'Si të na gjeni', icon: FaMapMarkerAlt },
      { id: 'moti', label: 'Moti 5D', icon: FaCloudSun },
    ],
  },
]

export default function Header() {
  const pathname = usePathname()
  const { openOferta } = useOferta()
  const { hap } = useMjete()
  const { weather, loading: weatherLoading } = useWeather()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)
  const toolsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mbyll menutë kur ndryshon faqja
  useEffect(() => {
    setMobileOpen(false)
    setToolsOpen(false)
  }, [pathname])

  // Mbyll dropdown-in "Mjete" me klikim jashtë ose Esc
  useEffect(() => {
    if (!toolsOpen) return
    const onDown = (e: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) setToolsOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setToolsOpen(false)
    document.addEventListener('mousedown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [toolsOpen])

  // Bllokon scroll-in e faqes kur menuja e celularit është e hapur
  useEffect(() => {
    if (!mobileOpen) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [mobileOpen])

  // Nëse jemi tashmë në ballinë, Link s'bën asgjë — e kthejmë manualisht në krye.
  const handleHomeClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const solid = scrolled || mobileOpen
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  const hapMjet = (m: Mjet) => {
    setToolsOpen(false)
    setMobileOpen(false)
    hap(m)
  }

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300 ${
        solid ? 'bg-white/95 text-bedrock shadow-[0_1px_0_rgba(14,42,48,0.1)] backdrop-blur-md' : 'bg-gradient-to-b from-bedrock/70 to-transparent text-white'
      }`}
    >
      <div className="shell flex h-[var(--header-h)] items-center gap-6">
        {/* Logo */}
        <Link href="/" onClick={handleHomeClick} className="flex shrink-0 items-center gap-2.5" aria-label="VPD DRILL — Ballina">
          <span className="grid h-11 w-11 place-items-center rounded-md bg-white p-1 shadow-sm">
            <Image src="/images/logo.png" alt="" width={40} height={40} className="h-auto w-full object-contain" priority />
          </span>
          <span className="text-[19px] font-extrabold leading-none font-xwide tracking-tight sm:text-[21px]">
            VPD <span className={solid ? 'text-brand' : 'text-glacier'}>DRILL</span>
          </span>
        </Link>

        {/* Navigimi (desktop) */}
        <nav aria-label="Navigimi kryesor" className="ml-4 hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={l.href === '/' ? handleHomeClick : undefined}
              aria-current={isActive(l.href) ? 'page' : undefined}
              className={`relative rounded-md px-3 py-2 text-[15px] font-semibold transition-colors ${
                solid ? 'hover:bg-stone' : 'hover:bg-white/10'
              } ${isActive(l.href) ? '' : solid ? 'text-slate-ink' : 'text-white/80'}`}
            >
              {l.label}
              {isActive(l.href) && <span className="absolute inset-x-3 -bottom-[3px] h-[2px] bg-signal" />}
            </Link>
          ))}

          {/* Mjete */}
          <div ref={toolsRef} className="relative">
            <button
              type="button"
              aria-expanded={toolsOpen}
              aria-haspopup="true"
              onClick={() => setToolsOpen((v) => !v)}
              className={`flex items-center gap-1.5 rounded-md px-3 py-2 text-[15px] font-semibold transition-colors ${
                solid ? 'text-slate-ink hover:bg-stone' : 'text-white/80 hover:bg-white/10'
              } ${toolsOpen ? (solid ? 'bg-stone' : 'bg-white/10') : ''}`}
            >
              Mjete
              <FaChevronDown className={`text-[10px] transition-transform ${toolsOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {toolsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.16 }}
                  className="absolute left-1/2 top-full mt-3 w-[520px] -translate-x-1/2 rounded-xl bg-white p-2 text-bedrock shadow-[0_24px_60px_-20px_rgba(14,42,48,0.45)] ring-1 ring-stone-line"
                >
                  <div className="grid grid-cols-2 gap-1">
                    {grupetMjeteve.map((g) => (
                      <div key={g.titulli} className="p-2">
                        <p className="px-2 pb-2 text-xs font-semibold text-slate-mute">{g.titulli}</p>
                        {g.items.map((it) => (
                          <button
                            key={it.id}
                            type="button"
                            onClick={() => hapMjet(it.id)}
                            className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left text-sm font-semibold transition-colors hover:bg-stone"
                          >
                            <span className="grid h-8 w-8 place-items-center rounded-md bg-brand/10 text-brand">
                              <it.icon className="text-sm" />
                            </span>
                            {it.label}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Djathtas */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => hap('moti')}
            title="Shiko parashikimin 5-ditor"
            className={`hidden items-center gap-2 whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-semibold transition-colors 2xl:flex ${
              solid ? 'text-slate-ink hover:bg-stone' : 'text-white/85 hover:bg-white/10'
            }`}
          >
            <FaCloudSun className={solid ? 'text-brand' : 'text-glacier'} />
            <span className="tabular">
              {weatherLoading ? '…' : weather ? `${weather.temp}°C, ${weather.condition}` : 'Moti N/A'}
            </span>
          </button>
          <a
            href="tel:+38344184114"
            onClick={() => trackEvent('phone_click', { phone: '044184114', location: 'header' })}
            className={`hidden items-center gap-2 whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-semibold tabular transition-colors md:flex lg:hidden xl:flex ${
              solid ? 'text-bedrock hover:bg-stone' : 'text-white hover:bg-white/10'
            }`}
          >
            <FaPhoneAlt className={`text-xs ${solid ? 'text-brand' : 'text-glacier'}`} />
            044 184 114
          </a>
          <button type="button" onClick={openOferta} className="btn-signal hidden px-4 py-2.5 sm:inline-flex">
            Kërko Ofertë
          </button>
          <button
            type="button"
            className={`grid h-11 w-11 place-items-center rounded-md text-lg lg:hidden ${solid ? 'hover:bg-stone' : 'hover:bg-white/10'}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="menuja-celular"
            aria-label={mobileOpen ? 'Mbyll menunë' : 'Hap menunë'}
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

    </header>

      {/* Menuja e celularit */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="menuja-celular"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-[49] overflow-y-auto bg-bedrock text-white lg:hidden"
          >
            <nav aria-label="Navigimi kryesor" className="shell pb-10 pt-4">
              <ul>
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * i, duration: 0.25 }}
                    className="border-b border-white/10"
                  >
                    <Link
                      href={l.href}
                      onClick={(e) => {
                        if (l.href === '/') handleHomeClick(e)
                        setMobileOpen(false)
                      }}
                      aria-current={isActive(l.href) ? 'page' : undefined}
                      className="flex items-center justify-between py-4 text-2xl font-bold font-wide"
                    >
                      {l.label}
                      {isActive(l.href) && <span className="h-2 w-2 rounded-full bg-signal" />}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {grupetMjeteve.map((g) => (
                <div key={g.titulli} className="mt-8">
                  <p className="mb-3 text-sm font-semibold text-white/50">{g.titulli}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {g.items.map((it) => (
                      <button
                        key={it.id}
                        type="button"
                        onClick={() => hapMjet(it.id)}
                        className="flex items-center gap-3 rounded-lg bg-white/[0.06] px-3 py-3 text-left text-sm font-semibold transition-colors active:bg-white/15"
                      >
                        <it.icon className="text-glacier" />
                        {it.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="mt-8 grid gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false)
                    openOferta()
                  }}
                  className="btn-signal w-full py-3.5"
                >
                  <FaFileAlt /> Kërko Ofertë
                </button>
                <a href="tel:+38344184114" className="btn-ghost-light w-full py-3.5">
                  <FaPhoneAlt className="text-xs" /> 044 184 114
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
