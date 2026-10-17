import { ReactNode } from 'react'

type Props = {
  title: ReactNode
  lede?: ReactNode
  action?: ReactNode
  tone?: 'light' | 'dark'
  as?: 'h1' | 'h2'
  className?: string
}

/** Titulli i seksioneve — i rreshtuar majtas, me hapësirë të rregullt. */
export default function SectionHeading({ title, lede, action, tone = 'light', as = 'h2', className = '' }: Props) {
  const Tag = as
  return (
    <div className={`mb-10 flex flex-col gap-5 sm:mb-14 lg:flex-row lg:items-end lg:justify-between ${className}`}>
      <div className="max-w-3xl">
        <Tag className={`display-lg ${tone === 'dark' ? 'text-white' : ''}`}>{title}</Tag>
        {lede && (
          <p className={`mt-4 text-base leading-relaxed sm:text-lg ${tone === 'dark' ? 'text-white/70' : 'text-slate-ink'} max-w-[60ch]`}>
            {lede}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
