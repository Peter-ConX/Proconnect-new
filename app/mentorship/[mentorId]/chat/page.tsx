"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Send, FileText, Download, Upload, ShieldAlert, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VerifiedBadge } from "@/components/verified-badge"
import { toast } from "sonner"

// Mock mentors metadata matching the list on the main mentorship page
const mentorsData = [
  {
    id: "1",
    name: "John Doe",
    expertise: "Software Engineering",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: "2",
    name: "Jane Smith",
    expertise: "Data Science",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: "3",
    name: "David Lee",
    expertise: "Product Management",
    avatar: "https://images.unsplash.com/photo-1534528741702-a0cfae58c151?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
  },
]

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
  const [isAccepted, setIsAccepted] = useState<boolean | null>(null)
  const [mentor, setMentor] = useState<any>(null)

  const mentorId = params?.mentorId as string

  useEffect(() => {
    // Identify mentor
    const currentMentor = mentorsData.find((m) => m.id === mentorId) || mentorsData[0]
    setMentor(currentMentor)

    // Check localStorage mentorship registrations
    const saved = localStorage.getItem("proconnect_mentorships")
    if (saved) {
      try {
        const list = JSON.parse(saved)
        // Check if there is an active session for the current mentor
        const activeSession = list.find((m: any) => m.id === mentorId && m.status === "Active")
        setIsAccepted(!!activeSession)
      } catch {
        setIsAccepted(false)
      }
    } else {
      setIsAccepted(false)
    }
  }, [mentorId])

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

  if (isAccepted === null) {
    return <div className="pt-24 text-center text-gray-500">Checking authorization...</div>
  }

  // Access Denied view
  if (isAccepted === false) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-gray-50 dark:bg-gray-900/50 flex items-center justify-center">
        <Card className="max-w-md w-full border-none shadow-xl bg-white dark:bg-gray-800 p-8 text-center">
          <div className="bg-red-50 dark:bg-red-950/20 text-red-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="h-8 w-8 animate-pulse" />
          </div>
          <CardTitle className="text-2xl font-bold mb-3">Access Denied</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Only students who have registered and been accepted by the mentor can access this private workspace chat.
          </CardDescription>
          <div className="space-y-3">
            <Button
              onClick={() => router.push(`/mentorship/${mentorId || "1"}`)}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold flex items-center justify-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Request Mentorship & View Rules
            </Button>
            <Button variant="ghost" onClick={() => router.push("/mentorship")} className="w-full text-gray-500">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Mentors Directory
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="pt-20 pb-16 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push(`/mentorship/${mentorId}`)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border border-gray-100 dark:border-gray-800">
              <AvatarImage src={mentor?.avatar} alt={mentor?.name} />
              <AvatarFallback>{mentor?.name?.substring(0, 2) || "ME"}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-1.5">
                {mentor?.name}
                <VerifiedBadge className="h-4.5 w-4.5 bg-transparent text-[#0095f6]" />
              </h1>
              <p className="text-sm text-muted-foreground">{mentor?.expertise}</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="chat" className="space-y-4">
          <TabsList>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="materials">Materials & Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-4">
            <Card className="h-[600px] flex flex-col border-none shadow-md">
              <CardHeader className="border-b">
                <CardTitle>Chat Workspace</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.sender === "mentor" && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={mentor?.avatar} alt={mentor?.name} />
                          <AvatarFallback>{mentor?.name?.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          msg.sender === "user"
                            ? "bg-sky-500 text-white"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p className="text-xs opacity-70 mt-1">{formatTime(msg.timestamp)}</p>
                      </div>
                      {msg.sender === "user" && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-sky-700 text-white">YO</AvatarFallback>
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
                    <Button type="submit" size="icon" className="bg-sky-500 hover:bg-sky-600 text-white">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="materials" className="space-y-4">
            <Card className="border-none shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Materials & Resources</CardTitle>
                  <Button size="sm" variant="outline" className="border-sky-200 text-sky-600 hover:bg-sky-50" onClick={() => toast.info("Material upload simulated.")}>
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
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted transition-colors border-gray-100 dark:border-gray-800"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-sky-500" />
                        <div>
                          <p className="font-medium">{material.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {material.size} • Uploaded {material.uploadedAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{material.type.toUpperCase()}</Badge>
                        <Button size="sm" variant="ghost" onClick={() => toast.success(`Simulating download: ${material.name}`)}>
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
