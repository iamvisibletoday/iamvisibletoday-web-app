-- Re-enable RLS on submissions table with admin-only read access
-- Phase 4: Admin moderation ready

ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Public can insert (anonymous submissions continue working)
DROP POLICY IF EXISTS "public_submit" ON submissions;
DROP POLICY IF EXISTS "Anyone can submit" ON submissions;
CREATE POLICY "public_submit" ON submissions
  FOR INSERT
  WITH CHECK (true);

-- Note: Admin access is via service role key which bypasses RLS
-- No SELECT policies needed - service role has full access
