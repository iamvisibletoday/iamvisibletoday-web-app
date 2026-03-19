'use client'

import { motion } from 'framer-motion'
import { Story } from '@/types/database'
import StoryTextContent from './StoryTextContent'
import StoryPhotoContent from './StoryPhotoContent'
import StoryVoiceContent from './StoryVoiceContent'

interface StoryContentProps {
  story: Story
  sessionToken: string
}

export default function StoryContent({ story, sessionToken }: StoryContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {story.text_content && <StoryTextContent content={story.text_content} />}
      {story.photo_url && (
        <StoryPhotoContent
          path={story.photo_url}
          caption={story.photo_caption}
          sessionToken={sessionToken}
        />
      )}
      {story.voice_url && (
        <StoryVoiceContent path={story.voice_url} sessionToken={sessionToken} />
      )}
    </motion.div>
  )
}
