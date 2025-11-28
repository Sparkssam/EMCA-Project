import { getSupabaseServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function requireAuth() {
  const supabase = await getSupabaseServerClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect("/login")
  }
  
  return user
}

export async function requireAdmin() {
  const user = await requireAuth()
  
  const userRole = user.user_metadata?.role
  
  if (userRole !== 'admin') {
    // If authenticated but not admin, redirect to home or show error
    // For now, we'll redirect to home
    redirect("/")
  }
  
  return user
}
