import Image from "next/image"
import PageBanner from "@/components/page-banner"
import AboutSection from "@/components/about-section"
import StatsSection from "@/components/StatsSection"
import FeaturesSection from "@/components/features-section"
import ProcessSection from "@/components/process-section"

export default function AboutUsPage() {
  return (
    <main className="text-gray-800">
      {/* Page Banner */}
      <PageBanner title="About Us" breadcrumbs={[{ label: "About Us", href: "/about-us" }]} />

      {/* About Section */}
      <AboutSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Process Section */}
      <ProcessSection />

      {/* Team Section - Original content */}
      <div className="container mx-auto px-16 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Our Leadership <span className="text-red-600">Team</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet the dedicated professionals who lead our company with vision, expertise, and a commitment to
            excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
              <Image src="/images/team-1.jpg" alt="John Thompson" fill className="object-cover" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">John Thompson</h3>
            <p className="text-red-600 font-medium">CEO & Co-Founder</p>
          </div>
          <div className="text-center">
            <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
              <Image src="/images/team-2.jpg" alt="Sarah Thompson" fill className="object-cover" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Sarah Thompson</h3>
            <p className="text-red-600 font-medium">COO & Co-Founder</p>
          </div>
          <div className="text-center">
            <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
              <Image src="/images/team-3.jpg" alt="Michael Chen" fill className="object-cover" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Michael Chen</h3>
            <p className="text-red-600 font-medium">CTO</p>
          </div>
          <div className="text-center">
            <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
              <Image src="/images/team-4.jpg" alt="Emily Rodriguez" fill className="object-cover" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Emily Rodriguez</h3>
            <p className="text-red-600 font-medium">CMO</p>
          </div>
        </div>
      </div>
    </main>
  )
}

