import { Zap } from "lucide-react"

export function EmpowerHero() {
  return (
    <section className="relative pt-32 pb-24 bg-gradient-to-br from-sky-50 via-background to-forest-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-forest-200/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-sky-100 rounded-full mb-6">
            <Zap className="h-10 w-10 text-sky-600 fill-sky-600" />
          </div>

          <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground leading-tight">
            Be the <span className="text-sky-600">Force</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Your skills, passion, and time can create lasting change. Join thousands of changemakers building a
            sustainable future for Tanzania and beyond.
          </p>
        </div>
      </div>
    </section>
  )
}
