import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createAdminClient } from '@/lib/supabase/admin'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const { requestId, reason } = await request.json()

    if (!requestId) {
      return NextResponse.json(
        { error: 'Request ID is required' },
        { status: 400 }
      )
    }

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

    // Use admin client to update the deletion request
    const adminClient = createAdminClient()

    // Update deletion request status to rejected
    const { error: updateError } = await adminClient
      .from('deletion_requests')
      .update({
        status: 'rejected',
        reviewed_by: user.id,
        reviewed_at: new Date().toISOString(),
        admin_notes: reason || 'Request rejected by admin',
      })
      .eq('id', requestId)

    if (updateError) {
      return NextResponse.json(
        { error: 'Failed to reject deletion request' },
        { status: 500 }
      )
    }

    console.log(`[Rejected] Deletion request: ${requestId}`)

    return NextResponse.json({
      success: true,
      message: 'Deletion request rejected',
    })
  } catch (err) {
    console.error('Error rejecting deletion request:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
