-- Insert default news updates from the template
-- Run this after creating the news_updates table

INSERT INTO news_updates (title, content, excerpt, image, author, published_date, category, active, created_by) VALUES
(
  'Beach Cleanup Drive Removes 2 Tons of Plastic',
  'Our latest coastal cleanup in Dar es Salaam brought together 150 volunteers who collected over 2 tons of plastic waste, protecting marine life and restoring beach beauty. The event was a huge success, with community members of all ages coming together to make a real difference in preserving our beautiful coastline.

The cleanup covered a 5km stretch of beach and resulted in the collection of various types of plastic waste, including bottles, bags, fishing nets, and microplastics. All collected waste was properly sorted and sent to recycling facilities.

This initiative is part of our ongoing commitment to protecting Tanzania''s marine ecosystems and raising awareness about the impact of plastic pollution on our oceans.',
  'Our latest coastal cleanup in Dar es Salaam brought together 150 volunteers who collected over 2 tons of plastic waste, protecting marine life and restoring beach beauty.',
  '/beach-cleanup-volunteers-tanzania-coast.jpg',
  'EMCA Team',
  '2024-01-15 10:00:00',
  'Activities',
  true,
  'admin@emca.org'
),
(
  '5 Simple Ways to Reduce Plastic Use at Home',
  'Discover practical tips to minimize plastic consumption in your daily life. From reusable bags to composting, small changes make a big environmental impact.

1. Switch to Reusable Shopping Bags: Carry cloth or jute bags when shopping to avoid single-use plastic bags.

2. Use Refillable Water Bottles: Invest in a durable water bottle instead of buying bottled water.

3. Choose Products with Minimal Packaging: Buy in bulk and opt for products with biodegradable or recyclable packaging.

4. Start Composting: Reduce plastic waste by composting organic waste instead of using plastic garbage bags.

5. Say No to Plastic Straws: Use metal, bamboo, or paper straws, or skip straws altogether.

These simple changes can significantly reduce your household''s plastic footprint and contribute to a cleaner environment for future generations.',
  'Discover practical tips to minimize plastic consumption in your daily life. From reusable bags to composting, small changes make a big environmental impact.',
  '/eco-friendly-home-sustainable-living.jpg',
  'EMCA Team',
  '2024-01-12 14:30:00',
  'Eco tips',
  true,
  'admin@emca.org'
),
(
  'Binti Mazingira: Empowering 500 Girls in Muheza',
  'Our 6-month project funded by Ireland Embassy is transforming menstrual health and environmental sustainability for school girls aged 10-14 in Tanga region.

The Binti Mazingira project addresses two critical challenges: menstrual health management and environmental conservation. By providing reusable sanitary pads and environmental education, we''re helping girls stay in school while reducing plastic waste.

Key achievements so far:
- 500 girls trained in menstrual hygiene management
- 2,000 reusable sanitary pads distributed
- 50 environmental clubs established in schools
- 100 teachers trained as environmental champions

The project combines workshops on menstrual health, environmental conservation, and leadership skills. Girls learn to make their own reusable pads, reducing dependence on disposable products and minimizing environmental impact.

This holistic approach ensures that girls can attend school confidently while becoming environmental stewards in their communities.',
  'Our 6-month project funded by Ireland Embassy is transforming menstrual health and environmental sustainability for school girls aged 10-14 in Tanga region.',
  '/african-women-environmental-leaders-tanzania.jpg',
  'EMCA Team',
  '2024-01-10 09:00:00',
  'Projects',
  true,
  'admin@emca.org'
),
(
  'Youth Climate Summit: 200 Young Leaders Trained',
  'EMCA hosted a transformative climate summit where 200 youth from across Tanzania learned about climate action, sustainable practices, and environmental advocacy.

The three-day summit featured:
- Interactive workshops on climate change science and impacts
- Training sessions on environmental activism and community organizing
- Panel discussions with environmental leaders and policymakers
- Hands-on activities including tree planting and waste management

Participants came from 20 different regions of Tanzania, representing diverse backgrounds and communities. They left equipped with knowledge, skills, and action plans to implement environmental projects in their own communities.

The summit emphasized youth-led solutions to climate challenges, empowering young people to become agents of change. Follow-up programs will support participants as they implement their environmental initiatives throughout the year.

Together, these young leaders represent the future of environmental conservation in Tanzania.',
  'EMCA hosted a transformative climate summit where 200 youth from across Tanzania learned about climate action, sustainable practices, and environmental advocacy.',
  '/climate-youth-summit-tanzania.jpg',
  'EMCA Team',
  '2024-01-08 11:00:00',
  'Activities',
  true,
  'admin@emca.org'
),
(
  'Water Conservation: Smart Strategies for Dry Seasons',
  'Learn effective water-saving techniques for your home and garden. Rainwater harvesting, drip irrigation, and smart consumption can reduce water use by 40%.

As climate change brings more unpredictable rainfall patterns, water conservation becomes increasingly important. Here are proven strategies to conserve water:

Rainwater Harvesting:
- Install rain gutters and collection barrels
- Use collected water for gardens and cleaning
- Consider underground storage tanks for larger systems

Drip Irrigation:
- Direct water precisely to plant roots
- Reduce evaporation and runoff
- Save up to 50% compared to traditional sprinklers

Smart Indoor Use:
- Fix leaks promptly
- Install low-flow fixtures
- Use washing machines and dishwashers only with full loads
- Take shorter showers
- Turn off taps while brushing teeth or washing dishes

By implementing these strategies, households can significantly reduce water consumption while maintaining comfortable living standards. Every drop counts in building water security for our communities.',
  'Learn effective water-saving techniques for your home and garden. Rainwater harvesting, drip irrigation, and smart consumption can reduce water use by 40%.',
  '/water-tank-rainwater-harvesting-tanzania-village-c.jpg',
  'EMCA Team',
  '2024-01-05 15:00:00',
  'Eco tips',
  true,
  'admin@emca.org'
),
(
  'Tree Planting Initiative Reaches 10,000 Trees Milestone',
  'Celebrating a major achievement! Our Tuelimishe Mazingira project has successfully planted over 10,000 indigenous trees across Dar es Salaam schools and communities.

This milestone represents:
- 50 schools participating in the program
- 5,000 students directly involved in planting and maintenance
- 25 different indigenous species planted
- Estimated 200 tons of CO2 to be absorbed annually when trees mature

The Tuelimishe Mazingira (''Let''s Care for the Environment'') project goes beyond tree planting. We provide:

Education Programs:
- Environmental workshops for students and teachers
- Training on tree care and maintenance
- Climate change education

Community Engagement:
- Involving parents and local leaders
- Creating school environmental clubs
- Organizing tree care competitions

Long-term Monitoring:
- Regular tree survival assessments
- Replacement of trees that don''t survive
- Tracking growth and environmental impact

Our goal is to plant 50,000 trees by 2025, creating green spaces in urban areas while educating the next generation about environmental stewardship. Each tree planted is a step toward a greener, healthier Tanzania.',
  'Celebrating a major achievement! Our Tuelimishe Mazingira project has successfully planted over 10,000 indigenous trees across Dar es Salaam schools and communities.',
  '/african-students-planting-trees-at-school.jpg',
  'EMCA Team',
  '2024-01-03 10:00:00',
  'Projects',
  true,
  'admin@emca.org'
);

-- Verify the inserted records
SELECT id, title, category, published_date, active FROM news_updates ORDER BY published_date DESC;
