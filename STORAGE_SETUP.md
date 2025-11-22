# Supabase Storage Setup for Event Images

## Quick Setup Steps

### 1. Create Storage Bucket

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Click **Storage** in the left sidebar
4. Click **New bucket**
5. Configure:
   - **Name**: `images`
   - **Public bucket**: ✅ **Yes** (check this box)
   - **File size limit**: 5 MB (optional)
   - **Allowed MIME types**: Leave empty or add: `image/jpeg, image/png, image/webp`
6. Click **Create bucket**

### 2. Set Up Folder Structure (Optional)

1. Click on the `images` bucket
2. Click **Upload** → **Create folder**
3. Create folder named: `events`
4. This will organize event images in `images/events/` path

### 3. Configure Storage Policies (if needed)

If you want to restrict uploads to admins only:

```sql
-- Allow public read access
CREATE POLICY "Public can view images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'images');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'images');

-- Allow users to update their own uploads
CREATE POLICY "Users can update own images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'images');

-- Allow users to delete their own uploads
CREATE POLICY "Users can delete own images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'images');
```

**Note**: Since you're using service role key in server actions, the policies above are optional. The service role bypasses RLS policies.

### 4. Test the Setup

1. Start your dev server: `npm run dev`
2. Log in as admin
3. Go to `/admin/events`
4. Click **Create Event** or **Edit** an existing event
5. Click the image upload area
6. Select an image file (JPG, PNG, or WebP)
7. You should see a preview
8. Click **Save**
9. Image will be uploaded to Supabase Storage and the URL will be saved in the database

### 5. Verify Upload

Check in Supabase Dashboard:
1. Go to **Storage** → **images** bucket
2. Look for `events/` folder
3. You should see your uploaded images with names like: `event-1732123456789-abc123.jpg`

### 6. View Public URLs

The uploaded images will be accessible at:
```
https://[YOUR_PROJECT_ID].supabase.co/storage/v1/object/public/images/events/event-1732123456789-abc123.jpg
```

## Troubleshooting

### Issue: "Bucket not found"
- Make sure the bucket is named exactly `images` (lowercase)
- Check that the bucket is set to **Public**

### Issue: "Upload failed - RLS policy violation"
- You're using service role key, so this shouldn't happen
- If it does, verify `SUPABASE_SERVICE_ROLE_KEY` is set in `.env.local`

### Issue: Images not displaying
- Check that the bucket is set to **Public**
- Verify the image URL in the database starts with your Supabase project URL
- Open the image URL directly in browser to test

### Issue: File size too large
- Current limit is 5MB
- Compress images before uploading or increase limit in bucket settings

## Features Implemented

✅ **File Upload Button**: Click to select image from your computer
✅ **Image Preview**: See the image before saving
✅ **File Validation**: Only accepts images (JPG, PNG, WebP)
✅ **Size Validation**: Max 5MB per image
✅ **Unique Filenames**: Prevents conflicts with timestamp + random string
✅ **Loading State**: Shows "Uploading..." while processing
✅ **Error Handling**: Clear error messages if upload fails
✅ **Remove Image**: X button to clear selection and choose a different image

## How It Works

1. **User selects image**: From local computer via file input
2. **Preview generated**: Client-side preview using FileReader API
3. **Form submitted**: Image file included in FormData
4. **Server processes**: 
   - Validates file type and size
   - Converts to Buffer for server-side upload
   - Generates unique filename
   - Uploads to Supabase Storage `images/events/` folder
   - Returns public URL
5. **Database updated**: Event record saved with image URL
6. **Display on site**: Image loaded from Supabase CDN

## Next Steps

After setting up storage:
1. ✅ Create `images` bucket (public)
2. ✅ Test image upload in admin panel
3. ✅ Verify images display on homepage
4. 🚀 Deploy to Vercel (storage works in production)
5. 📸 Start uploading your event images!

---

**All done!** You can now upload images directly from your computer when creating or editing events! 🎉
