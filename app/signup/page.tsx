"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2, Users, ArrowRight, CheckCircle2 } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export default function SignUpPage() {
  const router = useRouter()
  const { signUpWithEmail, signInWithGoogle } = useAuth()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!termsAccepted) {
      setError("Please accept the Terms of Service and Privacy Policy to continue.")
      return
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }
    setIsLoading(true)
    setError("")
    const result = await signUpWithEmail(firstName, lastName, email, password)
    if (result.error) {
      setError(result.error)
      setIsLoading(false)
      return
    }
    setSuccess(true)
    setIsLoading(false)
  }

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true)
    setError("")
    const result = await signInWithGoogle()
    if (result.error) {
      setError(result.error)
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col md:flex-row bg-[#f8f9fa] overflow-hidden" style={{ fontFamily: "Inter, sans-serif" }}>

      {/* ══ LEFT PANEL — 45% ══ */}
      <div
        className="relative w-full md:w-[45%] h-[200px] md:h-full flex flex-col justify-between p-8 md:p-12 overflow-hidden flex-shrink-0"
        style={{ background: "linear-gradient(135deg, #0047AB 0%, #008080 100%)" }}
      >
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.12) 2px, transparent 2px)",
            backgroundSize: "30px 30px",
          }}
        />
        {/* Glow orbs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        {/* Wordmark */}
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <Users className="w-8 h-8 text-white" strokeWidth={1.5} />
            <span
              className="text-white font-bold tracking-tight"
              style={{ fontSize: "clamp(28px, 4vw, 48px)", lineHeight: "1.15", letterSpacing: "-0.02em" }}
            >
              Proconnect
            </span>
          </div>
        </div>

        {/* Tagline — hidden on very small mobile */}
        <div className="relative z-10 hidden sm:block">
          <h2 className="text-white/90 font-semibold mb-3" style={{ fontSize: "24px", lineHeight: "32px" }}>
            Connect. Collaborate. Grow.
          </h2>
          <p className="text-white/70" style={{ fontSize: "16px", lineHeight: "24px", maxWidth: "360px" }}>
            Join the premier network designed for professionals seeking meaningful career advancement and industry connections.
          </p>
        </div>
      </div>

      {/* ══ RIGHT PANEL — 55% ══ */}
      <div className="w-full md:w-[55%] h-full bg-white flex flex-col overflow-y-auto">
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-24 py-12 max-w-3xl w-full mx-auto">

          {success ? (
            /* ── Success State ── */
            <div className="flex flex-col items-center text-center gap-4 py-12">
              <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="font-semibold text-[#191c1d]" style={{ fontSize: "24px" }}>Account created!</h2>
              <p className="text-[#434653]" style={{ fontSize: "16px", maxWidth: "340px" }}>
                A confirmation email has been sent to <strong>{email}</strong>. Verify your email then sign in.
              </p>
              <button
                onClick={() => router.push("/signin")}
                className="mt-2 text-[#0047ab] font-medium hover:underline flex items-center gap-1"
                style={{ fontSize: "14px" }}
              >
                Go to Sign In <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              {/* Form Header */}
              <div className="mb-8">
                <h2 className="font-semibold text-[#0047ab] mb-1.5" style={{ fontSize: "24px", lineHeight: "32px" }}>
                  Create your account
                </h2>
                <p className="text-[#434653]" style={{ fontSize: "16px", lineHeight: "24px" }}>
                  Join the Proconnect professional network
                </p>
              </div>

              {/* Error banner */}
              {error && (
                <div
                  className="mb-5 px-4 py-3 rounded-lg border text-sm"
                  style={{ backgroundColor: "#ffdad6", borderColor: "#ba1a1a", color: "#93000a", fontSize: "14px" }}
                >
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Name row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="signup-first-name"
                      className="block mb-1.5 font-medium text-[#191c1d]"
                      style={{ fontSize: "14px", lineHeight: "20px" }}
                    >
                      First name
                    </label>
                    <input
                      id="signup-first-name"
                      type="text"
                      placeholder="Jane"
                      required
                      autoComplete="given-name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border bg-white text-[#191c1d] placeholder-[#737784] transition-all outline-none"
                      style={{
                        borderColor: "#c3c6d5",
                        fontSize: "16px",
                        lineHeight: "24px",
                      }}
                      onFocus={(e) => { e.target.style.borderColor = "#0047ab"; e.target.style.boxShadow = "0 0 0 2px rgba(0,71,171,0.2)" }}
                      onBlur={(e) => { e.target.style.borderColor = "#c3c6d5"; e.target.style.boxShadow = "none" }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="signup-last-name"
                      className="block mb-1.5 font-medium text-[#191c1d]"
                      style={{ fontSize: "14px", lineHeight: "20px" }}
                    >
                      Last name
                    </label>
                    <input
                      id="signup-last-name"
                      type="text"
                      placeholder="Doe"
                      required
                      autoComplete="family-name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border bg-white text-[#191c1d] placeholder-[#737784] transition-all outline-none"
                      style={{ borderColor: "#c3c6d5", fontSize: "16px" }}
                      onFocus={(e) => { e.target.style.borderColor = "#0047ab"; e.target.style.boxShadow = "0 0 0 2px rgba(0,71,171,0.2)" }}
                      onBlur={(e) => { e.target.style.borderColor = "#c3c6d5"; e.target.style.boxShadow = "none" }}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="signup-email"
                    className="block mb-1.5 font-medium text-[#191c1d]"
                    style={{ fontSize: "14px", lineHeight: "20px" }}
                  >
                    Email address
                  </label>
                  <input
                    id="signup-email"
                    type="email"
                    placeholder="jane.doe@example.com"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border bg-white text-[#191c1d] placeholder-[#737784] transition-all outline-none"
                    style={{ borderColor: "#c3c6d5", fontSize: "16px" }}
                    onFocus={(e) => { e.target.style.borderColor = "#0047ab"; e.target.style.boxShadow = "0 0 0 2px rgba(0,71,171,0.2)" }}
                    onBlur={(e) => { e.target.style.borderColor = "#c3c6d5"; e.target.style.boxShadow = "none" }}
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="signup-password"
                    className="block mb-1.5 font-medium text-[#191c1d]"
                    style={{ fontSize: "14px", lineHeight: "20px" }}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 pr-12 rounded-lg border bg-white text-[#191c1d] placeholder-[#737784] transition-all outline-none"
                      style={{ borderColor: "#c3c6d5", fontSize: "16px" }}
                      onFocus={(e) => { e.target.style.borderColor = "#0047ab"; e.target.style.boxShadow = "0 0 0 2px rgba(0,71,171,0.2)" }}
                      onBlur={(e) => { e.target.style.borderColor = "#c3c6d5"; e.target.style.boxShadow = "none" }}
                    />
                    <button
                      type="button"
                      aria-label="Toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#434653] hover:text-[#0047ab] transition-colors focus:outline-none"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <p className="mt-1.5 text-[#434653]" style={{ fontSize: "12px", lineHeight: "16px", letterSpacing: "0.02em" }}>
                    Must be at least 8 characters.
                  </p>
                </div>

                {/* Terms */}
                <div className="flex items-start pt-2">
                  <div className="flex items-center h-5">
                    <input
                      id="signup-terms"
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="w-4 h-4 rounded cursor-pointer"
                      style={{ accentColor: "#0047ab", borderColor: "#c3c6d5" }}
                    />
                  </div>
                  <label
                    htmlFor="signup-terms"
                    className="ml-3 text-[#434653] cursor-pointer"
                    style={{ fontSize: "16px", lineHeight: "24px" }}
                  >
                    I agree to the{" "}
                    <Link href="/terms" className="text-[#0047ab] hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-[#0047ab] hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </label>
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <button
                    id="signup-submit"
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-lg text-white font-semibold transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ backgroundColor: "#0047ab", fontSize: "14px", lineHeight: "20px" }}
                    onMouseEnter={(e) => !isLoading && ((e.target as HTMLElement).style.backgroundColor = "#00327d")}
                    onMouseLeave={(e) => !isLoading && ((e.target as HTMLElement).style.backgroundColor = "#0047ab")}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Create account"
                    )}
                  </button>
                </div>
              </form>

              {/* Divider */}
              <div className="mt-8 relative">
                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" style={{ borderColor: "#c3c6d5" }} />
                </div>
                <div className="relative flex justify-center">
                  <span
                    className="px-3 bg-white text-[#434653]"
                    style={{ fontSize: "12px", lineHeight: "16px", letterSpacing: "0.02em" }}
                  >
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Google */}
              <div className="mt-6">
                <button
                  id="signup-google"
                  type="button"
                  onClick={handleGoogleSignUp}
                  disabled={isGoogleLoading}
                  className="flex items-center justify-center w-full px-4 py-2.5 border rounded-lg bg-white transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ borderColor: "#c3c6d5" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#f3f4f5")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#ffffff")}
                >
                  {isGoogleLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin text-[#434653]" />
                  ) : (
                    <>
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      <span className="ml-2 font-medium text-[#2f3647]" style={{ fontSize: "14px", lineHeight: "20px" }}>
                        Google
                      </span>
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {!success && (
          <div
            className="px-6 py-6 border-t flex flex-col items-center justify-center space-y-2 text-center mt-auto"
            style={{ borderColor: "#e1e3e4" }}
          >
            <p className="text-[#434653]" style={{ fontSize: "16px", lineHeight: "24px" }}>
              Already have an account?{" "}
              <Link
                href="/signin"
                className="font-medium text-[#0047ab] hover:text-[#00327d] hover:underline transition-colors"
                style={{ fontSize: "14px", lineHeight: "20px" }}
              >
                Sign in
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
