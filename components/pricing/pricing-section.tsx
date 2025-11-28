"use client"

import { PricingCards } from "./pricing-cards"

interface PricingSectionProps {
  className?: string
}

export function PricingSection({ className }: PricingSectionProps) {
  return (
    <section className={className}>
      <PricingCards />
    </section>
  )
}
