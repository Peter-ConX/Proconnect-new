"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Filter, MessageSquare, Calendar, Award, BookOpen, Clock, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MentorAvailabilityModal } from "@/components/mentorship/mentor-availability-modal"
import { toast } from "sonner"

const mentors = [
  {
    id: "1",
    name: "John Doe",
    expertise: "Software Engineering",
    description: "Experienced software engineer with a passion for teaching.",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    skills: ["React", "Node.js", "System Design"],
    location: "San Francisco, CA",
    timezone: "PST",
    capacity: 10,
    registered: 6,
  },
  {
    id: "2",
    name: "Jane Smith",
    expertise: "Data Science",
    description: "Data scientist specializing in machine learning and AI.",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    skills: ["Python", "TensorFlow", "Pandas"],
    location: "New York, NY",
    timezone: "EST",
    capacity: 8,
    registered: 3,
  },
  {
    id: "3",
    name: "David Lee",
    expertise: "Product Management",
    description: "Product leader with a track record of launching successful products.",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741702-a0cfae58c151?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    skills: ["Roadmapping", "Agile", "User Interviews"],
    location: "London, UK",
    timezone: "GMT",
    capacity: 5,
    registered: 4,
  },
]

const programs = [
  {
    id: "p1",
    title: "1-on-1 Growth Accelerator",
    description: "Intense 3-month mentoring program focused on career scale, technical leadership, and presentation skills.",
    duration: "12 Weeks",
    spotsLeft: 5,
  },
  {
    id: "p2",
    title: "Startup Founders Circle",
    description: "Connect with seasoned entrepreneurs to refine product-market fit, design pitch decks, and validate ideas.",
    duration: "8 Weeks",
    spotsLeft: 2,
  },
]

export default function MentorshipPage() {
  const router = useRouter()
  const [selectedMentor, setSelectedMentor] = useState<any>(null)
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("find-mentor")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedExpertise, setSelectedExpertise] = useState<string>("all")
  const [myMentorships, setMyMentorships] = useState<any[]>([])

  useEffect(() => {
    // Load local mentorship bookings
    const saved = localStorage.getItem("proconnect_mentorships")
    if (saved) {
      try {
        setMyMentorships(JSON.parse(saved))
      } catch {
        setMyMentorships([])
      }
    }
  }, [isAvailabilityModalOpen])

  const handleBookSession = (mentor: any) => {
    setSelectedMentor({
      id: mentor.id,
      name: mentor.name,
      title: mentor.expertise,
      topic: `1-on-1 Mentoring Session: ${mentor.expertise}`,
      date: "Tomorrow",
      time: "10:00 AM - 11:00 AM",
      timezone: mentor.timezone || "PST",
      location: mentor.location || "Virtual Session",
      capacity: mentor.capacity || 10,
      registered: mentor.registered || 0,
      avatar: mentor.imageUrl,
    })
    setIsAvailabilityModalOpen(true)
  }

  const handleEnterChat = (mentorId: string) => {
    router.push(`/mentorship/${mentorId}/chat`)
  }

  const handleRegisterProgram = (programTitle: string) => {
    toast.success(`Registered successfully for "${programTitle}"!`)
  }

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      searchQuery === "" ||
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.expertise.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesExpertise =
      selectedExpertise === "all" || mentor.expertise === selectedExpertise

    return matchesSearch && matchesExpertise
  })

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Mentorship</h1>
          <p className="text-gray-500 mt-1">Accelerate your career growth with expert mentorship sessions</p>
        </div>

        {/* Custom Tab Navigation */}
        <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg flex mb-8 max-w-md">
          <button
            onClick={() => setActiveTab("find-mentor")}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
              activeTab === "find-mentor"
                ? "bg-white dark:bg-gray-700 text-sky-600 dark:text-sky-400 shadow-sm"
                : "text-gray-600 hover:text-sky-500"
            }`}
          >
            Find a Mentor
          </button>
          <button
            onClick={() => setActiveTab("programs")}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
              activeTab === "programs"
                ? "bg-white dark:bg-gray-700 text-sky-600 dark:text-sky-400 shadow-sm"
                : "text-gray-600 hover:text-sky-500"
            }`}
          >
            Programs
          </button>
          <button
            onClick={() => setActiveTab("my-mentorships")}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
              activeTab === "my-mentorships"
                ? "bg-white dark:bg-gray-700 text-sky-600 dark:text-sky-400 shadow-sm"
                : "text-gray-600 hover:text-sky-500"
            }`}
          >
            My Mentorships
          </button>
        </div>

        {/* Tab Contents: Find Mentor */}
        {activeTab === "find-mentor" && (
          <div>
            {/* Search and Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, skill, or expertise..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-2 w-full md:w-auto">
                {["all", "Software Engineering", "Data Science", "Product Management"].map((exp) => (
                  <Badge
                    key={exp}
                    variant="outline"
                    className={`cursor-pointer transition-all ${
                      selectedExpertise === exp
                        ? "bg-sky-500 text-white border-sky-500 hover:bg-sky-600"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setSelectedExpertise(exp)}
                  >
                    {exp === "all" ? "All Expertise" : exp}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Mentors Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentors.length === 0 ? (
                <p className="text-gray-500 col-span-3 text-center py-8">No mentors match your search.</p>
              ) : (
                filteredMentors.map((mentor) => {
                  const hasRegistered = myMentorships.some(m => m.id === mentor.id)
                  return (
                    <Card key={mentor.id} className="border-none shadow-md overflow-hidden">
                      <CardHeader className="text-center pb-2">
                        <Avatar className="h-24 w-24 mx-auto mb-4 border-2 border-sky-500/20 shadow-md">
                          <AvatarImage src={mentor.imageUrl || "/placeholder.svg"} alt={mentor.name} />
                          <AvatarFallback className="bg-sky-700 text-white text-xl">
                            {mentor.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-xl font-bold">{mentor.name}</CardTitle>
                        <CardDescription className="text-sky-600 dark:text-sky-400 font-medium">
                          {mentor.expertise}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-4 line-clamp-2">
                          {mentor.description}
                        </p>
                        <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                          {mentor.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs bg-sky-50 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col gap-2 border-t border-gray-50 dark:border-gray-800 pt-4">
                        {hasRegistered ? (
                          <div className="w-full space-y-2">
                            <Button
                              onClick={() => handleEnterChat(mentor.id)}
                              className="w-full bg-sky-500 hover:bg-sky-600 text-white"
                            >
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Enter Session Chat
                            </Button>
                            <Button
                              onClick={() => handleBookSession(mentor)}
                              variant="outline"
                              className="w-full border-sky-200 text-sky-600 hover:bg-sky-50"
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              Reschedule Session
                            </Button>
                          </div>
                        ) : (
                          <div className="w-full flex gap-2">
                            <Button
                              onClick={() => handleBookSession(mentor)}
                              className="flex-1 bg-sky-500 hover:bg-sky-600 text-white"
                            >
                              Request Mentorship
                            </Button>
                            <Button
                              onClick={() => handleEnterChat(mentor.id)}
                              variant="outline"
                              size="icon"
                              className="border-gray-200 dark:border-gray-700"
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </CardFooter>
                    </Card>
                  )
                })
              )}
            </div>
          </div>
        )}

        {/* Tab Contents: Programs */}
        {activeTab === "programs" && (
          <div className="space-y-6">
            {programs.map((program) => (
              <Card key={program.id} className="border-none shadow-md overflow-hidden p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-5 w-5 text-orange-500" />
                    <h2 className="text-xl font-bold">{program.title}</h2>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 max-w-2xl">
                    {program.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500 font-semibold">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-sky-500" />
                      Duration: {program.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-sky-500" />
                      Spots Left: {program.spotsLeft}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => handleRegisterProgram(program.title)}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold flex items-center gap-2 self-stretch md:self-auto justify-center"
                >
                  Register Program
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        )}

        {/* Tab Contents: My Mentorships */}
        {activeTab === "my-mentorships" && (
          <div>
            {myMentorships.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">You have not booked any mentorship sessions yet.</p>
                <Button onClick={() => setActiveTab("find-mentor")} className="mt-4 bg-sky-500 text-white">
                  Find a Mentor
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {myMentorships.map((session) => (
                  <Card key={session.id} className="border-none shadow-md p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-14 w-14 border border-gray-100 dark:border-gray-700 shadow-sm">
                        <AvatarImage src={session.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-sky-700 text-white font-bold">
                          {session.mentorName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-bold text-lg">{session.mentorName}</h3>
                        <p className="text-xs text-gray-500">{session.mentorTitle}</p>
                        <p className="text-sm font-semibold text-sky-600 dark:text-sky-400 mt-1">
                          Topic: {session.topic}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end gap-2 self-stretch md:self-auto">
                      <div className="text-xs text-gray-500 font-medium">
                        Session Date: {session.date} | Time: {session.time}
                      </div>
                      <div className="flex gap-2 mt-2 md:mt-0">
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300 py-1.5 self-center">
                          {session.status}
                        </Badge>
                        <Button
                          onClick={() => handleEnterChat(session.id)}
                          className="bg-sky-500 hover:bg-sky-600 text-white"
                          size="sm"
                        >
                          Chat Mentor
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Availability Registration Modal */}
        {selectedMentor && (
          <MentorAvailabilityModal
            isOpen={isAvailabilityModalOpen}
            onClose={() => setIsAvailabilityModalOpen(false)}
            mentor={selectedMentor}
          />
        )}
      </div>
    </div>
  )
}
