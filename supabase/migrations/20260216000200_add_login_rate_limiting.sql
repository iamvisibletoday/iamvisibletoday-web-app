-- Create login_attempts table for rate limiting
-- Tracks failed login attempts by IP and email
-- Prevents brute force attacks on admin login

CREATE TABLE IF NOT EXISTS login_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier TEXT NOT NULL, -- IP address or email
  attempt_type TEXT NOT NULL CHECK (attempt_type IN ('ip', 'email')),
  attempted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast lookups and cleanup
CREATE INDEX IF NOT EXISTS idx_login_attempts_identifier_type
ON login_attempts (identifier, attempt_type, attempted_at DESC);

-- Index for cleanup queries
CREATE INDEX IF NOT EXISTS idx_login_attempts_timestamp
ON login_attempts (attempted_at);

-- Function to clean up old login attempts
CREATE OR REPLACE FUNCTION cleanup_old_login_attempts()
RETURNS void AS $$
BEGIN
  DELETE FROM login_attempts WHERE attempted_at < NOW() - INTERVAL '1 hour';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Note: For automated cleanup every hour, enable pg_cron in Supabase:
-- SELECT cron.schedule('cleanup_login_attempts', '0 * * * *', 'SELECT cleanup_old_login_attempts()');
-- For now, cleanup is called in the rate limit utility function before checking limits
