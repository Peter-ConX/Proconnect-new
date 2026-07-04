"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/utils/supabase/client"

/**
 * This page is the OAuth redirect target for Google sign-in.
 * Supabase sends the user here after Google authentication.
 * The Supabase JS SDK automatically detects the auth code in the URL
 * and exchanges it for a session, then we redirect to /home.
 */
export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    // Handle the OAuth code exchange
    const handleCallback = async () => {
      const { searchParams } = new URL(window.location.href)
      const code = searchParams.get("code")

      if (code) {
        await supabase.auth.exchangeCodeForSession(code)
      }

      // Redirect after exchange (onAuthStateChange in AuthProvider will update session)
      router.replace("/home")
    }

    handleCallback()
  }, [router])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white text-lg font-medium">Completing sign in…</p>
        <p className="text-white/60 text-sm mt-1">You'll be redirected shortly.</p>
      </div>
    </div>
  )
}
