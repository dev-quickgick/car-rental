"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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

    // Track mouse movement for 3D effect
    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20
        const y = (e.clientY / window.innerHeight - 0.5) * 20
        setMousePosition({ x, y })
      }
  
      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

  return (
    <section ref={sectionRef} className="py-24">
      <div className="container mx-auto px-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Side Content - Fade in from left */}
          <div
            className={`w-full lg:w-1/2 transition-all duration-1000 transform ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
            }`}
          >
            <h1 className="text-5xl font-bold text-navy-900">INFINITI AUTO GROUP</h1>
            <h2 className="text-5xl font-bold text-red-600 mb-6">About</h2>
            <p className="text-gray-600 text-sm mb-8">
            At Infiniti Auto Group, we are more than just a car service 
            <br></br>
            we are a legacy of trust, excellence, and passion for automobiles. 
            <br />
            With years of experience in the automotive industry, we are committed to delivering high-quality vehicles, unparalleled customer service, and a seamless driving experience that exceeds expectations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-100 p-5 rounded-lg">
                <div className="morphing-icon bg-red-600 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-center mb-1">Our Vision</h3>
                <p className="text-gray-600 text-center text-xs">
                To be the most trusted and innovative automotive group, inspiring confidence in every mile and delivering value beyond the road.
                </p>
              </div>

              <div className="bg-gray-100 p-5 rounded-lg">
                <div className="morphing-icon bg-red-600 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-center mb-1">Our Mision</h3>
                <p className="text-gray-600 text-center text-xs">
                To empower our customers with exceptional vehicles, outstanding service, and reliable support, making every journey a remarkable experience.
                </p>
              </div>
            </div>

            <p className="border-l-4 border-navy-800 pl-4 mb-8 text-gray-600 text-sm">
            Our team of dedicated professionals is driven by a love for cars and a deep respect for our customers. Whether you're looking to rent, buy, or simply explore — we are here to make the process smooth, transparent, and enjoyable.
            </p>

            <div className="flex mb-8">
              <div className="bg-navy-800 text-white p-5 rounded-lg w-36 text-center">
                <span className="text-3xl font-bold block">17</span>
                <span className="text-xs">Years Of Experience</span>
              </div>

              <div className="ml-6">
                <ul className="space-y-1.5">
                  <li className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-red-600 mr-2 flex-shrink-0"></div>
                    <span className="text-sm">Morbi tristique senectus</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-red-600 mr-2 flex-shrink-0"></div>
                    <span className="text-sm">A scelerisque purus</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-red-600 mr-2 flex-shrink-0"></div>
                    <span className="text-sm">Dictumst vestibulum</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-red-600 mr-2 flex-shrink-0"></div>
                    <span className="text-sm">dio aenean sed adipiscing</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-center">
              <Link href="/about-us">
                <Button className="bg-red-600 hover:bg-red-700 text-white mr-5 text-sm py-1.5">
                  More About Us
                </Button>
              </Link>
              <div className="flex items-center">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white">
                  <Image src="/images/attachment-img.jpg" alt="William Burgess" fill className="object-cover" />
                </div>
                <div className="ml-3">
                  <h4 className="text-base font-bold">William Burgess</h4>
                  <p className="text-gray-600 text-xs">Carveo Founder</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Images with Red Line - Fade in from right */}
          <div
            className={`w-full lg:w-1/2 transition-all duration-1000 transform relative ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
            }`}
            style={{ transitionDelay: "0.3s" }}
          >
            {/* Red vertical line on the right side */}
            {/* <div className="absolute right-0 top-0 bottom-0 w-2 bg-red-600 ml-20"></div> */}

            {/* Images container with slight padding to accommodate the red line */}
            {/* <div className="pr-6"> */}
              {/* Top image - Hand holding car keys - SMALLER */}
              {/* <div className="relative h-[250px] mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=250&width=600"
                  alt="Hand holding car keys"
                  fill
                  className="object-cover"
                />
              </div> */}

              {/* Bottom image - Vintage car with person - LARGER */}
              {/* <div className="relative h-[450px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=450&width=600"
                  alt="Vintage car with person"
                  fill
                  className="object-cover"
                />
              </div> */}
            {/* </div> */}

            <div className="pr-6 relative h-[600px]">
              {/* Top image - Luxury car keys */}
              <div
                className="absolute top-0 right-0 w-[90%] h-[280px] rounded-lg overflow-hidden shadow-xl z-10"
                style={{
                  transform: isVisible
                    ? `perspective(1000px) rotateX(${mousePosition.y * 0.05}deg) rotateY(${mousePosition.x * 0.05}deg) translateZ(20px)`
                    : "none",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.3s ease-out",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                }}
              >
                <Image src="/images/about-img-1.jpg" alt="Luxury car keys" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none"></div>
              </div>

              {/* Middle image - Sports car */}
              <div
                className="absolute top-[180px] left-0 w-[85%] h-[250px] rounded-lg overflow-hidden shadow-xl z-20"
                style={{
                  transform: isVisible
                    ? `perspective(1000px) rotateX(${mousePosition.y * -0.03}deg) rotateY(${mousePosition.x * -0.03}deg) translateZ(40px)`
                    : "none",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.3s ease-out",
                  transitionDelay: "0.1s",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
                }}
              >
                <Image src="/images/mercedes.jpg" alt="Sports car" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent pointer-events-none"></div>
              </div>

              {/* Bottom image - Vintage car */}
              <div
                className="absolute bottom-0 right-0 w-[90%] h-[280px] rounded-lg overflow-hidden shadow-xl z-10"
                style={{
                  transform: isVisible
                    ? `perspective(1000px) rotateX(${mousePosition.y * 0.04}deg) rotateY(${mousePosition.x * 0.04}deg) translateZ(20px)`
                    : "none",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.3s ease-out",
                  transitionDelay: "0.2s",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                }}
              >
                <Image src="/images/about-img.jpg" alt="Vintage car" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent pointer-events-none"></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

