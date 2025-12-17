import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, ArrowRight } from "lucide-react"

export function FeaturedPost() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-forest-600 text-white text-sm font-medium rounded-full">
              Featured Story
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-2xl overflow-hidden group">
              <Image
                src="/How 500 Young Tanzanians Are Rewriting the Climate Narrative.jpg"
                alt="Youth Climate Summit"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-forest-100 text-forest-700 text-sm font-medium rounded-full">
                  Climate Action
                </span>
                <span className="px-3 py-1 bg-sky-100 text-sky-700 text-sm font-medium rounded-full">Youth</span>
              </div>

              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight">
                How 500 Young Tanzanians Are Rewriting the Climate Narrative
              </h2>

              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Sarah Kimathi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>March 15, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>8 min read</span>
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                At the first-ever Youth Climate Summit in Dar es Salaam, young leaders from across Tanzania gathered to
                share solutions, forge partnerships, and demand action. What emerged was not just hope, but a concrete
                roadmap for change.
              </p>

              <Button asChild size="lg" className="bg-forest-600 hover:bg-forest-700">
                <Link href="/stories/youth-climate-summit">
                  Read the full story
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
