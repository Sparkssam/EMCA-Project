"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export type GalleryItem = {
  id: string
  title: string
  description: string | null
  category: string
  image_url: string
  size: "normal" | "large" | "tall" | "wide"
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export type GalleryFormData = {
  title: string
  description?: string
  category: string
  image_url: string
  size?: "normal" | "large" | "tall" | "wide"
  display_order?: number
  is_active?: boolean
}

// Get all gallery items (for admin)
export async function getAllGalleryItems(): Promise<GalleryItem[]> {
  const supabase = await getSupabaseServerClient()
  
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("display_order", { ascending: true })
  
  if (error) {
    console.error("Error fetching gallery items:", error)
    return []
  }
  
  return data || []
}

// Get active gallery items (for public display)
export async function getActiveGalleryItems(): Promise<GalleryItem[]> {
  const supabase = await getSupabaseServerClient()
  
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })
  
  if (error) {
    console.error("Error fetching active gallery items:", error)
    return []
  }
  
  return data || []
}

// Get gallery categories
export async function getGalleryCategories(): Promise<string[]> {
  const supabase = await getSupabaseServerClient()
  
  const { data, error } = await supabase
    .from("gallery")
    .select("category")
    .eq("is_active", true)
  
  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }
  
  const categories = [...new Set(data?.map(item => item.category) || [])]
  return categories.sort()
}

// Create a new gallery item
export async function createGalleryItem(formData: GalleryFormData) {
  const supabase = await getSupabaseServerClient()
  
  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, message: "You must be logged in to create gallery items" }
  }
  
  // Check if user is admin
  if (user.user_metadata?.role !== "admin") {
    return { success: false, message: "You must be an admin to create gallery items" }
  }
  
  const { data, error } = await supabase
    .from("gallery")
    .insert({
      title: formData.title,
      description: formData.description || null,
      category: formData.category,
      image_url: formData.image_url,
      size: formData.size || "normal",
      display_order: formData.display_order || 0,
      is_active: formData.is_active !== undefined ? formData.is_active : true,
    })
    .select()
    .single()
  
  if (error) {
    console.error("Error creating gallery item:", error)
    return { success: false, message: error.message }
  }
  
  revalidatePath("/gallery")
  revalidatePath("/admin/gallery")
  
  return { success: true, data, message: "Gallery item created successfully" }
}

// Update a gallery item
export async function updateGalleryItem(id: string, formData: Partial<GalleryFormData>) {
  const supabase = await getSupabaseServerClient()
  
  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, message: "You must be logged in to update gallery items" }
  }
  
  // Check if user is admin
  if (user.user_metadata?.role !== "admin") {
    return { success: false, message: "You must be an admin to update gallery items" }
  }
  
  const { data, error } = await supabase
    .from("gallery")
    .update({
      ...formData,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single()
  
  if (error) {
    console.error("Error updating gallery item:", error)
    return { success: false, message: error.message }
  }
  
  revalidatePath("/gallery")
  revalidatePath("/admin/gallery")
  
  return { success: true, data, message: "Gallery item updated successfully" }
}

// Delete a gallery item
export async function deleteGalleryItem(id: string) {
  const supabase = await getSupabaseServerClient()
  
  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, message: "You must be logged in to delete gallery items" }
  }
  
  // Check if user is admin
  if (user.user_metadata?.role !== "admin") {
    return { success: false, message: "You must be an admin to delete gallery items" }
  }
  
  // First get the item to check if it has an uploaded image
  const { data: item } = await supabase
    .from("gallery")
    .select("image_url")
    .eq("id", id)
    .single()
  
  // Delete the image from storage if it's from our bucket
  if (item?.image_url && item.image_url.includes("gallery-images")) {
    const imagePath = item.image_url.split("gallery-images/")[1]
    if (imagePath) {
      await supabase.storage.from("gallery-images").remove([imagePath])
    }
  }
  
  const { error } = await supabase
    .from("gallery")
    .delete()
    .eq("id", id)
  
  if (error) {
    console.error("Error deleting gallery item:", error)
    return { success: false, message: error.message }
  }
  
  revalidatePath("/gallery")
  revalidatePath("/admin/gallery")
  
  return { success: true, message: "Gallery item deleted successfully" }
}

// Upload gallery image
export async function uploadGalleryImage(formData: FormData) {
  const supabase = await getSupabaseServerClient()
  
  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, message: "You must be logged in to upload images" }
  }
  
  // Check if user is admin
  if (user.user_metadata?.role !== "admin") {
    return { success: false, message: "You must be an admin to upload images" }
  }
  
  const file = formData.get("file") as File
  if (!file) {
    return { success: false, message: "No file provided" }
  }
  
  // Generate unique filename
  const fileExt = file.name.split(".").pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
  
  const { data, error } = await supabase.storage
    .from("gallery-images")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    })
  
  if (error) {
    console.error("Error uploading image:", error)
    return { success: false, message: error.message }
  }
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from("gallery-images")
    .getPublicUrl(data.path)
  
  return { success: true, url: publicUrl, message: "Image uploaded successfully" }
}

// Toggle gallery item active status
export async function toggleGalleryItemStatus(id: string, isActive: boolean) {
  return updateGalleryItem(id, { is_active: isActive })
}
