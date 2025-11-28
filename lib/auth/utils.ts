import { getSupabaseServerClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"

export async function requireAuth() {
  const supabase = await getSupabaseServerClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect("/login")
  }
  
  return user
}

export async function requireAdmin() {
  const supabase = await getSupabaseServerClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    notFound()
  }
  
  const userRole = user.user_metadata?.role
  
  if (userRole !== 'admin') {
    notFound()
  }
  
  return user
}
