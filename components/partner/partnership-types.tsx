import { Building2, Users, GraduationCap, Globe } from "lucide-react"

const types = [
  {
    icon: Building2,
    title: "Corporate Partnerships",
    description:
      "Align your CSR goals with environmental action. Employee engagement programs, matching donations, and co-branded initiatives.",
    benefits: ["Brand visibility", "Employee engagement", "Impact reporting", "Tax benefits"],
    color: "text-forest-600",
    bgColor: "bg-forest-100",
  },
  {
    icon: Users,
    title: "NGO Collaborations",
    description:
      "Join forces with fellow organizations to maximize impact. Shared resources, joint programs, and knowledge exchange.",
    benefits: ["Resource sharing", "Network expansion", "Joint funding", "Best practices"],
    color: "text-sky-600",
    bgColor: "bg-sky-100",
  },
  {
    icon: GraduationCap,
    title: "Academic Institutions",
    description:
      "Research partnerships, student internships, and field study opportunities. Bridge theory and practice for real-world impact.",
    benefits: ["Research opportunities", "Student programs", "Data access", "Publications"],
    color: "text-earth-600",
    bgColor: "bg-earth-100",
  },
  {
    icon: Globe,
    title: "International Organizations",
    description:
      "Global partnerships for local impact. Funding, technical expertise, and international advocacy support.",
    benefits: ["Funding access", "Technical support", "Global network", "Capacity building"],
    color: "text-forest-700",
    bgColor: "bg-forest-50",
  },
]

export function PartnershipTypes() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Partnership <span className="text-forest-600">Opportunities</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We work with diverse partners to create synergies and multiply our collective impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {types.map((type, index) => (
            <div
              key={index}
              className="group p-8 bg-card rounded-2xl border border-border hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`w-16 h-16 ${type.bgColor} rounded-2xl flex items-center justify-center mb-6`}>
                <type.icon className={`h-8 w-8 ${type.color}`} />
              </div>

              <h3 className="text-2xl font-semibold text-foreground mb-3">{type.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{type.description}</p>

              <div>
                <p className="text-sm font-medium text-foreground mb-3">Partnership Benefits:</p>
                <ul className="space-y-2">
                  {type.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className={`w-1.5 h-1.5 rounded-full ${type.bgColor}`} />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
