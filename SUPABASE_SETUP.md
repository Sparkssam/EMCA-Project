# Supabase Integration Setup Guide

This document explains how to set up and use Supabase with the EMCA website.

## Prerequisites

1. A Supabase account (sign up at https://supabase.com)
2. A new Supabase project created

## Setup Steps

### 1. Get Your Supabase Credentials

From your Supabase project dashboard:
- Go to Settings > API
- Copy your Project URL
- Copy your anon/public key

### 2. Add Environment Variables

Add these to your Vercel project or `.env.local`:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
\`\`\`

### 3. Run Database Scripts

Execute the SQL scripts in order from the `scripts/` folder:

1. `01-create-tables.sql` - Creates all database tables
2. `02-enable-rls.sql` - Enables Row Level Security policies
3. `03-seed-sample-data.sql` - Adds sample data (optional)

To run these:
- Go to your Supabase project dashboard
- Navigate to SQL Editor
- Copy and paste each script
- Click "Run"

### 4. Verify Setup

After running the scripts, verify:
- All tables are created (check Database > Tables)
- RLS is enabled on all tables
- Sample data is inserted (optional)

## Database Schema

### Tables

- **blog_posts**: Blog articles and stories
- **projects**: Environmental projects and initiatives
- **donations**: Donation records
- **volunteers**: Volunteer applications
- **partnerships**: Partnership inquiries
- **newsletter_subscribers**: Email newsletter subscriptions

## Usage in Code

### Server Components

\`\`\`typescript
import { getSupabaseServerClient } from '@/lib/supabase/server'

const supabase = await getSupabaseServerClient()
const { data } = await supabase.from('blog_posts').select('*')
\`\`\`

### Client Components

\`\`\`typescript
import { getSupabaseBrowserClient } from '@/lib/supabase/client'

const supabase = getSupabaseBrowserClient()
const { data } = await supabase.from('blog_posts').select('*')
\`\`\`

### Server Actions

Use the pre-built actions in `lib/actions/`:
- `subscribeToNewsletter(email)`
- `submitVolunteerApplication(data)`
- `submitPartnershipInquiry(data)`

## Security

- Row Level Security (RLS) is enabled on all tables
- Public data (blog posts, projects) is readable by everyone
- Private data (donations, applications) is only accessible by the owner
- Write operations are controlled by RLS policies

## Next Steps

1. Connect Supabase to your Vercel deployment
2. Test all forms and data fetching
3. Customize RLS policies as needed
4. Set up Supabase Auth if user authentication is required
5. Configure Supabase Storage for image uploads

## Support

For issues or questions:
- Supabase Documentation: https://supabase.com/docs
- EMCA Technical Team: tech@emca.or.tz
