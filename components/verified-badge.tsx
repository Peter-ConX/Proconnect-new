"use client"

import { Building, Star, Sparkles } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export type VerificationType = "organization" | "high-profile" | "premium" | null

interface VerifiedBadgeProps {
  type: VerificationType
  size?: "sm" | "md" | "lg"
  showTooltip?: boolean
  className?: string
}

export function VerifiedBadge({ type, size = "md", showTooltip = true, className }: VerifiedBadgeProps) {
  if (!type) return null

  const sizeClasses = {
    sm: "h-3.5 w-3.5",
    md: "h-4.5 w-4.5",
    lg: "h-5.5 w-5.5",
  }

  const iconSize = {
    sm: 10,
    md: 12,
    lg: 14,
  }

  const getBadgeContent = () => {
    switch (type) {
      case "organization":
        return {
          icon: <Building size={iconSize[size]} className="text-white" />,
          tooltip: "Verified Organization",
          className: "bg-blue-500 text-white",
          shape: "hexagon", // Hexagon
        }
      case "high-profile":
        return {
          icon: <Star size={iconSize[size]} className="text-white" />,
          tooltip: "High-Profile Individual",
          className: "bg-amber-500 text-white",
          shape: "rounded-full", // Circle with star shape inside
        }
      case "premium":
        return {
          icon: <Sparkles size={iconSize[size]} className="text-white" />,
          tooltip: "Premium Member",
          className: "bg-gray-400 text-white",
          shape: "rounded-full", // Circle
        }
      default:
        return null
    }
  }

  const badgeContent = getBadgeContent()
  if (!badgeContent) return null

  const badge = (
    <div
      className={cn(
        "flex items-center justify-center",
        sizeClasses[size],
        badgeContent.className,
        badgeContent.shape,
        className,
      )}
      style={
        badgeContent.shape === "hexagon"
          ? { clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }
          : undefined
      }
    >
      {badgeContent.icon}
    </div>
  )

  if (showTooltip) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <span className="inline-flex ml-1">{badge}</span>
          </TooltipTrigger>
          <TooltipContent side="top" className="text-xs font-medium">
            {badgeContent.tooltip}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return <span className="inline-flex ml-1">{badge}</span>
}
