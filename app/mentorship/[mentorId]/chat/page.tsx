"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Send, FileText, Download, Upload } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data - in production, this would come from Supabase
const mockMentor = {
  id: "1",
  name: "John Doe",
  expertise: "Software Engineering",
  avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
}

const mockMaterials = [
  {
    id: "1",
    name: "Introduction to React.pdf",
    type: "pdf",
    size: "2.4 MB",
    uploadedAt: "2024-01-15",
    url: "#",
  },
  {
    id: "2",
    name: "Best Practices Guide.docx",
    type: "doc",
    size: "1.8 MB",
    uploadedAt: "2024-01-10",
    url: "#",
  },
  {
    id: "3",
    name: "Code Examples.zip",
    type: "zip",
    size: "5.2 MB",
    uploadedAt: "2024-01-05",
    url: "#",
  },
]

const mockMessages = [
  {
    id: "1",
    sender: "mentor",
    content: "Welcome! I'm excited to work with you. Feel free to ask any questions.",
    timestamp: "2024-01-20T10:00:00",
  },
  {
    id: "2",
    sender: "user",
    content: "Thank you! I'm looking forward to learning from you.",
    timestamp: "2024-01-20T10:05:00",
  },
]

export default function MentorChatPage() {
  const params = useParams()
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState(mockMessages)
  const [materials, setMaterials] = useState(mockMaterials)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const newMessage = {
      id: Date.now().toString(),
      sender: "user",
      content: message,
      timestamp: new Date().toISOString(),
    }

    setMessages([...messages, newMessage])
    setMessage("")

    // Simulate mentor response
    setTimeout(() => {
      const mentorResponse = {
        id: (Date.now() + 1).toString(),
        sender: "mentor",
        content: "Thanks for your message! I'll get back to you soon.",
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, mentorResponse])
    }, 2000)
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="pt-20 pb-16 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={mockMentor.avatar} alt={mockMentor.name} />
              <AvatarFallback>{mockMentor.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{mockMentor.name}</h1>
              <p className="text-sm text-muted-foreground">{mockMentor.expertise}</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="chat" className="space-y-4">
          <TabsList>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="materials">Materials & Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-4">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <CardTitle>Chat with {mockMentor.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.sender === "mentor" && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={mockMentor.avatar} alt={mockMentor.name} />
                          <AvatarFallback>{mockMentor.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          msg.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p className="text-xs opacity-70 mt-1">{formatTime(msg.timestamp)}</p>
                      </div>
                      {msg.sender === "user" && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                    <Button type="submit" size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="materials" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Materials & Resources</CardTitle>
                  <Button size="sm" variant="outline">
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
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-medium">{material.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {material.size} • Uploaded {material.uploadedAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{material.type.toUpperCase()}</Badge>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
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

