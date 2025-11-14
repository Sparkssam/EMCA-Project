import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Clock, Users, ArrowRight } from "lucide-react"
import Image from "next/image"

const opportunities = [
  {
    title: "Tree Planting Weekend",
    location: "Kilimanjaro Region",
    date: "April 15-16, 2025",
    duration: "2 days",
    volunteers: "50 needed",
    description: "Join us for a weekend of reforestation. All skill levels welcome. Food and transport provided.",
    image: "/african-students-planting-trees-at-school.jpg",
    type: "Field Work",
  },
  {
    title: "Youth Climate Workshop Facilitator",
    location: "Dar es Salaam",
    date: "Ongoing",
    duration: "4 hours/week",
    volunteers: "5 needed",
    description:
      "Help facilitate environmental education workshops for high school students. Teaching experience preferred.",
    image: "/youth-climate-training-tanzania.jpg",
    type: "Education",
  },
  {
    title: "Beach Cleanup Coordinator",
    location: "Zanzibar",
    date: "Monthly",
    duration: "1 day/month",
    volunteers: "3 needed",
    description: "Lead monthly beach cleanup events. Organize volunteers, manage logistics, and track impact.",
    image: "/beach-cleanup-volunteers-tanzania-coast.jpg",
    type: "Conservation",
  },
]

export function VolunteerOpportunities() {
  return (
    <section id="volunteer" className="py-24 bg-gradient-to-br from-forest-50 via-background to-earth-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Current <span className="text-forest-600">Opportunities</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Find the perfect way to contribute your time and skills to environmental action.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {opportunities.map((opp, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={opp.image || "/placeholder.svg"}
                  alt={opp.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-forest-600 text-white text-sm font-medium rounded-full">
                    {opp.type}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-forest-600 transition-colors">
                  {opp.title}
                </h3>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{opp.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{opp.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{opp.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{opp.volunteers}</span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">{opp.description}</p>

                <Button className="w-full bg-forest-600 hover:bg-forest-700">
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
