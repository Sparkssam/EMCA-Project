import { Heart } from "lucide-react"

export function DonateHero() {
  return (
    <section className="relative pt-32 pb-24 bg-gradient-to-br from-forest-50 via-background to-earth-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-forest-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-earth-200/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-forest-100 rounded-full mb-6">
            <Heart className="h-10 w-10 text-forest-600 fill-forest-600" />
          </div>

          <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground leading-tight">
            GIVE BACK TO <span className="text-forest-600">EARTH</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-serif">
            Your generosity plants trees, empowers youth, protects ecosystems, and builds sustainable futures. Every
            contribution creates lasting change.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            {[
              { value: "$25", impact: "Plants 50 trees" },
              { value: "$100", impact: "Trains 5 youth leaders" },
              { value: "$500", impact: "Supports a community project" },
            ].map((item, index) => (
              <div key={index} className="p-6 bg-card rounded-2xl border border-border">
                <div className="text-3xl font-bold text-forest-600 font-serif mb-2">{item.value}</div>
                <div className="text-sm text-muted-foreground">{item.impact}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
