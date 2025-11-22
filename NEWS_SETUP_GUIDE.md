# Setting Up News & Updates in Supabase Database

This guide will help you set up the news_updates table and populate it with default news articles.

## Step 1: Create the news_updates Table

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project: `dobarsrlsnpggqekarnk`

2. **Open SQL Editor**
   - Click on the "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Run the Table Creation Script**
   - Copy the entire content from `scripts/10-create-content-tables.sql`
   - Paste it into the SQL Editor
   - Click "Run" button (or press Ctrl/Cmd + Enter)
   - You should see: "Success. No rows returned"

This creates 8 tables including:
- `hero_content`
- `about_sections`
- `philosophy_items`
- `impact_stats`
- `success_stories`
- `team_members`
- `gallery_items`
- `news_updates` ✅ (this is the one we need now)

## Step 2: Insert Default News Articles

1. **Open a New Query in SQL Editor**
   - Click "New Query" again

2. **Run the News Insertion Script**
   - Copy the entire content from `scripts/11-insert-default-news.sql`
   - Paste it into the SQL Editor
   - Click "Run"
   - You should see: "Success. 6 rows returned" showing your 6 news articles

## Step 3: Verify the Data

1. **Check the Table**
   - In Supabase Dashboard, go to "Table Editor"
   - Find and click on `news_updates` table
   - You should see 6 news articles:
     - Beach Cleanup Drive Removes 2 Tons of Plastic (Activities)
     - 5 Simple Ways to Reduce Plastic Use at Home (Eco tips)
     - Binti Mazingira: Empowering 500 Girls in Muheza (Projects)
     - Youth Climate Summit: 200 Young Leaders Trained (Activities)
     - Water Conservation: Smart Strategies for Dry Seasons (Eco tips)
     - Tree Planting Initiative Reaches 10,000 Trees Milestone (Projects)

## Step 4: Test Locally

1. **Restart your dev server** (if running):
   ```powershell
   # Stop the current server (Ctrl+C)
   npm run dev
   ```

2. **Visit your local site**: http://localhost:3000

3. **Test the Manage News button**:
   - Log in as admin
   - Go to Home page → News & Updates section
   - Click "Manage News" button
   - You should see all 6 news articles in the admin panel

4. **Test the category filtering**:
   - The news should appear in their respective categories:
     - "All Updates" - shows all 6
     - "Activities" - shows 2 articles
     - "Eco Tips" - shows 2 articles
     - "Projects" - shows 2 articles

## Step 5: Update Component to Fetch from Database (Optional)

The `components/home/news-updates.tsx` currently uses hardcoded data. To fetch from database:

1. Convert it to a server component (remove "use client")
2. Import and call `getAllNewsUpdates()` from `@/lib/actions/content`
3. Pass the data as props

**OR** keep it client-side and fetch on component mount using useEffect.

## Troubleshooting

### If tables already exist:
The scripts use `CREATE TABLE IF NOT EXISTS`, so they're safe to run multiple times.

### If you get permission errors:
Make sure you're using the Service Role key (not the anon key) in your `.env.local`:
```
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### If images don't show:
The image paths in the database point to `/public` folder images. Make sure these images exist:
- `/beach-cleanup-volunteers-tanzania-coast.jpg`
- `/eco-friendly-home-sustainable-living.jpg`
- `/african-women-environmental-leaders-tanzania.jpg`
- `/climate-youth-summit-tanzania.jpg`
- `/water-tank-rainwater-harvesting-tanzania-village-c.jpg`
- `/african-students-planting-trees-at-school.jpg`

### If news doesn't appear in Manage News:
1. Check browser console for errors
2. Verify the table was created successfully
3. Confirm environment variables are set in `.env.local`
4. Check that you're logged in as admin

## What's Next?

After setting up news, you can:
1. Add more news articles via the admin panel
2. Edit existing articles
3. Upload custom images for each article
4. Toggle articles active/inactive
5. Set up the other content tables (impact_stats, success_stories, etc.)

## Categories Available

The system supports these news categories:
- **General** - General updates and announcements
- **Events** - Upcoming and past events
- **Impact** - Impact stories and results
- **Community** - Community engagement activities
- **Environment** - Environmental education content
- **Education** - Educational programs and workshops

You can add articles to any of these categories from the admin panel!
