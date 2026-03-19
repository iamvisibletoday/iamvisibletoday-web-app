-- Fix submissions RLS to allow anonymous inserts
-- The policy needs to explicitly allow all unauthenticated users

DROP POLICY IF EXISTS "Anyone can submit" ON submissions;

-- Allow both authenticated and unauthenticated users to insert
CREATE POLICY "Anyone can submit"
  ON submissions
  FOR INSERT
  WITH CHECK (true);

-- Optionally, allow authenticated users to view their own submissions (if needed later)
-- For now, keep it simple - admin-only read via dashboard
