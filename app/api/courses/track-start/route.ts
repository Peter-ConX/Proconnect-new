import { NextRequest, NextResponse } from "next/server"

// In production, store in Supabase
const courseProgress: Map<string, { courseId: string; startedAt: string; completed: boolean }[]> = new Map()

export async function POST(request: NextRequest) {
  try {
    const { courseId, courseUrl } = await request.json()
    const userId = "user-1" // In production, get from auth

    if (!courseId) {
      return NextResponse.json({ error: "Course ID required" }, { status: 400 })
    }

    const userProgress = courseProgress.get(userId) || []
    const existing = userProgress.find((p) => p.courseId === courseId)

    if (!existing) {
      userProgress.push({
        courseId,
        startedAt: new Date().toISOString(),
        completed: false,
      })
      courseProgress.set(userId, userProgress)
    }

    return NextResponse.json({ success: true, courseUrl })
  } catch (error: any) {
    console.error("Track start error:", error)
    return NextResponse.json({ error: "Failed to track course" }, { status: 500 })
  }
}

