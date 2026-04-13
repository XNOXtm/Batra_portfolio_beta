"use client"

import { useEffect, useRef } from "react"
import Lenis from "@studio-freight/lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Avoid running twice in dev StrictMode by only creating one instance.
    if (lenisRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1,
    })
    lenisRef.current = lenis

    const onLenisScroll = () => {
      ScrollTrigger.update()
    }

    // GSAP ticker provides time in seconds; Lenis expects milliseconds.
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    lenis.on("scroll", onLenisScroll)

    // First paint: ensure triggers compute correct positions.
    const refresh = () => ScrollTrigger.refresh()
    refresh()

    const onVisibilityChange = () => {
      if (document.hidden) lenis.stop()
      else lenis.start()
    }
    document.addEventListener("visibilitychange", onVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange)
      lenis.off("scroll", onLenisScroll)
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}

