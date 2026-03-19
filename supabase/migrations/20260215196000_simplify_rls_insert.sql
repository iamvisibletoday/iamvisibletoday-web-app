-- Simplify RLS to fix insert issues
-- Use the most basic policy possible for inserts

-- Drop all policies
DROP POLICY IF EXISTS "anyone_can_insert_submissions" ON submissions;
DROP POLICY IF EXISTS "admin_can_read_all_submissions" ON submissions;
DROP POLICY IF EXISTS "admin_can_update_submissions" ON submissions;

-- Very simple insert policy - just true
CREATE POLICY "submissions_insert_policy" ON submissions
  FOR INSERT
  WITH CHECK (true);

-- Very simple read policy for admins
CREATE POLICY "submissions_select_policy" ON submissions
  FOR SELECT
  USING (false);  -- Default deny, admins will use service role

-- Very simple update policy for admins
CREATE POLICY "submissions_update_policy" ON submissions
  FOR UPDATE
  USING (false);  -- Default deny, admins will use service role
