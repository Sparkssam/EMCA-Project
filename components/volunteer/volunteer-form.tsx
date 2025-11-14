"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Send, Calendar, LogIn } from 'lucide-react'

const opportunities = [
  "Tree Planting & Reforestation",
  "Beach & Community Cleanups",
  "Environmental Education",
  "Project Coordination",
  "Social Media & Communications",
  "Fundraising & Partnerships",
  "Workshop Facilitation",
  "Research & Documentation",
]

export function VolunteerForm() {
  const searchParams = useSearchParams()
  const eventName = searchParams.get('event')
  const eventId = searchParams.get('eventId')

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    interests: [] as string[],
    availability: "",
    experience: "",
    message: "",
    registeringForEvent: eventName || "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      if (formData.registeringForEvent) {
        setSubmitMessage(`Thank you for registering for "${formData.registeringForEvent}"! We'll contact you within 48 hours with event details.`)
      } else {
        setSubmitMessage("Thank you for your interest! We'll contact you within 48 hours.")
      }
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        interests: [],
        availability: "",
        experience: "",
        message: "",
        registeringForEvent: "",
      })
    }, 2000)
  }

  return (
    <section className="py-20 sm:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-pompiere text-foreground font-serif">Register to Volunteer</h2>
            <p className="text-lg text-muted-foreground">
              Fill out the form below and we'll match you with opportunities that fit your interests and skills.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card border-2 border-border rounded-2xl p-8 md:p-12 space-y-8">
            {formData.registeringForEvent && (
              <div className="bg-emca-primary/10 border-2 border-emca-primary rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <Calendar className="h-6 w-6 text-emca-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-emca-primary mb-1">Event Registration</h3>
                    <p className="text-foreground">
                      You're registering as a volunteer for: <strong>{formData.registeringForEvent}</strong>
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Complete the form below to confirm your participation. You can also select additional areas of interest.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-base font-medium text-foreground">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-background border-2 border-border rounded-2xl text-foreground focus:border-emca-primary focus:outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <label className="text-base font-medium text-foreground">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-background border-2 border-border rounded-2xl text-foreground focus:border-emca-primary focus:outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-base font-medium text-foreground">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-background border-2 border-border rounded-2xl text-foreground focus:border-emca-primary focus:outline-none transition-colors"
                  placeholder="+255 XXX XXX XXX"
                />
              </div>

              <div className="space-y-2">
                <label className="text-base font-medium text-foreground">Location *</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 bg-background border-2 border-border rounded-2xl text-foreground focus:border-emca-primary focus:outline-none transition-colors"
                  placeholder="Dar es Salaam"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-base font-medium text-foreground">
                {formData.registeringForEvent ? "Additional Areas of Interest (Optional)" : "Areas of Interest *"}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {opportunities.map((opportunity) => (
                  <button
                    key={opportunity}
                    type="button"
                    onClick={() => handleInterestToggle(opportunity)}
                    className={`px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 text-left ${
                      formData.interests.includes(opportunity)
                        ? "bg-emca-primary text-white"
                        : "bg-muted text-foreground hover:bg-muted/60 border-2 border-border"
                    }`}
                  >
                    {opportunity}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-base font-medium text-foreground">Availability *</label>
              <select
                required
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                className="w-full px-4 py-3 bg-background border-2 border-border rounded-2xl text-foreground focus:border-emca-primary focus:outline-none transition-colors"
              >
                <option value="">Select your availability</option>
                <option value="weekends">Weekends only</option>
                <option value="weekdays">Weekdays only</option>
                <option value="flexible">Flexible schedule</option>
                <option value="one-time">One-time events</option>
                <option value="ongoing">Ongoing commitment</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-base font-medium text-foreground">Previous Experience (Optional)</label>
              <textarea
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-background border-2 border-border rounded-2xl text-foreground focus:border-emca-primary focus:outline-none transition-colors resize-none"
                placeholder="Tell us about any relevant experience you have..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-base font-medium text-foreground">Additional Message (Optional)</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-background border-2 border-border rounded-2xl text-foreground focus:border-emca-primary focus:outline-none transition-colors resize-none"
                placeholder="Anything else you'd like us to know?"
              />
            </div>

            {submitMessage && (
              <div className="p-4 bg-emca-primary/10 border-2 border-emca-primary/30 rounded-2xl text-emca-primary text-center">
                {submitMessage}
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting || (!formData.registeringForEvent && formData.interests.length === 0)}
              className="w-full bg-emca-primary hover:bg-emca-medium text-white py-6 text-lg rounded-2xl transition-all duration-300 hover:scale-[1.02]"
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  {formData.registeringForEvent ? "Confirm Registration" : "Submit Application"}
                  <Send className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>

            {/* Login Section */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-card text-muted-foreground">or</span>
              </div>
            </div>

            <div className="text-center space-y-4">
              <p className="text-base text-foreground">
                Login if you're a member of our community
              </p>
              <Link href="/login">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-2 border-emca-primary text-emca-primary hover:bg-emca-primary hover:text-white py-6 text-lg rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                >
                  Login
                  <LogIn className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
