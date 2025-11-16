"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus, Edit, Trash2, Eye, EyeOff, Star } from "lucide-react"
import { Review } from "@/lib/actions/reviews"
import { ReviewFormDialog } from "./review-form-dialog"
import { toast } from "sonner"
import { deleteReview, toggleReviewStatus } from "@/lib/actions/reviews"
import Image from "next/image"

interface ReviewsManagerProps {
  reviews: Review[]
}

export function ReviewsManager({ reviews: initialReviews }: ReviewsManagerProps) {
  const router = useRouter()
  const [reviews, setReviews] = useState(initialReviews)
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const handleAddNew = () => {
    setSelectedReview(null)
    setIsDialogOpen(true)
  }

  const handleEdit = (review: Review) => {
    setSelectedReview(review)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the review from "${name}"? This action cannot be undone.`)) {
      return
    }

    setIsDeleting(id)
    const result = await deleteReview(id)

    if (result.success) {
      toast.success("Review deleted successfully")
      setReviews(reviews.filter((r) => r.id !== id))
    } else {
      toast.error(result.error || "Failed to delete review")
    }
    setIsDeleting(null)
  }

  const handleToggleStatus = async (review: Review) => {
    const newStatus = !review.is_active
    const result = await toggleReviewStatus(review.id, newStatus)

    if (result.success) {
      toast.success(`Review ${newStatus ? "activated" : "deactivated"}`)
      setReviews(
        reviews.map((r) => (r.id === review.id ? { ...r, is_active: newStatus } : r))
      )
    } else {
      toast.error(result.error || "Failed to update review status")
    }
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setSelectedReview(null)
    router.refresh()
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Button
            variant="ghost"
            onClick={() => router.push("/admin")}
            className="mb-4 hover:bg-emca-primary/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emca-primary to-emca-medium bg-clip-text text-transparent">
            Manage Reviews
          </h1>
          <p className="text-muted-foreground mt-2">
            Add, edit, or remove customer testimonials and reviews
          </p>
        </div>
        <Button
          onClick={handleAddNew}
          className="bg-gradient-to-r from-emca-primary to-emca-medium hover:from-emca-medium hover:to-emca-primary text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Review
        </Button>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-muted-foreground mb-4">No reviews yet. Add your first review!</p>
          <Button
            onClick={handleAddNew}
            className="bg-gradient-to-r from-emca-primary to-emca-medium text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add First Review
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className={`bg-white rounded-lg border shadow-sm overflow-hidden transition-all ${
                review.is_active ? "border-gray-200" : "border-gray-300 opacity-60"
              }`}
            >
              <div className="p-6">
                {/* Header with image and name */}
                <div className="flex items-start gap-4 mb-4">
                  {review.image_url ? (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={review.image_url}
                        alt={review.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-emca-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-emca-primary">
                        {review.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 truncate">{review.name}</h3>
                    <p className="text-sm text-emca-primary font-medium truncate">{review.role}</p>
                    <div className="mt-2">{renderStars(review.rating)}</div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                      review.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {review.is_active ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Review text */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-4">{review.text}</p>

                {/* Meta info */}
                <div className="text-xs text-gray-500 mb-4">
                  Order: {review.display_order}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleStatus(review)}
                    className="flex items-center gap-1 text-xs"
                  >
                    {review.is_active ? (
                      <>
                        <EyeOff className="h-3 w-3" />
                        Hide
                      </>
                    ) : (
                      <>
                        <Eye className="h-3 w-3" />
                        Show
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(review)}
                    className="flex items-center gap-1 text-xs"
                  >
                    <Edit className="h-3 w-3" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(review.id, review.name)}
                    disabled={isDeleting === review.id}
                    className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700 hover:border-red-300"
                  >
                    <Trash2 className="h-3 w-3" />
                    {isDeleting === review.id ? "..." : "Delete"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ReviewFormDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        review={selectedReview}
      />
    </div>
  )
}
