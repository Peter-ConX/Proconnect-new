"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Compass,
  Bell,
  MessageSquare,
  Briefcase,
  Bookmark,
  Users,
  Award,
  Lightbulb,
  BarChart2,
  Inbox,
  BookOpen,
  FolderOpen,
  User,
  MoreHorizontal,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const sidebarItems = [
  { name: "Home", href: "/home", icon: Home },
  { name: "Discover", href: "/discover", icon: Compass },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "Build", href: "/build", icon: Briefcase },
  { name: "Bookmarks", href: "/bookmarks", icon: Bookmark },
  { name: "Missions", href: "/missions", icon: Users },
  { name: "Co-Lab", href: "/co-lab", icon: Users },
  { name: "Mentorship", href: "/mentorship", icon: Lightbulb },
  { name: "Skills", href: "/skills", icon: Award },
  { name: "Learning", href: "/learning", icon: BookOpen },
  { name: "Projects", href: "/projects", icon: FolderOpen },
  { name: "Showcase", href: "/showcase", icon: Award },
  { name: "Pulse", href: "/pulse", icon: BarChart2 },
  { name: "Inbox", href: "/inbox", icon: Inbox },
  { name: "Profile", href: "/profile", icon: User },
]

interface SidebarNavigationProps {
  isOpen?: boolean
  onClose?: () => void
}

export function SidebarNavigation({ isOpen = true, onClose }: SidebarNavigationProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && onClose && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`
        fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto
      `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Link href="/home" className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-sky-500 to-orange-500 bg-clip-text text-transparent">
                Proconnect
              </span>
            </Link>
            {onClose && (
              <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-3">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      flex items-center px-3 py-3 rounded-full text-xl font-normal transition-colors
                      ${isActive ? "bg-orange-100 text-orange-600 font-bold" : "text-gray-700 hover:bg-gray-100"}
                    `}
                    onClick={onClose}
                  >
                    <item.icon className="w-6 h-6 mr-4" />
                    {item.name}
                  </Link>
                )
              })}

              {/* More button */}
              <button className="flex items-center px-3 py-3 rounded-full text-xl font-normal text-gray-700 hover:bg-gray-100 w-full">
                <MoreHorizontal className="w-6 h-6 mr-4" />
                More
              </button>
            </div>
          </nav>

          {/* Post Button */}
          <div className="p-4 border-t border-gray-200">
            <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-full py-3 text-lg font-bold">
              Post
            </Button>
          </div>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/images/profile-picture.jpeg" alt="@user" />
                <AvatarFallback className="bg-sky-700 text-white">OC</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Your Name</p>
                <p className="text-sm text-gray-500 truncate">@username</p>
              </div>
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
