-- Add experience and message columns to volunteers table
-- These fields are collected in the volunteer form but weren't being stored

ALTER TABLE volunteers 
ADD COLUMN IF NOT EXISTS experience TEXT,
ADD COLUMN IF NOT EXISTS message TEXT;

-- Add comments
COMMENT ON COLUMN volunteers.experience IS 'Previous volunteer or environmental work experience (optional)';
COMMENT ON COLUMN volunteers.message IS 'Additional message from the volunteer (optional)';

-- Verify the columns were added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'volunteers' 
AND column_name IN ('experience', 'message');
