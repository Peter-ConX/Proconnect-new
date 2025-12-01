"use client"

import { useState } from "react"
import { Plus, Upload, Send, Settings, Calendar, Users, FileText, MessageSquare, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock mentor data
const mentorData = {
  id: "mentor-1",
  name: "John Doe",
  expertise: ["Software Engineering", "React", "Node.js"],
  totalMentees: 12,
  activeMentees: 8,
  sessionsCompleted: 45,
  rating: 4.9,
}

// Mock mentees data
const mentees = [
  {
    id: "mentee-1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40&text=SJ",
    role: "Junior Developer",
    focusAreas: ["React", "JavaScript"],
    startDate: "2024-01-15",
    status: "active",
    nextSession: "2024-12-10",
    lastMessage: "Thanks for the feedback!",
  },
  {
    id: "mentee-2",
    name: "Alex Chen",
    avatar: "/placeholder.svg?height=40&width=40&text=AC",
    role: "Full-Stack Developer",
    focusAreas: ["Node.js", "Databases"],
    startDate: "2024-02-01",
    status: "active",
    nextSession: "2024-12-12",
    lastMessage: "Can we discuss the API design?",
  },
  {
    id: "mentee-3",
    name: "Maria Garcia",
    avatar: "/placeholder.svg?height=40&width=40&text=MG",
    role: "Career Changer",
    focusAreas: ["Web Development", "Career Transition"],
    startDate: "2023-11-20",
    status: "paused",
    nextSession: null,
    lastMessage: null,
  },
]

// Mock materials data
const materials = [
  {
    id: "mat-1",
    title: "React Best Practices",
    type: "pdf",
    sharedWith: 8,
    uploadedDate: "2024-10-15",
    size: "2.5 MB",
  },
  {
    id: "mat-2",
    title: "System Design Fundamentals",
    type: "video",
    sharedWith: 5,
    uploadedDate: "2024-11-01",
    size: "156 MB",
  },
  {
    id: "mat-3",
    title: "Interview Preparation Guide",
    type: "document",
    sharedWith: 12,
    uploadedDate: "2024-09-20",
    size: "3.8 MB",
  },
]

export default function MentorDashboard() {
  const [activeTab, setActiveTab] = useState("mentees")
  const [selectedMentee, setSelectedMentee] = useState<any>(null)

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-orange-600 bg-clip-text text-transparent mb-2">
                Mentor Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your mentees and learning materials</p>
            </div>
            <Button className="bg-gradient-to-r from-sky-500 to-orange-500 hover:from-sky-600 hover:to-orange-600 text-white">
              <Settings className="mr-2 h-4 w-4" />
              Profile Settings
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Mentees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{mentorData.activeMentees}</div>
                <p className="text-xs text-gray-500 mt-1">of {mentorData.totalMentees} total</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Sessions Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{mentorData.sessionsCompleted}</div>
                <p className="text-xs text-gray-500 mt-1">Total mentoring hours</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{mentorData.rating}</div>
                <p className="text-xs text-yellow-500 mt-1">⭐ Excellent mentor</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Materials Shared</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{materials.length}</div>
                <p className="text-xs text-gray-500 mt-1">Learning resources</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="mentees" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              My Mentees
            </TabsTrigger>
            <TabsTrigger value="sessions" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Sessions
            </TabsTrigger>
            <TabsTrigger value="materials" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Materials
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Messages
            </TabsTrigger>
          </TabsList>

          {/* Mentees Tab */}
          <TabsContent value="mentees" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Mentees List */}
              <div className="lg:col-span-1">
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Your Mentees</CardTitle>
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mentees.map((mentee) => (
                      <div
                        key={mentee.id}
                        onClick={() => setSelectedMentee(mentee)}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedMentee?.id === mentee.id
                            ? "bg-sky-50 dark:bg-sky-900/20 border border-sky-200"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={mentee.avatar || "/placeholder.svg"} alt={mentee.name} />
                            <AvatarFallback className="bg-sky-600 text-white">{mentee.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{mentee.name}</p>
                            <p className="text-xs text-gray-500 truncate">{mentee.role}</p>
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              mentee.status === "active"
                                ? "bg-green-100 text-green-800 border-green-200"
                                : "bg-gray-100 text-gray-800 border-gray-200"
                            }
                          >
                            {mentee.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Mentee Details */}
              <div className="lg:col-span-2">
                {selectedMentee ? (
                  <Card className="border-none shadow-md">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{selectedMentee.name}</CardTitle>
                          <CardDescription>{selectedMentee.role}</CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Send Message
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Focus Areas */}
                      <div>
                        <h4 className="font-medium mb-2">Focus Areas</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedMentee.focusAreas.map((area: string) => (
                            <Badge key={area} variant="outline" className="border-sky-500 text-sky-600">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Started</p>
                          <p className="font-medium">{selectedMentee.startDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Next Session</p>
                          <p className="font-medium">{selectedMentee.nextSession || "Not scheduled"}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-2 pt-4 border-t">
                        <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white">
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule Session
                        </Button>
                        <Button className="w-full" variant="outline">
                          <Upload className="mr-2 h-4 w-4" />
                          Share Materials
                        </Button>
                        <Button className="w-full" variant="outline">
                          <FileText className="mr-2 h-4 w-4" />
                          View Progress Notes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-none shadow-md">
                    <CardContent className="pt-12 pb-12 text-center">
                      <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Select a mentee to view details</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions" className="space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Scheduled Sessions</CardTitle>
                  <Button className="bg-sky-500 hover:bg-sky-600 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Schedule Session
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mentees
                    .filter((m) => m.nextSession)
                    .map((mentee) => (
                      <div
                        key={mentee.id}
                        className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={mentee.avatar || "/placeholder.svg"} alt={mentee.name} />
                              <AvatarFallback className="bg-sky-600 text-white">{mentee.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{mentee.name}</p>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Calendar className="h-3 w-3" />
                                {mentee.nextSession}
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Materials Tab */}
          <TabsContent value="materials" className="space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Learning Materials</CardTitle>
                  <Button className="bg-sky-500 hover:bg-sky-600 text-white">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Material
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {materials.map((material) => (
                    <div
                      key={material.id}
                      className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900 rounded-lg flex items-center justify-center">
                            <FileText className="h-6 w-6 text-sky-600" />
                          </div>
                          <div>
                            <p className="font-medium">{material.title}</p>
                            <p className="text-sm text-gray-500">
                              {material.type} • {material.size} • Uploaded {material.uploadedDate}
                            </p>
                            <p className="text-sm text-sky-600 mt-1">Shared with {material.sharedWith} mentees</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Mentee Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mentees
                    .filter((m) => m.lastMessage)
                    .map((mentee) => (
                      <div
                        key={mentee.id}
                        className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={mentee.avatar || "/placeholder.svg"} alt={mentee.name} />
                              <AvatarFallback className="bg-sky-600 text-white">{mentee.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{mentee.name}</p>
                              <p className="text-xs text-gray-500">{mentee.role}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{mentee.lastMessage}</p>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
