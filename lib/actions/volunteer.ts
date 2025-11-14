"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"

interface VolunteerData {
  name: string
  email: string
  phone?: string
  location: string
  interests: string[]
  skills: string[]
  availability: string
}

export async function submitVolunteerApplication(data: VolunteerData) {
  try {
    const supabase = await getSupabaseServerClient()

    const { error } = await supabase.from("volunteers").insert(data)

    if (error) throw error

    return { success: true, message: "Application submitted successfully!" }
  } catch (error) {
    console.error("[v0] Volunteer application error:", error)
    return { success: false, message: "Failed to submit application. Please try again." }
  }
}
