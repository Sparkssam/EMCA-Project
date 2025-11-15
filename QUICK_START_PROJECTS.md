# 🎉 Projects Management System - Quick Start Guide

## What's New?

You can now manage all your key projects (like "Binti Mazingira") directly from the admin dashboard! Add, edit, delete, and upload images without touching any code.

## 🚀 Setup Instructions (5 minutes)

### Step 1: Create the Database Table
1. Go to your Supabase dashboard: https://dobarsrlsnpggqekarnk.supabase.co
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the content from `scripts/03-create-projects-table.sql`
5. Click **Run**
6. ✅ You should see "Success. No rows returned"

### Step 2: Create Storage for Images
1. In the same SQL Editor
2. Click **New Query** again
3. Copy and paste the content from `scripts/04-create-storage-bucket.sql`
4. Click **Run**
5. ✅ You should see "Success"

### Step 3: Access the Admin Panel
1. Go to: http://localhost:3000/login
2. Enter your admin credentials
3. Click **Projects** card on the dashboard
4. 🎊 You're ready to manage projects!

## 📝 How to Use

### Add a New Project
1. Click **"Add New Project"** button
2. Fill in the form:
   - **Title**: Project name (e.g., "Clean Water Initiative")
   - **Subtitle**: Short tagline
   - **Description**: Detailed information
   - **Impact**: Key metrics (e.g., "1000+ People Served")
   - **Upload Image**: Click or drag to upload (max 5MB)
   - **Choose Icon**: Select from dropdown (🌱 Sprout, 🌲 Tree, etc.)
   - **Select Color**: Pick a gradient for the card
   - **Display Order**: Lower numbers appear first (0, 1, 2, etc.)
3. Click **"Create Project"**
4. ✅ Project appears on homepage immediately!

### Edit Existing Project
1. Find the project card
2. Click **"Edit"** button
3. Update any fields you want
4. Upload new image if needed
5. Click **"Update Project"**

### Delete a Project
1. Click **"Delete"** button on project card
2. Confirm the deletion
3. ⚠️ Warning: This cannot be undone!

### Hide/Show Projects
1. Click **"Deactivate"** to hide from website (but keep in database)
2. Click **"Activate"** to show on website again

## 🖼️ Image Guidelines

- **Recommended Size**: 1200x800 pixels (landscape)
- **File Types**: JPG, PNG, GIF
- **Max Size**: 5MB
- **Tip**: Use high-quality images that represent your project

## 🎨 Customization Options

### Icons Available
- 🌱 Sprout - For growth/agriculture projects
- 🌲 TreePine - For forestry/tree planting
- 🗑️ Trash2 - For cleanup campaigns
- ❤️ Heart - For community/health initiatives
- 👥 Users - For people-focused programs
- 🍃 Leaf - For environmental projects
- 🌍 Globe - For global/climate initiatives
- 🌸 Flower - For beauty/conservation

### Color Schemes
- Yellow to Lime - Bright and energetic
- Primary to Medium - Professional blue-green
- Medium to Darkest - Deep and serious
- Green to Emerald - Natural and fresh
- Blue to Cyan - Cool and calming
- Purple to Pink - Creative and unique

## 📱 Where Projects Appear

Your projects will be displayed in the **"Our Key Projects"** section on:
- Homepage (main section)
- Projects page
- Any other page that imports the ProjectsSection component

## 🔧 Troubleshooting

### Images not uploading?
✅ Make sure you ran the storage bucket script (`04-create-storage-bucket.sql`)

### Projects not showing on homepage?
✅ Check that "Active" checkbox is enabled
✅ Refresh the page (Ctrl+R or Cmd+R)

### Can't access admin?
✅ Login at http://localhost:3000/login
✅ Make sure you created an admin user in Supabase Authentication

## 💡 Pro Tips

1. **Keep descriptions concise** - Aim for 2-3 sentences that capture the essence
2. **Use strong impact statements** - Numbers grab attention (e.g., "500+ Lives Changed")
3. **Order matters** - Put your most important/current projects first (lower display_order)
4. **Update regularly** - Keep impact numbers current as projects progress
5. **Use deactivate wisely** - Don't delete old projects, just deactivate them for history

## 📚 Your Current Projects

After running the setup, you'll have these 3 projects loaded:

1. **Binti Mazingira** - Daughters of the Environment (500+ Girls & 12 Tailors)
2. **Tuelimishe Mazingira** - Let's Cultivate the Environment (200+ Youth Empowered)
3. **Cleanup Drives** - Cleaning Our Communities (10,000+ Tonnes Removed)

You can edit or add to these anytime!

## 🎯 Next Steps

1. Run the setup scripts in Supabase (Steps 1 & 2 above)
2. Login to admin panel
3. Review your existing projects
4. Add photos to projects without images
5. Create new projects as your organization grows!

---

**Questions?** Check the full documentation in `PROJECTS_SETUP.md`
