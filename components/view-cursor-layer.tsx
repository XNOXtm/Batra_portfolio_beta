"use client"

import { useEffect, useRef } from "react"

export function ViewCursorLayer() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef(false)
  const latestPosRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const cursorEl = cursorRef.current
    if (!cursorEl) return

    // Disable on non-hover devices (touch / tablets).
    const mq = window.matchMedia("(hover: none), (pointer: coarse)")
    if (mq.matches) return

    const updateCursorPos = (x: number, y: number) => {
      latestPosRef.current = { x, y }
      if (rafRef.current) return
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null
        const pos = latestPosRef.current
        cursorEl.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(1)`
      })
    }

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-view-cursor]")
    )

    const show = (e: PointerEvent) => {
      activeRef.current = true
      cursorEl.style.opacity = "1"
      cursorEl.style.pointerEvents = "none"
      updateCursorPos(e.clientX, e.clientY)
    }

    const hide = () => {
      activeRef.current = false
      cursorEl.style.opacity = "0"
      cursorEl.style.transform = "translate3d(0px, 0px, 0) translate(-50%, -50%) scale(0.85)"
    }

    targets.forEach((t) => {
      t.addEventListener("pointerenter", show)
      t.addEventListener("pointerleave", hide)
    })

    const onMove = (e: PointerEvent) => {
      if (!activeRef.current) return
      updateCursorPos(e.clientX, e.clientY)
    }

    window.addEventListener("pointermove", onMove)

    return () => {
      window.removeEventListener("pointermove", onMove)
      targets.forEach((t) => {
        t.removeEventListener("pointerenter", show)
        t.removeEventListener("pointerleave", hide)
      })
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="view-cursor pointer-events-none fixed left-0 top-0 z-[999] opacity-0"
      aria-hidden
    >
      <div className="w-[160px] h-[160px] rounded-full border border-foreground/20 bg-background/30 backdrop-blur-xl flex items-center justify-center">
        <div className="text-center select-none">
          <div className="text-[28px] leading-none font-light tracking-tight">View</div>
          <svg
            className="mx-auto mt-2"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 5l7 7m0 0l-7 7m7-7H3"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

