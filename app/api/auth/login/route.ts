import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/utils/supabase/client"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email/username and password are required" }, { status: 400 })
    }

    let loginEmail = email.toLowerCase()

    // If it doesn't look like an email, try resolving it as a username
    if (!loginEmail.includes('@')) {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('email')
        .eq('username', loginEmail)
        .single()
        
      if (profile && profile.email) {
        loginEmail = profile.email
      }
    }

    // Authenticate with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 })
    }

    const user = data.user
    const needsPasswordChange = user?.user_metadata?.needsPasswordChange ?? false

    return NextResponse.json({
      success: true,
      session: data.session,
      user: {
        email: user?.email,
        id: user?.id,
        needsPasswordChange,
      },
    })
  } catch (error: any) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "An unexpected error occurred during login" }, { status: 500 })
  }
}
