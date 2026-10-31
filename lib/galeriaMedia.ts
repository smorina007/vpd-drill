/**
 * Fotot dhe videot e reja të galerisë, të ndara sipas kategorisë.
 * Për të shtuar media: vendos skedarin te /public/images/galeria/<kategoria>/ ose
 * /public/videos/<kategoria>/ dhe shto një rresht këtu.
 */

export type MediaLloji = 'foto' | 'video'

export interface MediaItem {
  id: string
  lloji: MediaLloji
  src: string
  /** Foto e parë e videos (përdoret si kopertinë në rrjetë). */
  poster?: string
  titulli: string
  kategoria: string
  lokacioni?: string
  data?: string
  /** true për media në format portret (9:16, 3:4). */
  vertikale?: boolean
}

export const KAT_DIAFRAGME = 'Gërmim Diafragmë'
export const KAT_MURI_L = 'Mure L & Pllaka'

const fotoDiafragme: MediaItem[] = [
  { n: 1, v: true, t: 'Armatura e diafragmës gati për betonim' },
  { n: 2, t: 'Gropë themeli e mbrojtur me diafragmë' },
  { n: 3, t: 'Gërmim dhe transport i dheut' },
  { n: 4, t: 'Gërmim dhe transport i dheut' },
  { n: 5, v: true, t: 'Mur diafragme pas gërmimit' },
  { n: 6, t: 'Gërmim i thellë pranë objekteve ekzistuese' },
  { n: 7, t: 'Ekipi në terren — armim i diafragmës' },
  { n: 8, t: 'Mur diafragme i përfunduar' },
  { n: 9, t: 'Mur diafragme i përfunduar' },
  { n: 10, v: true, t: 'Makineria në kantier' },
  { n: 11, t: 'Diafragmë — pamje nga thellësia' },
  { n: 12, t: 'Diafragmë — pamje nga thellësia' },
].map(({ n, v, t }) => ({
  id: `d${n}`,
  lloji: 'foto' as const,
  src: `/images/galeria/diafragme/d${n}.jpg`,
  titulli: t,
  kategoria: KAT_DIAFRAGME,
  vertikale: !!v,
}))

const videoDiafragme: MediaItem[] = [
  { n: 1, t: 'Makineritë në punë' },
  { n: 2, v: true, t: 'Gropa e themelit me diafragmë' },
  { n: 3, t: 'Pamje e gropës së themelit' },
  { n: 4, v: true, t: 'Shpimi me makinë Casagrande' },
  { n: 5, v: true, t: 'Ngritja e armaturës' },
  { n: 6, v: true, t: 'Përgatitja e kafazit të armaturës' },
  { n: 7, v: true, t: 'Vendosja e armaturës në diafragmë' },
  { n: 8, v: true, t: 'Gërmim pas diafragmës' },
  { n: 9, t: 'Kova e gërmimit nga afër' },
  { n: 10, v: true, t: 'Muri i diafragmës pas gërmimit' },
  { n: 11, v: true, t: 'Gërmim dhe mbrojtje e shpatit' },
  { n: 12, v: true, t: 'Makina e shpimit në kantier' },
  { n: 13, v: true, t: 'Muri i diafragmës — pamje e plotë' },
  { n: 14, v: true, t: 'Procesi i punës në diafragmë' },
].map(({ n, v, t }) => ({
  id: `v${n}`,
  lloji: 'video' as const,
  src: `/videos/diafragme/v${n}.mp4`,
  poster: `/videos/diafragme/v${n}.jpg`,
  titulli: t,
  kategoria: KAT_DIAFRAGME,
  vertikale: !!v,
}))

const fotoMuriL: MediaItem[] = [
  { n: 1, v: true, t: 'Mure L për rregullim ambienti' },
  { n: 2, t: 'Mure L dhe pllaka betoni' },
  { n: 3, v: true, t: 'Shteg me pllaka dhe mure L' },
  { n: 4, t: 'Lulishte me mure L' },
  { n: 5, t: 'Mure L dhe pllaka betoni' },
  { n: 6, t: 'Mure L përgjatë parkingut' },
].map(({ n, v, t }) => ({
  id: `m${n}`,
  lloji: 'foto' as const,
  src: `/images/galeria/muri-l/m${n}.jpg`,
  titulli: t,
  kategoria: KAT_MURI_L,
  vertikale: !!v,
}))

/** Të gjitha mediat e reja — videot e para, pastaj fotot. */
export const mediaTeReja: MediaItem[] = [
  // ndërthurim video/foto që rrjeta të duket e gjallë
  ...interleave(videoDiafragme, fotoDiafragme),
  ...fotoMuriL,
]

function interleave<T>(a: T[], b: T[]): T[] {
  const out: T[] = []
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if (a[i]) out.push(a[i])
    if (b[i]) out.push(b[i])
  }
  return out
}

export interface Projekt {
  id: number
  data: string
  titulli: string
  kategoria: string
  lokacioni: string
  foto: string
}

/**
 * Fotot e projekteve me lokacion dhe datë — përdoren nga galeria, harta dhe "Mjete → Galeria".
 * KUJDES: kontrolloni që qyteti dhe data e secilës foto të jenë të sakta.
 */
export const projektet: Projekt[] = [
  { id: 1, data: '16.12.2025', titulli: 'Pilota', kategoria: 'Shpime', lokacioni: 'Prishtinë', foto: '/images/galeria/G1.jpeg' },
  { id: 2, data: '10.01.2025', titulli: 'Gërmim me diafragmë', kategoria: 'Gërmim Diafragmë', lokacioni: 'Vushtrri', foto: '/images/galeria/G2.jpeg' },
  { id: 3, data: '20.11.2024', titulli: 'Pilota për objekt dhe ankerim', kategoria: 'Pilota dhe ankera', lokacioni: 'Prishtinë', foto: '/images/galeria/G3.jpeg' },
  { id: 4, data: '05.12.2024', titulli: 'Casagrande B175, pilota', kategoria: 'Shpime', lokacioni: 'Gjilan', foto: '/images/galeria/G4.jpeg' },
  { id: 5, data: '22.01.2026', titulli: 'Pilota', kategoria: 'Shpime', lokacioni: 'Prizren', foto: '/images/galeria/G5.jpeg' },
  { id: 6, data: '30.01.2026', titulli: 'Pilota', kategoria: 'Shpime', lokacioni: 'Prishtinë', foto: '/images/galeria/G6.jpeg' },
  { id: 7, data: '30.01.2026', titulli: 'Pilota dhe vendosje te konstruksioneve te prodhuara nga VPD DRILL', kategoria: 'Shpime', lokacioni: 'Suharekë', foto: '/images/galeria/G7.jpeg' },
  { id: 8, data: '30.01.2026', titulli: 'Soilmec ne detyrë', kategoria: 'Shpime', lokacioni: 'Klinë', foto: '/images/galeria/G10.jpeg' },
  { id: 9, data: '30.01.2026', titulli: 'Soilmec ne detyrë', kategoria: 'Shpime', lokacioni: 'Prishtinë', foto: '/images/galeria/G18.jpeg' },
  { id: 10, data: '30.06.2026', titulli: 'Casagrande Diafragmë', kategoria: 'Gërmim Diafragmë', lokacioni: 'Malishevë', foto: '/images/galeria/G21.jpeg' },
  { id: 11, data: '20.11.2024', titulli: 'Pilota për objekt dhe ankerim', kategoria: 'Pilota dhe ankera', lokacioni: 'Gjilan', foto: '/images/galeria/p1.jpeg' },
  { id: 12, data: '20.11.2024', titulli: 'Pilota për objekt dhe ankerim', kategoria: 'Pilota dhe ankera', lokacioni: 'Prishtinë', foto: '/images/galeria/p2.jpeg' },
  { id: 13, data: '20.11.2024', titulli: 'Pilota për objekt dhe ankerim', kategoria: 'Pilota dhe ankera', lokacioni: 'Prishtinë', foto: '/images/galeria/p3.jpeg' },
  { id: 14, data: '20.11.2024', titulli: 'Pilota për objekt dhe ankerim', kategoria: 'Pilota dhe ankera', lokacioni: 'Vushtrri', foto: '/images/galeria/p4.jpeg' },
  { id: 15, data: '20.11.2024', titulli: 'Pilota për objekt dhe ankerim', kategoria: 'Pilota dhe ankera', lokacioni: 'Prishtinë', foto: '/images/galeria/p5.jpeg' },
  { id: 16, data: '20.11.2024', titulli: 'Pilota për objekt dhe ankerim', kategoria: 'Pilota dhe ankera', lokacioni: 'Gjilan', foto: '/images/galeria/p6.jpeg' },
  { id: 17, data: '20.11.2024', titulli: 'Pilota për objekt dhe ankerim', kategoria: 'Pilota dhe ankera', lokacioni: 'Prizren', foto: '/images/galeria/p7.jpeg' },
  { id: 18, data: '20.11.2024', titulli: 'Pilota për objekt dhe ankerim', kategoria: 'Pilota dhe ankera', lokacioni: 'Prishtinë', foto: '/images/galeria/p8.jpeg' },
  { id: 19, data: '20.11.2024', titulli: 'Pilota për objekt dhe ankerim', kategoria: 'Pilota dhe ankera', lokacioni: 'Suharekë', foto: '/images/galeria/p9.jpeg' },
  { id: 20, data: '20.11.2024', titulli: 'Pilota për objekt dhe ankerim', kategoria: 'Pilota dhe ankera', lokacioni: 'Klinë', foto: '/images/galeria/p10.jpeg' },
  { id: 21, data: '20.11.2024', titulli: 'Pilota për objekt dhe ankerim', kategoria: 'Pilota dhe ankera', lokacioni: 'Prishtinë', foto: '/images/galeria/p11.jpeg' },
  { id: 22, data: '20.11.2024', titulli: 'Pilota për objekt dhe ankerim', kategoria: 'Pilota dhe ankera', lokacioni: 'Malishevë', foto: '/images/galeria/p12.jpeg' },
  { id: 23, data: '20.11.2024', titulli: 'Pilota për objekt dhe ankerim', kategoria: 'Pilota dhe ankera', lokacioni: 'Gjilan', foto: '/images/galeria/p13.jpeg' },
  { id: 24, data: '20.11.2024', titulli: 'Pilota për objekt dhe ankerim', kategoria: 'Pilota dhe ankera', lokacioni: 'Prishtinë', foto: '/images/galeria/p14.jpeg' },
  { id: 25, data: '20.11.2024', titulli: 'Pilota për objekt dhe ankerim', kategoria: 'Pilota dhe ankera', lokacioni: 'Prishtinë', foto: '/images/galeria/p15.jpeg' },
  { id: 26, data: '20.11.2024', titulli: 'Pilota për objekt dhe ankerim', kategoria: 'Pilota dhe ankera', lokacioni: 'Vushtrri', foto: '/images/galeria/p16.jpeg' },
  { id: 27, data: '20.11.2024', titulli: 'Pilota për objekt dhe ankerim', kategoria: 'Pilota dhe ankera', lokacioni: 'Prishtinë', foto: '/images/galeria/p17.jpeg' },
  { id: 28, data: '20.11.2024', titulli: 'Pilota për objekt dhe ankerim', kategoria: 'Pilota dhe ankera', lokacioni: 'Gjilan', foto: '/images/galeria/p18.jpeg' },
  { id: 29, data: '20.11.2024', titulli: 'Pilota për objekt dhe ankerim', kategoria: 'Pilota dhe ankera', lokacioni: 'Prizren', foto: '/images/galeria/p19.jpeg' },
  { id: 30, data: '20.11.2024', titulli: 'Pilota për objekt dhe ankerim', kategoria: 'Pilota dhe ankera', lokacioni: 'Prishtinë', foto: '/images/galeria/p20.jpeg' },
  { id: 32, data: '20.11.2024', titulli: 'Pilota për objekt dhe ankerim', kategoria: 'Pilota dhe ankera', lokacioni: 'Klinë', foto: '/images/galeria/p22.jpeg' },
  { id: 33, data: '20.11.2024', titulli: 'Pilota për objekt dhe ankerim', kategoria: 'Pilota dhe ankera', lokacioni: 'Prishtinë', foto: '/images/galeria/p23.jpeg' },
  { id: 34, data: '20.11.2024', titulli: 'Pilota për objekt dhe ankerim', kategoria: 'Pilota dhe ankera', lokacioni: 'Malishevë', foto: '/images/galeria/p24.jpeg' },
  { id: 35, data: '20.11.2024', titulli: 'Pilota për objekt dhe ankerim', kategoria: 'Pilota dhe ankera', lokacioni: 'Gjilan', foto: '/images/galeria/p25.jpeg' },
  { id: 36, data: '20.11.2024', titulli: 'Pilota për objekt dhe ankerim', kategoria: 'Pilota dhe ankera', lokacioni: 'Prishtinë', foto: '/images/galeria/p26.jpeg' },
  { id: 37, data: '20.11.2024', titulli: 'Pilota për objekt dhe ankerim', kategoria: 'Pilota dhe ankera', lokacioni: 'Gjilan', foto: '/images/galeria/p27.jpeg' },
  { id: 38, data: '20.11.2024', titulli: 'Pilota për objekt dhe ankerim', kategoria: 'Pilota dhe ankera', lokacioni: 'Prizren', foto: '/images/galeria/p28.jpeg' },
  { id: 39, data: '20.11.2024', titulli: 'Pilota për objekt dhe ankerim', kategoria: 'Pilota dhe ankera', lokacioni: 'Prishtinë', foto: '/images/galeria/p29.jpeg' },
  { id: 40, data: '30.01.2026', titulli: 'Pilota', kategoria: 'Shpime', lokacioni: 'Prishtinë', foto: '/images/galeria/G11.jpeg' },
  { id: 41, data: '30.01.2026', titulli: 'Pilota', kategoria: 'Shpime', lokacioni: 'Prishtinë', foto: '/images/galeria/G12.jpeg' },
  { id: 42, data: '30.01.2026', titulli: 'Pilota', kategoria: 'Shpime', lokacioni: 'Prishtinë', foto: '/images/galeria/G13.jpeg' },
  { id: 43, data: '30.01.2026', titulli: 'Pilota', kategoria: 'Shpime', lokacioni: 'Prishtinë', foto: '/images/galeria/G14.jpeg' },
  { id: 44, data: '30.01.2026', titulli: 'Pilota', kategoria: 'Shpime', lokacioni: 'Prishtinë', foto: '/images/galeria/G15.jpeg' },
  { id: 45, data: '30.01.2026', titulli: 'Pilota', kategoria: 'Shpime', lokacioni: 'Prishtinë', foto: '/images/galeria/G16.jpeg' },
  { id: 46, data: '30.01.2026', titulli: 'Pilota', kategoria: 'Shpime', lokacioni: 'Prishtinë', foto: '/images/galeria/G17.jpeg' },
  { id: 47, data: '30.01.2026', titulli: 'Pilota', kategoria: 'Shpime', lokacioni: 'Prishtinë', foto: '/images/galeria/G19.jpeg' },
  { id: 48, data: '30.01.2026', titulli: 'Pilota', kategoria: 'Shpime', lokacioni: 'Prishtinë', foto: '/images/galeria/G20.jpeg' },
]
