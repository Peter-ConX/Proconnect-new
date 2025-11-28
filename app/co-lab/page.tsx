"use client"

import { useState } from "react"
import { Search, Plus, Users, Clock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for collaborations
const collaborations = [
  {
    id: "1",
    title: "Design System for E-commerce Platform",
    description:
      "Creating a comprehensive design system for a large-scale e-commerce platform with a focus on accessibility and performance.",
    status: "Active",
    progress: 65,
    dueDate: "Jul 15, 2023",
    members: [
      { name: "Alex Morgan", avatar: "/placeholder.svg?height=40&width=40&text=AM", role: "UX Designer" },
      { name: "Sarah Chen", avatar: "/placeholder.svg?height=40&width=40&text=SC", role: "Frontend Developer" },
      { name: "David Kim", avatar: "/placeholder.svg?height=40&width=40&text=DK", role: "UI Designer" },
    ],
    skills: ["UI/UX", "Design Systems", "Figma", "React"],
  },
  {
    id: "2",
    title: "AI-Powered Content Recommendation Engine",
    description:
      "Developing a machine learning algorithm that analyzes user behavior to provide personalized content recommendations across multiple platforms.",
    status: "Active",
    progress: 40,
    dueDate: "Aug 30, 2023",
    members: [
      { name: "Emma Wilson", avatar: "/placeholder.svg?height=40&width=40&text=EW", role: "Data Scientist" },
      { name: "Michael Rodriguez", avatar: "/placeholder.svg?height=40&width=40&text=MR", role: "Backend Developer" },
      { name: "Lisa Johnson", avatar: "/placeholder.svg?height=40&width=40&text=LJ", role: "ML Engineer" },
    ],
    skills: ["Machine Learning", "Python", "Data Analysis", "API Development"],
  },
  {
    id: "3",
    title: "Sustainable Supply Chain Dashboard",
    description:
      "Creating an analytics dashboard to help companies track and improve the sustainability metrics of their supply chain operations.",
    status: "Planning",
    progress: 15,
    dueDate: "Sep 15, 2023",
    members: [
      { name: "Okafor Chidera", avatar: "/images/profile-picture.jpeg", role: "Project Lead" },
      { name: "Mark Williams", avatar: "/placeholder.svg?height=40&width=40&text=MW", role: "Data Analyst" },
    ],
    skills: ["Data Visualization", "Sustainability", "Dashboard Design", "Analytics"],
  },
  {
    id: "4",
    title: "Mobile Banking App Redesign",
    description:
      "Redesigning a mobile banking application with improved user experience, security features, and accessibility compliance.",
    status: "Completed",
    progress: 100,
    completedDate: "May 20, 2023",
    members: [
      { name: "Olivia Martinez", avatar: "/placeholder.svg?height=40&width=40&text=OM", role: "Mobile Developer" },
      { name: "Sophia Garcia", avatar: "/placeholder.svg?height=40&width=40&text=SG", role: "UX Researcher" },
    ],
    skills: ["Mobile Design", "UI/UX", "Swift", "Kotlin", "Accessibility"],
  },
]

export default function CoLabPage() {
  const [activeTab, setActiveTab] = useState("active")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter collaborations based on active tab and search query
  const filteredCollabs = collaborations.filter((collab) => {
    const statusMatch =
      activeTab === "all" ||
      (activeTab === "active" && collab.status === "Active") ||
      (activeTab === "planning" && collab.status === "Planning") ||
      (activeTab === "completed" && collab.status === "Completed")

    const searchMatch =
      searchQuery === "" ||
      collab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collab.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collab.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    return statusMatch && searchMatch
  })

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Co-Lab</h1>
            <p className="text-gray-500 mt-1">Collaborate with professionals on innovative projects</p>
          </div>
          <Button className="mt-4 md:mt-0 bg-sky-500 hover:bg-sky-600 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Start New Collaboration
          </Button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search collaborations by title, description, or skills..."
              className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="active" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 max-w-md">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="planning">Planning</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCollabs.map((collab) => (
                <Card key={collab.id} className="border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle>{collab.title}</CardTitle>
                      <Badge
                        className={
                          collab.status === "Active"
                            ? "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300"
                            : collab.status === "Completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
                        }
                      >
                        {collab.status}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">{collab.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {collab.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="border-sky-500 text-sky-600 dark:text-sky-400">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-medium">{collab.progress}%</span>
                      </div>
                      <Progress value={collab.progress} className="h-2" />
                    </div>

                    <div className="flex justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>{collab.members.length} members</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>
                          {collab.status === "Completed"
                            ? `Completed ${collab.completedDate}`
                            : `Due ${collab.dueDate}`}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex -space-x-2 mr-4">
                      {collab.members.slice(0, 3).map((member, index) => (
                        <Avatar key={index} className="border-2 border-white dark:border-gray-800">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback className="bg-sky-700 text-white">{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ))}
                      {collab.members.length > 3 && (
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 border-2 border-white dark:border-gray-800 text-xs font-medium">
                          +{collab.members.length - 3}
                        </div>
                      )}
                    </div>
                    <Button className="ml-auto bg-sky-500 hover:bg-sky-600 text-white">View Details</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="planning" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCollabs.map((collab) => (
                <Card key={collab.id} className="border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle>{collab.title}</CardTitle>
                      <Badge
                        className={
                          collab.status === "Active"
                            ? "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300"
                            : collab.status === "Completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
                        }
                      >
                        {collab.status}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">{collab.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {collab.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="border-sky-500 text-sky-600 dark:text-sky-400">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-medium">{collab.progress}%</span>
                      </div>
                      <Progress value={collab.progress} className="h-2" />
                    </div>

                    <div className="flex justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>{collab.members.length} members</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>
                          {collab.status === "Completed"
                            ? `Completed ${collab.completedDate}`
                            : `Due ${collab.dueDate}`}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex -space-x-2 mr-4">
                      {collab.members.slice(0, 3).map((member, index) => (
                        <Avatar key={index} className="border-2 border-white dark:border-gray-800">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback className="bg-sky-700 text-white">{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ))}
                      {collab.members.length > 3 && (
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 border-2 border-white dark:border-gray-800 text-xs font-medium">
                          +{collab.members.length - 3}
                        </div>
                      )}
                    </div>
                    <Button className="ml-auto bg-sky-500 hover:bg-sky-600 text-white">View Details</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCollabs.map((collab) => (
                <Card key={collab.id} className="border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle>{collab.title}</CardTitle>
                      <Badge
                        className={
                          collab.status === "Active"
                            ? "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300"
                            : collab.status === "Completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
                        }
                      >
                        {collab.status}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">{collab.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {collab.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="border-sky-500 text-sky-600 dark:text-sky-400">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-medium">{collab.progress}%</span>
                      </div>
                      <Progress value={collab.progress} className="h-2" />
                    </div>

                    <div className="flex justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>{collab.members.length} members</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>
                          {collab.status === "Completed"
                            ? `Completed ${collab.completedDate}`
                            : `Due ${collab.dueDate}`}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex -space-x-2 mr-4">
                      {collab.members.slice(0, 3).map((member, index) => (
                        <Avatar key={index} className="border-2 border-white dark:border-gray-800">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback className="bg-sky-700 text-white">{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ))}
                      {collab.members.length > 3 && (
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 border-2 border-white dark:border-gray-800 text-xs font-medium">
                          +{collab.members.length - 3}
                        </div>
                      )}
                    </div>
                    <Button className="ml-auto bg-sky-500 hover:bg-sky-600 text-white">View Details</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCollabs.map((collab) => (
                <Card key={collab.id} className="border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle>{collab.title}</CardTitle>
                      <Badge
                        className={
                          collab.status === "Active"
                            ? "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300"
                            : collab.status === "Completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
                        }
                      >
                        {collab.status}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">{collab.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {collab.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="border-sky-500 text-sky-600 dark:text-sky-400">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-medium">{collab.progress}%</span>
                      </div>
                      <Progress value={collab.progress} className="h-2" />
                    </div>

                    <div className="flex justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>{collab.members.length} members</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>
                          {collab.status === "Completed"
                            ? `Completed ${collab.completedDate}`
                            : `Due ${collab.dueDate}`}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex -space-x-2 mr-4">
                      {collab.members.slice(0, 3).map((member, index) => (
                        <Avatar key={index} className="border-2 border-white dark:border-gray-800">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback className="bg-sky-700 text-white">{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ))}
                      {collab.members.length > 3 && (
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 border-2 border-white dark:border-gray-800 text-xs font-medium">
                          +{collab.members.length - 3}
                        </div>
                      )}
                    </div>
                    <Button className="ml-auto bg-sky-500 hover:bg-sky-600 text-white">View Details</Button>
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
