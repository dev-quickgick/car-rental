"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Trophy, PhoneCall, Diamond, MapPin } from "lucide-react"

export default function FeaturesSection() {
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

  const features = [
    {
      title: "First Class services",
      description:
        "Enjoy a luxurious driving experience with our top-of-the-line vehicles and professional service team, tailored to meet your comfort.",
      icon: <Trophy className="w-5 h-5 text-navy-900" />,
      position: "left-top",
      delay: 0.1,
    },
    {
      title: "24/7 road assistance",
      description:
        "Travel worry-free. Our 24/7 support ensures that help is always just a call away, no matter the road or time.",
      icon: <PhoneCall className="w-5 h-5 text-navy-900" />,
      position: "left-bottom",
      delay: 0.3,
    },
    {
      title: "Quality at Minimum",
      description:
        "Premium does not have to mean pricey. Get the best quality vehicles and services at competitive rates.",
      icon: <Diamond className="w-5 h-5 text-navy-900" />,
      position: "right-top",
      delay: 0.2,
    },
    {
      title: "Free Pick-Up & Drop-Off",
      description:
        "Wherever you are, we will reach you. Take advantage of our complimentary doorstep pick-up and drop-off service.",
      icon: <MapPin className="w-5 h-5 text-navy-900" />,
      position: "right-bottom",
      delay: 0.4,
    },
  ]

  return (
    <section ref={sectionRef} className="py-16 bg-gray-100">
      <div className="container mx-auto px-16">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2
            className={`text-4xl font-bold mb-3 text-gray-900 fadeInUp ${isVisible ? "active" : ""}`}
            style={{ transitionDelay: "0.1s" }}
          >
            INFINITI AUTO GROUP <span className="text-red-600">Features</span>
          </h2>
          <p
            className={`text-gray-600 max-w-4xl mx-auto text-sm fadeInUp ${isVisible ? "active" : ""}`}
            style={{ transitionDelay: "0.2s" }}
          >
              We take pride in delivering a premium car rental experience—offering world-class service, exceptional reliability, and unmatched convenience, every time you ride.
          </p>
        </div>

        {/* Features with car image in center */}
        <div className="relative flex flex-col md:flex-row items-center justify-center">
          {/* Left side features */}
          <div className="w-full md:w-1/3 space-y-10 md:pr-4">
            {features
              .filter((f) => f.position.startsWith("left"))
              .map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-start fadeInUp ${isVisible ? "active" : ""}`}
                  style={{ transitionDelay: `${feature.delay}s` }}
                >
                  <div className="morphing-icon bg-red-600 w-12 h-12 flex items-center justify-center mr-3 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold mb-1 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 text-xs">{feature.description}</p>
                  </div>
                </div>
              ))}
          </div>

          {/* Center car image */}
          <div
            className={`w-full md:w-1/3 py-6 md:py-0 fadeInUp ${isVisible ? "active" : ""}`}
            style={{ transitionDelay: "0.3s" }}
          >
            <div className="relative h-48 md:h-60">
              <Image src="/images/car-1.png?height=300&width=500" alt="Luxury car" fill className="object-contain" />
            </div>
          </div>

          {/* Right side features */}
          <div className="w-full md:w-1/3 space-y-10 md:pl-4">
            {features
              .filter((f) => f.position.startsWith("right"))
              .map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-start fadeInUp ${isVisible ? "active" : ""}`}
                  style={{ transitionDelay: `${feature.delay}s` }}
                >
                  <div>
                    <h3 className="text-base font-bold mb-1 text-right text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 text-xs text-right">{feature.description}</p>
                  </div>
                  <div className="morphing-icon bg-red-600 w-12 h-12 flex items-center justify-center ml-3 flex-shrink-0">
                    {feature.icon}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}

