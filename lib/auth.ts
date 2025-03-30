import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export function createServerClient() {
  const cookieStore = cookies()

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    // cookies: {
    //   get(name: string) {
    //     return cookieStore.get(name)?.value
    //   },
    //   set(name: string, value: string, options: any) {
    //     cookieStore.set({ name, value, ...options })
    //   },
    //   remove(name: string, options: any) {
    //     cookieStore.set({ name, value: "", ...options })
    //   },
    // },
  })

  return supabase
}

export async function isAuthenticated() {
  const cookieStore = await cookies()
  const isLoggedIn = cookieStore.get("admin_logged_in")?.value === "true"
  return isLoggedIn
}

export async function getCurrentUser() {
  const supabase = createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function protectRoute() {
  const isLoggedIn = await isAuthenticated()

  if (!isLoggedIn) {
    redirect("/auth/login")
  }
}

