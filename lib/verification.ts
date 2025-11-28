import type { User } from "@/types/user"

export function getVerificationType(user: User | null | undefined) {
  if (!user) return null

  // Check if user is an organization
  if (user.isOrganization) {
    return "organization"
  }

  // Check if user is a high-profile individual
  if (user.isHighProfile) {
    return "high-profile"
  }

  // Check if user is a premium member
  if (user.isPremium) {
    return "premium"
  }

  return null
}
