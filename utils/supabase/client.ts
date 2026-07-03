import { createClient } from "@supabase/supabase-js"

// Use placeholder strings during the build phase to prevent "supabaseUrl is required" errors.
// At runtime, Next.js will inject the actual configured environment variables.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
