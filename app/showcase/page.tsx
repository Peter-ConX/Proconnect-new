"use client"

import type React from "react"

import { useState } from "react"
import { Search, Grid, List, Upload, ThumbsUp, Repeat, ImageIcon, Video, TagIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { LoadingSpinner } from "@/components/ui/loading-spinner"

// Mock data for projects
const projects = [
  {
    id: "1",
    title: "Modern E-commerce Dashboard",
    thumbnail: "/placeholder.svg?height=400&width=600&text=E-commerce+Dashboard",
    skills: ["UI/UX", "React", "Figma"],
    uploader: {
      name: "Alex Morgan",
      avatar: "/placeholder.svg?height=40&width=40&text=AM",
      role: "Senior UX Designer",
    },
    endorsements: 128,
    field: "design",
    industry: "retail",
  },
  {
    id: "2",
    title: "Financial Analytics Platform",
    thumbnail: "/placeholder.svg?height=400&width=600&text=Financial+Analytics",
    skills: ["Data Visualization", "JavaScript", "D3.js"],
    uploader: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40&text=SC",
      role: "Frontend Architect",
    },
    endorsements: 86,
    field: "finance",
    industry: "banking",
  },
  {
    id: "3",
    title: "AI-Powered Content Generator",
    thumbnail: "/placeholder.svg?height=400&width=600&text=AI+Content+Generator",
    skills: ["Machine Learning", "Python", "NLP"],
    uploader: {
      name: "Michael Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40&text=MR",
      role: "ML Engineer",
    },
    endorsements: 210,
    field: "tech",
    industry: "media",
  },
  {
    id: "4",
    title: "Healthcare Patient Portal",
    thumbnail: "/placeholder.svg?height=400&width=600&text=Healthcare+Portal",
    skills: ["UX Research", "Accessibility", "React"],
    uploader: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40&text=EW",
      role: "UX Researcher",
    },
    endorsements: 94,
    field: "design",
    industry: "healthcare",
  },
  {
    id: "5",
    title: "Sustainable Supply Chain Dashboard",
    thumbnail: "/placeholder.svg?height=400&width=600&text=Supply+Chain",
    skills: ["Data Analysis", "Tableau", "Sustainability"],
    uploader: {
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40&text=DK",
      role: "Data Analyst",
    },
    endorsements: 67,
    field: "data",
    industry: "logistics",
  },
  {
    id: "6",
    title: "Mobile Banking App Redesign",
    thumbnail: "/placeholder.svg?height=400&width=600&text=Banking+App",
    skills: ["Mobile Design", "Swift", "Figma"],
    uploader: {
      name: "Olivia Martinez",
      avatar: "/placeholder.svg?height=40&width=40&text=OM",
      role: "Mobile Developer",
    },
    endorsements: 152,
    field: "design",
    industry: "finance",
  },
]

export default function ShowcasePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedField, setSelectedField] = useState<string>("all")
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  // Filter projects based on selected filters and search query
  const filteredProjects = projects.filter((project) => {
    const fieldMatch = selectedField === "all" || project.field === selectedField
    const industryMatch = selectedIndustry === "all" || project.industry === selectedIndustry
    const searchMatch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    return fieldMatch && industryMatch && searchMatch
  })

  const handleUploadProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsUploading(true)

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setIsUploading(false)
        // Reset form and close dialog would happen here
      }
    }, 300)
  }

  return (
    <div className="pt-20 pb-16">
      <section className="bg-gradient-to-r from-sky-400 to-sky-600 text-white py-12">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Showcase Your Work</h1>
            <p className="text-lg text-white/80 mb-8">
              Discover inspiring projects from professionals across industries or share your own work with the community
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Project
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Upload New Project</DialogTitle>
                  <DialogDescription>
                    Share your work with the Proconnect community. Fill out the details below to showcase your project.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleUploadProject} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title</Label>
                    <Input id="title" name="projectTitle" placeholder="Enter a descriptive title" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="projectDescription"
                      placeholder="Describe your project, its purpose, and the problem it solves..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="field">Field</Label>
                      <Select name="projectField" defaultValue="design">
                        <SelectTrigger id="field">
                          <SelectValue placeholder="Select field" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="tech">Technology</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="data">Data</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Select name="projectIndustry" defaultValue="tech">
                        <SelectTrigger id="industry">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tech">Technology</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="media">Media</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Skills & Tags</Label>
                    <div className="relative">
                      <TagIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="tags"
                        name="projectTags"
                        placeholder="e.g. UI/UX, React, Data Visualization (comma separated)"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Media</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-sky-400 transition-colors">
                        <ImageIcon className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm font-medium">Upload Image</p>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                        <Input id="image" name="projectImage" type="file" accept="image/*" className="hidden" />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => document.getElementById("image")?.click()}
                        >
                          Browse
                        </Button>
                      </div>

                      <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-sky-400 transition-colors">
                        <Video className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm font-medium">Upload Video</p>
                        <p className="text-xs text-gray-500 mt-1">MP4, WebM up to 50MB</p>
                        <Input id="video" name="projectVideo" type="file" accept="video/*" className="hidden" />
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

                  {isUploading && (
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
                    <Button type="submit" className="bg-sky-500 hover:bg-sky-600" disabled={isUploading}>
                      {isUploading ? (
                        <>
                          <LoadingSpinner size="sm" />
                          <span className="ml-2">Uploading...</span>
                        </>
                      ) : (
                        "Upload Project"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
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
                placeholder="Search projects by title, skills, or tags..."
                className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-sky-500 hover:bg-sky-600" : ""}
                >
                  <Grid className="h-4 w-4" />
                  <span className="sr-only">Grid view</span>
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-sky-500 hover:bg-sky-600" : ""}
                >
                  <List className="h-4 w-4" />
                  <span className="sr-only">List view</span>
                </Button>
              </div>
              <Select value={selectedField} onValueChange={setSelectedField}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Fields</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="data">Data</SelectItem>
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
                  <SelectItem value="logistics">Logistics</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="banking">Banking</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">
                No projects match your filters. Try adjusting your search criteria.
              </p>
            </div>
          ) : (
            <div
              className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
            >
              {filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  className="border-none shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <div className={viewMode === "grid" ? "block" : "flex"}>
                    <div className={viewMode === "grid" ? "w-full h-48" : "w-1/3 h-auto"}>
                      <img
                        src={project.thumbnail || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className={viewMode === "grid" ? "" : "w-2/3"}>
                      <CardHeader className="pb-2">
                        <h3 className="text-xl font-semibold">{project.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.skills.map((skill, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={project.uploader.avatar || "/placeholder.svg"}
                              alt={project.uploader.name}
                            />
                            <AvatarFallback className="bg-sky-700 text-white">
                              {project.uploader.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{project.uploader.name}</p>
                            <p className="text-xs text-gray-500">{project.uploader.role}</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="ghost" size="sm" className="gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>Endorse ({project.endorsements})</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Repeat className="h-4 w-4" />
                          <span>Remix</span>
                        </Button>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
