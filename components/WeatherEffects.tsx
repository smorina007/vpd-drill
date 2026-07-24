'use client'

import { useEffect, useMemo, useState } from 'react'

export type WeatherCondition = 'Diell' | 'Vranët' | 'Shi' | 'Borë' | 'Stuhi'

interface WeatherEffectsProps {
  condition: WeatherCondition | string | null
  className?: string
}

/**
 * Simulon vizualisht motin real (diell, re, shi, borë, stuhi) mbi Hero.
 * Përdor vetëm CSS/JS të lehtë (pa canvas) për performancë të mirë edhe në mobile.
 */
export default function WeatherEffects({ condition, className = '' }: WeatherEffectsProps) {
  const [flash, setFlash] = useState(false)

  const isStorm = condition === 'Stuhi'
  const isRain = condition === 'Shi' || isStorm
  const isSnow = condition === 'Borë'
  const isCloudy = condition === 'Vranët' || isStorm
  const isSun = condition === 'Diell'

  // Rrufeja për "Stuhi" - ndez/fik rastësisht
  useEffect(() => {
    if (!isStorm) return
    let timeout: ReturnType<typeof setTimeout>

    const strike = () => {
      setFlash(true)
      setTimeout(() => setFlash(false), 150)
      timeout = setTimeout(strike, 3000 + Math.random() * 5000)
    }
    timeout = setTimeout(strike, 1500 + Math.random() * 3000)

    return () => clearTimeout(timeout)
  }, [isStorm])

  const raindrops = useMemo(
    () =>
      Array.from({ length: isStorm ? 70 : 45 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: isStorm ? 0.35 + Math.random() * 0.25 : 0.6 + Math.random() * 0.4,
        height: 14 + Math.random() * 16,
      })),
    [isStorm]
  )

  const snowflakes = useMemo(
    () =>
      Array.from({ length: 45 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 6,
        size: 3 + Math.random() * 5,
        drift: Math.random() * 40 - 20,
      })),
    []
  )

  const clouds = useMemo(
    () =>
      Array.from({ length: 4 }).map((_, i) => ({
        id: i,
        top: 5 + i * 12 + Math.random() * 8,
        duration: 40 + Math.random() * 30,
        delay: -Math.random() * 30,
        scale: 0.7 + Math.random() * 0.8,
        opacity: isStorm ? 0.35 : 0.22,
      })),
    [isStorm]
  )

  if (!condition) return null

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Errësira e stuhisë */}
      {isStorm && <div className="absolute inset-0 bg-black/30 transition-opacity duration-300" />}

      {/* Rrufeja */}
      {isStorm && (
        <div
          className="absolute inset-0 bg-white transition-opacity duration-150"
          style={{ opacity: flash ? 0.55 : 0 }}
        />
      )}

      {/* Re që lëvizin (Vranët / Stuhi) */}
      {isCloudy &&
        clouds.map((c) => (
          <div
            key={c.id}
            className="absolute rounded-full bg-white/70 blur-2xl weather-cloud"
            style={{
              top: `${c.top}%`,
              width: `${180 * c.scale}px`,
              height: `${60 * c.scale}px`,
              opacity: c.opacity,
              animationDuration: `${c.duration}s`,
              animationDelay: `${c.delay}s`,
            }}
          />
        ))}

      {/* Shi */}
      {isRain &&
        raindrops.map((d) => (
          <div
            key={d.id}
            className="absolute top-0 w-[2px] rounded-full bg-gradient-to-b from-white/0 via-sky-100/70 to-sky-100/90 weather-raindrop"
            style={{
              left: `${d.left}%`,
              height: `${d.height}px`,
              animationDuration: `${d.duration}s`,
              animationDelay: `${d.delay}s`,
            }}
          />
        ))}

      {/* Borë */}
      {isSnow &&
        snowflakes.map((f) => (
          <div
            key={f.id}
            className="absolute top-0 rounded-full bg-white/90 weather-snowflake"
            style={
              {
                left: `${f.left}%`,
                width: `${f.size}px`,
                height: `${f.size}px`,
                animationDuration: `${f.duration}s`,
                animationDelay: `${f.delay}s`,
                '--drift': `${f.drift}px`,
              } as React.CSSProperties
            }
          />
        ))}

      {/* Diell - rreze të buta që rrotullohen ngadalë */}
      {isSun && (
        <div
          className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[140%] aspect-square rounded-full opacity-40 weather-sunrays"
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0deg, rgba(255,214,102,0.35) 8deg, transparent 16deg, transparent 40deg, rgba(255,214,102,0.35) 48deg, transparent 56deg, transparent 90deg, rgba(255,214,102,0.35) 98deg, transparent 106deg, transparent 140deg, rgba(255,214,102,0.35) 148deg, transparent 156deg, transparent 190deg, rgba(255,214,102,0.35) 198deg, transparent 206deg, transparent 240deg, rgba(255,214,102,0.35) 248deg, transparent 256deg, transparent 290deg, rgba(255,214,102,0.35) 298deg, transparent 306deg, transparent 340deg, rgba(255,214,102,0.35) 348deg, transparent 356deg)',
          }}
        />
      )}

      <style jsx>{`
        .weather-raindrop {
          animation-name: rain-fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes rain-fall {
          0% {
            transform: translateY(-10%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh);
            opacity: 0.6;
          }
        }

        .weather-snowflake {
          animation-name: snow-fall;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @keyframes snow-fall {
          0% {
            transform: translate(0, -10%) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.95;
          }
          100% {
            transform: translate(var(--drift), 110vh) rotate(360deg);
            opacity: 0.7;
          }
        }

        .weather-cloud {
          animation-name: cloud-drift;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes cloud-drift {
          0% {
            transform: translateX(-30vw);
          }
          100% {
            transform: translateX(130vw);
          }
        }

        .weather-sunrays {
          animation: sun-rotate 90s linear infinite;
        }
        @keyframes sun-rotate {
          0% {
            transform: translateX(-50%) rotate(0deg);
          }
          100% {
            transform: translateX(-50%) rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}
