import type { ReactNode } from "react"
import Link from "next/link"
import { Car, FileText, LayoutDashboard, Package } from "lucide-react"
import { LogoutButton } from "@/components/logout-button"
import { protectRoute } from "@/lib/auth"
import { Toaster } from "@/components/ui/toaster"

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // Protect all admin routes
  await protectRoute()

  return (

    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md mt-28">
        <div className="p-6">
          <Link href="/" className="flex items-center space-x-2">
            <Car className="h-6 w-6 text-red-600" />
            <span className="text-xl font-bold">Infiniti Auto</span>
          </Link>
        </div>
        <div>
        <nav className="mt-6">
          <div className="px-4 py-2">
            <h2 className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Management</h2>
            <div className="mt-3 space-y-1">
              <Link href="/admin" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                <LayoutDashboard className="h-5 w-5 mr-3 text-gray-500" />
                Dashboard
              </Link>
              <Link
                href="/admin/cars"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Package className="h-5 w-5 mr-3 text-gray-500" />
                Cars
              </Link>
              <Link
                href="/admin/form-responses"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <FileText className="h-5 w-5 mr-3 text-gray-500" />
                Form Responses
              </Link>
            </div>
          </div>
          <div className="px-4 py-2 mt-8">
            <h2 className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Account</h2>
            <div className="mt-3 space-y-1">
              <LogoutButton />
            </div>
          </div>
        </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <main className="p-6 mt-28">{children}</main>
      </div>
      <Toaster />
    </div>
  )
}

