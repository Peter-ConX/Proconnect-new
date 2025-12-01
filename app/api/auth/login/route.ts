import { NextRequest, NextResponse } from "next/server"
import { getUser } from "@/lib/user-storage"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // In production, fetch from Supabase and verify password hash
    const user = getUser(email)

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // In production, use bcrypt or similar to verify hashed password
    if (user.password !== password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Return user data
    return NextResponse.json({
      success: true,
      user: {
        email: user.email,
        needsPasswordChange: user.needsPasswordChange,
      },
    })
  } catch (error: any) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Failed to login" }, { status: 500 })
  }
}
