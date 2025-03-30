"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function SchemaPage() {
  const [copied, setCopied] = useState(false)

  const schemaSQL = `
-- Create cars table
CREATE TABLE IF NOT EXISTS cars (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  year INTEGER NOT NULL,
  price_per_day DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create form_responses table
CREATE TABLE IF NOT EXISTS form_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  car_type TEXT,
  pickup_location TEXT,
  dropoff_location TEXT,
  pickup_date TEXT,
  dropoff_date TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  car_id UUID NOT NULL REFERENCES cars(id),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  pickup_location TEXT NOT NULL,
  dropoff_location TEXT NOT NULL,
  pickup_date TIMESTAMP WITH TIME ZONE NOT NULL,
  dropoff_date TIMESTAMP WITH TIME ZONE NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_cars_brand ON cars(brand);
CREATE INDEX IF NOT EXISTS idx_bookings_car_id ON bookings(car_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_form_responses_email ON form_responses(email);
  `.trim()

  const copyToClipboard = () => {
    navigator.clipboard.writeText(schemaSQL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Database Schema</h1>
      <p className="text-gray-600">
        Use this SQL script to set up the necessary tables in your Supabase database. Copy this SQL and run it in the
        Supabase SQL editor.
      </p>

      <div className="bg-gray-100 p-4 rounded-md">
        <Textarea value={schemaSQL} readOnly className="min-h-[400px] font-mono text-sm" />
      </div>

      <Button onClick={copyToClipboard}>{copied ? "Copied!" : "Copy SQL to Clipboard"}</Button>

      <div className="bg-yellow-100 p-4 rounded-md border border-yellow-300">
        <h2 className="text-lg font-semibold text-yellow-800 mb-2">Important Note</h2>
        <p className="text-yellow-800">
          Make sure to run this SQL script in your Supabase SQL editor before using the application. This will create
          all the necessary tables and relationships for the car rental system to work properly.
        </p>
      </div>
    </div>
  )
}

