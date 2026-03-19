-- Create admin_users table for Phase 4 admin authentication
-- Stores admin credentials with bcrypt password hashes

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- No SELECT policies - admin_users is only accessed via service role during login
-- This prevents authenticated users from reading password hashes

-- ============================================
-- INITIAL ADMIN USER (use strong password!)
-- ============================================
-- Insert default admin account with bcrypt hash of "changeme123"
-- Hash generated with: bcrypt.hashSync('changeme123', 10) = $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36gBMJ1u

INSERT INTO admin_users (email, password_hash, is_active)
VALUES ('admin@iamvisibletoday.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36gBMJ1u', TRUE)
ON CONFLICT (email) DO NOTHING;

-- After deployment, change password:
-- 1. Generate bcrypt hash: node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your-new-password', 10))"
-- 2. Update: UPDATE admin_users SET password_hash = '$2a$...' WHERE email = 'admin@iamvisibletoday.com';
