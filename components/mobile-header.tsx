"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarNavigation } from "./sidebar-navigation"

export function MobileHeader() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 h-14">
        <div className="flex items-center justify-between px-4 h-full">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
          <span className="text-lg font-bold bg-gradient-to-r from-sky-500 to-orange-500 bg-clip-text text-transparent">
            Proconnect
          </span>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </header>

      <SidebarNavigation isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}
