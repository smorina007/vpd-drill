import Link from 'next/link'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaHeart } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              VPD<span className="text-[#256D7B]"> DRILL</span>
            </h3>
            <p className="text-gray-400 mb-4">
              Ekspertizë e thellë, themele të sigurta. Specialiste në shpime dhe produkte betoni.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/VllezeritPaqarizi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#256D7B]/10 rounded-lg flex items-center justify-center hover:bg-[#256D7B] hover:text-white transition-all duration-300 group"
                aria-label="Facebook"
              >
                <FaFacebook className="text-[#256D7B] group-hover:text-white text-xl" />
              </a>
              <a
                href="https://instagram.com/vpddrill"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#256D7B]/10 rounded-lg flex items-center justify-center hover:bg-[#256D7B] hover:text-white transition-all duration-300 group"
                aria-label="Instagram"
              >
                <FaInstagram className="text-[#256D7B] group-hover:text-white text-xl" />
              </a>
              <a
                href="https://linkedin.com/company/vpddrill"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#256D7B]/10 rounded-lg flex items-center justify-center hover:bg-[#256D7B] hover:text-white transition-all duration-300 group"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-[#256D7B] group-hover:text-white text-xl" />
              </a>
              <a
                href="https://youtube.com/@vpddrill"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#256D7B]/10 rounded-lg flex items-center justify-center hover:bg-[#256D7B] hover:text-white transition-all duration-300 group"
                aria-label="YouTube"
              >
                <FaYoutube className="text-[#256D7B] group-hover:text-white text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Linke të shpejta</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-[#256D7B] transition">Ballina</Link></li>
              <li><Link href="/sherbimet" className="text-gray-400 hover:text-[#256D7B] transition">Shërbimet</Link></li>
              <li><Link href="/produktet" className="text-gray-400 hover:text-[#256D7B] transition">Produktet</Link></li>
              <li><Link href="/projektet" className="text-gray-400 hover:text-[#256D7B] transition">Projektet</Link></li>
              <li><Link href="/kontakti" className="text-gray-400 hover:text-[#256D7B] transition">Kontakti</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontakti</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <FaPhone className="mr-3 text-[#256D7B]" />
                <span>044 184 114</span>
              </li>
              <li className="flex items-center text-gray-400">
                <FaPhone className="mr-3 text-[#256D7B]" />
                <span>044 204 877</span>
              </li>
              <li className="flex items-center text-gray-400">
                <FaPhone className="mr-3 text-[#256D7B]" />
                <span>045 700 201</span>
              </li>
              <li className="flex items-center text-gray-400">
                <FaEnvelope className="mr-3 text-[#256D7B]" />
                <span>info@vllezeritpaqarizi.com</span>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Adresa</h4>
            <div className="flex items-start text-gray-400">
              <FaMapMarkerAlt className="mr-3 mt-1 text-[#256D7B] flex-shrink-0" />
              <span>Fsh Dragobil, 24000 Malisheve, Kosovë</span>
            </div>
          </div>
        </div>

        {/* Dedication - Pjesa e re e veçantë */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center space-x-2 text-[#256D7B] mb-4">
              <FaHeart className="text-2xl animate-pulse" />
              <span className="text-sm uppercase tracking-wider">DEDIKIM I VEÇANTË</span>
              <FaHeart className="text-2xl animate-pulse" />
            </div>
            <p className="text-gray-300 italic text-lg leading-relaxed">
              "Për ty, frymëzim i çdo dite."
            </p>
            <div className="mt-4 text-gray-400 text-sm">
              <p>Me shumë dashuri dhe mirënjohje,</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} VPD DRILL. Të gjitha të drejtat e rezervuara.</p>
          <p className="text-sm text-gray-500 mt-2">Project by Selami Morina</p>
        </div>
      </div>
    </footer>
  )
}