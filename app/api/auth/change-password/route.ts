import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/utils/supabase/client"

export async function POST(request: NextRequest) {
  try {
    const { email, currentPassword, newPassword } = await request.json()

    if (!email || !currentPassword || !newPassword) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }

    // 1. Authenticate with Supabase using current password
    const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase(),
      password: currentPassword,
    })

    if (signInError) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 })
    }

    // 2. Set new password and update metadata (using the active session or service client)
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
      data: { needsPasswordChange: false },
    })

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 })
    }

    // Sign out to clear the session
    await supabase.auth.signOut()

    return NextResponse.json({
      success: true,
      message: "Password changed successfully",
    })
  } catch (error: any) {
    console.error("Change password error:", error)
    return NextResponse.json({ error: "Failed to change password" }, { status: 500 })
  }
}
