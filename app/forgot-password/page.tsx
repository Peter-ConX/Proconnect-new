import Link from "next/link"
import { Users } from "lucide-react"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa]" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <header className="p-6 flex items-center justify-between bg-white border-b border-[#e1e3e4]">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#0047ab] flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-[#191c1d] tracking-tight text-xl">ProConnect</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-[#e1e3e4]">
          <h1 className="text-2xl font-bold text-[#191c1d] mb-2">Reset Password</h1>
          <p className="text-[#434653] mb-6">
            This is a placeholder for the password reset flow. A full password reset implementation will be added in a future update.
          </p>
          
          <div className="bg-[#eff4ff] border border-[#0047ab] text-[#0047ab] p-4 rounded-lg mb-6">
            <p className="text-sm font-medium">To implement this fully, you will need to:</p>
            <ul className="list-disc ml-5 mt-2 text-sm space-y-1">
              <li>Create an API route for sending reset emails.</li>
              <li>Build a form here to collect the user's email address.</li>
              <li>Create an `/auth/callback` or `/reset-password` page to handle the reset link from the email.</li>
            </ul>
          </div>

          <Link
            href="/signin"
            className="w-full flex justify-center py-3 px-4 border border-[#c3c6d5] rounded-lg bg-white text-[#191c1d] font-semibold hover:bg-[#f3f4f5] transition-colors"
          >
            Back to Sign In
          </Link>
        </div>
      </main>
    </div>
  )
}
