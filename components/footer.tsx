"use client"

import Link from "next/link"
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // Stop observing after animation starts
        }
      },
      { threshold: 0.1 }, // Trigger when 10% of the footer is visible
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <footer
      ref={footerRef}
      className={`bg-[#0f172a] text-white py-16 relative transition-opacity duration-1000 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Us Section */}
          <div>
            <h3 className="text-2xl font-bold mb-6">About Us</h3>
            <p className="text-gray-300 mb-6">
              Dolor amet sit justo amet elitr clita ipsum elitr est.Lorem ipsum dolor sit amet, consectetur adipiscing
              elit consectetur adipiscing elit.
            </p>
            <div className="flex items-center">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white text-gray-800 rounded-l-full rounded-r-none border-0 focus-visible:ring-0"
              />
              <Button className="bg-red-600 hover:bg-red-700 text-white rounded-l-none rounded-r-full">
                Contact Now
              </Button>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-gray-300 hover:text-red-500 flex items-center">
                  <span className="mr-2">›</span> Home
                </Link>
              </li>
              <li>
                <Link href="/cars" className="text-gray-300 hover:text-red-500 flex items-center">
                  <span className="mr-2">›</span> Cars
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-gray-300 hover:text-red-500 flex items-center">
                  <span className="mr-2">›</span> About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-red-500 flex items-center">
                  <span className="mr-2">›</span> Contact
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="text-gray-300 hover:text-red-500 flex items-center">
                  <span className="mr-2">›</span> Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Business Hours Section */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Business Hours</h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-300">Mon - Friday:</p>
                <p className="text-white font-medium">09.00 am to 07.00 pm</p>
              </div>
              <div>
                <p className="text-gray-300">Saturday:</p>
                <p className="text-white font-medium">10.00 am to 05.00 pm</p>
              </div>
              <div>
                <p className="text-gray-300">Vacation:</p>
                <p className="text-white font-medium">All Sunday is our vacation</p>
              </div>
            </div>
          </div>

          {/* Contact Info Section */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="group">
                <Link href="#" className="flex items-start gap-3 transition-all duration-300">
                  <MapPin className="h-5 w-5 text-red-500 mt-1 flex-shrink-0 group-hover:scale-110 transition-all duration-300" />
                  <span className="text-gray-300 group-hover:text-red-500 group-hover:scale-105 transition-all duration-300">
                    123 Street, New York, USA
                  </span>
                </Link>
              </li>
              <li className="group">
                <Link href="mailto:info@example.com" className="flex items-center gap-3 transition-all duration-300">
                  <Mail className="h-5 w-5 text-red-500 flex-shrink-0 group-hover:scale-110 transition-all duration-300" />
                  <span className="text-gray-300 group-hover:text-red-500 group-hover:scale-105 transition-all duration-300">
                    info@example.com
                  </span>
                </Link>
              </li>
              <li className="group">
                <Link href="tel:+01234567890" className="flex items-center gap-3 transition-all duration-300">
                  <Phone className="h-5 w-5 text-red-500 flex-shrink-0 group-hover:scale-110 transition-all duration-300" />
                  <span className="text-gray-300 group-hover:text-red-500 group-hover:scale-105 transition-all duration-300">
                    +012 345 67890
                  </span>
                </Link>
              </li>
              <li className="group">
                <Link href="tel:+01234567890" className="flex items-center gap-3 transition-all duration-300">
                  <Phone className="h-5 w-5 text-red-500 flex-shrink-0 group-hover:scale-110 transition-all duration-300" />
                  <span className="text-gray-300 group-hover:text-red-500 group-hover:scale-105 transition-all duration-300">
                    +012 345 67890
                  </span>
                </Link>
              </li>
            </ul>

            {/* Social Media Icons */}
            <div className="flex gap-3 mt-6">
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <Link
        href="#"
        className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition-colors duration-300"
        onClick={(e) => {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
      >
        <ArrowUp className="h-6 w-6" />
      </Link>
    </footer>
  )
}

