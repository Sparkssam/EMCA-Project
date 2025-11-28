"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { handleActionError } from "@/lib/utils/error-handling"

export type Project = {
  id: string
  title: string
  subtitle: string
  description: string
  impact: string
  image_url: string | null
  icon: string
  color: string
  link: string | null
  display_order: number
  is_active: boolean
  status?: string | null
  location?: string | null
  duration?: string | null
  beneficiaries?: string | null
  funded_by?: string | null
  objectives?: string[] | null
  key_activity?: string | null
  outcomes?: string[] | null
  created_at: string
  updated_at: string
}

export type ProjectFormData = {
  title: string
  subtitle: string
  description: string
  impact: string
  image_url?: string
  icon?: string
  color?: string
  link?: string
  display_order?: number
  is_active?: boolean
  status?: string
  location?: string
  duration?: string
  beneficiaries?: string
  funded_by?: string
  objectives?: string[]
  key_activity?: string
  outcomes?: string[]
}

// Helper function to validate project input
function validateProjectInput(formData: ProjectFormData) {
  const errors: string[] = []
  
  // Validate title
  if (!formData.title?.trim() || formData.title.length > 100) {
    errors.push("Title must be between 1-100 characters")
  }
  
  // Sanitize description (basic length check)
  if (formData.description && formData.description.length > 5000) {
    errors.push("Description too long (max 5000 characters)")
  }
  
  // Validate objectives
  if (formData.objectives && !Array.isArray(formData.objectives)) {
    errors.push("Objectives must be an array")
  }
  
  // Validate outcomes
  if (formData.outcomes && !Array.isArray(formData.outcomes)) {
    errors.push("Outcomes must be an array")
  }
  
  return errors
}

// Helper function to check admin authorization
async function checkAdminAuth(supabase: any) {
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    return { authorized: false, error: "Unauthorized" }
  }
  
  const userRole = user.user_metadata?.role
  if (userRole !== "admin") {
    return { authorized: false, error: "Insufficient permissions" }
  }
  
  return { authorized: true }
}

export async function getProjects() {
  const supabase = await getSupabaseServerClient()
  
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })

  if (error) {
    console.error("Error fetching projects:", error)
    return []
  }

  return data as Project[]
}

export async function getAllProjects() {
  const supabase = await getSupabaseServerClient()
  
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true })

  if (error) {
    console.error("Error fetching all projects:", error)
    return []
  }

  return data as Project[]
}

export async function getProjectById(id: string) {
  const supabase = await getSupabaseServerClient()
  
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching project:", error)
    return null
  }

  return data as Project
}

export async function createProject(formData: ProjectFormData) {
  try {
    const supabase = await getSupabaseServerClient()

    // Check authorization
    const authCheck = await checkAdminAuth(supabase)
    if (!authCheck.authorized) {
      return { success: false, error: authCheck.error }
    }

    // Validate input
    const validationErrors = validateProjectInput(formData)
    if (validationErrors.length > 0) {
      return { success: false, error: validationErrors.join(', ') }
    }

    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          title: formData.title,
          subtitle: formData.subtitle,
          description: formData.description,
          impact: formData.impact,
          image_url: formData.image_url || null,
          icon: formData.icon || "Sprout",
          color: formData.color || "from-emca-yellow to-emca-lime",
          link: formData.link || null,
          display_order: formData.display_order || 0,
          is_active: formData.is_active ?? true,
          status: formData.status || null,
          location: formData.location || null,
          duration: formData.duration || null,
          beneficiaries: formData.beneficiaries || null,
          funded_by: formData.funded_by || null,
          objectives: formData.objectives || null,
          key_activity: formData.key_activity || null,
          outcomes: formData.outcomes || null,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error creating project:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    revalidatePath("/projects")
    revalidatePath("/admin/projects")

    return { success: true, data }
  } catch (error) {
    return handleActionError(error)
  }
}

export async function updateProject(id: string, formData: ProjectFormData) {
  try {
    const supabase = await getSupabaseServerClient()

    // Check authorization
    const authCheck = await checkAdminAuth(supabase)
    if (!authCheck.authorized) {
      return { success: false, error: authCheck.error }
    }

    // Validate input
    const validationErrors = validateProjectInput(formData)
    if (validationErrors.length > 0) {
      return { success: false, error: validationErrors.join(', ') }
    }

    const { data, error } = await supabase
      .from("projects")
      .update({
        title: formData.title,
        subtitle: formData.subtitle,
        description: formData.description,
        impact: formData.impact,
        image_url: formData.image_url || null,
        icon: formData.icon || "Sprout",
        color: formData.color || "from-emca-yellow to-emca-lime",
        link: formData.link || null,
        display_order: formData.display_order ?? 0,
        is_active: formData.is_active ?? true,
        status: formData.status || null,
        location: formData.location || null,
        duration: formData.duration || null,
        beneficiaries: formData.beneficiaries || null,
        funded_by: formData.funded_by || null,
        objectives: formData.objectives || null,
        key_activity: formData.key_activity || null,
        outcomes: formData.outcomes || null,
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating project:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    revalidatePath("/projects")
    revalidatePath("/admin/projects")
    revalidatePath("/admin/projects")

    return { success: true, data }
  } catch (error) {
    return handleActionError(error)
  }
}

export async function deleteProject(id: string) {
    const supabase = await getSupabaseServerClient()

    // Check authorization
    const authCheck = await checkAdminAuth(supabase)
    if (!authCheck.authorized) {
      return { success: false, error: authCheck.error }
    }

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("Error deleting project:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    revalidatePath("/projects")
    revalidatePath("/admin/projects")

    revalidatePath("/admin/projects")

    return { success: true }
  } catch (error) {
    return handleActionError(error)
  }
}

export async function toggleProjectStatus(id: string, isActive: boolean) {

    // Check authorization
    const authCheck = await checkAdminAuth(supabase)
    if (!authCheck.authorized) {
      return { success: false, error: authCheck.error }
    }

    const { data, error } = await supabase
      .from("projects")
      .update({ is_active: isActive })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error toggling project status:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    revalidatePath("/projects")
    revalidatePath("/admin/projects")

    revalidatePath("/admin/projects")

    return { success: true, data }
  } catch (error) {
    return handleActionError(error)
  }
}

export async function uploadProjectImage(file: File) {

    // Check authorization
    const authCheck = await checkAdminAuth(supabase)
    if (!authCheck.authorized) {
      return { success: false, error: authCheck.error }
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return { success: false, error: "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed." }
    }
    
    // Validate file size (e.g., 5MB max)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return { success: false, error: "File too large. Maximum size is 5MB." }
    }
    
    // Sanitize filename
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const fileExt = originalName.split('.').pop()?.toLowerCase()
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif']
    
    if (!fileExt || !allowedExtensions.includes(fileExt)) {
      return { success: false, error: "Invalid file extension" }
    }

    // Create a unique filename
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
    const filePath = `projects/${fileName}`

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from("project-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      })

    if (error) {
      console.error("Error uploading image:", error)
      return { success: false, error: error.message }
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from("project-images")
      .getPublicUrl(filePath)

    return { success: true, url: publicUrl }
  } catch (error) {
    console.error("Error in uploadProjectImage:", error)
    return { success: true, url: publicUrl }
  } catch (error) {
    return handleActionError(error)
  }
}
