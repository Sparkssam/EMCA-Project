-- Add additional fields to projects table for detailed project information

ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS status VARCHAR(100),
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS duration VARCHAR(100),
ADD COLUMN IF NOT EXISTS beneficiaries VARCHAR(255),
ADD COLUMN IF NOT EXISTS funded_by TEXT,
ADD COLUMN IF NOT EXISTS objectives JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS key_activity TEXT,
ADD COLUMN IF NOT EXISTS outcomes JSONB DEFAULT '[]'::jsonb;

-- Add comments to explain the fields
COMMENT ON COLUMN projects.status IS 'Project status (e.g., Ongoing, Active, Monthly, Completed)';
COMMENT ON COLUMN projects.location IS 'Project location/area of implementation';
COMMENT ON COLUMN projects.duration IS 'Project duration (e.g., 6 months, 2 years)';
COMMENT ON COLUMN projects.beneficiaries IS 'Target beneficiaries description';
COMMENT ON COLUMN projects.funded_by IS 'Funding organization or partner';
COMMENT ON COLUMN projects.objectives IS 'Array of project objectives';
COMMENT ON COLUMN projects.key_activity IS 'Key activity or highlight of the project';
COMMENT ON COLUMN projects.outcomes IS 'Array of expected outcomes or achievements';
