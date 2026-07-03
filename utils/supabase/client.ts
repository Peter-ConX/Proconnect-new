import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://rnzwlvappnzdqlbyxzkf.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuendsdmFwcG56ZHFsYnl4emtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwODc0NTUsImV4cCI6MjA5ODY2MzQ1NX0.x30MiFTbgZtKlqISbnfwFYpqloEhfVFmFq4hmENLEYE"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
