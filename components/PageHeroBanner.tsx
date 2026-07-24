import Link from 'next/link'
import { FaChevronRight } from 'react-icons/fa'
import { IconType } from 'react-icons'

interface Crumb {
  label: string
  href?: string
}

interface PageHeroBannerProps {
  icon: IconType
  title: string
  subtitle: string
  crumbs: Crumb[]
  stat?: string
}

/**
 * Banner hyrës për nën-faqet (Shërbimet, Projektet, etj.) — jep hapësirën e
 * duhur nën header-in "fixed" (që përndryshe fshihet mbi titullin) dhe një
 * intro vizual me breadcrumb, në vend të thjesht "padding" bosh.
 */
export default function PageHeroBanner({ icon: Icon, title, subtitle, crumbs, stat }: PageHeroBannerProps) {
  return (
    <div className="relative pt-28 sm:pt-36 lg:pt-40 pb-14 sm:pb-16 bg-gradient-to-br from-[#1a4f5a] via-[#256D7B] to-[#1a4f5a] overflow-hidden">
      {/* Dekor i lehtë sfondi */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-white/60 text-xs sm:text-sm mb-6 flex-wrap">
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <FaChevronRight size={9} className="opacity-60" />}
              {c.href ? (
                <Link href={c.href} className="hover:text-white transition-colors">
                  {c.label}
                </Link>
              ) : (
                <span className="text-white font-medium">{c.label}</span>
              )}
            </span>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 flex-shrink-0">
            <Icon className="text-2xl sm:text-3xl text-white" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {title}
            </h1>
            {stat && <p className="text-[#7fc8d9] text-sm font-semibold mt-1">{stat}</p>}
          </div>
        </div>

        <p className="text-white/80 text-base sm:text-lg mt-4 max-w-2xl">
          {subtitle}
        </p>
      </div>
    </div>
  )
}
