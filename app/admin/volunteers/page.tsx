import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/actions/auth"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { VolunteersTable } from "@/components/admin/volunteers-table"

export default async function AdminVolunteersPage() {
  const { success, user } = await getCurrentUser()

  if (!success || !user) {
    redirect("/login")
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

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-pompiere text-foreground mb-2">
            Volunteer Applications
          </h1>
          <p className="text-muted-foreground">
            Manage and review volunteer submissions
          </p>
        </div>

        <VolunteersTable volunteers={volunteers || []} />
      </div>
    </div>
  )
}
