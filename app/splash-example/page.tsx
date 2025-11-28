"use client"

import { useState, useEffect } from "react"
import { LoadingScreen } from "@/components/loading-screen"

export default function SplashExample() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <LoadingScreen isLoading={isLoading} />

      {!isLoading && (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <h1 className="text-3xl font-bold mb-4 text-center">Welcome to Proconnect</h1>
          <p className="text-gray-500 text-center max-w-md">Your professional networking platform is ready to use.</p>
        </div>
      )}
    </>
  )
}
