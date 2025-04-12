"use client"
import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { adminAddCar, adminDeleteCar, adminUpdateCar, adminuploadCarImage } from "@/app/actions"
import { getCars } from "@/lib/db"
import type { Car } from "@/lib/supabase"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Pencil } from "lucide-react"

export default function ManageCars() {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(false)
  const [newCar, setNewCar] = useState({
    name: "",
    brand: "",
    year: new Date().getFullYear().toString(),
    price_per_day: "",
    rating: "",
    seats: "",
    transmission: "",
    fuel: "",
    auto: "AUTO",
    mileage: "",
  })

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingCar, setEditingCar] = useState<Car | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const imageInputRef = useRef<HTMLInputElement | null>(null)


  // const fetchCars = await getCars();
  // // console.log(fetchCars);
  // const cars : Car[]=fetchCars;
  // console.log(cars);
  
  // setCars(fetchCars)


  useEffect(() => {
    
    const fetchCars = async () => {
      setLoading(true);
      try {
        const cars = await getCars();
        console.log("Fetched cars:", cars); // Debugging
        setCars(cars);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCars();
  }, []);
  

  const handleAddCar = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    let imageUrl = ""

    if (imageFile) {
      // Upload the image to Supabase Storage
      const uploadedImageUrl = await adminuploadCarImage(imageFile)

      console.log(uploadedImageUrl)

      if (uploadedImageUrl.imageUrl) {
        imageUrl = uploadedImageUrl.imageUrl
      } else {
        alert("Image upload failed")
        return
      }
    }


    Object.entries(newCar).forEach(([key, value]) => {
      formData.append(key, value)
    })
    if (imageUrl) {
      formData.append("image", imageUrl) // Append uploaded image URL
    }



    const result = await adminAddCar(formData)

    if (result.success) {
      // Refresh the cars list
      const fetchedCars = await getCars()
      setCars(fetchedCars)

      // Reset the form
      setNewCar({
        name: "",
        brand: "",
        year: new Date().getFullYear().toString(),
        price_per_day: "",
        rating: "",
        seats: "",
        transmission: "",
        fuel: "",
        auto: "AUTO",
        mileage: "",
      })

      setImageFile(null)
      if (imageInputRef.current) {
        imageInputRef.current.value = ""
      }
      
    } else {
      alert(result.message)
    }
  }

  const handleDeleteCar = async (id: string) => {
    if (confirm("Are you sure you want to delete this car?")) {
      const result = await adminDeleteCar(id)

      if (result.success) {
        setCars(cars.filter((car) => car.id !== id))
      } else {
        alert(result.message)
      }
    }
  }

  const handleEditCar = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!editingCar) return

    const formData = new FormData()
    Object.entries(editingCar).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value.toString())
      }
    })

    try {
      // You'll need to implement this server action
      const result = await adminUpdateCar(editingCar.id,formData)

      // For now, let's just update the local state
      // setCars(cars.map((car) => (car.id === editingCar.id ? editingCar : car)))
      // setIsEditDialogOpen(false)
      // setEditingCar(null)

      // Uncomment when you implement the server action
      if (result.success) {
        const fetchedCars = await getCars()
        setCars(fetchedCars)
        setIsEditDialogOpen(false)
        setEditingCar(null)
      } else {
        alert(result.message)
      }
    } catch (error) {
      console.error("Error updating car:", error)
      alert("Failed to update car")
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Manage Cars</h1>
      <div className="space-y-4 p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">Add New Car</h2>
        <p className="text-sm text-gray-500 mb-4">Fill in the details below to add a new car to the database.</p>

        <form onSubmit={handleAddCar} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Car Name
              </label>
              <Input
                id="name"
                placeholder="e.g. Mercedes Benz R3"
                value={newCar.name}
                onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
                required
                className="w-full text-black"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="brand" className="text-sm font-medium text-gray-700">
                Brand
              </label>
              <Input
                id="brand"
                placeholder="e.g. Mercedes"
                value={newCar.brand}
                onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })}
                required
                className="w-full text-black"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="year" className="text-sm font-medium text-gray-700">
                Year
              </label>
              <Select value={newCar.year} onValueChange={(value) => setNewCar({ ...newCar, year: value })}>
                <SelectTrigger id="year" className="w-full text-black">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 5 }, (_, i) => {
                    const year = new Date().getFullYear() - i
                    return (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="price_per_day" className="text-sm font-medium text-gray-700">
                Price Per Day ($)
              </label>
              <Input
                id="price_per_day"
                placeholder="e.g. 99.99"
                type="number"
                step="0.01"
                min="0"
                value={newCar.price_per_day}
                onChange={(e) => setNewCar({ ...newCar, price_per_day: e.target.value })}
                required
                className="w-full text-black"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="seats" className="text-sm font-medium text-gray-700">
                Seats
              </label>
              <Input
                id="seats"
                placeholder="e.g. 4"
                type="number"
                min="1"
                // value={newCar.seats}
                onChange={(e) => setNewCar({ ...newCar, seats: e.target.value })}
                required
                className="w-full text-black"
              />
            </div>

            <div className="space-y-2">
                <label htmlFor="transmission" className="text-sm font-medium text-gray-700">
                  Transmission
                </label>
                <Select
                  value={newCar.transmission}
                  onValueChange={(value) => setNewCar({ ...newCar, transmission: value })}
                  
                >
                  <SelectTrigger id="transmission" className="w-full text-black">
                    <SelectValue placeholder="Select Transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Automatic">Automatic</SelectItem>
                    <SelectItem value="Manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
            </div>

              <div className="space-y-2">
                <label htmlFor="fuel" className="text-sm font-medium text-gray-700">
                  Fuel Type
                </label>
                <Select value={newCar.fuel} onValueChange={(value) => setNewCar({ ...newCar, fuel: value })}>
                  <SelectTrigger id="fuel" className="w-full text-black">
                    <SelectValue placeholder="Select Fuel Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Petrol">Petrol</SelectItem>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                    <SelectItem value="Electric">Electric</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="mileage" className="text-sm font-medium text-gray-700">
                  Mileage
                </label>
                <Input
                  id="mileage"
                  placeholder="e.g. 27K"
                  value={newCar.mileage}
                  onChange={(e) => setNewCar({ ...newCar, mileage: e.target.value })}
                  required
                  className="w-full text-black"
                />
              </div>




            {/* Image */}
            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium text-gray-700">
                Image
              </label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                required
                className="w-full text-black"
                ref={imageInputRef}
                onChange={(e)=>{  
                  if (e.target.files && e.target.files[0]) {
                    setImageFile(e.target.files[0])
                  }
                }}
              />
            </div>
          </div>

          <Button type="submit" className="mt-4 bg-red-600 hover:bg-red-700 text-white">
            Add Car
          </Button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableCaption className="text-gray-600">A list of cars available for rent.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-900 font-semibold">Name</TableHead>
              <TableHead className="text-gray-900 font-semibold">Brand</TableHead>
              <TableHead className="text-gray-900 font-semibold">Year</TableHead>
              <TableHead className="text-gray-900 font-semibold">Price Per Day</TableHead>
              <TableHead className="text-gray-900 font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  Loading...
                </TableCell>
              </TableRow>
            ) : cars.length > 0 ? (
              cars.map((car) => (
                <TableRow key={car.id}>
                  <TableCell className="text-gray-800 font-medium">{car.name}</TableCell>
                  <TableCell className="text-gray-800">{car.brand}</TableCell>
                  <TableCell className="text-gray-800">{car.year}</TableCell>
                  <TableCell className="text-gray-800">${car.price_per_day}</TableCell>
                  <TableCell className="space-x-2">
                    <div className="flex gap-2">
                    <Dialog open={isEditDialogOpen && editingCar?.id === car.id} onOpenChange={setIsEditDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="mr-2 text-gray-800 hover:text-white hover:bg-gray-600 border-gray-400"onClick={() => setEditingCar(car)}>
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader className="text-black">
                          <DialogTitle>Edit Car</DialogTitle>
                          <DialogDescription>Make changes to the car details below.</DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleEditCar} className="space-y-4 py-4">
                          <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                              <label htmlFor="edit-name" className="text-sm font-medium text-gray-700">
                                Car Name
                              </label>
                              <Input
                                id="edit-name"
                                value={editingCar?.name || ""}
                                onChange={(e) =>
                                  setEditingCar((prev) => (prev ? { ...prev, name: e.target.value } : null))
                                }
                                required
                                className="w-full text-black"
                              />
                            </div>

                            <div className="space-y-2">
                              <label htmlFor="edit-brand" className="text-sm font-medium text-gray-700">
                                Brand
                              </label>
                              <Input
                                id="edit-brand"
                                value={editingCar?.brand || ""}
                                onChange={(e) =>
                                  setEditingCar((prev) => (prev ? { ...prev, brand: e.target.value } : null))
                                }
                                required
                                className="w-full text-black"
                              />
                            </div>

                            <div className="space-y-2">
                              <label htmlFor="edit-year" className="text-sm font-medium text-gray-700">
                                Year
                              </label>
                              <Select
                                value={editingCar?.year?.toString() || ""}
                                onValueChange={(value) =>
                                  setEditingCar((prev) => (prev ? { ...prev, year: Number(value) } : null))
                                }
                              >
                                <SelectTrigger id="edit-year" className="w-full text-black">
                                  <SelectValue placeholder="Select Year" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({ length: 5 }, (_, i) => {
                                    const year = new Date().getFullYear() - i
                                    return (
                                      <SelectItem key={year} value={year.toString()}>
                                        {year}
                                      </SelectItem>
                                    )
                                  })}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <label htmlFor="edit-price" className="text-sm font-medium text-gray-700">
                                Price Per Day ($)
                              </label>
                              <Input
                                id="edit-price"
                                type="number"
                                step="0.01"
                                min="0"
                                value={editingCar?.price_per_day || ""}
                                onChange={(e) =>
                                  setEditingCar((prev) => (prev ? { ...prev, price_per_day: Number(e.target.value) } : null))
                                }
                                required
                                className="w-full text-black"
                              />
                            </div>
                          </div>

                          <DialogFooter>
                            <Button type="button" variant="outline"   className="mr-2 text-gray-800 hover:text-white hover:bg-gray-600 border-gray-400" onClick={() => setIsEditDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
                              Save Changes
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <Button variant="destructive" onClick={() => handleDeleteCar(car.id)} size="sm">
                      Delete
                    </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No cars added yet. Use the form above to add cars.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

