"use client"

import { Heart, MessageCircle, UserPlus, Briefcase } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const notifications = [
  {
    id: 1,
    type: "like",
    user: "Sarah Johnson",
    action: "liked your post",
    time: "2m",
    avatar: "/placeholder.svg?height=40&width=40",
    icon: Heart,
    color: "text-red-500",
  },
  {
    id: 2,
    type: "comment",
    user: "Mike Chen",
    action: "commented on your project",
    time: "5m",
    avatar: "/placeholder.svg?height=40&width=40",
    icon: MessageCircle,
    color: "text-blue-500",
  },
  {
    id: 3,
    type: "follow",
    user: "Alex Rivera",
    action: "started following you",
    time: "1h",
    avatar: "/placeholder.svg?height=40&width=40",
    icon: UserPlus,
    color: "text-green-500",
  },
  {
    id: 4,
    type: "job",
    user: "TechCorp",
    action: "posted a new job that matches your skills",
    time: "2h",
    avatar: "/placeholder.svg?height=40&width=40",
    icon: Briefcase,
    color: "text-purple-500",
  },
]

export default function NotificationsPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <Button variant="outline" size="sm">
          Mark all as read
        </Button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => {
          const IconComponent = notification.icon
          return (
            <Card key={notification.id} className="hover:bg-gray-50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={notification.avatar || "/placeholder.svg"} alt={notification.user} />
                      <AvatarFallback>{notification.user[0]}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                      <IconComponent className={`h-4 w-4 ${notification.color}`} />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{notification.user}</span> {notification.action}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
