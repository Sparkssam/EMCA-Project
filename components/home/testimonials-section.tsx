"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    quote:
      "EMCA gave me the tools and confidence to become an environmental leader in my community. Now I'm teaching others about sustainable practices and we've planted over 500 trees together.",
    author: "Amina Hassan",
    role: "Youth Ambassador",
    location: "Arusha",
    image: "/young-african-woman-smiling.png",
  },
  {
    quote:
      "The sustainable farming training transformed my livelihood. I've increased my yield by 60% while using less water and no harmful chemicals. My family's future is secure.",
    author: "Joseph Mwangi",
    role: "Farmer",
    location: "Morogoro",
    image: "/african-farmer-portrait.jpg",
  },
  {
    quote:
      "As a teacher, I've seen how EMCA's programs inspire students to care about their environment. The change in their attitudes and actions is remarkable. They're true changemakers.",
    author: "Grace Kimaro",
    role: "School Principal",
    location: "Dar es Salaam",
    image: "/african-woman-teacher-professional.jpg",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const previous = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[currentIndex]

  return (
    <section className="py-24 bg-gradient-to-br from-forest-900 to-forest-800 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Voices from the <span className="text-forest-300">Community</span>
            </h2>
            <p className="text-lg text-forest-100 leading-relaxed">
              Real stories from the people whose lives have been transformed by our collective action.
            </p>
          </div>

          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
              <Quote className="h-12 w-12 text-forest-300 mb-6" />

              <blockquote className="text-xl md:text-2xl font-serif leading-relaxed mb-8 text-balance">
                "{current.quote}"
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-forest-300">
                  <Image src={current.image || "/placeholder.svg"} alt={current.author} fill className="object-cover" />
                </div>
                <div>
                  <div className="font-semibold text-lg">{current.author}</div>
                  <div className="text-forest-200">
                    {current.role} • {current.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                onClick={previous}
                size="icon"
                variant="outline"
                className="rounded-full border-white/30 text-white hover:bg-white/20 bg-transparent"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? "bg-white w-8" : "bg-white/40"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                onClick={next}
                size="icon"
                variant="outline"
                className="rounded-full border-white/30 text-white hover:bg-white/20 bg-transparent"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
