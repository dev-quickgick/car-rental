import Image from "next/image"
import ReservationForm from "@/components/reservation-form"
import StatsSection from "@/components/StatsSection"
import VehicleCategories from "@/components/VehicleCategories"
import Title from "@/components/Title"
import AboutSection from "@/components/about-section"
import ProcessSection from "@/components/process-section"
import { getCars } from "@/lib/db"
import HeroSection from "@/components/hero"
import FinalCarouselDemo from "@/components/vehicle-carousel"

export default async function Home() {
  const cars = await getCars()

  return (
    <main className="text-gray-800">
      {/* Hero Section */}
      <section className="relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/carousel-2.jpg"
            alt="Desert mountain landscape with car"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* <div className="container relative z-10 mx-auto px-16 pt-32 pb-20 flex flex-col lg:flex-row items-center gap-8">
          {/* Reservation Form */}
          {/* <ReservationForm /> */}

          {/* Hero Content */}
          {/* <div className="w-full lg:w-6/12 text-black pl-0 lg:pl-12 hidden lg:block fadeInRight">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Get 15% off your rental</h1>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Plan your trip now</h2>
            <p className="text-xl mb-8">Experience the freedom of the open road with our premium car rentals.</p>
          </div>
        </div> */}

        <HeroSection/>
      </section>

      <StatsSection />

      {/* Vehicle Categories Section */}
      
      {/* Title Component */}
      <div className="container mx-auto px-16 pt-16">
        <Title
          title="Vehicle"
          highlight="Categories"
          description="Explore our diverse range of vehicles to find the perfect match for your journey. From compact cars to luxury SUVs, we have options to suit every need and budget."
        />
      </div>
      {/* <VehicleCategories initialCars={cars} /> */}
      <FinalCarouselDemo></FinalCarouselDemo>

      {/* About Section */}
      <AboutSection />

      {/* Process Section */}
      <ProcessSection />
    </main>
  )
}

