import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "I've been a monthly donor for 2 years. Seeing the quarterly impact reports and knowing exactly where my money goes gives me confidence that I'm making a real difference.",
    name: "Maria Schmidt",
    location: "Germany",
    type: "Monthly Donor",
  },
  {
    quote:
      "I funded a specific reforestation project and received updates with photos throughout. It's incredible to see the forest growing and know I helped make it happen.",
    name: "James Chen",
    location: "Singapore",
    type: "Project Sponsor",
  },
]

export function DonorTestimonials() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              WHY DONORS <span className="text-forest-600">TRUST US</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-8 bg-card rounded-2xl border border-border">
                <Quote className="h-10 w-10 text-forest-600 mb-6" />
                <p className="text-lg text-muted-foreground leading-relaxed mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.type} • {testimonial.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
