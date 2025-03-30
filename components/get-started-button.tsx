"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function GetStartedButton() {
  return (
    <Link href="/contact">
      <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6">Get Started</Button>
    </Link>
  )
}

