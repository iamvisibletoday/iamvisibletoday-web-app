import { NextRequest, NextResponse } from 'next/server'
import { softDeleteStory, hardDeleteStory } from '@/lib/data/admin-stories'

export async function POST(request: NextRequest) {
  try {
    const { slug, deletionType, reason } = await request.json()

    if (!slug || !deletionType) {
      return NextResponse.json(
        { error: 'slug and deletionType are required' },
        { status: 400 }
      )
    }

    if (deletionType === 'soft') {
      if (!reason) {
        return NextResponse.json(
          { error: 'reason is required for soft delete' },
          { status: 400 }
        )
      }

      const result = await softDeleteStory(slug, reason)
      return NextResponse.json(result)
    } else if (deletionType === 'hard') {
      const result = await hardDeleteStory(slug)
      return NextResponse.json(result)
    } else {
      return NextResponse.json(
        { error: 'deletionType must be "soft" or "hard"' },
        { status: 400 }
      )
    }
  } catch (err) {
    console.error('Story deletion error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
