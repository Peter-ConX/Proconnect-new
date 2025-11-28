"use client"

import { useEffect, useState } from "react"

export function TypingIndicator() {
  const [dots, setDots] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return ""
        return prev + "."
      })
    }, 300)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center space-x-2 p-2 rounded-lg bg-primary/10 w-16">
      <div className="flex space-x-1">
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }}></div>
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }}></div>
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }}></div>
      </div>
    </div>
  )
}
