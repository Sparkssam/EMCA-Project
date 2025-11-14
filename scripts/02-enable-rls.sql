-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Blog posts are viewable by everyone" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can insert blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Authors can update their own posts" ON blog_posts;
DROP POLICY IF EXISTS "Projects are viewable by everyone" ON projects;
DROP POLICY IF EXISTS "Authenticated users can insert projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can update projects" ON projects;
DROP POLICY IF EXISTS "Users can view their own donations" ON donations;
DROP POLICY IF EXISTS "Anyone can insert donations" ON donations;
DROP POLICY IF EXISTS "Users can view their own volunteer applications" ON volunteers;
DROP POLICY IF EXISTS "Anyone can submit volunteer applications" ON volunteers;
DROP POLICY IF EXISTS "Users can view their own partnership inquiries" ON partnerships;
DROP POLICY IF EXISTS "Anyone can submit partnership inquiries" ON partnerships;
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Users can view their own subscription" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Users can update their own subscription" ON newsletter_subscribers;

-- Enable Row Level Security on all tables
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnerships ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Blog Posts Policies
CREATE POLICY "Blog posts are viewable by everyone"
  ON blog_posts FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users can insert blog posts"
  ON blog_posts FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authors can update their own posts"
  ON blog_posts FOR UPDATE
  USING (auth.uid() = author_id);

-- Projects Policies
CREATE POLICY "Projects are viewable by everyone"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON projects FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Donations Policies (private data)
CREATE POLICY "Users can view their own donations"
  ON donations FOR SELECT
  USING (donor_email = auth.jwt()->>'email');

CREATE POLICY "Anyone can insert donations"
  ON donations FOR INSERT
  WITH CHECK (true);

-- Volunteers Policies
CREATE POLICY "Users can view their own volunteer applications"
  ON volunteers FOR SELECT
  USING (email = auth.jwt()->>'email');

CREATE POLICY "Anyone can submit volunteer applications"
  ON volunteers FOR INSERT
  WITH CHECK (true);

-- Partnerships Policies
CREATE POLICY "Users can view their own partnership inquiries"
  ON partnerships FOR SELECT
  USING (contact_email = auth.jwt()->>'email');

CREATE POLICY "Anyone can submit partnership inquiries"
  ON partnerships FOR INSERT
  WITH CHECK (true);

-- Newsletter Subscribers Policies
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view their own subscription"
  ON newsletter_subscribers FOR SELECT
  USING (email = auth.jwt()->>'email');

CREATE POLICY "Users can update their own subscription"
  ON newsletter_subscribers FOR UPDATE
  USING (email = auth.jwt()->>'email');
