"use client"

import { useEffect, useState, useRef } from "react"
import CountUp from "react-countup"
import { ThumbsUp, Car, Building, Clock } from "lucide-react"
import Image from "next/image"

const stats = [
  { icon: <ThumbsUp className="w-10 h-10 text-white" />, value: 829, label: "Happy Clients", delay: 0.1 },
  { icon: <Car className="w-10 h-10 text-white" />, value: 56, label: "Number of Cars", delay: 0.2 },
  { icon: <Building className="w-10 h-10 text-white" />, value: 127, label: "Car Center", delay: 0.3 },
  { icon: <Clock className="w-10 h-10 text-white" />, value: 589, label: "Total Kilometers", delay: 0.4 },
]

export default function StatsSection() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // Stop observing after animation starts
        }
      },
      { threshold: 0.9 }, // Trigger when 40% of the section is visible
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sectionRef} className="relative w-full py-12 px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/fact-bg.jpg"
          alt="Desert mountain landscape with car"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-blue-950 bg-opacity-80"></div>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`flex flex-col items-center fadeInUp ${isVisible ? "active" : ""}`}
            style={{ transitionDelay: `${stat.delay}s` }} // Staggered effect
          >
            {/* Animated Icon */}
            <div className="morphing-icon bg-red-600 w-20 h-20 flex items-center justify-center shadow-lg mx-auto rounded-full">
              {stat.icon}
            </div>
            {/* Counter */}
            <p className="text-white text-3xl font-bold mt-4">
              {isVisible && <CountUp start={0} end={stat.value} duration={3} delay={1} />}+
            </p>
            <p className="text-white text-lg">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

