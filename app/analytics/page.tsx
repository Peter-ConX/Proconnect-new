"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Users, Eye, MessageSquare, Award, Target, BarChart3, PieChart, Activity } from "lucide-react"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")

  const metrics = [
    {
      title: "Profile Views",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: Eye,
      description: "Total profile visits this month",
    },
    {
      title: "Connections",
      value: "1,234",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      description: "New professional connections",
    },
    {
      title: "Engagement Rate",
      value: "24.8%",
      change: "+3.1%",
      trend: "up",
      icon: MessageSquare,
      description: "Average post engagement",
    },
    {
      title: "Skill Score",
      value: "847",
      change: "+15.3%",
      trend: "up",
      icon: Award,
      description: "Overall skill assessment score",
    },
  ]

  const skillProgress = [
    { skill: "JavaScript", progress: 85, level: "Expert" },
    { skill: "React", progress: 78, level: "Advanced" },
    { skill: "Node.js", progress: 72, level: "Advanced" },
    { skill: "TypeScript", progress: 68, level: "Intermediate" },
    { skill: "Python", progress: 45, level: "Beginner" },
  ]

  const recentActivity = [
    { action: "Completed JavaScript Assessment", time: "2 hours ago", points: "+50 XP" },
    { action: "Connected with Sarah Johnson", time: "5 hours ago", points: "+10 XP" },
    { action: "Posted project showcase", time: "1 day ago", points: "+25 XP" },
    { action: "Attended React Workshop", time: "2 days ago", points: "+100 XP" },
    { action: "Mentored junior developer", time: "3 days ago", points: "+75 XP" },
  ]

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-2">Track your professional growth and engagement</p>
          </div>
          <div className="flex space-x-2">
            {["7d", "30d", "90d", "1y"].map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range)}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">{metric.change}</span>
                  <span>from last period</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Profile Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Profile Performance</span>
                  </CardTitle>
                  <CardDescription>Your profile visibility and engagement trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Profile Completeness</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Search Ranking</span>
                      <Badge variant="secondary">Top 15%</Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Response Rate</span>
                      <span className="text-sm font-medium">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Network Growth */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="h-5 w-5" />
                    <span>Network Growth</span>
                  </CardTitle>
                  <CardDescription>Your professional network expansion</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Connections</span>
                      <span className="text-lg font-bold">1,234</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Developers</span>
                        <span>45%</span>
                      </div>
                      <Progress value={45} className="h-1" />

                      <div className="flex justify-between text-sm">
                        <span>Designers</span>
                        <span>30%</span>
                      </div>
                      <Progress value={30} className="h-1" />

                      <div className="flex justify-between text-sm">
                        <span>Product Managers</span>
                        <span>25%</span>
                      </div>
                      <Progress value={25} className="h-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Skill Assessment Progress</CardTitle>
                <CardDescription>Track your skill development and certifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {skillProgress.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.skill}</span>
                        <Badge
                          variant={
                            skill.level === "Expert" ? "default" : skill.level === "Advanced" ? "secondary" : "outline"
                          }
                        >
                          {skill.level}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={skill.progress} className="flex-1" />
                        <span className="text-sm text-muted-foreground">{skill.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
                <CardDescription>Your latest platform interactions and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                      <Badge variant="outline">{activity.points}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Professional Goals</span>
                </CardTitle>
                <CardDescription>Set and track your career objectives</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Complete 5 Skill Assessments</span>
                      <span className="text-sm text-muted-foreground">3/5</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Reach 1,500 Connections</span>
                      <span className="text-sm text-muted-foreground">1,234/1,500</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Mentor 10 Developers</span>
                      <span className="text-sm text-muted-foreground">7/10</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>

                  <Button className="w-full">
                    <Target className="h-4 w-4 mr-2" />
                    Set New Goal
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
