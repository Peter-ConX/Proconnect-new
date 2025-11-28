"use client"

import { Search, Filter, Compass, TrendingUp, Users, Briefcase, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DiscoverPage() {
  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Discover</h1>

          {/* Search Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Find Professionals & Projects</h2>
            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search by name, skill, or industry..." className="pl-10" />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <Button className="bg-sky-500 hover:bg-sky-600 text-white">Search</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-gray-100 dark:bg-gray-700">
                Frontend Development
              </Badge>
              <Badge variant="outline" className="bg-gray-100 dark:bg-gray-700">
                UX Design
              </Badge>
              <Badge variant="outline" className="bg-gray-100 dark:bg-gray-700">
                Product Management
              </Badge>
              <Badge variant="outline" className="bg-gray-100 dark:bg-gray-700">
                Data Science
              </Badge>
              <Badge variant="outline" className="bg-gray-100 dark:bg-gray-700">
                Marketing
              </Badge>
              <Badge variant="outline" className="bg-gray-100 dark:bg-gray-700">
                + Add Filter
              </Badge>
            </div>
          </div>

          {/* Trending Professionals */}
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-sky-500" />
            Trending Professionals
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {[
              {
                name: "Alex Morgan",
                role: "Senior UX Designer",
                avatar: "/placeholder.svg?height=64&width=64&text=AM",
                skills: ["UI/UX", "Figma", "User Research"],
                connections: 342,
              },
              {
                name: "Sarah Chen",
                role: "Frontend Developer",
                avatar: "/placeholder.svg?height=64&width=64&text=SC",
                skills: ["React", "TypeScript", "CSS"],
                connections: 287,
              },
              {
                name: "David Kim",
                role: "Product Manager",
                avatar: "/placeholder.svg?height=64&width=64&text=DK",
                skills: ["Product Strategy", "Agile", "Analytics"],
                connections: 412,
              },
              {
                name: "Emma Wilson",
                role: "Data Scientist",
                avatar: "/placeholder.svg?height=64&width=64&text=EW",
                skills: ["Python", "Machine Learning", "Data Visualization"],
                connections: 256,
              },
            ].map((person, index) => (
              <Card key={index} className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={person.avatar || "/placeholder.svg"} alt={person.name} />
                      <AvatarFallback className="bg-sky-700 text-white">{person.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{person.name}</CardTitle>
                      <CardDescription>{person.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {person.skills.map((skill, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">{person.connections} connections</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Profile
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Explore Categories */}
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Compass className="h-5 w-5 text-sky-500" />
            Explore Categories
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {[
              { name: "Design", icon: Award, count: 1240 },
              { name: "Development", icon: Briefcase, count: 1876 },
              { name: "Marketing", icon: TrendingUp, count: 943 },
              { name: "Data Science", icon: Compass, count: 782 },
              { name: "Product", icon: Users, count: 1105 },
              { name: "Business", icon: Briefcase, count: 1320 },
            ].map((category, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="bg-sky-100 dark:bg-sky-900 p-3 rounded-full">
                    <category.icon className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.count} professionals</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
