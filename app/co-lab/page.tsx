"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Users, Clock, ArrowLeft, Check, PlusCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

// Mock data for collaborations
const initialCollaborations = [
  {
    id: "1",
    title: "Design System for E-commerce Platform",
    description:
      "Creating a comprehensive design system for a large-scale e-commerce platform with a focus on accessibility and performance.",
    status: "Active",
    progress: 65,
    dueDate: "Jul 15, 2026",
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
    dueDate: "Aug 30, 2026",
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
    dueDate: "Sep 15, 2026",
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
    completedDate: "May 20, 2026",
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
  const [collabList, setCollabList] = useState<any[]>([])
  const [selectedCollabId, setSelectedCollabId] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("proconnect_colabs")
    if (saved) {
      try {
        setCollabList(JSON.parse(saved))
      } catch {
        setCollabList(initialCollaborations)
      }
    } else {
      setCollabList(initialCollaborations)
      localStorage.setItem("proconnect_colabs", JSON.stringify(initialCollaborations))
    }
  }, [])

  const saveCollabs = (updatedList: any[]) => {
    setCollabList(updatedList)
    localStorage.setItem("proconnect_colabs", JSON.stringify(updatedList))
  }

  // Filter collaborations based on active tab and search query
  const filteredCollabs = collabList.filter((collab) => {
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

  const handleCreateCollaboration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const status = formData.get("status") as string
    const dueDate = formData.get("dueDate") as string
    const skillsString = formData.get("skills") as string || ""

    const newCollab = {
      id: String(Date.now()),
      title,
      description,
      status: status.charAt(0).toUpperCase() + status.slice(1),
      progress: status === "completed" ? 100 : status === "active" ? 10 : 0,
      dueDate: dueDate || "TBD",
      members: [
        { name: "Okafor Chidera", avatar: "/images/profile-picture.jpeg", role: "Initiator" }
      ],
      skills: skillsString.split(",").map(s => s.trim()).filter(Boolean)
    }

    const updated = [newCollab, ...collabList]
    saveCollabs(updated)
    setIsDialogOpen(false)
    toast.success("Collaboration initialized! Others can now view and join your team.")
  }

  const handleJoinCollaboration = (collabId: string) => {
    const updated = collabList.map((c) => {
      if (c.id === collabId) {
        // Check if already a member
        const isMember = c.members.some((m: any) => m.name === "Okafor Chidera")
        if (isMember) return c

        return {
          ...c,
          members: [
            ...c.members,
            { name: "Okafor Chidera", avatar: "/images/profile-picture.jpeg", role: "Contributor" }
          ]
        }
      }
      return c
    })

    saveCollabs(updated)
    toast.success("Welcome aboard! You have joined the collaboration team.")
  }

  const selectedCollab = collabList.find(c => c.id === selectedCollabId)

  if (selectedCollab) {
    const userIsMember = selectedCollab.members.some((m: any) => m.name === "Okafor Chidera")

    return (
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button variant="ghost" onClick={() => setSelectedCollabId(null)} className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Collaborations
          </Button>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold">{selectedCollab.title}</h1>
                <p className="text-gray-500 mt-2">Status: 
                  <Badge className="ml-2 bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300">
                    {selectedCollab.status}
                  </Badge>
                </p>
              </div>

              {!userIsMember && (
                <Button 
                  onClick={() => handleJoinCollaboration(selectedCollab.id)}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Join Collaboration
                </Button>
              )}
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {selectedCollab.description}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-2">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {selectedCollab.skills.map((skill: string, index: number) => (
                  <Badge key={index} variant="outline" className="border-sky-500 text-sky-600 dark:text-sky-400">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-2">Progress</h3>
              <div className="flex items-center gap-4">
                <Progress value={selectedCollab.progress} className="h-3 flex-1" />
                <span className="font-semibold text-sky-600">{selectedCollab.progress}%</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Project Team ({selectedCollab.members.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedCollab.members.map((member: any, index: number) => (
                  <Card key={index} className="border border-gray-100 dark:border-gray-700">
                    <CardContent className="p-4 flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="bg-sky-700 text-white">
                          {member.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.role}</p>
                      </div>
                      {member.name === "Okafor Chidera" && (
                        <Badge className="ml-auto bg-green-100 text-green-800">You</Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Co-Lab</h1>
            <p className="text-gray-500 mt-1">Collaborate with professionals on innovative projects</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4 md:mt-0 bg-sky-500 hover:bg-sky-600 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Start New Collaboration
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Initialize Collaboration</DialogTitle>
                <DialogDescription>
                  Set up a project scope to invite others to work together.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleCreateCollaboration} className="space-y-4 mt-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" placeholder="Project name/theme" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" placeholder="Describe the goal and milestones..." rows={4} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Initial Status</Label>
                    <Select name="status" defaultValue="planning">
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planning">Planning</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Target Due Date</Label>
                    <Input id="dueDate" name="dueDate" type="date" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skills">Required Skills (Comma separated)</Label>
                  <Input id="skills" name="skills" placeholder="e.g. UI/UX, React, Machine Learning" required />
                </div>

                <DialogFooter className="mt-4">
                  <DialogClose asChild>
                    <Button variant="outline" type="button">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" className="bg-sky-500 hover:bg-sky-600 text-white">
                    Start Collaboration
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
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

          {["active", "planning", "completed", "all"].map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-6">
              {filteredCollabs.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No collaborations match your filters.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCollabs.map((collab) => (
                    <Card key={collab.id} className="border-none shadow-md hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start gap-4">
                          <CardTitle className="text-lg">{collab.title}</CardTitle>
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
                          {collab.skills.map((skill: string, index: number) => (
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
                          {collab.members.slice(0, 3).map((member: any, index: number) => (
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
                        <Button 
                          onClick={() => setSelectedCollabId(collab.id)}
                          className="ml-auto bg-sky-500 hover:bg-sky-600 text-white"
                        >
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
