"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/auth"

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string

  if (!email || !password || !name) {
    return {
      error: "All fields are required",
    }
  }

  if (password.length < 6) {
    return {
      error: "Password must be at least 6 characters",
    }
  }

  const supabase = createServerClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  })

  if (error) {
    return {
      error: error.message,
    }
  }

  return {
    message: "Sign up successful. Please check your email to verify your account.",
  }
}

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return {
      error: "Email and password are required",
    }
  }

  const supabase = createServerClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return {
      error: error.message,
    }
  }

  // Set a cookie to indicate admin login
  const cookieStore = await cookies();
  cookieStore.set("admin_logged_in", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  return {
    success: true,
  }
}

export async function signOut() {
  const supabase = createServerClient()
  await supabase.auth.signOut()

  // Clear the admin cookie
  const cookieStore = await cookies();
  cookieStore.set("admin_logged_in", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  })

  redirect("/auth/login")
}

