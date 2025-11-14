import { Sprout } from "lucide-react"

export function PhilosophyHero() {
  return (
    <section className="relative pt-32 pb-24 bg-gradient-to-br from-emca-darkest via-emca-dark to-emca-primary overflow-hidden">
      <div className="absolute inset-0 bg-[url('/organic-nature-pattern.jpg')] opacity-5" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-emca-yellow/20 rounded-full mb-4 sm:mb-6 backdrop-blur-sm">
            <Sprout className="h-8 w-8 sm:h-10 sm:w-10 text-emca-yellow" />
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight font-serif">
            The Roots That <span className="text-emca-lime">Ground Us</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto font-serif">
            Our philosophy is rooted in the belief that environmental sustainability and human prosperity are
            inseparable. We grow together, or not at all.
          </p>
        </div>
      </div>
    </section>
  )
}
