import Image from 'next/image'
import Link from 'next/link'
import { FaChevronRight } from 'react-icons/fa'
import { IconType } from 'react-icons'
import { ReactNode } from 'react'

interface Crumb {
  label: string
  href?: string
}

interface PageHeroBannerProps {
  icon?: IconType
  title: string
  subtitle: string
  crumbs: Crumb[]
  stat?: string
  /** Foto opsionale në sfond */
  image?: string
  children?: ReactNode
}

/**
 * Banneri hyrës i nën-faqeve — lë hapësirën e duhur nën header-in fiks
 * dhe jep breadcrumb + titull. Header-i është transparent mbi të.
 */
export default function PageHeroBanner({ icon: Icon, title, subtitle, crumbs, stat, image, children }: PageHeroBannerProps) {
  return (
    <section className="relative isolate overflow-hidden bg-bedrock text-white">
      {image && (
        <div className="absolute inset-0 -z-10">
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-45" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,42,48,0.95)_0%,rgba(14,42,48,0.75)_55%,rgba(14,42,48,0.45)_100%)]" />
        </div>
      )}
      <div className="shell pb-14 pt-[calc(var(--header-h)+48px)] sm:pb-20 sm:pt-[calc(var(--header-h)+72px)]">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/55">
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <FaChevronRight className="text-[9px] opacity-60" />}
              {c.href ? (
                <Link href={c.href} className="transition-colors hover:text-white">
                  {c.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-semibold text-white">
                  {c.label}
                </span>
              )}
            </span>
          ))}
        </nav>

        <div className="flex items-start gap-5">
          {Icon && (
            <span className="mt-1 hidden h-14 w-14 shrink-0 place-items-center rounded-md bg-white/[0.08] text-2xl text-glacier ring-1 ring-white/15 sm:grid">
              <Icon />
            </span>
          )}
          <div className="max-w-3xl">
            <h1 className="display-lg text-white">{title}</h1>
            {stat && <p className="mt-2 text-sm font-semibold text-glacier">{stat}</p>}
            <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-white/75 sm:text-lg">{subtitle}</p>
            {children}
          </div>
        </div>
      </div>
      <div className="strata-rule-light opacity-40" aria-hidden="true" />
    </section>
  )
}
