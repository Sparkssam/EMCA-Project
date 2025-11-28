import { requireAdmin } from "@/lib/auth/utils"
import AdminNewsManager from "@/components/admin/admin-news-manager"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default async function AdminNewsPage() {
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
        <h1 className="text-3xl font-bold">Manage News & Updates</h1>
        <p className="text-muted-foreground mt-2">
          Create, edit, and manage news articles and updates
        </p>
      </div>
      <AdminNewsManager />
    </div>
  )
}
