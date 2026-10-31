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
