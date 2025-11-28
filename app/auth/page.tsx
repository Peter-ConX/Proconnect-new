"use client"

import { useState } from "react"
import Link from "next/link"
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"
import { ThemeSwitcher } from "@/components/theme/theme-switcher"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Logo Background Section */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-sky-400 to-sky-600 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-5xl font-bold text-white bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Proconnect
          </div>
        </div>
        <div className="absolute bottom-8 left-8 text-white/80 text-sm">
          <p>Connect. Collaborate. Grow.</p>
        </div>
      </div>

      {/* Auth Form Section */}
      <div className="w-full md:w-1/2 flex flex-col p-8 md:p-12 relative">
        <div className="absolute top-4 right-4">
          <ThemeSwitcher />
        </div>

        <div className="md:hidden text-3xl font-bold mb-8 text-center bg-gradient-to-r from-sky-500 to-orange-500 bg-clip-text text-transparent">
          Proconnect
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{isLogin ? "Welcome back" : "Create your account"}</h1>
            <p className="text-muted-foreground">
              {isLogin
                ? "Enter your credentials to access your account"
                : "Fill out the form to get started with Proconnect"}
            </p>
          </div>

          {isLogin ? <LoginForm /> : <SignupForm />}

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 font-medium"
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>
          </div>

          <div className="mt-8 text-center text-xs text-muted-foreground">
            <p>
              By continuing, you agree to our{" "}
              <Link href="/terms" className="underline hover:text-foreground">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline hover:text-foreground">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
