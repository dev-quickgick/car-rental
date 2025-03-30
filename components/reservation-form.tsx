"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Calendar, MapPin, User, Mail, Phone, CarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { submitReservationForm } from "@/app/actions"
import { toast } from "@/hooks/use-toast"

export default function ReservationForm() {
  const [pickUpDate, setPickUpDate] = useState<Date>()
  const [dropOffDate, setDropOffDate] = useState<Date>()
  const [differentDropOff, setDifferentDropOff] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    car_type: "",
    pickup_location: "",
    dropoff_location: "",
    pickup_time: "",
    dropoff_time: "",
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000) // 1s delay before animation starts

    return () => clearTimeout(timer)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!pickUpDate || !dropOffDate) {
      toast({
        title: "Error",
        description: "Please select pickup and drop-off dates",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    const formDataToSubmit = new FormData()
    formDataToSubmit.append("name", formData.name)
    formDataToSubmit.append("email", formData.email)
    formDataToSubmit.append("phone", formData.phone)
    formDataToSubmit.append("car_type", formData.car_type)
    formDataToSubmit.append("pickup_location", formData.pickup_location)
    formDataToSubmit.append("pickup_date", pickUpDate.toISOString())
    formDataToSubmit.append("pickup_time", formData.pickup_time)
    formDataToSubmit.append("dropoff_date", dropOffDate.toISOString())
    formDataToSubmit.append("dropoff_time", formData.dropoff_time)

    if (differentDropOff && formData.dropoff_location) {
      formDataToSubmit.append("dropoff_location", formData.dropoff_location)
    } else {
      formDataToSubmit.append("dropoff_location", formData.pickup_location)
    }

    const result = await submitReservationForm(formDataToSubmit)

    setIsSubmitting(false)

    if (result.success) {
      toast({
        title: "Success",
        description: "Your reservation has been submitted successfully!",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        car_type: "",
        pickup_location: "",
        dropoff_location: "",
        pickup_time: "",
        dropoff_time: "",
      })
      setPickUpDate(undefined)
      setDropOffDate(undefined)
      setDifferentDropOff(false)
    } else {
      toast({
        title: "Error",
        description: result.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div
      className={`w-full lg:w-6/12 bg-navy-800 p-6 rounded-lg shadow-lg transform mt-10 transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
      }`}
    >
      <div className="w-full fadeInLeft">
        <h2 className="text-2xl font-bold text-white text-center mb-6">CONTINUE CAR RESERVATION</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Your Full Name"
              className="pl-10 bg-white text-gray-800"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              className="pl-10 bg-white text-gray-800"
              required
            />
          </div>

          {/* Mobile */}
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter Your Contact Number"
              className="pl-10 bg-white text-gray-800"
            />
          </div>

          {/* Car Type */}
          <div className="relative">
            <CarIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Select value={formData.car_type} onValueChange={(value) => handleSelectChange("car_type", value)}>
              <SelectTrigger className="pl-10 bg-white text-gray-800">
                <SelectValue placeholder="Select Your Car type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="economy">Economy</SelectItem>
                <SelectItem value="compact">Compact</SelectItem>
                <SelectItem value="midsize">Midsize</SelectItem>
                <SelectItem value="suv">SUV</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Pickup Location */}
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              name="pickup_location"
              value={formData.pickup_location}
              onChange={handleChange}
              placeholder="Enter a City or Airport"
              className="pl-10 bg-white text-gray-800"
              required
            />
          </div>

          {/* Different Drop-off Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="differentDropOff"
              checked={differentDropOff}
              onChange={() => setDifferentDropOff(!differentDropOff)}
              className="mr-2"
            />
            <label htmlFor="differentDropOff" className="text-white text-sm">
              Need a different drop-off location?
            </label>
          </div>

          {/* Drop-off Location */}
          {differentDropOff && (
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                name="dropoff_location"
                value={formData.dropoff_location}
                onChange={handleChange}
                placeholder="Enter a City or Airport"
                className="pl-10 bg-white text-gray-800"
                required={differentDropOff}
              />
            </div>
          )}

          {/* Pickup Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-white mr-1" />
                <span className="text-white text-sm">Pick Up Date</span>
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="date"
                  className="pl-10 bg-white text-gray-800 w-full"
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => {
                    if (e.target.value) {
                      setPickUpDate(new Date(e.target.value))
                    } else {
                      setPickUpDate(undefined)
                    }
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-white text-sm">Pick Up Time</span>
              </div>
              <Select value={formData.pickup_time} onValueChange={(value) => handleSelectChange("pickup_time", value)}>
                <SelectTrigger className="bg-white text-gray-800">
                  <SelectValue placeholder="Select Time" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }).map((_, i) => (
                    <SelectItem key={i} value={`${i}:00`}>
                      {i === 0 ? "12:00 AM" : i < 12 ? `${i}:00 AM` : i === 12 ? "12:00 PM" : `${i - 12}:00 PM`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Drop-off Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-white mr-1" />
                <span className="text-white text-sm">Drop Off Date</span>
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="date"
                  className="pl-10 bg-white text-gray-800 w-full"
                  min={pickUpDate ? pickUpDate.toISOString().split("T")[0] : new Date().toISOString().split("T")[0]}
                  onChange={(e) => {
                    if (e.target.value) {
                      setDropOffDate(new Date(e.target.value))
                    } else {
                      setDropOffDate(undefined)
                    }
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-white text-sm">Drop Off Time</span>
              </div>
              <Select
                value={formData.dropoff_time}
                onValueChange={(value) => handleSelectChange("dropoff_time", value)}
              >
                <SelectTrigger className="bg-white text-gray-800">
                  <SelectValue placeholder="Select Time" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }).map((_, i) => (
                    <SelectItem key={i} value={`${i}:00`}>
                      {i === 0 ? "12:00 AM" : i < 12 ? `${i}:00 AM` : i === 12 ? "12:00 PM" : `${i - 12}:00 PM`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Book Now"}
          </Button>
        </form>
      </div>
    </div>
  )
}

