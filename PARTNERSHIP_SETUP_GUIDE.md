# Partnership System Setup Guide

## Overview
Complete partnership inquiry system with form submission, database storage, success notifications, and admin management.

## Step 1: Create the Partnerships Table in Supabase

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project

2. **Open SQL Editor**
   - Click "SQL Editor" in left sidebar
   - Click "New Query"

3. **Run the SQL Script**
   - Copy content from `scripts/12-create-partnerships-table.sql`
   - Paste and click "Run"
   - Should see: "Success. No rows returned"

This creates the `partnerships` table with fields:
- Organization details (name, type)
- Contact information (name, title, email, phone)
- Partnership interest and message
- Status tracking (pending, reviewing, approved, declined, completed)
- Notes and review tracking

## Step 2: Test the Partnership Form

1. **Visit the Partner Page**
   - Go to: http://localhost:3000/partner
   - Scroll to "Start a Conversation" section

2. **Fill Out the Form**
   - Organization Name (required)
   - Organization Type (required)
   - Contact Person (required)
   - Email (required)
   - Partnership Interest (required)
   - Message (required)
   - Optional: Title, Phone

3. **Submit**
   - Click "Submit Partnership Inquiry"
   - Should see success toast: "Partnership inquiry submitted successfully!"
   - Form will reset automatically

## Step 3: Access Admin Partnership Management

1. **Log in as Admin**
   - Go to: http://localhost:3000/login
   - Use admin credentials

2. **Navigate to Partnerships**
   - Go to: http://localhost:3000/admin/partnerships
   - Or click "Partnerships" from admin dashboard

3. **View Partnership Inquiries**
   - See all submitted inquiries
   - Status badges (pending, reviewing, approved, etc.)
   - Organization and contact details
   - Submission date

4. **Manage Inquiries**
   - Click "View Details" to see full information
   - Update status (pending → reviewing → approved/declined → completed)
   - Add notes about the partnership
   - Delete inquiries if needed

## Features Implemented

### ✅ Partnership Form (Public)
- Clean, user-friendly form
- Real-time validation
- Required field indicators (*)
- Success/error notifications
- Automatic form reset after submission
- Dropdown selections for consistency

### ✅ Database Integration
- All submissions saved to Supabase
- Proper data types and validation
- Status tracking system
- Timestamps for created/updated
- Admin notes field

### ✅ Admin Dashboard
- List all partnership inquiries
- Status badges with colors
- Quick view of key information
- Detailed view dialog
- Status update functionality
- Notes/comments system
- Delete functionality
- Responsive card layout

### ✅ Success Messages
- Toast notification on submission
- Clear success/error feedback
- User-friendly error messages
- Loading states during submission

## Status Workflow

1. **Pending** (Yellow) - New inquiry submitted
2. **Reviewing** (Blue) - Admin is reviewing
3. **Approved** (Green) - Partnership approved
4. **Declined** (Red) - Partnership declined
5. **Completed** (Purple) - Partnership finalized

## Organization Types Available
- Corporate
- NGO
- Academic Institution
- Government
- International Organization
- Other

## Partnership Interests Available
- Funding/Grants
- Corporate Social Responsibility
- Technical Support
- Research Collaboration
- Advocacy Partnership
- Other

## Troubleshooting

### Form doesn't submit
- Check browser console for errors
- Verify all required fields are filled
- Check Supabase connection in `.env.local`

### Admin page shows 404
- Ensure you're logged in as admin
- Check that admin role is set in user_metadata
- Restart dev server: `npm run dev`

### No partnerships showing in admin
- Run the SQL script in Supabase
- Submit a test partnership
- Check browser console for errors

### Success message doesn't appear
- Check that `sonner` toast is installed
- Verify toast component is in layout
- Check browser console for errors

## Testing Checklist

- [ ] SQL table created in Supabase
- [ ] Partnership form loads correctly
- [ ] All form fields work
- [ ] Form validation works
- [ ] Success toast appears on submission
- [ ] Data saved in Supabase database
- [ ] Admin page accessible
- [ ] Partnerships list displays
- [ ] Status updates work
- [ ] Delete functionality works
- [ ] Notes can be added
- [ ] Email addresses are clickable

## Next Steps

After setup:
1. Test form submission with different organization types
2. Review partnerships in admin dashboard
3. Update statuses to test workflow
4. Consider adding email notifications to admins
5. Consider adding automated responses to partners
6. Export partnership data for reporting

## File Locations

- **SQL Script**: `scripts/12-create-partnerships-table.sql`
- **Server Actions**: `lib/actions/partnerships.ts`
- **Form Component**: `components/partner/partnership-form.tsx`
- **Admin Page**: `app/admin/partnerships/page.tsx`
- **Admin Manager**: `components/admin/admin-partnerships-manager.tsx`
