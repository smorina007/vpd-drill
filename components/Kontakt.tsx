'use client'

import { useRef, FormEvent, useState } from 'react'
import emailjs from '@emailjs/browser'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'

export default function Kontakt() {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSending, setIsSending] = useState(false)

  const sendEmail = (e: FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return

    setIsSending(true)
    emailjs.sendForm(
      'service_zeb6qid',        // Service ID
      'template_0nq26v9',        // Template ID
      formRef.current,
      'aR9ZoxPckNpDYj9ZR'        // Public Key
    ).then(
      () => {
        alert('Mesazhi u dërgua me sukses!')
        formRef.current?.reset()
      },
      (error) => {
        console.error('EmailJS error:', error)
        alert('Dërgimi dështoi. Provo përsëri.')
      }
    ).finally(() => setIsSending(false))
  }

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
                    <p className="text-gray-600">044 184 114</p>
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

              {/* Social Media */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Na ndiqni në rrjete sociale</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com/VllezeritPaqarizi"  // ← URL e saktë e faqes së biznesit
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#256D7B]/10 rounded-full flex items-center justify-center hover:bg-[#256D7B] hover:text-white transition-all duration-300 group"
                    aria-label="Facebook"
                  >
                    <FaFacebook className="text-[#256D7B] group-hover:text-white text-2xl" />
                  </a>
                  <a
                    href="https://instagram.com/vpddrill"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#256D7B]/10 rounded-full flex items-center justify-center hover:bg-[#256D7B] hover:text-white transition-all duration-300 group"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="text-[#256D7B] group-hover:text-white text-2xl" />
                  </a>
                  <a
                    href="https://linkedin.com/company/vpddrill"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#256D7B]/10 rounded-full flex items-center justify-center hover:bg-[#256D7B] hover:text-white transition-all duration-300 group"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="text-[#256D7B] group-hover:text-white text-2xl" />
                  </a>
                  <a
                    href="https://youtube.com/@vpddrill"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#256D7B]/10 rounded-full flex items-center justify-center hover:bg-[#256D7B] hover:text-white transition-all duration-300 group"
                    aria-label="YouTube"
                  >
                    <FaYoutube className="text-[#256D7B] group-hover:text-white text-2xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Dërgo Mesazh</h2>

            <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
              {/* Fusha të fshehta nëse do të dërgohen te template */}
              <input type="hidden" name="to_email" value="info@vllezeritpaqarizi.com" />

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Emri dhe Mbiemri</label>
                <input
                  type="text"
                  name="user_name"
                  id="name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B] focus:border-transparent"
                  placeholder="Shkruani emrin tuaj"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="user_email"
                  id="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B] focus:border-transparent"
                  placeholder="shkruaj@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Telefoni (opsional)</label>
                <input
                  type="tel"
                  name="user_phone"
                  id="phone"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B] focus:border-transparent"
                  placeholder="044 XXX XXX"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subjekti (opsional)</label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B] focus:border-transparent"
                  placeholder="Subjekti i mesazhit"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Mesazhi</label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B] focus:border-transparent"
                  placeholder="Shkruani mesazhin tuaj..."
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full bg-gradient-to-r from-[#256D7B] to-[#1a4f5a] text-white px-6 py-4 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? 'Duke dërguar...' : 'Dërgo Mesazhin'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}