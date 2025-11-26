import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/actions/auth"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default async function AdminPage() {
  const { success, user } = await getCurrentUser()

  if (!success || !user) {
    redirect("/login")
  }

  // Only allow admin role to access admin pages
  if (user.role !== "admin") {
    redirect("/") // Redirect volunteers to homepage
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
      <AdminDashboard user={user} />
    </div>
  )
}
