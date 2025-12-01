"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export function ThemeTransition() {
  const { theme } = useTheme()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [prevTheme, setPrevTheme] = useState<string | undefined>(theme)

  useEffect(() => {
    if (theme && theme !== prevTheme && prevTheme) {
      setIsTransitioning(true)
      const timer = setTimeout(() => {
        setIsTransitioning(false)
      }, 600) // Match animation duration

      return () => clearTimeout(timer)
    }
    setPrevTheme(theme)
  }, [theme, prevTheme])

  if (!isTransitioning) return null

  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{
        background: `radial-gradient(circle at center, transparent 0%, var(--transition-color) 100%)`,
        animation: "themeTransition 0.6s ease-out forwards",
      }}
    />
  )
}
