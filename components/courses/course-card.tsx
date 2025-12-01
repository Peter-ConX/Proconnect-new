"use client"

import { ExternalLink, Clock, BarChart3 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface CourseCardProps {
  course: {
    id: string
    courseTitle: string
    courseDescription: string
    courseUrl: string
    courseLevel: string
    durationHours: number
    courseProvider: string
    skillsCovered: string[]
    thumbnailUrl: string
  }
  onStartClick?: (courseId: string, courseUrl: string) => void
}

export function CourseCard({ course, onStartClick }: CourseCardProps) {
  const handleStartCourse = () => {
    // Track the user starting the course
    if (onStartClick) {
      onStartClick(course.id, course.courseUrl)
    } else {
      // Open course in new window
      window.open(course.courseUrl, "_blank")
    }
  }

  return (
    <Card className="border-none shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div className="h-40 bg-gradient-to-br from-sky-400 to-blue-600 relative overflow-hidden">
        <img
          src={course.thumbnailUrl || "/placeholder.svg?height=160&width=300&text=Course"}
          alt={course.courseTitle}
          className="w-full h-full object-cover opacity-80"
        />
        <Badge className="absolute top-3 right-3 bg-orange-500 text-white">{course.courseProvider}</Badge>
      </div>

      <CardHeader>
        <CardTitle className="text-lg line-clamp-2">{course.courseTitle}</CardTitle>
        <CardDescription className="line-clamp-2">{course.courseDescription}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Skills */}
        <div>
          <p className="text-sm font-medium mb-2">Skills Covered</p>
          <div className="flex flex-wrap gap-2">
            {course.skillsCovered.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs border-sky-300 text-sky-600">
                {skill}
              </Badge>
            ))}
            {course.skillsCovered.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{course.skillsCovered.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <BarChart3 className="h-4 w-4" />
            <span className="capitalize">{course.courseLevel || "All"}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            <span>{course.durationHours}h</span>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          onClick={handleStartCourse}
          className="w-full bg-gradient-to-r from-sky-500 to-orange-500 hover:from-sky-600 hover:to-orange-600 text-white font-semibold"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Start Assessment
        </Button>
      </CardContent>
    </Card>
  )
}
