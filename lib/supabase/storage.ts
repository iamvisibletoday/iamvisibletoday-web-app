import { supabase } from './client'

function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  const extension = originalName.split('.').pop() || 'bin'
  return `${timestamp}-${random}.${extension}`
}

/**
 * Upload photo and return STORAGE PATH (not public URL)
 * Client will request signed URL separately via API
 */
export async function uploadPhoto(file: File | Blob): Promise<string> {
  const filename = generateUniqueFilename(
    file instanceof File ? file.name : 'photo.jpg'
  )
  const path = `submissions/${filename}`

  const { error } = await supabase.storage
    .from('photos')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) throw new Error(`Photo upload failed: ${error.message}`)

  // Return STORAGE PATH, not public URL
  return path
}

/**
 * Upload voice note and return STORAGE PATH (not public URL)
 */
export async function uploadVoice(file: Blob): Promise<string> {
  const filename = generateUniqueFilename('voice-note.webm')
  const path = `submissions/${filename}`

  const { error } = await supabase.storage
    .from('voice-notes')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: 'audio/webm',
    })

  if (error) throw new Error(`Voice upload failed: ${error.message}`)

  // Return STORAGE PATH, not public URL
  return path
}

/**
 * Delete file from storage (for hard delete operations)
 */
export async function deleteStorageFile(
  bucket: 'photos' | 'voice-notes',
  path: string
): Promise<void> {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path])

  if (error) {
    console.error(`Error deleting ${bucket} file:`, error)
    // Don't throw - file may already be deleted
  }
}
