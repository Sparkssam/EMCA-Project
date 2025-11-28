import { requireAdmin } from "@/lib/auth/utils"
import { getAllReviews } from "@/lib/actions/reviews"
import { ReviewsManager } from "@/components/admin/reviews-manager"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default async function AdminReviewsPage() {
  await requireAdmin()

  const reviews = await getAllReviews()

  return (
    <div className="min-h-screen bg-gradient-to-br from-emca-darkest/5 via-white to-emca-primary/5 pt-32">
      <div className="container mx-auto py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <ReviewsManager reviews={reviews} />
      </div>
    </div>
  )
}
