"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

export default function DirectLoginButton() {
  const router = useRouter()

  const handleDirectLogin = () => {
    // Set cookie for authentication
    document.cookie = "admin_logged_in=true; path=/; max-age=86400; SameSite=Lax"

    toast({
      title: "Direct login successful",
      description: "You have been logged in as admin",
    })

    // Add a small delay before redirecting
    setTimeout(() => {
      // Redirect to admin dashboard
      router.push("/admin")
    }, 500)
  }

  return (
    <Button
      variant="outline"
      className="w-full mt-4 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-300"
      onClick={handleDirectLogin}
    >
      Direct Login (Testing Only)
    </Button>
  )
}

