// Database types matching Supabase schema

export type ContentType = 'text' | 'photo' | 'voice' | 'combined'
export type SubmissionStatus = 'pending' | 'approved' | 'rejected'

export interface Story {
  id: string
  slug: string
  title: string
  text_content: string | null
  photo_caption: string | null
  photo_url: string | null
  voice_url: string | null
  content_type: ContentType
  author_name: string | null
  has_content_warning: boolean
  warning_text: string | null
  view_count: number
  seen_count: number
  relate_count: number
  published_date: string
  created_at: string
  updated_at: string
  meta_description: string | null
}

export interface Submission {
  id: string
  text_content: string | null
  photo_caption: string | null
  photo_url: string | null
  voice_url: string | null
  has_photo: boolean
  has_voice: boolean
  author_name: string | null
  author_email: string | null
  include_face: boolean
  strip_exif: boolean
  status: SubmissionStatus
  moderator_notes: string | null
  submitted_at: string
  reviewed_at: string | null
  ip_address: string | null
  user_agent: string | null
  slug?: string | null // Story slug if approved
  title?: string | null // Story title if approved
}

export interface StoryFilters {
  contentType?: ContentType
  search?: string
}

export interface PaginationParams {
  limit: number
  cursor?: string // published_date for cursor-based pagination
}

// Partial story type used for navigation links
export interface StoryLink {
  id: string
  slug: string
  title: string
}
