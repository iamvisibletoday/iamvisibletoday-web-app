-- Re-enable RLS with the simplest possible insert policy

ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies
DROP POLICY IF EXISTS "allow_insert_for_all_users" ON submissions;
DROP POLICY IF EXISTS "deny_select_for_all" ON submissions;
DROP POLICY IF EXISTS "deny_update_for_all" ON submissions;
DROP POLICY IF EXISTS "deny_delete_for_all" ON submissions;

-- Create the absolute simplest insert policy - no role restrictions
CREATE POLICY "submissions_enable_insert" ON submissions FOR INSERT WITH CHECK (true);

-- Deny other operations
CREATE POLICY "submissions_deny_select" ON submissions FOR SELECT USING (false);
CREATE POLICY "submissions_deny_update" ON submissions FOR UPDATE USING (false);
CREATE POLICY "submissions_deny_delete" ON submissions FOR DELETE USING (false);
