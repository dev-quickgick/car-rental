"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // Stop observing after animation starts
        }
      },
      { threshold: 0.2 }, // Trigger when 20% of the section is visible
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const steps = [
    {
      title: "Come In Contact",
      description: "Reach out to us via phone, email, or visit our location. Our team is always ready to assist and guide you through the process.",
      number: "01",
      delay: 0.5,
    },
    {
      title: "Choose A Car",
      description: "Browse through our wide selection of premium vehicles and pick the one that fits your needs and lifestyle.",
      number: "02",
      delay: 0.7,
    },
    {
      title: "Enjoy Driving",
      description: "Drive off with confidence and comfort. We take care of the rest so you can focus on the journey ahead.",
      number: "03",
      delay: 0.9,
    },
  ]

  return (
    <section ref={sectionRef} className="relative py-12">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg-1.jpg?height=400&width=1920"
          alt="Vintage cars background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-90"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-16">
        {/* Heading and description with fade-in-up animation */}
        <div className="text-center mb-8">
          <h2
            className={`text-4xl font-bold mb-2 text-white fadeInUp ${isVisible ? "active" : ""}`}
            style={{ transitionDelay: "0.1s" }}
          >
            INFINITI AUTO GROUP <span className="text-red-600">Process</span>
          </h2>
          <p
            className={`text-gray-300 max-w-4xl mx-auto text-sm fadeInUp ${isVisible ? "active" : ""}`}
            style={{ transitionDelay: "0.3s" }}
          >
            From first contact to getting behind the wheel, we make the entire process simple, transparent, and enjoyable — just how it should be.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative bg-navy-800 px-6 py-4 rounded-lg text-white fadeInUp ${isVisible ? "active" : ""}`}
              style={{ transitionDelay: `${step.delay}s` }}
            >
              <h3 className="text-xl font-bold mb-1 text-white">{step.title}</h3>
              <p className="text-gray-300 text-xs">{step.description}</p>

              {/* Number circle - smaller size */}
              <div className="absolute -bottom-5 right-8 w-12 h-12 rounded-full border-2 border-white flex items-center justify-center bg-navy-800">
                <span className="font-bold text-white text-sm">{step.number}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

