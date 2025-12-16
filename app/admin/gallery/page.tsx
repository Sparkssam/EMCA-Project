import { requireAdmin } from "@/lib/auth/utils"
import { getAllGalleryItems } from "@/lib/actions/gallery"
import { GalleryManager } from "@/components/admin/gallery-manager"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default async function AdminGalleryPage() {
  await requireAdmin()

  const galleryItems = await getAllGalleryItems()

  return (
    <div className="min-h-screen bg-gradient-to-br from-emca-darkest/5 via-white to-emca-primary/5 pt-32">
      <div className="container mx-auto py-8 px-4">
        <Link href="/admin">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Admin Dashboard
          </Button>
        </Link>
        <GalleryManager initialItems={galleryItems} />
      </div>
    </div>
  )
}
