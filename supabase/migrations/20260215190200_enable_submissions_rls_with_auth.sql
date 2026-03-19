-- Re-enable RLS on submissions table with admin auth policies
-- Modern approach: Check JWT claims instead of bypassing RLS

ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Public can insert (anonymous submissions continue working)
DROP POLICY IF EXISTS "public_submit" ON submissions;
CREATE POLICY "public_submit" ON submissions
  FOR INSERT
  WITH CHECK (true);

-- Admin users can read all submissions
DROP POLICY IF EXISTS "admin_read_all" ON submissions;
CREATE POLICY "admin_read_all" ON submissions
  FOR SELECT
  USING (
    auth.uid() IS NOT NULL
    AND auth.jwt()->'user_metadata'->>'role' = 'admin'
  );

-- Admin users can update submissions
DROP POLICY IF EXISTS "admin_update_all" ON submissions;
CREATE POLICY "admin_update_all" ON submissions
  FOR UPDATE
  USING (
    auth.uid() IS NOT NULL
    AND auth.jwt()->'user_metadata'->>'role' = 'admin'
  );

-- Enable RLS on stories table with admin insert policy
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

-- Public can read published stories
DROP POLICY IF EXISTS "public_read_stories" ON stories;
CREATE POLICY "public_read_stories" ON stories
  FOR SELECT
  USING (true);

-- Admin users can insert stories (when approving submissions)
DROP POLICY IF EXISTS "admin_insert_stories" ON stories;
CREATE POLICY "admin_insert_stories" ON stories
  FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND auth.jwt()->'user_metadata'->>'role' = 'admin'
  );
