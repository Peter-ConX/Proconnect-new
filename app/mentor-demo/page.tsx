"use client"

import { useState } from "react"
import { Calendar, Clock, Users, Star, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MentorAvailabilityModal } from "@/components/mentorship/mentor-availability-modal"

const mentorSessions = [
  {
    id: 1,
    mentor: {
      name: "Chigozie Mmebo",
      title: "Senior Financial Analyst & Trading Expert",
      avatar: "/placeholder.svg?height=60&width=60&text=CM",
      rating: 4.9,
      sessions: 127,
    },
    topic: "MAKE $1,000 - $5,000 MONTHLY TRADING THE FINANCIAL MARKET",
    date: "Monday, June 16 2025",
    time: "6:15 PM",
    timezone: "GMT",
    location: "Virtual Session",
    capacity: 50,
    registered: 23,
    price: "Free",
    category: "Finance & Trading",
  },
  {
    id: 2,
    mentor: {
      name: "Sarah Chen",
      title: "UX Design Director at Tech Startup",
      avatar: "/placeholder.svg?height=60&width=60&text=SC",
      rating: 4.8,
      sessions: 89,
    },
    topic: "DESIGN SYSTEMS THAT SCALE: FROM STARTUP TO ENTERPRISE",
    date: "Wednesday, June 18 2025",
    time: "2:00 PM",
    timezone: "PST",
    location: "San Francisco, CA",
    capacity: 25,
    registered: 18,
    price: "$49",
    category: "Design & UX",
  },
  {
    id: 3,
    mentor: {
      name: "David Rodriguez",
      title: "Full-Stack Developer & Tech Lead",
      avatar: "/placeholder.svg?height=60&width=60&text=DR",
      rating: 4.9,
      sessions: 156,
    },
    topic: "BUILD AND DEPLOY SCALABLE WEB APPLICATIONS WITH NEXT.JS",
    date: "Friday, June 20 2025",
    time: "7:00 PM",
    timezone: "EST",
    location: "Virtual Session",
    capacity: 40,
    registered: 31,
    price: "$29",
    category: "Development",
  },
]

export default function MentorDemoPage() {
  const [selectedSession, setSelectedSession] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleRegister = (session: any) => {
    setSelectedSession({
      name: session.mentor.name,
      title: session.mentor.title,
      topic: session.topic,
      date: session.date,
      time: session.time,
      timezone: session.timezone,
      location: session.location,
      capacity: session.capacity,
      registered: session.registered,
    })
    setIsModalOpen(true)
  }

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-orange-600 bg-clip-text text-transparent mb-4">
            Mentor Availability System
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Connect with industry experts through scheduled sessions, workshops, and one-on-one mentoring
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {mentorSessions.map((session) => (
            <Card
              key={session.id}
              className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={session.mentor.avatar || "/placeholder.svg"} alt={session.mentor.name} />
                      <AvatarFallback className="bg-gradient-to-r from-sky-500 to-orange-500 text-white">
                        {session.mentor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-sm">{session.mentor.name}</h3>
                      <p className="text-xs text-gray-500">{session.mentor.title}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {session.category}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{session.mentor.rating}</span>
                  </div>
                  <div>{session.mentor.sessions} sessions</div>
                </div>

                <CardTitle className="text-lg leading-tight mb-3">{session.topic}</CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4 text-sky-500" />
                    <span>{session.date}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4 text-sky-500" />
                    <span>
                      {session.time} ({session.timezone})
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4 text-sky-500" />
                    <span>{session.location}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Users className="h-4 w-4 text-sky-500" />
                      <span>
                        {session.registered}/{session.capacity} registered
                      </span>
                    </div>
                    <div className="text-lg font-bold text-sky-600 dark:text-sky-400">{session.price}</div>
                  </div>
                </div>

                <Button
                  onClick={() => handleRegister(session)}
                  className="w-full bg-gradient-to-r from-sky-500 to-orange-500 hover:from-sky-600 hover:to-orange-600 text-white font-semibold transition-all duration-200 transform hover:scale-[1.02]"
                  disabled={session.registered >= session.capacity}
                >
                  {session.registered >= session.capacity ? "Session Full" : "Register Now"}
                </Button>

                {session.capacity - session.registered <= 5 && session.registered < session.capacity && (
                  <p className="text-xs text-orange-600 dark:text-orange-400 text-center mt-2">
                    Only {session.capacity - session.registered} spots left!
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                  1
                </div>
                <h3 className="font-semibold mb-2">Browse Sessions</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Discover mentors and their available sessions
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                  2
                </div>
                <h3 className="font-semibold mb-2">Register</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Click register and fill in your details</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                  3
                </div>
                <h3 className="font-semibold mb-2">Attend & Learn</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Join the session and learn from experts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mentor Availability Modal */}
      <MentorAvailabilityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} mentor={selectedSession} />
    </div>
  )
}
