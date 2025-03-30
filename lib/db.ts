"use server"
import { supabaseServer, type Car, type FormResponse } from "./supabase"

// Mock data for when Supabase is not available
const mockCars: Car[] = [
  {
    id: "1",
    name: "Mercedes Benz R3",
    brand: "Mercedes",
    year: 2022,
    price_per_day: 99,
    image_url:"",
    rating: 4.5,
    seats: 4,
    transmission: "AT/MT",
    fuel: "Petrol",
    auto: "AUTO",
    mileage: "27K",
  },
  {
    id: "2",
    name: "Toyota Corolla Cross",
    brand: "Toyota",
    year: 2021,
    price_per_day: 128,
    image_url:"",
    rating: 4.5,
    seats: 4,
    transmission: "AT/MT",
    fuel: "Petrol",
    auto: "AUTO",
    mileage: "27K",
  },
]

// Cars functions
export async function getCars() {
  try {
    console.log("Fetching cars from database...")
    const { data, error } = await supabaseServer.from("cars").select("*").order("id", { ascending: false })
    // console.log(data);
    
    if (error) {
      console.error("Error fetching cars:", error)
      console.log("Returning mock car data instead")
      return mockCars
    }

    console.log(`Successfully fetched ${data.length} cars`)
    return data as Car[]
  } catch (e) {
    console.error("Exception fetching cars:", e)
    console.log("Returning mock car data instead")
    return mockCars
  }
}

export async function getCarById(id: string) {
  try {
    const { data, error } = await supabaseServer.from("cars").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching car:", error)
      return null
    }

    return data as Car
  } catch (e) {
    console.error("Exception fetching car:", e)
    return null
  }
}

export async function addCar(car: Omit<Car, "id">) {
  try {
    const { data, error } = await supabaseServer.from("cars").insert([car]).select()

    if (error) {
      console.error("Error adding car:", error)
      return null
    }

    return data[0] as Car
  } catch (e) {
    console.error("Exception adding car:", e)
    return null
  }
}

// Upload Image to Supabase Storage
export async function uploadCarImage(file: File){
  try {
    const fileName = `cars/${Date.now()}-${file.name}`

    const { data, error } = await supabaseServer.storage
      .from("car-images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      })

    if (error) {
      console.error("Image upload error:", error)
      return null
    }

    // Get public URL
    const { data: publicUrlData } = supabaseServer.storage.from("car-images").getPublicUrl(fileName)

    console.log(publicUrlData)
    
    return publicUrlData.publicUrl

  } catch (err) {
    console.error("Error uploading image:", err)
    return null
  }
}

export async function updateCar(id: string, car: Partial<Car>) {
  try {
    const { data, error } = await supabaseServer.from("cars").update(car).eq("id", id).select()

    if (error) {
      console.error("Error updating car:", error)
      return null
    }

    return data[0] as Car
  } catch (e) {
    console.error("Error updating car:", e)
    return null
  }
}

export async function deleteCar(id: string) {
  try {
    const { error } = await supabaseServer.from("cars").delete().eq("id", id)

    if (error) {
      console.error("Error deleting car:", error)
      return false
    }

    return true
  } catch (e) {
    console.error("Error deleting car:", e)
    return false
  }
}

// Mock data for form responses
const mockFormResponses: FormResponse[] = []

// Form responses functions
export async function getFormResponses() {
  try {
    const { data, error } = await supabaseServer
      .from("form_responses")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching form responses:", error)
      return []
    }

    return data as FormResponse[]
  } catch (e) {
    console.error("Error fetching form responses:", e)
    return []
  }
}

export async function submitFormResponse(formResponse: Omit<FormResponse, "id" | "created_at">) {
  try {
    const { data, error } = await supabaseServer.from("form_responses").insert([formResponse]).select()

    if (error) {
      console.error("Error submitting form response:", error)
      return null
    }

    return data[0] as FormResponse
  } catch (e) {
    console.error("Error submitting form response:", e)
    return null
  }
}



// Dashboard stats
export async function getDashboardStats() {
  try {
    const { count: carsCount, error: carsError } = await supabaseServer
      .from("cars")
      .select("*", { count: "exact", head: true })

    const { count: responsesCount, error: responsesError } = await supabaseServer
      .from("form_responses")
      .select("*", { count: "exact", head: true })

    if (carsError || responsesError) {
      console.error("Error fetching stats:", carsError || responsesError)
      return { carsCount: 0, responsesCount: 0 }
    }

    return { carsCount: carsCount || 0, responsesCount: responsesCount || 0 }
  } catch (e) {
    console.error("Error fetching dashboard stats:", e)
    return { carsCount: 0, responsesCount: 0 }
  }
}

