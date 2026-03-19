-- Setup custom JWT claims for admin users
-- This makes the admin role available securely in RLS policies
--
-- IMPORTANT: This requires additional configuration in Supabase dashboard:
--
-- Step 1: Go to Project Settings > Auth > Hooks
-- Step 2: Create a "Custom access token" hook
-- Step 3: Point it to the function: public.custom_access_token_hook
-- Step 4: This will automatically add the role to the JWT on every auth event
--
-- The role will then be available as:
-- - auth.jwt()->>'role' in RLS policies (secure, modern approach)
-- - Also in auth.jwt()->'user_metadata'->>'role' (backward compatible)

-- Create the Postgres hook function that Supabase Auth calls
CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event json)
RETURNS json
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  claims jsonb;
BEGIN
  -- Get the JWT claims from the event
  claims := event::jsonb;

  -- Add the role from user_metadata to the top level of the JWT
  IF claims->'user_metadata' ? 'role' THEN
    claims := claims || jsonb_build_object('role', claims->'user_metadata'->'role');
  ELSE
    claims := claims || jsonb_build_object('role', 'user');
  END IF;

  RETURN claims::json;
END;
$$;

-- Note: After creating this function, you MUST enable it in Supabase Auth:
-- 1. Go to https://app.supabase.com/project/_/auth/hooks
-- 2. Click "Create a new hook"
-- 3. Select trigger: "Custom access token"
-- 4. Function: "public.custom_access_token_hook"
-- 5. Save and enable
--
-- Once enabled, all JWT tokens will include the role at the top level,
-- and RLS policies can safely check: auth.jwt()->>'role' = 'admin'
