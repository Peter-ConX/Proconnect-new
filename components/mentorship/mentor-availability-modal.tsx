"use client"

import type React from "react"
import { useState } from "react"
import { X, Clock, MapPin, Users, Calendar, Mail, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"

interface MentorAvailabilityModalProps {
  isOpen: boolean
  onClose: () => void
  mentor: {
    id?: string
    name: string
    title: string
    topic: string
    date: string
    time: string
    timezone: string
    location: string
    capacity: number
    registered: number
    avatar?: string
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsRegistering(true)

    // Save session locally and redirect
    setTimeout(() => {
      const saved = localStorage.getItem("proconnect_mentorships")
      let list = []
      if (saved) {
        try {
          list = JSON.parse(saved)
        } catch {
          list = []
        }
      }

      const newMentorship = {
        id: mentor.id || String(Date.now()),
        mentorName: mentor.name,
        mentorTitle: mentor.title,
        topic: mentor.topic,
        date: mentor.date,
        time: mentor.time,
        status: "Active",
        avatar: mentor.avatar || "/placeholder.svg"
      }

      list.unshift(newMentorship)
      localStorage.setItem("proconnect_mentorships", JSON.stringify(list))

      setIsRegistering(false)
      toast.success("Successfully registered for mentorship session!")
      onClose()

      // Redirect to chat
      window.location.href = `/mentorship/${mentor.id || "1"}/chat`
    }, 1200)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full max-h-[95vh] overflow-y-auto flex flex-col">
        
        {/* Header - Teal Blue with Avatar matching webinar-reference.jpeg */}
        <div className="relative bg-[#0284c7] p-6 text-white rounded-t-2xl flex flex-col items-center text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          <Avatar className="h-20 w-20 border-4 border-white/20 shadow-md mb-3">
            <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
            <AvatarFallback className="bg-sky-800 text-white text-xl font-bold">
              {mentor.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="text-[10px] bg-white/20 text-white font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider mb-2">
            Your Mentor & Host
          </span>
          <h2 className="text-xl font-extrabold tracking-tight">{mentor.name}</h2>
          <p className="text-sky-100 text-xs mt-0.5">{mentor.title}</p>
        </div>

        {/* Content */}
        <div className="p-6 flex-1">
          {/* Session Details */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-tight">
              {mentor.topic}
            </h3>

            <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Calendar className="h-4 w-4 text-sky-500 shrink-0" />
                <span>{mentor.date}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Clock className="h-4 w-4 text-sky-500 shrink-0" />
                <span>{mentor.time}</span>
              </div>
            </div>

            {/* Timezone & Location Select Dropdowns */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Location
                </Label>
                <select className="w-full text-xs border border-gray-200 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-1 focus:ring-sky-500 outline-none">
                  <option value="current">{mentor.location}</option>
                  <option value="zoom">Zoom Video Call</option>
                  <option value="meet">Google Meet</option>
                  <option value="teams">Microsoft Teams</option>
                </select>
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Timezone
                </Label>
                <select className="w-full text-xs border border-gray-200 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-1 focus:ring-sky-500 outline-none">
                  <option value="current">{mentor.timezone}</option>
                  <option value="gmt">GMT (UTC+0)</option>
                  <option value="est">EST (UTC-5)</option>
                  <option value="pst">PST (UTC-8)</option>
                  <option value="wat">WAT (UTC+1)</option>
                </select>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Registration Form with Required Asterisk */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Registration Form
            </div>

            <div className="space-y-3">
              <div>
                <Label htmlFor="name" className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="pl-10 text-xs"
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="pl-10 text-xs"
                    placeholder="e.g. name@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="experience" className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                  Experience Level
                </Label>
                <Input
                  id="experience"
                  name="experience"
                  type="text"
                  className="mt-1 text-xs"
                  placeholder="e.g., Beginner, Intermediate, Advanced"
                  value={formData.experience}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isRegistering}
              className="w-full bg-[#0284c7] hover:bg-sky-600 text-white font-bold py-3.5 rounded-lg text-xs tracking-wider uppercase mt-4 shadow-md transition-all duration-150"
            >
              {isRegistering ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Registering...
                </div>
              ) : (
                "REGISTER NOW"
              )}
            </Button>
          </form>

          {/* Spots Remaining Badge */}
          <div className="flex justify-center items-center gap-2 mt-4 text-xs text-amber-600 font-semibold">
            <Users className="h-3.5 w-3.5" />
            <span>{mentor.capacity - mentor.registered} spots remaining</span>
          </div>
        </div>

        {/* Footer - Dark "POWERED BY WEBINARJAM" matching webinar-reference.jpeg */}
        <div className="bg-gray-950 py-3 rounded-b-2xl flex items-center justify-center border-t border-gray-800">
          <span className="text-[9px] text-gray-500 tracking-widest font-semibold uppercase">
            POWERED BY WEBINARJAM
          </span>
        </div>
      </div>
    </div>
  )
}
