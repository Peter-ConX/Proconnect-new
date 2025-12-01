"use client"

import type React from "react"
import type { User } from "@/types/user"

import { useState } from "react"
import Link from "next/link"
import {
  Bookmark,
  Calendar,
  Clock,
  ImageIcon,
  LinkIcon,
  MessageSquare,
  MoreHorizontal,
  Repeat,
  Share2,
  Smile,
  ThumbsUp,
  TrendingUp,
  UserIcon,
  Search,
  MapPin,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { VerifiedBadge } from "@/components/verified-badge"
import { getVerificationType } from "@/lib/verification"
import { useLanguage } from "@/context/language-context"
import { postTranslations } from "@/lib/post-translations"

// Sample user data with verification status
const currentUser: User = {
  id: "1",
  name: "Okafor Chidera",
  handle: "@okaforchidera",
  avatar: "/images/profile-picture.jpeg",
  role: "Founder, C.E.O of Proconnect",
  isPremium: true,
}

// Sample posts with author verification status
const samplePosts = [
  {
    id: 1,
    author: {
      id: "2",
      name: "Alex Morgan",
      handle: "@alexmorgan",
      avatar: "/placeholder.svg?height=40&width=40&text=AM",
      role: "Senior UX Designer at DesignHub",
      isHighProfile: true,
    },
    content:
      "Just finished a major redesign project for a fintech client. The key insight: simplifying the onboarding flow increased conversion by 34%. Always test your assumptions!",
    image: "/placeholder.svg?height=300&width=600",
    time: "2 hours ago",
    likes: 128,
    comments: 24,
    shares: 12,
    isLiked: true,
    isBookmarked: false,
  },
  {
    id: 2,
    author: {
      id: "3",
      name: "Tesla",
      handle: "@tesla",
      avatar: "/placeholder.svg?height=40&width=40&text=TS",
      role: "Electric Vehicle & Clean Energy Company",
      isOrganization: true,
    },
    content:
      "🚀 Excited to announce our new sustainable energy initiative. Learn how we're working to reduce carbon emissions and create a cleaner future for all.",
    link: {
      title: "Tesla Sustainable Energy Initiative",
      url: "#",
      image: "/placeholder.svg?height=200&width=400",
    },
    time: "5 hours ago",
    likes: 986,
    comments: 118,
    shares: 332,
    isLiked: false,
    isBookmarked: true,
  },
  {
    id: 3,
    author: {
      id: "4",
      name: "Sarah Chen",
      handle: "@sarahchen",
      avatar: "/placeholder.svg?height=40&width=40&text=SC",
      role: "Frontend Architect at TechCorp",
      isPremium: true,
    },
    content:
      "🚀 Just published my new article on building performant React components. Check it out and let me know your thoughts!",
    link: {
      title: "Advanced React Performance Optimization Techniques",
      url: "#",
      image: "/placeholder.svg?height=200&width=400",
    },
    time: "5 hours ago",
    likes: 86,
    comments: 18,
    shares: 32,
    isLiked: false,
    isBookmarked: true,
  },
  {
    id: 4,
    author: {
      id: "5",
      name: "World Health Organization",
      handle: "@who",
      avatar: "/placeholder.svg?height=40&width=40&text=WHO",
      role: "Global Health Authority",
      isOrganization: true,
    },
    content:
      "New guidelines on mental health in the workplace. Employers play a crucial role in supporting employee wellbeing. Read our comprehensive report.",
    time: "1 day ago",
    likes: 1245,
    comments: 208,
    shares: 515,
    isLiked: false,
    isBookmarked: false,
  },
]

export default function HomePage() {
  const { t, selectedLanguage } = useLanguage()
  const [postContent, setPostContent] = useState("")
  const [activeTab, setActiveTab] = useState("for-you")

  // Get translated posts based on selected language
  const getTranslatedPosts = () => {
    const lang = selectedLanguage.code
    const translations = postTranslations[lang] || postTranslations.en

    return samplePosts.map((post, index) => {
      const postKey = `post${index + 1}` as keyof typeof translations
      const translatedContent = translations[postKey] || post.content

      return {
        ...post,
        content: translatedContent,
        link: post.link
          ? {
              ...post.link,
              title: translations[`${postKey}Link` as keyof typeof translations] || post.link.title,
            }
          : post.link,
      }
    })
  }

  const translatedPosts = getTranslatedPosts()

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the post to the server
    console.log("Posting:", postContent)
    setPostContent("")
    // You could add the new post to a local state array to show it immediately
  }

  return (
    <div className="pt-20 pb-16 bg-background">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Profile Card */}
          <div className="hidden lg:block">
            <Card className="border-none shadow-lg sticky top-24 card-hover">
              <CardHeader className="flex flex-col items-center pb-2">
                <Avatar className="w-20 h-20 border-4 border-white shadow-sm">
                  <AvatarImage src="/images/profile-picture.jpeg" alt="@user" />
                  <AvatarFallback className="bg-sky-700 text-white">OC</AvatarFallback>
                </Avatar>
                <div className="mt-4 flex items-center">
                  <h3 className="text-lg font-semibold">{currentUser.name}</h3>
                  <VerifiedBadge type={getVerificationType(currentUser)} />
                </div>
                <p className="text-sm text-gray-500">{currentUser.role}</p>
              </CardHeader>
              <Separator />
              <CardContent className="px-4 py-3">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{t("home.posts")}</p>
                    <p className="text-lg font-semibold">128</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{t("home.following")}</p>
                    <p className="text-lg font-semibold">542</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{t("home.followers")}</p>
                    <p className="text-lg font-semibold">1.2K</p>
                  </div>
                </div>
              </CardContent>
              <Separator />
              <CardFooter className="flex justify-center p-4">
                <Button variant="outline" className="w-full interactive bg-transparent" asChild>
                  <Link href="/profile">{t("home.viewProfile")}</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Main Content - Feed */}
          <div className="lg:col-span-2">
            {/* Post Creation */}
            <Card className="border-none shadow-lg mb-6 select-none">
              <CardHeader className="pb-3 select-none">
                <div className="flex gap-3">
                  <Avatar className="w-10 h-10 select-none">
                    <AvatarImage src="/images/profile-picture.jpeg" alt="@user" draggable={false} />
                    <AvatarFallback className="bg-sky-700 text-white">OC</AvatarFallback>
                  </Avatar>
                  <Textarea
                    placeholder={t("home.sharePlaceholder")}
                    className="flex-1 resize-none focus-visible:ring-sky-500 interactive"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="text-gray-500 hover:text-sky-500 interactive">
                    <ImageIcon className="w-5 h-5" />
                    <span className="sr-only">{t("home.addImage")}</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-500 hover:text-sky-500 interactive">
                    <LinkIcon className="w-5 h-5" />
                    <span className="sr-only">{t("home.addLink")}</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-500 hover:text-sky-500 interactive">
                    <Smile className="w-5 h-5" />
                    <span className="sr-only">{t("home.addEmoji")}</span>
                  </Button>
                </div>
                <Button
                  className="interactive bg-sky-500 hover:bg-sky-600 text-white"
                  onClick={handlePostSubmit}
                  disabled={!postContent.trim()}
                >
                  {t("home.post")}
                </Button>
              </CardFooter>
            </Card>

            {/* Feed Tabs */}
            <Tabs defaultValue="for-you" className="mb-6" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="for-you">{t("home.forYou")}</TabsTrigger>
                <TabsTrigger value="following">{t("home.following")}</TabsTrigger>
                <TabsTrigger value="trending">{t("home.trending")}</TabsTrigger>
              </TabsList>

              <TabsContent value="for-you" className="mt-4 space-y-6">
                {/* Posts */}
                {translatedPosts.map((post) => (
                  <Card key={post.id} className="border-none shadow-md card-hover select-none">
                    <CardHeader className="pb-3 select-none">
                      <div className="flex justify-between">
                        <div className="flex items-start gap-3">
                          <Avatar className="border select-none">
                            <AvatarImage
                              src={post.author.avatar || "/placeholder.svg"}
                              alt={post.author.name}
                              draggable={false}
                            />
                            <AvatarFallback className="bg-sky-700 text-white">
                              {post.author.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="select-none">
                            <div className="flex items-center gap-1">
                              <p className="font-medium select-none">{post.author.name}</p>
                              <VerifiedBadge type={getVerificationType(post.author)} />
                              <p className="text-sm text-gray-500 dark:text-muted-foreground select-none">
                                {post.author.handle}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-muted-foreground select-none">
                                • {post.time}
                              </p>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-muted-foreground select-none">
                              {post.author.role}
                            </p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-gray-500 interactive">
                              <MoreHorizontal className="w-5 h-5" />
                              <span className="sr-only">{t("home.moreOptions")}</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <UserIcon className="w-4 h-4 mr-2" />
                              {t("home.viewProfile")}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Bookmark className="w-4 h-4 mr-2" />
                              {t("home.savePost")}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <span>{t("home.reportPost")}</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">{post.content}</p>
                      {post.image && (
                        <div className="mt-3 rounded-lg overflow-hidden">
                          <img
                            src={post.image || "/placeholder.svg"}
                            alt="Post attachment"
                            className="w-full h-auto select-none"
                            draggable={false}
                          />
                        </div>
                      )}
                      {post.link && (
                        <div className="mt-3 border rounded-lg overflow-hidden interactive">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3 h-40 md:h-auto bg-muted dark:bg-muted">
                              <img
                                src={post.link.image || "/placeholder.svg"}
                                alt={post.link.title}
                                className="w-full h-full object-cover select-none"
                                draggable={false}
                              />
                            </div>
                            <div className="md:w-2/3 p-4">
                              <h3 className="font-medium">{post.link.title}</h3>
                              <a
                                href={post.link.url}
                                className="text-sm text-sky-600 dark:text-sky-400 hover:underline mt-2 inline-block interactive"
                              >
                                {t("home.readArticle")}
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`gap-1 interactive ${
                            post.isLiked ? "text-sky-600 dark:text-sky-400" : "text-gray-600 dark:text-gray-300"
                          }`}
                        >
                          <ThumbsUp className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 text-gray-600 dark:text-gray-300 interactive"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>{post.comments}</span>
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 text-gray-600 dark:text-gray-300 interactive"
                        >
                          <Repeat className="w-4 h-4" />
                          <span>{post.shares}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`interactive ${
                            post.isBookmarked ? "text-sky-600 dark:text-sky-400" : "text-gray-600 dark:text-gray-300"
                          }`}
                        >
                          <Bookmark className="w-4 h-4" />
                          <span className="sr-only">{t("home.bookmark")}</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300 interactive">
                          <Share2 className="w-4 h-4" />
                          <span className="sr-only">{t("home.share")}</span>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="following" className="mt-4 space-y-6">
                {/* Following Tab Content */}
                <Card className="border-none shadow-md hover:shadow-lg transition-shadow select-none">
                  <CardHeader className="pb-3 select-none">
                    <div className="flex justify-between">
                      <div className="flex items-start gap-3">
                        <Avatar className="border select-none">
                          <AvatarImage
                            src="/placeholder.svg?height=40&width=40&text=EC"
                            alt="Emma Clark"
                            draggable={false}
                          />
                          <AvatarFallback className="bg-sky-700 text-white">EC</AvatarFallback>
                        </Avatar>
                        <div className="select-none">
                          <div className="flex items-center gap-1">
                            <p className="font-medium select-none">Emma Clark</p>
                            <VerifiedBadge type="high-profile" />
                            <p className="text-sm text-gray-500 dark:text-muted-foreground select-none">@emmaclark</p>
                            <p className="text-sm text-gray-500 dark:text-muted-foreground select-none">
                              • 3 hours ago
                            </p>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-muted-foreground select-none">
                            Product Designer at CreativeStudio
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="text-gray-500">
                        <MoreHorizontal className="w-5 h-5" />
                        <span className="sr-only">{t("home.moreOptions")}</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="text-gray-800 dark:text-gray-200">
                      Excited to announce that I'll be speaking at the UX Conference next month about designing for
                      accessibility. Hope to see some of you there! #UXDesign #Accessibility
                    </p>
                    <div className="mt-3 p-4 border rounded-lg bg-muted dark:bg-muted">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                        <span className="font-medium">UX Conference 2023</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>June 15-17, 2023 • San Francisco, CA</span>
                      </div>
                      <Button className="mt-3 bg-sky-500 hover:bg-sky-600 text-white">{t("home.registerNow")}</Button>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex gap-4">
                      <Button variant="ghost" size="sm" className="gap-1 text-gray-600 dark:text-gray-300">
                        <ThumbsUp className="w-4 h-4" />
                        <span>76</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1 text-gray-600 dark:text-gray-300">
                        <MessageSquare className="w-4 h-4" />
                        <span>12</span>
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="gap-1 text-gray-600 dark:text-gray-300">
                        <Repeat className="w-4 h-4" />
                        <span>8</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300">
                        <Bookmark className="w-4 h-4" />
                        <span className="sr-only">{t("home.bookmark")}</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300">
                        <Share2 className="w-4 h-4" />
                        <span className="sr-only">{t("home.share")}</span>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="trending" className="mt-4 space-y-6">
                {/* Trending Tab Content */}
                <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between">
                      <div className="flex items-start gap-3">
                        <Avatar className="border">
                          <AvatarImage
                            src="/placeholder.svg?height=40&width=40&text=CBN"
                            alt="Central Bank of Nigeria"
                          />
                          <AvatarFallback className="bg-sky-700 text-white">CBN</AvatarFallback>
                        </Avatar>
                        <div className="select-none">
                          <div className="flex items-center gap-1">
                            <p className="font-medium select-none">Central Bank of Nigeria</p>
                            <VerifiedBadge type="organization" />
                            <p className="text-sm text-gray-500 dark:text-muted-foreground select-none">@cbn</p>
                            <p className="text-sm text-gray-500 dark:text-muted-foreground select-none">• 1 day ago</p>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-muted-foreground select-none">
                            Nigeria's Central Banking Authority
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-orange-500 text-white flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {t("home.trending")}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="text-gray-800 dark:text-gray-200">
                      Announcing new financial inclusion initiatives to support small businesses across Nigeria. Our
                      goal is to empower entrepreneurs and drive economic growth in all regions.
                    </p>
                    <div className="mt-3 rounded-lg overflow-hidden">
                      <img
                        src="/placeholder.svg?height=300&width=600"
                        alt="Financial inclusion initiative"
                        className="w-full h-auto select-none"
                        draggable={false}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex gap-4">
                      <Button variant="ghost" size="sm" className="gap-1 text-sky-600 dark:text-sky-400">
                        <ThumbsUp className="w-4 h-4" />
                        <span>1,432</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1 text-gray-600 dark:text-gray-300">
                        <MessageSquare className="w-4 h-4" />
                        <span>287</span>
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="gap-1 text-gray-600 dark:text-gray-300">
                        <Repeat className="w-4 h-4" />
                        <span>356</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300">
                        <Bookmark className="w-4 h-4" />
                        <span className="sr-only">{t("home.bookmark")}</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300">
                        <Share2 className="w-4 h-4" />
                        <span className="sr-only">{t("home.share")}</span>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-center mt-8">
              <Button variant="outline" size="lg" className="gap-1 bg-transparent">
                {t("home.loadMore")}
              </Button>
            </div>
          </div>

          {/* Right Sidebar - Trending & Suggestions */}
          <div className="hidden lg:block space-y-6">
            {/* Search */}
            <div className="relative">
              <Input
                type="search"
                placeholder={t("home.searchPlaceholder")}
                className="bg-background dark:bg-background border-border pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            {/* Trending Topics */}
            <Card className="border-none shadow-lg">
              <CardHeader className="pb-3">
                <h3 className="text-lg font-semibold">{t("home.trendingTopics")}</h3>
              </CardHeader>
              <CardContent className="px-4 py-0">
                <div className="space-y-4">
                  {[
                    { tag: "#ReactJS", posts: "2.4K" },
                    { tag: "#UXDesign", posts: "1.8K" },
                    { tag: "#AIinTech", posts: "3.2K" },
                    { tag: "#RemoteWork", posts: "1.5K" },
                    { tag: "#ProductManagement", posts: "980" },
                  ].map((topic, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sky-600 dark:text-sky-400">{topic.tag}</p>
                        <p className="text-xs text-gray-500">
                          {topic.posts} {t("home.postsCount")}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        {t("home.follow")}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button variant="ghost" className="w-full text-sky-600 dark:text-sky-400">
                  {t("home.showMore")}
                </Button>
              </CardFooter>
            </Card>

            {/* Who to Follow */}
            <Card className="border-none shadow-lg">
              <CardHeader className="pb-3">
                <h3 className="text-lg font-semibold">{t("home.whoToFollow")}</h3>
              </CardHeader>
              <CardContent className="px-4 py-0">
                <div className="space-y-4">
                  {[
                    {
                      name: "Jim Ovie",
                      role: "Product Manager",
                      avatar: "/placeholder.svg?height=40&width=40&text=JO",
                      verificationType: "high-profile",
                    },
                    {
                      name: "Mark Williams",
                      role: "UX Researcher",
                      avatar: "/placeholder.svg?height=40&width=40&text=MW",
                      verificationType: "premium",
                    },
                    {
                      name: "Mrs Favour-Femi Oyewole",
                      role: "Frontend Developer",
                      avatar: "/placeholder.svg?height=40&width=40&text=FFO",
                      verificationType: "high-profile",
                    },
                  ].map((person, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="border">
                          <AvatarImage src={person.avatar || "/placeholder.svg"} alt={person.name} />
                          <AvatarFallback className="bg-sky-700 text-white">{person.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center">
                            <p className="font-medium">{person.name}</p>
                            <VerifiedBadge type={person.verificationType as any} size="sm" />
                          </div>
                          <p className="text-xs text-gray-500">{person.role}</p>
                        </div>
                      </div>
                      <Button size="sm" className="bg-sky-500 hover:bg-sky-600 text-white">
                        {t("home.follow")}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button variant="ghost" className="w-full text-sky-600 dark:text-sky-400">
                  {t("home.showMore")}
                </Button>
              </CardFooter>
            </Card>

            {/* Upcoming Events */}
            <Card className="border-none shadow-lg">
              <CardHeader className="pb-3">
                <h3 className="text-lg font-semibold">{t("home.upcomingEvents")}</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Tech Conference 2023",
                      date: "May 15-17, 2023",
                      location: "San Francisco, CA",
                      organizer: {
                        name: "TechCorp",
                        verificationType: "organization",
                      },
                    },
                    {
                      title: "UX Design Workshop",
                      date: "June 5, 2023",
                      location: "Virtual",
                      organizer: {
                        name: "DesignHub",
                        verificationType: "organization",
                      },
                    },
                  ].map((event, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center">
                        <p className="font-medium">{event.title}</p>
                        {event.organizer && (
                          <div className="ml-1 text-xs text-gray-500">
                            {t("home.by")} {event.organizer.name}
                            <VerifiedBadge type={event.organizer.verificationType as any} size="sm" />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" />
                        <span>{event.location}</span>
                      </div>
                      <Button size="sm" variant="outline" className="w-full mt-3 bg-transparent">
                        {t("home.interested")}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
