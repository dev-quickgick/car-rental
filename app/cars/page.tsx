import PageBanner from "@/components/page-banner"
import VehicleGrid from "@/components/VehicleGrid"
import ProcessSection from "@/components/process-section"
import Title from "@/components/Title"
import { getCars } from "@/lib/db"
import FinalCarouselDemo from "@/components/vehicle-carousel"

export default async function CarsPage() {
  const cars = await getCars()

  return (
    <main>
      {/* Page Banner */}
      <PageBanner title="Our Fleet" breadcrumbs={[{ label: "Cars", href: "/cars" }]} />

      {/* Title Component */}
      <div className="container mx-auto px-8 pt-16">
        <Title
          title="Vehicle"
          highlight="Categories"
          description="Explore our diverse range of vehicles to find the perfect match for your journey. From compact cars to luxury SUVs, we have options to suit every need and budget."
        />
      </div>

      {/* Vehicle Grid Section */}
      <VehicleGrid initialCars={cars} />
      {/* <FinalCarouselDemo></FinalCarouselDemo> */}

      {/* Process Section */}
      <ProcessSection />
    </main>
  )
}

