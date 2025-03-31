"use client"

import { useState, useEffect, useRef, type ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Sliding3DCarouselProps {
  children: ReactNode[]
  autoRotate?: boolean
  autoRotateSpeed?: number
  className?: string
}

export default function Sliding3DCarousel({
  children,
  autoRotate = false,
  autoRotateSpeed = 5000,
  className,
}: Sliding3DCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [carouselWidth, setCarouselWidth] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const totalItems = children.length
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null)
  const [direction, setDirection] = useState<"left" | "right" | null>(null)

  // Update carousel dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (carouselRef.current) {
        setCarouselWidth(carouselRef.current.offsetWidth)
      }
    }

    // Initial dimensions
    updateDimensions()

    // Update on resize
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  // Handle next slide
  const nextSlide = () => {
    if (isAnimating) return
    setDirection("left")
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === totalItems - 1 ? 0 : prev + 1))
  }

  // Handle previous slide
  const prevSlide = () => {
    if (isAnimating) return
    setDirection("right")
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === 0 ? totalItems - 1 : prev - 1))
  }

  // Go to a specific slide
  const goToSlide = (index: number) => {
    if (isAnimating || index === activeIndex) return
    setDirection(index > activeIndex ? "left" : "right")
    setIsAnimating(true)
    setActiveIndex(index)
  }

  // Reset animation state after transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [activeIndex])

  // Auto-rotate carousel
  useEffect(() => {
    if (autoRotate) {
      autoRotateRef.current = setInterval(() => {
        nextSlide()
      }, autoRotateSpeed)
    }
    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current)
      }
    }
  }, [autoRotate, autoRotateSpeed, activeIndex])

  // Pause auto-rotation on hover
  const handleMouseEnter = () => {
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current)
    }
  }

  const handleMouseLeave = () => {
    if (autoRotate) {
      autoRotateRef.current = setInterval(() => {
        nextSlide()
      }, autoRotateSpeed)
    }
  }

  // Calculate positions for visible cards
  const getCardPosition = (index: number) => {
    // Calculate the relative position from active index
    const position = index - activeIndex

    // Handle wrapping for circular navigation
    let adjustedPosition = position
    if (position < -Math.floor(totalItems / 2)) {
      adjustedPosition = position + totalItems
    } else if (position > Math.floor(totalItems / 2)) {
      adjustedPosition = position - totalItems
    }

    return adjustedPosition
  }

  return (
    <div
      className={cn("relative w-full h-[600px] overflow-hidden", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="w-full h-full flex items-center justify-center"
        style={{ perspective: "2000px" }}
      >
        {/* Carousel Stage */}
        <div className="relative w-full h-full">
          {/* Carousel Items */}
          {children.map((child, index) => {
            const position = getCardPosition(index)
            const isActive = position === 0

            // Calculate x position based on position value
            const xOffset = position * 300 // Base offset
            const zOffset = Math.abs(position) * -200 // Z-axis offset (depth)
            const opacity = isActive ? 1 : Math.max(0.5, 1 - Math.abs(position) * 0.25)
            const scale = isActive ? 1 : Math.max(0.8, 1 - Math.abs(position) * 0.1)
            const rotateY = position * 15 // Rotation angle

            return (
              <div
                key={index}
                className={cn(
                  "absolute left-1/2 top-1/2 w-[300px] transition-all duration-500 cursor-pointer",
                  isActive ? "z-10" : "z-0",
                )}
                style={{
                  transform: `translate(-50%, -50%) translateX(${xOffset}px) translateZ(${zOffset}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  filter: isActive ? "none" : "brightness(0.7)",
                  pointerEvents: isActive ? "auto" : "none",
                  transition: isAnimating ? "all 500ms ease-out" : "all 300ms ease-out",
                }}
                onClick={() => goToSlide(index)}
              >
                <div style={{ transform: "rotateY(0deg)" }}>{child}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 transition-colors"
        aria-label="Previous slide"
        disabled={isAnimating}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 transition-colors"
        aria-label="Next slide"
        disabled={isAnimating}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
        {Array.from({ length: totalItems }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === activeIndex ? "bg-red-500" : "bg-pink-200"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            disabled={isAnimating}
          />
        ))}
      </div>
    </div>
  )
}

