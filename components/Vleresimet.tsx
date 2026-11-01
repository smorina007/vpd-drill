'use client'

import { FaGoogle, FaFacebookF, FaYoutube, FaExternalLinkAlt, FaPen } from 'react-icons/fa'
import { useMjete } from '@/app/context/MjeteContext'
import SectionHeading from './ui/SectionHeading'
import { FACEBOOK_URL, YOUTUBE_URL, GOOGLE_PROFILE_URL, GOOGLE_REVIEW_URL } from '@/lib/site'
import { trackEvent } from '@/lib/gtag'

/**
 * Vlerësimet e klientëve. Nuk shfaqim vlerësime të shkruara në kod —
 * vlerësimet reale jetojnë në profilin e biznesit në Google dhe në Facebook,
 * prandaj seksioni i dërgon vizitorët atje për t'i lexuar dhe për të lënë një.
 */
export default function Vleresimet() {
  const { hap } = useMjete()

  return (
    <section id="vleresimet" data-shtresa="Vlerësimet" className="bg-stone py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          title="Vlerësimet e Klientëve"
          lede="Lexoni çfarë thonë klientët tanë realë — ose ndani përvojën tuaj me VPD DRILL"
        />

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          {/* Google */}
          <div className="relative overflow-hidden rounded-xl bg-white p-7 ring-1 ring-stone-line sm:p-10">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-stone text-2xl text-brand">
                <FaGoogle />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-mute">Profili i biznesit në Google</p>
                <p className="text-2xl font-extrabold text-bedrock">VPD DRILL</p>
              </div>
            </div>
            <p className="mt-6 max-w-[52ch] text-[17px] leading-relaxed text-slate-ink">
              Vlerësimet e klientëve tanë janë publike në Google Maps. Nëse keni punuar me ne, një vlerësim i juaji ndihmon
              klientët e tjerë të na gjejnë dhe të zgjedhin me besim.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('click_google_review', { location: 'vleresimet' })}
                className="btn-brand px-7"
              >
                <FaPen className="text-sm" /> Na vlerësoni në Google
              </a>
              <a
                href={GOOGLE_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('click_google_profile', { location: 'vleresimet' })}
                className="btn-ghost px-6"
              >
                Lexoni vlerësimet <FaExternalLinkAlt className="text-xs" />
              </a>
            </div>
          </div>

          <div className="grid gap-5">
            {/* Facebook */}
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('click_facebook', { location: 'vleresimet' })}
              className="group flex items-center gap-5 rounded-xl bg-bedrock p-7 text-white transition-colors hover:bg-bedrock-2"
            >
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white/10 text-xl transition-colors group-hover:bg-brand">
                <FaFacebookF />
              </span>
              <span>
                <span className="block text-lg font-bold">Na ndiqni në Facebook</span>
                <span className="mt-1 block text-sm text-white/65">Foto dhe video nga punimet tona më të fundit</span>
              </span>
            </a>

            {/* YouTube */}
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('click_youtube', { location: 'vleresimet' })}
              className="group flex items-center gap-5 rounded-xl bg-bedrock p-7 text-white transition-colors hover:bg-bedrock-2"
            >
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white/10 text-xl transition-colors group-hover:bg-[#FF0000]">
                <FaYoutube />
              </span>
              <span>
                <span className="block text-lg font-bold">Shikoni videot në YouTube</span>
                <span className="mt-1 block text-sm text-white/65">Shpime, pilota dhe diafragmë — video të plota nga kantieret</span>
              </span>
            </a>

            {/* Vlerësim në faqe */}
            <div className="flex flex-col justify-between rounded-xl bg-white p-7 ring-1 ring-stone-line">
              <div>
                <p className="text-lg font-bold text-bedrock">Preferoni të na shkruani direkt?</p>
                <p className="mt-1 text-sm text-slate-mute">Na dërgoni mendimin tuaj këtu — e lexojmë çdo mesazh.</p>
              </div>
              <button type="button" onClick={() => hap('vleresime')} className="btn-ghost mt-5 self-start px-6">
                Lini një vlerësim këtu
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
