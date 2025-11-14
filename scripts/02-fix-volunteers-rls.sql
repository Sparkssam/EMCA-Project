-- Quick fix for volunteers table RLS
-- This script specifically fixes the volunteers table policy

-- Drop existing volunteer policies
DROP POLICY IF EXISTS "Users can view their own volunteer applications" ON volunteers;
DROP POLICY IF EXISTS "Anyone can submit volunteer applications" ON volunteers;

-- Disable RLS on volunteers (for public submissions)
ALTER TABLE volunteers DISABLE ROW LEVEL SECURITY;

-- Note: RLS is disabled to allow public volunteer submissions
-- If you want to enable RLS with proper policies, uncomment the section below:

/*
-- Recreate policies for volunteers
CREATE POLICY "Users can view their own volunteer applications"
  ON volunteers FOR SELECT
  USING (email = auth.jwt()->>'email' OR auth.role() = 'authenticated');

CREATE POLICY "Anyone can submit volunteer applications"
  ON volunteers FOR INSERT
  WITH CHECK (true);

-- Re-enable RLS on volunteers
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
*/
