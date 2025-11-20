-- Create reviews table for managing customer reviews/testimonials
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  text TEXT NOT NULL,
  image_url TEXT,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create updated_at trigger
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Disable RLS for now
ALTER TABLE reviews DISABLE ROW LEVEL SECURITY;

-- Insert existing reviews as seed data
INSERT INTO reviews (name, role, text, rating, display_order) VALUES
('Sarah Johnson', 'Environmental Science Student', 'Working with EMCA on the Binti Mazingira project has been life-changing. They truly empower women and girls while addressing critical environmental and health issues.', 5, 1),
('Dr. James Mwangi', 'Climate Change Researcher', 'EMCA''s approach to community-based environmental conservation is exemplary. Their work with youth in schools is building the next generation of environmental stewards.', 5, 2),
('Amina Hassan', 'Local Community Leader', 'The cleanup drives organized by EMCA have transformed our beaches. The dedication and passion of their volunteers is inspiring. Our community is cleaner and healthier.', 5, 3),
('Michael Peters', 'Corporate Partner', 'As a corporate partner, we''ve been impressed by EMCA''s professionalism and impact. Their projects deliver measurable results while creating lasting change in communities.', 5, 4);

-- Create indexes
CREATE INDEX idx_reviews_display_order ON reviews(display_order);
CREATE INDEX idx_reviews_is_active ON reviews(is_active);
