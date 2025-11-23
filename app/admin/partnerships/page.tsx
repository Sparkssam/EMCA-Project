import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import AdminPartnershipsManager from "@/components/admin/admin-partnerships-manager"

export default async function AdminPartnershipsPage() {
  const supabase = await getSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Check if user is authenticated and is an admin
  if (!user || user.user_metadata?.role !== "admin") {
    redirect("/login")
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Manage Partnerships</h1>
        <p className="text-muted-foreground mt-2">
          Review and manage partnership inquiries
        </p>
      </div>
      <AdminPartnershipsManager />
    </div>
  )
}
