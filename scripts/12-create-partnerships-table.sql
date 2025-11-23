-- Create partnerships table for managing partnership inquiries
CREATE TABLE IF NOT EXISTS partnerships (
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
CREATE INDEX IF NOT EXISTS idx_partnerships_status ON partnerships(status);
CREATE INDEX IF NOT EXISTS idx_partnerships_created_at ON partnerships(created_at DESC);

-- Add some sample statuses for reference
-- Status can be: 'pending', 'reviewing', 'approved', 'declined', 'completed'
