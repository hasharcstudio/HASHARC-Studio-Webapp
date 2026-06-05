'use client'

import Link from 'next/link'
import Image from 'next/image'
import React, { useState, useEffect, useCallback } from 'react'
import ContactUsButton from '../ui/Contact-Us-Button'
import siteData from '@/data/site.json'

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [servicesOpen, setServicesOpen] = useState(false)

    // Close menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) setMenuOpen(false)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [menuOpen])

    const closeMenu = useCallback(() => {
        setMenuOpen(false)
        setServicesOpen(false)
    }, [])

    return (
        <>
            {/* Navbar bar */}
            <div className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6">
                <div className="max-w-7xl bg-[rgba(7,39,39,0.58)] mx-auto px-4 sm:px-6 py-4 mt-3 shadow-md rounded-lg flex items-center text-white backdrop-blur-sm">
                    <div className='flex items-center justify-between w-full'>
                        {/* Left: Logo */}
                        <div className='logo text-xl font-bold'>
                            <Link href="/" className="flex items-center gap-2">
                                <Image src="/Logo/Hasharc Logo.png" alt="Hasharc Studio" width={36} height={36} className="rounded" priority />
                                Hasharc Studio
                            </Link>
                        </div>

                        {/* Center: Main Navigation — hidden on mobile */}
                        <nav className='hidden lg:flex flex-grow justify-center'>
                            <ul className='flex space-x-8 font-medium'>
                                <li><Link href="#home" className="hover:text-green-700 transition-colors duration-300">Home</Link></li>

                                <li className="relative group">
                                    <Link href="#services" className="hover:text-green-700 transition-colors duration-300">
                                        Services <span className="text-xs">&#9660;</span>
                                    </Link>
                                    <ul className="absolute top-full left-0 mt-2 w-48 bg-[rgba(7,39,39,0.9)] backdrop-blur-sm rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                                        {siteData.servicesList.map((item) => (
                                            <li key={item}><Link href="#services" className="block px-4 py-2 hover:text-green-700 hover:bg-white/10 transition-colors duration-300">{item}</Link></li>
                                        ))}
                                    </ul>
                                </li>

                                <li><Link href="#reviews" className="hover:text-green-700 transition-colors duration-300">Review</Link></li>
                                <li><Link href="#process" className="hover:text-green-700 transition-colors duration-300">Process</Link></li>
                            </ul>
                        </nav>

                        {/* Right: Contact Us — hidden on mobile */}
                        <div className='hidden lg:block contact-link'>
                            <Link href="#contact" className="hover:text-green-700 font-medium transition-colors duration-300">
                                <ContactUsButton />
                            </Link>
                        </div>

                        {/* Hamburger button — visible on mobile only */}
                        <button
                            className="lg:hidden relative w-11 h-11 flex flex-col justify-center items-center gap-1.5 cursor-pointer z-[60] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md"
                            onClick={() => setMenuOpen(prev => !prev)}
                            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={menuOpen}
                        >
                            <span className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
                            <span className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                            <span className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile overlay — separate from navbar to avoid overflow issues */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[55] lg:hidden"
                    onClick={closeMenu}
                />
            )}

            {/* Mobile slide-in panel — separate from navbar */}
            {menuOpen && (
                <nav className="fixed top-0 right-0 h-full w-72 sm:w-80 bg-[rgba(7,39,39,0.95)] backdrop-blur-md z-[58] lg:hidden animate-slide-in-right">
                    <div className="flex flex-col h-full pt-24 px-6 pb-8 overflow-y-auto">
                        <ul className="flex flex-col space-y-2 font-medium text-white text-lg">
                            <li>
                                <Link href="#home" onClick={closeMenu} className="block py-3 px-2 rounded-lg hover:bg-white/10 hover:text-green-400 transition-colors duration-200">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <button
                                    className="flex items-center justify-between w-full py-3 px-2 rounded-lg hover:bg-white/10 hover:text-green-400 transition-colors duration-200 cursor-pointer"
                                    onClick={() => setServicesOpen(prev => !prev)}
                                >
                                    Services
                                    <span className={`text-xs transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}>&#9660;</span>
                                </button>
                                <ul className={`ml-4 overflow-hidden transition-all duration-300 ${servicesOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    {siteData.servicesList.map((item) => (
                                        <li key={item}>
                                            <Link href="#services" onClick={closeMenu} className="block py-2 px-2 text-base text-gray-300 hover:text-green-400 hover:bg-white/5 rounded transition-colors duration-200">
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li>
                                <Link href="#reviews" onClick={closeMenu} className="block py-3 px-2 rounded-lg hover:bg-white/10 hover:text-green-400 transition-colors duration-200">
                                    Review
                                </Link>
                            </li>
                            <li>
                                <Link href="#process" onClick={closeMenu} className="block py-3 px-2 rounded-lg hover:bg-white/10 hover:text-green-400 transition-colors duration-200">
                                    Process
                                </Link>
                            </li>
                        </ul>
                        <div className="mt-auto pt-6">
                            <Link href="#contact" onClick={closeMenu} className="block">
                                <ContactUsButton />
                            </Link>
                        </div>
                    </div>
                </nav>
            )}
        </>
    )
}
