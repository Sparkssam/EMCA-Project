"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from "lucide-react"

export default function BlogPostPage({ params }: { params: { id: string } }) {
  // In a real app, this would fetch the post data based on the ID
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-muted/30 via-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button asChild variant="ghost" className="mb-8 -ml-4 text-foreground hover:text-forest-600">
              <Link href="/stories">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Stories
              </Link>
            </Button>

            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-forest-600 text-white text-sm font-medium rounded-full">
                  Climate Action
                </span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm font-medium rounded-full">
                  Youth
                </span>
              </div>

              <h1 className="font-pompiere text-4xl md:text-6xl font-bold text-foreground leading-tight">
                How 500 Young Tanzanians Are Rewriting the Climate Narrative
              </h1>

              <div className="flex flex-wrap gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span>Sarah Kimathi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>March 15, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>8 min read</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2 bg-transparent border-border hover:bg-muted"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: "How 500 Young Tanzanians Are Rewriting the Climate Narrative",
                        url: window.location.href,
                      })
                    }
                  }}
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="hover:bg-muted"
                  onClick={() =>
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                      "_blank",
                    )
                  }
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="hover:bg-muted"
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`,
                      "_blank",
                    )
                  }
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="hover:bg-muted"
                  onClick={() =>
                    window.open(
                      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
                      "_blank",
                    )
                  }
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/climate-youth-summit-tanzania.jpg"
                alt="Youth Climate Summit"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <article className="max-w-3xl mx-auto prose prose-lg prose-headings:font-pompiere prose-headings:font-bold prose-headings:text-foreground prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-foreground prose-p:leading-relaxed prose-a:text-forest-600 dark:prose-a:text-forest-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground">
            <p className="lead text-xl text-foreground font-medium">
              At the first-ever Youth Climate Summit in Dar es Salaam, young leaders from across Tanzania gathered to
              share solutions, forge partnerships, and demand action. What emerged was not just hope, but a concrete
              roadmap for change.
            </p>

            <h2>A New Generation Takes the Lead</h2>

            <p>
              The energy in the conference hall was electric. Five hundred young Tanzanians—students, farmers,
              entrepreneurs, activists—had traveled from every corner of the country. They came with stories of climate
              impacts in their communities: droughts destroying crops, floods washing away homes, rising temperatures
              making outdoor work unbearable.
            </p>

            <p>
              But they also came with solutions. And that's what made this summit different from countless climate
              conferences before it.
            </p>

            <h2>From Talk to Action</h2>

            <p>
              "We're tired of being told we're the leaders of tomorrow," said Amina Hassan, a 22-year-old environmental
              science student from Arusha. "We're leading today. And we're not waiting for permission."
            </p>

            <p>
              Amina's sentiment echoed throughout the three-day summit. Workshop after workshop showcased youth-led
              initiatives already making impact: urban farming collectives feeding communities while reducing food
              miles, solar energy cooperatives bringing power to rural villages, waste management startups turning trash
              into treasure.
            </p>

            <h2>The Power of Peer Learning</h2>

            <p>
              What made the summit particularly powerful was its peer-to-peer learning model. Rather than experts
              lecturing from stages, young people shared their experiences, challenges, and solutions with each other.
            </p>

            <p>
              Joseph, a farmer from Morogoro who increased his yields by 60% using sustainable practices, spent hours
              teaching other young farmers his techniques. Grace, who started a recycling business in Mwanza, mentored
              aspiring green entrepreneurs. David, a teacher implementing environmental education in his school, shared
              curriculum resources with educators from across the country.
            </p>

            <h2>A Roadmap for the Future</h2>

            <p>
              By the summit's end, participants had created a comprehensive action plan. It includes commitments to
              plant 100,000 trees in the next year, establish youth climate hubs in 20 regions, and advocate for
              stronger environmental policies at local and national levels.
            </p>

            <p>
              But perhaps most importantly, they built a network. Five hundred young people who now know they're not
              alone in this fight. Five hundred voices that will amplify each other. Five hundred leaders who are
              already changing the narrative.
            </p>

            <h2>What's Next?</h2>

            <p>
              The summit was just the beginning. Regional follow-up meetings are already being planned. Online
              collaboration platforms are being built. Partnerships with organizations like EMCA are being formalized to
              provide ongoing support, resources, and mentorship.
            </p>

            <p>
              "This isn't a moment," Amina said in her closing remarks. "This is a movement. And we're just getting
              started."
            </p>

            <div className="not-prose my-12 p-8 bg-forest-50 dark:bg-forest-900/30 rounded-2xl border-l-4 border-forest-600">
              <p className="text-lg font-medium text-foreground mb-4">Want to join the movement?</p>
              <p className="text-muted-foreground mb-6">
                EMCA is organizing regional youth climate workshops across Tanzania. Learn how you can participate,
                lead, or support these initiatives.
              </p>
              <Button asChild className="bg-forest-600 hover:bg-forest-700 text-white">
                <Link href="/empower">Get Involved</Link>
              </Button>
            </div>
          </article>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-pompiere text-3xl font-bold text-foreground mb-8">Related Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Link
                  key={i}
                  href={`/stories/${i}`}
                  className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all"
                >
                  <div className="relative h-48">
                    <Image
                      src={`/generic-placeholder-graphic.png?height=200&width=400`}
                      alt="Related post"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-card-foreground group-hover:text-forest-600 dark:group-hover:text-forest-400 transition-colors line-clamp-2">
                      Related Story Title {i}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">5 min read</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
