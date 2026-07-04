"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/context/auth-context"

// Pages that do NOT require authentication
const PUBLIC_PATHS = ["/signin", "/signup", "/auth", "/terms", "/privacy", "/"]

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const isPublicPath = PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith("/auth/")
  )

  useEffect(() => {
    if (loading) return // Still restoring session — do nothing yet

    if (!session && !isPublicPath) {
      // Not authenticated & trying to access a protected route
      router.replace("/signin")
    }
  }, [session, loading, isPublicPath, router])

  // While loading, show a minimal spinner so we don't flash the page content
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
        <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // On a protected route with no session: render nothing while redirecting
  if (!session && !isPublicPath) {
    return null
  }

  return <>{children}</>
}
