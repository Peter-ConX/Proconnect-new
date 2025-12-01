"use client"

import { Award, CheckCircle, Trophy, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface BadgeData {
  id: string
  name: string
  description: string
  type: "course" | "mentorship" | "achievement" | "skill"
  earnedDate: string
  verified: boolean
  icon?: string
}

interface BadgeDisplayProps {
  badges: BadgeData[]
  title?: string
}

export function BadgeDisplay({ badges, title = "Badges & Certificates" }: BadgeDisplayProps) {
  const getBadgeIcon = (type: string) => {
    switch (type) {
      case "course":
        return <Award className="h-6 w-6" />
      case "mentorship":
        return <Trophy className="h-6 w-6" />
      case "achievement":
        return <Star className="h-6 w-6" />
      default:
        return <CheckCircle className="h-6 w-6" />
    }
  }

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "course":
        return "bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-400 border-teal-300 dark:border-teal-700"
      case "mentorship":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400 border-amber-300 dark:border-amber-700"
      case "achievement":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400 border-purple-300 dark:border-purple-700"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>Your earned badges and certificates</CardDescription>
      </CardHeader>
      <CardContent>
        {badges.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No badges earned yet. Complete courses or mentorships to earn badges!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 rounded-lg border-2 ${getBadgeColor(badge.type)} transition-transform hover:scale-105`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getBadgeIcon(badge.type)}
                    <div>
                      <h4 className="font-semibold">{badge.name}</h4>
                      <p className="text-xs opacity-80">{badge.description}</p>
                    </div>
                  </div>
                  {badge.verified && (
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  )}
                </div>
                <p className="text-xs mt-2 opacity-70">Earned {new Date(badge.earnedDate).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

