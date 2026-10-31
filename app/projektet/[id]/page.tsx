import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import FaqjaProjekteve from '@/components/FaqjaProjekteve'
import { teGjithaMediat } from '@/lib/galeriaMedia'

/**
 * /projektet/<id> — linku që shpërndahet për një foto/video të vetme.
 * Ka parapamjen e vet (foto + titull) në WhatsApp/Facebook dhe e hap direkt në galeri.
 */
export function generateStaticParams() {
  return teGjithaMediat.map((m) => ({ id: m.id }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const m = teGjithaMediat.find((x) => x.id === id)
  if (!m) return {}
  const foto = m.lloji === 'video' ? m.poster! : m.src
  const pershkrimi = `${m.lloji === 'video' ? 'Video' : 'Foto'} nga kantieri i VPD DRILL — ${m.kategoria}${m.lokacioni ? `, ${m.lokacioni}` : ''}.`
  return {
    title: `${m.titulli} — Projektet`,
    description: pershkrimi,
    alternates: { canonical: '/projektet' },
    robots: { index: false, follow: true },
    openGraph: {
      title: `${m.titulli} — VPD DRILL`,
      description: pershkrimi,
      url: `/projektet/${id}`,
      images: [{ url: foto, alt: m.titulli }],
      ...(m.lloji === 'video' ? { videos: [{ url: `https://vpddrill.com${m.src}`, type: 'video/mp4' }] } : {}),
    },
    twitter: { card: 'summary_large_image', images: [foto] },
  }
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!teGjithaMediat.some((m) => m.id === id)) notFound()
  return <FaqjaProjekteve hapId={id} />
}
