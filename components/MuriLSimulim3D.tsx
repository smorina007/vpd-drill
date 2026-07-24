'use client'

/**
 * Simulim 3D (izometrik) i prerjes tërthore të Murit L — trupi vertikal + këmba
 * horizontale, me një zgjatim të lehtë izometrik për ndjesinë e thellësisë (gjatësisë).
 * Të gjitha përmasat (lartësia e murit, trashësitë, gjatësia e këmbës) janë NË SHKALLË
 * të njëjtë me njëra-tjetrën brenda prerjes tërthore — vetëm zgjatimi për "gjatësinë"
 * është një thellësi ilustruese fikse (siç bëhet zakonisht në skica inxhinierike).
 */

interface MuriLSimulimProps {
  gjatesia: number // m
  lartesiaMurit: number // m
  trashesiaMuritCM: number // cm
  gjatesiaKembes: number // m
  trashesiaKembesCM: number // cm
  className?: string
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

export default function MuriLSimulim3D({
  gjatesia,
  lartesiaMurit,
  trashesiaMuritCM,
  gjatesiaKembes,
  trashesiaKembesCM,
  className = '',
}: MuriLSimulimProps) {
  const trashesiaMurit = trashesiaMuritCM / 100
  const trashesiaKembes = trashesiaKembesCM / 100

  const totalHeight = lartesiaMurit + trashesiaKembes
  const totalWidth = Math.max(gjatesiaKembes, trashesiaMurit)

  const drawW = 170
  const drawH = 200
  const pxPerM = Math.min(drawW / totalWidth, drawH / totalHeight)

  const footingThickPx = trashesiaKembes * pxPerM
  const wallHeightPx = lartesiaMurit * pxPerM
  const footingLenPx = gjatesiaKembes * pxPerM
  const wallThickPx = trashesiaMurit * pxPerM

  const leftX = 60
  const baseY = 230

  // Kulmet e prerjes tërthore (fronti) — L-shape, në drejtim orar
  const P1 = { x: leftX, y: baseY }
  const P2 = { x: leftX + footingLenPx, y: baseY }
  const P3 = { x: leftX + footingLenPx, y: baseY - footingThickPx }
  const P4 = { x: leftX + wallThickPx, y: baseY - footingThickPx }
  const P5 = { x: leftX + wallThickPx, y: baseY - footingThickPx - wallHeightPx }
  const P6 = { x: leftX, y: baseY - footingThickPx - wallHeightPx }

  const frontPath = `M ${P1.x},${P1.y} L ${P2.x},${P2.y} L ${P3.x},${P3.y} L ${P4.x},${P4.y} L ${P5.x},${P5.y} L ${P6.x},${P6.y} Z`

  // Zgjatimi izometrik (paraqet "gjatësinë" e murit) — thellësi ilustruese, e kufizuar vizualisht
  const exMag = clamp(20 + gjatesia * 4, 26, 58)
  const ex = { x: exMag * 0.62, y: -exMag * 0.55 }
  const off = (p: { x: number; y: number }) => ({ x: p.x + ex.x, y: p.y + ex.y })

  const sideFooting = `M ${P2.x},${P2.y} L ${P3.x},${P3.y} L ${off(P3).x},${off(P3).y} L ${off(P2).x},${off(P2).y} Z`
  const sideWall = `M ${P4.x},${P4.y} L ${P5.x},${P5.y} L ${off(P5).x},${off(P5).y} L ${off(P4).x},${off(P4).y} Z`
  const topFooting = `M ${P3.x},${P3.y} L ${P4.x},${P4.y} L ${off(P4).x},${off(P4).y} L ${off(P3).x},${off(P3).y} Z`
  const topWall = `M ${P5.x},${P5.y} L ${P6.x},${P6.y} L ${off(P6).x},${off(P6).y} L ${off(P5).x},${off(P5).y} Z`

  const svgW = leftX + footingLenPx + ex.x + 30
  const svgH = baseY + 40

  return (
    <div className={`w-full flex justify-center ${className}`}>
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-sm" role="img" aria-label="Simulim 3D i Murit L">
        {/* Toka / mbushja pas murit */}
        <line x1="10" y1={P6.y} x2={svgW - 10} y2={P6.y} stroke="#8b6f4e" strokeWidth="2" strokeDasharray="2 3" opacity="0.6" />

        {/* Faqet anësore (më të errëta — sugjerojnë thellësinë/gjatësinë) */}
        <path d={sideFooting} fill="#173f4a" />
        <path d={sideWall} fill="#173f4a" />

        {/* Prerja tërthore kryesore (fronti, në shkallë të saktë) */}
        <path d={frontPath} fill="#256D7B" stroke="#123842" strokeWidth="1.5" />

        {/* Faqet e sipërme (më të çelëta — kapin "dritën") */}
        <path d={topFooting} fill="#5fa9b8" />
        <path d={topWall} fill="#5fa9b8" />

        {/* Vija ndarëse mur/këmbë për qartësi */}
        <line x1={P4.x} y1={P4.y} x2={leftX} y2={P4.y} stroke="#0f2e37" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />

        {/* Etiketa përmasash */}
        <text x={(P1.x + P6.x) / 2 - 10} y={(P1.y + P6.y) / 2} fontSize="9" fill="#1f2937" fontWeight="700" textAnchor="end">
          {lartesiaMurit}m
        </text>
        <text x={(P1.x + P2.x) / 2} y={baseY + 16} fontSize="9" fill="#1f2937" fontWeight="700" textAnchor="middle">
          këmba {gjatesiaKembes}m
        </text>
        <text x={(P4.x + off(P4).x) / 2 + 6} y={(P4.y + off(P4).y) / 2 - 4} fontSize="8" fill="#256D7B" fontWeight="700">
          gjatësia {gjatesia}m
        </text>
        <text x={P6.x - 8} y={P6.y - 8} fontSize="8" fill="#6B7280" textAnchor="end">
          trashësia muri: {trashesiaMuritCM}cm
        </text>
        <text x={P2.x + 4} y={P3.y + footingThickPx / 2 + 3} fontSize="8" fill="#6B7280">
          trashësia këmbës: {trashesiaKembesCM}cm
        </text>
      </svg>
    </div>
  )
}
