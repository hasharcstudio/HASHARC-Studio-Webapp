'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import siteData from '@/data/site.json'
import ScrollReveal from '@/components/ui/ScrollReveal'

const { contactInfo, socialLinks } = siteData

export default function Contact() {
  const [formData, setFormData] = useState({
    fname: '', lname: '', email: '', phone: '', message: '', website: ''
  })
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState(null) // 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setStatus(null)
    setErrorMessage('')

    // Validate fields on client side
    if (!formData.fname.trim() || !formData.lname.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setStatus('error')
      setErrorMessage('All fields are required.')
      setSending(false)
      return
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setErrorMessage('')
        setFormData({ fname: '', lname: '', email: '', phone: '', message: '', website: '' })
        // Auto-clear success message after 5 seconds
        setTimeout(() => setStatus(null), 5000)
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'Failed to send message. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('Failed to send message. Please check your connection and try again.')
      console.error('Contact form error:', error)
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="relative bg-black py-20 md:py-28 overflow-hidden" aria-labelledby="contact-heading">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

          {/* Left Column - Contact Info */}
          <ScrollReveal className="lg:w-1/2 flex flex-col">
            {/* Section Title */}
            <div className="mb-10">
              <p className="text-emerald-400 font-semibold text-sm uppercase tracking-widest mb-3">
                Get in touch
              </p>
              <h2 id="contact-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
                Get In Touch With Us
              </h2>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-lg">
                Each team member brings a unique set of skills, combining creativity with strategy to deliver innovative solutions that make an impact. With years of industry experience.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="flex flex-col gap-4 mb-10">
              {/* Phone */}
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-5 hover:border-emerald-500/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <Image src="/icons/icon-phone-black.svg" alt="Phone" width={22} height={22} className="invert" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm mb-1">Phone number</h4>
                  <Link href={`tel:${contactInfo.phone}`} className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                    {contactInfo.phone}
                  </Link>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-5 hover:border-emerald-500/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <Image src="/icons/icon-mail-black.svg" alt="Email" width={22} height={22} className="invert" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm mb-1">Email address</h4>
                  <Link href={`mailto:${contactInfo.email}`} className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                    {contactInfo.email}
                  </Link>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-5 hover:border-emerald-500/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <Image src="/icons/icon-clock-black.svg" alt="Availability" width={22} height={22} className="invert" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm mb-1">Availability</h4>
                  <p className="text-gray-400 text-sm">{contactInfo.availability}</p>
                </div>
              </div>
            </div>
            <hr className="my-8 border-white/20" ></hr>

            {/* Social Media */}
            <div>
              <h3 className="text-white font-semibold text-sm mb-4">Social Media:</h3>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/20 border border-white/10 flex items-center justify-center hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all"
                  >
                    <Image src={social.icon} alt={social.label} width={18} height={18} className="invert opacity-70" />
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column - Contact Form */}
          <ScrollReveal className="lg:w-1/2" delay={150}>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-8 md:p-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8">
                Have A Project In Mind?{' '}
                <span className="text-emerald-400">Let&apos;s Talk</span>
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot field — hidden from real users, bots will fill it */}
                <div className="absolute opacity-0 -z-10" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      First Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="fname"
                      value={formData.fname}
                      onChange={handleChange}
                      placeholder="First Name"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/25 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Last Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="lname"
                      value={formData.lname}
                      onChange={handleChange}
                      placeholder="Last Name"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/25 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/25 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/25 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Type Your Message"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/25 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold py-3 px-8 rounded-lg transition-colors cursor-pointer"
                >
                  {sending ? 'Sending...' : 'Send Message'}
                </button>

                {status === 'success' && (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                    <p className="text-emerald-400 text-sm font-medium">✓ Message sent successfully! We'll get back to you soon.</p>
                  </div>
                )}
                {status === 'error' && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-red-400 text-sm font-medium">✕ {errorMessage}</p>
                  </div>
                )}
              </form>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}
