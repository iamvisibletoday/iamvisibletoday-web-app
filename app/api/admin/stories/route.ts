import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createAdminClient } from '@/lib/supabase/admin'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll() {},
        },
      }
    )

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get filter parameters
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get('search') || ''
    const showDeleted = searchParams.get('showDeleted') === 'true'
    const sortBy = searchParams.get('sortBy') || 'published_date'
    const order = searchParams.get('order') || 'desc'

    // Use admin client to see all stories (including deleted)
    const adminClient = createAdminClient()
    let query = adminClient.from('stories').select('*')

    // Filter by search if provided
    if (search) {
      query = query.or(`title.ilike.%${search}%,text_content.ilike.%${search}%`)
    }

    // Filter deleted status if needed
    if (!showDeleted) {
      query = query.is('deleted_at', null)
    }

    // Sort
    query = query.order(sortBy, { ascending: order === 'asc' })

    const { data, error } = await query

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch stories' },
        { status: 500 }
      )
    }

    return NextResponse.json({ stories: data || [] })
  } catch (err) {
    console.error('Error fetching stories:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
