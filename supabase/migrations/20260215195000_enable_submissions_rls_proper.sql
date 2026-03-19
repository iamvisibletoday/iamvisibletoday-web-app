-- Properly enable RLS on submissions table
-- Allow public (anonymous and authenticated) inserts
-- Admin can read and update

-- Enable RLS
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "allow_public_insert" ON submissions;
DROP POLICY IF EXISTS "public_insert_submissions" ON submissions;
DROP POLICY IF EXISTS "admin_read_submissions" ON submissions;
DROP POLICY IF EXISTS "admin_update_submissions" ON submissions;

-- Policy 1: Anyone can insert (no authentication check needed)
CREATE POLICY "anyone_can_insert_submissions" ON submissions
  FOR INSERT
  WITH CHECK (true);

-- Policy 2: Public select is not allowed (only admins or internal use)
CREATE POLICY "admin_can_read_all_submissions" ON submissions
  FOR SELECT
  USING (
    (SELECT auth.jwt() ->> 'user_metadata') IS NOT NULL
    AND (SELECT auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );

-- Policy 3: Admin can update
CREATE POLICY "admin_can_update_submissions" ON submissions
  FOR UPDATE
  USING (
    (SELECT auth.jwt() ->> 'user_metadata') IS NOT NULL
    AND (SELECT auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );
