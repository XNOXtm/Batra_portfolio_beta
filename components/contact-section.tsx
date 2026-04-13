"use client"

import { useInView } from "@/hooks/use-in-view"
import { ArrowUpRight } from "lucide-react"

const socialLinks = [
  { name: "Contra", href: "#" },
  { name: "Behance", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "WhatsApp", href: "#" },
  { name: "Email", href: "mailto:hello@krishnab.com" },
]

export function ContactSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 })

  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-secondary/30">
      <div ref={ref} className="max-w-7xl mx-auto">
        {/* Main CTA */}
        <div className={`mb-24 ${isInView ? 'animate-fade-up opacity-100' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-light tracking-tight leading-[1.1] mb-12">
            <span className="block">Let&apos;s create</span>
            <span className="block italic font-serif">something great</span>
            <span className="block">together</span>
          </h2>
          
          <a 
            href="mailto:hello@krishnab.com"
            className="group inline-flex items-center gap-4 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:bg-accent transition-colors"
          >
            Start a Project
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        {/* Footer content */}
        <div className="grid md:grid-cols-3 gap-12 pt-12 border-t border-border">
          {/* Brand */}
          <div className={`${isInView ? 'animate-fade-up animation-delay-100 opacity-100' : 'opacity-0'}`}>
            <a href="#" className="inline-flex items-center gap-2 text-2xl">
              <span className="font-medium italic font-serif">KRISHNAB</span>
            </a>
          </div>

          {/* Social links */}
          <div className={`${isInView ? 'animate-fade-up animation-delay-200 opacity-100' : 'opacity-0'}`}>
            <h3 className="text-sm text-muted-foreground uppercase tracking-widest mb-6">Connect</h3>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider text-sm"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className={`${isInView ? 'animate-fade-up animation-delay-300 opacity-100' : 'opacity-0'}`}>
            <h3 className="text-sm text-muted-foreground uppercase tracking-widest mb-6">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Terms of service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
