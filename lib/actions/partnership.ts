"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { handleActionError } from "@/lib/utils/error-handling"

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
    return handleActionError(error)
  }
}
