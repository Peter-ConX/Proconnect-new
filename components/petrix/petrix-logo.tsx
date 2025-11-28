import { cn } from "@/lib/utils"

interface PetrixLogoProps {
  className?: string
  variant?: "default" | "light" | "dark"
  size?: "sm" | "md" | "lg" | "xl"
}

export function PetrixLogo({ className, variant = "default", size = "md" }: PetrixLogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
    xl: "h-12 w-12",
  }

  // Define gradient IDs to avoid conflicts when multiple logos are used
  const gradientId = `petrix-gradient-${Math.random().toString(36).substring(2, 9)}`
  const neuralGradientId = `petrix-neural-gradient-${Math.random().toString(36).substring(2, 9)}`

  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(sizeClasses[size], className)}
      aria-label="Petrix AI Assistant Logo"
    >
      <defs>
        {/* Main gradient for the circle */}
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          {variant === "light" ? (
            <>
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E1E9FF" />
            </>
          ) : variant === "dark" ? (
            <>
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </>
          )}
        </linearGradient>

        {/* Neural network gradient */}
        <linearGradient id={neuralGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          {variant === "light" ? (
            <>
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#64748B" />
            </>
          ) : variant === "dark" ? (
            <>
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#93C5FD" />
            </>
          )}
        </linearGradient>
      </defs>

      {/* Main circle */}
      <circle cx="50" cy="50" r="45" fill={`url(#${gradientId})`} />

      {/* Inner circle (brain/core) */}
      <circle
        cx="50"
        cy="50"
        r="20"
        fill="none"
        stroke={`url(#${neuralGradientId})`}
        strokeWidth="2"
        strokeDasharray="4 2"
      />

      {/* Neural network nodes */}
      <circle cx="50" cy="50" r="4" fill={`url(#${neuralGradientId})`} />
      <circle cx="50" cy="25" r="3" fill={`url(#${neuralGradientId})`} />
      <circle cx="75" cy="50" r="3" fill={`url(#${neuralGradientId})`} />
      <circle cx="50" cy="75" r="3" fill={`url(#${neuralGradientId})`} />
      <circle cx="25" cy="50" r="3" fill={`url(#${neuralGradientId})`} />
      <circle cx="67" cy="33" r="2.5" fill={`url(#${neuralGradientId})`} />
      <circle cx="67" cy="67" r="2.5" fill={`url(#${neuralGradientId})`} />
      <circle cx="33" cy="67" r="2.5" fill={`url(#${neuralGradientId})`} />
      <circle cx="33" cy="33" r="2.5" fill={`url(#${neuralGradientId})`} />

      {/* Neural network connections */}
      <line
        x1="50"
        y1="50"
        x2="50"
        y2="25"
        stroke={`url(#${neuralGradientId})`}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="50"
        y1="50"
        x2="75"
        y2="50"
        stroke={`url(#${neuralGradientId})`}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="50"
        y1="50"
        x2="50"
        y2="75"
        stroke={`url(#${neuralGradientId})`}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="50"
        y1="50"
        x2="25"
        y2="50"
        stroke={`url(#${neuralGradientId})`}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="50"
        y1="50"
        x2="67"
        y2="33"
        stroke={`url(#${neuralGradientId})`}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="50"
        y1="50"
        x2="67"
        y2="67"
        stroke={`url(#${neuralGradientId})`}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="50"
        y1="50"
        x2="33"
        y2="67"
        stroke={`url(#${neuralGradientId})`}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="50"
        y1="50"
        x2="33"
        y2="33"
        stroke={`url(#${neuralGradientId})`}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Outer ring with pulse effect */}
      <circle
        cx="50"
        cy="50"
        r="38"
        fill="none"
        stroke={`url(#${neuralGradientId})`}
        strokeWidth="1"
        strokeDasharray="3 3"
      >
        <animate attributeName="r" values="38;40;38" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}
