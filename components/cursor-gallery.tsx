"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const galleryImages = [
  "/projects/project-1.jpg",
  "/projects/project-2.jpg",
  "/projects/project-3.jpg",
  "/projects/project-4.jpg",
]

interface CursorImage {
  id: number
  x: number
  y: number
  src: string
  rotation: number
}

export function CursorGallery({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [images, setImages] = useState<CursorImage[]>([])
  const [isHovering, setIsHovering] = useState(false)
  const imageIndexRef = useRef(0)
  const lastPositionRef = useRef({ x: 0, y: 0 })
  const idCounterRef = useRef(0)
  const throttleRef = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering || throttleRef.current) return

      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Calculate distance from last position
      const dx = x - lastPositionRef.current.x
      const dy = y - lastPositionRef.current.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      // Only spawn image if moved enough distance
      if (distance < 80) return

      throttleRef.current = true
      setTimeout(() => {
        throttleRef.current = false
      }, 100)

      lastPositionRef.current = { x, y }

      const newImage: CursorImage = {
        id: idCounterRef.current++,
        x,
        y,
        src: galleryImages[imageIndexRef.current % galleryImages.length],
        rotation: (Math.random() - 0.5) * 20,
      }

      imageIndexRef.current++
      setImages(prev => [...prev.slice(-6), newImage])

      // Remove image after animation
      setTimeout(() => {
        setImages(prev => prev.filter(img => img.id !== newImage.id))
      }, 1200)
    }

    container.addEventListener("mousemove", handleMouseMove)
    return () => container.removeEventListener("mousemove", handleMouseMove)
  }, [isHovering])

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false)
        setImages([])
      }}
    >
      {/* Cursor-following images */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-20">
        <AnimatePresence>
          {images.map((image) => (
            <motion.div
              key={image.id}
              initial={{ 
                opacity: 0, 
                scale: 0.5,
                x: image.x - 100,
                y: image.y - 75,
                rotate: image.rotation - 10,
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotate: image.rotation,
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.8,
                y: image.y - 75 + 30,
              }}
              transition={{
                duration: 0.4,
                ease: [0.23, 1, 0.32, 1],
                exit: { duration: 0.6 }
              }}
              className="absolute w-[200px] h-[150px] rounded-lg overflow-hidden shadow-2xl"
              style={{
                left: 0,
                top: 0,
              }}
            >
              <Image
                src={image.src}
                alt=""
                fill
                className="object-cover grayscale saturate-0 contrast-[1.2] brightness-[0.9]"
                sizes="200px"
              />
              {/* Grain overlay to match the B/W, film-like hover mood */}
              <div className="absolute inset-0 noise-overlay opacity-25 mix-blend-overlay pointer-events-none" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {children}
    </div>
  )
}
