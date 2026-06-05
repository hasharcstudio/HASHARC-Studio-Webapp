import React from 'react'
import Image from 'next/image'
import siteData from '@/data/site.json'

const { footer } = siteData

export default function Footer() {
  return (
    <section className='Footer-section bg-black'>
      <footer className='w-full bg-gradient-to-r from-[#000E03] via-[#092B1B] to-[#145F33] text-[#fff] pt-12 sm:pt-16 md:pt-20 lg:pt-[100px] pb-[30px] rounded-tl-[40px] sm:rounded-tl-[70px] md:rounded-tl-[100px] lg:rounded-tl-[125px] text-[13px] leading-[20px]'>
        {/* Container to center content and add horizontal padding */}
        <div className="container mx-auto px-4 sm:px-6">
          {/* Grid Layout: 1 column on mobile, 4 columns on large screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-8">

            {/* Column 1: Logo & About */}
            <div className="flex flex-col gap-4 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Image src="/Logo/Hasharc Logo.png" alt="Hasharc Studio" width={40} height={40} className="rounded" />
                <span className="text-2xl font-bold tracking-wider">{footer.companyName}</span>
              </div>
              <p className="opacity-80 leading-relaxed">
                We design and develop custom websites engineered to deliver measurable results.
                Contact us today to build a premium digital presence that transforms your business into a powerful brand.
              </p>
            </div>

            {/* Column 2: Office Info */}
            <div>
              <h4 className="relative text-lg font-semibold mb-4 pb-2 inline-block">Office<div className='overflow-hidden mt-2 relative h-[5px] w-full rounded-[3px] bg-[#767676]'><span className='absolute top-0 left-[10px] h-full w-[15px] rounded-[3px] bg-white animate-moving'></span></div></h4>
              <div className="space-y-2 opacity-80">
                {footer.office.address.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
                <p>{footer.office.email}</p>
                <p className='font-bold'>{footer.office.phone}</p>
              </div>
            </div>

            {/* Column 3: Links */}
            <div>
              <h4 className="relative text-lg font-semibold mb-4 pb-2 inline-block">Links<div className='overflow-hidden mt-2 relative h-[5px] w-full rounded-[3px] bg-[#767676]'><span className='absolute top-0 left-[10px] h-full w-[15px] rounded-[3px] bg-white animate-moving'></span></div></h4>
              <ul className="space-y-2 opacity-80">
                {footer.links.map((link) => (
                  <li key={link}>{link}</li>
                ))}
              </ul>
            </div>

            {/* Column 4: Newsletter & Social */}
            <div>
              <h4 className="relative text-lg font-semibold mb-4 pb-2 inline-block">Newsletter<div className='overflow-hidden mt-2 relative h-[5px] w-full rounded-[3px] bg-[#767676]'><span className='absolute top-0 left-[10px] h-full w-[15px] rounded-[3px] bg-white animate-moving'></span></div></h4>
              <p className="opacity-80 mb-4">Stay updated with our latest news.</p>
              <input type="email" placeholder="Email" className="bg-white/10 border border-white/20 px-3 py-3 rounded w-full outline-none focus:border-white text-base min-h-[44px]" />
              <div className="flex flex-wrap gap-4 mt-5 justify-center sm:justify-start">
                {footer.socialLinks.map((social) => (
                  <a key={social.label} href={social.href} className="opacity-70 hover:opacity-100 transition-opacity p-2 -m-2" aria-label={social.label}>
                    <Image src={social.icon} alt={social.label} width={22} height={22} />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
        <hr className="my-8 border-white/20" ></hr>

        <div className="text-center opacity-70">
          &copy; {new Date().getFullYear()} {footer.companyName}. All rights reserved.
        </div>

      </footer>
    </section>

  )
}
