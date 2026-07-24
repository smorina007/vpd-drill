'use client'

/**
 * Simulim 3D (izometrik) i një gypi/shafti vertikal — përdoret nga kalkulatori
 * i ujit (pus) dhe i pilotave. Jep një ndjesi "3D" reale (top + fund elipsë,
 * trup cilindrik, vijë toke, rul thellësie me shenja m, kalibër diametri) —
 * pa pasur nevojë për WebGL/three.js, kështu që ngarkon shpejt dhe punon kudo.
 *
 * SHËNIM mbi shkallëzimin: thellësia vizatohet gjithmonë "e mbushur" në lartësinë
 * e disponueshme (kështu grafiku mbetet i lexueshëm edhe për 1m edhe për 500m),
 * ndërsa diametri shkallëzohet në mënyrë proporcionale (jo në po atë shkallë px/mm
 * si thellësia — përndryshe një gyp 300mm në 50m thellësi do të dukej si fije floku).
 * Vlerat e sakta shfaqen gjithmonë si etiketa numerike, pra s'ka humbje informacioni.
 */

interface ShaftiSimulimProps {
  diametriMM: number
  thellesiaM: number
  lloji: 'uje' | 'beton'
  className?: string
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

function zgjidhHapin(thellesia: number) {
  if (thellesia <= 10) return 1
  if (thellesia <= 25) return 2
  if (thellesia <= 60) return 5
  if (thellesia <= 150) return 10
  return 25
}

export default function ShaftiSimulim3D({ diametriMM, thellesiaM, lloji, className = '' }: ShaftiSimulimProps) {
  const thellesia = Math.max(0.5, thellesiaM || 0.5)
  const diametri = Math.max(50, diametriMM || 50)

  const width = 300
  const topY = 46
  const maxDrawHeight = 250
  const bottomY = topY + maxDrawHeight

  const rx = clamp(22 + ((diametri - 100) / 1900) * 42, 22, 64)
  const ry = rx * 0.36
  const cx = width / 2 + 18

  const hapi = zgjidhHapin(thellesia)
  const numriShenjave = Math.max(1, Math.floor(thellesia / hapi))
  const shenjat = Array.from({ length: numriShenjave + 1 }, (_, i) => i * hapi).filter((v) => v <= thellesia)
  if (shenjat[shenjat.length - 1] !== thellesia) shenjat.push(Number(thellesia.toFixed(1)))

  const isUje = lloji === 'uje'
  const ngjyraTrupi = isUje ? '#1a5b73' : '#8a8f96'
  const ngjyraTrupiTeret = isUje ? '#256D7B' : '#a8adb4'
  const ngjyraSiperfaqe = isUje ? '#3aa8c9' : '#c4c8ce'
  const ngjyraFundi = isUje ? '#0e3d4d' : '#6b6f75'

  const rulerX = cx - rx - 34

  return (
    <div className={`w-full flex justify-center ${className}`}>
      <svg viewBox={`0 0 ${width + 40} ${bottomY + 40}`} className="w-full max-w-xs" role="img" aria-label={`Simulim 3D i thellësisë ${thellesia}m me diametër ${diametri}mm`}>
        {/* Toka */}
        <line x1="8" y1={topY} x2={width + 32} y2={topY} stroke="#8b6f4e" strokeWidth="3" strokeDasharray="2 3" />
        <text x="10" y={topY - 8} fontSize="9" fill="#8b6f4e" fontWeight="600">niveli i tokës</text>

        {/* Rul thellësie */}
        <line x1={rulerX} y1={topY} x2={rulerX} y2={bottomY} stroke="#9CA3AF" strokeWidth="1.5" />
        {shenjat.map((v, i) => {
          const y = topY + (v / thellesia) * maxDrawHeight
          return (
            <g key={i}>
              <line x1={rulerX - 4} y1={y} x2={rulerX + 4} y2={y} stroke="#9CA3AF" strokeWidth="1.5" />
              <text x={rulerX - 8} y={y + 3} fontSize="8" fill="#6B7280" textAnchor="end">{v}m</text>
            </g>
          )
        })}

        {/* Trupi cilindrik (isometrik: elips lart, drejtkëndësh anash, elips poshtë) */}
        <rect x={cx - rx} y={topY} width={rx * 2} height={maxDrawHeight} fill={ngjyraTrupi} />
        <rect x={cx - rx} y={topY} width={rx * 2} height={maxDrawHeight} fill="url(#shafti-shade)" opacity="0.5" />

        <ellipse cx={cx} cy={bottomY} rx={rx} ry={ry} fill={ngjyraFundi} />
        <ellipse cx={cx} cy={topY} rx={rx} ry={ry} fill={ngjyraSiperfaqe} stroke={ngjyraTrupiTeret} strokeWidth="1.5" />

        {/* Valë uji (vetëm për pus) */}
        {isUje && (
          <>
            <ellipse cx={cx} cy={topY + 10} rx={rx * 0.9} ry={ry * 0.7} fill="#5bc4e6" opacity="0.55" />
            <ellipse cx={cx} cy={topY} rx={rx} ry={ry} fill="none" stroke="#bfe9f7" strokeWidth="1" opacity="0.8" />
          </>
        )}

        {/* Kalibri i diametrit */}
        <line x1={cx - rx} y1={topY - 18} x2={cx + rx} y2={topY - 18} stroke="#256D7B" strokeWidth="1.2" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
        <text x={cx} y={topY - 22} fontSize="9" fill="#256D7B" fontWeight="700" textAnchor="middle">
          ø {diametri}mm
        </text>

        {/* Etiketa e thellësisë poshtë */}
        <text x={cx} y={bottomY + 22} fontSize="10" fill="#374151" fontWeight="700" textAnchor="middle">
          Thellësia: {thellesia}m
        </text>

        <defs>
          <linearGradient id="shafti-shade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#000" stopOpacity="0.35" />
            <stop offset="35%" stopColor="#000" stopOpacity="0" />
            <stop offset="70%" stopColor="#fff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.3" />
          </linearGradient>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#256D7B" />
          </marker>
        </defs>
      </svg>
    </div>
  )
}
