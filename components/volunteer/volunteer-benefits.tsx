import { Clock, Award, Users, BookOpen, Globe, Lightbulb } from "lucide-react"

const benefits = [
  {
    icon: Clock,
    title: "Flexible Schedule",
    description: "Choose opportunities that fit your availability, from one-time events to ongoing commitments.",
  },
  {
    icon: Award,
    title: "Skill Development",
    description:
      "Gain hands-on experience in environmental conservation, project management, and community engagement.",
  },
  {
    icon: Users,
    title: "Community Network",
    description: "Connect with like-minded individuals and build lasting relationships with environmental leaders.",
  },
  {
    icon: BookOpen,
    title: "Training & Certification",
    description: "Access workshops, training sessions, and receive certificates for your volunteer contributions.",
  },
  {
    icon: Globe,
    title: "Real Impact",
    description: "See the direct results of your work in communities and ecosystems across Tanzania.",
  },
  {
    icon: Lightbulb,
    title: "Leadership Opportunities",
    description: "Take on leadership roles and help guide the next generation of environmental advocates.",
  },
]

export function VolunteerBenefits() {
  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-pompiere text-foreground font-serif">Why Volunteer with EMCA?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Volunteering with EMCA is more than giving your time—it's about growing, learning, and making a tangible
            difference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-card border-2 border-border rounded-2xl p-8 space-y-4 hover:border-emca-primary/40 transition-all duration-500 card-hover"
              style={{ animation: `fade-in 0.5s ease-out ${index * 0.1}s both` }}
            >
              <div className="w-16 h-16 bg-emca-primary/10 rounded-2xl flex items-center justify-center">
                <benefit.icon className="h-8 w-8 text-emca-primary" />
              </div>
              <h3 className="text-2xl font-pompiere text-foreground">{benefit.title}</h3>
              <p className="text-base text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
