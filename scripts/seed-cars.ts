"use server"

import { addCar } from "@/lib/db"
import type { Car } from "@/lib/supabase"

export async function seedCars() {
  const cars: Omit<Car, "id">[] = [
    {
      name: "Mercedes Benz R3",
      brand: "Mercedes",
      year: 2022,
      price_per_day: 99,
    },
    {
      name: "Toyota Corolla Cross",
      brand: "Toyota",
      year: 2021,
      price_per_day: 128,
    },
    {
      name: "Tesla Model S Plaid",
      brand: "Tesla",
      year: 2023,
      price_per_day: 170,
    },
    {
      name: "BMW 5 Series",
      brand: "BMW",
      year: 2022,
      price_per_day: 145,
    },
    {
      name: "Audi A6",
      brand: "Audi",
      year: 2021,
      price_per_day: 135,
    },
  ]

  const results = []

  for (const car of cars) {
    const result = await addCar(car)
    results.push(result)
  }

  return { success: true, message: `Added ${results.filter(Boolean).length} cars` }
}

