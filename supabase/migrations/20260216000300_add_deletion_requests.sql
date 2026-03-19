-- Create deletion_requests table for tracking user deletion requests
CREATE TABLE IF NOT EXISTS deletion_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  story_slug TEXT NOT NULL,
  story_title TEXT NOT NULL,
  reason TEXT NOT NULL, -- personal-request, privacy-concern, inappropriate-content, misinformation, other
  details TEXT,
  requester_email TEXT,
  requested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ip_address TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'resolved')),
  admin_notes TEXT,
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for efficient lookups
CREATE INDEX IF NOT EXISTS idx_deletion_requests_status ON deletion_requests (status);
CREATE INDEX IF NOT EXISTS idx_deletion_requests_story_slug ON deletion_requests (story_slug);
CREATE INDEX IF NOT EXISTS idx_deletion_requests_requested_at ON deletion_requests (requested_at DESC);

-- Enable RLS
ALTER TABLE deletion_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Only admins can view deletion requests
CREATE POLICY "Only admins can view deletion requests"
  ON deletion_requests FOR SELECT
  USING (
    auth.uid() IS NOT NULL
    AND ((auth.jwt() ->> 'user_metadata')::jsonb ->> 'role') = 'admin'
  );

-- Policy: Anyone can submit a deletion request (anonymous)
CREATE POLICY "Anyone can submit a deletion request"
  ON deletion_requests FOR INSERT
  WITH CHECK (true);

-- Policy: Only admins can update deletion requests
CREATE POLICY "Only admins can update deletion requests"
  ON deletion_requests FOR UPDATE
  USING (
    auth.uid() IS NOT NULL
    AND ((auth.jwt() ->> 'user_metadata')::jsonb ->> 'role') = 'admin'
  );
