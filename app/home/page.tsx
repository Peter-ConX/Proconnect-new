"use client"

import type React from "react"
import type { User } from "@/types/user"

import { useState, useEffect } from "react"
import Link from "next/link"
import { toast } from "sonner"
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
const initialPosts = [
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
    content: "Just finished a major redesign project for a fintech client. The key insight: simplifying the onboarding flow increased conversion by 34%. Always test your assumptions!",
    image: "/placeholder.svg?height=300&width=600",
    time: "2 hours ago",
    likes: 128,
    comments: 2,
    shares: 12,
    isLiked: true,
    isBookmarked: false,
    isReposted: false,
    isForYou: true,
    isFollowing: true,
    isTrending: false,
    commentsList: [
      { id: "c1", author: { name: "Sarah Chen", avatar: "/placeholder.svg?height=40&width=40&text=SC" }, content: "Wow, 34% is huge! Did you also look at page load speeds during the onboarding?", timestamp: "1 hour ago" },
      { id: "c2", author: { name: "David Kim", avatar: "/placeholder.svg?height=40&width=40&text=DK" }, content: "Nice job Alex! Simple onboarding flows always perform better.", timestamp: "30 mins ago" }
    ]
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
    content: "🚀 Excited to announce our new sustainable energy initiative. Learn how we're working to reduce carbon emissions and create a cleaner future for all.",
    link: {
      title: "Tesla Sustainable Energy Initiative",
      url: "#",
      image: "/placeholder.svg?height=200&width=400",
    },
    time: "5 hours ago",
    likes: 986,
    comments: 0,
    shares: 332,
    isLiked: false,
    isBookmarked: true,
    isReposted: false,
    isForYou: true,
    isFollowing: false,
    isTrending: true,
    commentsList: []
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
    content: "🚀 Just published my new article on building performant React components. Check it out and let me know your thoughts!",
    link: {
      title: "Advanced React Performance Optimization Techniques",
      url: "#",
      image: "/placeholder.svg?height=200&width=400",
    },
    time: "5 hours ago",
    likes: 86,
    comments: 0,
    shares: 32,
    isLiked: false,
    isBookmarked: true,
    isReposted: false,
    isForYou: true,
    isFollowing: true,
    isTrending: false,
    commentsList: []
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
    content: "New guidelines on mental health in the workplace. Employers play a crucial role in supporting employee wellbeing. Read our comprehensive report.",
    time: "1 day ago",
    likes: 1245,
    comments: 0,
    shares: 515,
    isLiked: false,
    isBookmarked: false,
    isReposted: false,
    isForYou: true,
    isFollowing: false,
    isTrending: true,
    commentsList: []
  },
  {
    id: 5,
    author: {
      id: "6",
      name: "Emma Clark",
      handle: "@emmaclark",
      avatar: "/placeholder.svg?height=40&width=40&text=EC",
      role: "Product Designer at CreativeStudio",
      isHighProfile: true,
    },
    content: "Excited to announce that I'll be speaking at the UX Conference next month about designing for accessibility. Hope to see some of you there! #UXDesign #Accessibility",
    time: "3 hours ago",
    likes: 76,
    comments: 0,
    shares: 8,
    isLiked: false,
    isBookmarked: false,
    isReposted: false,
    isForYou: true,
    isFollowing: true,
    isTrending: false,
    commentsList: []
  },
  {
    id: 6,
    author: {
      id: "7",
      name: "Central Bank of Nigeria",
      handle: "@cbn",
      avatar: "/placeholder.svg?height=40&width=40&text=CBN",
      role: "Nigeria's Central Banking Authority",
      isOrganization: true,
    },
    content: "Announcing new financial inclusion initiatives to support small businesses across Nigeria. Our goal is to empower entrepreneurs and drive economic growth in all regions.",
    image: "/placeholder.svg?height=300&width=600",
    time: "1 day ago",
    likes: 1432,
    comments: 0,
    shares: 356,
    isLiked: false,
    isBookmarked: false,
    isReposted: false,
    isForYou: true,
    isFollowing: false,
    isTrending: true,
    commentsList: []
  }
]


export default function HomePage() {
  const { t, selectedLanguage } = useLanguage()
  const [postContent, setPostContent] = useState("")
  const [activeTab, setActiveTab] = useState("for-you")
  const [userPosts, setUserPosts] = useState<any[]>([])

  const [posts, setPosts] = useState<any[]>([])
  const [commentingPostId, setCommentingPostId] = useState<number | null>(null)
  const [newCommentText, setNewCommentText] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem("proconnect_posts")
    if (saved) {
      try {
        setPosts(JSON.parse(saved))
      } catch {
        setPosts(initialPosts)
      }
    } else {
      setPosts(initialPosts)
      localStorage.setItem("proconnect_posts", JSON.stringify(initialPosts))
    }
  }, [])

  const savePosts = (updatedPosts: any[]) => {
    setPosts(updatedPosts)
    localStorage.setItem("proconnect_posts", JSON.stringify(updatedPosts))
  }

  // Get translated posts based on selected language
  const getTranslatedPosts = (allPosts: any[]) => {
    const lang = selectedLanguage.code
    const translations = postTranslations[lang] || postTranslations.en

    return allPosts.map((post) => {
      if (post.id >= 1 && post.id <= 6) {
        const postKey = `post${post.id}` as keyof typeof translations
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
      }
      return post
    })
  }

  const translatedPosts = getTranslatedPosts(posts)

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!postContent.trim()) return

    // Create new post
    const newPost = {
      id: Date.now(),
      author: {
        id: currentUser.id,
        name: currentUser.name,
        handle: currentUser.handle,
        avatar: currentUser.avatar,
        role: currentUser.role,
        isPremium: currentUser.isPremium,
      },
      content: postContent,
      time: "Just now",
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      isBookmarked: false,
      isReposted: false,
      isForYou: true,
      isFollowing: true,
      isTrending: false,
      commentsList: []
    }

    const updated = [newPost, ...posts]
    savePosts(updated)
    setPostContent("")
    toast.success("Post published successfully!")
  }

  const handleLike = (postId: number) => {
    const updated = posts.map((post) => {
      if (post.id === postId) {
        const isLiked = !post.isLiked
        return {
          ...post,
          isLiked,
          likes: isLiked ? post.likes + 1 : Math.max(0, post.likes - 1),
        }
      }
      return post
    })
    savePosts(updated)
  }

  const handleBookmark = (postId: number) => {
    const updated = posts.map((post) => {
      if (post.id === postId) {
        const isBookmarked = !post.isBookmarked
        if (isBookmarked) {
          toast.success("Post bookmarked!")
        } else {
          toast.success("Post removed from bookmarks")
        }
        return {
          ...post,
          isBookmarked,
        }
      }
      return post
    })
    savePosts(updated)
  }

  const handleRepost = (postId: number) => {
    const updated = posts.map((post) => {
      if (post.id === postId) {
        const isReposted = !post.isReposted
        if (isReposted) {
          toast.success("Post reposted!")
        }
        return {
          ...post,
          isReposted,
          shares: isReposted ? post.shares + 1 : Math.max(0, post.shares - 1),
        }
      }
      return post
    })
    savePosts(updated)
  }

  const handleShare = (post: any) => {
    if (typeof window !== "undefined") {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`)
      }
    }
    toast.success("Post link copied to clipboard!")
  }

  const handleAddComment = (postId: number, e: React.FormEvent) => {
    e.preventDefault()
    if (!newCommentText.trim()) return

    const updated = posts.map((post) => {
      if (post.id === postId) {
        const newComment = {
          id: `c_${Date.now()}`,
          author: {
            name: currentUser.name,
            avatar: currentUser.avatar,
          },
          content: newCommentText,
          timestamp: "Just now",
        }
        return {
          ...post,
          comments: post.comments + 1,
          commentsList: [...(post.commentsList || []), newComment],
        }
      }
      return post
    })

    savePosts(updated)
    setNewCommentText("")
    toast.success("Comment added!")
  }

  const renderPostCard = (post: any) => {
    return (
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
                <DropdownMenuItem asChild>
                  <Link href={`/profile?username=${post.author.handle.replace("@", "")}`}>
                    <UserIcon className="w-4 h-4 mr-2" />
                    {t("home.viewProfile")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBookmark(post.id)}>
                  <Bookmark className="w-4 h-4 mr-2" />
                  {post.isBookmarked ? "Remove Bookmark" : t("home.savePost")}
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
        <CardFooter className="flex flex-col items-stretch border-t pt-3">
          <div className="flex justify-between w-full">
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(post.id)}
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
                onClick={() => setCommentingPostId(commentingPostId === post.id ? null : post.id)}
                className={`gap-1 interactive ${
                  commentingPostId === post.id ? "text-sky-600 dark:text-sky-400 font-semibold" : "text-gray-600 dark:text-gray-300"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>{post.comments}</span>
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRepost(post.id)}
                className={`gap-1 interactive ${
                  post.isReposted ? "text-sky-600 dark:text-sky-400" : "text-gray-600 dark:text-gray-300"
                }`}
              >
                <Repeat className="w-4 h-4" />
                <span>{post.shares}</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleBookmark(post.id)}
                className={`interactive ${
                  post.isBookmarked ? "text-sky-600 dark:text-sky-400" : "text-gray-600 dark:text-gray-300"
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span className="sr-only">{t("home.bookmark")}</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleShare(post)}
                className="text-gray-600 dark:text-gray-300 interactive"
              >
                <Share2 className="w-4 h-4" />
                <span className="sr-only">{t("home.share")}</span>
              </Button>
            </div>
          </div>

          {/* Comment Section inside the card */}
          {commentingPostId === post.id && (
            <div className="mt-4 pt-4 border-t space-y-4 w-full">
              {/* Comments List */}
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {(post.commentsList || []).length === 0 ? (
                  <p className="text-xs text-gray-500 italic py-2">No comments yet. Be the first to reply!</p>
                ) : (
                  (post.commentsList || []).map((comment: any) => (
                    <div key={comment.id} className="flex gap-2 text-sm bg-gray-50 dark:bg-gray-700/50 p-2.5 rounded-lg">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                        <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-xs">{comment.author.name}</span>
                          <span className="text-[10px] text-muted-foreground">{comment.timestamp}</span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mt-0.5 text-xs">{comment.content}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {/* Add Comment Form */}
              <form onSubmit={(e) => handleAddComment(post.id, e)} className="flex gap-2">
                <Input
                  placeholder="Add a comment..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="flex-1 text-sm h-8"
                />
                <Button type="submit" size="sm" className="h-8 bg-sky-500 hover:bg-sky-600 text-white text-xs px-3">Reply</Button>
              </form>
            </div>
          )}
        </CardFooter>
      </Card>
    )
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
                {translatedPosts.length === 0 ? (
                  <p className="text-center text-gray-500 py-10">No posts in feed yet.</p>
                ) : (
                  translatedPosts.map(renderPostCard)
                )}
              </TabsContent>

              <TabsContent value="following" className="mt-4 space-y-6">
                {translatedPosts.filter((p) => p.isFollowing).length === 0 ? (
                  <p className="text-center text-gray-500 py-10">No posts from professionals you follow.</p>
                ) : (
                  translatedPosts.filter((p) => p.isFollowing).map(renderPostCard)
                )}
              </TabsContent>

              <TabsContent value="trending" className="mt-4 space-y-6">
                {translatedPosts.filter((p) => p.isTrending).length === 0 ? (
                  <p className="text-center text-gray-500 py-10">No trending topics right now.</p>
                ) : (
                  translatedPosts.filter((p) => p.isTrending).map(renderPostCard)
                )}
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
