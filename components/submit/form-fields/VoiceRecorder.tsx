'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Mic, Square, X, Play, Pause } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useSubmitForm } from '../SubmitFormContext'

const MIN_DURATION = 60 // 1 minute in seconds
const MAX_DURATION = 180 // 3 minutes in seconds

interface VoiceRecorderProps {
  isRequired?: boolean
}

export default function VoiceRecorder({ isRequired = true }: VoiceRecorderProps) {
  const { formData, updateFormData } = useSubmitForm()
  const [isRecording, setIsRecording] = useState(false)
  const [duration, setDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState('')
  const [showUpload, setShowUpload] = useState(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [])

  const startRecording = useCallback(async () => {
    setError('')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        const previewUrl = URL.createObjectURL(blob)

        updateFormData({ voiceBlob: blob, voicePreviewUrl: previewUrl })
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setDuration(0)

      timerRef.current = setInterval(() => {
        setDuration((prev) => {
          if (prev >= MAX_DURATION) {
            stopRecording()
            return prev
          }
          return prev + 1
        })
      }, 1000)
    } catch {
      setError(
        'Microphone access denied. Please allow microphone access or upload a file instead.'
      )
      setShowUpload(true)
    }
  }, [updateFormData, stopRecording])

  const removeRecording = () => {
    if (formData.voicePreviewUrl) {
      URL.revokeObjectURL(formData.voicePreviewUrl)
    }
    updateFormData({ voiceBlob: undefined, voicePreviewUrl: undefined })
    setDuration(0)
    setIsPlaying(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const togglePlayback = () => {
    if (!audioRef.current || !formData.voicePreviewUrl) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('audio/')) {
      setError('Please upload an audio file (MP3, WAV, WebM, etc.)')
      return
    }

    setError('')
    const previewUrl = URL.createObjectURL(file)
    updateFormData({ voiceBlob: file, voicePreviewUrl: previewUrl })
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary">
        Voice Note {isRequired && <span className="text-rose-500">*</span>}
      </label>

      {formData.voicePreviewUrl ? (
        <div className="p-6 bg-rose-50 dark:bg-rose-900/10 rounded-lg border border-rose-200 dark:border-rose-800">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlayback}
              className="w-12 h-12 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center transition-colors shrink-0"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </button>

            <div className="flex-grow">
              <div className="h-2 bg-rose-200 dark:bg-rose-800 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full w-0" />
              </div>
              <p className="text-xs text-text-secondary dark:text-dark-text-secondary mt-1">
                {formatTime(duration)} recorded
              </p>
            </div>

            <button
              onClick={removeRecording}
              className="p-2 hover:bg-rose-100 dark:hover:bg-rose-900/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            </button>
          </div>

          <audio
            ref={audioRef}
            src={formData.voicePreviewUrl}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />
        </div>
      ) : isRecording ? (
        <div className="p-8 bg-rose-50 dark:bg-rose-900/10 rounded-lg border border-rose-200 dark:border-rose-800 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-3 h-3 bg-rose-500 rounded-full animate-pulse" />
            <span className="text-lg font-medium text-text-primary dark:text-dark-text-primary">
              Recording...
            </span>
          </div>
          <p className="text-3xl font-mono text-rose-600 dark:text-rose-400 mb-6">
            {formatTime(duration)}
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-text-secondary dark:text-dark-text-secondary mb-6">
            <span>Min: {formatTime(MIN_DURATION)}</span>
            <span>|</span>
            <span>Max: {formatTime(MAX_DURATION)}</span>
          </div>
          <Button onClick={stopRecording} variant="primary">
            <Square className="w-4 h-4" />
            Stop Recording
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-8 rounded-lg border-2 border-dashed border-rose-200 dark:border-dark-bg-tertiary text-center">
            <Mic className="w-12 h-12 text-rose-500 dark:text-rose-400 mx-auto mb-4" />
            <p className="text-text-primary dark:text-dark-text-primary font-medium mb-1">
              Record a voice note
            </p>
            <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-6">
              1-3 minutes, speak from the heart
            </p>
            <Button onClick={startRecording} variant="primary">
              <Mic className="w-4 h-4" />
              Start Recording
            </Button>
          </div>

          <div className="text-center">
            <button
              onClick={() => setShowUpload(!showUpload)}
              className="text-sm text-rose-600 dark:text-rose-400 hover:underline"
            >
              Or upload a pre-recorded file
            </button>
          </div>

          {showUpload && (
            <div className="p-4 rounded-lg border border-rose-200 dark:border-dark-bg-tertiary">
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="w-full text-sm text-text-secondary dark:text-dark-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-rose-100 file:text-rose-700 dark:file:bg-rose-900/20 dark:file:text-rose-400 hover:file:bg-rose-200 dark:hover:file:bg-rose-900/30 file:cursor-pointer file:transition-colors"
              />
              <p className="text-xs text-text-secondary dark:text-dark-text-secondary mt-2">
                MP3, WAV, WebM, OGG supported
              </p>
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-sm text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/10 p-3 rounded-lg">
          {error}
        </p>
      )}

      {duration > 0 && duration < MIN_DURATION && !isRecording && (
        <p className="text-sm text-amber-600 dark:text-amber-400">
          Recording is under 1 minute. Consider recording a longer message for
          more impact.
        </p>
      )}
    </div>
  )
}
