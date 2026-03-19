-- Simplify submissions RLS - just ensure public insert works
-- Drop all existing policies first
DROP POLICY IF EXISTS "public_insert_submissions" ON submissions;
DROP POLICY IF EXISTS "admin_read_submissions" ON submissions;
DROP POLICY IF EXISTS "admin_update_submissions" ON submissions;
DROP POLICY IF EXISTS "admin_read_all" ON submissions;
DROP POLICY IF EXISTS "admin_update_all" ON submissions;
DROP POLICY IF EXISTS "public_submit" ON submissions;
DROP POLICY IF EXISTS "Anyone can submit" ON submissions;

-- Ensure RLS is enabled
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Single simple policy: anyone can insert
CREATE POLICY "allow_public_insert" ON submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
