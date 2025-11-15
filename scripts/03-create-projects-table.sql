-- Create projects table for managing key projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  impact VARCHAR(255) NOT NULL,
  image_url TEXT,
  icon VARCHAR(50) DEFAULT 'Sprout',
  color VARCHAR(100) DEFAULT 'from-emca-yellow to-emca-lime',
  link VARCHAR(255),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Disable RLS for now (you can enable it later with proper policies)
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;

-- Insert existing projects as seed data
INSERT INTO projects (title, subtitle, description, impact, image_url, icon, color, link, display_order) VALUES
('Binti Mazingira', 'Daughters of the Environment', 'A 6-month project promoting environmental sustainability through eco-friendly practices to improve menstrual hygiene management for school girls aged 10-14 in Muheza District, Tanga. Training 12 youth female tailors and establishing a textile industry for reusable sanitary pads.', '500+ Girls & 12 Tailors', '/young-african-leaders--youth-empowerment-tanzania.jpg', 'Sprout', 'from-emca-yellow to-emca-lime', '/projects#binti-mazingira', 1),
('Tuelimishe Mazingira', 'Let''s Cultivate the Environment', 'Empowering 200 youth aged 10-18 at Mazoezi Mlimani Primary School to become climate change advocates through training, workshops, and hands-on activities including waste management, tree planting, and site visits to conservation centers.', '200+ Youth Empowered', '/tree-planting-tanzania-youth-reforestation.jpg', 'TreePine', 'from-emca-primary to-emca-medium', '/projects#tuelimishe-mazingira', 2),
('Cleanup Drives', 'Cleaning Our Communities', 'Regular beach and community cleanup campaigns across Tanzania. Mobilizing volunteers to remove waste and protect ecosystems. We''ve successfully removed over 10,000 tonnes of plastic waste, preventing harm to marine life and the environment.', '10,000+ Tonnes Removed', '/beach-cleanup-volunteers-tanzania-coast.jpg', 'Trash2', 'from-emca-medium to-emca-darkest', '/projects#cleanup-drives', 3);

-- Create index for ordering
CREATE INDEX idx_projects_display_order ON projects(display_order);
CREATE INDEX idx_projects_is_active ON projects(is_active);
