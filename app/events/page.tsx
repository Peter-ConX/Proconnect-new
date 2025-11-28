"use client"

import { useState } from "react"
import { Calendar, MapPin, Users, Clock, Video, Plus, Filter, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

// Mock events data
const events = [
  {
    id: "1",
    title: "Future of Web Development",
    description: "Explore the latest trends and technologies shaping the future of web development",
    type: "Webinar",
    date: "2023-07-15",
    time: "14:00",
    duration: "2 hours",
    location: "Virtual",
    attendees: 247,
    maxAttendees: 500,
    price: "Free",
    host: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40&text=SC",
      role: "Senior Frontend Developer",
    },
    tags: ["Web Development", "React", "Next.js", "Technology Trends"],
    status: "upcoming",
  },
  {
    id: "2",
    title: "Design Systems Workshop",
    description: "Hands-on workshop on building scalable design systems for modern applications",
    type: "Workshop",
    date: "2023-07-20",
    time: "10:00",
    duration: "4 hours",
    location: "San Francisco, CA",
    attendees: 45,
    maxAttendees: 50,
    price: "$99",
    host: {
      name: "Alex Morgan",
      avatar: "/placeholder.svg?height=40&width=40&text=AM",
      role: "Lead UX Designer",
    },
    tags: ["Design Systems", "UI/UX", "Figma", "Workshop"],
    status: "upcoming",
  },
  {
    id: "3",
    title: "AI in Product Development",
    description: "Panel discussion on how AI is transforming product development processes",
    type: "Panel",
    date: "2023-07-25",
    time: "16:00",
    duration: "1.5 hours",
    location: "Virtual",
    attendees: 189,
    maxAttendees: 300,
    price: "Free",
    host: {
      name: "Dr. Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40&text=EW",
      role: "AI Research Lead",
    },
    tags: ["Artificial Intelligence", "Product Management", "Innovation"],
    status: "upcoming",
  },
  {
    id: "4",
    title: "Startup Pitch Competition",
    description: "Watch emerging startups pitch their innovative ideas to industry experts",
    type: "Competition",
    date: "2023-06-30",
    time: "18:00",
    duration: "3 hours",
    location: "New York, NY",
    attendees: 156,
    maxAttendees: 200,
    price: "$25",
    host: {
      name: "Michael Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40&text=MR",
      role: "Venture Capitalist",
    },
    tags: ["Startups", "Entrepreneurship", "Pitching", "Investment"],
    status: "completed",
  },
]

const myEvents = [
  {
    id: "1",
    title: "Future of Web Development",
    date: "2023-07-15",
    time: "14:00",
    status: "registered",
    type: "Webinar",
  },
  {
    id: "2",
    title: "Design Systems Workshop",
    date: "2023-07-20",
    time: "10:00",
    status: "registered",
    type: "Workshop",
  },
  {
    id: "4",
    title: "Startup Pitch Competition",
    date: "2023-06-30",
    time: "18:00",
    status: "attended",
    type: "Competition",
  },
]

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("discover")
  const [searchQuery, setSearchQuery] = useState("")

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "Webinar":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Workshop":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Panel":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Competition":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Professional Events</h1>
            <p className="text-gray-500 mt-1">
              Discover and attend industry events, workshops, and networking sessions
            </p>
          </div>
          <Button className="mt-4 md:mt-0 bg-sky-500 hover:bg-sky-600 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Button>
        </div>

        <Tabs defaultValue="discover" className="space-y-6" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="my-events">My Events</TabsTrigger>
            <TabsTrigger value="hosting">Hosting</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search events by title, topic, or speaker..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {events.map((event) => (
                <Card key={event.id} className="border-none shadow-md">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <CardDescription className="mt-1">{event.description}</CardDescription>
                      </div>
                      <Badge className={getEventTypeColor(event.type)}>{event.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {event.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="border-sky-500 text-sky-600">
                          {tag}
                        </Badge>
                      ))}
                      {event.tags.length > 3 && (
                        <Badge variant="outline" className="border-gray-300">
                          +{event.tags.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>
                          {event.time} ({event.duration})
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {event.location === "Virtual" ? (
                          <Video className="h-4 w-4 text-gray-500" />
                        ) : (
                          <MapPin className="h-4 w-4 text-gray-500" />
                        )}
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>
                          {event.attendees}/{event.maxAttendees} attending
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={event.host.avatar || "/placeholder.svg"} alt={event.host.name} />
                        <AvatarFallback className="bg-sky-700 text-white">{event.host.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{event.host.name}</p>
                        <p className="text-xs text-gray-500">{event.host.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-sky-600">{event.price}</div>
                      <div className="flex gap-2">
                        {event.status === "upcoming" && (
                          <Button className="bg-sky-500 hover:bg-sky-600 text-white">Register</Button>
                        )}
                        {event.status === "completed" && <Button variant="outline">View Recording</Button>}
                        <Button variant="outline">Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-events" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myEvents.map((event) => (
                <Card key={event.id} className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <div className="flex gap-2">
                      <Badge className={getEventTypeColor(event.type)}>{event.type}</Badge>
                      <Badge
                        className={
                          event.status === "registered" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                        }
                      >
                        {event.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{event.time}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {event.status === "registered" && (
                        <>
                          <Button className="flex-1 bg-sky-500 hover:bg-sky-600 text-white">Join Event</Button>
                          <Button variant="outline">Cancel</Button>
                        </>
                      )}
                      {event.status === "attended" && (
                        <>
                          <Button variant="outline" className="flex-1">
                            View Recording
                          </Button>
                          <Button variant="outline">Certificate</Button>
                        </>
                      )}
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
