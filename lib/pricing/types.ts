export type PricingPeriod = "monthly" | "yearly"

export type PlanBadge = "Most Popular" | "Best Value" | "Best for Mentors" | "Best for Creators"

export interface PricingFeature {
  name: string
  included: boolean
  highlight?: boolean
}

export interface PricingPlan {
  id: string
  name: string
  description: string
  badge?: PlanBadge
  monthlyPrice: number
  yearlyPrice: number
  features: PricingFeature[]
  callToAction: string
  popular?: boolean
}

export interface SubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
  status: "success" | "error"
  planName?: string
}
