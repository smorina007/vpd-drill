import Link from 'next/link'
import { FaHome, FaSearch, FaPhone } from 'react-icons/fa'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a4f5a] via-[#256D7B] to-[#1a4f5a] px-4">
      <div className="text-center max-w-lg">
        <p className="text-white/40 text-8xl sm:text-9xl font-black mb-2">404</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Kjo faqe s'u gjet
        </h1>
        <p className="text-white/70 text-base sm:text-lg mb-8">
          Ndoshta linku ka ndryshuar ose faqja është zhvendosur. Provo njërën nga
          këto opsione:
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-white text-[#256D7B] px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition"
          >
            <FaHome /> Kthehu në Ballinë
          </Link>
          <Link
            href="/sherbimet"
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-white/20 transition"
          >
            <FaSearch /> Shiko Shërbimet
          </Link>
          <Link
            href="/kontakti"
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-white/20 transition"
          >
            <FaPhone /> Na Kontakto
          </Link>
        </div>
      </div>
    </div>
  )
}
