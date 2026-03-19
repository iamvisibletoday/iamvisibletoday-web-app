import piexif from 'piexifjs'

export async function stripExifData(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const dataUrl = e.target?.result as string

        // Only JPEG files have EXIF data
        if (!dataUrl.startsWith('data:image/jpeg')) {
          resolve(file)
          return
        }

        const stripped = piexif.remove(dataUrl)

        // Convert data URL back to Blob
        const byteString = atob(stripped.split(',')[1])
        const mimeType = stripped.split(',')[0].split(':')[1].split(';')[0]
        const ab = new ArrayBuffer(byteString.length)
        const ia = new Uint8Array(ab)
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i)
        }
        resolve(new Blob([ab], { type: mimeType }))
      } catch {
        // If EXIF stripping fails, return original file
        resolve(file)
      }
    }

    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}
