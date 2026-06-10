'use client'
import { useState } from 'react'

const navLinks = [
  { href: '/#about',       label: 'About' },
  { href: '/#experiences', label: 'Experiences' },
  { href: '/events',       label: 'Events' },
  { href: '/gallery',      label: 'Gallery' },
  { href: '/#pricing',     label: 'Pricing' },
  { href: '/#contact',     label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-baseline gap-2">
          <span className="font-display text-grit-orange text-3xl leading-none">GRIT</span>
          <span className="font-body text-grit-white text-xs font-medium tracking-widest uppercase">Quad Arena</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-grit-white text-sm tracking-wide hover:text-grit-orange transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a href="/booking" className="grit-btn font-body text-sm font-semibold px-5 py-2">
            Book a Ride
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-grit-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-grit-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-grit-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-grit-black border-t border-grit-grey py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block font-body text-grit-white text-base px-6 py-3 hover:text-grit-orange transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="px-6 pt-3">
            <a
              href="/booking"
              onClick={() => setIsOpen(false)}
              className="grit-btn block text-center font-body text-sm font-semibold px-5 py-3"
            >
              Book a Ride
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
