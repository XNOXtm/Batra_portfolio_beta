"use client"

import { useState, useEffect } from "react"

const navLinks = [
  { name: "projects", href: "#projects" },
  { name: "services", href: "#services" },
  { name: "studio", href: "#studio" },
]

const socialLinks = [
  { name: "Behance", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "WhatsApp", href: "#" },
  { name: "Email", href: "mailto:hello@studio.com" },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? "bg-background/90 backdrop-blur-md" 
            : "bg-transparent"
        }`}
      >
        <nav className="flex items-center justify-between px-6 md:px-12 lg:px-24 py-6">
          <a href="#" className="text-sm tracking-tight flex items-center gap-2">
            <span className="font-medium italic font-serif">KRISHNAB</span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8 text-sm">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className="text-muted-foreground hover:text-foreground transition-colors lowercase"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-px bg-foreground transition-transform ${menuOpen ? 'rotate-45 translate-y-1' : ''}`} />
            <span className={`w-6 h-px bg-foreground transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-px bg-foreground transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-background transition-transform duration-500 md:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col justify-between h-full pt-24 pb-12 px-6">
          <ul className="space-y-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  onClick={() => setMenuOpen(false)}
                  className="text-4xl font-light lowercase hover:text-accent transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="space-y-6">
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {socialLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  className="hover:text-foreground transition-colors uppercase tracking-wider"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
