import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/actions/auth"
import { getAllImpactStats } from "@/lib/actions/content"
import { ImpactStatsManager } from "@/components/admin/impact-stats-manager"

export const metadata = {
  title: "Manage Impact Stats | Admin Dashboard",
  description: "Manage impact statistics and metrics",
}

export default async function AdminImpactStatsPage() {
  const { success, user } = await getCurrentUser()

  if (!success || !user) {
    redirect("/login")
  }

  // Only allow admin role to access admin pages
  if (user.role !== "admin") {
    redirect("/")
  }

  const result = await getAllImpactStats()
  const stats = result.success ? result.data || [] : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-emca-darkest/5 via-white to-emca-primary/5">
      <ImpactStatsManager stats={stats} userEmail={user.email} />
    </div>
  )
}
