"use client"
import FinalVehicleCard from "./vehicle-card"
import type { Car } from "@/lib/supabase"
import { getCars } from "@/lib/db"
import { useEffect, useState } from "react"
import Sliding3DCarousel from "./sliding-3d-carousel"

interface VehicleCategoriesProps {
    initialCars?: Car[]
  }

export default function FinalCarouselDemo() {
    const [cars, setCars] = useState<Car[]>([])


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


  return (
    <div className="max-w-4xl mx-auto">
      <Sliding3DCarousel autoRotate={true} autoRotateSpeed={8000} className="w-full">
        {cars.map((vehicle) => (
          <FinalVehicleCard key={vehicle.id} {...vehicle} />
        ))}
      </Sliding3DCarousel>
    </div>
  )
}

