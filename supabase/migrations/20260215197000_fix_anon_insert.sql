-- Fix RLS for anonymous user inserts
-- Grant INSERT to anon role explicitly

-- Drop existing policies
DROP POLICY IF EXISTS "submissions_insert_policy" ON submissions;
DROP POLICY IF EXISTS "submissions_select_policy" ON submissions;
DROP POLICY IF EXISTS "submissions_update_policy" ON submissions;

-- Allow anon and authenticated users to insert
CREATE POLICY "allow_insert_for_all_users" ON submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Deny select by default (admins use service role bypass)
CREATE POLICY "deny_select_for_all" ON submissions
  FOR SELECT
  USING (false);

-- Deny update by default (admins use service role bypass)
CREATE POLICY "deny_update_for_all" ON submissions
  FOR UPDATE
  USING (false);

-- Allow delete only for admins (will need to add this when implementing soft deletes)
CREATE POLICY "deny_delete_for_all" ON submissions
  FOR DELETE
  USING (false);
