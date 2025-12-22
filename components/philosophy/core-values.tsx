import { Heart, Users, Lightbulb, Target, Shield, Sparkles } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Ubuntu",
    subtitle: "I am because we are",
    description:
      "We believe in collective responsibility and interconnectedness. Our actions ripple through communities, ecosystems, and generations.",
    color: "text-emca-primary",
    bgColor: "bg-emca-primary/10",
  },
  {
    icon: Users,
    title: "Empowerment",
    subtitle: "The future belongs to the bold",
    description:
      "Young people are not just leaders of tomorrow—they are changemakers today. We invest in their potential, amplify their voices, and trust their vision.",
    color: "text-emca-medium",
    bgColor: "bg-emca-medium/10",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    subtitle: "Solutions from the ground up",
    description:
      "We embrace creativity and local wisdom. The best solutions come from communities who understand their challenges intimately.",
    color: "text-emca-yellow",
    bgColor: "bg-emca-yellow/10",
  },
  {
    icon: Target,
    title: "Impact-Driven",
    subtitle: "Measurable change, lasting results",
    description:
      "Every project is designed with clear goals and tracked outcomes. We're accountable to the communities we serve and the planet we protect.",
    color: "text-emca-primary",
    bgColor: "bg-emca-primary/10",
  },
  {
    icon: Shield,
    title: "Integrity",
    subtitle: "Transparency in all we do",
    description:
      "We operate with honesty, ethical practices, and open communication. Trust is earned through consistent action and accountability.",
    color: "text-emca-medium",
    bgColor: "bg-emca-medium/10",
  },
  {
    icon: Sparkles,
    title: "Hope",
    subtitle: "Optimism fuels action",
    description:
      "We believe in a better future because we're actively building it. Hope is not passive—it's the courage to act despite challenges.",
    color: "text-emca-lime",
    bgColor: "bg-emca-lime/10",
  },
]

export function CoreValues() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="font-pompiere text-3xl sm:text-4xl md:text-5xl font-normal text-foreground mb-4 sm:mb-6 font-serif">
            OUR CORE <span className="text-emca-primary">VALUES</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-serif">
            These principles guide every decision, project, and partnership. They are the foundation of who we are and
            how we work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="group p-6 sm:p-8 bg-card rounded-2xl border-2 border-border hover:border-emca-primary/40 transition-all duration-300"
            >
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 ${value.bgColor} rounded-2xl flex items-center justify-center mb-4 sm:mb-6`}
              >
                <value.icon className={`h-7 w-7 sm:h-8 sm:h-8 ${value.color}`} />
              </div>

              <h3 className="font-pompiere text-xl sm:text-2xl font-normal text-foreground mb-2 font-serif">{value.title}</h3>
              <p className={`text-xs sm:text-sm font-medium ${value.color} mb-3 sm:mb-4`}>{value.subtitle}</p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
