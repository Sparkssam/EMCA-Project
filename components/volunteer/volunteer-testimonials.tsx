import { Quote } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "Fatuma Juma",
    role: "Environmental Education Volunteer",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "Volunteering with EMCA has been transformative. I've learned so much about conservation and met incredible people who share my passion for the environment.",
  },
  {
    name: "Michael Swai",
    role: "Tree Planting Coordinator",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "Being part of the tree planting initiatives has shown me the direct impact we can have. Seeing communities come together to restore our forests is truly inspiring.",
  },
  {
    name: "Sarah Moshi",
    role: "Youth Workshop Facilitator",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "Working with youth through EMCA's programs has been rewarding. I love watching young people discover their power to create environmental change.",
  },
]

export function VolunteerTestimonials() {
  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-pompiere text-foreground font-serif">Volunteer Stories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from our amazing volunteers about their experiences with EMCA
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border-2 border-border rounded-2xl p-8 space-y-6 hover:border-emca-primary/40 transition-all duration-500"
            >
              <Quote className="h-12 w-12 text-emca-yellow" />

              <p className="text-base text-foreground leading-relaxed italic">"{testimonial.quote}"</p>

              <div className="flex items-center gap-4 pt-4 border-t-2 border-border">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={60}
                  height={60}
                  className="rounded-full border-2 border-emca-primary"
                />
                <div>
                  <div className="font-pompiere text-lg text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
