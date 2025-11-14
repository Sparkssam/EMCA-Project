"use client"

import { useState } from "react"
import { Star, Send } from 'lucide-react'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const reviews = [
  {
    id: 1,
    name: "Amina Hassan",
    role: "Community Leader",
    location: "Dar es Salaam, Tanzania",
    rating: 5,
    date: "2 weeks ago",
    avatar: "/placeholder.svg?height=80&width=80",
    text: "EMCA has transformed our community's approach to environmental conservation. Their youth leadership programs are outstanding and have inspired many young people to take action.",
  },
  {
    id: 2,
    name: "Joseph Mwangi",
    role: "School Principal",
    location: "Ubungo, Tanzania",
    rating: 5,
    date: "1 month ago",
    avatar: "/placeholder.svg?height=80&width=80",
    text: "The Tuelimishe Mazingira project at our school has been incredible. Students are now passionate about environmental protection and we've planted over 200 trees together!",
  },
  {
    id: 3,
    name: "Grace Kimaro",
    role: "Volunteer Coordinator",
    location: "Tanga, Tanzania",
    rating: 5,
    date: "3 weeks ago",
    avatar: "/placeholder.svg?height=80&width=80",
    text: "Working with EMCA on the Binti Mazingira project has been life-changing. They truly empower women and girls while addressing critical environmental and health issues.",
  },
  {
    id: 4,
    name: "David Mollel",
    role: "Local Farmer",
    location: "Muheza, Tanzania",
    rating: 5,
    date: "2 months ago",
    avatar: "/placeholder.svg?height=80&width=80",
    text: "EMCA's sustainable agriculture training has improved my farm's productivity while protecting the environment. Their practical approach makes a real difference.",
  },
]

export function ReviewsSection() {
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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setSubmitted(true)
    setIsSubmitting(false)

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
  }

  const averageRating = 5.0
  const totalReviews = 127

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
            <div className="grid gap-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-card border-2 border-border rounded-2xl p-6 space-y-4 hover:border-emca-primary/40 transition-all duration-500"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <Image
                        src={review.avatar || "/placeholder.svg"}
                        alt={review.name}
                        width={48}
                        height={48}
                        className="rounded-full border-2 border-border"
                      />
                      <div>
                        <h4 className="font-pompiere text-lg text-foreground">{review.name}</h4>
                        <p className="text-sm text-muted-foreground">{review.role}</p>
                        <p className="text-xs text-muted-foreground">{review.location}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{review.date}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-emca-yellow text-emca-yellow" />
                    ))}
                  </div>

                  <p className="text-base text-foreground leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Review Submission Form - Takes 1 column */}
          <div className="lg:col-span-1">
            <div className="bg-emca-primary/5 border-2 border-emca-primary/20 rounded-2xl p-6 sticky top-24">
              <h3 className="text-2xl font-pompiere text-foreground mb-4">Share Your Experience</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Your feedback helps us improve and inspires others to join our mission.
              </p>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emca-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 fill-emca-primary text-emca-primary" />
                  </div>
                  <h4 className="text-xl font-pompiere text-foreground mb-2">Thank You!</h4>
                  <p className="text-sm text-muted-foreground">Your review has been submitted successfully.</p>
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
          </div>
        </div>
      </div>
    </section>
  )
}
