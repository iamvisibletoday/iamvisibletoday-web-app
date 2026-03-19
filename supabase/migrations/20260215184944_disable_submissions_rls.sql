-- Disable RLS on submissions table (allowing public insert without policies)
-- Use this as a temporary measure to test submissions are working
-- Later we'll re-enable RLS with proper policies

ALTER TABLE submissions DISABLE ROW LEVEL SECURITY;

-- Note: With RLS disabled, anyone can insert/read/update/delete submissions
-- This is acceptable for Phase 1 (anonymous submissions)
-- In Phase 2 (admin dashboard), re-enable RLS with service-role-only read policies
