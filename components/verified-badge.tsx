import { Check } from "lucide-react"

export function VerifiedBadge({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <span 
      className={`inline-flex items-center justify-center bg-[#0095f6] text-white rounded-full p-0.5 shrink-0 select-none ${className}`} 
      title="Verified Professional"
    >
      <Check className="h-full w-full stroke-[4]" />
    </span>
  )
}
