'use client'

/**
 * Prerje tërthore (pamje nga sipër, në perspektivë të lehtë izometrike) e "kafazit"
 * të armaturës së pilotës — fijet vertikale të shpërndara rrotull perimetrit + unaza
 * e spirales. Ndihmon të shihet menjëherë a janë fijet e mjaftueshme/të dendura.
 */

interface Props {
  diametriPilotesMM: number
  numriFijeveVertikale: number
  diametriFijeveMM: number
  diametriSpiralesMM: number
  className?: string
}

export default function ArmaturaSimulim3D({
  diametriPilotesMM,
  numriFijeveVertikale,
  diametriFijeveMM,
  diametriSpiralesMM,
  className = '',
}: Props) {
  const n = Math.max(3, Math.min(40, Math.round(numriFijeveVertikale) || 3))

  const cx = 150
  const cy = 120
  const rx = 100
  const ry = 62 // "shtypje" izometrike — pamje pak nga lart

  const barR = Math.max(3, Math.min(7, 3 + diametriFijeveMM / 8))
  const bariRrezja = rx - 14 // pak brenda skajit të betonit (mbulesa betoni)

  const pikat = Array.from({ length: n }, (_, i) => {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2
    return {
      x: cx + Math.cos(angle) * bariRrezja,
      y: cy + Math.sin(angle) * bariRrezja * (ry / rx),
    }
  })

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      <svg viewBox="0 0 300 260" className="w-full max-w-xs" role="img" aria-label="Prerje tërthore e armaturës së pilotës">
        {/* Trupi i betonit të pilotës */}
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#c9ccd1" stroke="#8a8f96" strokeWidth="2" />

        {/* Unaza e spirales */}
        <ellipse
          cx={cx}
          cy={cy}
          rx={bariRrezja + barR + 2}
          ry={(bariRrezja + barR + 2) * (ry / rx)}
          fill="none"
          stroke="#256D7B"
          strokeWidth={Math.max(1.5, diametriSpiralesMM / 6)}
          strokeDasharray="6 4"
          opacity="0.85"
        />

        {/* Fijet vertikale (shfaqen si pika — sepse shihen nga sipër, duke shkuar thellë) */}
        {pikat.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={barR} fill="#1f2937" stroke="#374151" strokeWidth="0.5" />
        ))}

        {/* Etiketa qendrore */}
        <text x={cx} y={cy + 4} fontSize="11" fill="#374151" fontWeight="700" textAnchor="middle">
          {n} fije
        </text>

        {/* Kalibri i diametrit total */}
        <line x1={cx - rx} y1={cy + ry + 26} x2={cx + rx} y2={cy + ry + 26} stroke="#256D7B" strokeWidth="1.2" />
        <text x={cx} y={cy + ry + 40} fontSize="10" fill="#256D7B" fontWeight="700" textAnchor="middle">
          ø piloti: {diametriPilotesMM}mm
        </text>
        <text x={cx} y={cy - ry - 12} fontSize="8" fill="#6B7280" textAnchor="middle">
          fije ø{diametriFijeveMM}mm · spirale ø{diametriSpiralesMM}mm
        </text>
      </svg>
    </div>
  )
}
