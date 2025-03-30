"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Car,
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  Plus,
  ChevronRight,
  Edit,
  X,
} from "lucide-react"

// Sample data - replace with your actual data
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  memberSince: "January 2023",
  profileImage: "/placeholder.svg?height=100&width=100",
}

const bookings = [
  {
    id: "B12345",
    carName: "Infiniti Q50",
    carImage: "/placeholder.svg?height=80&width=120",
    pickupDate: "2025-04-15",
    pickupTime: "10:00 AM",
    dropoffDate: "2025-04-18",
    dropoffTime: "6:00 PM",
    location: "San Francisco Airport",
    status: "confirmed", // confirmed, pending, completed, cancelled
    price: "$420.00",
  },
  {
    id: "B12346",
    carName: "Infiniti QX60",
    carImage: "/placeholder.svg?height=80&width=120",
    pickupDate: "2025-05-20",
    pickupTime: "9:00 AM",
    dropoffDate: "2025-05-25",
    dropoffTime: "5:00 PM",
    location: "Los Angeles Downtown",
    status: "pending",
    price: "$750.00",
  },
  {
    id: "B12347",
    carName: "Infiniti QX80",
    carImage: "/placeholder.svg?height=80&width=120",
    pickupDate: "2025-03-10",
    pickupTime: "11:00 AM",
    dropoffDate: "2025-03-12",
    dropoffTime: "3:00 PM",
    location: "San Diego Airport",
    status: "completed",
    price: "$380.00",
  },
]

// Status badge colors
const statusColors = {
  confirmed: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-blue-100 text-blue-800",
  cancelled: "bg-red-100 text-red-800",
}

// Status icons
const StatusIcon = ({ status }: { status: string }) => {
  if (status === "confirmed" || status === "completed") {
    return <CheckCircle className="w-4 h-4 mr-1" />
  }
  return <AlertCircle className="w-4 h-4 mr-1" />
}

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("bookings")
  const [showBookingModal, setShowBookingModal] = useState(false)

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Dashboard Header */}
      <div className="bg-[#1c2536] text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">My Dashboard</h1>
          <p className="text-slate-300">Manage your bookings and account details</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200 flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-200">
                  <img
                    src={userData.profileImage || "/placeholder.svg"}
                    alt={userData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-bold text-slate-800">{userData.name}</h2>
                  <p className="text-sm text-slate-500">Member since {userData.memberSince}</p>
                </div>
              </div>

              <div className="p-4">
                <nav>
                  <button
                    onClick={() => setActiveTab("bookings")}
                    className={`w-full text-left px-4 py-3 rounded-md flex items-center space-x-3 mb-1 ${
                      activeTab === "bookings" ? "bg-[#1c2536] text-white" : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <Calendar className="w-5 h-5" />
                    <span>My Bookings</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`w-full text-left px-4 py-3 rounded-md flex items-center space-x-3 mb-1 ${
                      activeTab === "profile" ? "bg-[#1c2536] text-white" : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <User className="w-5 h-5" />
                    <span>Profile Details</span>
                  </button>

                  <button
                    onClick={() => setShowBookingModal(true)}
                    className="w-full text-left px-4 py-3 rounded-md flex items-center space-x-3 mb-1 bg-[#c8392c] text-white hover:bg-[#b33226]"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Book a Car</span>
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "bookings" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-slate-800">My Bookings</h2>
                  <button
                    onClick={() => setShowBookingModal(true)}
                    className="bg-[#c8392c] text-white px-4 py-2 rounded-md flex items-center hover:bg-[#b33226]"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Book a Car
                  </button>
                </div>

                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden"
                    >
                      <div className="md:flex">
                        <div className="md:w-1/4 bg-slate-100 p-4 flex items-center justify-center">
                          <img
                            src={booking.carImage || "/placeholder.svg"}
                            alt={booking.carName}
                            className="max-w-full h-auto"
                          />
                        </div>

                        <div className="p-4 md:p-6 md:w-3/4">
                          <div className="flex flex-wrap justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-bold text-slate-800">{booking.carName}</h3>
                              <p className="text-sm text-slate-500">Booking #{booking.id}</p>
                            </div>
                            <div
                            //   className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${statusColors[booking.status]}`}
                            className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${
                                statusColors[booking.status as keyof typeof statusColors]
                              }`}
                            >
                              <StatusIcon status={booking.status} />
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-start space-x-2">
                              <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                              <div>
                                <p className="text-xs text-slate-500">Pick-up</p>
                                <p className="text-sm font-medium">
                                  {new Date(booking.pickupDate).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                  , {booking.pickupTime}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start space-x-2">
                              <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                              <div>
                                <p className="text-xs text-slate-500">Drop-off</p>
                                <p className="text-sm font-medium">
                                  {new Date(booking.dropoffDate).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                  , {booking.dropoffTime}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start space-x-2">
                              <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                              <div>
                                <p className="text-xs text-slate-500">Location</p>
                                <p className="text-sm font-medium">{booking.location}</p>
                              </div>
                            </div>

                            <div className="flex items-start space-x-2">
                              <Car className="w-5 h-5 text-slate-400 mt-0.5" />
                              <div>
                                <p className="text-xs text-slate-500">Total Price</p>
                                <p className="text-sm font-medium">{booking.price}</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                            {booking.status === "pending" || booking.status === "confirmed" ? (
                              <>
                                <button className="px-3 py-1 text-sm border border-slate-300 rounded hover:bg-slate-50 flex items-center">
                                  <Edit className="w-4 h-4 mr-1" />
                                  Modify
                                </button>
                                <button className="px-3 py-1 text-sm border border-red-300 text-red-600 rounded hover:bg-red-50 flex items-center">
                                  <X className="w-4 h-4 mr-1" />
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <button className="px-3 py-1 text-sm border border-[#c8392c] text-[#c8392c] rounded hover:bg-red-50 flex items-center">
                                <Car className="w-4 h-4 mr-1" />
                                Book Again
                              </button>
                            )}
                            <button className="px-3 py-1 text-sm bg-[#1c2536] text-white rounded hover:bg-[#2a3549] flex items-center">
                              View Details
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-6">Profile Details</h2>

                <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                          <div className="flex items-center">
                            <User className="w-5 h-5 text-slate-400 mr-2" />
                            <p className="text-slate-800">{userData.name}</p>
                          </div>
                        </div>

                        <div className="mb-6">
                          <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                          <div className="flex items-center">
                            <Mail className="w-5 h-5 text-slate-400 mr-2" />
                            <p className="text-slate-800">{userData.email}</p>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                          <div className="flex items-center">
                            <Phone className="w-5 h-5 text-slate-400 mr-2" />
                            <p className="text-slate-800">{userData.phone}</p>
                          </div>
                        </div>
                      </div>

                      <div className="border-t md:border-t-0 md:border-l border-slate-200 md:pl-6 pt-6 md:pt-0">
                        <h3 className="font-medium text-slate-800 mb-4">Preferences</h3>

                        <div className="space-y-3">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="emailNotifications"
                              className="h-4 w-4 text-[#c8392c] focus:ring-[#c8392c] border-slate-300 rounded"
                              defaultChecked
                            />
                            <label htmlFor="emailNotifications" className="ml-2 block text-sm text-slate-700">
                              Email notifications for bookings
                            </label>
                          </div>

                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="smsNotifications"
                              className="h-4 w-4 text-[#c8392c] focus:ring-[#c8392c] border-slate-300 rounded"
                              defaultChecked
                            />
                            <label htmlFor="smsNotifications" className="ml-2 block text-sm text-slate-700">
                              SMS notifications for bookings
                            </label>
                          </div>

                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="promotions"
                              className="h-4 w-4 text-[#c8392c] focus:ring-[#c8392c] border-slate-300 rounded"
                            />
                            <label htmlFor="promotions" className="ml-2 block text-sm text-slate-700">
                              Receive promotional offers
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-200 flex justify-end">
                      <button className="bg-[#1c2536] text-white px-4 py-2 rounded-md hover:bg-[#2a3549]">
                        Edit Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-auto"
          >
            <div className="p-6 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">Book a Car</h2>
              <button onClick={() => setShowBookingModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c8392c] focus:border-[#c8392c]"
                      placeholder="Enter your full name"
                      defaultValue={userData.name}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c8392c] focus:border-[#c8392c]"
                      placeholder="Enter your email"
                      defaultValue={userData.email}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c8392c] focus:border-[#c8392c]"
                      placeholder="Enter your phone number"
                      defaultValue={userData.phone}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Car Type</label>
                  <div className="relative">
                    <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <select className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c8392c] focus:border-[#c8392c] appearance-none">
                      <option value="">Select Car Type</option>
                      <option value="sedan">Sedan</option>
                      <option value="suv">SUV</option>
                      <option value="luxury">Luxury</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Pick-up Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c8392c] focus:border-[#c8392c]"
                      placeholder="Enter a city or airport"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Drop-off Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c8392c] focus:border-[#c8392c]"
                      placeholder="Same as pick-up"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Pick-up Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c8392c] focus:border-[#c8392c]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Pick-up Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <select className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c8392c] focus:border-[#c8392c] appearance-none">
                      <option value="">Select Time</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Drop-off Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c8392c] focus:border-[#c8392c]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Drop-off Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <select className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c8392c] focus:border-[#c8392c] appearance-none">
                      <option value="">Select Time</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-[#c8392c] text-white rounded-md hover:bg-[#b33226]">Book Now</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

