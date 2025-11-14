import { BookOpen, Users, Rocket, BarChart } from "lucide-react"

const steps = [
  {
    icon: BookOpen,
    title: "Listen & Learn",
    description:
      "We start by understanding community needs, local knowledge, and environmental challenges through deep engagement and research.",
  },
  {
    icon: Users,
    title: "Co-Create Solutions",
    description:
      "Together with communities, we design interventions that are culturally relevant, sustainable, and owned by those they serve.",
  },
  {
    icon: Rocket,
    title: "Implement & Adapt",
    description:
      "We launch projects with flexibility, learning from feedback and adjusting our approach to maximize impact and sustainability.",
  },
  {
    icon: BarChart,
    title: "Measure & Scale",
    description:
      "We track outcomes rigorously, share learnings openly, and replicate successful models to amplify our collective impact.",
  },
]

export function OurApproach() {
  return (
    <section className="py-24 bg-gradient-to-br from-forest-50 via-background to-sky-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-serif">
            Our <span className="text-forest-600">Approach</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We don't impose solutions—we cultivate them. Our methodology is participatory, adaptive, and rooted in
            community ownership.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-forest-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <div className="flex items-center gap-3 mb-3">
                      <step.icon className="h-6 w-6 text-forest-600" />
                      <h3 className="text-2xl font-semibold text-foreground">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-20 left-8 w-0.5 h-full bg-forest-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
