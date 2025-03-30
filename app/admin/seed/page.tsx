"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { seedCars } from "@/scripts/seed-cars"

export default function SeedPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleSeedCars = async () => {
    setLoading(true)
    try {
      const response = await seedCars()
      setResult(response.message)
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Seed Database</h1>
      <p className="text-gray-600">
        Use this page to add sample data to your database. This is useful for testing and development.
      </p>

      <div className="space-y-4">
        <div className="p-4 border rounded-md">
          <h2 className="text-xl font-semibold mb-2">Cars</h2>
          <p className="text-gray-600 mb-4">
            Add sample cars to your database. This will add 5 cars with different properties.
          </p>
          <Button onClick={handleSeedCars} disabled={loading}>
            {loading ? "Adding Cars..." : "Add Sample Cars"}
          </Button>
        </div>
      </div>

      {result && (
        <div className="p-4 bg-gray-100 rounded-md">
          <h3 className="font-semibold mb-2">Result:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  )
}

