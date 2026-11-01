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
  { n: 1, t: 'Makineritë në kantier' },
  { n: 2, v: true, t: 'Gropa e themelit — pamje nga lart' },
  { n: 3, t: 'Pamje e gropës së themelit' },
  { n: 4, v: true, t: 'Shpimi i pilotave' },
  { n: 5, v: true, t: 'Ngritja e kafazit të armaturës' },
  { n: 6, v: true, t: 'Prodhimi i kafazëve të armaturës' },
  { n: 7, v: true, t: 'Kafazi i armaturës gati për vendosje' },
  { n: 8, v: true, t: 'Gërmim dhe ankerim në gropë' },
  { n: 9, t: 'Kova e gërmimit nga afër' },
  { n: 10, v: true, t: 'Gërmimi i gropës së themelit' },
  { n: 11, v: true, t: 'Shpimi i ankerave në gropë' },
  { n: 12, v: true, t: 'Shpimi dhe betonimi i pilotave' },
  { n: 13, v: true, t: 'Muri mbajtës pas gërmimit' },
  { n: 14, v: true, t: 'Makina e shpimit në punë' },
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
  { n: 7, t: 'Mure L rreth tarracës së shtëpisë' },
  { n: 8, t: 'Oborr i rregulluar me mure L' },
  { n: 9, t: 'Transporti i mureve L me kamion' },
  { n: 10, v: true, t: 'Mure L gati për shkarkim' },
  { n: 11, v: true, t: 'Montimi i mureve L në kanal' },
  { n: 12, v: true, t: 'Mure L të montuara përgjatë parcelës' },
  { n: 13, v: true, t: 'Montimi i elementeve me vinç' },
  { n: 14, v: true, t: 'Mur mbajtës nga elemente L' },
  { n: 15, v: true, t: 'Fiksimi i elementeve gjatë montimit' },
  { n: 16, t: 'Transporti i mureve L' },
  { n: 17, t: 'Kamion me mure L drejt kantierit' },
  { n: 18, t: 'Mure L të ngarkuara për transport' },
  { n: 19, t: 'Tarracë me mure L dhe pllaka' },
  { n: 20, t: 'Ngarkimi i mureve L dhe gypave' },
  { n: 21, t: 'Mure L të ngarkuara në bazë' },
  { n: 22, t: 'Mur mbajtës rreth oborrit' },
  { n: 23, t: 'Mure L dhe shkallë betoni' },
  { n: 24, t: 'Sheshi i shtruar me mure L anash' },
  { n: 25, t: 'Rregullim oborri me mure L' },
  { n: 26, t: 'Mure L para pikës VPD OIL' },
].map(({ n, v, t }) => ({
  id: `m${n}`,
  lloji: 'foto' as const,
  src: `/images/galeria/muri-l/m${n}.jpg`,
  titulli: t,
  kategoria: KAT_MURI_L,
  vertikale: !!v,
}))

export const KAT_PILOTA = 'Pilota dhe ankera'
export const KAT_PRODHIMI = 'Prodhimi'
export const KAT_VINC = 'Vinça & Montime'
export const KAT_PUSE = 'Puse uji'

const vid = (id: string, t: string, kategoria: string, vertikale = true): MediaItem => ({
  id,
  lloji: 'video',
  src: `/videos/te-reja/${id}.mp4`,
  poster: `/videos/te-reja/${id}.jpg`,
  titulli: t,
  kategoria,
  vertikale,
})

/** Videot e dërguara më 31.10.2026 (pa zë — disa kishin muzikë TikTok). */
const videoTeReja: MediaItem[] = [
  vid('soilmec-4k', 'Soilmec SR-30 — shpimi i pilotave', KAT_PILOTA, false),
  vid('hapja-pilotave', 'Hapja e pilotave pranë objektit', KAT_PILOTA),
  vid('pus-uji', 'Shpimi i pusit — uji shpërthen nga thellësia', KAT_PUSE, false),
  { ...vid('albanica-prizren', 'Pilota për Albanica Residence', KAT_PILOTA), lokacioni: 'Prizren' },
  vid('kantier-pilotash', 'Kantier me disa makina shpimi', KAT_PILOTA, false),
  { ...vid('fabrika', 'Baza e prodhimit të VPD — pamje nga droni', KAT_PRODHIMI, false), src: '/videos/hero-fabrika.mp4', poster: '/videos/hero-fabrika.jpg' },
  vid('mur-pilotash', 'Mur pilotash pas gërmimit', KAT_DIAFRAGME),
  vid('shpim-pilotash', 'Shpimi i pilotave', KAT_PILOTA),
  vid('vinc-1', 'Montimi i shtyllës së tensionit me vinç', KAT_VINC),
  vid('armatura', 'Prodhimi dhe saldimi i kafazëve të armaturës', KAT_PRODHIMI),
  vid('gropa', 'Gropë themeli e përfunduar', KAT_DIAFRAGME),
  vid('makinat-shpimit', 'Disa makina shpimi në një kantier', KAT_PILOTA),
  vid('sajla', 'Prodhimi i sajlave', KAT_PRODHIMI),
  vid('vinc-2', 'Ngritja e shtyllës së tensionit', KAT_VINC),
  vid('kantieri-mbremje', 'Makinat e shpimit në kantier', KAT_PILOTA),
]

const fotoVinc: MediaItem[] = [
  { n: 1, t: 'Vinç dhe makinë shpimi në kantier' },
  { n: 2, t: 'Vinçi në punë pranë objekteve' },
  { n: 3, t: 'Montim me vinç në terren' },
].map(({ n, t }) => ({
  id: `k${n}`,
  lloji: 'foto' as const,
  src: `/images/galeria/vinc/k${n}.jpg`,
  titulli: t,
  kategoria: KAT_VINC,
  vertikale: true,
}))

/** Të gjitha mediat e reja — videot e para, pastaj fotot. */
export const mediaTeReja: MediaItem[] = [
  // ndërthurim video/foto që rrjeta të duket e gjallë
  ...interleave(videoTeReja, [...fotoMuriL.slice(6), ...fotoVinc]),
  ...interleave(videoDiafragme, fotoDiafragme),
  ...fotoMuriL.slice(0, 6),
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

/** Të gjitha mediat e galerisë (të rejat + projektet), me id unike për linke të shpërndashme. */
export const teGjithaMediat: MediaItem[] = [
  ...mediaTeReja,
  ...projektet.map((p) => ({
    id: `p${p.id}`,
    lloji: 'foto' as const,
    src: p.foto,
    titulli: p.titulli,
    kategoria: p.kategoria,
    lokacioni: p.lokacioni,
    data: p.data,
  })),
]

export const linkuIMedias = (id: string) => `https://vpddrill.com/projektet/${id}`
