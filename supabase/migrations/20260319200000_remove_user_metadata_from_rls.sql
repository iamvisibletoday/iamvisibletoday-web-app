-- CRITICAL: Remove ALL user_metadata references from RLS policies
-- user_metadata is editable by users and must NEVER be used in security contexts
--
-- Now that custom_access_token_hook is enabled, the role claim is available at:
-- auth.jwt()->>'role' = 'admin' (server-controlled, secure)
--
-- This is the ONLY way to check admin role in RLS policies

-- ============================================
-- STORIES TABLE - Fix both policies
-- ============================================

-- 1. Fix the "Admin can see all stories" policy (old syntax with user_metadata)
DROP POLICY IF EXISTS "Admin can see all stories" ON stories;
CREATE POLICY "Admin can see all stories"
  ON stories FOR SELECT
  USING (
    deleted_at IS NULL
    OR (auth.uid() IS NOT NULL AND auth.jwt()->>'role' = 'admin')
  );

-- 2. Fix the "admin_insert_stories" policy (has fallback to user_metadata)
DROP POLICY IF EXISTS "admin_insert_stories" ON stories;
CREATE POLICY "admin_insert_stories"
  ON stories FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND auth.jwt()->>'role' = 'admin'
  );

-- ============================================
-- SUBMISSIONS TABLE - Fix both policies
-- ============================================

DROP POLICY IF EXISTS "admin_read_submissions" ON submissions;
CREATE POLICY "admin_read_submissions"
  ON submissions FOR SELECT
  USING (
    auth.uid() IS NOT NULL
    AND auth.jwt()->>'role' = 'admin'
  );

DROP POLICY IF EXISTS "admin_update_submissions" ON submissions;
CREATE POLICY "admin_update_submissions"
  ON submissions FOR UPDATE
  USING (
    auth.uid() IS NOT NULL
    AND auth.jwt()->>'role' = 'admin'
  );

-- ============================================
-- DELETION_REQUESTS TABLE - Fix both policies
-- ============================================

DROP POLICY IF EXISTS "Only admins can view deletion requests" ON deletion_requests;
CREATE POLICY "Only admins can view deletion requests"
  ON deletion_requests FOR SELECT
  USING (
    auth.uid() IS NOT NULL
    AND auth.jwt()->>'role' = 'admin'
  );

DROP POLICY IF EXISTS "Only admins can update deletion requests" ON deletion_requests;
CREATE POLICY "Only admins can update deletion requests"
  ON deletion_requests FOR UPDATE
  USING (
    auth.uid() IS NOT NULL
    AND auth.jwt()->>'role' = 'admin'
  );

-- ============================================
-- STORAGE (files) - Fix the policy
-- ============================================

DROP POLICY IF EXISTS "Admin can manage files" ON storage.objects;
CREATE POLICY "Admin can manage files"
  ON storage.objects FOR ALL
  USING (
    auth.uid() IS NOT NULL
    AND auth.jwt()->>'role' = 'admin'
  );

-- ============================================
-- VERIFICATION
-- ============================================
-- All policies now use ONLY: auth.jwt()->>'role' = 'admin'
-- No user_metadata references remain
-- Security Advisor warnings should be completely resolved
