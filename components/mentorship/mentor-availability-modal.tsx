"use client"

import type React from "react"

import { useState } from "react"
import { X, Clock, MapPin, Users, Calendar, Mail, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface MentorAvailabilityModalProps {
  isOpen: boolean
  onClose: () => void
  mentor: {
    name: string
    title: string
    topic: string
    date: string
    time: string
    timezone: string
    location: string
    capacity: number
    registered: number
  }
}

export function MentorAvailabilityModal({ isOpen, onClose, mentor }: MentorAvailabilityModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
  })
  const [isRegistering, setIsRegistering] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsRegistering(true)

    // Simulate registration
    setTimeout(() => {
      setIsRegistering(false)
      onClose()
      // Show success message
    }, 2000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header with Proconnect Logo */}
        <div className="relative bg-gradient-to-r from-sky-500 to-orange-500 p-6 rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="text-center">
            <div className="mb-3">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">P</div>
              </div>
            </div>
            <div className="text-sm text-white/80 mb-1">Your mentor</div>
            <h2 className="text-xl font-bold text-white">{mentor.name}</h2>
            <p className="text-white/90 text-sm">{mentor.title}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Session Details */}
          <div className="mb-6">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">{mentor.topic}</h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <Calendar className="h-4 w-4 text-sky-500" />
                <span className="text-sm">{mentor.date}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <Clock className="h-4 w-4 text-sky-500" />
                <span className="text-sm">
                  {mentor.time} ({mentor.timezone})
                </span>
              </div>

              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4 text-sky-500" />
                <span className="text-sm">{mentor.location}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <Users className="h-4 w-4 text-sky-500" />
                <span className="text-sm">
                  {mentor.registered}/{mentor.capacity} registered
                </span>
              </div>
            </div>

            <button className="text-sky-500 hover:text-sky-600 text-sm mt-2 transition-colors">
              Convert to other timezone
            </button>
          </div>

          <Separator className="my-6" />

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">Your details</div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="pl-10"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="pl-10"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="experience" className="text-sm font-medium">
                  Experience Level
                </Label>
                <Input
                  id="experience"
                  name="experience"
                  type="text"
                  className="mt-1"
                  placeholder="e.g., Beginner, Intermediate, Advanced"
                  value={formData.experience}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isRegistering}
              className="w-full bg-gradient-to-r from-sky-500 to-orange-500 hover:from-sky-600 hover:to-orange-600 text-white font-semibold py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
            >
              {isRegistering ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Registering...
                </div>
              ) : (
                "REGISTER NOW"
              )}
            </Button>

            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
              Your details will be forwarded to the mentor, who might communicate with you regarding this session and
              other services.
            </p>
          </form>

          {/* Capacity Badge */}
          <div className="flex justify-center mt-4">
            <Badge
              variant="outline"
              className="border-orange-200 text-orange-600 dark:border-orange-800 dark:text-orange-400"
            >
              {mentor.capacity - mentor.registered} spots remaining
            </Badge>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-4">
          <div className="text-center text-xs text-gray-400">POWERED BY PROCONNECT</div>
        </div>
      </div>
    </div>
  )
}
