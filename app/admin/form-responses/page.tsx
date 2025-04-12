import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { useState } from "react"
import { getFormResponses } from "@/lib/db"
import { DialogClose } from "@radix-ui/react-dialog"
import { X } from "lucide-react"

export default async function FormResponses() {
  const formResponses = await getFormResponses()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Form Responses</h1>
      <Table>
        <TableCaption className="text-gray-600">A list of form responses from customers.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-900">Name</TableHead>
            <TableHead className="text-gray-900">Email</TableHead>
            <TableHead className="text-gray-900">Phone</TableHead>
            <TableHead className="text-gray-900">Message</TableHead>
            <TableHead className="text-gray-900">Date</TableHead>
            <TableHead className="text-gray-900 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {formResponses.length > 0 ? (
            formResponses.map((response) => (
              <TableRow key={response.id}>
                <TableCell className="text-gray-800">{response.name}</TableCell>
                <TableCell className="text-gray-800">{response.email}</TableCell>
                <TableCell className="text-gray-800">{response.phone || "N/A"}</TableCell>
                <TableCell className="text-gray-800">{response.message }</TableCell>
                <TableCell className="text-gray-800">{format(new Date(response.created_at), "MMM d, yyyy")}</TableCell>
                <TableCell className="text-right">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="bg-red-600 hover:bg-red-700 " size="sm">View Details</Button>
                  </DialogTrigger>
                    <DialogContent>
                    <DialogClose asChild>
                      <button className="absolute right-4 top-3 hover:text-red-700">
                        <X className="h-5 w-5 text-black" />
                      </button>
                    </DialogClose>
                      <DialogHeader className="text-black">
                        <DialogTitle>Form Details</DialogTitle>
                        <DialogDescription>Submitted on {format(new Date(response.created_at), "PPpp")}</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-2 text-sm text-gray-700">
                        <p><strong>Name:</strong> {response.name}</p>
                        <p><strong>Email:</strong> {response.email}</p>
                        <p><strong>Phone:</strong> {response.phone || "N/A"}</p>
                        <p><strong>Message:</strong> {response.message}</p>
                        <p><strong>Car Type:</strong> {response.car_type || "N/A"}</p>
                        <p><strong>Pickup Location:</strong> {response.pickup_location || "N/A"}</p>
                        <p><strong>Dropoff Location:</strong> {response.dropoff_location || "N/A"}</p>
                        <p><strong>Pickup Date:</strong> {response.pickup_date ? format(new Date(response.pickup_date), "MMM d, yyyy") : "N/A"}</p>
                        <p><strong>Pickup Time:</strong> {response.pickup_time || "N/A"}</p>
                        <p><strong>Dropoff Date:</strong> {response.dropoff_date ? format(new Date(response.dropoff_date), "MMM d, yyyy") : "N/A"}</p>
                        <p><strong>Dropoff Time:</strong> {response.dropoff_time || "N/A"}</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                No form responses yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
