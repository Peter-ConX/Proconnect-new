import { PricingCards } from "@/components/pricing/pricing-cards"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing | Proconnect",
  description: "Choose the right Proconnect plan for your professional journey",
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 pt-16">
      <PricingCards />
    </main>
  )
}
