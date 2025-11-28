"use client"

import type { Message } from "@/lib/petrix/types"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { User } from "lucide-react"
import { PetrixIcon } from "./petrix-icon"

interface ChatMessageProps {
  message: Message
  isLatest: boolean
}

export function ChatMessage({ message, isLatest }: ChatMessageProps) {
  const messageRef = useRef<HTMLDivElement>(null)
  const isUser = message.role === "user"

  useEffect(() => {
    if (isLatest && messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [isLatest, message.content])

  return (
    <motion.div
      ref={messageRef}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`flex items-start max-w-[80%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        <div
          className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${isUser ? "bg-primary ml-2" : "bg-secondary mr-2"}`}
        >
          {isUser ? <User size={16} className="text-white" /> : <PetrixIcon className="h-4 w-4 text-white" />}
        </div>
        <div
          className={`p-3 rounded-lg ${
            isUser
              ? "bg-primary text-primary-foreground rounded-tr-none"
              : "bg-secondary/20 text-foreground rounded-tl-none"
          }`}
        >
          <div className="whitespace-pre-wrap">{message.content}</div>
          <div className={`text-xs mt-1 ${isUser ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
            {new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
