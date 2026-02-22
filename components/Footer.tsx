import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">VPD DRILL</h3>
            <p className="text-gray-400">Ekspertizë e thellë, themele të sigurta.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Kontakti</h4>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center"><FaPhone className="mr-2 text-[#256D7B]" /> 044 184 1144</p>
              <p className="flex items-center"><FaPhone className="mr-2 text-[#256D7B]" /> 044 204 877</p>
              <p className="flex items-center"><FaEnvelope className="mr-2 text-[#256D7B]" /> info@vllezeritpaqarizi.com</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Adresa</h4>
            <p className="flex items-center text-gray-400">
              <FaMapMarkerAlt className="mr-2 text-[#256D7B]" /> Fsh Dragobil, Malisheve
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2026 VPD DRILL. Të gjitha të drejtat e rezervuara.</p>
        </div>
      </div>
    </footer>
  )
}