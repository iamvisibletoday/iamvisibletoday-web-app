-- Ensure submissions table allows anonymous inserts via RLS
-- This is the definitive fix for the "violates row-level security policy" error

-- Step 1: Make sure RLS is enabled
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Step 2: Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Anyone can submit" ON submissions;
DROP POLICY IF EXISTS "Enable insert for all users" ON submissions;
DROP POLICY IF EXISTS "submissions_insert_policy" ON submissions;
DROP POLICY IF EXISTS "Allow anonymous submissions" ON submissions;

-- Step 3: Create a permissive INSERT policy that allows all users (authenticated and anonymous)
CREATE POLICY "Allow anonymous submissions"
  ON submissions
  FOR INSERT
  WITH CHECK (true);

-- This policy allows anyone (including unauthenticated users) to insert rows
-- because WITH CHECK (true) is a tautology that always evaluates to true
