"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, CarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import BookingModal from "@/components/booking-modal"
import type { Car } from "@/lib/supabase"

interface CarCardProps {
  car: Car
}

export default function CarCard({ car }: CarCardProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  return (
    <>
      <div className="border border-black hover:border-red-600 rounded-lg p-5 transition-all duration-300">
        <div className="bg-gray-100 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(239,68,68,0.7)]">
          {/* Image section */}
          <div className="relative h-40">
            <Image src="/placeholder.svg?height=200&width=350" alt={car.name} fill className="object-cover" />
          </div>

          {/* Information section */}
          <div className="p-4">
            <h3 className="text-lg font-bold text-center mb-2 text-gray-900">{car.name}</h3>
            <p className="text-center text-gray-600 mb-3">{car.brand}</p>

            <div className="bg-white rounded-full py-2 text-center mb-4">
              <span className="text-red-600 text-lg font-bold">${car.price_per_day}/Day</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-xs mb-4 text-gray-600">
              <div className="flex flex-col items-center">
                <CarIcon className="h-4 w-4 text-gray-600" />
                <span>{car.brand}</span>
              </div>
              <div className="flex flex-col items-center">
                <Calendar className="h-4 w-4 text-gray-600" />
                <span>{car.year}</span>
              </div>
            </div>

            <Button
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-full font-medium text-sm"
              onClick={() => setIsBookingModalOpen(true)}
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>

      <BookingModal car={car} isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </>
  )
}

