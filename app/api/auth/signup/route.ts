import { NextRequest, NextResponse } from "next/server"
import { generateStrongPassword } from "@/lib/password-generator"
import { supabase } from "@/utils/supabase/client"

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }
    if (!password || password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }

    // Register user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase(),
      password: password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`,
        },
      },
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    const user = data.user

    // Create a public profile entry if user exists
    if (user) {
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: user.id,
          username: email.split("@")[0].toLowerCase() + Math.floor(Math.random() * 1000),
          full_name: `${firstName} ${lastName}`,
          email: email.toLowerCase(),
          avatar_url: "/placeholder.svg",
          role: "user",
          is_verified: false,
        })
      
      if (profileError) {
        console.warn("Profile insertion warning:", profileError.message)
      }
    }

    return NextResponse.json({
      success: true,
      session: data.session,
      user: data.user,
    })
  } catch (error: any) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Failed to create account" }, { status: 500 })
  }
}

async function sendPasswordEmail(email: string, password: string) {
  // In development, log the temporary password so the admin/user can see it
  console.log("=".repeat(50))
  console.log("TEMPORARY PASSWORD FOR:", email)
  console.log("Password:", password)
  console.log("=".repeat(50))
}
