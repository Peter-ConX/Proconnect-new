"use client"

import { useState, useEffect } from "react"
import { LoadingScreen } from "@/components/loading-screen"
import { Button } from "@/components/ui/button"

export default function LoadingDemo() {
  const [isLoading, setIsLoading] = useState(true)

  // Auto-hide the loading screen after 3 seconds for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <LoadingScreen isLoading={isLoading} />

      <h1 className="text-3xl font-bold mb-8 text-center">Loading Screen Demo</h1>

      <div className="flex flex-col gap-4 items-center">
        <Button onClick={() => setIsLoading(true)} className="bg-sky-500 hover:bg-sky-600">
          Show Loading Screen
        </Button>

        <p className="text-gray-500 text-center max-w-md mt-4">
          Click the button above to show the loading screen again. The progress bar will automatically complete in 2
          seconds.
        </p>
      </div>
    </div>
  )
}
