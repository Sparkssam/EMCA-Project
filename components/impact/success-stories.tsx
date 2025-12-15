import Image from "next/image"
import { Quote } from "lucide-react"

const stories = [
  {
    title: "From Barren Land to Thriving Forest",
    location: "Kilimanjaro Region",
    story:
      "What was once degraded land is now a 50-hectare community forest. Over 3 years, 500 community members planted 20,000 indigenous trees, creating a watershed that now supplies clean water to 5 villages.",
    image: "/reforestation-success-tanzania.jpg",
    quote: "This forest is our legacy. We're not just planting trees—we're planting hope for our children.",
    author: "John Lyimo, Community Leader",
  },
  {
    title: "Youth-Led Waste Revolution",
    location: "Mwanza City",
    story:
      "A group of 30 young entrepreneurs turned waste into opportunity. They established a recycling cooperative that now processes 5 tons of plastic monthly, creating jobs and cleaning their city.",
    image: "/youth-recycling-business-tanzania.jpg",
    quote:
      "EMCA showed us that environmental problems are economic opportunities. Now we're business owners and changemakers.",
    author: "Fatuma Hassan, Cooperative Founder",
  },
]

export function SuccessStories() {
  return (
    <section className="py-24 bg-gradient-to-br from-forest-50 via-background to-earth-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            STORIES OF <span className="text-forest-600">TRANSFORMATION</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Behind every statistic is a human story. These are the transformations that inspire us to keep going.
          </p>
        </div>

        <div className="space-y-16">
          {stories.map((story, index) => (
            <div
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 items-center`}
            >
              <div className="flex-1 relative h-96 rounded-2xl overflow-hidden">
                <Image src={story.image || "/placeholder.svg"} alt={story.title} fill className="object-cover" />
              </div>

              <div className="flex-1 space-y-6">
                <div>
                  <div className="text-sm font-medium text-forest-600 mb-2">{story.location}</div>
                  <h3 className="text-3xl font-serif font-bold text-foreground mb-4">{story.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">{story.story}</p>
                </div>

                <div className="p-6 bg-card rounded-2xl border border-border">
                  <Quote className="h-8 w-8 text-forest-600 mb-4" />
                  <p className="text-lg font-serif italic text-foreground mb-4">"{story.quote}"</p>
                  <p className="text-sm font-medium text-muted-foreground">— {story.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
