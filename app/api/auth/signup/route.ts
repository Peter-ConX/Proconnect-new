import { NextRequest, NextResponse } from "next/server"
import { generateStrongPassword } from "@/lib/password-generator"
import { createUser, getUser } from "@/lib/user-storage"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    // Check if user already exists
    if (getUser(email)) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }

    // Generate strong password
    const generatedPassword = generateStrongPassword(16)

    // Store user (in production, use Supabase)
    createUser(email, generatedPassword)

    // Send password via email
    // In production, use a service like Resend, SendGrid, or Nodemailer
    try {
      await sendPasswordEmail(email, generatedPassword)
    } catch (emailError) {
      console.error("Failed to send email:", emailError)
      // In development, we'll log it. In production, you might want to handle this differently
    }

    return NextResponse.json({
      success: true,
      message: "Password has been sent to your email. Please check your inbox.",
    })
  } catch (error: any) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Failed to create account" }, { status: 500 })
  }
}

async function sendPasswordEmail(email: string, password: string) {
  // In production, use a real email service
  // For now, we'll just log it in development
  if (process.env.NODE_ENV === "development") {
    console.log("=".repeat(50))
    console.log("EMAIL SENT (Development Mode)")
    console.log("To:", email)
    console.log("Password:", password)
    console.log("=".repeat(50))
  }

  // Example with Resend (uncomment and configure if you have Resend set up):
  /*
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  if (!RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY not configured")
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Proconnect <noreply@proconnect.com>",
      to: email,
      subject: "Your Proconnect Account Password",
      html: `
        <h1>Welcome to Proconnect!</h1>
        <p>Your account has been created. Here is your temporary password:</p>
        <p style="font-size: 18px; font-weight: bold; background: #f0f0f0; padding: 10px; border-radius: 5px; font-family: monospace;">${password}</p>
        <p>Please log in with this password and change it immediately for security.</p>
        <p>If you didn't create this account, please ignore this email.</p>
      `,
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to send email")
  }
  */
}
