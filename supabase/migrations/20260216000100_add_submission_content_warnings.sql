-- Add content warning fields to submissions table
-- Users can suggest content warnings when submitting
-- Admin reviews and can edit/add warnings during moderation

ALTER TABLE submissions ADD COLUMN IF NOT EXISTS suggested_content_warning BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS suggested_warning_text TEXT;

-- Index for finding submissions with suggested warnings
CREATE INDEX IF NOT EXISTS idx_submissions_suggested_warning ON submissions (suggested_content_warning) WHERE suggested_content_warning = TRUE;
