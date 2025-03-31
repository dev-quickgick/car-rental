"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { useState, useEffect, useRef } from "react"

interface PageBannerProps {
  title: string
  breadcrumbs: { label: string; href: string }[]
}

export default function PageBanner({ title, breadcrumbs }: PageBannerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Small delay to ensure the animation is noticeable
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div ref={bannerRef} className="relative pt-20 md:pt-20">
      <div className="relative h-64">
        <Image src="/images/fact-bg.jpg" alt="Page banner background" fill className="object-cover" />
        <div className="absolute inset-0 bg-blue-950 bg-opacity-85" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h1
            className={`text-4xl font-bold mb-4 transition-all duration-700 transform ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
            }`}
          >
            {title}
          </h1>
          <nav
            className={`flex items-center space-x-2 text-sm transition-all duration-700 delay-200 transform ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
            }`}
          >
            <Link href="/" className="hover:text-red-500">
              Home
            </Link>
            {breadcrumbs.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <ChevronRight className="w-4 h-4" />
                <Link href={item.href} className="text-red-500">
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

