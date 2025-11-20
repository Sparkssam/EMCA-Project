import { Target, TrendingUp, Users, Award } from "lucide-react"

const benefits = [
  {
    icon: Target,
    title: "Measurable Impact",
    description:
      "Track and report on concrete environmental and social outcomes with our transparent impact framework.",
  },
  {
    icon: TrendingUp,
    title: "Brand Enhancement",
    description: "Strengthen your reputation through authentic environmental action and community engagement.",
  },
  {
    icon: Users,
    title: "Community Access",
    description: "Connect with grassroots networks, youth leaders, and communities across Tanzania.",
  },
  {
    icon: Award,
    title: "Recognition",
    description: "Receive acknowledgment through our platforms, events, and annual impact reports.",
  },
]

export function PartnershipBenefits() {
  return (
    <section className="py-24 bg-gradient-to-br from-forest-900 to-forest-800 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10 bg-primary">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Why Partner with <span className="text-forest-300">EMCA?</span>
          </h2>
          <p className="text-xl text-forest-100 leading-relaxed">
            Beyond impact, partnerships with EMCA offer strategic value for your organization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                <benefit.icon className="h-8 w-8 text-forest-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-forest-100 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
