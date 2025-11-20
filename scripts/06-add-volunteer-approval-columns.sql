-- Add volunteer approval and user account columns
-- Run this script to add new columns to the existing volunteers table

-- Add new columns for user management
ALTER TABLE volunteers 
ADD COLUMN IF NOT EXISTS is_approved BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS approved_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS approved_by VARCHAR(255),
ADD COLUMN IF NOT EXISTS notes TEXT;

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_volunteers_user_id ON volunteers(user_id);
CREATE INDEX IF NOT EXISTS idx_volunteers_is_approved ON volunteers(is_approved);

-- Add comment
COMMENT ON COLUMN volunteers.is_approved IS 'Whether the volunteer application has been approved';
COMMENT ON COLUMN volunteers.user_id IS 'Link to auth.users table after creating login account';
COMMENT ON COLUMN volunteers.approved_at IS 'Timestamp when volunteer was approved';
COMMENT ON COLUMN volunteers.approved_by IS 'Admin email who approved the volunteer';
COMMENT ON COLUMN volunteers.notes IS 'Admin notes about the volunteer';
