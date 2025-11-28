import { ChatInterface } from "@/components/petrix/chat-interface"

export const metadata = {
  title: "Petrix - AI Assistant | Proconnect",
  description: "Get professional guidance and insights with Petrix, your AI career assistant",
}

export default function PetrixPage() {
  return (
    <div className="container mx-auto p-4 h-[calc(100vh-64px)]">
      <div className="bg-background border rounded-lg shadow-sm h-full overflow-hidden">
        <ChatInterface />
      </div>
    </div>
  )
}
