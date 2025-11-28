"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MentorAvailabilityModal } from "@/components/mentorship/mentor-availability-modal"

const mentors = [
  {
    id: 1,
    name: "John Doe",
    expertise: "Software Engineering",
    description: "Experienced software engineer with a passion for teaching.",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 2,
    name: "Jane Smith",
    expertise: "Data Science",
    description: "Data scientist specializing in machine learning and AI.",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 3,
    name: "David Lee",
    expertise: "Product Management",
    description: "Product leader with a track record of launching successful products.",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741702-a0cfae58c151?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
  },
]

const MentorshipPage = () => {
  const [selectedMentor, setSelectedMentor] = useState<any>(null)
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false)

  const handleBookSession = (mentor: any) => {
    setSelectedMentor({
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
              <Button
                onClick={() => handleBookSession(mentor)}
                className="w-full bg-gradient-to-r from-sky-500 to-orange-500 hover:from-sky-600 hover:to-orange-600 mt-4"
              >
                Book Session
              </Button>
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
