"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export interface Event {
  id: number
  title: string
  description: string
  status: "upcoming" | "ongoing" | "past"
  start_date: string
  end_date: string | null
  location: string
  image: string
  video_url: string | null
  attendees: number
  max_attendees: number | null
  registration_link: string | null
  created_at: string
  updated_at: string
  created_by: string | null
  updated_by: string | null
}

export async function getAllEvents() {
  try {
    const supabase = await getSupabaseServerClient()
    
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("start_date", { ascending: false })
    
    if (error) throw error
    
    return { success: true, data: data as Event[] }
  } catch (error) {
    console.error("[Events] Error fetching events:", error)
    return { success: false, error: "Failed to fetch events", data: [] }
  }
}

export async function getEventsByStatus(status: "upcoming" | "ongoing" | "past") {
  try {
    const supabase = await getSupabaseServerClient()
    
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("status", status)
      .order("start_date", { ascending: status === "upcoming" })
    
    if (error) throw error
    
    return { success: true, data: data as Event[] }
  } catch (error) {
    console.error("[Events] Error fetching events by status:", error)
    return { success: false, error: "Failed to fetch events", data: [] }
  }
}

export async function getEventById(id: number) {
  try {
    const supabase = await getSupabaseServerClient()
    
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single()
    
    if (error) throw error
    
    return { success: true, data: data as Event }
  } catch (error) {
    console.error("[Events] Error fetching event:", error)
    return { success: false, error: "Failed to fetch event", data: null }
  }
}

export async function createEvent(eventData: Omit<Event, "id" | "created_at" | "updated_at">, userEmail: string) {
  try {
    const supabase = await getSupabaseServerClient()
    
    const { data, error } = await supabase
      .from("events")
      .insert({
        ...eventData,
        created_by: userEmail,
        updated_by: userEmail,
      })
      .select()
      .single()
    
    if (error) throw error
    
    revalidatePath("/")
    revalidatePath("/admin/events")
    
    return { success: true, message: "Event created successfully", data: data as Event }
  } catch (error) {
    console.error("[Events] Error creating event:", error)
    return { success: false, error: "Failed to create event", data: null }
  }
}

export async function updateEvent(id: number, eventData: Partial<Event>, userEmail: string) {
  try {
    const supabase = await getSupabaseServerClient()
    
    const { data, error } = await supabase
      .from("events")
      .update({
        ...eventData,
        updated_by: userEmail,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()
    
    if (error) throw error
    
    revalidatePath("/")
    revalidatePath("/admin/events")
    
    return { success: true, message: "Event updated successfully", data: data as Event }
  } catch (error) {
    console.error("[Events] Error updating event:", error)
    return { success: false, error: "Failed to update event", data: null }
  }
}

export async function deleteEvent(id: number) {
  try {
    const supabase = await getSupabaseServerClient()
    
    const { error } = await supabase
      .from("events")
      .delete()
      .eq("id", id)
    
    if (error) throw error
    
    revalidatePath("/")
    revalidatePath("/admin/events")
    
    return { success: true, message: "Event deleted successfully" }
  } catch (error) {
    console.error("[Events] Error deleting event:", error)
    return { success: false, error: "Failed to delete event" }
  }
}

export async function uploadEventImage(formData: FormData) {
  try {
    const supabase = await getSupabaseServerClient()
    const file = formData.get("file") as File
    
    console.log("[Upload] Starting upload, file:", file?.name, file?.type, file?.size)
    
    if (!file) {
      return { success: false, error: "No file provided", url: null }
    }
    
    // Validate file type
    if (!file.type.startsWith("image/")) {
      return { success: false, error: "File must be an image", url: null }
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return { success: false, error: "File size must be less than 5MB", url: null }
    }
    
    // Generate unique filename
    const fileExt = file.name.split(".").pop()
    const fileName = `event-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `events/${fileName}`
    
    console.log("[Upload] Generated file path:", filePath)
    
    // Convert File to ArrayBuffer for server-side upload
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    console.log("[Upload] Converted to buffer, size:", buffer.length)
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from("images")
      .upload(filePath, buffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      })
    
    if (error) {
      console.error("[Upload] Supabase storage error:", error)
      throw error
    }
    
    console.log("[Upload] Upload successful, data:", data)
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from("images")
      .getPublicUrl(filePath)
    
    console.log("[Upload] Generated public URL:", publicUrl)
    
    return { success: true, url: publicUrl }
  } catch (error) {
    console.error("[Events] Error uploading image:", error)
    return { success: false, error: error instanceof Error ? error.message : "Failed to upload image", url: null }
  }
}
