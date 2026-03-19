'use client'

import { useState, useCallback, useRef } from 'react'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'
import { useSubmitForm } from '../SubmitFormContext'
import { stripExifData } from '@/lib/media/exif'
import { compressImage } from '@/lib/media/compress'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

interface PhotoUploadProps {
  isRequired?: boolean
}

export default function PhotoUpload({ isRequired = true }: PhotoUploadProps) {
  const { formData, updateFormData } = useSubmitForm()
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const processFile = useCallback(
    async (file: File) => {
      setError('')

      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file (JPEG, PNG, etc.)')
        return
      }

      if (file.size > MAX_FILE_SIZE) {
        setError('File size must be under 5MB')
        return
      }

      setProcessing(true)
      try {
        // Strip EXIF data if enabled
        let processed: File | Blob = file
        if (formData.stripExif) {
          processed = await stripExifData(file)
        }

        // Compress image
        const compressed = await compressImage(
          processed instanceof File
            ? processed
            : new File([processed], file.name, { type: processed.type })
        )

        // Create preview URL
        const previewUrl = URL.createObjectURL(compressed)

        updateFormData({
          photoFile: compressed,
          photoPreviewUrl: previewUrl,
        })
      } catch {
        setError('Failed to process image. Please try another file.')
      } finally {
        setProcessing(false)
      }
    },
    [formData.stripExif, updateFormData]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      const file = e.dataTransfer.files[0]
      if (file) processFile(file)
    },
    [processFile]
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
  }

  const removePhoto = () => {
    if (formData.photoPreviewUrl) {
      URL.revokeObjectURL(formData.photoPreviewUrl)
    }
    updateFormData({
      photoFile: undefined,
      photoPreviewUrl: undefined,
    })
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary">
        Photo {isRequired && <span className="text-rose-500">*</span>}
      </label>

      {formData.photoPreviewUrl ? (
        <div className="relative rounded-lg overflow-hidden border border-rose-200 dark:border-dark-bg-tertiary">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={formData.photoPreviewUrl}
            alt="Upload preview"
            className="w-full h-auto max-h-[400px] object-contain bg-slate-50 dark:bg-dark-bg-tertiary"
          />
          <button
            onClick={removePhoto}
            className="absolute top-3 right-3 bg-white dark:bg-dark-bg-secondary rounded-full p-1.5 shadow-md hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
          >
            <X className="w-5 h-5 text-rose-600 dark:text-rose-400" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
            dragOver
              ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/10'
              : 'border-rose-200 dark:border-dark-bg-tertiary hover:border-rose-400 dark:hover:border-rose-600'
          }`}
        >
          {processing ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-10 h-10 text-rose-500 animate-spin" />
              <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                Processing image...
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/20 flex items-center justify-center">
                <Upload className="w-8 h-8 text-rose-500 dark:text-rose-400" />
              </div>
              <div>
                <p className="text-text-primary dark:text-dark-text-primary font-medium">
                  Drop your photo here or click to browse
                </p>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-1">
                  JPEG, PNG up to 5MB
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && (
        <p className="text-sm text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/10 p-3 rounded-lg">
          {error}
        </p>
      )}

      {/* Caption */}
      <div>
        <label
          htmlFor="photo-caption"
          className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2"
        >
          Caption <span className="text-slate-400">(optional)</span>
        </label>
        <textarea
          id="photo-caption"
          placeholder="Add a caption to your photo..."
          value={formData.photoCaption || ''}
          onChange={(e) => updateFormData({ photoCaption: e.target.value })}
          rows={3}
          maxLength={500}
          className="w-full px-4 py-3 rounded-lg border border-rose-200 dark:border-dark-bg-tertiary bg-white dark:bg-dark-bg-tertiary text-text-primary dark:text-dark-text-primary placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400 transition-shadow resize-y"
        />
      </div>

      {formData.photoPreviewUrl && (
        <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
          <ImageIcon className="w-4 h-4" />
          <span>EXIF data stripped, image compressed</span>
        </div>
      )}
    </div>
  )
}
