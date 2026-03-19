import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { approveSubmission, updateSubmissionStatus } from '@/lib/data/admin-submissions'

export async function POST(request: NextRequest) {
  // Check authentication with Supabase Auth
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || user.user_metadata?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id, action, moderatorNotes } = await request.json()

  if (action === 'approve') {
    const result = await approveSubmission(id, moderatorNotes)
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }
    return NextResponse.json({ success: true, storyId: result.storyId })
  }

  if (action === 'reject') {
    const result = await updateSubmissionStatus(id, 'rejected', moderatorNotes)
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}
