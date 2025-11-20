import { Star } from 'lucide-react'
import Image from "next/image"
import { getReviews } from "@/lib/actions/reviews"
import { ReviewSubmissionForm } from "./review-submission-form"

export async function ReviewsSection() {
  const reviews = await getReviews()
  
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "5.0"
  const totalReviews = reviews.length

  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-pompiere text-foreground">Community Reviews</h2>
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-emca-yellow text-emca-yellow" />
              ))}
            </div>
            <span className="text-2xl font-pompiere text-foreground">{averageRating}</span>
            <span className="text-muted-foreground">({totalReviews} reviews)</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Reviews Display - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-2xl font-pompiere text-foreground mb-6">What People Say</h3>
            {reviews.length === 0 ? (
              <div className="text-center py-12 bg-card border-2 border-border rounded-2xl">
                <p className="text-muted-foreground">No reviews yet. Be the first to share your experience!</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {reviews.map((review) => {
                  const reviewDate = new Date(review.created_at)
                  const now = new Date()
                  const diffTime = Math.abs(now.getTime() - reviewDate.getTime())
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                  const timeAgo = diffDays < 7 
                    ? `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
                    : diffDays < 30
                    ? `${Math.ceil(diffDays / 7)} week${Math.ceil(diffDays / 7) > 1 ? 's' : ''} ago`
                    : `${Math.ceil(diffDays / 30)} month${Math.ceil(diffDays / 30) > 1 ? 's' : ''} ago`

                  return (
                    <div
                      key={review.id}
                      className="bg-card border-2 border-border rounded-2xl p-6 space-y-4 hover:border-emca-primary/40 transition-all duration-500"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          {review.image_url ? (
                            <Image
                              src={review.image_url}
                              alt={review.name}
                              width={48}
                              height={48}
                              className="rounded-full border-2 border-border"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-emca-primary/20 flex items-center justify-center border-2 border-border">
                              <span className="text-lg font-bold text-emca-primary">
                                {review.name.charAt(0)}
                              </span>
                            </div>
                          )}
                          <div>
                            <h4 className="font-pompiere text-lg text-foreground">{review.name}</h4>
                            <p className="text-sm text-muted-foreground">{review.role}</p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{timeAgo}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-emca-yellow text-emca-yellow" />
                        ))}
                      </div>

                      <p className="text-base text-foreground leading-relaxed">{review.text}</p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Review Submission Form - Takes 1 column */}
          <div className="lg:col-span-1">
            <ReviewSubmissionForm />
          </div>
        </div>
      </div>
    </section>
  )
}
