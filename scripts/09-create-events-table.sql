-- Create events table for storing all events (upcoming, ongoing, past)
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('upcoming', 'ongoing', 'past')),
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  location TEXT NOT NULL,
  image TEXT NOT NULL,
  video_url TEXT,
  attendees INTEGER DEFAULT 0,
  max_attendees INTEGER,
  registration_link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by TEXT,
  updated_by TEXT
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date DESC);

-- Insert sample data (matching existing events)
INSERT INTO events (title, description, status, start_date, end_date, location, image, attendees, max_attendees, registration_link) VALUES
('World Environment Day Celebration 2024', 'Join us for a full day of environmental activities including tree planting, beach cleanup, and educational workshops on climate action.', 'upcoming', '2024-06-05 09:00:00+03', '2024-06-05 17:00:00+03', 'Coco Beach, Dar es Salaam', '/beach-cleanup-volunteers-tanzania-coast.jpg', 87, 200, '/volunteer'),
('Youth Climate Leadership Training', 'A 3-day intensive training program empowering young leaders with skills and knowledge to drive climate action in their communities.', 'ongoing', '2024-02-15 08:00:00+03', '2024-02-17 16:00:00+03', 'EMCA Training Center, Ubungo', '/climate-youth-summit-tanzania.jpg', 45, 50, NULL),
('Community Tree Planting Marathon', 'Successfully planted 5,000 indigenous trees across 10 schools in Dar es Salaam with over 300 students and community volunteers.', 'past', '2024-01-20 07:00:00+03', '2024-01-20 14:00:00+03', 'Multiple Schools, Dar es Salaam', '/african-students-planting-trees-at-school.jpg', 312, NULL, NULL),
('Sustainable Agriculture Workshop', 'Learn practical techniques for eco-friendly farming, composting, water conservation, and organic pest management from expert farmers.', 'upcoming', '2024-03-10 09:00:00+03', '2024-03-10 15:00:00+03', 'Morogoro Agricultural Center', '/african-farmers-sustainable-agriculture.jpg', 23, 60, '/volunteer'),
('Binti Mazingira Product Launch', 'Celebrating the launch of locally-produced reusable sanitary pads by our trained youth tailors, promoting both environmental sustainability and economic empowerment.', 'ongoing', '2024-02-01 10:00:00+03', '2024-02-28 17:00:00+03', 'Muheza District, Tanga', '/african-women-environmental-leaders-tanzania.jpg', 125, NULL, NULL),
('Coastal Cleanup Campaign', 'Our largest beach cleanup event removed 3.2 tons of plastic waste from Dar es Salaam coastline with incredible community support.', 'past', '2023-12-15 06:00:00+03', '2023-12-15 12:00:00+03', 'Msasani Peninsula, Dar es Salaam', '/beach-cleanup-volunteers-tanzania-coast.jpg', 428, NULL, NULL);

-- Enable RLS (optional - disable if you want admins to manage without policies)
-- ALTER TABLE events ENABLE ROW LEVEL SECURITY;
