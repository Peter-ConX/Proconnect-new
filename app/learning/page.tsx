"use client"

import { useState } from "react"
import { BookOpen, Clock, Users, Star, Play, CheckCircle, Award, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock learning pathway data
const learningPaths = [
  {
    id: "1",
    title: "Full-Stack Developer",
    description: "Complete journey from frontend to backend development with modern technologies",
    difficulty: "Intermediate",
    duration: "12 weeks",
    students: 2847,
    rating: 4.8,
    progress: 45,
    status: "in-progress",
    modules: [
      { title: "HTML & CSS Fundamentals", completed: true, duration: "1 week" },
      { title: "JavaScript Essentials", completed: true, duration: "2 weeks" },
      { title: "React Development", completed: false, current: true, duration: "3 weeks" },
      { title: "Node.js & Express", completed: false, duration: "2 weeks" },
      { title: "Database Design", completed: false, duration: "2 weeks" },
      { title: "API Development", completed: false, duration: "1 week" },
      { title: "Deployment & DevOps", completed: false, duration: "1 week" },
    ],
    skills: ["React", "Node.js", "JavaScript", "MongoDB", "Express"],
    mentor: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40&text=SC",
      role: "Senior Full-Stack Developer",
    },
  },
  {
    id: "2",
    title: "UI/UX Design Mastery",
    description: "Learn design thinking, user research, and create stunning user interfaces",
    difficulty: "Beginner",
    duration: "8 weeks",
    students: 1923,
    rating: 4.9,
    progress: 0,
    status: "available",
    modules: [
      { title: "Design Fundamentals", completed: false, duration: "1 week" },
      { title: "User Research Methods", completed: false, duration: "2 weeks" },
      { title: "Wireframing & Prototyping", completed: false, duration: "2 weeks" },
      { title: "Visual Design Principles", completed: false, duration: "2 weeks" },
      { title: "Design Systems", completed: false, duration: "1 week" },
    ],
    skills: ["Figma", "User Research", "Prototyping", "Design Systems", "Visual Design"],
    mentor: {
      name: "Alex Morgan",
      avatar: "/placeholder.svg?height=40&width=40&text=AM",
      role: "Lead UX Designer",
    },
  },
  {
    id: "3",
    title: "Data Science & Analytics",
    description: "Master data analysis, machine learning, and statistical modeling",
    difficulty: "Advanced",
    duration: "16 weeks",
    students: 1456,
    rating: 4.7,
    progress: 100,
    status: "completed",
    completedDate: "2023-05-15",
    modules: [
      { title: "Python for Data Science", completed: true, duration: "2 weeks" },
      { title: "Statistics & Probability", completed: true, duration: "3 weeks" },
      { title: "Data Visualization", completed: true, duration: "2 weeks" },
      { title: "Machine Learning Basics", completed: true, duration: "4 weeks" },
      { title: "Advanced ML Algorithms", completed: true, duration: "3 weeks" },
      { title: "Deep Learning", completed: true, duration: "2 weeks" },
    ],
    skills: ["Python", "Machine Learning", "Statistics", "Data Visualization", "TensorFlow"],
    mentor: {
      name: "Dr. Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40&text=EW",
      role: "Data Science Lead",
    },
    certificate: "Data Science Professional",
  },
]

const recommendedPaths = [
  {
    title: "Product Management",
    reason: "Based on your leadership skills",
    difficulty: "Intermediate",
    duration: "10 weeks",
    match: 92,
  },
  {
    title: "DevOps Engineering",
    reason: "Complement your development skills",
    difficulty: "Advanced",
    duration: "14 weeks",
    match: 87,
  },
  {
    title: "Mobile Development",
    reason: "Expand your frontend expertise",
    difficulty: "Intermediate",
    duration: "12 weeks",
    match: 84,
  },
]

const achievements = [
  {
    title: "Fast Learner",
    description: "Completed 3 modules in one week",
    icon: TrendingUp,
    earned: "2023-06-10",
  },
  {
    title: "Mentor's Choice",
    description: "Received outstanding feedback from mentor",
    icon: Star,
    earned: "2023-05-22",
  },
  {
    title: "Community Helper",
    description: "Helped 10+ students in discussion forums",
    icon: Users,
    earned: "2023-05-15",
  },
]

export default function LearningPage() {
  const [activeTab, setActiveTab] = useState("paths")

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Learning Pathways</h1>
            <p className="text-gray-500 mt-1">Structured learning journeys to advance your career</p>
          </div>
          <Button className="mt-4 md:mt-0 bg-sky-500 hover:bg-sky-600 text-white">
            <BookOpen className="mr-2 h-4 w-4" />
            Browse All Paths
          </Button>
        </div>

        <Tabs defaultValue="paths" className="space-y-6" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="paths">My Learning</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="mentors">Mentors</TabsTrigger>
          </TabsList>

          <TabsContent value="paths" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {learningPaths.map((path) => (
                <Card key={path.id} className="border-none shadow-md">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{path.title}</CardTitle>
                        <CardDescription className="mt-1">{path.description}</CardDescription>
                      </div>
                      <Badge className={getDifficultyColor(path.difficulty)}>{path.difficulty}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {path.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="outline" className="border-sky-500 text-sky-600">
                          {skill}
                        </Badge>
                      ))}
                      {path.skills.length > 3 && (
                        <Badge variant="outline" className="border-gray-300">
                          +{path.skills.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{path.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>{path.students} students</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{path.rating}/5.0</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-gray-500" />
                        <span>{path.modules.length} modules</span>
                      </div>
                    </div>

                    {path.status === "in-progress" && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{path.progress}%</span>
                        </div>
                        <Progress value={path.progress} className="h-2" />
                        <p className="text-sm text-gray-500">Current: {path.modules.find((m) => m.current)?.title}</p>
                      </div>
                    )}

                    {path.status === "completed" && (
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                        <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                          <CheckCircle className="h-4 w-4" />
                          <span className="font-medium">Completed on {path.completedDate}</span>
                        </div>
                        {path.certificate && (
                          <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                            Certificate: {path.certificate}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={path.mentor.avatar || "/placeholder.svg"} alt={path.mentor.name} />
                        <AvatarFallback className="bg-sky-700 text-white">{path.mentor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{path.mentor.name}</p>
                        <p className="text-xs text-gray-500">{path.mentor.role}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {path.status === "available" && (
                        <Button className="flex-1 bg-sky-500 hover:bg-sky-600 text-white">
                          <Play className="mr-2 h-4 w-4" />
                          Start Learning
                        </Button>
                      )}
                      {path.status === "in-progress" && (
                        <Button className="flex-1 bg-sky-500 hover:bg-sky-600 text-white">Continue Learning</Button>
                      )}
                      {path.status === "completed" && (
                        <Button variant="outline" className="flex-1">
                          <Award className="mr-2 h-4 w-4" />
                          View Certificate
                        </Button>
                      )}
                      <Button variant="outline">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recommended" className="space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Recommended Learning Paths</CardTitle>
                <CardDescription>Personalized recommendations based on your skills and goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedPaths.map((path, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h3 className="font-medium">{path.title}</h3>
                        <p className="text-sm text-gray-500">{path.reason}</p>
                        <div className="flex gap-4 text-xs text-gray-500">
                          <span>Difficulty: {path.difficulty}</span>
                          <span>Duration: {path.duration}</span>
                          <span className="text-green-600">{path.match}% match</span>
                        </div>
                      </div>
                      <Button className="bg-sky-500 hover:bg-sky-600 text-white">Start Path</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="border-none shadow-md">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 bg-sky-100 dark:bg-sky-900 rounded-full flex items-center justify-center mb-4">
                      <achievement.icon className="h-8 w-8 text-sky-600 dark:text-sky-400" />
                    </div>
                    <CardTitle className="text-lg">{achievement.title}</CardTitle>
                    <CardDescription>{achievement.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-gray-500">Earned on {achievement.earned}</p>
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
