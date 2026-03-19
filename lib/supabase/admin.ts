import { createClient } from '@supabase/supabase-js'

// Admin client using secret key - USE SPARINGLY
// Prefer RLS policies with auth context instead of bypassing RLS
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const secretKey = process.env.SUPABASE_SECRET_KEY!

  if (!secretKey) {
    throw new Error('SUPABASE_SECRET_KEY is not set')
  }

  return createClient(supabaseUrl, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Use this only for operations that truly need to bypass RLS
// Most admin operations should use server client with auth context
