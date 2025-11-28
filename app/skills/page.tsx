"use client"

import { useState } from "react"
import { Clock, Users, CheckCircle, Play, Star, Trophy, Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock skill assessment data
const skillAssessments = [
  {
    id: "1",
    title: "React Development",
    description: "Comprehensive assessment covering React fundamentals, hooks, and advanced patterns",
    difficulty: "Intermediate",
    duration: "45 minutes",
    questions: 25,
    participants: 1247,
    rating: 4.8,
    status: "available",
    skills: ["React", "JavaScript", "JSX", "Hooks"],
    badge: "React Expert",
  },
  {
    id: "2",
    title: "UI/UX Design Principles",
    description: "Test your knowledge of design systems, user research, and interface design",
    difficulty: "Beginner",
    duration: "30 minutes",
    questions: 20,
    participants: 892,
    rating: 4.6,
    status: "completed",
    score: 87,
    skills: ["UI Design", "UX Research", "Figma", "Design Systems"],
    badge: "Design Fundamentals",
  },
  {
    id: "3",
    title: "Product Management Strategy",
    description: "Advanced assessment on product strategy, roadmapping, and stakeholder management",
    difficulty: "Advanced",
    duration: "60 minutes",
    questions: 30,
    participants: 634,
    rating: 4.9,
    status: "in-progress",
    progress: 65,
    skills: ["Product Strategy", "Roadmapping", "Analytics", "Leadership"],
    badge: "Product Leader",
  },
  {
    id: "4",
    title: "Data Science & Analytics",
    description: "Comprehensive test covering statistics, machine learning, and data visualization",
    difficulty: "Advanced",
    duration: "75 minutes",
    questions: 35,
    participants: 456,
    rating: 4.7,
    status: "available",
    skills: ["Python", "Statistics", "Machine Learning", "Data Visualization"],
    badge: "Data Scientist",
  },
]

const completedAssessments = [
  {
    skill: "UI/UX Design Principles",
    score: 87,
    percentile: 92,
    badge: "Design Fundamentals",
    completedDate: "2023-06-15",
    verified: true,
  },
  {
    skill: "JavaScript Fundamentals",
    score: 94,
    percentile: 96,
    badge: "JavaScript Expert",
    completedDate: "2023-05-22",
    verified: true,
  },
  {
    skill: "Project Management",
    score: 78,
    percentile: 84,
    badge: "Project Coordinator",
    completedDate: "2023-04-10",
    verified: true,
  },
]

const skillRecommendations = [
  {
    skill: "TypeScript",
    reason: "Based on your React expertise",
    difficulty: "Intermediate",
    estimatedTime: "2 weeks",
  },
  {
    skill: "Node.js",
    reason: "Complement your frontend skills",
    difficulty: "Intermediate",
    estimatedTime: "3 weeks",
  },
  {
    skill: "System Design",
    reason: "Next step in your career path",
    difficulty: "Advanced",
    estimatedTime: "6 weeks",
  },
]

export default function SkillsPage() {
  const [activeTab, setActiveTab] = useState("assessments")

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Skill Assessment Center</h1>
            <p className="text-gray-500 mt-1">Verify your expertise and discover new learning opportunities</p>
          </div>
          <Button className="mt-4 md:mt-0 bg-sky-500 hover:bg-sky-600 text-white">
            <Trophy className="mr-2 h-4 w-4" />
            View Certificates
          </Button>
        </div>

        <Tabs defaultValue="assessments" className="space-y-6" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="assessments">Available Tests</TabsTrigger>
            <TabsTrigger value="completed">My Results</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="assessments" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillAssessments.map((assessment) => (
                <Card key={assessment.id} className="border-none shadow-md">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{assessment.title}</CardTitle>
                        <CardDescription className="mt-1">{assessment.description}</CardDescription>
                      </div>
                      <Badge
                        className={
                          assessment.difficulty === "Beginner"
                            ? "bg-green-100 text-green-800"
                            : assessment.difficulty === "Intermediate"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {assessment.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {assessment.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="border-sky-500 text-sky-600">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{assessment.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-gray-500" />
                        <span>{assessment.questions} questions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>{assessment.participants} taken</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{assessment.rating}/5.0</span>
                      </div>
                    </div>

                    {assessment.status === "completed" && (
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                        <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                          <CheckCircle className="h-4 w-4" />
                          <span className="font-medium">Completed - Score: {assessment.score}%</span>
                        </div>
                      </div>
                    )}

                    {assessment.status === "in-progress" && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{assessment.progress}%</span>
                        </div>
                        <Progress value={assessment.progress} className="h-2" />
                      </div>
                    )}

                    <div className="flex gap-2">
                      {assessment.status === "available" && (
                        <Button className="flex-1 bg-sky-500 hover:bg-sky-600 text-white">
                          <Play className="mr-2 h-4 w-4" />
                          Start Assessment
                        </Button>
                      )}
                      {assessment.status === "in-progress" && (
                        <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                          Continue Assessment
                        </Button>
                      )}
                      {assessment.status === "completed" && (
                        <Button variant="outline" className="flex-1">
                          View Certificate
                        </Button>
                      )}
                      <Button variant="outline">Preview</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedAssessments.map((result, index) => (
                <Card key={index} className="border-none shadow-md">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{result.skill}</CardTitle>
                      {result.verified && (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-sky-600">{result.score}%</div>
                      <p className="text-sm text-gray-500">Score</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Percentile Rank</span>
                        <span className="font-medium">{result.percentile}th</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Badge Earned</span>
                        <span className="font-medium">{result.badge}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Completed</span>
                        <span>{result.completedDate}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        View Certificate
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Share Result
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Recommended Skills for You</CardTitle>
                <CardDescription>Based on your current expertise and career goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillRecommendations.map((rec, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h3 className="font-medium">{rec.skill}</h3>
                        <p className="text-sm text-gray-500">{rec.reason}</p>
                        <div className="flex gap-4 text-xs text-gray-500">
                          <span>Difficulty: {rec.difficulty}</span>
                          <span>Est. Time: {rec.estimatedTime}</span>
                        </div>
                      </div>
                      <Button className="bg-sky-500 hover:bg-sky-600 text-white">Start Learning</Button>
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
