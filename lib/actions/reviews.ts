"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { handleActionError } from "@/lib/utils/error-handling"

export type Review = {
  id: string
  name: string
  role: string
  text: string
  image_url: string | null
  rating: number
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export type ReviewFormData = {
  name: string
  role: string
  text: string
  image_url?: string
  rating?: number
  display_order?: number
  is_active?: boolean
}

export async function getReviews() {
  const supabase = await getSupabaseServerClient()
  
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })

  if (error) {
    console.error("Error fetching reviews:", error)
    return []
  }

  return data as Review[]
}

export async function getAllReviews() {
  const supabase = await getSupabaseServerClient()
  
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("display_order", { ascending: true })

  if (error) {
    console.error("Error fetching all reviews:", error)
    return []
  }

  return data as Review[]
}

export async function getReviewById(id: string) {
  const supabase = await getSupabaseServerClient()
  
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching review:", error)
    return null
  }

  return data as Review
}

export async function createReview(formData: ReviewFormData) {
  try {
    const supabase = await getSupabaseServerClient()

    const { data, error } = await supabase
      .from("reviews")
      .insert([
        {
          name: formData.name,
          role: formData.role,
          text: formData.text,
          image_url: formData.image_url || null,
          rating: formData.rating || 5,
          display_order: formData.display_order || 0,
          is_active: formData.is_active ?? true,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error creating review:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    revalidatePath("/admin/reviews")

    return { success: true, data }
  } catch (error) {
    return handleActionError(error)
  }
}

export async function submitPublicReview(formData: {
  name: string
  email: string
  location: string
  rating: number
  review: string
}) {
  try {
    const supabase = await getSupabaseServerClient()

    const { data, error } = await supabase
      .from("reviews")
      .insert([
        {
          name: formData.name,
          role: formData.location, // Using location as role for public submissions
          text: formData.review,
          rating: formData.rating,
          display_order: 999, // New reviews go to the end
          is_active: false, // Needs admin approval
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error submitting public review:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/admin/reviews")
    revalidatePath("/admin/reviews")

    return { success: true, data }
  } catch (error) {
    return handleActionError(error)
  }
}

export async function updateReview(id: string, formData: ReviewFormData) {
  try {
    const supabase = await getSupabaseServerClient()

    const { data, error } = await supabase
      .from("reviews")
      .update({
        name: formData.name,
        role: formData.role,
        text: formData.text,
        image_url: formData.image_url || null,
        rating: formData.rating || 5,
        display_order: formData.display_order ?? 0,
        is_active: formData.is_active ?? true,
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating review:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    revalidatePath("/admin/reviews")

    return { success: true, data }
  } catch (error) {
    return handleActionError(error)
  }
}

export async function deleteReview(id: string) {
  try {
    const supabase = await getSupabaseServerClient()

    const { error } = await supabase
      .from("reviews")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("Error deleting review:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    revalidatePath("/admin/reviews")

    return { success: true }
  } catch (error) {
    return handleActionError(error)
  }
}

export async function toggleReviewStatus(id: string, isActive: boolean) {
  try {
    const supabase = await getSupabaseServerClient()

    const { data, error } = await supabase
      .from("reviews")
      .update({ is_active: isActive })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error toggling review status:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    revalidatePath("/admin/reviews")

    return { success: true, data }
  } catch (error) {
    return handleActionError(error)
  }
}
export async function uploadReviewImage(file: File) {
  try {
    const supabase = await getSupabaseServerClient()

    // Create a unique filename
    const fileExt = file.name.split(".").pop()
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
    const filePath = `reviews/${fileName}`

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
    return handleActionError(error)
  }
}
