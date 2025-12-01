"use client"

import { Trophy, Medal, Award, TrendingUp, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const leaderboardData = {
  overall: [
    { rank: 1, name: "Alex Morgan", points: 15420, badge: "Champion", avatar: "/placeholder.svg?height=40&width=40&text=AM" },
    { rank: 2, name: "Sarah Chen", points: 14230, badge: "Elite", avatar: "/placeholder.svg?height=40&width=40&text=SC" },
    { rank: 3, name: "David Kim", points: 13850, badge: "Elite", avatar: "/placeholder.svg?height=40&width=40&text=DK" },
    { rank: 4, name: "Emma Wilson", points: 12560, badge: "Expert", avatar: "/placeholder.svg?height=40&width=40&text=EW" },
    { rank: 5, name: "Michael Rodriguez", points: 11890, badge: "Expert", avatar: "/placeholder.svg?height=40&width=40&text=MR" },
  ],
  mentorships: [
    { rank: 1, name: "John Doe", sessions: 245, rating: 4.9, avatar: "/placeholder.svg?height=40&width=40&text=JD" },
    { rank: 2, name: "Jane Smith", sessions: 198, rating: 4.8, avatar: "/placeholder.svg?height=40&width=40&text=JS" },
    { rank: 3, name: "David Lee", sessions: 176, rating: 4.9, avatar: "/placeholder.svg?height=40&width=40&text=DL" },
  ],
  courses: [
    { rank: 1, name: "Alex Morgan", completed: 42, certificates: 38, avatar: "/placeholder.svg?height=40&width=40&text=AM" },
    { rank: 2, name: "Sarah Chen", completed: 38, certificates: 35, avatar: "/placeholder.svg?height=40&width=40&text=SC" },
    { rank: 3, name: "David Kim", completed: 35, certificates: 32, avatar: "/placeholder.svg?height=40&width=40&text=DK" },
  ],
}

export default function LeaderboardPage() {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-amber-500" />
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />
    if (rank === 3) return <Award className="h-5 w-5 text-amber-700" />
    return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
  }

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
            <Trophy className="h-8 w-8 text-amber-500" />
            Leaderboard
          </h1>
          <p className="text-muted-foreground">Top performers across the platform</p>
        </div>

        <Tabs defaultValue="overall" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overall">Overall</TabsTrigger>
            <TabsTrigger value="mentorships">Mentorships</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
          </TabsList>

          <TabsContent value="overall">
            <Card>
              <CardHeader>
                <CardTitle>Top Contributors</CardTitle>
                <CardDescription>Ranked by total points earned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboardData.overall.map((user) => (
                    <div
                      key={user.rank}
                      className={`flex items-center gap-4 p-4 rounded-lg ${
                        user.rank <= 3 ? "bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/10" : "bg-muted"
                      }`}
                    >
                      <div className="flex items-center justify-center w-12">
                        {getRankIcon(user.rank)}
                      </div>
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold">{user.name}</p>
                        <Badge variant="outline" className="mt-1">
                          {user.badge}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">{user.points.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mentorships">
            <Card>
              <CardHeader>
                <CardTitle>Top Mentors</CardTitle>
                <CardDescription>Ranked by mentorship sessions and ratings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboardData.mentorships.map((mentor) => (
                    <div key={mentor.rank} className="flex items-center gap-4 p-4 rounded-lg bg-muted">
                      <div className="flex items-center justify-center w-12">
                        {getRankIcon(mentor.rank)}
                      </div>
                      <Avatar>
                        <AvatarImage src={mentor.avatar} alt={mentor.name} />
                        <AvatarFallback>{mentor.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold">{mentor.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          <span className="text-sm">{mentor.rating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">{mentor.sessions}</p>
                        <p className="text-xs text-muted-foreground">sessions</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <CardTitle>Top Learners</CardTitle>
                <CardDescription>Ranked by courses completed and certificates earned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboardData.courses.map((learner) => (
                    <div key={learner.rank} className="flex items-center gap-4 p-4 rounded-lg bg-muted">
                      <div className="flex items-center justify-center w-12">
                        {getRankIcon(learner.rank)}
                      </div>
                      <Avatar>
                        <AvatarImage src={learner.avatar} alt={learner.name} />
                        <AvatarFallback>{learner.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold">{learner.name}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {learner.certificates} certificates
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">{learner.completed}</p>
                        <p className="text-xs text-muted-foreground">completed</p>
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

