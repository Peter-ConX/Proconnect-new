"use client"

import { Bookmark, ExternalLink, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const bookmarks = [
  {
    id: 1,
    title: "10 Tips for Better Code Reviews",
    author: "Sarah Johnson",
    avatar: "/placeholder.svg?height=32&width=32",
    type: "Article",
    savedAt: "2 days ago",
    url: "#",
  },
  {
    id: 2,
    title: "React Performance Optimization Guide",
    author: "Mike Chen",
    avatar: "/placeholder.svg?height=32&width=32",
    type: "Tutorial",
    savedAt: "1 week ago",
    url: "#",
  },
  {
    id: 3,
    title: "Building Scalable APIs with Node.js",
    author: "Alex Rivera",
    avatar: "/placeholder.svg?height=32&width=32",
    type: "Course",
    savedAt: "2 weeks ago",
    url: "#",
  },
]

export default function BookmarksPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Bookmark className="h-6 w-6 mr-2" />
          Bookmarks
        </h1>
        <Button variant="outline" size="sm">
          Clear all
        </Button>
      </div>

      <div className="space-y-4">
        {bookmarks.map((bookmark) => (
          <Card key={bookmark.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{bookmark.title}</CardTitle>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={bookmark.avatar || "/placeholder.svg"} alt={bookmark.author} />
                      <AvatarFallback>{bookmark.author[0]}</AvatarFallback>
                    </Avatar>
                    <span>{bookmark.author}</span>
                    <span>•</span>
                    <span className="bg-sky-100 text-sky-800 px-2 py-1 rounded-full text-xs">{bookmark.type}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-500">Saved {bookmark.savedAt}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
