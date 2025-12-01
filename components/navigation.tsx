"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Briefcase,
  Compass,
  MessageSquare,
  Newspaper,
  User,
  Menu,
  X,
  Lightbulb,
  Users,
  Award,
  BookOpen,
  BarChart2,
  Inbox,
  FolderOpen,
  TrendingUp,
  Settings,
} from "lucide-react"
import { useState } from "react"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LanguageSelector } from "@/components/language-selector"
import { ThemeToggle } from "@/components/theme-toggle"
import { useLanguage } from "@/context/language-context"
import type { TranslationKey } from "@/lib/translations"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LogOut, LogIn, User as UserIcon } from "lucide-react"
import { useRouter } from "next/navigation"

// Main navigation items structure (translation keys will be used for names)
const mainNavItems: Array<{ nameKey: TranslationKey; href: string; icon: any; group: string }> = [
  { nameKey: "nav.home", href: "/home", icon: Home, group: "Main" },
  { nameKey: "nav.build", href: "/build", icon: Briefcase, group: "Main" },
  { nameKey: "nav.discover", href: "/discover", icon: Compass, group: "Main" },
  { nameKey: "nav.messages", href: "/messages", icon: MessageSquare, group: "Main" },
  { nameKey: "nav.news", href: "/news", icon: Newspaper, group: "Main" },
  { nameKey: "nav.profile", href: "/profile", icon: User, group: "Main" },
  { nameKey: "nav.settings", href: "/settings", icon: Settings, group: "Main" },
]

// Feature navigation items structure (translation keys will be used for names)
const featureNavItems: Array<{ nameKey: TranslationKey; href: string; icon: any; group: string }> = [
  { nameKey: "nav.mentorship", href: "/mentorship", icon: Lightbulb, group: "Features" },
  { nameKey: "nav.missions", href: "/missions", icon: Users, group: "Features" },
  { nameKey: "nav.coLab", href: "/co-lab", icon: Users, group: "Features" },
  { nameKey: "nav.skills", href: "/skills", icon: Award, group: "Features" },
  { nameKey: "nav.learning", href: "/learning", icon: BookOpen, group: "Features" },
  { nameKey: "nav.pulse", href: "/pulse", icon: BarChart2, group: "Features" },
  { nameKey: "nav.inbox", href: "/inbox", icon: Inbox, group: "Features" },
  { nameKey: "nav.projects", href: "/projects", icon: FolderOpen, group: "Features" },
  { nameKey: "nav.showcase", href: "/showcase", icon: TrendingUp, group: "Features" },
]

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { t } = useLanguage()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check if user is logged in
  React.useEffect(() => {
    const userEmail = localStorage.getItem("userEmail")
    setIsLoggedIn(!!userEmail)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("userEmail")
    setIsLoggedIn(false)
    router.push("/auth")
  }

  const allItems = [...mainNavItems, ...featureNavItems]

  return (
    <>
      {/* Top Header with Logo and Mobile Menu Toggle */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-sky-500 to-orange-500 shadow-md h-16 flex items-center">
        <div className="w-full flex items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <Link href="/home" className="flex items-center flex-shrink-0">
            <span className="text-2xl font-bold text-yellow-500">Proconnect</span>
          </Link>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-white hover:bg-white/20"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <LanguageSelector />
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="focus:outline-none">
                    <Avatar className="h-8 w-8 border-2 border-white cursor-pointer hover:ring-2 hover:ring-white/50 transition-all">
                      <AvatarImage src="/images/profile-picture.jpeg" alt="@user" />
                      <AvatarFallback className="bg-white text-orange-500">OC</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => router.push("/profile")}>
                    <UserIcon className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => router.push("/auth")}
                variant="outline"
                size="sm"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign in
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Vertical Sidebar Navigation */}
      <aside
        className={`
        fixed top-16 left-0 bottom-0 z-40 bg-background border-r border-border overflow-y-auto
        transition-all duration-300 ease-in-out w-64
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        md:w-64
      `}
      >
        <nav className="py-4">
          {/* Main Section */}
          <div className="mb-6">
            <div className="px-4 mb-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("nav.main")}</h3>
            </div>
            <div className="space-y-1 px-2">
              {mainNavItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.nameKey}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all
                      ${
                        isActive
                          ? "bg-gradient-to-r from-teal-50 to-amber-50 text-amber-600 border-l-4 border-amber-500"
                          : "text-foreground hover:bg-muted"
                      }
                    `}
                  >
                    <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                    <span className="truncate">{t(item.nameKey)}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Features Section */}
          <div>
            <div className="px-4 mb-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {t("nav.features")}
              </h3>
            </div>
            <div className="space-y-1 px-2">
              {featureNavItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.nameKey}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all
                      ${
                        isActive
                          ? "bg-gradient-to-r from-teal-50 to-amber-50 text-amber-600 border-l-4 border-amber-500"
                          : "text-foreground hover:bg-muted"
                      }
                    `}
                  >
                    <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                    <span className="truncate">{t(item.nameKey)}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </nav>

        {/* Mobile User Menu in Sidebar */}
        <div className="md:hidden absolute bottom-0 left-0 right-0 border-t border-border bg-background p-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarImage src="/images/profile-picture.jpeg" alt="@user" />
                <AvatarFallback className="bg-orange-500 text-white">OC</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{t("nav.user")}</p>
                <p className="text-xs text-muted-foreground">{t("nav.viewProfile")}</p>
              </div>
            </div>
          ) : (
            <Button
              onClick={() => {
                setSidebarOpen(false)
                router.push("/auth")
              }}
              variant="outline"
              className="w-full mb-3"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Sign in
            </Button>
          )}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSelector />
            {isLoggedIn && (
              <Button onClick={handleLogout} variant="ghost" size="sm" className="text-red-600">
                <LogOut className="h-4 w-4 mr-2" />
                Log out
              </Button>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden top-16" onClick={() => setSidebarOpen(false)} />
      )}
    </>
  )
}
