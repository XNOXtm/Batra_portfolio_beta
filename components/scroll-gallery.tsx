"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const scrollImages = [
  {
    src: "/projects/project-1.jpg",
    title: "Ether",
    category: "Full Brand Launch",
  },
  {
    src: "/projects/project-2.jpg", 
    title: "Uilliam's",
    category: "Full Brand Launch",
  },
  {
    src: "/projects/project-3.jpg",
    title: "Inspiro",
    category: "Branding",
  },
  {
    src: "/projects/project-4.jpg",
    title: "AdAstra",
    category: "Branding",
  },
]

export function ScrollGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const horizontalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const horizontal = horizontalRef.current
    if (!container || !horizontal) return

    const ctx = gsap.context(() => {
      // Horizontal scroll animation
      const scrollWidth = horizontal.scrollWidth - window.innerWidth

      const horizontalTween = gsap.to(horizontal, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })

      // Animate each image card
      const cards = horizontal.querySelectorAll(".scroll-card")
      cards.forEach((card, i) => {
        const image = card.querySelector(".scroll-image")
        const category = card.querySelector(".scroll-gallery-category")
        const title = card.querySelector(".scroll-gallery-title-reveal")

        // Parallax effect on images
        gsap.fromTo(
          image,
          { scale: 1.3 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: "left right",
              end: "right left",
              scrub: 1,
            },
          }
        )

        // Title masking reveal + slide
        if (title instanceof HTMLElement) {
          gsap.set(title, {
            opacity: 0,
            y: 28,
            scaleX: 0,
            transformOrigin: "left center",
          })

          gsap.to(title, {
            opacity: 1,
            y: 0,
            scaleX: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: "left 85%",
              end: "left 55%",
              scrub: 1,
            },
          })
        }

        // Category fade-in
        if (category instanceof HTMLElement) {
          gsap.fromTo(
            category,
            { opacity: 0, y: 22 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: "left 85%",
                end: "left 70%",
                scrub: 1,
              },
            }
          )
        }
      })
    }, container)

    // Liquid/grainy distortion vars on hover
    const cards = horizontal.querySelectorAll<HTMLElement>("[data-project-card]")
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

    ScrollTrigger.refresh()

    return () => {
      cleanupFns.forEach((fn) => fn())
      ctx.revert()
    }
  }, [])

  return (
    <section ref={containerRef} className="relative bg-background">
      {/* Sticky header text */}
      <div className="absolute top-8 left-6 md:left-12 lg:left-24 z-10">
        <span className="text-sm uppercase tracking-widest text-muted-foreground">
          Featured Work
        </span>
      </div>

      {/* Horizontal scrolling container */}
      <div
        ref={horizontalRef}
        className="flex items-center min-h-screen gap-8 pl-6 md:pl-12 lg:pl-24 pr-[20vw]"
      >
        {/* Initial text panel */}
        <div className="flex-shrink-0 w-[40vw] md:w-[30vw] flex flex-col justify-center pr-12">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6">
            <span className="italic font-serif">Selected</span>
            <br />
            <span className="uppercase">Works</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-md">
            Scroll through our featured projects — each one crafted with precision and purpose.
          </p>
        </div>

        {/* Image cards */}
        {scrollImages.map((image, index) => (
          <div
            key={index}
            className="scroll-card flex-shrink-0 w-[70vw] md:w-[50vw] lg:w-[40vw] h-[70vh] relative group cursor-none"
            data-project-card
            data-view-cursor
          >
            {/* Image container */}
            <div className="relative w-full h-full overflow-hidden rounded-lg bg-secondary">
              <div className="scroll-image absolute inset-0">
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:grayscale group-hover:saturate-0 group-hover:contrast-[1.2] group-hover:brightness-[0.9]"
                  sizes="(max-width: 768px) 70vw, (max-width: 1024px) 50vw, 40vw"
                />
              </div>

              {/* Liquid/grainy distortion layer */}
              <div
                className="project-distortion-layer pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundImage: `url(${image.src})` }}
              />
              <div className="noise-overlay pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 mix-blend-overlay" />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

              {/* Content */}
              <div className="scroll-content absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <span className="scroll-gallery-category text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                  {image.category}
                </span>
                <h3 className="text-2xl md:text-4xl font-light text-foreground group-hover:text-accent transition-colors">
                  <span className="inline-block overflow-hidden align-baseline">
                    <span className="scroll-gallery-title-reveal inline-block">{image.title}</span>
                  </span>
                </h3>
              </div>

              {/* Index number */}
              <div className="absolute top-6 right-6 text-7xl md:text-9xl font-light text-foreground/10">
                {String(index + 1).padStart(2, "0")}
              </div>
            </div>
          </div>
        ))}

        {/* End CTA */}
        <div className="flex-shrink-0 w-[30vw] flex flex-col justify-center items-center pl-12">
          <a
            href="#projects"
            className="group flex flex-col items-center gap-4 text-foreground hover:text-accent transition-colors"
          >
            <span className="text-sm uppercase tracking-widest">View All</span>
            <div className="w-16 h-16 rounded-full border border-current flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-background transition-all">
              <svg
                className="w-6 h-6 rotate-[-45deg] group-hover:rotate-0 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
