"use client"
import { Switch } from "@/components/ui/switch"
import type { PricingPeriod } from "@/lib/pricing/types"

interface PricingToggleProps {
  period: PricingPeriod
  onChange: (period: PricingPeriod) => void
}

export function PricingToggle({ period, onChange }: PricingToggleProps) {
  const isYearly = period === "yearly"

  return (
    <div className="flex flex-col items-center justify-center space-y-2 mb-8">
      <div className="flex items-center space-x-2">
        <span className={`text-sm font-medium ${!isYearly ? "text-primary" : "text-muted-foreground"}`}>Monthly</span>
        <Switch
          checked={isYearly}
          onCheckedChange={(checked) => onChange(checked ? "yearly" : "monthly")}
          aria-label="Toggle pricing period"
        />
        <span className={`text-sm font-medium ${isYearly ? "text-primary" : "text-muted-foreground"}`}>Yearly</span>
      </div>
      {isYearly && (
        <div className="text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full">
          Save 10% with annual billing
        </div>
      )}
    </div>
  )
}
