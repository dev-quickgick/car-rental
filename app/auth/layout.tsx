import type { ReactNode } from "react"
import { Inter } from "next/font/google"
import "../globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className={inter.className}>
        {children}
        <Toaster />
      </div>
    </div>
  )
}

