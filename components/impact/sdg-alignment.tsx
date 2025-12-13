import { Target } from "lucide-react"

const sdgs = [
  { number: 1, title: "No Poverty", description: "Creating sustainable livelihoods" },
  { number: 2, title: "Zero Hunger", description: "Sustainable agriculture training" },
  { number: 4, title: "Quality Education", description: "Environmental education programs" },
  { number: 6, title: "Clean Water", description: "Water access initiatives" },
  { number: 8, title: "Decent Work", description: "Green job creation" },
  { number: 11, title: "Sustainable Cities", description: "Urban greening projects" },
  { number: 13, title: "Climate Action", description: "Carbon reduction programs" },
  { number: 15, title: "Life on Land", description: "Reforestation and conservation" },
  { number: 17, title: "Partnerships", description: "Collaborative impact" },
]

export function SDGAlignment() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 rounded-full mb-6">
            <Target className="h-8 w-8 text-sky-600" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            ALIGNED WITH <span className="text-sky-600">UN SDGs</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our work directly contributes to the United Nations Sustainable Development Goals, creating global impact
            through local action.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {sdgs.map((sdg) => (
            <div
              key={sdg.number}
              className="group p-6 bg-card rounded-2xl border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center"
            >
              <div className="w-16 h-16 bg-sky-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform">
                {sdg.number}
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-sm">{sdg.title}</h3>
              <p className="text-xs text-muted-foreground">{sdg.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
