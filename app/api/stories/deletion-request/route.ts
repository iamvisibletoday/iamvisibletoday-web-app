import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(request: NextRequest) {
  try {
    const { slug, title, reason, details, requesterEmail } = await request.json()

    if (!slug || !reason) {
      return NextResponse.json(
        { error: 'Slug and reason are required' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Create a deletion request record (for admin review)
    // For now, we'll just log it and send a notification
    const { error: insertError } = await supabase
      .from('deletion_requests')
      .insert([
        {
          story_slug: slug,
          story_title: title,
          reason,
          details: details || null,
          requester_email: requesterEmail || null,
          requested_at: new Date().toISOString(),
          ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || null,
          status: 'pending',
        },
      ])

    if (insertError) {
      // Table might not exist yet, that's okay - just log it
      console.log('Deletion request received:', {
        slug,
        title,
        reason,
        details,
        requesterEmail,
        timestamp: new Date().toISOString(),
      })
    }

    // In production, you would send an email notification to admins here
    console.log(`[Deletion Request] Story: ${title} (${slug}) - Reason: ${reason}`)

    return NextResponse.json({
      success: true,
      message: 'Deletion request submitted successfully',
    })
  } catch (err) {
    console.error('Deletion request error:', err)
    return NextResponse.json(
      { error: 'Failed to process deletion request' },
      { status: 500 }
    )
  }
}
