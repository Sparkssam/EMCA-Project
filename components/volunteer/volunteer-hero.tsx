import { Users, Heart, Leaf } from "lucide-react"

export function VolunteerHero() {
  return (
    <section className="relative py-32 sm:py-40 bg-gradient-to-br from-emca-darkest via-emca-dark to-emca-medium overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-emca-yellow/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-10 left-10 w-80 h-80 bg-emca-lime/15 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-5 py-2 glass rounded-full text-base font-bold text-white mb-4">
            <Heart className="h-5 w-5 text-emca-yellow" />
            Join Our Team
          </div>

          <h1 className="text-5xl md:text-7xl font-pompiere text-white leading-tight font-serif">
            VOLUNTEER WITH <span className="text-emca-lime">EMCA</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto font-serif">
            Be part of a passionate team creating environmental change across Tanzania. Your time, skills, and energy
            can make a real difference.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
              { icon: Users, number: "200+", label: "Active Volunteers" },
              { icon: Leaf, number: "50+", label: "Projects Completed" },
              { icon: Heart, number: "10,000+", label: "Lives Impacted" },
            ].map((stat, index) => (
              <div key={index} className="glass rounded-2xl p-6 text-center">
                <stat.icon className="h-12 w-12 text-emca-yellow mx-auto mb-4" />
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
