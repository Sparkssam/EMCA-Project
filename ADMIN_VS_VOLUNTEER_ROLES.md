# Admin vs Volunteer Role System

## 🎭 How Roles Work

Your EMCA Project now has TWO types of users:

### 1. **Admin** (You)
- Full access to admin dashboard at `/admin`
- Can approve volunteers
- Can manage projects, reviews, and volunteers
- Set manually in Supabase

### 2. **Volunteer** (Created by Admin)
- Can login to the website
- CANNOT access admin pages
- Redirected to homepage if they try to access `/admin`
- Role is set automatically when admin approves them

---

## ✅ What Changed

### Before:
- ❌ Any logged-in user could access admin pages
- ❌ All users were treated the same

### Now:
- ✅ Only users with `role: "admin"` can access `/admin` pages
- ✅ Volunteers have `role: "volunteer"` in their user_metadata
- ✅ Role checking on all admin pages

---

## 🔧 How to Set Up Your Admin Account

Since you're the real admin, you need to set your account's role to "admin":

### Option 1: Via Supabase Dashboard (Recommended)

1. **Go to Authentication**: https://supabase.com/dashboard/project/dobarsrlsnpggqekarnk/auth/users

2. **Find your admin email** in the users list (the one you use to login)

3. **Click on your user** to open details

4. **Scroll to "User Metadata"** section

5. **Click "Edit"** and add:
   ```json
   {
     "role": "admin",
     "name": "Your Name"
   }
   ```

6. **Click "Save"**

7. **Logout and login again** to refresh your session

### Option 2: Via SQL (Alternative)

Run this in Supabase SQL Editor (replace with your actual email):

```sql
-- Update user metadata to set admin role
UPDATE auth.users 
SET raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'your-admin-email@example.com';
```

---

## 🎯 Testing the Role System

### Test 1: Admin Access
1. Login with your admin account (after setting role to "admin")
2. Go to `/admin`
3. ✅ You should see the admin dashboard

### Test 2: Volunteer Access
1. Approve a volunteer from admin dashboard
2. Logout from admin account
3. Login with the volunteer's credentials
4. Try to access `/admin`
5. ✅ Should be redirected to homepage

### Test 3: Create New Volunteer
1. Login as admin
2. Go to `/admin/volunteers`
3. Approve a pending volunteer with a password
4. The system automatically sets their role to "volunteer"
5. They can login but CANNOT access admin pages

---

## 🔐 How It Works Under the Hood

### When Admin Approves a Volunteer:

```typescript
// In lib/actions/volunteer-management.ts
await supabaseAdmin.auth.admin.createUser({
  email: volunteer.email,
  password: password,
  email_confirm: true,
  user_metadata: {
    name: volunteer.name,
    role: "volunteer"  // 👈 This sets them as volunteer
  }
})
```

### When Checking Access:

```typescript
// In app/admin/page.tsx
const { success, user } = await getCurrentUser()

// Get role from user_metadata
if (user.role !== "admin") {
  redirect("/")  // 👈 Volunteers get kicked out
}
```

---

## 📋 Quick Reference

| Action | Admin | Volunteer |
|--------|-------|-----------|
| Login at `/login` | ✅ Yes | ✅ Yes |
| View homepage | ✅ Yes | ✅ Yes |
| Access `/admin` | ✅ Yes | ❌ No (redirected) |
| Approve volunteers | ✅ Yes | ❌ No |
| Manage projects | ✅ Yes | ❌ No |
| Manage reviews | ✅ Yes | ❌ No |

---

## ⚠️ Important Notes

1. **Your admin account must have `role: "admin"`** in user_metadata
   - If you can't access admin pages after login, check your user_metadata

2. **Volunteers are automatically set** with `role: "volunteer"`
   - No manual setup needed for volunteers

3. **Role is checked on EVERY admin page**:
   - `/admin`
   - `/admin/volunteers`
   - `/admin/projects`
   - `/admin/reviews`

4. **Volunteers can still use the website**:
   - They just can't access admin functions
   - Perfect for community members who help but don't manage

---

## 🎉 Summary

✅ **Admin users** (you): Full control, can access `/admin`  
✅ **Volunteer users**: Can login, but NO admin access  
✅ **Role-based security**: Automatic and secure  
✅ **Easy to test**: Just try accessing `/admin` with different accounts  

Make sure to set your own account to "admin" role in Supabase, then you're all set!
