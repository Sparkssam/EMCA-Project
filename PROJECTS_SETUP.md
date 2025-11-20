# Projects Management Setup Guide

This guide will help you set up the admin projects management system for your EMCA website.

## Step 1: Create the Projects Table

1. Go to your Supabase dashboard: https://dobarsrlsnpggqekarnk.supabase.co
2. Navigate to **SQL Editor**
3. Open and run `scripts/03-create-projects-table.sql`
4. This will:
   - Create the `projects` table
   - Insert your existing 3 projects (Binti Mazingira, Tuelimishe Mazingira, Cleanup Drives)
   - Set up proper indexes and triggers

## Step 2: Create Storage Bucket for Images

1. In Supabase dashboard, go to **SQL Editor**
2. Open and run `scripts/04-create-storage-bucket.sql`
3. This creates a public storage bucket called `project-images` for uploading project photos

## Step 3: Test the Admin Interface

1. Make sure your dev server is running: `npm run dev`
2. Login to admin at: http://localhost:3000/login
3. Navigate to **Projects** from the admin dashboard
4. You should see your 3 existing projects

## Features

### Manage Projects
- **View All Projects**: See all projects with their images, descriptions, and status
- **Add New Project**: Click "Add New Project" button
- **Edit Project**: Click the "Edit" button on any project card
- **Delete Project**: Click the "Delete" button (with confirmation)
- **Toggle Status**: Activate/Deactivate projects to show/hide on website

### Project Form Fields
- **Title**: Main project name (e.g., "Binti Mazingira")
- **Subtitle**: Tagline (e.g., "Daughters of the Environment")
- **Description**: Detailed project information
- **Impact**: Key metrics (e.g., "500+ Girls & 12 Tailors")
- **Image**: Upload project photo (JPG, PNG, GIF up to 5MB)
- **Icon**: Choose from 8 available icons (Sprout, Tree, Trash, etc.)
- **Color**: Select gradient color scheme
- **Link**: Optional URL for "Learn More" button
- **Display Order**: Number to control ordering (lower = first)
- **Active Status**: Toggle to show/hide on website

### Image Upload
- Drag and drop or click to upload
- Supports: PNG, JPG, GIF
- Max size: 5MB
- Images stored in Supabase Storage
- Automatic URL generation

## Database Schema

### projects table
```sql
id              UUID (Primary Key)
title           VARCHAR(255)
subtitle        VARCHAR(255)
description     TEXT
impact          VARCHAR(255)
image_url       TEXT
icon            VARCHAR(50)
color           VARCHAR(100)
link            VARCHAR(255)
display_order   INTEGER
is_active       BOOLEAN
created_at      TIMESTAMPTZ
updated_at      TIMESTAMPTZ
```

## Available Icons
- Sprout 🌱
- TreePine 🌲
- Trash2 🗑️
- Heart ❤️
- Users 👥
- Leaf 🍃
- Globe 🌍
- Flower 🌸

## Available Color Gradients
- Yellow to Lime
- Primary to Medium
- Medium to Darkest
- Green to Emerald
- Blue to Cyan
- Purple to Pink

## How It Works

1. **Homepage Display**: Projects are fetched from the database and displayed on the homepage in the "Our Key Projects" section
2. **Real-time Updates**: Any changes made in the admin panel immediately reflect on the website (after page refresh)
3. **Image Storage**: Images are uploaded to Supabase Storage and referenced by URL
4. **Ordering**: Projects display in order based on the `display_order` field
5. **Active/Inactive**: Only active projects appear on the public website

## Troubleshooting

### Images not uploading?
- Check that the storage bucket was created correctly
- Verify storage policies are set up (run `04-create-storage-bucket.sql`)
- Check browser console for error messages

### Projects not showing on homepage?
- Make sure projects are marked as "Active" in admin
- Check that the `is_active` field is `true` in database
- Refresh the page to see updates

### Cannot access admin?
- Ensure you're logged in at `/login`
- Create an admin user in Supabase Authentication
- Check that auth session is valid

## Next Steps

After setting up projects management, you can:
1. Add more projects as your organization grows
2. Update project descriptions and impacts
3. Change project images when you have new photos
4. Reorder projects by adjusting display_order
5. Archive old projects by setting them to inactive

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify all SQL scripts ran successfully
3. Ensure storage bucket and policies are set up
4. Check that your Supabase credentials are correct in `.env.local`
