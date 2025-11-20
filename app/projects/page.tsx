import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, MapPin, Users, Target, TrendingUp } from "lucide-react"

export const metadata: Metadata = {
  title: "Our Projects - EMCA Tanzania",
  description:
    "Explore EMCA's flagship environmental projects: Binti Mazingira, Tuelimishe Mazingira, and Cleanup Drives across Tanzania.",
}

export default function ProjectsPage() {
  const projects = [
    {
      id: "binti-mazingira",
      title: "Binti Mazingira",
      subtitle: "Daughters of the Environment",
      status: "Ongoing",
      location: "Muheza District, Tanga",
      duration: "6 months",
      beneficiaries: "500+ school girls, 12 youth tailors",
      fundedBy: "Ireland Embassy for Tanzania in collaboration with Femina Hip under Ujana Salama Project",
      description:
        "Binti Mazingira is promoting environmental sustainability through adopting eco-friendly practices to improve menstrual hygiene management (MHH) conditions for school girls aged 10-14 years in Muheza District in Tanga region, Tanzania. The project addresses a wide range of challenges faced by adolescent girls and women related to environment and menstruation, including improper disposal, social stigma, limited access to menstrual hygiene products, inadequate facilities for managing menstrual hygiene, and limited economic opportunities for girls and women.",
      objectives: [
        "To increase the distribution and access of 500 school girls to MHH information, products, and services",
        "To train 12 youth champion female tailors on producing and selling reusable sanitary pads through the introduction of small-scale business models, basic book and record keeping, and management skills",
        "To establish a small-scale textile industry to produce reusable sanitary pads in Muheza District",
      ],
      outcomes: [
        "12 youth champion female tailors trained on producing and selling reusable sanitary pads through the introduction of small-scale business models, basic book and record keeping, and management skills hence economically improved",
        "Improved girls MHH related school attendance and academic performance in Muheza District",
        "Increased uptake of affordable sanitary pads among adolescent girls",
      ],
      image: "/young-african-leaders--youth-empowerment-tanzania.jpg",
      color: "emca-yellow",
    },
    {
      id: "tuelimishe-mazingira",
      title: "Tuelimishe Mazingira",
      subtitle: "Let's Cultivate the Environment",
      status: "Active",
      location: "Mazoezi Mlimani Primary School, Ubungo District, Dar es Salaam",
      beneficiaries: "200 youth aged 10-18",
      description:
        "The Tuelimishe Mazingira project has empowered 200 youth aged 10-18 at Mazoezi Mlimani Primary School, in Ubungo District, Dar es Salaam, Tanzania, to become climate change advocates through training and workshops. The project aims to empower youth, where at least three climate-related activities of waste management practices, tree planting, and clean-up initiatives will demonstrate increased environmental awareness and action.",
      objectives: [
        "Bridge the gap of knowledge and training among the youth about climate change",
        "Enable young people to clearly identify and understand climate change",
        "Integrate effective learning styles in climate action within the school curriculum",
        "Conduct hands-on environmental activities including waste management, tree planting, and cleanup initiatives",
      ],
      keyActivity:
        "We have managed to take 20 youth with their environmental teacher for a site visit at Wazo Hill Quarry Center where students were able to learn more about restoration, natural trees and how to conserve them.",
      outcomes: [
        "200 youth trained as climate change advocates",
        "Increased environmental awareness and action among participants",
        "Practical experience in waste management, tree planting, and conservation",
      ],
      image: "/tree-planting-tanzania-youth-reforestation.jpg",
      color: "emca-primary",
    },
    {
      id: "cleanup-drives",
      title: "Cleanup Drives",
      subtitle: "Cleaning Our Communities",
      status: "Monthly",
      location: "Multiple locations across Tanzania",
      impact: "10,000+ tonnes of plastic waste removed",
      description:
        "EMCA is continuing with cleanup activities by initiating beach and community cleanups or joining other organizations' cleanup activities. We have engaged in a number of cleanup activities which have led to the removal of more than 10,000 tonnes of plastic wastes from ending up into harming the ecosystem, moreover the life in water.",
      objectives: [
        "Prevent plastic waste from entering marine and terrestrial ecosystems",
        "Raise community awareness about proper waste disposal",
        "Mobilize volunteers for regular environmental action",
        "Create cleaner, healthier communities across Tanzania",
      ],
      outcomes: [
        "Over 10,000 tonnes of plastic waste removed from the environment",
        "Protection of marine life and aquatic ecosystems",
        "Increased community participation in environmental protection",
        "Partnerships with multiple organizations for larger impact",
      ],
      image: "/beach-cleanup-volunteers-tanzania-coast.jpg",
      color: "emca-medium",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-emca-darkest via-emca-dark to-emca-primary overflow-hidden">
        <div className="absolute inset-0 bg-[url('/environmental-impact-patterns.jpg')] opacity-5" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link href="/">
            <Button variant="ghost" className="mb-8 text-white hover:text-emca-yellow hover:bg-white/10 rounded-full">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </Link>

          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="font-pompiere text-5xl sm:text-6xl md:text-7xl font-normal text-white leading-tight">
              Our <span className="text-emca-yellow">Projects</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-emca-lime/90 leading-relaxed">
              Flagship initiatives driving environmental transformation across Tanzania
            </p>
          </div>
        </div>
      </section>

      {/* Projects Details */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24">
            {projects.map((project, index) => (
              <div key={project.id} className="scroll-mt-24" id={project.id}>
                {/* Project Header */}
                <div className="mb-8">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span
                      className={`px-4 py-1.5 bg-${project.color}/20 text-${project.color} border border-${project.color}/30 rounded-full text-sm font-medium`}
                    >
                      {project.status}
                    </span>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <MapPin className="h-4 w-4" />
                      <span>{project.location}</span>
                    </div>
                  </div>

                  <h2 className="font-pompiere text-4xl sm:text-5xl font-normal text-foreground mb-2">
                    {project.title}
                  </h2>
                  <p className="text-xl sm:text-2xl text-emca-primary font-medium">{project.subtitle}</p>
                </div>

                {/* Project Image */}
                <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden mb-8">
                  <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                  <div className={`absolute inset-0 bg-gradient-to-r from-${project.color}/30 to-transparent`} />
                </div>

                {/* Project Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {project.beneficiaries && (
                    <div className="flex items-center gap-3 p-4 bg-card rounded-xl border-2 border-border">
                      <Users className={`h-5 w-5 text-${project.color}`} />
                      <div>
                        <p className="text-xs text-muted-foreground">Beneficiaries</p>
                        <p className="text-sm font-medium text-foreground">{project.beneficiaries}</p>
                      </div>
                    </div>
                  )}
                  {project.duration && (
                    <div className="flex items-center gap-3 p-4 bg-card rounded-xl border-2 border-border">
                      <Calendar className={`h-5 w-5 text-${project.color}`} />
                      <div>
                        <p className="text-xs text-muted-foreground">Duration</p>
                        <p className="text-sm font-medium text-foreground">{project.duration}</p>
                      </div>
                    </div>
                  )}
                  {project.impact && (
                    <div className="flex items-center gap-3 p-4 bg-card rounded-xl border-2 border-border">
                      <TrendingUp className={`h-5 w-5 text-${project.color}`} />
                      <div>
                        <p className="text-xs text-muted-foreground">Impact</p>
                        <p className="text-sm font-medium text-foreground">{project.impact}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Project Description */}
                <div className="prose prose-lg max-w-none mb-8">
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{project.description}</p>
                  {project.fundedBy && (
                    <p className="text-sm text-muted-foreground mt-4">
                      <strong>Funded by:</strong> {project.fundedBy}
                    </p>
                  )}
                </div>

                {/* Objectives */}
                <div className="mb-8">
                  <h3 className="font-pompiere text-2xl sm:text-3xl font-normal text-foreground mb-4 flex items-center gap-2">
                    <Target className={`h-6 w-6 text-${project.color}`} />
                    Project Objectives
                  </h3>
                  <ul className="space-y-3">
                    {project.objectives.map((objective, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className={`mt-1.5 h-2 w-2 rounded-full bg-${project.color} flex-shrink-0`} />
                        <span className="text-base text-muted-foreground leading-relaxed">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Activity */}
                {project.keyActivity && (
                  <div className={`p-6 bg-${project.color}/5 border-2 border-${project.color}/20 rounded-2xl mb-8`}>
                    <h3 className="font-pompiere text-xl sm:text-2xl font-normal text-foreground mb-3">Key Activity</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">{project.keyActivity}</p>
                  </div>
                )}

                {/* Expected Outcomes */}
                <div>
                  <h3 className="font-pompiere text-2xl sm:text-3xl font-normal text-foreground mb-4">
                    Expected Outcomes
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.outcomes.map((outcome, idx) => (
                      <div
                        key={idx}
                        className="p-5 bg-card rounded-xl border-2 border-border hover:border-emca-primary/40 transition-all duration-300"
                      >
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{outcome}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {index < projects.length - 1 && <div className="mt-16 border-t-2 border-border" />}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
