import { Handshake } from "lucide-react"

export function PartnerHero() {
  return (
    <section className="relative pt-32 pb-24 bg-gradient-to-br from-sky-50 via-background to-earth-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-earth-200/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-sky-100 rounded-full mb-6">
            <Handshake className="h-10 w-10 text-sky-600" />
          </div>

          <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground leading-tight">
            CONNECT & <span className="text-sky-600">COLLABORATE</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-serif">
            Together, we can achieve more. Partner with EMCA to amplify environmental impact, empower communities, and
            build a sustainable future for Tanzania.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            {[
              { value: "25+", label: "Active Partners" },
              { value: "50+", label: "Joint Projects" },
              { value: "$2M+", label: "Collective Impact" },
            ].map((stat, index) => (
              <div key={index} className="p-6 bg-card rounded-2xl border border-border">
                <div className="text-3xl font-bold text-sky-600 font-serif mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
