import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/actions/auth"
import { getAllReviews } from "@/lib/actions/reviews"
import { ReviewsManager } from "@/components/admin/reviews-manager"

export default async function AdminReviewsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const reviews = await getAllReviews()

  return (
    <div className="min-h-screen bg-gradient-to-br from-emca-darkest/5 via-white to-emca-primary/5">
      <ReviewsManager reviews={reviews} />
    </div>
  )
}
