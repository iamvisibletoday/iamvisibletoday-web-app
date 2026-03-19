-- Make storage buckets private for secure access
-- This prevents direct public access and enforces server-side verification

-- Make storage buckets private
UPDATE storage.buckets
SET public = false
WHERE id IN ('photos', 'voice-notes');

-- Remove existing public SELECT policies
DROP POLICY IF EXISTS "Anyone can view photos" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view voice notes" ON storage.objects;

-- Add RLS policy: Only service role can access (enforces server-side verification)
CREATE POLICY "Service role can access all files"
  ON storage.objects FOR SELECT
  USING (auth.role() = 'service_role');

-- Policy for uploads (anon can upload during submission)
CREATE POLICY "Anon can upload during submission"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id IN ('photos', 'voice-notes')
    AND auth.role() = 'anon'
  );

-- Admin can manage all files
CREATE POLICY "Admin can manage files"
  ON storage.objects FOR ALL
  USING (
    auth.uid() IS NOT NULL
    AND auth.jwt()->'user_metadata'->>'role' = 'admin'
  );
