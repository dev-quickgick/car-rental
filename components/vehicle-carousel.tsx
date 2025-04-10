// "use client"
// import FinalVehicleCard from "./vehicle-card"
// import type { Car } from "@/lib/supabase"
// import { getCars } from "@/lib/db"
// import { useEffect, useState } from "react"
// import Sliding3DCarousel from "./sliding-3d-carousel"

// interface VehicleCategoriesProps {
//     initialCars?: Car[]
//   }

// export default function FinalCarouselDemo() {
//     const [cars, setCars] = useState<Car[]>([])


//       //fetch Cars
//     useEffect(() => {
//         console.log("Hello BRO");
        
//         const fetchCars = async () => {
//         try {
//             const cars = await getCars();
//             console.log("Fetched cars:", cars); // Debugging
//             setCars(cars);
//         } catch (error) {
//             console.error("Error fetching cars:", error);
//         }
//         };

    
//         fetchCars();
//     }, []);


//   return (
//     <div className="max-w-4xl mx-auto">
//       {cars.length > 3 ?
//         <Sliding3DCarousel autoRotate={true} autoRotateSpeed={8000} className="w-full">
//           {cars.map((vehicle) => (
//             <FinalVehicleCard key={vehicle.id} {...vehicle} />
//           ))}
//         </Sliding3DCarousel>
//         :
//         { cars.length === 0 ?
//           <div className="text-center text-gray-500 py-8">
//             <p className="text-lg">No vehicles available at the moment.</p>
//           </div>
//           :
//         }
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {cars.map((vehicle) => (
//             <FinalVehicleCard key={vehicle.id} {...vehicle} />
//           ))}
//         </div>
//         }
//     </div>
//   )
// }

"use client"

import FinalVehicleCard from "./vehicle-card"
import type { Car } from "@/lib/supabase"
import { getCars } from "@/lib/db"
import { useEffect, useState } from "react"
import Sliding3DCarousel from "./sliding-3d-carousel"

export default function FinalCarouselDemo() {
  const [cars, setCars] = useState<Car[]>([])

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const cars = await getCars()
        console.log("Fetched cars:", cars)
        setCars(cars)
      } catch (error) {
        console.error("Error fetching cars:", error)
      }
    }

    fetchCars()
  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      {cars.length > 3 ? (
        <Sliding3DCarousel autoRotate={true} autoRotateSpeed={8000} className="w-full">
          {cars.map((vehicle) => (
            <FinalVehicleCard key={vehicle.id} {...vehicle} />
          ))}
        </Sliding3DCarousel>
      ) : cars.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <p className="text-lg">No vehicles available at the moment.</p>
        </div>
      ) : (
        <div className="flex justify-center space-between gap-2">
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"> */}
            {cars.map((vehicle) => (
              <FinalVehicleCard key={vehicle.id} {...vehicle} />
            ))}
          {/* </div> */}
        </div>

      )}
    </div>
  )
}


