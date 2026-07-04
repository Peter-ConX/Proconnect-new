"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2, Users, Mail, Lock, ArrowRight } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export default function SignInPage() {
  const router = useRouter()
  const { signInWithEmail, signInWithGoogle, resetPassword } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
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
      setError("Please enter your email address first, then click 'Forgot password?'")
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
    <div className="fixed inset-0 z-50 flex flex-col md:flex-row bg-[#f8f9fa] overflow-hidden" style={{ fontFamily: "Inter, sans-serif" }}>

      {/* ══ LEFT PANEL — 45% ══ */}
      <div
        className="hidden md:flex md:w-[45%] relative flex-col justify-between p-12 lg:p-16 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0047AB 0%, #008080 100%)" }}
      >
        {/* Cross pattern overlay */}
        <div
          className="absolute inset-0 opacity-50 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        {/* Top right glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl pointer-events-none" />
        {/* Bottom left glow (teal tint) */}
        <div className="absolute -bottom-32 -left-32 w-[30rem] h-[30rem] opacity-10 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: "#93f2f2" }} />

        {/* Wordmark */}
        <div className="relative z-10">
          <a href="#" className="inline-flex items-center gap-2">
            <Users className="w-8 h-8 text-white" strokeWidth={1.5} />
            <span
              className="text-white font-bold tracking-tight"
              style={{ fontSize: "48px", lineHeight: "56px", letterSpacing: "-0.02em" }}
            >
              ProConnect
            </span>
          </a>
        </div>

        {/* Glassmorphism feature card */}
        <div className="relative z-10 flex-grow flex items-center justify-center my-12">
          <div
            className="rounded-2xl p-8 w-full max-w-md aspect-video flex flex-col items-start justify-end relative overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.1)",
              backgroundImage: "linear-gradient(135deg, rgba(0,71,171,0.3) 0%, rgba(0,128,128,0.3) 100%)",
            }}
          >
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }}
            />
            <div className="relative z-10 text-white">
              <p className="italic" style={{ fontSize: "16px", lineHeight: "24px" }}>
                &ldquo;Connecting professionals globally.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="relative z-10 max-w-sm">
          <h2
            className="text-white font-medium leading-snug"
            style={{ fontSize: "24px", lineHeight: "32px" }}
          >
            Connect.<br />
            Collaborate.<br />
            Grow.
          </h2>
          <p className="mt-4 text-white/80" style={{ fontSize: "16px", lineHeight: "24px" }}>
            The premier platform for professional advancement and meaningful industry connections.
          </p>
        </div>
      </div>

      {/* ══ RIGHT PANEL — 55% ══ */}
      <div className="w-full md:w-[55%] h-full bg-white flex flex-col overflow-y-auto">

        {/* Mobile header */}
        <div
          className="md:hidden p-6 flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #0047AB 0%, #008080 100%)" }}
        >
          <div className="flex items-center gap-2">
            <Users className="w-7 h-7 text-white" strokeWidth={1.5} />
            <span className="text-white font-bold tracking-tight" style={{ fontSize: "28px" }}>ProConnect</span>
          </div>
        </div>

        {/* Form container */}
        <div className="flex-grow flex items-center justify-center p-6 sm:p-12 lg:p-24">
          <div className="w-full space-y-8" style={{ maxWidth: "420px" }}>

            {/* Header */}
            <div className="space-y-2">
              <h2
                className="font-bold text-[#0047ab] leading-tight"
                style={{ fontSize: "clamp(32px, 5vw, 40px)", lineHeight: "1.15" }}
              >
                Welcome back
              </h2>
              <p className="text-[#434653]" style={{ fontSize: "16px", lineHeight: "24px" }}>
                Enter your credentials to access your account.
              </p>
            </div>

            {/* Success reset banner */}
            {resetSent && (
              <div
                className="px-4 py-3 rounded-lg border text-sm"
                style={{ backgroundColor: "#e6f4ea", borderColor: "#34a853", color: "#1a5e30", fontSize: "14px" }}
              >
                ✓ Password reset email sent to <strong>{email}</strong>. Check your inbox.
              </div>
            )}

            {/* Error banner */}
            {error && (
              <div
                className="px-4 py-3 rounded-lg border"
                style={{ backgroundColor: "#ffdad6", borderColor: "#ba1a1a", color: "#93000a", fontSize: "14px" }}
              >
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Email */}
              <div className="space-y-1">
                <label
                  htmlFor="signin-email"
                  className="block font-medium text-[#191c1d]"
                  style={{ fontSize: "14px", lineHeight: "20px" }}
                >
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#737784]">
                    <Mail size={18} />
                  </div>
                  <input
                    id="signin-email"
                    type="email"
                    placeholder="name@company.com"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 rounded-lg border bg-white text-[#191c1d] placeholder-[#737784] outline-none transition-shadow"
                    style={{ borderColor: "#c3c6d5", fontSize: "16px" }}
                    onFocus={(e) => { e.target.style.borderColor = "#0047ab"; e.target.style.boxShadow = "0 0 0 2px rgba(0,71,171,0.2)" }}
                    onBlur={(e) => { e.target.style.borderColor = "#c3c6d5"; e.target.style.boxShadow = "none" }}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="signin-password"
                    className="block font-medium text-[#191c1d]"
                    style={{ fontSize: "14px", lineHeight: "20px" }}
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    id="signin-forgot-password"
                    onClick={handleForgotPassword}
                    disabled={isResettingPassword}
                    className="text-[#0047ab] hover:text-[#00327d] transition-colors focus:outline-none rounded-sm disabled:opacity-60"
                    style={{ fontSize: "12px", lineHeight: "16px", letterSpacing: "0.02em" }}
                  >
                    {isResettingPassword ? "Sending…" : "Forgot password?"}
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#737784]">
                    <Lock size={18} />
                  </div>
                  <input
                    id="signin-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-2.5 rounded-lg border bg-white text-[#191c1d] placeholder-[#737784] outline-none transition-shadow"
                    style={{ borderColor: "#c3c6d5", fontSize: "16px" }}
                    onFocus={(e) => { e.target.style.borderColor = "#0047ab"; e.target.style.boxShadow = "0 0 0 2px rgba(0,71,171,0.2)" }}
                    onBlur={(e) => { e.target.style.borderColor = "#c3c6d5"; e.target.style.boxShadow = "none" }}
                  />
                  <button
                    type="button"
                    aria-label="Toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#737784] hover:text-[#191c1d] focus:outline-none transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center">
                <input
                  id="signin-remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded cursor-pointer"
                  style={{ accentColor: "#0047ab", borderColor: "#c3c6d5" }}
                />
                <label
                  htmlFor="signin-remember"
                  className="ml-2 block text-[#434653] cursor-pointer"
                  style={{ fontSize: "14px", lineHeight: "20px" }}
                >
                  Remember me for 30 days
                </label>
              </div>

              {/* Sign In button */}
              <div>
                <button
                  id="signin-submit"
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-semibold transition-colors group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#0047ab", fontSize: "14px", lineHeight: "20px" }}
                  onMouseEnter={(e) => !isLoading && ((e.currentTarget as HTMLElement).style.backgroundColor = "#00327d")}
                  onMouseLeave={(e) => !isLoading && ((e.currentTarget as HTMLElement).style.backgroundColor = "#0047ab")}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Sign in
                        <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" style={{ borderColor: "#c3c6d5" }} />
              </div>
              <div className="relative flex justify-center text-sm">
                <span
                  className="px-2 bg-white text-[#737784]"
                  style={{ fontSize: "12px", lineHeight: "16px", letterSpacing: "0.02em" }}
                >
                  or continue with
                </span>
              </div>
            </div>

            {/* Google */}
            <div className="grid grid-cols-1 gap-4">
              <button
                id="signin-google"
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
                className="w-full inline-flex justify-center items-center py-2.5 px-4 border rounded-lg bg-white font-medium text-[#191c1d] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ borderColor: "#c3c6d5", fontSize: "14px", lineHeight: "20px" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#f3f4f5")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#ffffff")}
              >
                {isGoogleLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-[#434653]" />
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Google
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto p-6 text-center space-y-4 flex-shrink-0 bg-white">
          <p className="text-[#434653]" style={{ fontSize: "16px", lineHeight: "24px" }}>
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-[#0047ab] hover:text-[#00327d] transition-colors underline-offset-4 hover:underline"
              style={{ fontSize: "14px", lineHeight: "20px" }}
            >
              Sign up
            </Link>
          </p>
          <p className="text-[#737784] max-w-sm mx-auto" style={{ fontSize: "12px", lineHeight: "16px" }}>
            By continuing, you agree to our{" "}
            <Link href="/terms" className="text-[#434653] hover:text-[#0047ab] transition-colors">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-[#434653] hover:text-[#0047ab] transition-colors">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
