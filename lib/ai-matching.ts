// AI-powered matching algorithm
// In production, this would use ML models or advanced algorithms

interface UserProfile {
  id: string
  skills: string[]
  goals: string[]
  experience: string
  interests: string[]
}

interface MatchResult {
  userId: string
  matchScore: number
  reason: string
  type: "mentor" | "job" | "collaborator"
}

export function findMentorMatches(userProfile: UserProfile, mentors: UserProfile[]): MatchResult[] {
  return mentors
    .map((mentor) => {
      // Calculate skill overlap
      const skillOverlap = userProfile.skills.filter((skill) =>
        mentor.skills.some((mSkill) => mSkill.toLowerCase().includes(skill.toLowerCase()))
      ).length

      // Calculate goal alignment
      const goalAlignment = userProfile.goals.filter((goal) =>
        mentor.interests.some((interest) => interest.toLowerCase().includes(goal.toLowerCase()))
      ).length

      // Calculate match score (0-100)
      const skillScore = (skillOverlap / Math.max(userProfile.skills.length, 1)) * 50
      const goalScore = (goalAlignment / Math.max(userProfile.goals.length, 1)) * 50
      const matchScore = Math.min(100, skillScore + goalScore)

      return {
        userId: mentor.id,
        matchScore: Math.round(matchScore),
        reason: `Matches ${skillOverlap} skills and ${goalAlignment} goals`,
        type: "mentor" as const,
      }
    })
    .filter((match) => match.matchScore > 30)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5)
}

export function findJobMatches(userProfile: UserProfile, jobs: any[]): MatchResult[] {
  return jobs
    .map((job) => {
      const requiredSkills = job.skills || []
      const skillMatch = userProfile.skills.filter((skill) =>
        requiredSkills.some((reqSkill: string) =>
          reqSkill.toLowerCase().includes(skill.toLowerCase())
        )
      ).length

      const matchScore = (skillMatch / Math.max(requiredSkills.length, 1)) * 100

      return {
        userId: job.id,
        matchScore: Math.round(matchScore),
        reason: `Matches ${skillMatch} of ${requiredSkills.length} required skills`,
        type: "job" as const,
      }
    })
    .filter((match) => match.matchScore > 40)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5)
}

export function findCollaboratorMatches(userProfile: UserProfile, users: UserProfile[]): MatchResult[] {
  return users
    .map((user) => {
      // Find complementary skills (skills user doesn't have)
      const complementarySkills = user.skills.filter(
        (skill) => !userProfile.skills.some((uSkill) => uSkill.toLowerCase().includes(skill.toLowerCase()))
      )

      const matchScore = Math.min(100, complementarySkills.length * 15)

      return {
        userId: user.id,
        matchScore: Math.round(matchScore),
        reason: `Offers ${complementarySkills.length} complementary skills`,
        type: "collaborator" as const,
      }
    })
    .filter((match) => match.matchScore > 20)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5)
}

