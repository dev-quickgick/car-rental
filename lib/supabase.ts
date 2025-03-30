import { createClient } from "@supabase/supabase-js"

// Types for our database
export type Car = {
  id: string;
  name: string;
  brand: string;
  year: number;
  price_per_day: number;
  image_url: string;
  rating: number,
  seats: number,
  transmission: string,
  fuel: string,
  auto: string,
  mileage: string, 
};


export type FormResponse = {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  car_type: string | null
  pickup_location: string | null
  dropoff_location: string | null
  pickup_date: string | null
  dropoff_date: string | null
  created_at: string
  pickup_time: string | null
  dropoff_time: string | null
}

export type AdminUser = {
  id: string
  email: string
  created_at: string
  is_super_admin: boolean
}

// Debug function to safely log environment variable status without exposing values
const debugEnvVars = () => {
  console.log("Environment variables status:")
  console.log("- SUPABASE_URL:", process.env.SUPABASE_URL ? "defined" : "undefined")
  console.log("- SUPABASE_SERVICE_ROLE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "defined" : "undefined")
  console.log("- NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "defined" : "undefined")
  console.log("- NEXT_PUBLIC_SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "defined" : "undefined")
}

// Log environment variable status (without exposing actual values)
debugEnvVars()

// Create a dummy client for when Supabase is not available
const createDummyClient = () => {
  return {
    from: () => ({
      select: () => ({
        order: () => ({
          data: [],
          error: null,
        }),
        eq: () => ({
          single: () => ({
            data: null,
            error: null,
          }),
          data: [],
          error: null,
        }),
        delete: () => ({
          error: null,
        }),
        insert: () => ({
          select: () => ({
            data: [],
            error: null,
          }),
        }),
        update: () => ({
          eq: () => ({
            select: () => ({
              data: [],
              error: null,
            }),
          }),
        }),
      }),
      insert: () => ({
        select: () => ({
          data: [],
          error: null,
        }),
      }),
      delete: () => ({
        eq: () => ({
          error: null,
        }),
      }),
      update: () => ({
        eq: () => ({
          select: () => ({
            data: [],
            error: null,
          }),
        }),
      }),
    }),
    auth: {
      signUp: () => ({ data: null, error: null }),
      signInWithPassword: () => ({ data: null, error: null }),
      signOut: () => ({ error: null }),
      getSession: () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } }, error: null }),
    },
  } as unknown as ReturnType<typeof createClient>
}

// Server-side Supabase client
let supabaseServer: ReturnType<typeof createClient>

try {
  // Only create the client if both environment variables are defined and not empty
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    supabaseServer = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
    console.log("Server Supabase client created successfully")
  } else {
    console.warn("Missing server Supabase environment variables, using dummy client")
    supabaseServer = createDummyClient()
  }
} catch (error) {
  console.error("Error creating server Supabase client:", error)
  supabaseServer = createDummyClient()
}

// Client-side Supabase client (singleton)
let supabaseClient: ReturnType<typeof createClient> | null = null

export const getSupabaseClient = () => {
  // If we already have a client instance, return it
  if (supabaseClient) return supabaseClient

  try {
    // Only create the client if both environment variables are defined and not empty
    if (
      typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
      process.env.NEXT_PUBLIC_SUPABASE_URL.trim() !== "" &&
      typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "string" &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.trim() !== ""
    ) {
      supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
      console.log("Client Supabase client created successfully")
      return supabaseClient
    } else {
      console.error("Missing client Supabase environment variables")
      throw new Error("Supabase configuration is incomplete. Check your environment variables.")
    }
  } catch (error) {
    console.error("Error creating client Supabase client:", error)
    throw error
  }
}

// Export the server instance
export { supabaseServer }

