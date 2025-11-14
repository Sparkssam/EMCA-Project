"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"

interface PartnershipData {
  organization_name: string
  organization_type: string
  contact_name: string
  contact_email: string
  contact_phone?: string
  partnership_type: string
  message: string
}

export async function submitPartnershipInquiry(data: PartnershipData) {
  try {
    const supabase = await getSupabaseServerClient()

    const { error } = await supabase.from("partnerships").insert(data)

    if (error) throw error

    return { success: true, message: "Partnership inquiry submitted successfully!" }
  } catch (error) {
    console.error("[v0] Partnership inquiry error:", error)
    return { success: false, message: "Failed to submit inquiry. Please try again." }
  }
}
