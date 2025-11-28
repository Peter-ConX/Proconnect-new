import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { Sidebar } from "@/components/sidebar"
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
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Navigation />
          <div className="flex pt-16">
            <Sidebar />
            <main className="flex-1 md:ml-64 min-h-screen bg-gray-50">
              <div className="container mx-auto px-4 py-6">{children}</div>
            </main>
          </div>
          <FloatingChatButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
