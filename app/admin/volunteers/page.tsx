import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/actions/auth"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { VolunteersManager } from "@/components/admin/volunteers-manager"

export default async function AdminVolunteersPage() {
  const { success, user } = await getCurrentUser()

  if (!success || !user) {
    redirect("/login")
  }

  // Only allow admin role to access admin pages
  if (user.role !== "admin") {
    redirect("/") // Redirect volunteers to homepage
  }

  // Fetch volunteers from database
  const supabase = await getSupabaseServerClient()
  const { data: volunteers, error } = await supabase
    .from("volunteers")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching volunteers:", error)
  }

  return <VolunteersManager volunteers={volunteers || []} adminEmail={user.email || ""} />
}
