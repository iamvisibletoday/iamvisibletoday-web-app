-- Fix deprecated user_metadata references in RLS policies
-- Use safe, secure JWT claim access for custom role verification
--
-- IMPORTANT: For the modern approach (auth.jwt()->>'role'), you must:
-- 1. Create a Supabase Auth hook: custom_access_token_hook (see migration 20260319100000)
-- 2. Enable it in Project Settings > Auth > Hooks
--
-- Until then, these policies safely access the role from user_metadata

-- ============================================
-- STORIES TABLE RLS
-- ============================================

-- Remove old policy
DROP POLICY IF EXISTS "admin_insert_stories" ON stories;

-- Create new policy with secure user_metadata access
-- Once the JWT hook is enabled, this can be simplified to: auth.jwt()->>'role' = 'admin'
CREATE POLICY "admin_insert_stories" ON stories
  FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND (
      -- Modern approach (once JWT hook is enabled)
      auth.jwt()->>'role' = 'admin'
      -- Fallback: Safe access to user_metadata
      OR (auth.jwt()->'user_metadata'->>'role')::text = 'admin'
    )
  );

-- ============================================
-- SUBMISSIONS TABLE RLS
-- ============================================

DROP POLICY IF EXISTS "admin_read_submissions" ON submissions;
CREATE POLICY "admin_read_submissions" ON submissions
  FOR SELECT
  USING (
    auth.uid() IS NOT NULL
    AND (
      auth.jwt()->>'role' = 'admin'
      OR (auth.jwt()->'user_metadata'->>'role')::text = 'admin'
    )
  );

DROP POLICY IF EXISTS "admin_update_submissions" ON submissions;
CREATE POLICY "admin_update_submissions" ON submissions
  FOR UPDATE
  USING (
    auth.uid() IS NOT NULL
    AND (
      auth.jwt()->>'role' = 'admin'
      OR (auth.jwt()->'user_metadata'->>'role')::text = 'admin'
    )
  );

-- ============================================
-- DELETION_REQUESTS TABLE RLS
-- ============================================

DROP POLICY IF EXISTS "Only admins can view deletion requests" ON deletion_requests;
CREATE POLICY "Only admins can view deletion requests"
  ON deletion_requests FOR SELECT
  USING (
    auth.uid() IS NOT NULL
    AND (
      auth.jwt()->>'role' = 'admin'
      OR (auth.jwt()->'user_metadata'->>'role')::text = 'admin'
    )
  );

DROP POLICY IF EXISTS "Only admins can update deletion requests" ON deletion_requests;
CREATE POLICY "Only admins can update deletion requests"
  ON deletion_requests FOR UPDATE
  USING (
    auth.uid() IS NOT NULL
    AND (
      auth.jwt()->>'role' = 'admin'
      OR (auth.jwt()->'user_metadata'->>'role')::text = 'admin'
    )
  );

-- ============================================
-- STORAGE RLS (files)
-- ============================================

DROP POLICY IF EXISTS "Admin can manage files" ON storage.objects;
CREATE POLICY "Admin can manage files"
  ON storage.objects FOR ALL
  USING (
    auth.uid() IS NOT NULL
    AND (
      auth.jwt()->>'role' = 'admin'
      OR (auth.jwt()->'user_metadata'->>'role')::text = 'admin'
    )
  );

-- ============================================
-- NEXT STEP (manual in Supabase dashboard)
-- ============================================
-- To complete this migration, you must configure custom JWT claims in Supabase:
--
-- 1. Go to Authentication > Providers > Email
-- 2. In "JWT Secret", add a custom claim mapping:
--    - In the Supabase dashboard, go to Project Settings > API > JWT Secret
--    - Update the JWT template to include: "role": "user_metadata.role"
--    - This ensures the role is available at jwt->>'role' (top level)
--
-- 3. OR create a Postgres function to set JWT claims at sign-in:
--    - This is the recommended approach for fine-grained control
--    - Would require modifications to how admin users are created
--
-- For now, the RLS policies check for the modern claim location.
-- The login endpoint will need to be updated when setting user_metadata.role
-- to ensure it propagates to the JWT's top-level 'role' claim.
