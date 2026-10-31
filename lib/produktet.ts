import type { IconType } from 'react-icons'
import { FaWater, FaWrench, FaRuler, FaCog, FaBolt, FaShieldAlt } from 'react-icons/fa'

/** Katalogu i produkteve — përdoret nga libri i katalogut dhe lista me kërkim. */
export interface KategoriProduktesh {
  title: string
  slug: string
  pershkrimi: string
  /** Foto e madhe e kategorisë (faqja e majtë e librit) */
  foto: string
  icon: IconType
  items: { name: string; image: string }[]
}

export const produkteKategorite: KategoriProduktesh[] = [
  {
    title: 'Muri L',
    slug: 'muri-l',
    pershkrimi: 'Elemente betoni të parafabrikuara për mure mbajtëse — oborre, parkingje, rrugë dhe rregullim terreni. Montim i shpejtë, pa kallëpe në kantier.',
    foto: '/images/galeria/muri-l/m19.jpg',
    icon: FaShieldAlt,
    items: [
      { name: 'Muri L - 0.5m', image: '/images/produktet/ML1.jpeg' },
      { name: 'Muri L - 0.75m', image: '/images/produktet/ML2.jpeg' },
      { name: 'Muri L - 1m', image: '/images/produktet/ML3.jpeg' },
      { name: 'Muri L - 1.25m', image: '/images/produktet/ML4.jpeg' },
      { name: 'Muri L - 1.5 m', image: '/images/produktet/ML5.jpeg' },
      { name: 'Muri L - 1.75m', image: '/images/produktet/ML6.jpg' },
      { name: 'Muri L - 2m', image: '/images/produktet/ML6.jpg' },
    ]
  },
  {
    title: 'Gypa betoni',
    slug: 'gypa-betoni',
    pershkrimi: 'Gypa betoni për bunarë, kanalizime dhe infrastrukturë nëntokësore, në diametra nga 300 deri 1000 mm.',
    foto: '/images/katalogu/gypa.jpg',
    icon: FaRuler,
    items: [
      { name: 'Gyp betoni 300mm', image: '/images/produktet/GB1.jpg' },
      { name: 'Gyp betoni 400mm', image: '/images/produktet/GB1.jpg' },
      { name: 'Gyp betoni 500mm', image: '/images/produktet/GB1.jpg' },
      { name: 'Gyp betoni 600mm', image: '/images/produktet/GB1.jpg' },
      { name: 'Gyp betoni 800mm', image: '/images/produktet/GB1.jpg' },
      { name: 'Gyp betoni 1000mm', image: '/images/produktet/GB1.jpg' },
    ]
  },
  {
    title: 'Pllaka betoni',
    slug: 'pllaka-betoni',
    pershkrimi: 'Pllaka betoni për shtrimin e rrugëve, trotuareve, oborreve dhe hapësirave industriale.',
    foto: '/images/galeria/muri-l/m24.jpg',
    icon: FaBolt,
    items: [
      { name: 'Pllakë betoni - 80x30x8cm', image: '/images/produktet/P1.jpg' },
      { name: 'Pllakë betoni - 100x30x8cm', image: '/images/produktet/P2.jpg' },
      { name: 'Pllakë betoni - 150x30x8cm', image: '/images/produktet/P3.jpg' },
      { name: 'Pllakë betoni - 200x30x8cm', image: '/images/produktet/P4.jpg' },
      { name: 'Pllakë betoni - 80x50x8cm', image: '/images/produktet/P5.jpg' },
      { name: 'Pllakë betoni - 150x50x8cm', image: '/images/produktet/P6.jpg' },
      { name: 'Pllakë betoni - 200x50x8cm', image: '/images/produktet/P6.jpg' },
      { name: 'Pllakë betoni - 80x80x8xm', image: '/images/produktet/P6.jpg' },
      { name: 'Pllakë betoni - 100x80x8xm', image: '/images/produktet/P6.jpg' },
      { name: 'Pllakë betoni - 150x80x8xm', image: '/images/produktet/P6.jpg' },
      { name: 'Pllakë betoni - 200x80x8xm', image: '/images/produktet/P6.jpg' },
    ]
  },
  {
    title: 'Gypa plastike për puse',
    slug: 'gypa-plastike',
    pershkrimi: 'Gypa plastike për veshjen e puseve të ujit, në diametra nga 125 deri 250 mm.',
    foto: '/images/produktet/GP3.jpg',
    icon: FaWater,
    items: [
      { name: 'Gyp plastik 125mm', image: '/images/produktet/GP1.jpg' },
      { name: 'Gyp plastik 140mm', image: '/images/produktet/GP1.jpg' },
      { name: 'Gyp plastik 160mm', image: '/images/produktet/GP1.jpg' },
      { name: 'Gyp plastik 175mm', image: '/images/produktet/GP2.jpg' },
      { name: 'Gyp plastik 200mm', image: '/images/produktet/GP3.jpg' },
      { name: 'Gyp plastik 225mm', image: '/images/produktet/GP3.jpg' },
      { name: 'Gyp plastik 250mm', image: '/images/produktet/GP3.jpg' },
    ]
  },
  {
    title: 'Gypa hekuri',
    slug: 'gypa-hekuri',
    pershkrimi: 'Gypa hekuri — të galvanizuar dhe pa galvanizim — për puse dhe instalime.',
    foto: '/images/produktet/GH1.jpg',
    icon: FaCog,
    items: [
      { name: 'Gyp hekuri i galvanizuar', image: '/images/produktet/GH1.jpg' },
      { name: 'Gyp hekuri pa galvanizuar', image: '/images/produktet/GH2.jpg' },
    ]
  },
  {
    title: 'Elemente shpimi',
    slug: 'elemente-shpimi',
    pershkrimi: 'Elemente dhe vegla për makinat e shpimit.',
    foto: '/images/produktet/ESH2.jpg',
    icon: FaWrench,
    items: [
      { name: 'Element shpimi 1', image: '/images/produktet/ESH1.jpg' },
      { name: 'Element shpimi 2', image: '/images/produktet/ESH2.jpg' },
      { name: 'Element shpimi 3', image: '/images/produktet/ESH3.jpg' },
      { name: 'Element shpimi 4', image: '/images/produktet/ESH4.jpg' },
    ]
  },
  {
    title: 'Kosha armature',
    slug: 'kosha-armature',
    pershkrimi: 'Kafazë armature për pilota dhe diafragma, të prodhuar me makineri automatike sipas projektit.',
    foto: '/images/katalogu/armatura.jpg',
    icon: FaBolt,
    items: [
      { name: 'Kosh arme 1', image: '/images/produktet/KA1.jpg' },
      { name: 'Kosh arme 2', image: '/images/produktet/KA2.jpg' },
    ]
  },
  {
    title: 'Sajla (shufra hekuri)',
    slug: 'sajla',
    pershkrimi: 'Sajla në diametra nga 10 deri 24 mm.',
    foto: '/images/produktet/SH.jpg',
    icon: FaRuler,
    items: [
      { name: 'Sajla 10-24mm', image: '/images/produktet/SH.jpg' },
    ]
  }
]

