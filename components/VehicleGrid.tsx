"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Calendar, CarIcon, Fuel, Gauge, User } from "lucide-react"
import type { Car } from "@/lib/supabase"
import Link from "next/link"

interface VehicleGridProps {
  initialCars?: Car[]
}

export default function VehicleGrid({ initialCars = [] }: VehicleGridProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [cars, setCars] = useState<Car[]>(initialCars)

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
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="container mx-auto px-8">
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 fadeInUp ${isVisible ? "active" : ""}`}>
          {cars.length > 0 ? (
            cars.map((car, index) => (
              <div
                key={car.id}
                className={`fadeInUp ${isVisible ? "active" : ""}`}
                style={{ transitionDelay: `${0.1 * (index % 3)}s` }}
              >
                {/* Border container with padding */}
                <div className="border border-black hover:border-red-600 rounded-lg p-5 transition-all duration-300">
                  {/* Card content container */}
                  <div className="bg-gray-100 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(239,68,68,0.7)]">
                    {/* Image section */}
                    <div className="relative h-40">
                      <Image src={car.image_url} alt={car.name} fill className="object-cover" />
                    </div>

                    {/* Information section */}
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-center mb-2 text-gray-900">{car.name}</h3>
                      <p className="text-center text-gray-600 mb-3">{car.brand}</p>

                      <div className="bg-white rounded-full py-2 text-center mb-4">
                        <span className="text-red-600 text-lg font-bold">${car.price_per_day}/Day</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center text-xs mb-4 text-gray-600">
                        <div className="flex flex-col items-center">
                          <User className="h-6 w-6 text-gray-600" />
                          <span>{car.seats}</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <CarIcon className="h-6 w-6 text-gray-600" />
                          <span>{car.transmission}</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <Fuel className="h-6 w-6 text-gray-600" />
                          <span>{car.fuel}</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <Calendar className="h-6 w-6 text-gray-600" />
                          <span>{car.year}</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <Calendar className="h-6 w-6 text-gray-600" />
                          <span>{car.auto}</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <Gauge className="h-6 w-6 text-gray-600" />
                          <span>{car.mileage}</span>
                        </div>
                      </div>
                      <Link href="/">
                        <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-full font-medium text-sm">
                          Book Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12 text-gray-500">
              No cars available at the moment. Please check back later.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

