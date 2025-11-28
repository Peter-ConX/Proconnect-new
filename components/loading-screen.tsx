"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface LoadingScreenProps {
  /**
   * Duration of the loading animation in milliseconds
   * @default 2000
   */
  duration?: number
  /**
   * Whether to show the loading screen
   * @default true
   */
  isLoading?: boolean
  /**
   * Custom logo URL (optional)
   */
  logoUrl?: string
  /**
   * Custom logo alt text
   * @default "Proconnect"
   */
  logoAlt?: string
  /**
   * Custom logo width
   * @default 180
   */
  logoWidth?: number
  /**
   * Custom logo height
   * @default 60
   */
  logoHeight?: number
  /**
   * Optional className for additional styling
   */
  className?: string
}

export function LoadingScreen({
  duration = 2000,
  isLoading = true,
  logoUrl,
  logoAlt = "Proconnect",
  logoWidth = 180,
  logoHeight = 60,
  className,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!isLoading) {
      setVisible(false)
      return
    }

    setVisible(true)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)

          // Add a small delay before hiding the loading screen
          setTimeout(() => {
            setVisible(false)
          }, 300)

          return 100
        }
        return prev + 1
      })
    }, duration / 100)

    return () => clearInterval(interval)
  }, [isLoading, duration])

  if (!visible) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-300",
        className,
      )}
    >
      <div className="animate-fadeIn scale-in-center">
        {logoUrl ? (
          <img
            src={logoUrl || "/placeholder.svg"}
            alt={logoAlt}
            width={logoWidth}
            height={logoHeight}
            className="mb-8"
          />
        ) : (
          <div className="mb-8 text-3xl font-bold bg-gradient-to-r from-sky-500 to-orange-500 bg-clip-text text-transparent">
            Proconnect
          </div>
        )}

        <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-500 to-orange-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
