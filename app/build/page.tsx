"use client"

import type React from "react"

import { useState } from "react"
import {
  Search,
  Plus,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  FileText,
  MessageSquare,
  FolderOpen,
  Edit,
  Trash2,
  ChevronRight,
  PlusCircle,
  Upload,
  Send,
  Paperclip,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

// Mock data for projects
const projects = [
  {
    id: "1",
    name: "Proconnect Platform Redesign",
    description:
      "Redesign the Proconnect platform with a focus on improved user experience and modern design principles.",
    status: "Active",
    progress: 65,
    dueDate: "Jul 15, 2023",
    members: [
      { name: "Okafor Chidera", avatar: "/placeholder.svg?height=40&width=40&text=OC", role: "Project Lead" },
      { name: "Alex Morgan", avatar: "/placeholder.svg?height=40&width=40&text=AM", role: "UX Designer" },
      { name: "Sarah Chen", avatar: "/placeholder.svg?height=40&width=40&text=SC", role: "Frontend Developer" },
      { name: "David Kim", avatar: "/placeholder.svg?height=40&width=40&text=DK", role: "UI Designer" },
    ],
    tasks: [
      { id: "t1", title: "User Research", status: "completed", assignee: "Alex Morgan" },
      { id: "t2", title: "Wireframing", status: "completed", assignee: "David Kim" },
      { id: "t3", title: "UI Design", status: "in-progress", assignee: "David Kim" },
      { id: "t4", title: "Frontend Implementation", status: "in-progress", assignee: "Sarah Chen" },
      { id: "t5", title: "User Testing", status: "planned", assignee: "Alex Morgan" },
      { id: "t6", title: "Launch", status: "planned", assignee: "Okafor Chidera" },
    ],
    files: [
      { name: "User Research Report.pdf", type: "pdf", size: "2.4 MB", uploadedBy: "Alex Morgan", date: "Jun 5, 2023" },
      { name: "Wireframes.fig", type: "figma", size: "8.7 MB", uploadedBy: "David Kim", date: "Jun 12, 2023" },
      { name: "Design System.sketch", type: "sketch", size: "15.2 MB", uploadedBy: "David Kim", date: "Jun 18, 2023" },
    ],
    comments: [
      {
        id: "c1",
        author: { name: "Alex Morgan", avatar: "/placeholder.svg?height=40&width=40&text=AM" },
        content:
          "I've completed the user research. Key findings: users want a more streamlined navigation and better visualization of their progress.",
        timestamp: "Jun 6, 2023 at 10:23 AM",
      },
      {
        id: "c2",
        author: { name: "David Kim", avatar: "/placeholder.svg?height=40&width=40&text=DK" },
        content:
          "Wireframes are ready for review. I've focused on simplifying the dashboard and making the mission flow more intuitive.",
        timestamp: "Jun 13, 2023 at 3:45 PM",
      },
      {
        id: "c3",
        author: { name: "Okafor Chidera", avatar: "/placeholder.svg?height=40&width=40&text=OC" },
        content:
          "Great work everyone! The wireframes look promising. Let's schedule a review meeting tomorrow to discuss the UI design direction.",
        timestamp: "Jun 14, 2023 at 9:12 AM",
      },
    ],
  },
  {
    id: "2",
    name: "Mobile App Development",
    description:
      "Create a native mobile application for iOS and Android to extend the Proconnect platform to mobile devices.",
    status: "Active",
    progress: 40,
    dueDate: "Aug 30, 2023",
    members: [
      { name: "Okafor Chidera", avatar: "/placeholder.svg?height=40&width=40&text=OC", role: "Product Owner" },
      { name: "Michael Rodriguez", avatar: "/placeholder.svg?height=40&width=40&text=MR", role: "Mobile Developer" },
      { name: "Emma Wilson", avatar: "/placeholder.svg?height=40&width=40&text=EW", role: "UX Researcher" },
    ],
  },
  {
    id: "3",
    name: "AI Recommendation Engine",
    description:
      "Develop an AI-powered recommendation system to suggest relevant missions, projects, and connections to users.",
    status: "Draft",
    progress: 15,
    dueDate: "Sep 15, 2023",
    members: [
      { name: "Okafor Chidera", avatar: "/placeholder.svg?height=40&width=40&text=OC", role: "Project Sponsor" },
      { name: "Lisa Johnson", avatar: "/placeholder.svg?height=40&width=40&text=LJ", role: "Data Scientist" },
    ],
  },
  {
    id: "4",
    name: "Enterprise Client Portal",
    description:
      "Build a dedicated portal for enterprise clients to manage their teams, track progress, and access analytics.",
    status: "Completed",
    progress: 100,
    completedDate: "May 20, 2023",
    members: [
      { name: "Okafor Chidera", avatar: "/placeholder.svg?height=40&width=40&text=OC", role: "Project Lead" },
      { name: "Mark Williams", avatar: "/placeholder.svg?height=40&width=40&text=MW", role: "Backend Developer" },
      { name: "Sophia Garcia", avatar: "/placeholder.svg?height=40&width=40&text=SG", role: "Frontend Developer" },
    ],
  },
]

export default function BuildPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>("description")
  const [isCreating, setIsCreating] = useState(false)
  const [newComment, setNewComment] = useState("")

  // Filter projects based on selected status and search query
  const filteredProjects = projects.filter((project) => {
    const statusMatch = selectedStatus === "all" || project.status.toLowerCase() === selectedStatus.toLowerCase()
    const searchMatch =
      searchQuery === "" ||
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())

    return statusMatch && searchMatch
  })

  // Get the selected project details
  const projectDetails = selectedProject ? projects.find((p) => p.id === selectedProject) : null

  const handleCreateProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsCreating(true)

    // Simulate API call
    setTimeout(() => {
      setIsCreating(false)
      // Reset form and close dialog would happen here
    }, 1500)
  }

  const handleAddComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newComment.trim()) return

    // In a real app, you would add the comment to the project
    console.log("Adding comment:", newComment)
    setNewComment("")
  }

  // Calculate task statistics
  const getTaskStats = (tasks: any[] = []) => {
    const total = tasks.length
    const completed = tasks.filter((t) => t.status === "completed").length
    const inProgress = tasks.filter((t) => t.status === "in-progress").length
    const planned = tasks.filter((t) => t.status === "planned").length

    return { total, completed, inProgress, planned }
  }

  return (
    <div className="pt-20 pb-16">
      {!selectedProject ? (
        <>
          <section className="bg-gradient-to-r from-sky-400 to-sky-600 text-white py-12">
            <div className="container px-4 mx-auto">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Build Together</h1>
                <p className="text-lg text-white/80 mb-8">
                  Collaborate on projects with other professionals to create innovative solutions
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                      <Plus className="mr-2 h-5 w-5" />
                      Start New Project
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                      <DialogTitle>Create New Project</DialogTitle>
                      <DialogDescription>
                        Fill out the details below to start a new collaborative project.
                      </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleCreateProject} className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Project Name</Label>
                        <Input id="name" name="projectName" placeholder="Enter a descriptive name" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          name="projectDescription"
                          placeholder="Describe the project goals, scope, and expected outcomes..."
                          rows={4}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="status">Status</Label>
                          <Select name="projectStatus" defaultValue="draft">
                            <SelectTrigger id="status">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="on-hold">On Hold</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="dueDate">Due Date</Label>
                          <Input id="dueDate" name="projectDueDate" type="date" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="team">Invite Team Members</Label>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <Input
                            id="team"
                            name="projectTeam"
                            placeholder="Enter email addresses (comma separated)"
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="outline">
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button type="submit" className="bg-sky-500 hover:bg-sky-600" disabled={isCreating}>
                          {isCreating ? (
                            <>
                              <LoadingSpinner size="sm" />
                              <span className="ml-2">Creating...</span>
                            </>
                          ) : (
                            "Create Project"
                          )}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </section>

          <section className="py-12">
            <div className="container px-4 mx-auto">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search projects by name or description..."
                    className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <Card
                    key={project.id}
                    className="border-none shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle>{project.name}</CardTitle>
                        <Badge
                          className={
                            project.status === "Active"
                              ? "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300"
                              : project.status === "Completed"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                          }
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-500">Progress</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>

                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="h-4 w-4" />
                          <span>{project.members.length} members</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>
                            {project.status === "Completed"
                              ? `Completed ${project.completedDate}`
                              : `Due ${project.dueDate}`}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex -space-x-2">
                        {project.members.slice(0, 3).map((member, index) => (
                          <Avatar key={index} className="border-2 border-white dark:border-gray-800">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback className="bg-sky-700 text-white">{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        ))}
                        {project.members.length > 3 && (
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 border-2 border-white dark:border-gray-800 text-xs font-medium">
                            +{project.members.length - 3}
                          </div>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="container px-4 mx-auto py-8">
          <div className="flex items-center mb-6">
            <Button variant="ghost" className="mr-2" onClick={() => setSelectedProject(null)}>
              <ChevronRight className="h-4 w-4 rotate-180" />
              <span className="ml-1">Back to Projects</span>
            </Button>
            <h1 className="text-2xl font-bold">{projectDetails?.name}</h1>
            <Badge
              className={`ml-4 ${
                projectDetails?.status === "Active"
                  ? "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300"
                  : projectDetails?.status === "Completed"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              {projectDetails?.status}
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Card className="border-none shadow-md mb-6">
                <CardHeader className="pb-2">
                  <Tabs defaultValue="description" onValueChange={setActiveTab}>
                    <TabsList>
                      <TabsTrigger value="description">
                        <FileText className="h-4 w-4 mr-2" />
                        Description
                      </TabsTrigger>
                      <TabsTrigger value="roadmap">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Roadmap
                      </TabsTrigger>
                      <TabsTrigger value="files">
                        <FolderOpen className="h-4 w-4 mr-2" />
                        Files
                      </TabsTrigger>
                      <TabsTrigger value="chat">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Team Chat
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>

                <CardContent>
                  <TabsContent value="description" className="mt-4">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Project Description</h3>
                        <p className="text-gray-700 dark:text-gray-300">{projectDetails?.description}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">Timeline</h3>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>Due Date: {projectDetails?.dueDate}</span>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">Progress</h3>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-500">Overall Completion</span>
                          <span className="font-medium">{projectDetails?.progress}%</span>
                        </div>
                        <Progress value={projectDetails?.progress} className="h-2" />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="roadmap" className="mt-4">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Tasks</h3>
                        <Button size="sm" className="bg-sky-500 hover:bg-sky-600">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add Task
                        </Button>
                      </div>

                      {projectDetails?.tasks && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card className="border border-gray-200 dark:border-gray-700">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-center">
                                <CardTitle className="text-base">Planned</CardTitle>
                                <Badge variant="outline" className="bg-gray-100 dark:bg-gray-800">
                                  {getTaskStats(projectDetails.tasks).planned}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="p-2">
                              <div className="space-y-2">
                                {projectDetails.tasks
                                  .filter((task) => task.status === "planned")
                                  .map((task) => (
                                    <div
                                      key={task.id}
                                      className="p-3 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700"
                                    >
                                      <p className="font-medium">{task.title}</p>
                                      <div className="flex justify-between items-center mt-2 text-sm">
                                        <span className="text-gray-500">Assignee:</span>
                                        <span>{task.assignee}</span>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="border border-gray-200 dark:border-gray-700">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-center">
                                <CardTitle className="text-base">In Progress</CardTitle>
                                <Badge
                                  variant="outline"
                                  className="bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300"
                                >
                                  {getTaskStats(projectDetails.tasks).inProgress}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="p-2">
                              <div className="space-y-2">
                                {projectDetails.tasks
                                  .filter((task) => task.status === "in-progress")
                                  .map((task) => (
                                    <div
                                      key={task.id}
                                      className="p-3 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700"
                                    >
                                      <p className="font-medium">{task.title}</p>
                                      <div className="flex justify-between items-center mt-2 text-sm">
                                        <span className="text-gray-500">Assignee:</span>
                                        <span>{task.assignee}</span>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="border border-gray-200 dark:border-gray-700">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-center">
                                <CardTitle className="text-base">Completed</CardTitle>
                                <Badge
                                  variant="outline"
                                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                >
                                  {getTaskStats(projectDetails.tasks).completed}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="p-2">
                              <div className="space-y-2">
                                {projectDetails.tasks
                                  .filter((task) => task.status === "completed")
                                  .map((task) => (
                                    <div
                                      key={task.id}
                                      className="p-3 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700"
                                    >
                                      <p className="font-medium">{task.title}</p>
                                      <div className="flex justify-between items-center mt-2 text-sm">
                                        <span className="text-gray-500">Assignee:</span>
                                        <span>{task.assignee}</span>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="files" className="mt-4">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Shared Files</h3>
                        <Button size="sm" className="bg-sky-500 hover:bg-sky-600">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload File
                        </Button>
                      </div>

                      {projectDetails?.files && (
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="text-left py-3 px-4 font-medium text-gray-500">Name</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-500">Size</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-500">Uploaded By</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
                                <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {projectDetails.files.map((file, index) => (
                                <tr
                                  key={index}
                                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                                >
                                  <td className="py-3 px-4">
                                    <div className="flex items-center">
                                      <FileText className="h-5 w-5 text-gray-400 mr-2" />
                                      <span>{file.name}</span>
                                    </div>
                                  </td>
                                  <td className="py-3 px-4 text-gray-500">{file.size}</td>
                                  <td className="py-3 px-4">{file.uploadedBy}</td>
                                  <td className="py-3 px-4 text-gray-500">{file.date}</td>
                                  <td className="py-3 px-4 text-right">
                                    <Button variant="ghost" size="sm">
                                      Download
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="chat" className="mt-4">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Team Chat</h3>
                      </div>

                      <div className="border rounded-lg overflow-hidden">
                        <div className="h-96 overflow-y-auto p-4 space-y-4">
                          {projectDetails?.comments &&
                            projectDetails.comments.map((comment) => (
                              <div key={comment.id} className="flex gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage
                                    src={comment.author.avatar || "/placeholder.svg"}
                                    alt={comment.author.name}
                                  />
                                  <AvatarFallback className="bg-sky-700 text-white">
                                    {comment.author.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <p className="font-medium">{comment.author.name}</p>
                                    <p className="text-xs text-gray-500">{comment.timestamp}</p>
                                  </div>
                                  <p className="text-gray-700 dark:text-gray-300 mt-1">{comment.content}</p>
                                </div>
                              </div>
                            ))}
                        </div>

                        <Separator />

                        <form onSubmit={handleAddComment} className="p-4 flex gap-2">
                          <Textarea
                            placeholder="Type your message..."
                            className="min-h-[60px] flex-1 resize-none"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                          />
                          <div className="flex flex-col gap-2">
                            <Button type="button" variant="outline" size="icon" className="h-8 w-8">
                              <Paperclip className="h-4 w-4" />
                              <span className="sr-only">Attach file</span>
                            </Button>
                            <Button
                              type="submit"
                              size="icon"
                              className="h-8 w-8 bg-sky-500 hover:bg-sky-600"
                              disabled={!newComment.trim()}
                            >
                              <Send className="h-4 w-4" />
                              <span className="sr-only">Send message</span>
                            </Button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </TabsContent>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="border-none shadow-md sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Team Members</CardTitle>
                </CardHeader>
                <CardContent className="px-4 py-0">
                  <div className="space-y-4">
                    {projectDetails?.members.map((member, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback className="bg-sky-700 text-white">{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-xs text-gray-500">{member.role}</p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="12" cy="5" r="1" />
                                <circle cx="12" cy="19" r="1" />
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <MessageSquare className="mr-2 h-4 w-4" />
                              <span>Message</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit Role</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Remove</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button variant="outline" className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Invite Member
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
