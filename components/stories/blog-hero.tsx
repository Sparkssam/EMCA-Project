import { BookOpen } from "lucide-react"

export function BlogHero() {
  return (
    <section className="relative pt-32 pb-24 bg-gradient-to-br from-muted/30 via-background to-muted/20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-96 h-96 bg-forest-200/20 dark:bg-forest-800/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-forest-300/20 dark:bg-forest-700/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-forest-100 dark:bg-forest-900/50 rounded-full mb-6">
            <BookOpen className="h-10 w-10 text-forest-600 dark:text-forest-400" />
          </div>

          <h1 className="font-pompiere text-5xl md:text-7xl font-bold text-foreground leading-tight font-serif">
            Voices of <span className="text-forest-600 dark:text-forest-400">Change</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-serif">
            Stories, insights, and perspectives from the frontlines of environmental action. Real voices, real impact,
            real change.
          </p>
        </div>
      </div>
    </section>
  )
}
