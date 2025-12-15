-- Drop table if it exists (to start fresh)
DROP TABLE IF EXISTS partnerships CASCADE;

-- Create partnerships table for managing partnership inquiries
CREATE TABLE partnerships (
  id SERIAL PRIMARY KEY,
  organization_name TEXT NOT NULL,
  organization_type TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_title TEXT,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  partnership_interest TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_by TEXT,
  notes TEXT
);

-- Create index for performance
CREATE INDEX idx_partnerships_status ON partnerships(status);
CREATE INDEX idx_partnerships_created_at ON partnerships(created_at DESC);

-- Force reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';

-- Verify table was created
SELECT 'Table created successfully' as status, 
       COUNT(*) as column_count 
FROM information_schema.columns 
WHERE table_name = 'partnerships';

-- Add some sample statuses for reference
-- Status can be: 'pending', 'reviewing', 'approved', 'declined', 'completed'
