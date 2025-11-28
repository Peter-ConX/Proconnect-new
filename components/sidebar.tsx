"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Lightbulb, Users, Award, BookOpen, BarChart2, Inbox, FolderOpen, TrendingUp } from "lucide-react"

// Secondary navigation items for the sidebar
const sidebarItems = [
  { name: "Mentorship", href: "/mentorship", icon: Lightbulb },
  { name: "Missions", href: "/missions", icon: Users },
  { name: "Co-Lab", href: "/co-lab", icon: Users },
  { name: "Skills", href: "/skills", icon: Award },
  { name: "Learning", href: "/learning", icon: BookOpen },
  { name: "Pulse", href: "/pulse", icon: BarChart2 },
  { name: "Inbox", href: "/inbox", icon: Inbox },
  { name: "Projects", href: "/projects", icon: FolderOpen },
  { name: "Showcase", href: "/showcase", icon: TrendingUp },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full fixed left-0 top-16 overflow-y-auto hidden md:block">
      <nav className="py-4">
        <div className="px-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Features</h2>
        </div>
        <div className="space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-2 text-sm font-medium ${
                  isActive
                    ? "text-orange-600 bg-orange-50 border-r-2 border-orange-500"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            )
          })}
        </div>
      </nav>
    </aside>
  )
}
