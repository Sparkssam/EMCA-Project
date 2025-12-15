"use client"

import { useState } from "react"
import { Star, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { submitPublicReview } from "@/lib/actions/reviews"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function ReviewSubmissionForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    rating: 5,
    review: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await submitPublicReview(formData)

      if (result.success) {
        setSubmitted(true)
        toast.success("Review submitted successfully! It will appear after admin approval.")
        
        // Refresh the page to potentially show updated reviews
        router.refresh()
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setSubmitted(false)
          setFormData({
            name: "",
            email: "",
            location: "",
            rating: 5,
            review: "",
          })
        }, 3000)
      } else {
        toast.error(result.error || "Failed to submit review. Please try again.")
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-emca-primary/5 border-2 border-emca-primary/20 rounded-2xl p-6 sticky top-24">
      <h3 className="text-2xl font-pompiere text-foreground mb-4">SHARE YOUR EXPERIENCE</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Your feedback helps us improve and inspires others to join our mission.
      </p>

      {submitted ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-emca-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="h-8 w-8 fill-emca-primary text-emca-primary" />
          </div>
          <h4 className="text-xl font-pompiere text-foreground mb-2">Thank You!</h4>
          <p className="text-sm text-muted-foreground">
            Your review has been submitted and is pending admin approval. It will appear on the website once approved.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
              Name *
            </label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your full name"
              className="border-emca-primary/20"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
              Email *
            </label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
              className="border-emca-primary/20"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-foreground mb-1">
              Location *
            </label>
            <Input
              id="location"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="City, Country"
              className="border-emca-primary/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Rating *</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= formData.rating
                        ? "fill-emca-yellow text-emca-yellow"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="review" className="block text-sm font-medium text-foreground mb-1">
              Your Review *
            </label>
            <Textarea
              id="review"
              required
              value={formData.review}
              onChange={(e) => setFormData({ ...formData, review: e.target.value })}
              placeholder="Share your experience with EMCA..."
              rows={4}
              className="border-emca-primary/20 resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emca-primary hover:bg-emca-secondary text-white"
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit Review
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  )
}
