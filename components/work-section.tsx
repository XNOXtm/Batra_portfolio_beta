"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    title: "Ether",
    category: "Full Brand Launch",
    image: "/projects/project-1.jpg",
    href: "#",
  },
  {
    title: "Uilliam's",
    category: "Full Brand Launch",
    image: "/projects/project-2.jpg",
    href: "#",
  },
  {
    title: "Inspiro Restaurant",
    category: "Branding",
    image: "/projects/project-3.jpg",
    href: "#",
  },
  {
    title: "AdAstra",
    category: "Branding",
    image: "/projects/project-4.jpg",
    href: "#",
  },
]

export function WorkSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const viewAllRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    gsap.registerPlugin(ScrollTrigger)

    // 1) GSAP masking reveal for titles
    const ctx = gsap.context(() => {
      const revealEls = Array.from(section.querySelectorAll<HTMLElement>(".title-reveal"))
      revealEls.forEach((el) => {
        gsap.set(el, {
          opacity: 0,
          y: 28,
          scaleX: 0,
          transformOrigin: "left center",
        })

        gsap.to(el, {
          opacity: 1,
          y: 0,
          scaleX: 1,
          ease: "power3.out",
          duration: 0.95,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 60%",
            scrub: false,
          },
        })
      })

      if (viewAllRef.current) {
        gsap.set(viewAllRef.current, { opacity: 0, y: 22 })
        gsap.to(viewAllRef.current, {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: "top 55%",
          },
        })
      }
    }, section)

    // 2) Hover distortion vars for the “liquid/grainy” hover feel
    const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-project-card]"))
    const cleanupFns: Array<() => void> = []

    cards.forEach((card) => {
      let rafId: number | null = null
      let lastX = 0
      let lastY = 0

      const commit = () => {
        rafId = null
        const rect = card.getBoundingClientRect()
        const mx = Math.min(1, Math.max(0, (lastX - rect.left) / rect.width))
        const my = Math.min(1, Math.max(0, (lastY - rect.top) / rect.height))
        card.style.setProperty("--mx", String(mx))
        card.style.setProperty("--my", String(my))
      }

      const onMove = (e: PointerEvent) => {
        lastX = e.clientX
        lastY = e.clientY
        if (rafId) return
        rafId = window.requestAnimationFrame(commit)
      }

      card.addEventListener("pointermove", onMove)
      cleanupFns.push(() => {
        card.removeEventListener("pointermove", onMove)
        if (rafId) window.cancelAnimationFrame(rafId)
      })
    })

    // Ensure correct layout after mount animations.
    ScrollTrigger.refresh()

    return () => {
      cleanupFns.forEach((fn) => fn())
      ctx.revert()
    }
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] mb-6">
            <span className="italic font-serif title-mask inline-block overflow-hidden">
              <span className="title-reveal inline-block">projects</span>
            </span>
          </h2>

          <div className="max-w-2xl">
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              We&apos;ve completed 100+ projects over the years, and these are some of our favourites
            </p>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.href}
              data-project-card
              data-view-cursor
              className="group block cursor-none"
            >
              <article className="relative">
                {/* Image container */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-6 bg-secondary">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:grayscale group-hover:saturate-0 group-hover:contrast-[1.2] group-hover:brightness-[0.9]"
                  />

                  {/* Liquid/grainy distortion layer (follows mouse via --mx/--my) */}
                  <div
                    className="project-distortion-layer pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />

                  {/* Grain texture */}
                  <div className="noise-overlay pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 mix-blend-overlay" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500 pointer-events-none" />

                  {/* Arrow indicator */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 pointer-events-none">
                    <div className="p-3 bg-foreground text-background rounded-full">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Project info */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-light mb-2 group-hover:text-accent transition-colors">
                      <span className="overflow-hidden inline-block">
                        <span className="title-reveal inline-block">{project.title}</span>
                      </span>
                    </h3>
                    <p className="text-sm text-muted-foreground">{project.category}</p>
                  </div>
                </div>
              </article>
            </a>
          ))}
        </div>

        {/* View all link */}
        <div className="mt-16 md:mt-24 text-center">
          <a
            ref={viewAllRef}
            href="#"
            className="group inline-flex items-center gap-3 text-foreground text-sm uppercase tracking-widest hover:text-accent transition-colors"
          >
            View All Projects
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}
