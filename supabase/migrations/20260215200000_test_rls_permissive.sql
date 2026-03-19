-- Test RLS with permissive policy that allows everything
-- Debug why the previous INSERT policy isn't working

-- Drop all existing policies
DROP POLICY IF EXISTS "submissions_enable_insert" ON submissions;
DROP POLICY IF EXISTS "submissions_deny_select" ON submissions;
DROP POLICY IF EXISTS "submissions_deny_update" ON submissions;
DROP POLICY IF EXISTS "submissions_deny_delete" ON submissions;

-- Create a single permissive policy that allows all operations
-- This is a test to see if RLS policies work at all
CREATE POLICY "submissions_permissive" ON submissions
  AS PERMISSIVE
  FOR ALL
  USING (true)
  WITH CHECK (true);
