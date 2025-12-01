"use client"

import { useState } from "react"
import { Users, Clock, CheckCircle, AlertCircle, MoreHorizontal, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { CreateProjectModal } from "@/components/modals/create-project-modal"

// Mock project data
const projects = [
  {
    id: "1",
    title: "E-commerce Platform Redesign",
    description: "Complete overhaul of the user experience and visual design for a major e-commerce platform",
    status: "In Progress",
    priority: "High",
    progress: 65,
    dueDate: "2023-08-15",
    team: [
      { name: "Alex Morgan", avatar: "/placeholder.svg?height=32&width=32&text=AM", role: "Lead Designer" },
      { name: "Sarah Chen", avatar: "/placeholder.svg?height=32&width=32&text=SC", role: "Frontend Dev" },
      { name: "David Kim", avatar: "/placeholder.svg?height=32&width=32&text=DK", role: "UX Researcher" },
    ],
    tasks: {
      total: 24,
      completed: 16,
      inProgress: 5,
      pending: 3,
    },
    budget: "$45,000",
    client: "TechCorp Inc.",
  },
  {
    id: "2",
    title: "Mobile Banking App",
    description: "Native mobile application for iOS and Android with advanced security features",
    status: "Planning",
    priority: "Medium",
    progress: 25,
    dueDate: "2023-09-30",
    team: [
      { name: "Emma Wilson", avatar: "/placeholder.svg?height=32&width=32&text=EW", role: "Mobile Dev" },
      { name: "Michael Rodriguez", avatar: "/placeholder.svg?height=32&width=32&text=MR", role: "Security Expert" },
    ],
    tasks: {
      total: 18,
      completed: 4,
      inProgress: 2,
      pending: 12,
    },
    budget: "$32,000",
    client: "FinanceFirst Bank",
  },
  {
    id: "3",
    title: "AI Content Generator",
    description: "Machine learning platform for automated content creation and optimization",
    status: "Completed",
    priority: "High",
    progress: 100,
    completedDate: "2023-06-20",
    team: [
      { name: "Lisa Johnson", avatar: "/placeholder.svg?height=32&width=32&text=LJ", role: "ML Engineer" },
      { name: "Mark Williams", avatar: "/placeholder.svg?height=32&width=32&text=MW", role: "Data Scientist" },
      { name: "Sophia Garcia", avatar: "/placeholder.svg?height=32&width=32&text=SG", role: "Backend Dev" },
    ],
    tasks: {
      total: 32,
      completed: 32,
      inProgress: 0,
      pending: 0,
    },
    budget: "$67,000",
    client: "ContentCorp",
  },
]

const recentActivity = [
  {
    id: "1",
    type: "task_completed",
    message: "Alex Morgan completed 'User Interface Mockups'",
    time: "2 hours ago",
    project: "E-commerce Platform Redesign",
  },
  {
    id: "2",
    type: "milestone_reached",
    message: "Mobile Banking App reached 25% completion",
    time: "4 hours ago",
    project: "Mobile Banking App",
  },
  {
    id: "3",
    type: "team_update",
    message: "Sarah Chen joined the project team",
    time: "1 day ago",
    project: "E-commerce Platform Redesign",
  },
  {
    id: "4",
    type: "deadline_approaching",
    message: "E-commerce Platform Redesign due in 2 weeks",
    time: "2 days ago",
    project: "E-commerce Platform Redesign",
  },
]

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [projectsList, setProjectsList] = useState(projects)

  const handleNewProject = (newProject: any) => {
    setProjectsList([newProject, ...projectsList])
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Planning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "Medium":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Project Management</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage your collaborative projects and track progress
            </p>
          </div>
          <CreateProjectModal onProjectCreate={handleNewProject} />
        </div>

        <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="active">Active Projects</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Project Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-none shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                  <CheckCircle className="h-4 w-4 text-sky-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-green-600">+2 this month</p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  <Clock className="h-4 w-4 text-sky-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-blue-600">67% completion avg</p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                  <Users className="h-4 w-4 text-sky-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-green-600">+3 this week</p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Budget Utilized</CardTitle>
                  <AlertCircle className="h-4 w-4 text-sky-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78%</div>
                  <p className="text-xs text-orange-600">$144K of $185K</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates from your projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                    >
                      <div className="w-2 h-2 rounded-full bg-sky-500 mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.message}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <span>{activity.project}</span>
                          <span>•</span>
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active" className="space-y-6">
            <div className="flex gap-4 mb-6">
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {projectsList.map((project) => (
                <Card key={project.id} className="border-none shadow-md">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <CardDescription className="mt-1">{project.description}</CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Edit Project</DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Export Data</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                      <Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Client:</span>
                        <p className="font-medium">{project.client}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Budget:</span>
                        <p className="font-medium">{project.budget}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Due Date:</span>
                        <p className="font-medium">
                          {project.status === "Completed" ? project.completedDate : project.dueDate}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">Tasks:</span>
                        <p className="font-medium">
                          {project.tasks.completed}/{project.tasks.total}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-2">Team Members</p>
                      <div className="flex -space-x-2">
                        {project.team.map((member, index) => (
                          <Avatar key={index} className="border-2 border-white dark:border-gray-800">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback className="bg-sky-700 text-white">{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-sky-500 hover:bg-sky-600 text-white">View Project</Button>
                      <Button variant="outline">Message Team</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
