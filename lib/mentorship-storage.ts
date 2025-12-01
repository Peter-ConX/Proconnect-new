// In-memory storage for mentorship data
// In production, this would use Supabase or another database

interface MenteeData {
  id: string
  email: string
  name: string
  experience: string
  registeredAt: string
  mentorId: string
  hasEnteredChat: boolean
}

const menteeStorage: Map<string, MenteeData[]> = new Map()

export function registerMentee(mentorId: string, menteeData: Omit<MenteeData, "id" | "registeredAt" | "hasEnteredChat">) {
  const mentees = menteeStorage.get(mentorId) || []
  const newMentee: MenteeData = {
    ...menteeData,
    id: Date.now().toString(),
    registeredAt: new Date().toISOString(),
    hasEnteredChat: false,
  }
  mentees.push(newMentee)
  menteeStorage.set(mentorId, mentees)
  return newMentee
}

export function getMenteesForMentor(mentorId: string): MenteeData[] {
  return menteeStorage.get(mentorId) || []
}

export function checkMenteeRegistration(mentorId: string, email: string): MenteeData | null {
  const mentees = menteeStorage.get(mentorId) || []
  return mentees.find((m) => m.email.toLowerCase() === email.toLowerCase()) || null
}

export function markMenteeEnteredChat(mentorId: string, menteeId: string) {
  const mentees = menteeStorage.get(mentorId) || []
  const mentee = mentees.find((m) => m.id === menteeId)
  if (mentee) {
    mentee.hasEnteredChat = true
    menteeStorage.set(mentorId, mentees)
  }
}
