import imageCompression from 'browser-image-compression'

const DEFAULT_OPTIONS = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
}

export async function compressImage(
  file: File,
  options: Partial<typeof DEFAULT_OPTIONS> = {}
): Promise<File> {
  const finalOptions = { ...DEFAULT_OPTIONS, ...options }
  return await imageCompression(file, finalOptions)
}
