-- Proper RLS policies for submissions
-- Allow public inserts, deny other operations

-- Drop the test permissive policy
DROP POLICY IF EXISTS "submissions_permissive" ON submissions;

-- Policy 1: Allow INSERT for everyone (INSERT only uses WITH CHECK, not USING)
CREATE POLICY "submissions_insert" ON submissions
  AS PERMISSIVE
  FOR INSERT
  WITH CHECK (true);

-- Policy 2: Block SELECT for everyone (admins use service role bypass)
CREATE POLICY "submissions_select_block" ON submissions
  AS RESTRICTIVE
  FOR SELECT
  USING (false);

-- Policy 3: Block UPDATE for everyone (admins use service role bypass)
CREATE POLICY "submissions_update_block" ON submissions
  AS RESTRICTIVE
  FOR UPDATE
  USING (false);

-- Policy 4: Block DELETE for everyone (admins use service role bypass)
CREATE POLICY "submissions_delete_block" ON submissions
  AS RESTRICTIVE
  FOR DELETE
  USING (false);
