"use client"
import { MapPin, Users, Calendar, TrendingUp, Clock } from "lucide-react"
import Image from "next/image"

interface Project {
  id: number
  title: string
  location: string
  status: "Ongoing" | "Active" | "Monthly" | "Upcoming"
  participants: string
  description: string
  image: string
  category: string
  impact: string
  startDate: string
  endDate?: string
  progress: number
  budget?: string
  timeline: string
  detailedDescription: string
  objectives: string[]
  outcomes: string[]
}

const projects: Project[] = [
  {
    id: 1,
    title: "Binti Mazingira",
    location: "Muheza District, Tanga Region",
    status: "Ongoing",
    participants: "500+ school girls",
    description:
      "6-month project funded by Ireland Embassy for Tanzania promoting environmental sustainability through eco-friendly practices to improve MHH conditions for school girls aged 10-14 years.",
    detailedDescription:
      "Binti Mazingira addresses challenges faced by adolescent girls related to environment and menstruation, including improper disposal, social stigma, limited access to menstrual hygiene products, inadequate facilities, and limited economic opportunities.",
    image: "/african-women-environmental-leaders-tanzania.jpg",
    category: "Women Empowerment",
    impact: "500+ girls reached, 12 female tailors trained",
    startDate: "January 2024",
    endDate: "June 2024",
    progress: 75,
    budget: "Funded by Ireland Embassy",
    timeline: "6 months",
    objectives: [
      "Increase distribution and access of 500 school girls to MHH information, products, and services",
      "Train 12 youth champion female tailors on producing and selling reusable sanitary pads",
      "Establish a small-scale textile industry to produce reusable sanitary pads in Muheza District",
    ],
    outcomes: [
      "12 youth champion female tailors trained and economically improved",
      "Improved girls MHH related school attendance and academic performance",
      "Increased uptake of affordable sanitary pads among adolescent girls",
    ],
  },
  {
    id: 2,
    title: "Tuelimishe Mazingira",
    location: "Mazoezi Mlimani Primary School, Ubungo District, Dar es Salaam",
    status: "Active",
    participants: "200+ youth aged 10-18",
    description:
      "Empowering youth to become climate change advocates through comprehensive training and workshops, with hands-on environmental activities.",
    detailedDescription:
      "This project bridges the gap of knowledge and training among youth about climate change, enabling them to understand and address environmental issues effectively through action-oriented learning.",
    image: "/tree-planting-tanzania-youth-reforestation.jpg",
    category: "Climate Education",
    impact: "200 youth trained, 3+ climate activities completed",
    startDate: "September 2023",
    progress: 85,
    timeline: "Ongoing",
    objectives: [
      "Empower 200 youth to become climate change advocates",
      "Conduct at least three climate-related activities including waste management, tree planting, and cleanup initiatives",
      "Increase environmental awareness and action among young people",
    ],
    outcomes: [
      "20 youth participated in site visit at Wazo Hill Query center",
      "Students learned about restoration, natural trees, and conservation",
      "Demonstrated increased environmental awareness and practical action",
    ],
  },
  {
    id: 3,
    title: "Cleanup Drives",
    location: "Dar es Salaam & Coastal Areas",
    status: "Monthly",
    participants: "Ongoing community engagement",
    description:
      "Regular beach and community cleanup initiatives, removing plastic waste and protecting aquatic ecosystems throughout Tanzania.",
    detailedDescription:
      "EMCA continues cleanup activities by initiating beach and community cleanups or joining other organizations' cleanup activities, making a significant impact on environmental preservation.",
    image: "/beach-cleanup-tanzania-volunteers-coastal-conserva.jpg",
    category: "Waste Management",
    impact: "10,000+ tonnes of plastic waste removed from ecosystems",
    startDate: "January 2023",
    progress: 100,
    timeline: "Monthly recurring",
    objectives: [
      "Remove plastic waste from beaches and communities",
      "Prevent plastic pollution from harming marine ecosystems",
      "Raise awareness about proper waste management",
    ],
    outcomes: [
      "More than 10,000 tonnes of plastic waste removed",
      "Protected marine life and aquatic ecosystems",
      "Increased community awareness about waste management",
    ],
  },
]

const getStatusStyles = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-emca-primary text-white"
    case "Ongoing":
      return "bg-emca-medium text-white"
    case "Monthly":
      return "bg-emca-yellow text-emca-darkest"
    case "Upcoming":
      return "bg-emca-lime text-emca-darkest"
    default:
      return "bg-gray-500 text-white"
  }
}

export function ProjectDetails() {
  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20 space-y-4">
          <h2 className="font-pompiere text-4xl sm:text-5xl md:text-6xl font-normal text-foreground font-serif">
            OUR <span className="text-emca-primary">PROJECTS</span> IN DETAIL
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Comprehensive information about EMCA's flagship environmental initiatives
          </p>
        </div>

        <div className="space-y-16 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-card rounded-3xl overflow-hidden border-2 border-border hover:shadow-2xl hover:border-emca-primary/50 transition-all duration-500"
            >
              {/* Project Header with Image */}
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-80 md:h-full overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emca-darkest/80 via-emca-darkest/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="px-4 py-2 bg-emca-primary text-white text-sm font-semibold rounded-full shadow-lg inline-block mb-3">
                      {project.category}
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-pompiere text-white">{project.title}</h3>
                  </div>
                </div>

                <div className="p-8 sm:p-10 space-y-6">
                  {/* Status & Meta Info */}
                  <div className="flex flex-wrap gap-3">
                    <span
                      className={`px-4 py-2 text-sm font-semibold rounded-2xl flex items-center gap-2 ${getStatusStyles(project.status)}`}
                    >
                      <Clock className="h-4 w-4" />
                      {project.status}
                    </span>
                    <span className="px-4 py-2 bg-muted text-foreground text-sm font-medium rounded-2xl">
                      {project.timeline}
                    </span>
                  </div>

                  {/* Key Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-emca-medium flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">Location</p>
                        <p className="text-sm text-muted-foreground">{project.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-emca-medium flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">Beneficiaries</p>
                        <p className="text-sm text-muted-foreground">{project.participants}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-emca-medium flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">Start Date</p>
                        <p className="text-sm text-muted-foreground">{project.startDate}</p>
                      </div>
                    </div>
                    {project.endDate && (
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-emca-medium flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-foreground">End Date</p>
                          <p className="text-sm text-muted-foreground">{project.endDate}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-emca-medium" />
                        Project Progress
                      </span>
                      <span className="text-sm font-bold text-emca-primary">{project.progress}%</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emca-primary to-emca-medium rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Impact Summary */}
                  <div className="p-4 bg-emca-primary/5 border-2 border-emca-primary/20 rounded-2xl">
                    <p className="text-sm font-semibold text-emca-primary mb-1">Key Impact</p>
                    <p className="text-sm text-foreground">{project.impact}</p>
                  </div>
                </div>
              </div>

              {/* Detailed Content */}
              <div className="p-8 sm:p-10 bg-muted/30 border-t-2 border-border space-y-8">
                {/* Description */}
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-3">About This Project</h4>
                  <p className="text-base text-muted-foreground leading-relaxed">{project.detailedDescription}</p>
                </div>

                {/* Objectives */}
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-4">Project Objectives</h4>
                  <ul className="space-y-3">
                    {project.objectives.map((objective, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-emca-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                          {idx + 1}
                        </span>
                        <p className="text-base text-muted-foreground leading-relaxed">{objective}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Expected Outcomes */}
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-4">Expected Outcomes</h4>
                  <ul className="space-y-3">
                    {project.outcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-2 h-2 bg-emca-yellow rounded-full mt-2" />
                        <p className="text-base text-muted-foreground leading-relaxed">{outcome}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {project.budget && (
                  <div className="p-5 bg-card rounded-2xl border-2 border-border">
                    <p className="text-sm font-semibold text-foreground mb-1">Funding</p>
                    <p className="text-base text-muted-foreground">{project.budget}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
