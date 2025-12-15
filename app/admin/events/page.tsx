import { requireAdmin } from "@/lib/auth/utils"
import { AdminEventsManager } from "@/components/admin/admin-events-manager"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Manage Events | Admin Dashboard",
  description: "Create, edit, and manage all events",
}

export default async function AdminEventsPage() {
  const user = await requireAdmin()

  return (
    <div className="min-h-screen bg-background pt-32 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <AdminEventsManager userEmail={user.email!} />
      </div>
    </div>
  )
}
