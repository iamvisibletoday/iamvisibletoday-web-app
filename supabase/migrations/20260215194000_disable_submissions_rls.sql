-- Disable RLS on submissions table to allow public inserts
-- Phase 1: Public submissions don't need RLS protection
-- Phase 4 admin operations use service role which bypasses RLS anyway

ALTER TABLE submissions DISABLE ROW LEVEL SECURITY;

-- For stories, keep RLS but allow public reads
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_stories" ON stories;
CREATE POLICY "public_read_stories" ON stories
  FOR SELECT
  USING (true);
