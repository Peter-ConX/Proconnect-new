"use client"

import { useState } from "react"
import { Users, TrendingUp, MessageSquare, Hash } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const communities = [
  {
    id: "tech",
    name: "Tech & Engineering",
    description: "Discuss the latest in software development, engineering, and technology",
    members: 12450,
    posts: 3420,
    trending: true,
    tags: ["React", "Python", "AI", "Cloud"],
  },
  {
    id: "design",
    name: "Design & UX",
    description: "Share design inspiration, UX best practices, and creative projects",
    members: 8920,
    posts: 2150,
    trending: true,
    tags: ["Figma", "UI/UX", "Design Systems"],
  },
  {
    id: "startups",
    name: "Startups & Entrepreneurship",
    description: "Connect with founders, share startup stories, and get advice",
    members: 5670,
    posts: 1890,
    trending: false,
    tags: ["Funding", "Growth", "Product"],
  },
  {
    id: "product",
    name: "Product Management",
    description: "Product strategy, roadmapping, and PM best practices",
    members: 7430,
    posts: 1650,
    trending: false,
    tags: ["Strategy", "Roadmap", "Analytics"],
  },
]

export default function CommunitiesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [joinedCommunities, setJoinedCommunities] = useState<Set<string>>(new Set(["tech"]))

  const filteredCommunities = communities.filter((community) =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleJoin = (communityId: string) => {
    const newJoined = new Set(joinedCommunities)
    if (newJoined.has(communityId)) {
      newJoined.delete(communityId)
    } else {
      newJoined.add(communityId)
    }
    setJoinedCommunities(newJoined)
  }

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Communities</h1>
          <p className="text-muted-foreground">Join niche communities and connect with like-minded professionals</p>
        </div>

        <div className="mb-6">
          <Input
            placeholder="Search communities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommunities.map((community) => (
            <Card key={community.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      <Hash className="h-5 w-5 text-teal-500" />
                      {community.name}
                    </CardTitle>
                    {community.trending && (
                      <Badge className="mt-2 bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>
                </div>
                <CardDescription>{community.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {community.members.toLocaleString()} members
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    {community.posts} posts
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {community.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button
                  onClick={() => toggleJoin(community.id)}
                  className="w-full"
                  variant={joinedCommunities.has(community.id) ? "outline" : "default"}
                >
                  {joinedCommunities.has(community.id) ? "Leave Community" : "Join Community"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
