-- Fix submissions RLS policies to use JWT claims instead of auth.users
-- Allows public insert and admin read/update with proper JWT validation

-- Drop old problematic policies
DROP POLICY IF EXISTS "admin_read_submissions" ON submissions;
DROP POLICY IF EXISTS "admin_update_submissions" ON submissions;

-- Recreate admin policies using JWT claims properly
CREATE POLICY "admin_read_submissions" ON submissions
  FOR SELECT
  USING (
    (auth.jwt()->>'user_metadata')::jsonb->>'role' = 'admin'
  );

CREATE POLICY "admin_update_submissions" ON submissions
  FOR UPDATE
  USING (
    (auth.jwt()->>'user_metadata')::jsonb->>'role' = 'admin'
  );
