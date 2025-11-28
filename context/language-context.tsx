"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Language {
  code: string
  name: string
  flag: string
}

interface LanguageContextType {
  selectedLanguage: Language
  setSelectedLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
]

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [selectedLanguage, setSelectedLanguageState] = useState<Language>(languages[0])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("preferred-language")
    if (saved) {
      const found = languages.find((l) => l.code === saved)
      if (found) {
        setSelectedLanguageState(found)
        document.documentElement.lang = found.code
      }
    } else {
      // Set default language in localStorage
      localStorage.setItem("preferred-language", languages[0].code)
    }
    setMounted(true)
  }, [])

  const setSelectedLanguage = (language: Language) => {
    setSelectedLanguageState(language)
    localStorage.setItem("preferred-language", language.code)
    document.documentElement.lang = language.code
  }

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
