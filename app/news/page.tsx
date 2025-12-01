"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import {
  Bookmark,
  Calendar,
  Clock,
  Filter,
  MoreHorizontal,
  Search,
  Share2,
  ThumbsUp,
  TrendingUp,
  Eye,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VerifiedBadge } from "@/components/verified-badge"
import { getVerificationType } from "@/lib/verification"
import { useLanguage } from "@/context/language-context"

// Sample news articles
const sampleNews = [
  {
    id: 1,
    title: "Tech Industry Sees Record Growth in Q4 2024",
    excerpt:
      "The technology sector has experienced unprecedented growth this quarter, with major companies reporting record profits and expanding their global presence.",
    author: {
      id: "1",
      name: "Tech News Network",
      handle: "@technews",
      avatar: "/placeholder.svg?height=40&width=40&text=TNN",
      role: "Technology News Publisher",
      isOrganization: true,
    },
    image: "/placeholder.svg?height=300&width=600",
    category: "Technology",
    publishedAt: "2 hours ago",
    views: 12500,
    likes: 342,
    shares: 89,
    isBookmarked: false,
    isLiked: false,
    trending: true,
  },
  {
    id: 2,
    title: "New AI Breakthrough Revolutionizes Healthcare",
    excerpt:
      "Researchers have developed an AI system that can diagnose diseases with 95% accuracy, potentially transforming how we approach medical diagnosis.",
    author: {
      id: "2",
      name: "Dr. Sarah Chen",
      handle: "@sarahchen",
      avatar: "/placeholder.svg?height=40&width=40&text=SC",
      role: "Medical Researcher",
      isPremium: true,
    },
    image: "/placeholder.svg?height=300&width=600",
    category: "Healthcare",
    publishedAt: "5 hours ago",
    views: 8900,
    likes: 256,
    shares: 67,
    isBookmarked: true,
    isLiked: true,
    trending: false,
  },
  {
    id: 3,
    title: "Sustainable Energy Solutions Gain Momentum",
    excerpt:
      "Countries worldwide are investing heavily in renewable energy, with solar and wind power becoming increasingly cost-effective alternatives to fossil fuels.",
    author: {
      id: "3",
      name: "Green Energy Today",
      handle: "@greenenergy",
      avatar: "/placeholder.svg?height=40&width=40&text=GET",
      role: "Environmental News",
      isOrganization: true,
    },
    image: "/placeholder.svg?height=300&width=600",
    category: "Environment",
    publishedAt: "1 day ago",
    views: 15200,
    likes: 489,
    shares: 124,
    isBookmarked: false,
    isLiked: false,
    trending: true,
  },
  {
    id: 4,
    title: "Remote Work Trends Continue to Evolve",
    excerpt:
      "As companies adapt to hybrid work models, new tools and strategies are emerging to support distributed teams and maintain productivity.",
    author: {
      id: "4",
      name: "Workplace Insights",
      handle: "@workplace",
      avatar: "/placeholder.svg?height=40&width=40&text=WI",
      role: "Business News",
      isOrganization: true,
    },
    image: "/placeholder.svg?height=300&width=600",
    category: "Business",
    publishedAt: "2 days ago",
    views: 6700,
    likes: 178,
    shares: 45,
    isBookmarked: false,
    isLiked: false,
    trending: false,
  },
]

const categories = ["All", "Technology", "Healthcare", "Business", "Environment", "Science", "Politics"]

export default function NewsPage() {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredNews = sampleNews.filter((article) => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="pt-20 pb-16 bg-background">
      <div className="container px-4 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t("nav.news")}</h1>
          <p className="text-gray-600 dark:text-gray-400">Stay updated with the latest news and insights</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search news articles..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="flex-wrap h-auto">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category.toLowerCase()}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((article) => (
            <Card key={article.id} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="relative">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {article.trending && (
                    <Badge className="absolute top-2 right-2 bg-orange-500 text-white flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {t("home.trending")}
                    </Badge>
                  )}
                  <Badge className="absolute top-2 left-2 bg-sky-500 text-white">{article.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="border w-8 h-8">
                    <AvatarImage src={article.author.avatar || "/placeholder.svg"} alt={article.author.name} />
                    <AvatarFallback className="bg-sky-700 text-white text-xs">
                      {article.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <p className="text-sm font-medium truncate">{article.author.name}</p>
                      <VerifiedBadge type={getVerificationType(article.author)} size="sm" />
                    </div>
                    <p className="text-xs text-gray-500">{article.publishedAt}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-500">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>{t("home.savePost")}</DropdownMenuItem>
                      <DropdownMenuItem>{t("home.share")}</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">{t("home.reportPost")}</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <h3 className="text-lg font-semibold mb-2 line-clamp-2 hover:text-sky-600 cursor-pointer">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-3">{article.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{article.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{article.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Share2 className="w-3 h-3" />
                    <span>{article.shares}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Button variant="outline" size="sm" className="flex-1">
                  {t("home.readArticle")}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${article.isBookmarked ? "text-sky-600" : "text-gray-600"}`}
                >
                  <Bookmark className="w-4 h-4" />
                  <span className="sr-only">{t("home.bookmark")}</span>
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-600">
                  <Share2 className="w-4 h-4" />
                  <span className="sr-only">{t("home.share")}</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {filteredNews.length > 0 && (
          <div className="flex justify-center mt-8">
            <Button variant="outline" size="lg">
              {t("home.loadMore")}
            </Button>
          </div>
        )}

        {/* Empty State */}
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No news articles found</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
