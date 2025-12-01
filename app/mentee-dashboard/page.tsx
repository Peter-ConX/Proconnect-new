"use client"

import { useState } from "react"
import { MessageSquare, Download, Calendar, Send } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

// Mock mentee data
const menteeData = {
  id: "mentee-1",
  name: "Sarah Johnson",
  mentorId: "mentor-1",
  mentorName: "John Doe",
  mentorAvatar: "/placeholder.svg?height=60&width=60&text=JD",
  mentorRole: "Senior Software Engineer",
  focusAreas: ["React", "JavaScript", "Web Development"],
  joinedDate: "2024-01-15",
  progress: 45,
}

// Mock materials
const materials = [
  {
    id: "mat-1",
    title: "React Best Practices Guide",
    type: "pdf",
    size: "2.5 MB",
    sharedDate: "2024-11-20",
    url: "#",
  },
  {
    id: "mat-2",
    title: "Advanced Hooks Tutorial",
    type: "video",
    size: "156 MB",
    sharedDate: "2024-11-15",
    url: "#",
  },
  {
    id: "mat-3",
    title: "Project Architecture Docs",
    type: "document",
    size: "1.2 MB",
    sharedDate: "2024-11-10",
    url: "#",
  },
]

// Mock sessions
const sessions = [
  {
    id: "session-1",
    date: "2024-12-10",
    time: "2:00 PM EST",
    topic: "React Hooks Deep Dive",
    status: "upcoming",
  },
  {
    id: "session-2",
    date: "2024-12-03",
    time: "3:00 PM EST",
    topic: "Career Development Discussion",
    status: "completed",
  },
]

// Mock messages
const messages = [
  {
    id: "msg-1",
    sender: "mentor",
    content: "Great work on the assignment! Your React component structure is excellent.",
    timestamp: "2 hours ago",
  },
  {
    id: "msg-2",
    sender: "mentee",
    content: "Thank you! I studied the best practices document you shared.",
    timestamp: "1 hour ago",
  },
  {
    id: "msg-3",
    sender: "mentor",
    content: "Next, let's focus on optimization and performance. I'll prepare some resources.",
    timestamp: "30 min ago",
  },
]

export default function MenteeDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [messageInput, setMessageInput] = useState("")

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-orange-600 bg-clip-text text-transparent mb-6">
            My Learning Journey
          </h1>

          {/* Mentor Card */}
          <Card className="border-none shadow-md bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={menteeData.mentorAvatar || "/placeholder.svg"} alt={menteeData.mentorName} />
                    <AvatarFallback className="bg-sky-600 text-white text-lg">
                      {menteeData.mentorName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-lg font-semibold">Your Mentor</h2>
                    <p className="text-sky-700 dark:text-sky-400 font-medium">{menteeData.mentorName}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{menteeData.mentorRole}</p>
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-sky-500 to-orange-500 hover:from-sky-600 hover:to-orange-600 text-white">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Enter Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">{menteeData.progress}%</div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-sky-500 to-orange-500 h-full transition-all"
                      style={{ width: `${menteeData.progress}%` }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Sessions Completed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">5</div>
                  <p className="text-xs text-gray-500 mt-1">of 12 planned</p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Joined</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">11m</div>
                  <p className="text-xs text-gray-500 mt-1">ago</p>
                </CardContent>
              </Card>
            </div>

            {/* Focus Areas */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Your Focus Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {menteeData.focusAreas.map((area) => (
                    <Badge key={area} variant="outline" className="border-sky-500 text-sky-600 py-1 px-3">
                      {area}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Materials Tab */}
          <TabsContent value="materials" className="space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Learning Materials</CardTitle>
                <CardDescription>Resources shared by your mentor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {materials.map((material) => (
                  <div
                    key={material.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium">{material.title}</p>
                        <p className="text-sm text-gray-500">
                          {material.type.toUpperCase()} • {material.size} • {material.sharedDate}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions" className="space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Your Sessions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Calendar className="h-5 w-5 text-sky-500" />
                        <div>
                          <p className="font-medium">{session.topic}</p>
                          <p className="text-sm text-gray-500">
                            {session.date} at {session.time}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          session.status === "upcoming"
                            ? "bg-blue-100 text-blue-800 border-blue-200"
                            : "bg-green-100 text-green-800 border-green-200"
                        }
                      >
                        {session.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Chat Tab */}
          <TabsContent value="chat" className="space-y-6">
            <Card className="border-none shadow-md flex flex-col h-[600px]">
              <CardHeader className="border-b">
                <CardTitle>Chat with {menteeData.mentorName}</CardTitle>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "mentor" ? "justify-start" : "justify-end"}`}>
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.sender === "mentor" ? "bg-gray-100 dark:bg-gray-800" : "bg-sky-500 text-white"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className={`text-xs mt-1 ${msg.sender === "mentor" ? "text-gray-500" : "text-sky-100"}`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                  />
                  <Button className="bg-sky-500 hover:bg-sky-600 text-white">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
