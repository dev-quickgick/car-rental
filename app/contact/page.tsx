"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { MapPin, Mail, Phone, Globe, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import PageBanner from "@/components/page-banner"
import { submitContactForm } from "@/app/actions"
import { toast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Create separate refs and visibility states for different sections
  const contactInfoRef = useRef<HTMLDivElement>(null)
  const formSectionRef = useRef<HTMLDivElement>(null)
  const socialSectionRef = useRef<HTMLDivElement>(null)
  const branchSectionRef = useRef<HTMLDivElement>(null)
  const mapSectionRef = useRef<HTMLDivElement>(null)

  const [contactInfoVisible, setContactInfoVisible] = useState(false)
  const [formSectionVisible, setFormSectionVisible] = useState(false)
  const [socialSectionVisible, setSocialSectionVisible] = useState(false)
  const [branchSectionVisible, setBranchSectionVisible] = useState(false)
  const [mapSectionVisible, setMapSectionVisible] = useState(false)

  useEffect(() => {
    // Create a reusable Intersection Observer
    const createObserver = (
      ref: React.RefObject<HTMLDivElement | null>,
      setVisibleFn: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleFn(true)
            observer.disconnect() // Stop observing after animation starts
          }
        },
        { threshold: 0.2 }, // Trigger when 20% of the section is visible
      )

      if (ref.current) {
        observer.observe(ref.current)
      }

      return observer
    }

    // // Create observers for each section
    const contactInfoObserver = createObserver(contactInfoRef, setContactInfoVisible)
    const formSectionObserver = createObserver(formSectionRef, setFormSectionVisible)
    const socialSectionObserver = createObserver(socialSectionRef, setSocialSectionVisible)
    const branchSectionObserver = createObserver(branchSectionRef, setBranchSectionVisible)
    const mapSectionObserver = createObserver(mapSectionRef, setMapSectionVisible)

    // Cleanup function
    return () => {
      contactInfoObserver.disconnect()
      formSectionObserver.disconnect()
      socialSectionObserver.disconnect()
      branchSectionObserver.disconnect()
      mapSectionObserver.disconnect()
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formDataToSubmit = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSubmit.append(key, value)
    })

    const result = await submitContactForm(formDataToSubmit)

    setIsSubmitting(false)

    if (result.success) {
      toast({
        title: "Success",
        description: "Your message has been sent successfully!",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    } else {
      toast({
        title: "Error",
        description: result.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const contactInfo = [
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Address",
      details: "123 Street, New York, USA",
      delay: 0.1,
    },
    {
      icon: <Mail className="h-8 w-8" />,
      title: "Mail Us",
      details: "info@example.com",
      delay: 0.2,
    },
    {
      icon: <Phone className="h-8 w-8" />,
      title: "Telephone",
      details: "(+012) 3456 7890",
      delay: 0.3,
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Yoursite@ex.com",
      details: "(+012) 3456 7890",
      delay: 0.4,
    },
  ]

  const branches = [
    {
      name: "Our Branch 01",
      address: "123 Street New York, USA",
      telephone: "(+012) 3456 7890",
    },
    {
      name: "Our Branch 02",
      address: "123 Street New York, USA",
      telephone: "(+012) 3456 7890",
    },
    {
      name: "Our Branch 03",
      address: "123 Street New York, USA",
      telephone: "(+012) 3456 7890",
    },
  ]

  return (
    <main>
      <PageBanner title="Contact Us" breadcrumbs={[{ label: "Contact", href: "/contact" }]} />

      <div className="container mx-auto px-8 md:px-16 lg:px-24 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-red-600">Contact Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Lorem, ipsum dolor sit amet consectetur adipiscing elit. Aliquid, laudantium.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div ref={contactInfoRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className={`bg-gray-100 p-6 rounded-lg text-center fadeInUp ${contactInfoVisible ? "active" : ""}`}
              style={{ transitionDelay: `${info.delay}s` }}
            >
              <div className="morphing-icon bg-red-600 w-24 h-24 flex items-center justify-center mx-auto mb-4 text-white">
                {info.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{info.title}</h3>
              <p className="text-gray-600">{info.details}</p>
            </div>
          ))}
        </div>

        {/* Three Column Layout - Exactly as in the image */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch mb-16">
          {/* Contact Form - Left Column */}
          <div
            ref={formSectionRef}
            className={`w-full lg:w-[45%] bg-[#1e2a4a] p-8 rounded-lg fadeInUp ${formSectionVisible ? "active" : ""}`}
            style={{ transitionDelay: "0.5s" }}
          >
            <h3 className="text-2xl font-bold mb-6 text-red-600">Send Your Message</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-white text-black"
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-white text-black"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  name="phone"
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-white text-black"
                />
                <Input
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="bg-white text-black"
                />
              </div>

              <Textarea
                name="message"
                placeholder="Message"
                className="min-h-[150px] bg-white text-black"
                value={formData.message}
                onChange={handleChange}
                required
              />

              <Button
                type="submit"
                className="w-full bg-white text-red-600 hover:bg-red-600 hover:text-white font-bold"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Social Media - Middle Column */}
          <div
            ref={socialSectionRef}
            className={`w-full lg:w-[10%] flex flex-row lg:flex-col justify-start items-center gap-6 fadeInUp ${socialSectionVisible ? "active" : ""}`}
            style={{ transitionDelay: "0.6s" }}
          >
            <a
              href="#"
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300"
            >
              <Facebook className="h-5 w-5 text-red-600 hover:text-white" />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300"
            >
              <Twitter className="h-5 w-5 text-red-600 hover:text-white" />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300"
            >
              <Instagram className="h-5 w-5 text-red-600 hover:text-white" />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300"
            >
              <Linkedin className="h-5 w-5 text-red-600 hover:text-white" />
            </a>
          </div>

          {/* Branch Information - Right Column */}
          <div
            ref={branchSectionRef}
            className={`w-full lg:w-[45%] fadeInUp ${branchSectionVisible ? "active" : ""}`}
            style={{ transitionDelay: "0.7s" }}
          >
            <div className="bg-gray-100 p-6 rounded-lg h-full flex flex-col justify-between">
              {branches.map((branch, index) => (
                <div key={index} className="bg-white p-5 rounded-lg mb-4 last:mb-0 flex-grow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{branch.name}</h3>
                  <div className="flex items-start gap-2 mb-2">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700">Address:</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-red-600 mr-1 flex-shrink-0" />
                      <p className="text-gray-600">{branch.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700">Telephone:</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-red-600 mr-1 flex-shrink-0" />
                      <p className="text-gray-600">{branch.telephone}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Map Section */}
        <div
          ref={mapSectionRef}
          className={`w-full fadeInUp ${mapSectionVisible ? "active" : ""}`}
          style={{ transitionDelay: "0.3s" }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Find Us On <span className="text-red-600">Map</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visit our locations or use the map to get directions to our branches.
            </p>
          </div>

          <div className="w-full h-[450px] rounded-lg overflow-hidden shadow-lg border border-gray-200">
            {/* Using a different approach with the Google Maps JavaScript API */}
            <div className="relative w-full h-full">
              <iframe
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=New+York,NY&zoom=12&maptype=roadmap&language=en"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Infiniti Auto Group Location"
                className="w-full h-full"
                aria-label="Map showing our location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

