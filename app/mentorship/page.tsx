"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MentorAvailabilityModal } from "@/components/mentorship/mentor-availability-modal"
import { MessageSquare, Calendar } from "lucide-react"

const mentors = [
  {
    id: "1",
    name: "John Doe",
    expertise: "Software Engineering",
    description: "Experienced software engineer with a passion for teaching.",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: "2",
    name: "Jane Smith",
    expertise: "Data Science",
    description: "Data scientist specializing in machine learning and AI.",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: "3",
    name: "David Lee",
    expertise: "Product Management",
    description: "Product leader with a track record of launching successful products.",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741702-a0cfae58c151?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
  },
]

const MentorshipPage = () => {
  const router = useRouter()
  const [selectedMentor, setSelectedMentor] = useState<any>(null)
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false)
  const [registeredMentors, setRegisteredMentors] = useState<Set<string>>(new Set())

  // Check registration status on mount
  useEffect(() => {
    const checkRegistrations = async () => {
      const userEmail = localStorage.getItem("userEmail") || "user@example.com" // In production, get from auth
      const registered = new Set<string>()

      for (const mentor of mentors) {
        try {
          const response = await fetch(
            `/api/mentorship/check-registration?mentorId=${mentor.id}&email=${encodeURIComponent(userEmail)}`
          )
          if (response.ok) {
            const data = await response.json()
            if (data.isRegistered) {
              registered.add(mentor.id)
            }
          }
        } catch (error) {
          console.error("Error checking registration:", error)
        }
      }

      setRegisteredMentors(registered)
    }

    checkRegistrations()
  }, [])

  const handleBookSession = (mentor: any) => {
    setSelectedMentor({
      id: mentor.id,
      name: mentor.name,
      title: mentor.expertise,
      topic: `1-on-1 Mentoring Session: ${mentor.expertise}`,
      date: "Available on request",
      time: "Flexible timing",
      timezone: "Your timezone",
      location: "Virtual Session",
      capacity: 1,
      registered: 0,
    })
    setIsAvailabilityModalOpen(true)
  }

  const handleEnterChat = (mentorId: string) => {
    router.push(`/mentorship/${mentorId}/chat`)
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Mentorship</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((mentor) => (
          <Card key={mentor.id}>
            <CardHeader>
              <CardTitle>{mentor.name}</CardTitle>
              <CardDescription>{mentor.expertise}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={mentor.imageUrl || "/placeholder.svg"} alt={mentor.name} />
                <AvatarFallback>{mentor.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <p className="text-sm text-muted-foreground text-center">{mentor.description}</p>
              {registeredMentors.has(mentor.id) ? (
                <div className="w-full mt-4 space-y-2">
                  <Button
                    onClick={() => handleEnterChat(mentor.id)}
                    className="w-full bg-gradient-to-r from-teal-500 to-amber-500 hover:from-teal-600 hover:to-amber-600"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Enter Chat
                  </Button>
                  <Button
                    onClick={() => handleBookSession(mentor)}
                    variant="outline"
                    className="w-full"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Session
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => handleBookSession(mentor)}
                  className="w-full bg-gradient-to-r from-teal-500 to-amber-500 hover:from-teal-600 hover:to-amber-600 mt-4"
                >
                  Book Session
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <MentorAvailabilityModal
        isOpen={isAvailabilityModalOpen}
        onClose={() => setIsAvailabilityModalOpen(false)}
        mentor={selectedMentor}
      />
    </div>
  )
}

export default MentorshipPage
