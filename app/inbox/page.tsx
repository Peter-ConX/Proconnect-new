"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Search, Star, MessageSquare, Paperclip, Trash, Archive, Reply, Forward, Download, Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
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
import { toast } from "sonner"

// Mock data for messages
const initialMessages = [
  {
    id: "1",
    sender: {
      name: "Alex Morgan",
      avatar: "/placeholder.svg?height=40&width=40&text=AM",
      role: "Senior UX Designer",
      email: "alex.morgan@example.com"
    },
    recipients: ["you@example.com"],
    subject: "Feedback on your portfolio design",
    preview: "I took a look at your portfolio and wanted to share some thoughts on how you might improve the user experience...",
    content: `
      <p>Hi there,</p>
      <p>I took a look at your portfolio website and wanted to share some thoughts on how you might improve the user experience.</p>
      <p>First, I really like the overall aesthetic and the projects you've showcased. The visual hierarchy is clear and the navigation is intuitive. However, I noticed a few areas that could be enhanced:</p>
      <ol class="list-decimal pl-5 my-2 space-y-1">
        <li>The loading time for the project images could be optimized. Consider using lazy loading or optimizing the image sizes.</li>
        <li>The contact form could benefit from some inline validation to improve the user experience when filling it out.</li>
        <li>Consider adding more context to your case studies - perhaps a brief summary of the problem, solution, and outcome at the beginning of each.</li>
      </ol>
      <p>I'd be happy to discuss these points in more detail if you're interested. Just let me know!</p>
      <p>Best regards,<br>Alex</p>
    `,
    attachments: [
      { name: "portfolio_feedback.pdf", size: "1.2 MB", type: "pdf" }
    ],
    date: "10:30 AM",
    isRead: false,
    isStarred: true,
    folder: "inbox",
  },
  {
    id: "2",
    sender: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40&text=SC",
      role: "Frontend Architect",
      email: "sarah.chen@example.com"
    },
    recipients: ["you@example.com"],
    subject: "Collaboration opportunity on a new project",
    preview: "I'm working on an exciting new project and I think your skills would be a perfect fit. Would you be interested in...",
    content: `
      <p>Hello Okafor,</p>
      <p>I'm working on an exciting new professional networking platform called Proconnect, and I think your skills as a founder and full-stack builder would be a perfect fit.</p>
      <p>We're looking to integrate some premium design components and wire up key interactive components. I'd love to chat and see if you have bandwidth this week to collaborate.</p>
      <p>Let me know if you are free for a 15-minute sync!</p>
      <p>Warmly,<br>Sarah</p>
    `,
    attachments: [],
    date: "Yesterday",
    isRead: true,
    isStarred: false,
    folder: "inbox",
  },
  {
    id: "3",
    sender: {
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40&text=DK",
      role: "Product Manager",
      email: "david.kim@example.com"
    },
    recipients: ["you@example.com"],
    subject: "Introduction and potential mentorship",
    preview: "I came across your profile and was impressed by your work. I'm looking for a mentor in product management and...",
    content: `
      <p>Hi Okafor,</p>
      <p>I came across your profile on Proconnect and was deeply impressed by your work in bridging technology with community networking.</p>
      <p>I am seeking mentorship in product roadmap strategy and technical architecture. If you have some slot open, I would appreciate booking a 1-on-1 session with you.</p>
      <p>Best,<br>David</p>
    `,
    attachments: [],
    date: "Jun 5",
    isRead: true,
    isStarred: false,
    folder: "inbox",
  },
  {
    id: "4",
    sender: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40&text=EW",
      role: "UX Researcher",
      email: "emma.wilson@example.com"
    },
    recipients: ["you@example.com"],
    subject: "User research insights for your project",
    preview: "Based on our recent conversation, I've compiled some user research insights that might be helpful for your current project...",
    content: `
      <p>Hi Okafor,</p>
      <p>Based on our recent conversation, I've compiled some user research insights that might be helpful for your current project.</p>
      <p>Most users preferred a dark mode option and premium smooth transitions between route tabs. Keeping layout changes minimal while wiring page interactions was a key feedback point.</p>
      <p>Hope this helps!</p>
      <p>Regards,<br>Emma</p>
    `,
    attachments: [],
    date: "Jun 3",
    isRead: true,
    isStarred: true,
    folder: "inbox",
  },
  {
    id: "5",
    sender: {
      name: "Michael Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40&text=MR",
      role: "Backend Developer",
      email: "michael.rodriguez@example.com"
    },
    recipients: ["you@example.com"],
    subject: "API documentation and integration help",
    preview: "I noticed you were asking about our API in the forum. I've attached some documentation that should help with the integration...",
    content: `
      <p>Hi Okafor,</p>
      <p>I noticed you were asking about our API in the forum. I've attached some documentation that should help with the integration.</p>
      <p>Specifically, the stream fallbacks are coded under /api/petrix to intercept and typewriter-simulate OpenAI outputs. It runs perfectly.</p>
      <p>Let me know if you need more details.</p>
      <p>Best,<br>Michael</p>
    `,
    attachments: [],
    date: "May 28",
    isRead: true,
    isStarred: false,
    folder: "archive",
  },
]

export default function InboxPage() {
  const [activeTab, setActiveTab] = useState("inbox")
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>("1")
  const [replyContent, setReplyContent] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [messageList, setMessageList] = useState<any[]>([])
  const [isComposeOpen, setIsComposeOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("proconnect_messages")
    if (saved) {
      try {
        setMessageList(JSON.parse(saved))
      } catch {
        setMessageList(initialMessages)
      }
    } else {
      setMessageList(initialMessages)
      localStorage.setItem("proconnect_messages", JSON.stringify(initialMessages))
    }
  }, [])

  const saveMessages = (updatedList: any[]) => {
    setMessageList(updatedList)
    localStorage.setItem("proconnect_messages", JSON.stringify(updatedList))
  }

  // Filter messages based on active tab and search query
  const filteredMessages = messageList.filter((message) => {
    const matchesTab =
      (activeTab === "inbox" && message.folder === "inbox") ||
      (activeTab === "starred" && message.isStarred) ||
      (activeTab === "archive" && message.folder === "archive") ||
      (activeTab === "sent" && message.folder === "sent")

    const matchesSearch =
      searchQuery === "" ||
      message.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.preview.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesTab && matchesSearch
  })

  const selectedMessage = messageList.find((m) => m.id === selectedMessageId)

  // Handle setting a message as read when clicked
  const handleSelectMessage = (id: string) => {
    setSelectedMessageId(id)
    const updated = messageList.map((m) => {
      if (m.id === id) {
        return { ...m, isRead: true }
      }
      return m
    })
    saveMessages(updated)
  }

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyContent.trim() || !selectedMessageId) return

    const updated = messageList.map((m) => {
      if (m.id === selectedMessageId) {
        return {
          ...m,
          content: m.content + `
            <div class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              <p class="text-xs text-gray-500 font-semibold mb-1">Okafor Chidera • Just now:</p>
              <p class="text-sm text-gray-700 dark:text-gray-300">${replyContent.replace(/\n/g, '<br>')}</p>
            </div>
          `
        }
      }
      return m
    })

    saveMessages(updated)
    setReplyContent("")
    toast.success("Reply sent successfully!")
  }

  const handleToggleStar = (id: string) => {
    const updated = messageList.map((m) => {
      if (m.id === id) {
        return { ...m, isStarred: !m.isStarred }
      }
      return m
    })
    saveMessages(updated)
    const target = updated.find(m => m.id === id)
    toast.success(target?.isStarred ? "Starred message" : "Unstarred message")
  }

  const handleToggleArchive = (id: string) => {
    const updated = messageList.map((m) => {
      if (m.id === id) {
        return { ...m, folder: m.folder === "archive" ? "inbox" : "archive" }
      }
      return m
    })
    saveMessages(updated)
    const target = updated.find(m => m.id === id)
    toast.success(target?.folder === "archive" ? "Archived message" : "Moved message back to Inbox")
  }

  const handleDeleteMessage = (id: string) => {
    const updated = messageList.filter((m) => m.id !== id)
    saveMessages(updated)
    setSelectedMessageId(updated[0]?.id || null)
    toast.success("Message deleted permanently.")
  }

  const handleCompose = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const to = formData.get("to") as string
    const subject = formData.get("subject") as string
    const body = formData.get("body") as string

    const newMessage = {
      id: String(Date.now()),
      sender: {
        name: "Okafor Chidera",
        avatar: "/images/profile-picture.jpeg",
        role: "Founder, C.E.O of Proconnect",
        email: "you@example.com"
      },
      recipients: [to],
      subject: subject,
      preview: body.slice(0, 80) + "...",
      content: `<p>${body.replace(/\n/g, '<br>')}</p>`,
      date: "Just now",
      isRead: true,
      isStarred: false,
      folder: "sent",
    }

    const updated = [newMessage, ...messageList]
    saveMessages(updated)
    setIsComposeOpen(false)
    toast.success(`Message sent successfully to ${to}!`)
  }

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Inbox</h1>
            <p className="text-gray-500 mt-1">Manage your professional communications</p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
              <DialogTrigger asChild>
                <Button className="bg-sky-500 hover:bg-sky-600 text-white">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Compose
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Compose Message</DialogTitle>
                  <DialogDescription>
                    Send a professional message to connect and collaborate.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleCompose} className="space-y-4 mt-2">
                  <div className="space-y-2">
                    <Label htmlFor="to">To (Name or Email)</Label>
                    <Input id="to" name="to" placeholder="e.g. Alex Morgan or alex@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" name="subject" placeholder="Enter message subject" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="body">Message Body</Label>
                    <Textarea id="body" name="body" placeholder="Write your insights, invitations, or inquiries here..." rows={6} required />
                  </div>

                  <DialogFooter className="mt-4">
                    <DialogClose asChild>
                      <Button variant="outline" type="button">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" className="bg-sky-500 hover:bg-sky-600 text-white">
                      Send Message
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search messages..."
                    className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="inbox" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="inbox">Inbox</TabsTrigger>
                    <TabsTrigger value="starred">Starred</TabsTrigger>
                    <TabsTrigger value="archive">Archive</TabsTrigger>
                    <TabsTrigger value="sent">Sent</TabsTrigger>
                  </TabsList>

                  {["inbox", "starred", "archive", "sent"].map((tab) => (
                    <TabsContent key={tab} value={tab} className="mt-0">
                      {filteredMessages.length === 0 ? (
                        <p className="text-gray-500 p-4 text-center text-sm">No messages in this folder.</p>
                      ) : (
                        <div className="divide-y max-h-[60vh] overflow-y-auto">
                          {filteredMessages.map((message) => (
                            <div
                              key={message.id}
                              className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                                selectedMessageId === message.id ? "bg-gray-50 dark:bg-gray-800" : ""
                              } ${!message.isRead ? "bg-sky-50 dark:bg-sky-900/20" : ""}`}
                              onClick={() => handleSelectMessage(message.id)}
                            >
                              <div className="flex items-start gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage
                                    src={message.sender.avatar || "/placeholder.svg"}
                                    alt={message.sender.name}
                                  />
                                  <AvatarFallback className="bg-sky-700 text-white">
                                    {message.sender.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <div className="flex justify-between items-start">
                                    <p className={`font-medium truncate ${!message.isRead ? "font-semibold text-sky-600" : ""}`}>
                                      {message.sender.name}
                                    </p>
                                    <div className="flex items-center gap-1">
                                      {message.isStarred && (
                                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                      )}
                                      <span className="text-[10px] text-gray-500">{message.date}</span>
                                    </div>
                                  </div>
                                  <p className={`text-sm truncate ${!message.isRead ? "font-semibold" : ""}`}>
                                    {message.subject}
                                  </p>
                                  <p className="text-xs text-gray-500 truncate">{message.preview}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Message Content */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    <h2 className="text-xl font-bold">{selectedMessage.subject}</h2>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleToggleArchive(selectedMessage.id)}>
                        <Archive className={`h-4 w-4 ${selectedMessage.folder === "archive" ? "text-sky-500 fill-sky-500" : ""}`} />
                        <span className="sr-only">Archive</span>
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDeleteMessage(selectedMessage.id)}>
                        <Trash className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Delete</span>
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleToggleStar(selectedMessage.id)}>
                        <Star className={`h-4 w-4 ${selectedMessage.isStarred ? "text-yellow-500 fill-yellow-500" : ""}`} />
                        <span className="sr-only">Star</span>
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 mt-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={selectedMessage.sender.avatar || "/placeholder.svg"}
                        alt={selectedMessage.sender.name}
                      />
                      <AvatarFallback className="bg-sky-700 text-white">
                        {selectedMessage.sender.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{selectedMessage.sender.name}</p>
                          <p className="text-xs text-gray-500">
                            {selectedMessage.sender.email} • {selectedMessage.sender.role}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500">{selectedMessage.date}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">To: {selectedMessage.recipients.join(", ")}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div
                    className="prose dark:prose-invert max-w-none mt-4 text-gray-700 dark:text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: selectedMessage.content }}
                  />

                  {selectedMessage.attachments && selectedMessage.attachments.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-2">Attachments</h3>
                      <div className="space-y-2">
                        {selectedMessage.attachments.map((attachment: any, index: number) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-2 border rounded-md bg-gray-50 dark:bg-gray-800"
                          >
                            <div className="p-2 bg-white dark:bg-gray-700 rounded">
                              <Paperclip className="h-4 w-4 text-gray-500" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{attachment.name}</p>
                              <p className="text-xs text-gray-500">{attachment.size}</p>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Separator className="my-6" />

                  {/* Reply form */}
                  <form onSubmit={handleSendReply}>
                    <div className="border border-gray-150 dark:border-gray-800 rounded-md p-4 bg-gray-50/50 dark:bg-gray-900/10">
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/images/profile-picture.jpeg" alt="You" />
                          <AvatarFallback className="bg-sky-700 text-white">YO</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">You</p>
                          <Badge variant="outline" className="text-xs text-sky-600 bg-sky-50 dark:bg-sky-950">
                            Replying to {selectedMessage.sender.name}
                          </Badge>
                        </div>
                      </div>
                      <Textarea
                        placeholder="Write your response..."
                        className="min-h-[120px] mb-4 bg-white dark:bg-gray-800"
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                      />
                      <div className="flex justify-between items-center">
                        <Button variant="outline" size="sm" type="button" onClick={() => toast.info("Attachments are simulated.")}>
                          <Paperclip className="mr-2 h-4 w-4" />
                          Attach File
                        </Button>
                        <Button
                          type="submit"
                          className="bg-sky-500 hover:bg-sky-600 text-white gap-2"
                          disabled={!replyContent.trim()}
                        >
                          <Send className="h-4 w-4" />
                          Send Reply
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-800 rounded-lg p-8 min-h-[50vh]">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No message selected</h3>
                  <p className="text-gray-500 mt-2">Select a message from the list to view its contents.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
