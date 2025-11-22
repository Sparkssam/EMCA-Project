# Volunteer Approval System - Setup Guide

## ✅ What's Been Created

The volunteer approval system is now complete with the following features:

### Backend (Server Actions)
- `lib/actions/volunteer-management.ts` - 5 server actions:
  - **approveVolunteerAndCreateAccount()** - Approves volunteer and creates Supabase Auth login account
  - **updateVolunteerPassword()** - Change volunteer password anytime
  - **rejectVolunteer()** - Reject application with optional reason
  - **deleteVolunteerAccount()** - Delete volunteer and their auth account
  - **addAdminNotes()** - Add private admin notes

### Frontend (UI Components)
- `components/admin/volunteers-manager.tsx` - Complete management interface with:
  - Card view for each volunteer application
  - Status badges (Pending/Approved/Rejected)
  - Statistics counters at the top
  - Action buttons:
    - ✅ **Approve & Create Account** (for pending volunteers)
    - ❌ **Reject** (for pending volunteers)
    - 🔑 **Change Password** (for approved volunteers)
    - 📝 **Add/Edit Notes** (for all volunteers)
    - 🗑️ **Delete** (for all volunteers)
  - Dialogs for each action with form validation

### Database Schema
- `scripts/06-add-volunteer-approval-columns.sql` - Adds columns to volunteers table:
  - `is_approved` BOOLEAN - Whether volunteer has been approved
  - `user_id` UUID - Links to auth.users table
  - `approved_at` TIMESTAMPTZ - When approved
  - `approved_by` VARCHAR(255) - Admin email who approved
  - `notes` TEXT - Private admin notes

---

## 🚀 Setup Steps (Required)

### Step 1: Add Service Role Key to .env.local

The system needs admin privileges to create user accounts.

1. Go to your Supabase project: https://dobarsrlsnpggqekarnk.supabase.co
2. Navigate to **Settings** → **API**
3. Find the **`service_role`** key (it's a secret key, keep it private!)
4. Open your `.env.local` file and add:

```env
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

Your `.env.local` should now have 3 keys:
```env
NEXT_PUBLIC_SUPABASE_URL=https://dobarsrlsnpggqekarnk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

⚠️ **IMPORTANT**: Never commit the service role key to GitHub!

### Step 2: Run SQL Script

Add the required columns to your volunteers table:

1. Go to Supabase SQL Editor: https://supabase.com/dashboard/project/dobarsrlsnpggqekarnk/sql
2. Open the file `scripts/06-add-volunteer-approval-columns.sql`
3. Copy the SQL code
4. Paste it into the Supabase SQL Editor
5. Click **Run**

This will add:
- `is_approved` column
- `user_id` column (links to auth.users)
- `approved_at` column
- `approved_by` column
- `notes` column
- Indexes for performance

### Step 3: Restart Development Server

After adding the service role key:

```powershell
# Stop the server (Ctrl+C if running)
# Start it again
npm run dev
```

---

## 🎯 How to Use

### 1. View Volunteer Applications

1. Login to admin at: http://localhost:3000/login
2. Go to Dashboard: http://localhost:3000/admin
3. Click **"Volunteers"** card
4. You'll see all applications with their status

### 2. Approve a Volunteer

1. Find a **Pending** volunteer
2. Click **"Approve & Create Account"** button
3. In the dialog:
   - Email is pre-filled (from their application)
   - Enter a password (minimum 6 characters)
   - Click **"Approve & Create Account"**
4. ✅ Success! The volunteer now has a login account

**What happens behind the scenes:**
- Creates a Supabase Auth user with their email
- Sets the password you specified
- Links the auth user to the volunteer record
- Marks as approved with your email and timestamp
- Volunteer can now login at `/login`

### 3. Change Volunteer Password

1. Find an **Approved** volunteer
2. Click **"Change Password"** button
3. Enter new password (min 6 characters)
4. Click **"Update Password"**
5. ✅ Password changed! Share new password with volunteer securely

### 4. Reject Application

1. Find a **Pending** volunteer
2. Click **"Reject"** button
3. Optionally enter a reason
4. Click **"Reject Application"**
5. Status changes to **Rejected**

### 5. Add Admin Notes

1. Click **"Add Notes"** or **"Edit Notes"** on any volunteer
2. Enter private notes (only visible to admins)
3. Click **"Save Notes"**
4. Notes appear in gray box on volunteer card

### 6. Delete Volunteer

1. Click **"Delete"** button
2. Confirm deletion
3. This removes:
   - Volunteer record from database
   - Their auth account (if exists)
   - All associated data

---

## 🔐 Security Notes

- Only admins can access the volunteers page
- Service role key gives full database access - keep it secure!
- Passwords are stored securely by Supabase Auth
- Admin can reset any volunteer password anytime

---

## 📋 Workflow Example

**Scenario**: Someone submits volunteer application

1. **User Action**: Fills out form at `/volunteer`
2. **System**: Saves to database with `status='pending'`
3. **Admin**: Sees application in `/admin/volunteers`
4. **Admin**: Clicks "Approve & Create Account"
5. **Admin**: Enters password like `Welcome2024!`
6. **System**: 
   - Creates Supabase Auth user
   - Sends confirmation to volunteer's email
   - Links auth account to volunteer record
7. **Volunteer**: Can now login at `/login` with:
   - Email: their_email@example.com
   - Password: Welcome2024!
8. **Later**: Admin can change password from dashboard anytime

---

## ✨ Features Summary

✅ **Approve volunteers** - One-click approval with account creation  
✅ **Set passwords** - Admin controls initial password  
✅ **Change passwords** - Update passwords anytime  
✅ **Reject applications** - With optional reason  
✅ **Admin notes** - Private notes for each volunteer  
✅ **Delete accounts** - Remove volunteer and auth account  
✅ **Status tracking** - Pending/Approved/Rejected badges  
✅ **Statistics** - Counter showing pending/approved/rejected  
✅ **Approval history** - See who approved and when  

---

## 🐛 Troubleshooting

### Error: "Service role key not found"
- Make sure you added `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`
- Restart the dev server after adding the key

### Error: "Column 'is_approved' does not exist"
- Run the SQL script from Step 2
- The script adds required columns to volunteers table

### Volunteer can't login after approval
- Check that their email is confirmed in Supabase Auth
- The account creation sets `email_confirm: true` automatically
- Verify password is at least 6 characters

### Password change not working
- Make sure volunteer is approved (has user_id)
- Check service role key is correct
- Password must be at least 6 characters

---

## 🎉 You're Done!

The volunteer approval system is ready to use. Test it by:

1. Submitting a volunteer application at `/volunteer`
2. Logging into admin at `/login`
3. Approving the application at `/admin/volunteers`
4. Testing login with the new volunteer account

Need help? Check the server actions in `lib/actions/volunteer-management.ts` for implementation details.
