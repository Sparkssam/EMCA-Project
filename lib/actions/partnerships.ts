"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { handleActionError } from "@/lib/utils/error-handling"

export interface Partnership {
  id: number
  organization_name: string
  organization_type: string
  contact_name: string
  contact_title?: string
  contact_email: string
  contact_phone?: string
  partnership_interest: string
  message: string
  status: string
  created_at: string
  updated_at: string
  reviewed_by?: string
  notes?: string
}

export async function createPartnership(data: Omit<Partnership, "id" | "created_at" | "updated_at" | "status" | "reviewed_by" | "notes">) {
  try {
    const supabase = await getSupabaseServerClient()
    
    // Build insert object with only provided fields
    const insertData: any = {
      organization_name: data.organization_name,
      organization_type: data.organization_type,
      contact_name: data.contact_name,
      contact_email: data.contact_email,
      partnership_interest: data.partnership_interest,
      message: data.message,
      status: "pending",
    }
    
    // Only add optional fields if they have values
    if (data.contact_title) insertData.contact_title = data.contact_title
    if (data.contact_phone) insertData.contact_phone = data.contact_phone
    
    const { error } = await supabase
      .from("partnerships")
      .insert(insertData)

    if (error) throw error

    revalidatePath("/admin/partnerships")
    return { success: true, message: "Partnership inquiry submitted successfully!" }
  } catch (error) {
    return handleActionError(error)
  }
}

export async function getAllPartnerships() {
  try {
    const supabase = await getSupabaseServerClient()
    
    const { data, error } = await supabase
      .from("partnerships")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("[Partnerships] Error fetching partnerships:", error)
    return []
  }
}

export async function updatePartnershipStatus(id: number, status: string, notes?: string, userEmail?: string) {
  try {
    const supabase = await getSupabaseServerClient()
    
    const { error } = await supabase
      .from("partnerships")
      .update({
        status,
        notes,
        reviewed_by: userEmail,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) throw error

    revalidatePath("/admin/partnerships")
    revalidatePath("/admin/partnerships")
    return { success: true, message: "Partnership status updated successfully!" }
  } catch (error) {
    return handleActionError(error)
  }
}

export async function deletePartnership(id: number) {
    const supabase = await getSupabaseServerClient()
    
    const { error } = await supabase
      .from("partnerships")
      .delete()
      .eq("id", id)

    if (error) throw error

    revalidatePath("/admin/partnerships")
    revalidatePath("/admin/partnerships")
    return { success: true, message: "Partnership deleted successfully!" }
  } catch (error) {
    return handleActionError(error)
  }
}
