"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

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
    console.error("Error in createProject:", error)
    return { success: false, error: "Failed to create project" }
  }
}

export async function updateProject(id: string, formData: ProjectFormData) {
  try {
    const supabase = await getSupabaseServerClient()

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

    return { success: true, data }
  } catch (error) {
    console.error("Error in updateProject:", error)
    return { success: false, error: "Failed to update project" }
  }
}

export async function deleteProject(id: string) {
  try {
    const supabase = await getSupabaseServerClient()

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

    return { success: true }
  } catch (error) {
    console.error("Error in deleteProject:", error)
    return { success: false, error: "Failed to delete project" }
  }
}

export async function toggleProjectStatus(id: string, isActive: boolean) {
  try {
    const supabase = await getSupabaseServerClient()

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

    return { success: true, data }
  } catch (error) {
    console.error("Error in toggleProjectStatus:", error)
    return { success: false, error: "Failed to toggle project status" }
  }
}

export async function uploadProjectImage(file: File) {
  try {
    const supabase = await getSupabaseServerClient()

    // Create a unique filename
    const fileExt = file.name.split(".").pop()
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
    return { success: false, error: "Failed to upload image" }
  }
}
