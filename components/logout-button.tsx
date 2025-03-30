"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { signOut } from "@/app/auth/actions"

export function LogoutButton() {
  return (
    <form action={signOut}>
      <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </form>
  )
}

