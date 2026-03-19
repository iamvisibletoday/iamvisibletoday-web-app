-- Clean slate: drop ALL policies and create only what we need

-- Drop all policies
DROP POLICY IF EXISTS "submissions_insert" ON submissions;
DROP POLICY IF EXISTS "submissions_select_block" ON submissions;
DROP POLICY IF EXISTS "submissions_update_block" ON submissions;
DROP POLICY IF EXISTS "submissions_delete_block" ON submissions;
DROP POLICY IF EXISTS "submissions_permissive" ON submissions;
DROP POLICY IF EXISTS "submissions_enable_insert" ON submissions;
DROP POLICY IF EXISTS "submissions_deny_select" ON submissions;
DROP POLICY IF EXISTS "submissions_deny_update" ON submissions;
DROP POLICY IF EXISTS "submissions_deny_delete" ON submissions;
DROP POLICY IF EXISTS "allow_insert_for_all_users" ON submissions;
DROP POLICY IF EXISTS "deny_select_for_all" ON submissions;
DROP POLICY IF EXISTS "deny_update_for_all" ON submissions;
DROP POLICY IF EXISTS "deny_delete_for_all" ON submissions;

-- Make sure RLS is enabled
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Create ONE simple policy: allow insert for everyone
CREATE POLICY "public_insert" ON submissions
  FOR INSERT
  WITH CHECK (true);
