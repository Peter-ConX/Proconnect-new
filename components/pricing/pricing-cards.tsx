"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"
import { PricingToggle } from "./pricing-toggle"
import { SubscriptionModal } from "./subscription-modal"
import { PRICING_PLANS } from "@/lib/pricing/constants"
import type { PricingPeriod } from "@/lib/pricing/types"
import { cn } from "@/lib/utils"

export function PricingCards() {
  const [pricingPeriod, setPricingPeriod] = useState<PricingPeriod>("monthly")
  const [modalOpen, setModalOpen] = useState(false)
  const [modalStatus, setModalStatus] = useState<"success" | "error">("success")
  const [selectedPlan, setSelectedPlan] = useState<string>("")

  const handleSubscribe = (planId: string) => {
    // In a real implementation, this would integrate with Stripe or Paystack
    setSelectedPlan(planId)
    // Simulate a successful subscription 90% of the time
    const isSuccess = Math.random() > 0.1
    setModalStatus(isSuccess ? "success" : "error")
    setModalOpen(true)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Path on Proconnect</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Whether you're building, mentoring, hiring, or creating — there's a plan for you.
        </p>
      </div>

      <PricingToggle period={pricingPeriod} onChange={setPricingPeriod} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRICING_PLANS.map((plan) => {
          const price = pricingPeriod === "monthly" ? plan.monthlyPrice : plan.yearlyPrice
          const planName = PRICING_PLANS.find((p) => p.id === plan.id)?.name || ""

          return (
            <Card
              key={plan.id}
              className={cn(
                "flex flex-col transition-all duration-200 hover:shadow-lg",
                plan.popular && "border-primary shadow-md scale-[1.02]",
              )}
            >
              <CardHeader className="pb-8">
                {plan.badge && (
                  <Badge className="w-fit mb-2" variant="secondary">
                    {plan.badge}
                  </Badge>
                )}
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{formatPrice(price)}</span>
                  <span className="text-muted-foreground ml-1">/{pricingPeriod === "monthly" ? "month" : "year"}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      {feature.included ? (
                        <Check className={cn("h-5 w-5 mr-2 text-green-500", feature.highlight && "text-primary")} />
                      ) : (
                        <X className="h-5 w-5 mr-2 text-muted-foreground" />
                      )}
                      <span className={cn("text-sm", feature.highlight && "font-medium text-primary")}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handleSubscribe(plan.id)}
                >
                  {plan.callToAction}
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      <SubscriptionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        status={modalStatus}
        planName={PRICING_PLANS.find((p) => p.id === selectedPlan)?.name}
      />
    </div>
  )
}
