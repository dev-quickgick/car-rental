"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, CarIcon, Menu, X } from "lucide-react"
import { GetStartedButton } from "@/components/get-started-button"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="fixed w-full z-50">
      {/* Top Bar */}
      <div className="bg-navy-900 text-white py-2">
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <Link href="#" className="flex items-center gap-1 hover:text-red-500">
              <MapPin className="h-4 w-4 text-red-500" />
              <span>Find A Location</span>
            </Link>
            <Link href="tel:+01234567890" className="flex items-center gap-1 hover:text-red-500">
              <Phone className="h-4 w-4 text-red-500" />
              <span>+01234567890</span>
            </Link>
            <Link href="mailto:Example@gmail.com" className="flex items-center gap-1 hover:text-red-500">
              <Mail className="h-4 w-4 text-red-500" />
              <span>Example@gmail.com</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="#"
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-red-600 hover:bg-red-500 hover:text-white"
            >
              <Facebook className="h-4 w-4" />
            </Link>
            <Link
              href="#"
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-red-600 hover:bg-red-500 hover:text-white"
            >
              <Twitter className="h-4 w-4" />
            </Link>
            <Link
              href="#"
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-red-600 hover:bg-red-500 hover:text-white"
            >
              <Instagram className="h-4 w-4" />
            </Link>
            <Link
              href="#"
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-red-600 hover:bg-red-500 hover:text-white"
            >
              <Linkedin className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <CarIcon className="h-12 w-12 text-red-600" />
            <span className="text-3xl font-bold text-red-600">INFINITI AUTO GROUP</span>
          </Link>

          <div className="hidden md:flex items-center">
            <nav className="flex items-center">
              <Link href="/" className="px-5 py-2 font-medium text-gray-800 hover:text-red-600">
                Home
              </Link>
              <Link href="/cars" className="px-5 py-2 font-medium text-gray-800 hover:text-red-600">
                Cars
              </Link>
              <Link href="/about-us" className="px-5 py-2 font-medium text-gray-800 hover:text-red-600">
                About Us
              </Link>
              <Link href="/contact" className="px-5 py-2 font-medium text-gray-800 hover:text-red-600">
                Contact
              </Link>
            </nav>

            <div className="ml-6">
              <GetStartedButton />
            </div>
          </div>

          <button
            className="md:hidden text-red-600 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="flex flex-col py-4">
            <Link
              href="/"
              className="px-6 py-3 font-medium text-gray-800 hover:text-red-600 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/cars"
              className="px-6 py-3 font-medium text-gray-800 hover:text-red-600 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cars
            </Link>
            <Link
              href="/about-us"
              className="px-6 py-3 font-medium text-gray-800 hover:text-red-600 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 font-medium text-gray-800 hover:text-red-600 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="px-6 py-3">
              <GetStartedButton />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

