"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Target } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutSection() {
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
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut amet nemo expedita asperiores commodi
              accusantium at cum harum, excepturi, quia tempora cupiditate! Adipisci facilis modi quisquam quia
              distinctio.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-100 p-5 rounded-lg">
                <div className="morphing-icon bg-red-600 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-center mb-1">Our Vision</h3>
                <p className="text-gray-600 text-center text-xs">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>

              <div className="bg-gray-100 p-5 rounded-lg">
                <div className="morphing-icon bg-red-600 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-center mb-1">Our Mision</h3>
                <p className="text-gray-600 text-center text-xs">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>

            <p className="border-l-4 border-navy-800 pl-4 mb-8 text-gray-600 text-sm">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae, aliquam ipsum. Sed suscipit dolorem
              libero sequi aut natus debitis reprehenderit facilis quaerat similique, est at in eum. Quo, obcaecat in!
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
              <Button className="bg-red-600 hover:bg-red-700 text-white mr-5 text-sm py-1.5">More About Us</Button>

              <div className="flex items-center">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white">
                  <Image src="/placeholder.svg" alt="William Burgess" fill className="object-cover" />
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
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-red-600"></div>

            {/* Images container with slight padding to accommodate the red line */}
            <div className="pr-6">
              {/* Top image - Hand holding car keys - SMALLER */}
              <div className="relative h-[250px] mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=250&width=600"
                  alt="Hand holding car keys"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Bottom image - Vintage car with person - LARGER */}
              <div className="relative h-[450px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=450&width=600"
                  alt="Vintage car with person"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

