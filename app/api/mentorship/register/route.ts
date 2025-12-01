import { NextRequest, NextResponse } from "next/server"
import { registerMentee } from "@/lib/mentorship-storage"

export async function POST(request: NextRequest) {
  try {
    const { mentorId, email, name, experience } = await request.json()

    if (!mentorId || !email || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const mentee = registerMentee(mentorId, {
      email,
      name,
      experience: experience || "",
      mentorId,
    })

    return NextResponse.json({ success: true, mentee })
  } catch (error: any) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Failed to register" }, { status: 500 })
  }
}

