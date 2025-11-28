import { requireAdmin } from "@/lib/auth/utils"
import AdminPartnershipsManager from "@/components/admin/admin-partnerships-manager"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default async function AdminPartnershipsPage() {
  await requireAdmin()

  return (
    <div className="container mx-auto pt-32 py-8">
      <Link href="/">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>
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
