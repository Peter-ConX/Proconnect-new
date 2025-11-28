"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChatInterface } from "./chat-interface"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { PetrixIcon } from "./petrix-icon"

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close the chat when navigating to the Petrix page
  useEffect(() => {
    if (pathname === "/petrix") {
      setIsOpen(false)
    }
  }, [pathname])

  // Don't show the floating button on the Petrix page
  if (pathname === "/petrix") {
    return null
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-20 right-4 md:right-6 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-background border rounded-lg shadow-lg z-50 flex flex-col overflow-hidden"
          >
            <ChatInterface />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="fixed bottom-4 right-4 md:right-6 z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button onClick={() => setIsOpen(!isOpen)} className="h-14 w-14 rounded-full shadow-lg">
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <div className="relative">
              <PetrixIcon className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground">
                P
              </span>
            </div>
          )}
        </Button>
      </motion.div>
    </>
  )
}
