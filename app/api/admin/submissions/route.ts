import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { SubmissionStatus } from '@/types/database'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = (searchParams.get('status') as SubmissionStatus) || 'pending'
    const limit = Number.parseInt(searchParams.get('limit') || '20')

    // Use service role key for admin operations
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

    let query = supabase
      .from('submissions')
      .select('*')
      .order('submitted_at', { ascending: false })
      .limit(limit + 1)

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const hasMore = (data?.length || 0) > limit
    const submissions = hasMore ? (data?.slice(0, -1) ?? []) : (data ?? [])

    return NextResponse.json({ submissions, hasMore })
  } catch (err) {
    console.error('Error fetching submissions:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
