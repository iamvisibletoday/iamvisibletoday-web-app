-- Add slug column to submissions if it doesn't exist
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS slug TEXT;

-- Backfill submission titles from their associated stories
-- This updates approved/rejected submissions that have a slug but no title
-- by matching them to their published stories and copying the story title

UPDATE submissions
SET title = stories.title
FROM stories
WHERE
  -- Only update submissions that have a slug (approved/rejected)
  submissions.slug IS NOT NULL
  -- And where the title is currently NULL or empty
  AND (submissions.title IS NULL OR submissions.title = '')
  -- Match submission slug to story slug
  AND submissions.slug = stories.slug;
