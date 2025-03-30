"use server"

import { revalidatePath } from "next/cache"
import { addCar, updateCar, deleteCar, submitFormResponse, getDashboardStats, uploadCarImage } from "@/lib/db"
import type { Car, FormResponse } from "@/lib/supabase"

export async function submitReservationForm(formData: FormData) {
  try {
    const formResponse: Omit<FormResponse, "id" | "created_at"> = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: "Reservation request",
      car_type: formData.get("car_type") as string,
      pickup_location: formData.get("pickup_location") as string,
      dropoff_location: (formData.get("dropoff_location") as string) || null,
      pickup_date: formData.get("pickup_date") as string,
      dropoff_date: formData.get("dropoff_date") as string,
      pickup_time: formData.get("pickup_time") as string,
      dropoff_time: formData.get("dropoff_time") as string,
    }

    const result = await submitFormResponse(formResponse)

    if (!result) {
      return { success: false, message: "Failed to submit form" }
    }

    return { success: true, message: "Form submitted successfully" }
  } catch (error) {
    console.error("Error in submitReservationForm:", error)
    return { success: false, message: "An error occurred while submitting the form" }
  }
}

export async function submitContactForm(formData: FormData) {
  try {
    const formResponse: Omit<FormResponse, "id" | "created_at"> = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || null,
      message: formData.get("message") as string,
      car_type: null,
      pickup_location: null,
      dropoff_location: null,
      pickup_date: null,
      dropoff_date: null,
      pickup_time: null,
      dropoff_time: null,
    }

    const result = await submitFormResponse(formResponse)

    if (!result) {
      return { success: false, message: "Failed to submit form" }
    }

    return { success: true, message: "Form submitted successfully" }
  } catch (error) {
    console.error("Error in submitContactForm:", error)
    return { success: false, message: "An error occurred while submitting the form" }
  }
}

export async function adminAddCar(formData: FormData) {
  try {
    const car: Omit<Car, "id"> = {
      name: formData.get("name") as string,
      brand: formData.get("brand") as string,
      year: Number.parseInt(formData.get("year") as string),
      price_per_day: Number.parseFloat(formData.get("price_per_day") as string),
      image_url:formData.get("image") as string,
      rating: Number.parseFloat(formData.get("rating") as string),
      seats: Number.parseInt(formData.get("seats") as string),
      transmission: formData.get("transmission") as string,
      fuel: formData.get("fuel") as string,
      auto: formData.get("auto") as string,
      mileage: formData.get("mileage") as string,
    }

    const result = await addCar(car)

    if (!result) {
      return { success: false, message: "Failed to add car" }
    }

    revalidatePath("/admin/cars")
    return { success: true, message: "Car added successfully" }
  } catch (error) {
    console.error("Error in adminAddCar:", error)
    return { success: false, message: "An error occurred while adding the car" }
  }
}

export async function adminUpdateCar(id: string, formData: FormData) {
  try {
    const car: Partial<Car> = {
      name: formData.get("name") as string,
      brand: formData.get("brand") as string,
      year: Number.parseInt(formData.get("year") as string),
      price_per_day: Number.parseFloat(formData.get("price_per_day") as string),
    }

    const result = await updateCar(id, car)

    if (!result) {
      return { success: false, message: "Failed to update car" }
    }

    revalidatePath("/admin/cars")
    return { success: true, message: "Car updated successfully" }
  } catch (error) {
    console.error("Error in adminUpdateCar:", error)
    return { success: false, message: "An error occurred while updating the car" }
  }
}

export async function adminDeleteCar(id: string) {
  try {
    const result = await deleteCar(id)

    if (!result) {
      return { success: false, message: "Failed to delete car" }
    }

    revalidatePath("/admin/cars")
    return { success: true, message: "Car deleted successfully" }
  } catch (error) {
    console.error("Error in adminDeleteCar:", error)
    return { success: false, message: "An error occurred while deleting the car" }
  }
}

export async function adminuploadCarImage(file:File){
  try {
    const result = await uploadCarImage(file);
    console.log(result)

    if (!result) {
      return { success: false, message: "Failed to upload car image",imageUrl:result}
    }

    revalidatePath("/admin/cars")
    return { success: true, message: "Image uploaded successfully" ,imageUrl:result}

  } catch (error) {
    console.error("Error in adminuploadingImage:", error)
    return { success: false, message: "An error occurred while uploading the car image" }
  }
}

export async function getAdminDashboardStats() {
  try {
    return await getDashboardStats()
  } catch (error) {
    console.error("Error in getAdminDashboardStats:", error)
    return { carsCount: 0, responsesCount: 0 }
  }
}

export async function bookCar(formData: FormData) {
  try {
    // Placeholder implementation - replace with actual booking logic
    console.log("Booking car with data:", Object.fromEntries(formData.entries()))
    return { success: true, message: "Car booked successfully (placeholder)" }
  } catch (error) {
    console.error("Error in bookCar:", error)
    return { success: false, message: "An error occurred while booking the car" }
  }
}

