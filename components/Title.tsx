"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

interface TitleProps {
  children?: React.ReactNode
  title?: string
  highlight?: string
  description?: string
}

export default function Title({ children, title, highlight, description }: TitleProps) {
  const titleRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // Stop observing after animation starts
        }
      },
      { threshold: 0.5 }, // Trigger when 50% of the element is visible
    )

    if (titleRef.current) {
      observer.observe(titleRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // If children are provided, render them directly
  if (children) {
    return (
      <div ref={titleRef} className="text-center">
        <h1 className={`text-3xl font-bold fadeInUp ${isVisible ? "active" : ""}`}>{children}</h1>
      </div>
    )
  }

  // Otherwise, use the structured title with optional highlight and description
  return (
    <div ref={titleRef} className="text-center mb-16">
      <h2 className={`text-4xl font-bold mb-4 text-gray-900 fadeInUp ${isVisible ? "active" : ""}`}>
        {title} {highlight && <span className="text-red-600">{highlight}</span>}
      </h2>
      {description && (
        <p
          className={`text-gray-600 max-w-3xl mx-auto fadeInUp ${isVisible ? "active" : ""}`}
          style={{ transitionDelay: "0.2s" }}
        >
          {description}
        </p>
      )}
    </div>
  )
}

