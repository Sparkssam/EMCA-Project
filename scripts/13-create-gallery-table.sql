-- Create gallery table for managing gallery images
-- Run this in Supabase SQL Editor

-- Create the gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  image_url TEXT NOT NULL,
  size VARCHAR(20) DEFAULT 'normal' CHECK (size IN ('normal', 'large', 'tall', 'wide')),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);
CREATE INDEX IF NOT EXISTS idx_gallery_display_order ON gallery(display_order);
CREATE INDEX IF NOT EXISTS idx_gallery_is_active ON gallery(is_active);

-- Enable Row Level Security
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Anyone can view active gallery items
CREATE POLICY "Anyone can view active gallery items"
ON gallery FOR SELECT
USING (is_active = true);

-- Authenticated users can view all gallery items (including inactive)
CREATE POLICY "Authenticated users can view all gallery items"
ON gallery FOR SELECT
USING (auth.role() = 'authenticated');

-- Authenticated users can insert gallery items
CREATE POLICY "Authenticated users can insert gallery items"
ON gallery FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Authenticated users can update gallery items
CREATE POLICY "Authenticated users can update gallery items"
ON gallery FOR UPDATE
USING (auth.role() = 'authenticated');

-- Authenticated users can delete gallery items
CREATE POLICY "Authenticated users can delete gallery items"
ON gallery FOR DELETE
USING (auth.role() = 'authenticated');

-- Create storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery-images', 'gallery-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for gallery images
CREATE POLICY "Public Access for Gallery Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery-images');

CREATE POLICY "Authenticated users can upload gallery images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'gallery-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update gallery images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'gallery-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete gallery images"
ON storage.objects FOR DELETE
USING (bucket_id = 'gallery-images' AND auth.role() = 'authenticated');

-- Insert default gallery items from existing hardcoded data
INSERT INTO gallery (title, description, category, image_url, size, display_order) VALUES
('Youth Tree Planting', 'Students participating in our Green Schools Initiative', 'Education', '/african-students-planting-trees-at-school.jpg', 'large', 1),
('Beach Cleanup Drive', 'Monthly beach cleanup drive in Dar es Salaam', 'Cleanup', '/beach-cleanup-volunteers-tanzania-coast.jpg', 'normal', 2),
('Sustainable Farming', 'Training communities in eco-friendly farming practices', 'Agriculture', '/african-farmers-sustainable-agriculture.jpg', 'tall', 3),
('Binti Mazingira Workshop', 'Young women leading environmental change', 'Women Empowerment', '/african-women-environmental-leaders-tanzania.jpg', 'normal', 4),
('Tuelimishe Mazingira', 'Large-scale tree planting campaign', 'Reforestation', '/tree-planting-tanzania-youth-reforestation.jpg', 'normal', 5),
('Community Action Day', 'Local communities restoring green spaces', 'Community', '/african-youth-planting-trees-in-tanzania--lush-gre.jpg', 'wide', 6),
('Forest Restoration', 'Restoring degraded forest areas', 'Conservation', '/tree-planting-in-tanzania--environmental-conservat.jpg', 'normal', 7),
('Empowerment Workshop', 'Community environmental education sessions', 'Workshops', '/african-community-gathering--empowerment-workshop.jpg', 'normal', 8),
('Youth Leadership Summit', 'Empowering the next generation of environmental leaders', 'Education', '/young-african-leaders--youth-empowerment-tanzania.jpg', 'normal', 9),
('Organic Farming Initiative', 'Teaching sustainable agricultural practices to local farmers', 'Agriculture', '/sustainable-farming-tanzania--eco-friendly-develop.jpg', 'large', 10),
('Eco-Tourism Training', 'Building sustainable livelihoods through conservation', 'Conservation', '/eco-tourism-tanzania-wildlife-guides-nature.jpg', 'normal', 11),
('Urban Gardens Project', 'Creating green spaces in urban communities', 'Community', '/urban-garden-tanzania-rooftop-farming-vegetables-c.jpg', 'tall', 12);
