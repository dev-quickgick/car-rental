import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Car, Calendar, Fuel, Gauge, Users } from "lucide-react"

interface VehicleCardProps {
  id: number | string
  name: string
  brand: string
  image_url: string
  year: number | string
  price_per_day: number | string
  seats?: number
  transmission?: string
  fuel?: string
  mileage?: string | number
  auto?: string
}

export default function FinalVehicleCard({
  name,
  brand,
  image_url,
  year,
  price_per_day,
  seats = 4,
  transmission = "Manual",
  fuel = "Petrol",
  mileage = 10,
  auto
}: VehicleCardProps) {
  // Format price to display with dollar sign
  const formatPrice = (price: number | string) => {
    const numPrice = typeof price === "string" ? Number.parseFloat(price) : price
    return `$${numPrice}/Day`
  }

  return (
    <Card className="w-full overflow-hidden rounded-xl border border-gray-200 shadow-md">
      <div className="flex flex-col h-full">
        {/* Car Image */}
        <div className="h-40 bg-gray-100 overflow-hidden">
          <img src={image_url} alt={name} className="w-full h-full object-cover" />
        </div>

        {/* Card Content */}
        <div className="bg-gray-50 p-3 flex-grow flex flex-col gap-2">
          {/* Car Name and Brand */}
          <h3 className="text-2xl font-bold text-center text-gray-900">{name}</h3>
          <p className="text-center text-gray-500 mb-3 text-lg">{brand}</p>

          {/* Price */}
          <div className="bg-white rounded-full py-1.5 mb-3 shadow-sm">
            <p className="text-center text-red-600 font-bold text-lg">{formatPrice(price_per_day)}</p>
          </div>

          {/* Specifications Grid */}
          <div className="grid grid-cols-3 gap-4 mb-3 text-xs mx-3">
            {/* Seats */}
            <div className="flex gap-1 items-center">
              <Users className="h-6 w-6 text-gray-600 mb-1" />
              <span className="font-bold text-md text-gray-700">{seats}</span>
            </div>


            <div className="flex gap-1 items-center">
              <Car className="h-6 w-6 text-gray-600 mb-1" />
              <span className="text-gray-700 font-bold text-md">{transmission}</span>
            </div>

            {/* Fuel */}
            <div className="flex gap-1 items-center">
              <Fuel className="h-6 w-6 text-gray-600 mb-1" />
              <span className="text-gray-700 font-bold text-md">{fuel}</span>
            </div>

            {/* Year */}
            <div className="flex gap-1 items-center">
              <Calendar className="h-6 w-6 text-gray-600 mb-1" />
              <span className="text-gray-700 font-bold text-md">{year}</span>
            </div>

            {/* Empty or Additional Spec */}
            <div className="flex gap-1 items-center">
              <Calendar className="h-6 w-6 text-gray-600 mb-1" />
              <span className="text-gray-700 font-bold text-md">{auto}</span>
            </div>

            {/* Mileage */}
            <div className="flex gap-1 items-center">
              <Gauge className="h-6 w-6 text-gray-600 mb-1" />
              <span className="text-gray-700 font-bold text-md">{mileage}</span>
            </div>
          </div>

          {/* Book Now Button - Added z-index to position it above pagination dots */}
          <Button onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: "smooth" })
            }} className="w-full bg-red-600 hover:bg-red-700 text-white rounded-full py-1 h-9 text-sm relative z-20">
            Book Now
          </Button>
        </div>
      </div>
    </Card>
  )
}

