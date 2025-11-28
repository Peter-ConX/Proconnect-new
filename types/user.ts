export interface User {
  id: string
  name: string
  handle: string
  avatar?: string
  role?: string
  isOrganization?: boolean
  isHighProfile?: boolean
  isPremium?: boolean
}
