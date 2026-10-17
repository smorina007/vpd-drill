import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-svh-safe items-center overflow-hidden bg-bedrock text-white">
      <div className="shell pt-[var(--header-h)]">
        <p className="text-[clamp(6rem,22vw,16rem)] font-black leading-none font-xwide text-white/10 tabular">404</p>
        <h1 className="display-lg -mt-6 text-white sm:-mt-12">Kjo faqe s&apos;u gjet</h1>
        <p className="mt-5 max-w-[52ch] text-lg text-white/70">
          Ndoshta linku ka ndryshuar ose faqja është zhvendosur. Provo njërën nga këto opsione:
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn-signal px-6 py-3.5">
            Kthehu në Ballinë
          </Link>
          <Link href="/sherbimet" className="btn-ghost-light px-6 py-3.5">
            Shiko Shërbimet
          </Link>
          <Link href="/kontakti" className="btn-ghost-light px-6 py-3.5">
            Na Kontakto
          </Link>
        </div>
      </div>
    </section>
  )
}
