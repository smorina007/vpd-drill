'use client'

import { useEffect, useState } from 'react'

/**
 * Ora reale si komponent i veçantë — rifreskon vetëm veten çdo sekondë,
 * jo të gjithë Header-in apo Hero-n (siç ndodhte më parë).
 */
export default function Ora({ seconds = true, className = '' }: { seconds?: boolean; className?: string }) {
  const [time, setTime] = useState('')

  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString('sq-AL', {
        hour: '2-digit',
        minute: '2-digit',
        ...(seconds ? { second: '2-digit' } : {}),
        hour12: false,
      })
    setTime(fmt())
    const t = setInterval(() => setTime(fmt()), seconds ? 1000 : 15000)
    return () => clearInterval(t)
  }, [seconds])

  return (
    <span className={`tabular ${className}`} suppressHydrationWarning>
      {time || '--:--'}
    </span>
  )
}
