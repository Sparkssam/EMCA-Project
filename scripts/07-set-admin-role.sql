-- Set admin role for your account
-- IMPORTANT: Replace 'your-admin-email@example.com' with your actual admin email

-- This will add the admin role without overwriting existing user_metadata
UPDATE auth.users 
SET raw_user_meta_data = 
  CASE 
    WHEN raw_user_meta_data IS NULL THEN '{"role": "admin"}'::jsonb
    ELSE raw_user_meta_data || '{"role": "admin"}'::jsonb
  END
WHERE email = 'your-admin-email@example.com';

-- Verify the update
SELECT email, raw_user_meta_data 
FROM auth.users 
WHERE email = 'your-admin-email@example.com';
