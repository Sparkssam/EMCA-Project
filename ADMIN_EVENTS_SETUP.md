# Admin Events Management System - Setup & Testing Guide

## ✅ What's Been Created

### 1. Database Schema
- **File**: `scripts/09-create-events-table.sql`
- **Contains**: Events table with 16 columns, indexes, and 6 sample events

### 2. Server Actions
- **File**: `lib/actions/events.ts`
- **Functions**:
  - `getAllEvents()` - Fetch all events
  - `getEventsByStatus(status)` - Filter by status
  - `getEventById(id)` - Get single event
  - `createEvent(data, userEmail)` - Create new event
  - `updateEvent(id, data, userEmail)` - Update existing event
  - `deleteEvent(id)` - Delete event
  - `uploadEventImage(formData)` - Upload images to Supabase Storage

### 3. Admin Interface
- **File**: `components/admin/admin-events-manager.tsx`
- **Features**:
  - View all events in a list
  - Create new events with form dialog
  - Edit existing events
  - Delete events with confirmation
  - Image preview and upload
  - Form validation

### 4. Admin Page Route
- **File**: `app/admin/events/page.tsx`
- **Protection**: Only accessible to users with admin role
- **Redirects**: Non-admins → homepage, unauthenticated → login

### 5. Updated Homepage Events Section
- **File**: `components/home/events-section.tsx`
- **Changes**:
  - Loads events from database instead of hardcoded array
  - Shows "Manage Events" button for admins
  - Loading state while fetching data
  - Real-time countdown timers
  - Tab filtering (upcoming/ongoing/past)

### 6. Updated Homepage
- **File**: `app/page.tsx`
- **Changes**:
  - Checks if user is admin
  - Passes `isAdmin` prop to EventsSection

## 🚀 Setup Instructions

### Step 1: Run the SQL Script

1. Go to your **Supabase Dashboard**: https://supabase.com/dashboard
2. Select your project: `dobarsrlsnpggqekarnk`
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy the entire contents of `scripts/09-create-events-table.sql`
6. Paste into the SQL Editor
7. Click **Run** (or press Ctrl+Enter)
8. You should see: "Success. No rows returned"
9. Verify table created:
   ```sql
   SELECT * FROM events ORDER BY start_date DESC;
   ```
   You should see 6 sample events

### Step 2: Set Up Supabase Storage (Optional - for future image uploads)

1. In Supabase Dashboard, go to **Storage**
2. Create a new bucket named `images` (if not exists)
3. Set it to **Public** (for image access)
4. Create a folder inside called `events/`

### Step 3: Test Locally

1. Start your development server:
   ```powershell
   npm run dev
   ```

2. Open browser: http://localhost:3000

3. **Test as Visitor** (not logged in):
   - Go to homepage
   - Scroll to "Events & Activities" section
   - Should see events loaded from database
   - Should NOT see "Manage Events" button
   - Test tab filtering (upcoming/ongoing/past)
   - Test countdown timers on upcoming events

4. **Test as Admin**:
   - Log in as admin user
   - Go to homepage - should see "Manage Events" button
   - Click "Manage Events" → redirects to `/admin/events`
   - You should see all 6 events in the admin interface

5. **Test CRUD Operations**:
   
   **Create Event**:
   - Click "Create Event" button
   - Fill in all required fields:
     - Title: "Test Event"
     - Description: "Testing event creation"
     - Status: Upcoming
     - Start Date & Time: Choose future date
     - Location: "Test Location"
     - Image: "/placeholder.svg" (or any existing image path)
   - Click "Save"
   - Should see success toast
   - Event appears in the list

   **Edit Event**:
   - Click Edit button (pencil icon) on any event
   - Change the title or description
   - Click "Save Changes"
   - Should see success toast
   - Changes reflected immediately

   **Delete Event**:
   - Click Delete button (trash icon) on test event
   - Confirm deletion
   - Should see success toast
   - Event removed from list

### Step 4: Verify Homepage Updates

1. Go back to homepage
2. The events section should now show database events
3. Changes made in admin panel should reflect here immediately
4. Test that countdown timers work for upcoming events
5. Test registration links on upcoming events

## 🎨 Features Explanation

### For Admins

**Admin Dashboard**: `/admin/events`
- Full CRUD interface
- Visual event cards with quick actions
- Form validation
- Success/error notifications
- Image preview
- Attendee tracking

**Edit Mode on Homepage**:
- "Manage Events" button visible only to admins
- Quick access to admin panel from public site

### For Visitors

**Events Section** (Homepage):
- Tab filtering by status
- Countdown timers for upcoming events
- Event details (date, location, attendees)
- Video links (if available)
- Registration buttons for upcoming events
- Responsive grid layout

## 🔧 Customization Options

### Change Event Status Colors

Edit `components/home/events-section.tsx`:
```typescript
const getStatusBadge = (status: EventStatus) => {
  const badges = {
    upcoming: "bg-blue-500/10 text-blue-600",    // Change colors here
    ongoing: "bg-green-500/10 text-green-600",
    past: "bg-gray-500/10 text-gray-600",
  }
  return badges[status]
}
```

### Add Image Upload from Computer

Currently, you need to:
1. Upload images to `/public` folder
2. Reference as `/image-name.jpg` in the form

**Future Enhancement**: Implement direct file upload using the `uploadEventImage()` function in `lib/actions/events.ts`

### Automatic Status Updates

**To auto-update event status based on dates**, add a cron job or Edge Function:
```sql
-- Function to update event statuses
CREATE OR REPLACE FUNCTION update_event_statuses()
RETURNS void AS $$
BEGIN
  UPDATE events
  SET status = CASE
    WHEN start_date > NOW() THEN 'upcoming'
    WHEN end_date IS NOT NULL AND end_date < NOW() THEN 'past'
    ELSE 'ongoing'
  END;
END;
$$ LANGUAGE plpgsql;
```

## 📝 Troubleshooting

### Events Not Loading on Homepage

1. Check browser console for errors
2. Verify SQL script ran successfully:
   ```sql
   SELECT COUNT(*) FROM events;
   ```
   Should return at least 6

3. Check Supabase connection in `.env.local`

### "Not Authorized" Error

1. Make sure you're logged in as admin
2. Verify user metadata has `role: "admin"`:
   ```sql
   SELECT raw_user_meta_data FROM auth.users WHERE email = 'your-admin-email@example.com';
   ```

3. Update user role if needed:
   ```sql
   UPDATE auth.users
   SET raw_user_meta_data = jsonb_set(raw_user_meta_data, '{role}', '"admin"')
   WHERE email = 'your-admin-email@example.com';
   ```

### Images Not Displaying

1. Ensure images are in `/public` folder
2. Use paths starting with `/` (e.g., `/image.jpg`)
3. Or use full URLs for external images

### Build Errors

If you get TypeScript errors:
```powershell
npm run build
```

Check the error messages and ensure all imports are correct.

## 🚢 Deployment to Vercel

### Before Deploying

1. Commit all changes:
   ```powershell
   git add .
   git commit -m "Add admin events management system"
   git push origin main
   ```

2. Ensure environment variables are set in Vercel:
   - Go to https://vercel.com/dashboard
   - Select your project
   - Go to **Settings** → **Environment Variables**
   - Add if missing:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `RESEND_API_KEY`

3. Vercel will auto-deploy from main branch

### After Deployment

1. Visit your production URL
2. Test events section loads
3. Log in as admin
4. Test CRUD operations in production

## 📊 Database Schema Reference

```sql
events (
  id                  SERIAL PRIMARY KEY,
  title              TEXT NOT NULL,
  description        TEXT NOT NULL,
  status             TEXT CHECK ('upcoming', 'ongoing', 'past'),
  start_date         TIMESTAMPTZ NOT NULL,
  end_date           TIMESTAMPTZ,
  location           TEXT NOT NULL,
  image              TEXT NOT NULL,
  video_url          TEXT,
  attendees          INTEGER DEFAULT 0,
  max_attendees      INTEGER,
  registration_link  TEXT,
  created_at         TIMESTAMPTZ DEFAULT NOW(),
  updated_at         TIMESTAMPTZ DEFAULT NOW(),
  created_by         TEXT,
  updated_by         TEXT
)
```

## 🎯 Next Steps

### Enhancements You Can Add

1. **Rich Text Editor**: Replace textarea with TipTap or Quill for formatted descriptions
2. **Image Upload**: Add file upload from admin panel to Supabase Storage
3. **Bulk Actions**: Select multiple events and delete/update status
4. **Search & Filter**: Add search bar in admin panel
5. **Event Categories**: Add tags/categories for different event types
6. **Email Notifications**: Send emails to subscribers when new events are created
7. **Calendar View**: Display events in calendar format
8. **Event Analytics**: Track views, registrations, and attendee engagement
9. **Recurring Events**: Add support for events that repeat weekly/monthly

### Testing Checklist

- [ ] SQL script executed successfully
- [ ] 6 sample events visible in database
- [ ] Homepage loads events without errors
- [ ] Tab filtering works (upcoming/ongoing/past)
- [ ] Countdown timers display correctly
- [ ] Admin can access `/admin/events`
- [ ] Create event works
- [ ] Edit event works
- [ ] Delete event works
- [ ] Changes reflect on homepage immediately
- [ ] Non-admin users cannot access admin page
- [ ] "Manage Events" button only shows for admins

## 📞 Support

If you encounter any issues:
1. Check browser console for JavaScript errors
2. Check terminal for server errors
3. Verify Supabase credentials in `.env.local`
4. Ensure you're on the `main` branch with latest code

---

**Great job!** 🎉 You now have a fully functional admin events management system with database integration!
