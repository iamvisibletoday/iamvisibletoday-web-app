export interface CreateSubmissionData {
  title?: string
  text_content?: string
  photo_caption?: string
  photo_url?: string
  voice_url?: string
  has_photo: boolean
  has_voice: boolean
  author_name?: string
  author_email?: string
  include_face: boolean
  strip_exif: boolean
}

export async function createSubmission(
  data: CreateSubmissionData
): Promise<{ success: boolean; id?: string; error?: string }> {
  const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true'

  if (USE_MOCK) {
    // Simulate submission in mock mode
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return { success: true, id: 'mock-' + Date.now() }
  }

  // Use server-side API endpoint instead of direct client insert
  // This bypasses RLS issues by using the server context
  try {
    const response = await fetch('/api/submissions/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      return { success: false, error: result.error || 'Failed to create submission' }
    }

    return { success: true, id: result.id }
  } catch (err) {
    console.error('Submission creation error:', err)
    return { success: false, error: 'Network error' }
  }
}
