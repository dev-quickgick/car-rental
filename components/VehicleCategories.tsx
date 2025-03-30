"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Calendar, CarIcon } from "lucide-react"
import type { Car } from "@/lib/supabase"
import { getCars } from "@/lib/db"

interface VehicleCategoriesProps {
  initialCars?: Car[]
}

export default function VehicleCategories({ initialCars = [] }: VehicleCategoriesProps) {
  const [position, setPosition] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const [transitionEnabled, setTransitionEnabled] = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null)
  const isTransitioning = useRef(false)
  const [isVisible, setIsVisible] = useState(false)
  const [cars, setCars] = useState<Car[]>(initialCars)


  //fetch Cars
    useEffect(() => {
      console.log("Hello BRO");
      
      const fetchCars = async () => {
        try {
          const cars = await getCars();
          console.log("Fetched cars:", cars); // Debugging
          setCars(cars);
        } catch (error) {
          console.error("Error fetching cars:", error);
        }
      };

    
      fetchCars();
    }, []);

  // Fade-in animation effect
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

  // Smaller card width for more compact design
  const CARD_WIDTH = 320
  const CARD_GAP = 20 // Reduced gap between cards
  const SLIDE_WIDTH = CARD_WIDTH + CARD_GAP

  // Create a circular array by duplicating items
  const getCircularVehicles = () => {
    if (cars.length === 0) return []
    const prefix = cars.slice(-3)
    const suffix = cars.slice(0, 3)
    return [...prefix, ...cars, ...suffix]
  }

  const circularVehicles = getCircularVehicles()
  // console.log(circularVehicles)

  // Initial position is set to show the first actual item (after the cloned prefix)
  useEffect(() => {
    if (cars.length > 0) {
      setPosition(-3 * SLIDE_WIDTH)
    }
  }, [cars, SLIDE_WIDTH])

  // Handle transition end to implement the infinite loop effect
  const handleTransitionEnd = () => {
    if (isTransitioning.current || cars.length === 0) return

    // If we've scrolled past all real items to the suffix clones
    if (position <= -((cars.length + 3) * SLIDE_WIDTH)) {
      isTransitioning.current = true
      setTransitionEnabled(false)
      setPosition(-3 * SLIDE_WIDTH)

      // Re-enable transition after the position is reset
      setTimeout(() => {
        setTransitionEnabled(true)
        isTransitioning.current = false
      }, 50)
    }

    // If we've scrolled back to the prefix clones
    if (position >= -2 * SLIDE_WIDTH) {
      isTransitioning.current = true
      setTransitionEnabled(false)
      setPosition(-((cars.length + 2) * SLIDE_WIDTH))

      // Re-enable transition after the position is reset
      setTimeout(() => {
        setTransitionEnabled(true)
        isTransitioning.current = false
      }, 50)
    }
  }

  // Function to handle manual navigation
  const handlePrev = () => {
    if (isTransitioning.current || cars.length === 0) return

    // Disable auto-scrolling
    setIsAutoScrolling(false)

    // Update position to move to previous slide
    setPosition((prev) => prev + SLIDE_WIDTH)

    // Reset auto-scroll timer
    if (autoScrollTimerRef.current) {
      clearTimeout(autoScrollTimerRef.current)
    }

    autoScrollTimerRef.current = setTimeout(() => {
      setIsAutoScrolling(true)
    }, 5000)
  }

  const handleNext = () => {
    if (isTransitioning.current || cars.length === 0) return

    // Disable auto-scrolling
    setIsAutoScrolling(false)

    // Update position to move to next slide
    setPosition((prev) => prev - SLIDE_WIDTH)

    // Reset auto-scroll timer
    if (autoScrollTimerRef.current) {
      clearTimeout(autoScrollTimerRef.current)
    }

    autoScrollTimerRef.current = setTimeout(() => {
      setIsAutoScrolling(true)
    }, 5000)
  }

  // Auto-scroll effect
  useEffect(() => {
    if (isAutoScrolling && cars.length > 0) {
      const timer = setInterval(() => {
        if (!isTransitioning.current) {
          setPosition((prev) => prev - SLIDE_WIDTH)
        }
      }, 5000)

      return () => clearInterval(timer)
    }
  }, [isAutoScrolling, SLIDE_WIDTH, cars.length])

  // Watch for position changes to handle infinite scrolling
  useEffect(() => {
    handleTransitionEnd()
  }, [position])

  // Calculate the total carousel width
  const carouselWidth = CARD_WIDTH * 3 + CARD_GAP * 2

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="container mx-auto px-16">
        <div className={`relative fadeInUp ${isVisible ? "active" : ""}`}>
          {/* Carousel container with navigation buttons */}
          <div className="mx-auto relative" style={{ width: `${carouselWidth}px` }}>
            {/* Navigation buttons positioned to align with outermost cards */}
            <div className="absolute top-0 w-full" style={{ transform: "translateY(-60px)" }}>
              <div className="flex justify-between">
                <button
                  className="bg-red-600 text-white w-16 h-12 rounded-full flex items-center justify-center cursor-pointer"
                  onClick={handlePrev}
                  aria-label="Previous vehicle"
                  disabled={cars.length === 0}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  className="bg-red-600 text-white w-16 h-12 rounded-full flex items-center justify-center cursor-pointer"
                  onClick={handleNext}
                  aria-label="Next vehicle"
                  disabled={cars.length === 0}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Fixed width container to show exactly 3 cards */}
            <div className="overflow-hidden">
              {/* {cars.length} */}
              {cars.length > 0 ? (
                <div
                  ref={carouselRef}
                  className="flex"
                  style={{
                    transform: `translateX(${position}px)`,
                    transition: transitionEnabled ? "transform 1s ease-in-out" : "none",
                    gap: `${CARD_GAP}px`,
                  }}
                  onTransitionEnd={() => handleTransitionEnd()}
                >

                  {circularVehicles.map((car, index) => (
                    <div key={`${car.id}-${index}`} className="flex-shrink-0" style={{ width: `${CARD_WIDTH}px` }}>
                      
                      {/* Border container with padding */}
                      <div className="border border-black hover:border-red-600 rounded-lg p-5 transition-all duration-300">
                        {/* Card content container */}
                        <div className="bg-gray-100 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(239,68,68,0.7)]">
                          {/* Image section */}
                          <div className="relative h-40">
                            <Image
                              src={car.image_url || "/placeholder.svg?height=200&width=350"}
                              // src={"/placeholder.svg?height=200&width=350"}
                              alt={car.name}
                              fill
                              className="object-cover"
                            />
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
                                <CarIcon className="h-4 w-4 text-gray-600" />
                                <span>{car.seats}</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <Calendar className="h-4 w-4 text-gray-600" />
                                <span>{car.transmission}</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <Calendar className="h-4 w-4 text-gray-600" />
                                <span>{car.fuel}</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <Calendar className="h-4 w-4 text-gray-600" />
                                <span>{car.year}</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <Calendar className="h-4 w-4 text-gray-600" />
                                <span>{car.auto}</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <Calendar className="h-4 w-4 text-gray-600" />
                                <span>{car.mileage}</span>
                              </div>
                            </div>

                            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-full font-medium text-sm">
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div> 
                  )
                  )}
                </div>
              ) : (
                <div className="flex justify-center items-center h-64 text-gray-500">
                  No cars available at the moment. Please check back later.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}




