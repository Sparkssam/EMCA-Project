"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"

interface VolunteerData {
  name: string
  email: string
  phone?: string
  location: string
  interests: string[]
  availability: string
  experience?: string
  message?: string
  registeringForEvent?: string
}

export async function submitVolunteerApplication(data: VolunteerData) {
  try {
    const supabase = await getSupabaseServerClient()

    // Prepare data for database
    const dbData = {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      location: data.location,
      interests: data.interests,
      skills: data.interests, // Using interests as skills
      availability: data.availability,
      experience: data.experience || null, // Save experience field
      message: data.message || null, // Save message field
      status: 'pending'
    }

    const { data: insertedData, error } = await supabase
      .from("volunteers")
      .insert(dbData)
      .select()

    if (error) {
      console.error("[Volunteer] Database error:", error)
      throw error
    }

    return { 
      success: true, 
      message: data.registeringForEvent 
        ? `Thank you for registering for "${data.registeringForEvent}"! We'll contact you within 48 hours with event details.`
        : "Your application was submitted successfully! We'll contact you within 48 hours.",
      data: insertedData
    }
  } catch (error) {
    console.error("[Volunteer] Application error:", error)
    return { 
      success: false, 
      message: "Failed to submit application. Please try again." 
    }
  }
}
