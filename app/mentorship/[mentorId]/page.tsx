"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, MessageSquare, Calendar, MapPin, Clock, Award, ShieldAlert, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MentorAvailabilityModal } from "@/components/mentorship/mentor-availability-modal"
import { VerifiedBadge } from "@/components/verified-badge"
import { toast } from "sonner"

const mentors = [
  {
    id: "1",
    name: "John Doe",
    expertise: "Software Engineering",
    description: "Experienced software engineer with a passion for teaching system design, frontend optimization, and team scaling.",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    skills: ["React", "Node.js", "System Design", "Kubernetes"],
    location: "San Francisco, CA",
    timezone: "PST",
    capacity: 10,
    registered: 6,
    rules: [
      "1. Active participation is mandatory in group channels.",
      "2. Weekly coding assignments must be submitted before deadlines.",
      "3. Respect colleagues and maintain a constructive feedback loop."
    ],
    programs: [
      { name: "Full Stack Mastery", duration: "12 Weeks", description: "From core JavaScript to building scalable microservices." }
    ]
  },
  {
    id: "2",
    name: "Jane Smith",
    expertise: "Data Science",
    description: "Data scientist specializing in machine learning, AI roadmap execution, and mathematical research.",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    skills: ["Python", "TensorFlow", "Pandas", "Scikit-Learn"],
    location: "New York, NY",
    timezone: "EST",
    capacity: 8,
    registered: 3,
    rules: [
      "1. High math proficiency is expected.",
      "2. Group project submissions are evaluated monthly.",
      "3. Zero tolerance for plagiarism in academic papers."
    ],
    programs: [
      { name: "Practical Machine Learning", duration: "8 Weeks", description: "Deploying production-ready ML neural networks." }
    ]
  },
  {
    id: "3",
    name: "David Lee",
    expertise: "Product Management",
    description: "Product leader with a track record of launching successful SaaS products and coaching technical leads.",
    imageUrl: "https://images.unsplash.com/photo-1534528741702-a0cfae58c151?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    skills: ["Roadmapping", "Agile", "User Interviews", "Product Launch"],
    location: "London, UK",
    timezone: "GMT",
    capacity: 5,
    registered: 4,
    rules: [
      "1. Must attend all mock user presentation critiques.",
      "2. Read specified case studies weekly.",
      "3. Active collaboration in the group Slack channel."
    ],
    programs: [
      { name: "SaaS Launch Roadmap", duration: "6 Weeks", description: "Defining product scope, MVP planning, and traction tracking." }
    ]
  }
]

export default function MentorDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [mentor, setMentor] = useState<any>(null)
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false)
  const [selectedMentorForModal, setSelectedMentorForModal] = useState<any>(null)
  const [userIsAccepted, setUserIsAccepted] = useState(false)

  useEffect(() => {
    const id = params?.mentorId
    const foundMentor = mentors.find((m) => m.id === id) || mentors[0]
    setMentor(foundMentor)

    // Check if user is accepted in localStorage mentorships list
    const saved = localStorage.getItem("proconnect_mentorships")
    if (saved) {
      try {
        const list = JSON.parse(saved)
        const isAccepted = list.some((m: any) => m.id === foundMentor.id && m.status === "Active")
        setUserIsAccepted(isAccepted)
      } catch {
        setUserIsAccepted(false)
      }
    }
  }, [params, isAvailabilityModalOpen])

  if (!mentor) {
    return <div className="pt-20 text-center text-gray-500">Loading Mentor Profile...</div>
  }

  const handleBookSession = () => {
    setSelectedMentorForModal({
      id: mentor.id,
      name: mentor.name,
      title: mentor.expertise,
      topic: `1-on-1 Mentoring Session: ${mentor.expertise}`,
      date: "Tomorrow",
      time: "10:00 AM - 11:00 AM",
      timezone: mentor.timezone,
      location: mentor.location,
      capacity: mentor.capacity,
      registered: mentor.registered,
      avatar: mentor.imageUrl,
    })
    setIsAvailabilityModalOpen(true)
  }

  const handleEnterChat = () => {
    if (userIsAccepted) {
      router.push(`/mentorship/${mentor.id}/chat`)
    } else {
      toast.error("Access Denied: You must first register and be accepted by the mentor to join the chat.")
    }
  }

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50/50 dark:bg-gray-900/10">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.push("/mentorship")} className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Mentorship
        </Button>

        {/* Mentor Profile Banner card */}
        <Card className="border-none shadow-md overflow-hidden bg-white dark:bg-gray-800 mb-6">
          <div className="h-32 bg-gradient-to-r from-sky-400 to-sky-600"></div>
          <CardHeader className="relative pb-4 pt-16">
            <div className="absolute -top-16 left-8">
              <Avatar className="h-28 w-28 border-4 border-white dark:border-gray-800 shadow-lg">
                <AvatarImage src={mentor.imageUrl} alt={mentor.name} />
                <AvatarFallback className="bg-sky-700 text-white text-3xl font-bold">
                  {mentor.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
                  {mentor.name}
                  <VerifiedBadge className="h-5 w-5 bg-transparent text-[#0095f6]" />
                </h1>
                <p className="text-sky-600 dark:text-sky-400 font-semibold mt-1">{mentor.expertise}</p>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500 font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-sky-500" />
                    {mentor.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-sky-500" />
                    Timezone: {mentor.timezone}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleEnterChat} variant="outline" className="border-sky-200 text-sky-600 hover:bg-sky-50">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message Chat
                </Button>
                <Button onClick={handleBookSession} className="bg-sky-500 hover:bg-sky-600 text-white font-semibold shadow-md">
                  <Calendar className="mr-2 h-4 w-4" />
                  Request Mentorship
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-6">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
              {mentor.description}
            </p>
          </CardContent>
        </Card>

        {/* Tab section */}
        <Tabs defaultValue="about" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md bg-gray-100 dark:bg-gray-800">
            <TabsTrigger value="about">About & Skills</TabsTrigger>
            <TabsTrigger value="rules">Group Rules & Guidelines</TabsTrigger>
            <TabsTrigger value="programs">Available Programs</TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-orange-500" />
                  Specialized Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mentor.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1 bg-sky-50 text-sky-800 dark:bg-sky-950 dark:text-sky-300 text-sm font-medium">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Group Rules Tab */}
          <TabsContent value="rules">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-red-500">
                  <ShieldAlert className="h-5 w-5" />
                  Required Group Guidelines
                </CardTitle>
                <CardDescription>
                  Mentors have established these rules. You must review and agree to these standards upon joining this mentor group.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 p-4 bg-red-50/30 dark:bg-red-950/10 border border-red-100 dark:border-red-900 rounded-lg">
                  {mentor.rules.map((rule: string, index: number) => (
                    <p key={index} className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                      {rule}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Programs Tab */}
          <TabsContent value="programs">
            <div className="space-y-4">
              {mentor.programs.map((program: any, index: number) => (
                <Card key={index} className="border-none shadow-md overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start gap-4">
                      <CardTitle className="text-lg font-bold">{program.name}</CardTitle>
                      <Badge className="bg-orange-500 text-white font-medium">{program.duration}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {program.description}
                    </p>
                  </CardContent>
                  <CardFooter className="bg-gray-50/50 dark:bg-gray-800/10 py-3 flex justify-between items-center">
                    <span className="text-xs text-gray-500 font-semibold">1-on-1 and Group calls scheduled weekly</span>
                    <Button onClick={handleBookSession} size="sm" className="bg-sky-500 text-white text-xs">
                      Register Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {selectedMentorForModal && (
        <MentorAvailabilityModal
          isOpen={isAvailabilityModalOpen}
          onClose={() => setIsAvailabilityModalOpen(false)}
          mentor={selectedMentorForModal}
        />
      )}
    </div>
  )
}
