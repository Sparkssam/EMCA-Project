import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Calendar, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const projects = [
  {
    title: "Green Schools Initiative",
    location: "Dar es Salaam",
    date: "Ongoing",
    participants: "2,500+ students",
    description:
      "Transforming 50 schools into eco-friendly learning spaces with tree planting, waste management, and environmental education programs.",
    image: "/african-students-planting-trees-at-school.jpg",
    tag: "Education",
  },
  {
    title: "Coastal Cleanup Campaign",
    location: "Zanzibar",
    date: "Monthly",
    participants: "800+ volunteers",
    description:
      "Protecting marine ecosystems through beach cleanups, plastic reduction workshops, and community awareness programs.",
    image: "/beach-cleanup-volunteers-tanzania-coast.jpg",
    tag: "Conservation",
  },
  {
    title: "Sustainable Farming Project",
    location: "Morogoro Region",
    date: "2024-2025",
    participants: "350 farmers",
    description:
      "Empowering rural farmers with organic farming techniques, water conservation, and market access for sustainable livelihoods.",
    image: "/african-farmers-sustainable-agriculture.jpg",
    tag: "Agriculture",
  },
]

export function FeaturedProjects() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="font-pompiere text-4xl md:text-5xl font-normal text-foreground mb-4">
              Projects in <span className="text-emca-primary">Action</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From classrooms to coastlines, our initiatives are creating tangible impact across Tanzania.
            </p>
          </div>
          <Button
            asChild
            className="bg-gradient-to-r from-emca-primary to-emca-medium hover:from-emca-medium hover:to-emca-primary text-white rounded-2xl px-8 h-12 border-0"
          >
            <Link href="/impact">
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl overflow-hidden border-2 border-border hover:border-emca-primary/40 transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1.5 bg-emca-primary text-white text-sm font-medium rounded-2xl">
                    {project.tag}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="font-pompiere text-2xl font-normal text-foreground group-hover:text-emca-primary transition-colors">
                  {project.title}
                </h3>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-emca-primary" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-emca-primary" />
                    <span>{project.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-emca-primary" />
                    <span>{project.participants}</span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">{project.description}</p>

                <Button
                  asChild
                  variant="ghost"
                  className="text-emca-primary hover:text-emca-medium hover:bg-emca-primary/10 p-0 h-auto rounded-2xl"
                >
                  <Link href={`/impact/${index + 1}`}>
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
