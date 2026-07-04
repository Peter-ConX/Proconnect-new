"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export default function SignInPage() {
  const router = useRouter()
  const { signInWithEmail, signInWithGoogle, resetPassword } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [error, setError] = useState("")
  const [resetSent, setResetSent] = useState(false)
  const [isResettingPassword, setIsResettingPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const result = await signInWithEmail(email, password)
    if (result.error) {
      setError(result.error)
      setIsLoading(false)
      return
    }

    router.replace("/home")
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    setError("")
    const result = await signInWithGoogle()
    if (result.error) {
      setError(result.error)
      setIsGoogleLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address above, then click 'Forgot password?'")
      return
    }
    setIsResettingPassword(true)
    setError("")
    const result = await resetPassword(email)
    setIsResettingPassword(false)
    if (result.error) {
      setError(result.error)
    } else {
      setResetSent(true)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 p-4">
      {/* Card */}
      <div className="w-full max-w-4xl min-h-[520px] rounded-3xl overflow-hidden shadow-2xl flex">

        {/* ── LEFT PANEL ── */}
        <div
          className="hidden md:flex md:w-[45%] relative flex-col justify-end p-10 overflow-hidden"
          style={{
            backgroundImage: "url('/auth-panel-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-white leading-tight mb-3">
              Welcome<br />Back
            </h1>
            <p className="text-white/75 text-base leading-relaxed">
              Connect with professionals and<br />showcase your work.
            </p>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="flex-1 bg-white flex flex-col justify-center px-10 py-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-7">Sign In</h2>

          {resetSent ? (
            <div className="mb-4 px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm">
              ✓ Password reset email sent to <strong>{email}</strong>. Check your inbox.
            </div>
          ) : null}

          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <input
              id="signin-email"
              type="email"
              placeholder="Email address"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
            />

            {/* Password */}
            <div className="relative">
              <input
                id="signin-password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-11 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end -mt-1">
              <button
                type="button"
                id="signin-forgot-password"
                onClick={handleForgotPassword}
                disabled={isResettingPassword}
                className="text-xs text-sky-600 hover:underline disabled:opacity-60"
              >
                {isResettingPassword ? "Sending…" : "Forgot password?"}
              </button>
            </div>

            {/* CTA button */}
            <button
              id="signin-submit"
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Sign in <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Google sign-in */}
            <button
              id="signin-google"
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isGoogleLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Sign in with Google
                </>
              )}
            </button>
          </form>

          {/* Footer link */}
          <p className="mt-6 text-center text-xs text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-sky-600 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
