"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"
import { handleActionError } from "@/lib/utils/error-handling"

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export async function approveVolunteerAndCreateAccount(
  volunteerId: string,
  password: string,
  adminEmail: string
) {
  try {
    const supabase = await getSupabaseServerClient()

    // Get volunteer details
    const { data: volunteer, error: fetchError } = await supabase
      .from("volunteers")
      .select("*")
      .eq("id", volunteerId)
      .single()

    if (fetchError || !volunteer) {
      return { success: false, error: "Volunteer not found" }
    }

    // Create user account in Supabase Auth using admin client
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: volunteer.email,
      password: password,
      email_confirm: true,
      user_metadata: {
        name: volunteer.name,
        role: "volunteer"
      }
    })

    if (authError) {
      console.error("Error creating user:", authError)
      return { success: false, error: authError.message }
    }

    // Update volunteer record with approval and user_id
    const { error: updateError } = await supabase
      .from("volunteers")
      .update({
        is_approved: true,
        user_id: authData.user.id,
        approved_at: new Date().toISOString(),
        approved_by: adminEmail,
        status: "approved"
      })
      .eq("id", volunteerId)

    if (updateError) {
      console.error("Error updating volunteer:", updateError)
      // Rollback: delete the created user
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id)
      return { success: false, error: "Failed to update volunteer record" }
    }

    revalidatePath("/admin/volunteers")

    return { 
      success: true, 
      message: `Account created successfully for ${volunteer.name}`,
      userId: authData.user.id
    }
  } catch (error) {
    return handleActionError(error)
  }
}

export async function updateVolunteerPassword(
  volunteerId: string,
  newPassword: string
) {
  try {
    const supabase = await getSupabaseServerClient()

    // Get volunteer's user_id
    const { data: volunteer, error: fetchError } = await supabase
      .from("volunteers")
      .select("user_id, name, email")
      .eq("id", volunteerId)
      .single()

    if (fetchError || !volunteer || !volunteer.user_id) {
      return { success: false, error: "Volunteer account not found" }
    }

    // Update password using admin client
    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
      volunteer.user_id,
      { password: newPassword }
    )

    if (updateError) {
      console.error("Error updating password:", updateError)
      return { success: false, error: updateError.message }
    }

    return { 
      success: true, 
      message: `Password updated successfully for ${volunteer.name}`
    }
  } catch (error) {
    return handleActionError(error)
  }
}

export async function rejectVolunteer(
  volunteerId: string,
  reason: string,
  adminEmail: string
) {
  try {
    const supabase = await getSupabaseServerClient()

    const { error } = await supabase
      .from("volunteers")
      .update({
        status: "rejected",
        notes: reason,
        approved_by: adminEmail,
        approved_at: new Date().toISOString()
      })
      .eq("id", volunteerId)

    if (error) {
      console.error("Error rejecting volunteer:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/admin/volunteers")
    revalidatePath("/admin/volunteers")

    return { success: true, message: "Volunteer application rejected" }
  } catch (error) {
    return handleActionError(error)
  }
}
export async function deleteVolunteerAccount(volunteerId: string) {
  try {
    const supabase = await getSupabaseServerClient()

    // Get volunteer's user_id
    const { data: volunteer, error: fetchError } = await supabase
      .from("volunteers")
      .select("user_id, name")
      .eq("id", volunteerId)
      .single()

    if (fetchError || !volunteer) {
      return { success: false, error: "Volunteer not found" }
    }

    // Delete from auth if user exists
    if (volunteer.user_id) {
      const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(volunteer.user_id)
      if (authError) {
        console.error("Error deleting auth user:", authError)
      }
    }

    // Delete volunteer record
    const { error: deleteError } = await supabase
      .from("volunteers")
      .delete()
      .eq("id", volunteerId)

    if (deleteError) {
      console.error("Error deleting volunteer:", deleteError)
      return { success: false, error: deleteError.message }
    }

    revalidatePath("/admin/volunteers")

    return { 
      success: true, 
      message: `Volunteer ${volunteer.name} deleted successfully`
    }
  } catch (error) {
    return handleActionError(error)
  }
}

export async function addAdminNotes(volunteerId: string, notes: string) {
  try {
    const supabase = await getSupabaseServerClient()

    const { error } = await supabase
      .from("volunteers")
      .update({ notes })
      .eq("id", volunteerId)

    if (error) {
      console.error("Error adding notes:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/admin/volunteers")

    return { success: true, message: "Notes saved successfully" }
  } catch (error) {
    return handleActionError(error)
  }
}