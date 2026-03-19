-- Add soft delete functionality to stories table
-- Allows admin to hide stories without permanent deletion
-- Supports GDPR compliance and accidental deletion recovery

ALTER TABLE stories ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;
ALTER TABLE stories ADD COLUMN IF NOT EXISTS deletion_reason TEXT;

-- Index for efficient filtering of non-deleted stories
CREATE INDEX IF NOT EXISTS idx_stories_deleted_at ON stories (deleted_at) WHERE deleted_at IS NULL;

-- Update RLS policy to hide deleted stories from public
DROP POLICY IF EXISTS "Stories are publicly readable" ON stories;
CREATE POLICY "Stories are publicly readable"
  ON stories FOR SELECT
  USING (deleted_at IS NULL);

-- Admin can see all stories (including deleted ones)
DROP POLICY IF EXISTS "Admin can see all stories" ON stories;
CREATE POLICY "Admin can see all stories"
  ON stories FOR SELECT
  USING (
    auth.uid() IS NOT NULL
    AND ((auth.jwt() ->> 'user_metadata')::jsonb ->> 'role') = 'admin'
  );
