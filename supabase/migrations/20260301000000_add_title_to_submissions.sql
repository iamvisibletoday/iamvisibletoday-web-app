-- Add title column to submissions table to capture user-provided story titles
-- Allows users to specify their story title instead of auto-generating from content

ALTER TABLE submissions ADD COLUMN IF NOT EXISTS title TEXT;

-- Index for future queries on title
CREATE INDEX IF NOT EXISTS idx_submissions_title ON submissions (title);
