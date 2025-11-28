"use client"

import type React from "react"

import { useState } from "react"
import { Search, Award, Clock, Star, CheckCircle, Circle, LinkIcon, FileText, Video, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

// Mock data for missions
const missions = [
  {
    id: "1",
    title: "Build a Responsive Dashboard",
    description:
      "Create a responsive admin dashboard with data visualization components using React and a charting library of your choice.",
    difficulty: "Intermediate",
    xp: 250,
    badge: "Frontend Specialist",
    timeRemaining: "5 days",
    skills: ["React", "CSS", "Data Visualization"],
    industry: "tech",
    status: "featured",
  },
  {
    id: "2",
    title: "Design a Mobile Banking App",
    description: "Create a modern, user-friendly mobile banking app design with a focus on security and ease of use.",
    difficulty: "Advanced",
    xp: 350,
    badge: "UX Master",
    timeRemaining: "7 days",
    skills: ["UI/UX", "Mobile Design", "Figma"],
    industry: "finance",
    status: "featured",
  },
  {
    id: "3",
    title: "Develop an E-commerce API",
    description:
      "Build a RESTful API for an e-commerce platform with endpoints for products, users, orders, and payments.",
    difficulty: "Advanced",
    xp: 400,
    badge: "Backend Architect",
    timeRemaining: "10 days",
    skills: ["Node.js", "Express", "MongoDB"],
    industry: "retail",
    status: "featured",
  },
  {
    id: "4",
    title: "Create a Marketing Campaign",
    description:
      "Develop a comprehensive digital marketing campaign for a new product launch, including social media strategy and content plan.",
    difficulty: "Intermediate",
    xp: 300,
    badge: "Marketing Strategist",
    timeRemaining: "8 days",
    skills: ["Digital Marketing", "Content Strategy", "Social Media"],
    industry: "marketing",
    status: "featured",
  },
  {
    id: "5",
    title: "Implement Authentication System",
    description:
      "Build a secure authentication system with features like social login, two-factor authentication, and password recovery.",
    difficulty: "Intermediate",
    xp: 275,
    badge: "Security Specialist",
    timeRemaining: "6 days",
    skills: ["Authentication", "Security", "API"],
    industry: "tech",
    status: "regular",
  },
  {
    id: "6",
    title: "Design a Healthcare Dashboard",
    description: "Create a dashboard for healthcare professionals to monitor patient data and health metrics.",
    difficulty: "Advanced",
    xp: 375,
    badge: "Health Tech Designer",
    timeRemaining: "9 days",
    skills: ["UI/UX", "Data Visualization", "Healthcare"],
    industry: "healthcare",
    status: "regular",
  },
]

// Mock data for user's missions
const userMissions = [
  {
    id: "7",
    title: "Optimize Website Performance",
    description:
      "Improve the loading speed and performance of a web application by implementing best practices and optimization techniques.",
    difficulty: "Intermediate",
    xp: 225,
    badge: "Performance Guru",
    progress: 65,
    status: "in-progress",
    dueDate: "Jun 15, 2023",
  },
  {
    id: "8",
    title: "Create an Onboarding Flow",
    description: "Design and implement an intuitive onboarding experience for new users of a SaaS platform.",
    difficulty: "Intermediate",
    xp: 250,
    badge: "UX Specialist",
    progress: 40,
    status: "in-progress",
    dueDate: "Jun 20, 2023",
  },
  {
    id: "9",
    title: "Build a Recommendation Algorithm",
    description: "Develop a content recommendation algorithm based on user behavior and preferences.",
    difficulty: "Expert",
    xp: 450,
    badge: "AI Innovator",
    status: "accepted",
    dueDate: "Jul 5, 2023",
  },
  {
    id: "10",
    title: "Implement Dark Mode",
    description:
      "Add a dark mode theme to an existing web application with smooth transitions and proper color contrast.",
    difficulty: "Beginner",
    xp: 150,
    badge: "UI Developer",
    status: "completed",
    completedDate: "May 28, 2023",
  },
  {
    id: "11",
    title: "Create a Responsive Email Template",
    description: "Design and code a responsive email template that works across different email clients and devices.",
    difficulty: "Beginner",
    xp: 125,
    badge: "Email Developer",
    status: "completed",
    completedDate: "May 15, 2023",
  },
]

export default function MissionsPage() {
  const [selectedSkill, setSelectedSkill] = useState<string>("all")
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [activeTab, setActiveTab] = useState<string>("featured")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  // Filter missions based on selected filters and search query
  const filteredMissions = missions.filter((mission) => {
    const skillMatch =
      selectedSkill === "all" || mission.skills.some((skill) => skill.toLowerCase() === selectedSkill.toLowerCase())
    const industryMatch = selectedIndustry === "all" || mission.industry === selectedIndustry
    const difficultyMatch =
      selectedDifficulty === "all" || mission.difficulty.toLowerCase() === selectedDifficulty.toLowerCase()
    const statusMatch =
      activeTab === "all" ||
      (activeTab === "featured" && mission.status === "featured") ||
      (activeTab === "regular" && mission.status === "regular")
    const searchMatch =
      searchQuery === "" ||
      mission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mission.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mission.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    return skillMatch && industryMatch && difficultyMatch && statusMatch && searchMatch
  })

  // Filter user missions based on status
  const getFilteredUserMissions = (status: string) => {
    return userMissions.filter((mission) => mission.status === status)
  }

  const handleSubmitSolution = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setIsSubmitting(false)
        // Reset form and close dialog would happen here
      }
    }, 300)
  }

  // Calculate total XP from completed missions
  const totalCompletedXP = userMissions
    .filter((mission) => mission.status === "completed")
    .reduce((total, mission) => total + mission.xp, 0)

  // Calculate progress percentage for in-progress missions
  const inProgressPercentage =
    userMissions
      .filter((mission) => mission.status === "in-progress")
      .reduce((total, mission) => total + mission.progress, 0) /
    Math.max(1, userMissions.filter((mission) => mission.status === "in-progress").length)

  return (
    <div className="pt-20 pb-16">
      <section className="bg-gradient-to-r from-sky-400 to-sky-600 text-white py-12">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Professional Missions</h1>
            <p className="text-lg text-white/80 mb-8">
              Complete challenges to earn badges, gain experience points, and showcase your expertise
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-500 rounded-full p-2">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold">Your XP</h3>
                    <p className="text-2xl font-bold">{totalCompletedXP}</p>
                  </div>
                </div>
                <div className="h-12 w-px bg-white/20"></div>
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 rounded-full p-2">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold">Badges Earned</h3>
                    <p className="text-2xl font-bold">{userMissions.filter((m) => m.status === "completed").length}</p>
                  </div>
                </div>
                <div className="h-12 w-px bg-white/20 hidden md:block"></div>
                <div className="hidden md:flex items-center gap-3">
                  <div className="bg-white/20 rounded-full p-2">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold">In Progress</h3>
                    <p className="text-2xl font-bold">
                      {userMissions.filter((m) => m.status === "in-progress").length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>{Math.round(inProgressPercentage)}%</span>
                </div>
                <Progress value={inProgressPercentage} className="h-2 bg-white/20" indicatorClassName="bg-orange-500" />
              </div>
            </div>

            {/* Custom tab navigation without using shadcn Tabs */}
            <div className="bg-white/10 backdrop-blur-sm rounded-md p-1 flex">
              <button
                onClick={() => setActiveTab("featured")}
                className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                  activeTab === "featured"
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                Featured Missions
              </button>
              <button
                onClick={() => setActiveTab("my-missions")}
                className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                  activeTab === "my-missions"
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                My Missions
              </button>
              <button
                onClick={() => setActiveTab("all")}
                className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                  activeTab === "all" ? "bg-white/20 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                All Missions
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search missions by title, description, or skills..."
                className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Skills</SelectItem>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="ui/ux">UI/UX</SelectItem>
                  <SelectItem value="node.js">Node.js</SelectItem>
                  <SelectItem value="data visualization">Data Visualization</SelectItem>
                  <SelectItem value="mobile design">Mobile Design</SelectItem>
                  <SelectItem value="digital marketing">Digital Marketing</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Main content area - conditionally render based on activeTab */}
          {activeTab === "featured" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMissions
                .filter((mission) => mission.status === "featured")
                .map((mission) => (
                  <Card key={mission.id} className="border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge className="bg-orange-500 text-white">Featured</Badge>
                        <div className="flex items-center">
                          {Array.from({
                            length:
                              mission.difficulty === "Beginner"
                                ? 1
                                : mission.difficulty === "Intermediate"
                                  ? 2
                                  : mission.difficulty === "Advanced"
                                    ? 3
                                    : 4,
                          }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-orange-500 fill-orange-500" />
                          ))}
                        </div>
                      </div>
                      <CardTitle className="mt-2">{mission.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{mission.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {mission.skills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="border-sky-500 text-sky-600 dark:text-sky-400"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-orange-500" />
                          <span className="font-medium">{mission.badge}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-sky-500" />
                          <span className="font-medium">{mission.xp} XP</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{mission.timeRemaining} left</span>
                      </div>
                      <Button className="bg-sky-500 hover:bg-sky-600 text-white">Accept Mission</Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          )}

          {activeTab === "my-missions" && (
            <div className="space-y-8">
              {/* In Progress Missions */}
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Circle className="h-4 w-4 text-sky-500 fill-sky-500 mr-2" />
                  In Progress
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getFilteredUserMissions("in-progress").map((mission) => (
                    <Card key={mission.id} className="border-none shadow-md">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle>{mission.title}</CardTitle>
                          <Badge className="bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300">
                            In Progress
                          </Badge>
                        </div>
                        <CardDescription className="line-clamp-2">{mission.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-500">Progress</span>
                            <span className="font-medium">{mission.progress}%</span>
                          </div>
                          <Progress value={mission.progress} className="h-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-orange-500" />
                            <span className="font-medium">{mission.badge}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-sky-500" />
                            <span className="font-medium">{mission.xp} XP</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>Due {mission.dueDate}</span>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="bg-sky-500 hover:bg-sky-600 text-white">Submit Solution</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[550px]">
                            <DialogHeader>
                              <DialogTitle>Submit Mission Solution</DialogTitle>
                              <DialogDescription>
                                Share your solution to complete this mission and earn the badge and XP.
                              </DialogDescription>
                            </DialogHeader>

                            <form onSubmit={handleSubmitSolution} className="space-y-4 mt-4">
                              <div className="space-y-2">
                                <Label htmlFor="description">Solution Description</Label>
                                <Textarea
                                  id="description"
                                  name="solutionDescription"
                                  placeholder="Describe your approach and solution..."
                                  rows={4}
                                  required
                                />
                              </div>

                              <div className="space-y-2">
                                <Label>Submission Type</Label>
                                <RadioGroup defaultValue="file" className="flex flex-col space-y-2">
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="file" id="file" />
                                    <Label htmlFor="file" className="cursor-pointer">
                                      Upload Files
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="link" id="link" />
                                    <Label htmlFor="link" className="cursor-pointer">
                                      Submit Link
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="text" id="text" />
                                    <Label htmlFor="text" className="cursor-pointer">
                                      Text Submission
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </div>

                              <div className="space-y-2">
                                <Label>Upload Files</Label>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-sky-400 transition-colors">
                                    <FileText className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                                    <p className="text-sm font-medium">Upload Document</p>
                                    <p className="text-xs text-gray-500 mt-1">PDF, DOC up to 10MB</p>
                                    <Input
                                      id="document"
                                      name="solutionDocument"
                                      type="file"
                                      accept=".pdf,.doc,.docx"
                                      className="hidden"
                                    />
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      className="mt-2"
                                      onClick={() => document.getElementById("document")?.click()}
                                    >
                                      Browse
                                    </Button>
                                  </div>

                                  <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-sky-400 transition-colors">
                                    <Video className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                                    <p className="text-sm font-medium">Upload Video</p>
                                    <p className="text-xs text-gray-500 mt-1">MP4, WebM up to 50MB</p>
                                    <Input
                                      id="video"
                                      name="solutionVideo"
                                      type="file"
                                      accept="video/*"
                                      className="hidden"
                                    />
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      className="mt-2"
                                      onClick={() => document.getElementById("video")?.click()}
                                    >
                                      Browse
                                    </Button>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="link">Or Submit Link</Label>
                                <div className="relative">
                                  <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                                  <Input
                                    id="link"
                                    name="solutionLink"
                                    placeholder="https://github.com/yourusername/project"
                                    className="pl-10"
                                  />
                                </div>
                              </div>

                              {isSubmitting && (
                                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-sky-500 transition-all duration-300"
                                    style={{ width: `${uploadProgress}%` }}
                                  ></div>
                                </div>
                              )}

                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button type="button" variant="outline">
                                    Cancel
                                  </Button>
                                </DialogClose>
                                <Button type="submit" className="bg-sky-500 hover:bg-sky-600" disabled={isSubmitting}>
                                  {isSubmitting ? (
                                    <>
                                      <LoadingSpinner size="sm" />
                                      <span className="ml-2">Submitting...</span>
                                    </>
                                  ) : (
                                    "Submit Solution"
                                  )}
                                </Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Accepted Missions */}
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Circle className="h-4 w-4 text-orange-500 mr-2" />
                  Accepted
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getFilteredUserMissions("accepted").map((mission) => (
                    <Card key={mission.id} className="border-none shadow-md">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle>{mission.title}</CardTitle>
                          <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">
                            Accepted
                          </Badge>
                        </div>
                        <CardDescription className="line-clamp-2">{mission.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-orange-500" />
                            <span className="font-medium">{mission.badge}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-sky-500" />
                            <span className="font-medium">{mission.xp} XP</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>Due {mission.dueDate}</span>
                        </div>
                        <Button className="bg-sky-500 hover:bg-sky-600 text-white">Start Working</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Completed Missions */}
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Completed
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getFilteredUserMissions("completed").map((mission) => (
                    <Card key={mission.id} className="border-none shadow-md">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle>{mission.title}</CardTitle>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            Completed
                          </Badge>
                        </div>
                        <CardDescription className="line-clamp-2">{mission.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-orange-500" />
                            <span className="font-medium">{mission.badge}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-sky-500" />
                            <span className="font-medium">{mission.xp} XP</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>Completed {mission.completedDate}</span>
                        </div>
                        <Button variant="outline">View Solution</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "all" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMissions.map((mission) => (
                <Card key={mission.id} className="border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      {mission.status === "featured" ? (
                        <Badge className="bg-orange-500 text-white">Featured</Badge>
                      ) : (
                        <Badge className="bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300">Regular</Badge>
                      )}
                      <div className="flex items-center">
                        {Array.from({
                          length:
                            mission.difficulty === "Beginner"
                              ? 1
                              : mission.difficulty === "Intermediate"
                                ? 2
                                : mission.difficulty === "Advanced"
                                  ? 3
                                  : 4,
                        }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-orange-500 fill-orange-500" />
                        ))}
                      </div>
                    </div>
                    <CardTitle className="mt-2">{mission.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{mission.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {mission.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="border-sky-500 text-sky-600 dark:text-sky-400">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-orange-500" />
                        <span className="font-medium">{mission.badge}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-sky-500" />
                        <span className="font-medium">{mission.xp} XP</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{mission.timeRemaining} left</span>
                    </div>
                    <Button className="bg-sky-500 hover:bg-sky-600 text-white">Accept Mission</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
