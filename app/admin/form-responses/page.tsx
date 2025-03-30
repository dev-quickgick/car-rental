import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getFormResponses } from "@/lib/db"
import { format } from "date-fns"

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
          </TableRow>
        </TableHeader>
        <TableBody>
          {formResponses.length > 0 ? (
            formResponses.map((response) => (
              <TableRow key={response.id}>
                <TableCell className="text-gray-800">{response.name}</TableCell>
                <TableCell className="text-gray-800">{response.email}</TableCell>
                <TableCell className="text-gray-800">{response.phone || "N/A"}</TableCell>
                <TableCell className="text-gray-800">{response.message}</TableCell>
                <TableCell className="text-gray-800">{format(new Date(response.created_at), "MMM d, yyyy")}</TableCell>
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

