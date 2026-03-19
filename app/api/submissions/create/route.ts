import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { CreateSubmissionData } from '@/lib/data/submissions'

export async function POST(request: NextRequest) {
  try {
    const data: CreateSubmissionData = await request.json()

    // Use service role key for server-side inserts
    // This bypasses RLS and is appropriate for API endpoints
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const serviceRoleKey = process.env.SUPABASE_SECRET_KEY!

    if (!serviceRoleKey) {
      throw new Error('SUPABASE_SECRET_KEY not configured')
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    const { data: submission, error } = await supabase
      .from('submissions')
      .insert([
        {
          ...data,
          status: 'pending',
          submitted_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Submission error:', error)
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true, id: submission.id })
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
