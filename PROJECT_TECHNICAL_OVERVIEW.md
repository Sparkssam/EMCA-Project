# Project Technical Overview

## Code Snippets

### Authentication/Authorization Logic
Authentication is managed using Supabase Auth with Next.js Server Actions. Authorization is handled via Row Level Security (RLS) in the database and role checks within Server Actions.

**Server-Side Login Action (`lib/actions/auth.ts`):**
```typescript
export async function loginWithEmail(email: string, password: string) {
  try {
    const supabase = await getSupabaseServerClient()

    // Authenticate with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) return { success: false, message: error.message }

    // Extract user role from metadata for authorization
    const userRole = data.user?.user_metadata?.role || "user"

    return {
      success: true,
      user: { id: data.user.id, email: data.user.email, role: userRole }
    }
  } catch (error) {
    return { success: false, message: "An unexpected error occurred." }
  }
}
```

### Database Queries
Database operations are performed using the Supabase JavaScript client (`@supabase/supabase-js`) within Server Actions.

**Fetching Data with Filters (`lib/actions/projects.ts`):**
```typescript
export async function getProjects() {
  const supabase = await getSupabaseServerClient()
  
  // Query: Select all columns from 'projects' where is_active is true, ordered by display_order
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })

  if (error) return []
  return data as Project[]
}
```

**Inserting Data (`lib/actions/projects.ts`):**
```typescript
export async function createProject(formData: ProjectFormData) {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase
    .from("projects")
    .insert([{
      title: formData.title,
      description: formData.description,
      // ... other fields
      objectives: formData.objectives || null, // JSONB array
    }])
    .select()
    .single()

  if (error) return { success: false, error: error.message }
  
  revalidatePath("/projects") // Cache invalidation
  return { success: true, data }
}
```

### File Upload Handlers
File uploads are handled by sending the `File` object to a Server Action, which then uploads it to a Supabase Storage bucket.

**Image Upload Action (`lib/actions/projects.ts`):**
```typescript
export async function uploadProjectImage(file: File) {
  const supabase = await getSupabaseServerClient()
  
  // Generate unique path
  const fileExt = file.name.split(".").pop()
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
  const filePath = `projects/${fileName}`

  // Upload to 'project-images' bucket
  const { error } = await supabase.storage
    .from("project-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    })

  if (error) return { success: false, error: error.message }

  // Retrieve public URL
  const { data: { publicUrl } } = supabase.storage
    .from("project-images")
    .getPublicUrl(filePath)

  return { success: true, url: publicUrl }
}
```

### API Endpoints
This project uses **Next.js Server Actions** instead of traditional REST API endpoints (`pages/api` or `app/api`). Server Actions are functions that execute on the server but can be called directly from Client Components.

**Key Server Actions:**
- `loginWithEmail(email, password)`: Authenticates user.
- `logout()`: Signs out the user.
- `getProjects()`: Fetches public projects.
- `createProject(formData)`: Admin only - creates a new project.
- `updateProject(id, formData)`: Admin only - updates an existing project.
- `deleteProject(id)`: Admin only - deletes a project.

### Form Processing Code
Forms are implemented as Client Components that manage state and invoke Server Actions on submission.

**Login Form Submission (`components/auth/login-form.tsx`):**
```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)

  try {
    // Call Server Action
    const result = await loginWithEmail(formData.email, formData.password)

    if (result.success) {
      // Client-side routing based on role
      const userRole = result.user?.role
      if (userRole === "admin") {
        router.push("/admin")
      } else {
        router.push("/")
      }
      router.refresh()
    } else {
      toast.error("Login Failed", { description: result.message })
    }
  } catch (error) {
    toast.error("Error", { description: "An unexpected error occurred." })
  } finally {
    setIsLoading(false)
  }
}
```

---

## Configuration Details

### Framework and Versions
- **Framework**: Next.js 16.0.0 (App Router)
- **Language**: TypeScript 5.x
- **UI Library**: React 19.2.0
- **Styling**: Tailwind CSS 4.x
- **Database Client**: @supabase/supabase-js (latest)
- **SSR Helper**: @supabase/ssr (latest)

### Security Middleware Setup
- **Global Middleware**: Not currently implemented (`middleware.ts` is absent).
- **Route Protection**: Implemented via:
  1.  **Server-Side Checks**: Server Actions verify authentication and roles before performing sensitive operations (e.g., `createProject` implicitly relies on RLS or should have explicit checks).
  2.  **Database Security**: Supabase Row Level Security (RLS) policies enforce access control at the database level (e.g., only authenticated users can insert/update/delete).
  3.  **Client-Side Redirection**: Login form handles redirection based on user roles.

### Database Configuration
The database connection is initialized using the Supabase SSR client helper, which automatically handles cookie management for authentication.

**Client Initialization (`lib/supabase/server.ts`):**
```typescript
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function getSupabaseServerClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => 
              cookieStore.set(name, value, options)
            )
          } catch {
            // Handle Server Component context
          }
        },
      },
    }
  )
}
```

### Environment Settings
The application requires the following environment variables to function. These connect the application to the Supabase backend.

- `NEXT_PUBLIC_SUPABASE_URL`: The unique URL for the Supabase project.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: The public anonymous key used for client-side requests and server-side initialization.

*Note: Sensitive keys (like the Service Role Key) are not used in the client application code to maintain security.*
