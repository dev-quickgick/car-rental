import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Car, User } from "lucide-react"
import { getAdminDashboardStats } from "@/app/actions"
import { getCurrentUser } from "@/lib/auth"

export default async function AdminDashboard() {
  const user = await getCurrentUser()
  let stats = { carsCount: 0, responsesCount: 0 }

  try {
    stats = await getAdminDashboardStats()
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    // Use default values of 0 for both counts
  }

  return (
    <div className="space-y-12 pt-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
        {user && (
          <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-sm">
            <User className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">{user.email}</span>
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/admin/form-responses">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Form Responses</CardTitle>
              <FileText className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.responsesCount}</div>
              <p className="text-xs text-gray-600">Total responses</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/cars">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Cars</CardTitle>
              <Car className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.carsCount}</div>
              <p className="text-xs text-gray-600">Total cars</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

