"use client"

import { useState } from "react"
import {
  MapPin,
  UserPlus,
  ThumbsUp,
  MessageSquare,
  Briefcase,
  Award,
  Users,
  Lightbulb,
  Calendar,
  LinkIcon,
  Edit,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

// Mock data for the profile
const profileData = {
  name: "Okafor Chidera",
  profession: "Founder, C.E.O of Proconnect",
  location: "Lagos, Nigeria",
  bio: "Passionate about connecting professionals and creating opportunities for growth. Building Proconnect to revolutionize how professionals collaborate and showcase their expertise.",
  skills: ["Leadership", "Product Strategy", "UX Design", "Frontend Development", "Business Development"],
  stats: {
    projects: 24,
    endorsements: 312,
    connections: 1248,
    missions: 18,
  },
  socialLinks: {
    github: "github.com/okaforchidera",
    linkedin: "linkedin.com/in/okaforchidera",
    twitter: "twitter.com/okaforchidera",
    website: "proconnect.com",
  },
}

// Mock data for showcase projects
const showcaseProjects = [
  {
    id: "1",
    title: "Proconnect Platform",
    thumbnail: "/placeholder.svg?height=200&width=400&text=Proconnect",
    description: "A professional networking platform designed to connect experts across industries.",
    skills: ["React", "Next.js", "UI/UX", "TypeScript"],
    endorsements: 156,
  },
  {
    id: "2",
    title: "AI-Powered Skill Matching",
    thumbnail: "/placeholder.svg?height=200&width=400&text=AI+Matching",
    description: "Algorithm that matches professionals based on complementary skills and project needs.",
    skills: ["Machine Learning", "Python", "Data Science"],
    endorsements: 89,
  },
  {
    id: "3",
    title: "Proconnect Mobile App",
    thumbnail: "/placeholder.svg?height=200&width=400&text=Mobile+App",
    description:
      "Native mobile application for iOS and Android that brings the Proconnect experience to mobile devices.",
    skills: ["React Native", "Mobile Design", "Cross-platform"],
    endorsements: 67,
  },
]

// Mock data for completed missions
const completedMissions = [
  {
    id: "1",
    title: "Launch MVP Platform",
    difficulty: "Expert",
    xp: 500,
    badge: "Founder",
    completedDate: "Jan 15, 2023",
  },
  {
    id: "2",
    title: "Secure Seed Funding",
    difficulty: "Expert",
    xp: 450,
    badge: "Entrepreneur",
    completedDate: "Mar 22, 2023",
  },
  {
    id: "3",
    title: "Reach 1000 Users",
    difficulty: "Advanced",
    xp: 350,
    badge: "Growth Hacker",
    completedDate: "May 10, 2023",
  },
  {
    id: "4",
    title: "Implement AI Recommendations",
    difficulty: "Advanced",
    xp: 300,
    badge: "Innovator",
    completedDate: "Jul 5, 2023",
  },
]

// Mock data for collaborations
const collaborations = [
  {
    id: "1",
    title: "Proconnect Design System",
    status: "Completed",
    members: [
      { name: "Alex Morgan", avatar: "/placeholder.svg?height=40&width=40&text=AM" },
      { name: "Sarah Chen", avatar: "/placeholder.svg?height=40&width=40&text=SC" },
      { name: "David Kim", avatar: "/placeholder.svg?height=40&width=40&text=DK" },
    ],
    role: "Project Lead",
    completedDate: "Apr 18, 2023",
  },
  {
    id: "2",
    title: "User Onboarding Optimization",
    status: "Active",
    members: [
      { name: "Emma Wilson", avatar: "/placeholder.svg?height=40&width=40&text=EW" },
      { name: "Michael Rodriguez", avatar: "/placeholder.svg?height=40&width=40&text=MR" },
    ],
    role: "UX Advisor",
    progress: 75,
  },
  {
    id: "3",
    title: "Enterprise Client Portal",
    status: "Active",
    members: [
      { name: "Lisa Johnson", avatar: "/placeholder.svg?height=40&width=40&text=LJ" },
      { name: "Mark Williams", avatar: "/placeholder.svg?height=40&width=40&text=MW" },
      { name: "Sophia Garcia", avatar: "/placeholder.svg?height=40&width=40&text=SG" },
    ],
    role: "Product Strategist",
    progress: 40,
  },
]

// Mock data for mentorships
const mentorships = [
  {
    id: "1",
    mentee: {
      name: "Alex Morgan",
      avatar: "/placeholder.svg?height=40&width=40&text=AM",
      role: "Senior UX Designer",
    },
    focus: "Product Leadership",
    startDate: "Feb 10, 2023",
    duration: "6 months",
    status: "Active",
  },
  {
    id: "2",
    mentee: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40&text=SC",
      role: "Frontend Architect",
    },
    focus: "Startup Growth",
    startDate: "Mar 5, 2023",
    duration: "6 months",
    status: "Active",
  },
  {
    id: "3",
    mentee: {
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40&text=DK",
      role: "Product Manager",
    },
    focus: "Career Transition to Product",
    startDate: "Jan 15, 2023",
    duration: "3 months",
    status: "Completed",
  },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("showcase")

  return (
    <div className="pt-20 pb-16">
      <div className="container px-4 mx-auto">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
          <div className="h-32 bg-gradient-to-r from-sky-400 to-sky-600 relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white"
            >
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit Cover</span>
            </Button>
          </div>
          <div className="px-6 pb-6 relative">
            <Avatar className="absolute -top-16 left-6 w-32 h-32 border-4 border-white dark:border-gray-800 shadow-md">
              <AvatarImage src="/images/profile-picture.jpeg" alt={profileData.name} />
              <AvatarFallback className="bg-sky-700 text-white text-2xl">OC</AvatarFallback>
            </Avatar>

            <div className="ml-36 pt-4 md:flex md:justify-between md:items-start">
              <div>
                <h1 className="text-2xl font-bold">{profileData.name}</h1>
                <p className="text-gray-600 dark:text-gray-400">{profileData.profession}</p>
                <div className="flex items-center gap-2 mt-1 text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span>{profileData.location}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                <Button className="bg-sky-500 hover:bg-sky-600 text-white">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message
                </Button>
                <Button variant="outline">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Invite to Project
                </Button>
                <Button variant="outline">
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  Endorse
                </Button>
                <Button variant="outline">
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Request Mentorship
                </Button>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-gray-700 dark:text-gray-300">{profileData.bio}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                {profileData.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-2xl font-bold text-sky-600 dark:text-sky-400">{profileData.stats.projects}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Projects</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-2xl font-bold text-sky-600 dark:text-sky-400">{profileData.stats.endorsements}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Endorsements</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-2xl font-bold text-sky-600 dark:text-sky-400">{profileData.stats.connections}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Connections</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-2xl font-bold text-sky-600 dark:text-sky-400">{profileData.stats.missions}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Missions</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-6">
                <a
                  href={`https://${profileData.socialLinks.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <Github className="h-5 w-5" />
                  <span className="text-sm">{profileData.socialLinks.github}</span>
                </a>
                <a
                  href={`https://${profileData.socialLinks.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="text-sm">{profileData.socialLinks.linkedin}</span>
                </a>
                <a
                  href={`https://${profileData.socialLinks.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="text-sm">{profileData.socialLinks.twitter}</span>
                </a>
                <a
                  href={`https://${profileData.socialLinks.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <LinkIcon className="h-5 w-5" />
                  <span className="text-sm">{profileData.socialLinks.website}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <Tabs defaultValue="showcase" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800">
            <TabsTrigger value="showcase" className="flex-1">
              <Briefcase className="mr-2 h-4 w-4" />
              Showcase
            </TabsTrigger>
            <TabsTrigger value="missions" className="flex-1">
              <Award className="mr-2 h-4 w-4" />
              Missions Completed
            </TabsTrigger>
            <TabsTrigger value="collabs" className="flex-1">
              <Users className="mr-2 h-4 w-4" />
              Collabs
            </TabsTrigger>
            <TabsTrigger value="mentorships" className="flex-1">
              <Lightbulb className="mr-2 h-4 w-4" />
              Mentorships
            </TabsTrigger>
          </TabsList>

          <TabsContent value="showcase" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {showcaseProjects.map((project) => (
                <Card
                  key={project.id}
                  className="border-none shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={project.thumbnail || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="border-sky-500 text-sky-600 dark:text-sky-400">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center gap-1 text-gray-600">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{project.endorsements} endorsements</span>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <ExternalLink className="h-4 w-4" />
                      <span>View</span>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="missions" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {completedMissions.map((mission) => (
                <Card key={mission.id} className="border-none shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle>{mission.title}</CardTitle>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        Completed
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="border-orange-500 text-orange-600">
                        {mission.difficulty}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        <Calendar className="inline-block mr-1 h-3 w-3" />
                        {mission.completedDate}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-orange-500" />
                        <span className="font-medium">{mission.badge} Badge</span>
                      </div>
                      <div className="text-sm font-medium text-sky-600 dark:text-sky-400">+{mission.xp} XP</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="collabs" className="mt-6">
            <div className="space-y-6">
              {collaborations.map((collab) => (
                <Card key={collab.id} className="border-none shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle>{collab.title}</CardTitle>
                      <Badge
                        className={
                          collab.status === "Completed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300"
                        }
                      >
                        {collab.status}
                      </Badge>
                    </div>
                    <CardDescription>Role: {collab.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Team Members:</p>
                      <div className="flex -space-x-2">
                        {collab.members.map((member, index) => (
                          <Avatar key={index} className="border-2 border-white dark:border-gray-800">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback className="bg-sky-700 text-white">{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </div>

                    {collab.status === "Active" && collab.progress && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-500">Progress</span>
                          <span className="font-medium">{collab.progress}%</span>
                        </div>
                        <Progress value={collab.progress} className="h-2" />
                      </div>
                    )}

                    {collab.status === "Completed" && collab.completedDate && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>Completed on {collab.completedDate}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mentorships" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mentorships.map((mentorship) => (
                <Card key={mentorship.id} className="border-none shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={mentorship.mentee.avatar || "/placeholder.svg"}
                            alt={mentorship.mentee.name}
                          />
                          <AvatarFallback className="bg-sky-700 text-white">
                            {mentorship.mentee.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{mentorship.mentee.name}</CardTitle>
                          <CardDescription>{mentorship.mentee.role}</CardDescription>
                        </div>
                      </div>
                      <Badge
                        className={
                          mentorship.status === "Completed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300"
                        }
                      >
                        {mentorship.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Focus Area:</span>
                        <span className="text-sm font-medium">{mentorship.focus}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Started:</span>
                        <span className="text-sm">{mentorship.startDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Duration:</span>
                        <span className="text-sm">{mentorship.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
