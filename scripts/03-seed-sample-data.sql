-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, author_id, category, tags, featured_image, published, published_at)
VALUES 
  (
    'How 500 Young Tanzanians Are Rewriting the Climate Narrative',
    'youth-climate-summit-2025',
    'At the first-ever Youth Climate Summit in Dar es Salaam, young leaders from across Tanzania gathered to share solutions, forge partnerships, and demand action.',
    'Full article content here...',
    uuid_generate_v4(),
    'Climate Action',
    ARRAY['youth', 'climate', 'summit'],
    '/climate-youth-summit-tanzania.jpg',
    true,
    NOW()
  ),
  (
    'The Forest That Came Back: A Reforestation Success Story',
    'kilimanjaro-reforestation-success',
    'How a degraded hillside became a thriving ecosystem through community-led reforestation efforts in Kilimanjaro.',
    'Full article content here...',
    uuid_generate_v4(),
    'Conservation',
    ARRAY['reforestation', 'community', 'success'],
    '/reforestation-success-tanzania.jpg',
    true,
    NOW() - INTERVAL '3 days'
  );

-- Insert sample projects
INSERT INTO projects (title, slug, description, location, category, status, start_date, participants, impact_metrics, featured_image)
VALUES 
  (
    'Green Schools Initiative',
    'green-schools-initiative',
    'Transforming 50 schools into eco-friendly learning spaces with tree planting, waste management, and environmental education programs.',
    'Dar es Salaam',
    'Education',
    'ongoing',
    '2024-01-01',
    2500,
    '{"trees_planted": 15000, "schools_transformed": 50}'::jsonb,
    '/african-students-planting-trees-at-school.jpg'
  ),
  (
    'Coastal Cleanup Campaign',
    'coastal-cleanup-zanzibar',
    'Protecting marine ecosystems through beach cleanups, plastic reduction workshops, and community awareness programs.',
    'Zanzibar',
    'Conservation',
    'ongoing',
    '2023-06-01',
    800,
    '{"waste_removed_tons": 25, "beaches_restored": 12}'::jsonb,
    '/beach-cleanup-volunteers-tanzania-coast.jpg'
  ),
  (
    'Sustainable Farming Project',
    'sustainable-farming-morogoro',
    'Empowering rural farmers with organic farming techniques, water conservation, and market access for sustainable livelihoods.',
    'Morogoro',
    'Agriculture',
    'active',
    '2024-01-01',
    350,
    '{"farmers_trained": 350, "yield_increase_percent": 60}'::jsonb,
    '/african-farmers-sustainable-agriculture.jpg'
  );

-- Note: Donations, volunteers, partnerships, and newsletter subscribers
-- will be populated through the application forms
