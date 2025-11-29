import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/context/language-context"
import { Navigation } from "@/components/navigation"
import { FloatingChatButton } from "@/components/petrix/floating-chat-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Proconnect",
  description: "A professional networking platform",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Navigation />
            <main className="pt-16 md:pl-64 min-h-screen bg-background">
              <div className="container mx-auto px-4 py-6">{children}</div>
            </main>
            <FloatingChatButton />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
