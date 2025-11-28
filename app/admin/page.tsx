import { requireAdmin } from "@/lib/auth/utils"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default async function AdminPage() {
  const user = await requireAdmin()

  const dashboardUser = {
    id: user.id,
    email: user.email,
    role: user.user_metadata?.role
  }

  return (
    <div className="pt-32">
      <div className="container mx-auto py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
      <AdminDashboard user={dashboardUser} />
    </div>
  )
}
