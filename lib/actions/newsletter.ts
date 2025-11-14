"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function subscribeToNewsletter(email: string) {
  try {
    const supabase = await getSupabaseServerClient()

    const { error } = await supabase.from("newsletter_subscribers").insert({ email })

    if (error) {
      if (error.code === "23505") {
        return { success: false, message: "Email already subscribed" }
      }
      throw error
    }

    return { success: true, message: "Successfully subscribed!" }
  } catch (error) {
    console.error("[v0] Newsletter subscription error:", error)
    return { success: false, message: "Failed to subscribe. Please try again." }
  }
}
