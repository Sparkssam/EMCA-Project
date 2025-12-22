"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"
import { useState } from "react"
import { subscribeToNewsletter } from "@/lib/actions/newsletter"
import { toast } from "sonner"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const result = await subscribeToNewsletter(email)
      
      if (result.success) {
        setStatus("success")
        setMessage(result.message)
        setEmail("")
        toast.success(result.message)
      } else {
        setStatus("error")
        setMessage(result.message)
        toast.error(result.message)
      }
    } catch (error) {
      setStatus("error")
      setMessage("Something went wrong. Please try again.")
      toast.error("Failed to subscribe. Please try again.")
    }

    setTimeout(() => {
      setStatus("idle")
      setMessage("")
    }, 5000)
  }

  return (
    <section className="py-24 bg-gradient-to-br from-forest-900 to-forest-800 dark:from-forest-950 dark:to-forest-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-black">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-4">
            <Mail className="h-8 w-8 text-teal-800" />
          </div>

          <h2 className="font-pompiere text-4xl md:text-5xl font-bold text-primary font-serif">
            NEVER MISS A <span className="text-forest-300">STORY</span>
          </h2>

          <p className="text-xl leading-relaxed text-primary">
            Get inspiring stories, impact updates, and opportunities to make a difference delivered to your inbox every
            week.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              className="flex-1 h-14 bg-white/10 backdrop-blur-sm border-white/20 placeholder:text-forest-200 focus:border-forest-300 text-primary"
              required
            />
            <Button
              type="submit"
              size="lg"
              disabled={status === "loading"}
              className="h-14 bg-white text-forest-900 hover:bg-forest-50 px-8 disabled:opacity-50"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>

          {message && (
            <p className={`text-sm font-medium ${status === "success" ? "text-green-300" : "text-red-300"}`}>
              {message}
            </p>
          )}

          <p className="text-sm text-primary">
            Join 100+ subscribers. Unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  )
}
