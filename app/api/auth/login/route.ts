import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/utils/supabase/client"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Authenticate with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase(),
      password,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 })
    }

    const user = data.user
    
    // Check if profile needs password change (metadata or database query)
    const needsPasswordChange = user?.user_metadata?.needsPasswordChange ?? false

    // Return authenticated user data
    return NextResponse.json({
      success: true,
      user: {
        email: user?.email,
        id: user?.id,
        needsPasswordChange,
      },
    })
  } catch (error: any) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Failed to login" }, { status: 500 })
  }
}
