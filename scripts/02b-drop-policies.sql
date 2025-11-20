-- Drop existing policies if they exist
-- Blog Posts Policies
DROP POLICY IF EXISTS "Blog posts are viewable by everyone" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can insert blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Authors can update their own posts" ON blog_posts;

-- Projects Policies
DROP POLICY IF EXISTS "Projects are viewable by everyone" ON projects;
DROP POLICY IF EXISTS "Authenticated users can insert projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can update projects" ON projects;

-- Donations Policies
DROP POLICY IF EXISTS "Users can view their own donations" ON donations;
DROP POLICY IF EXISTS "Anyone can insert donations" ON donations;

-- Volunteers Policies
DROP POLICY IF EXISTS "Users can view their own volunteer applications" ON volunteers;
DROP POLICY IF EXISTS "Anyone can submit volunteer applications" ON volunteers;

-- Partnerships Policies
DROP POLICY IF EXISTS "Users can view their own partnership inquiries" ON partnerships;
DROP POLICY IF EXISTS "Anyone can submit partnership inquiries" ON partnerships;

-- Newsletter Subscribers Policies
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Users can view their own subscription" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Users can update their own subscription" ON newsletter_subscribers;
