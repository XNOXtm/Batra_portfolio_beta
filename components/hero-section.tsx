"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { CursorGallery } from "./cursor-gallery"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    setMounted(true)

    // GSAP entrance animations
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

      // Animate title words
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll(".title-word")
        tl.fromTo(
          words,
          { 
            y: 120, 
            opacity: 0,
            rotateX: 45,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.08,
            ease: "power4.out",
          }
        )
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <CursorGallery>
      <section 
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-24 overflow-hidden"
      >
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className={`mb-6 overflow-hidden ${mounted ? 'animate-fade-up opacity-100' : 'opacity-0'}`}>
            <span className="text-muted-foreground text-sm md:text-base tracking-wide block">
              we are
            </span>
          </div>

          <h1 
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl xl:text-[10rem] font-light tracking-tight leading-[0.95]"
            style={{ perspective: "1000px" }}
          >
            <span className="block overflow-hidden">
              <span className="title-word inline-block">a</span>{" "}
              <span className="title-word inline-block uppercase">full-service</span>
            </span>
            <span className="block uppercase overflow-hidden">
              <span className="title-word inline-block italic font-serif font-normal">design</span>{" "}
              <span className="title-word inline-block">studio</span>
            </span>
          </h1>

          <div 
            className={`mt-12 md:mt-20 flex flex-col md:flex-row md:items-end justify-between gap-8 ${mounted ? 'animate-fade-up animation-delay-500 opacity-100' : 'opacity-0'}`}
          >
            <p className="text-muted-foreground text-base md:text-lg max-w-md leading-relaxed">
              We craft iconic brands and digital products that connect with people and drive business growth. Move your cursor to explore.
            </p>
            
            <a 
              href="#scroll-gallery" 
              className="group inline-flex items-center gap-3 text-foreground text-sm uppercase tracking-widest hover:text-accent transition-colors"
            >
              <span className="w-8 h-px bg-foreground group-hover:w-12 group-hover:bg-accent transition-all" />
              View Projects
            </a>
          </div>
        </div>

        {/* Decorative scroll indicator */}
        <div 
          className={`absolute bottom-8 right-8 md:right-24 text-xs text-muted-foreground tracking-widest ${mounted ? 'animate-fade-in animation-delay-700 opacity-100' : 'opacity-0'}`}
        >
          <div className="flex flex-col items-end gap-1">
            <span>Scroll</span>
            <div className="w-px h-12 bg-muted-foreground/30 relative overflow-hidden">
              <div className="absolute inset-0 w-full bg-accent animate-pulse" 
                style={{ 
                  animation: 'scrollIndicator 2s ease-in-out infinite',
                }} 
              />
            </div>
          </div>
        </div>

        {/* Background gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] bg-radial-gradient opacity-30" />
        </div>
      </section>
    </CursorGallery>
  )
}
