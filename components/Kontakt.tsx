import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram } from 'react-icons/fa'

export default function Kontakt() {
  return (
    <section className="pt-32 pb-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Kontakti
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Jemi në dispozicion për çdo pyetje apo kërkesë
          </p>
          <div className="w-32 h-1.5 bg-gradient-to-r from-[#256D7B] to-[#1a4f5a] mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Informacioni i Kontaktit</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#256D7B]/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <FaPhone className="text-xl text-[#256D7B]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Telefon</h3>
                    <p className="text-gray-600">044 184 1144</p>
                    <p className="text-gray-600">044 204 877</p>
                    <p className="text-gray-600">045 700 201</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#256D7B]/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <FaEnvelope className="text-xl text-[#256D7B]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">info@vllezeritpaqarizi.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#256D7B]/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <FaMapMarkerAlt className="text-xl text-[#256D7B]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Adresa</h3>
                    <p className="text-gray-600">Fsh Dragobil, 24000 Malisheve, Kosovë</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#256D7B]/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <FaClock className="text-xl text-[#256D7B]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Orari i Punës</h3>
                    <p className="text-gray-600">Hënë - Shtunë: 07:00 - 19:00</p>
                    <p className="text-gray-600">Die: Pushim</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <a href="#" className="w-10 h-10 bg-[#256D7B]/10 rounded-lg flex items-center justify-center hover:bg-[#256D7B] hover:text-white transition group">
                  <FaFacebook className="text-[#256D7B] group-hover:text-white" />
                </a>
                <a href="#" className="w-10 h-10 bg-[#256D7B]/10 rounded-lg flex items-center justify-center hover:bg-[#256D7B] hover:text-white transition group">
                  <FaInstagram className="text-[#256D7B] group-hover:text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Dërgo Mesazh</h2>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Emri dhe Mbiemri</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B] focus:border-transparent"
                  placeholder="Shkruani emrin tuaj"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B] focus:border-transparent"
                  placeholder="shkruaj@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefoni</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B] focus:border-transparent"
                  placeholder="044 XXX XXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subjekti</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B] focus:border-transparent"
                  placeholder="Subjekti i mesazhit"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mesazhi</label>
                <textarea
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B] focus:border-transparent"
                  placeholder="Shkruani mesazhin tuaj..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#256D7B] to-[#1a4f5a] text-white px-6 py-4 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Dërgo Mesazhin
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}