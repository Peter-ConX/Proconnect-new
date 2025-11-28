"use client"

import type React from "react"

import { useState } from "react"
import { Search, Star, MessageSquare, Paperclip, Trash, Archive, Reply, Forward, Download } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

// Mock data for messages
const messages = [
  {
    id: "1",
    sender: {
      name: "Alex Morgan",
      avatar: "/placeholder.svg?height=40&width=40&text=AM",
      role: "Senior UX Designer",
    },
    subject: "Feedback on your portfolio design",
    preview:
      "I took a look at your portfolio and wanted to share some thoughts on how you might improve the user experience...",
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
    },
    subject: "Collaboration opportunity on a new project",
    preview:
      "I'm working on an exciting new project and I think your skills would be a perfect fit. Would you be interested in...",
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
    },
    subject: "Introduction and potential mentorship",
    preview:
      "I came across your profile and was impressed by your work. I'm looking for a mentor in product management and...",
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
    },
    subject: "User research insights for your project",
    preview:
      "Based on our recent conversation, I've compiled some user research insights that might be helpful for your current project...",
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
    },
    subject: "API documentation and integration help",
    preview:
      "I noticed you were asking about our API in the forum. I've attached some documentation that should help with the integration...",
    date: "May 28",
    isRead: true,
    isStarred: false,
    folder: "archive",
  },
]

// Mock data for selected message content
const selectedMessageContent = {
  id: "1",
  sender: {
    name: "Alex Morgan",
    avatar: "/placeholder.svg?height=40&width=40&text=AM",
    role: "Senior UX Designer",
    email: "alex.morgan@example.com",
  },
  recipients: ["you@example.com"],
  subject: "Feedback on your portfolio design",
  date: "Today at 10:30 AM",
  content: `
    <p>Hi there,</p>
    <p>I took a look at your portfolio website and wanted to share some thoughts on how you might improve the user experience.</p>
    <p>First, I really like the overall aesthetic and the projects you've showcased. The visual hierarchy is clear and the navigation is intuitive. However, I noticed a few areas that could be enhanced:</p>
    <ol>
      <li>The loading time for the project images could be optimized. Consider using lazy loading or optimizing the image sizes.</li>
      <li>The contact form could benefit from some inline validation to improve the user experience when filling it out.</li>
      <li>Consider adding more context to your case studies - perhaps a brief summary of the problem, solution, and outcome at the beginning of each.</li>
    </ol>
    <p>I'd be happy to discuss these points in more detail if you're interested. Just let me know!</p>
    <p>Best regards,<br>Alex</p>
  `,
  attachments: [
    {
      name: "portfolio_feedback.pdf",
      size: "1.2 MB",
      type: "pdf",
    },
  ],
}

export default function InboxPage() {
  const [activeTab, setActiveTab] = useState("inbox")
  const [selectedMessage, setSelectedMessage] = useState<string | null>("1")
  const [replyContent, setReplyContent] = useState("")

  // Filter messages based on active tab
  const filteredMessages = messages.filter((message) => {
    if (activeTab === "inbox") return message.folder === "inbox"
    if (activeTab === "starred") return message.isStarred
    if (activeTab === "archive") return message.folder === "archive"
    return true
  })

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the reply to the server
    console.log("Sending reply:", replyContent)
    setReplyContent("")
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
            <Button className="bg-sky-500 hover:bg-sky-600 text-white">
              <MessageSquare className="mr-2 h-4 w-4" />
              Compose
            </Button>
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
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="inbox" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="inbox">Inbox</TabsTrigger>
                    <TabsTrigger value="starred">Starred</TabsTrigger>
                    <TabsTrigger value="archive">Archive</TabsTrigger>
                  </TabsList>

                  <TabsContent value="inbox" className="mt-0">
                    <div className="divide-y">
                      {filteredMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                            selectedMessage === message.id ? "bg-gray-50 dark:bg-gray-800" : ""
                          } ${!message.isRead ? "bg-sky-50 dark:bg-sky-900/20" : ""}`}
                          onClick={() => setSelectedMessage(message.id)}
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
                                <p className={`font-medium truncate ${!message.isRead ? "font-semibold" : ""}`}>
                                  {message.sender.name}
                                </p>
                                <div className="flex items-center">
                                  {message.isStarred && (
                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                                  )}
                                  <span className="text-xs text-gray-500">{message.date}</span>
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
                  </TabsContent>

                  <TabsContent value="starred" className="mt-0">
                    <div className="divide-y">
                      {filteredMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                            selectedMessage === message.id ? "bg-gray-50 dark:bg-gray-800" : ""
                          }`}
                          onClick={() => setSelectedMessage(message.id)}
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
                                <p className="font-medium truncate">{message.sender.name}</p>
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                                  <span className="text-xs text-gray-500">{message.date}</span>
                                </div>
                              </div>
                              <p className="text-sm truncate">{message.subject}</p>
                              <p className="text-xs text-gray-500 truncate">{message.preview}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="archive" className="mt-0">
                    <div className="divide-y">
                      {filteredMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                            selectedMessage === message.id ? "bg-gray-50 dark:bg-gray-800" : ""
                          }`}
                          onClick={() => setSelectedMessage(message.id)}
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
                                <p className="font-medium truncate">{message.sender.name}</p>
                                <span className="text-xs text-gray-500">{message.date}</span>
                              </div>
                              <p className="text-sm truncate">{message.subject}</p>
                              <p className="text-xs text-gray-500 truncate">{message.preview}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Message Content */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">{selectedMessageContent.subject}</h2>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Archive className="h-4 w-4" />
                        <span className="sr-only">Archive</span>
                      </Button>
                      <Button variant="outline" size="icon">
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                      <Button variant="outline" size="icon">
                        <Star className="h-4 w-4" />
                        <span className="sr-only">Star</span>
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 mt-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={selectedMessageContent.sender.avatar || "/placeholder.svg"}
                        alt={selectedMessageContent.sender.name}
                      />
                      <AvatarFallback className="bg-sky-700 text-white">
                        {selectedMessageContent.sender.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{selectedMessageContent.sender.name}</p>
                          <p className="text-xs text-gray-500">
                            {selectedMessageContent.sender.email} • {selectedMessageContent.sender.role}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500">{selectedMessageContent.date}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">To: {selectedMessageContent.recipients.join(", ")}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div
                    className="prose dark:prose-invert max-w-none mt-4"
                    dangerouslySetInnerHTML={{ __html: selectedMessageContent.content }}
                  />

                  {selectedMessageContent.attachments && selectedMessageContent.attachments.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-2">Attachments</h3>
                      <div className="space-y-2">
                        {selectedMessageContent.attachments.map((attachment, index) => (
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

                  <div className="flex gap-2 mb-4">
                    <Button className="bg-sky-500 hover:bg-sky-600 text-white">
                      <Reply className="mr-2 h-4 w-4" />
                      Reply
                    </Button>
                    <Button variant="outline">
                      <Forward className="mr-2 h-4 w-4" />
                      Forward
                    </Button>
                  </div>

                  <form onSubmit={handleSendReply}>
                    <div className="border rounded-md p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/images/profile-picture.jpeg" alt="You" />
                          <AvatarFallback className="bg-sky-700 text-white">YO</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">You</p>
                          <Badge variant="outline" className="text-xs">
                            Replying to {selectedMessageContent.sender.name}
                          </Badge>
                        </div>
                      </div>
                      <Textarea
                        placeholder="Write your reply..."
                        className="min-h-[120px] mb-4"
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                      />
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm">
                          <Paperclip className="mr-2 h-4 w-4" />
                          Attach
                        </Button>
                        <Button
                          type="submit"
                          className="bg-sky-500 hover:bg-sky-600 text-white"
                          disabled={!replyContent.trim()}
                        >
                          Send
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No message selected</h3>
                  <p className="text-gray-500 mt-2">Select a message from the inbox to view its contents.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
