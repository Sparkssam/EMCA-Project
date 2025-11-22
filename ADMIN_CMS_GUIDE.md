# Comprehensive Admin Content Management System

## 🎯 Overview

You now have a centralized content management system that allows admins to edit, add, and delete content across the entire website. Each major section has a "Manage [Section]" button visible only to admins.

## ✅ What's Been Set Up

### 1. **Database Tables Created**
File: `scripts/10-create-content-tables.sql`

Tables for managing all content:
- `hero_content` - Hero sections for all pages
- `about_sections` - About page content blocks  
- `philosophy_items` - Philosophy principles
- `impact_stats` - Impact metrics (trees planted, etc.)
- `success_stories` - Transformation stories
- `team_members` - Team member profiles
- `gallery_items` - Gallery images
- `news_updates` - News articles
- `events` - Events (already created earlier)
- `projects` - Projects (already exists)

### 2. **Server Actions Created**
File: `lib/actions/content.ts`

Complete CRUD operations for:
- Hero Content (getAllHeroContent, updateHeroContent)
- About Sections (CRUD operations)
- Philosophy Items (CRUD operations)
- Impact Stats (CRUD operations)
- Success Stories (CRUD operations)

### 3. **Admin Components**
- `components/admin/admin-section-button.tsx` - Reusable "Manage [Section]" button
- `components/admin/admin-events-manager.tsx` - Full events management (already created)
- `app/admin/content/page.tsx` - Central content management dashboard

### 4. **Admin Routes**
- `/admin/content` - Content management hub
- `/admin/events` - Manage events (already working)
- `/admin/projects` - Manage projects (already exists)
- `/admin/volunteers` - Manage volunteers (already exists)
- `/admin/reviews` - Manage reviews (already exists)

## 🚀 Setup Instructions

### Step 1: Run SQL Script

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Create new query
3. Copy contents of `scripts/10-create-content-tables.sql`
4. Run the script
5. Verify tables created:
   ```sql
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name LIKE '%content%' OR table_name LIKE '%sections%';
   ```

### Step 2: Access Admin Content Dashboard

1. Log in as admin
2. Navigate to: `/admin/content`
3. You'll see cards for all content sections
4. Click any card to manage that content type

### Step 3: Add "Manage" Buttons to Pages

The system is designed so that each section on every page can have a "Manage [Section]" button. Here's how it works:

**Example - Events Section (Already Implemented):**
```typescript
// In components/home/events-section.tsx
import { AdminSectionButton } from "@/components/admin/admin-section-button"

export function EventsSection({ isAdmin = false }: { isAdmin?: boolean }) {
  return (
    <section>
      <div className="flex items-center justify-center gap-4">
        <h2>Events & Activities</h2>
        <AdminSectionButton 
          section="Events" 
          href="/admin/events" 
          isAdmin={isAdmin} 
        />
      </div>
      {/* Rest of section... */}
    </section>
  )
}
```

**To Add to Other Sections:**
1. Import `AdminSectionButton`
2. Add `isAdmin` prop to component
3. Add button next to section heading
4. Pass `isAdmin` from page component

### Step 4: Create Admin Management Pages

For each content type, create an admin page similar to the events manager:

**Template Structure:**
```
app/
  admin/
    content/
      about/
        page.tsx          (Admin page with CRUD UI)
      philosophy/
        page.tsx
      impact-stats/
        page.tsx
      success-stories/
        page.tsx
      gallery/
        page.tsx
      news/
        page.tsx
```

**Each page should:**
- Check admin authentication
- List all items
- Provide Create/Edit/Delete dialogs
- Use server actions from `lib/actions/content.ts`
- Include image upload (like events manager)
- Show success/error toasts

## 📋 Current Admin Capabilities

### ✅ **Fully Implemented (Ready to Use)**

1. **Events & Activities** (`/admin/events`)
   - Create, edit, delete events
   - Upload images
   - Set event status (upcoming/ongoing/past)
   - Manage attendees and registration
   - **Works on homepage** - "Manage Events" button visible to admins

2. **Projects** (`/admin/projects`)
   - Full project management
   - Already implemented

3. **Volunteers** (`/admin/volunteers`)
   - View and manage volunteer applications
   - Already implemented

4. **Reviews** (`/admin/reviews`)
   - Approve/reject reviews
   - Already implemented

### ⏳ **Database Ready (Need Admin UI)**

These have database tables and server actions ready, just need admin UI pages:

1. **Hero Content** - Update hero sections on any page
2. **About Sections** - Manage about page content blocks
3. **Philosophy Items** - Edit philosophy principles
4. **Impact Stats** - Update metrics (trees planted, etc.)
5. **Success Stories** - Add/edit transformation stories
6. **Gallery** - Manage gallery images
7. **News & Updates** - Post articles and updates

## 🛠️ How to Complete the System

### Option 1: Build Admin UIs Gradually

Create one admin management page at a time when needed:

1. **Start with most important**: Impact Stats
   - Copy `/admin/events/page.tsx` structure
   - Replace with `impact_stats` server actions
   - Simpler form (just value, label, change_text)

2. **Then**: Success Stories
   - Similar to events but with quote field
   - Upload images for stories

3. **Then**: About Sections, Philosophy, etc.

### Option 2: Use Existing Pattern

The events manager (`components/admin/admin-events-manager.tsx`) is a complete template. For each new content type:

1. Copy `admin-events-manager.tsx`
2. Rename to match content type
3. Update interfaces to match database schema
4. Replace server action imports
5. Adjust form fields
6. Create corresponding page in `/admin/content/[type]/page.tsx`

### Option 3: Quick Manual Editing

For now, admins can edit directly in Supabase:

1. Go to Supabase Dashboard → Table Editor
2. Select table (e.g., `impact_stats`)
3. Click rows to edit
4. Save changes
5. Changes reflect immediately on website

## 📊 Database Schema Reference

### Impact Stats Table
```sql
impact_stats (
  id,
  label TEXT,           -- "Trees Planted"
  value TEXT,           -- "52,000+"
  change_text TEXT,     -- "+12,000 this year"
  icon TEXT,            -- "TreePine"
  stat_order INTEGER,
  active BOOLEAN
)
```

### Success Stories Table
```sql
success_stories (
  id,
  title TEXT,
  location TEXT,
  story TEXT,
  quote TEXT,
  author TEXT,
  image TEXT,
  story_order INTEGER,
  active BOOLEAN
)
```

### Philosophy Items Table
```sql
philosophy_items (
  id,
  title TEXT,
  description TEXT,
  icon TEXT,
  color TEXT,
  item_order INTEGER,
  active BOOLEAN
)
```

## 🎨 Admin UI Best Practices

When building admin pages, follow this pattern:

1. **List View**
   - Show all items in cards or table
   - Quick actions (Edit/Delete) on each item
   - "Create New" button at top

2. **Create/Edit Dialog**
   - Modal/dialog for forms
   - All required fields
   - Image upload with preview
   - Order/priority field
   - Active/inactive toggle

3. **Validation**
   - Check required fields
   - Show error toasts
   - Prevent duplicate submissions

4. **Feedback**
   - Success toasts on save
   - Error messages if fails
   - Loading states during API calls

5. **Real-time Updates**
   - Use `revalidatePath()` in server actions
   - Reload list after changes
   - Show updated content immediately

## 🔐 Security

All admin routes are protected:
```typescript
const { data: { user } } = await supabase.auth.getUser()
if (!user || user.user_metadata?.role !== "admin") {
  redirect("/login")
}
```

Only users with `role: "admin"` in their user metadata can:
- See "Manage" buttons
- Access `/admin/*` routes
- Create/edit/delete content

## 📖 Usage Examples

### Adding a New Impact Stat

**Via Supabase Dashboard:**
1. Go to Table Editor → `impact_stats`
2. Click "Insert row"
3. Fill in:
   - label: "Communities Served"
   - value: "150+"
   - change_text: "+30 this year"
   - icon: "Building2"
   - stat_order: 3
   - active: true
4. Save
5. Refresh homepage - new stat appears

**Via Admin UI (once built):**
1. Go to `/admin/content/impact-stats`
2. Click "Create Stat"
3. Fill form
4. Upload icon (optional)
5. Save
6. Appears on homepage immediately

### Updating About Section

**Via Supabase Dashboard:**
1. Table Editor → `about_sections`
2. Find row to edit
3. Update `content` or `image`
4. Save
5. Changes live on `/about` page

## 🚀 Next Steps

### Immediate (Can Do Now):
1. ✅ Run SQL script to create tables
2. ✅ Access admin content dashboard at `/admin/content`
3. ✅ Use Supabase Table Editor to manually add/edit content
4. ✅ Test that "Manage Events" button works

### Short Term (Build as Needed):
1. Create admin UI for Impact Stats
2. Create admin UI for Success Stories
3. Create admin UI for Philosophy Items
4. Add "Manage" buttons to more homepage sections

### Long Term (Full CMS):
1. Build all admin management pages
2. Add bulk actions
3. Add content scheduling
4. Add revision history
5. Add media library
6. Add content preview before publish

## 💡 Tips

- **Start Small**: Build admin UIs for most-edited content first
- **Use Templates**: Copy events manager structure for new pages
- **Test Locally**: Always test on localhost before deploying
- **Backup Data**: Export tables before making major changes
- **Monitor Logs**: Check terminal for server action errors

---

**You're all set!** The foundation is in place. Now you can either:
1. Build admin UIs gradually as needed
2. Use Supabase Dashboard for quick edits
3. Let me know which specific admin page you want built first and I'll create it! 🎉
