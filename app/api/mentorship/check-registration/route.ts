import { NextRequest, NextResponse } from "next/server"
import { checkMenteeRegistration } from "@/lib/mentorship-storage"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const mentorId = searchParams.get("mentorId")
    const email = searchParams.get("email")

    if (!mentorId || !email) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 })
    }

    const mentee = checkMenteeRegistration(mentorId, email)

    return NextResponse.json({ isRegistered: !!mentee, mentee })
  } catch (error: any) {
    console.error("Check registration error:", error)
    return NextResponse.json({ error: "Failed to check registration" }, { status: 500 })
  }
}
