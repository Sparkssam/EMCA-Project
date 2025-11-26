import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/actions/auth"
import { getAllImpactStats } from "@/lib/actions/content"
import { ImpactStatsManager } from "@/components/admin/impact-stats-manager"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

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
    <div className="min-h-screen bg-gradient-to-br from-emca-darkest/5 via-white to-emca-primary/5 pt-32">
      <div className="container mx-auto py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <ImpactStatsManager stats={stats} userEmail={user.email} />
      </div>
    </div>
  )
}
