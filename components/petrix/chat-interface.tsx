"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChatMessage } from "./chat-message"
import { TypingIndicator } from "./typing-indicator"
import { UseCaseSelector } from "./use-case-selector"
import { usePetrixChat } from "@/lib/petrix/hooks"
import { motion } from "framer-motion"
import { PetrixLogo } from "./petrix-logo"

export function ChatInterface() {
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { messages, isLoading, error, useCase, sendMessage, setUseCase, clearChat } = usePetrixChat()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      sendMessage(input)
      setInput("")
    }
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  useEffect(() => {
    // Focus input when component mounts
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <PetrixLogo size="md" />
          <h2 className="text-xl font-semibold">Petrix</h2>
        </div>
        <div className="flex items-center space-x-2">
          <UseCaseSelector value={useCase} onChange={setUseCase} />
          <Button variant="ghost" size="icon" onClick={clearChat} title="Clear chat">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <PetrixLogo size="xl" className="mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Welcome to Petrix</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Your AI assistant for professional guidance. Ask me anything about careers, resumes, skills, or the
              Proconnect platform.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-lg">
              {[
                "How can I improve my resume?",
                "What skills are in demand for UX designers?",
                "Tips for networking on Proconnect",
                "How to prepare for a technical interview",
              ].map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  className="justify-start text-left h-auto py-2"
                  onClick={() => {
                    setInput(suggestion)
                    if (inputRef.current) {
                      inputRef.current.focus()
                    }
                  }}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <ChatMessage key={message.id} message={message} isLatest={index === messages.length - 1} />
            ))}
          </>
        )}
        {isLoading && (
          <div className="flex justify-start">
            <TypingIndicator />
          </div>
        )}
        {error && <div className="p-3 rounded-lg bg-destructive/10 text-destructive">{error}</div>}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <motion.div
        className="p-4 border-t"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Petrix something..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={!input.trim() || isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </motion.div>
    </div>
  )
}
