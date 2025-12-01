// Shared user storage for auth routes
// In production, this would use Supabase or another database

export interface UserData {
  email: string
  password: string
  needsPasswordChange: boolean
}

// In-memory storage - in production, use database
export const userStorage: Map<string, UserData> = new Map()

export function createUser(email: string, password: string): UserData {
  const userData: UserData = {
    email: email.toLowerCase(),
    password, // In production, hash this!
    needsPasswordChange: true,
  }
  userStorage.set(email.toLowerCase(), userData)
  return userData
}

export function getUser(email: string): UserData | undefined {
  return userStorage.get(email.toLowerCase())
}

export function updateUser(email: string, updates: Partial<UserData>): UserData | undefined {
  const user = userStorage.get(email.toLowerCase())
  if (!user) return undefined

  const updated = { ...user, ...updates }
  userStorage.set(email.toLowerCase(), updated)
  return updated
}

