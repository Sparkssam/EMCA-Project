import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, MapPin, Users, Target, TrendingUp, TreePine, Building2, Award, Quote, Mail, Phone, MapPinIcon, Edit } from "lucide-react"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { getProjects } from "@/lib/actions/projects"

export const metadata: Metadata = {
  title: "Our Projects & Impact - EMCA Tanzania",
  description:
    "Explore EMCA's flagship environmental projects and the measurable impact we're creating across Tanzania.",
}

export default async function ProjectsPage() {
  // Check if user is admin
  const supabase = await getSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  const isAdmin = user?.user_metadata?.role === "admin"

  // Get projects from database (same as homepage)
  const dbProjects = await getProjects()

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
              OUR <span className="text-emca-yellow">PROJECTS</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-emca-lime/90 leading-relaxed">
              Flagship initiatives driving environmental transformation across Tanzania
            </p>
          </div>
        </div>
      </section>

      {/* Impact Metrics Section */}
      <section className="py-20 bg-gradient-to-br from-emca-primary/5 via-background to-emca-yellow/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <h2 className="font-pompiere text-4xl md:text-5xl font-normal text-foreground">
                IMPACT IN <span className="text-emca-primary">MOTION</span>
              </h2>
              {isAdmin && (
                <Link href="/admin/content/impact-stats">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Edit className="h-4 w-4" />
                    Manage Impact Stats
                  </Button>
                </Link>
              )}
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From seed to forest, from idea to transformation. Witness the tangible change we're creating together across Tanzania.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="p-6 bg-card rounded-2xl border-2 border-border hover:border-emca-primary/40 transition-all">
              <div className="w-12 h-12 bg-emca-primary/10 rounded-xl flex items-center justify-center mb-4">
                <TreePine className="h-6 w-6 text-emca-primary" />
              </div>
              <div className="text-4xl font-bold font-pompiere text-emca-primary mb-2">52,000+</div>
              <div className="text-lg font-semibold text-foreground mb-1">Trees Planted</div>
              <div className="text-sm text-muted-foreground">+12,000 this year</div>
            </div>

            <div className="p-6 bg-card rounded-2xl border-2 border-border hover:border-emca-primary/40 transition-all">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-4xl font-bold font-pompiere text-blue-600 mb-2">5,200+</div>
              <div className="text-lg font-semibold text-foreground mb-1">Youth Trained</div>
              <div className="text-sm text-muted-foreground">+850 this year</div>
            </div>

            <div className="p-6 bg-card rounded-2xl border-2 border-border hover:border-emca-primary/40 transition-all">
              <div className="w-12 h-12 bg-emca-yellow/20 rounded-xl flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-emca-medium" />
              </div>
              <div className="text-4xl font-bold font-pompiere text-emca-medium mb-2">120+</div>
              <div className="text-lg font-semibold text-foreground mb-1">Communities Served</div>
              <div className="text-sm text-muted-foreground">+25 this year</div>
            </div>

            <div className="p-6 bg-card rounded-2xl border-2 border-border hover:border-emca-primary/40 transition-all">
              <div className="w-12 h-12 bg-emca-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-emca-primary" />
              </div>
              <div className="text-4xl font-bold font-pompiere text-emca-primary mb-2">15</div>
              <div className="text-lg font-semibold text-foreground mb-1">Active Projects</div>
              <div className="text-sm text-muted-foreground">Across 8 regions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Details */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <h2 className="font-pompiere text-4xl md:text-5xl font-normal text-foreground">
                OUR <span className="text-emca-primary">PROJECTS</span>
              </h2>
              {isAdmin && (
                <Link href="/admin/projects">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Edit className="h-4 w-4" />
                    Manage Projects
                  </Button>
                </Link>
              )}
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Flagship initiatives driving environmental transformation across Tanzania
            </p>
          </div>

          {/* Database Projects */}
          {dbProjects.length > 0 && (
            <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24 mb-24">
              <h3 className="font-pompiere text-3xl text-center text-foreground mb-8">
                Current <span className="text-emca-primary">Initiatives</span>
              </h3>
              {dbProjects.map((project, index) => (
                <div key={project.id} className="scroll-mt-24" id={project.id}>
                  {/* Project Header */}
                  <div className="mb-8">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span
                        className={`inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r ${project.color} rounded-full text-sm font-medium text-white`}
                      >
                        {project.status || "Active"}
                      </span>
                      {project.location && (
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                          <MapPin className="h-4 w-4" />
                          <span>{project.location}</span>
                        </div>
                      )}
                    </div>

                    <h2 className="font-pompiere text-4xl sm:text-5xl font-normal text-foreground mb-2">
                      {project.title}
                    </h2>
                    <p className="text-xl sm:text-2xl text-emca-primary font-medium">{project.subtitle}</p>
                  </div>

                  {/* Project Image */}
                  <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden mb-8">
                    <Image 
                      src={project.image_url || "/placeholder.svg"} 
                      alt={project.title} 
                      fill 
                      className="object-cover" 
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-30`} />
                  </div>

                  {/* Project Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {project.beneficiaries && (
                      <div className="flex items-center gap-3 p-4 bg-card rounded-xl border-2 border-border">
                        <Users className="h-5 w-5 text-emca-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">Beneficiaries</p>
                          <p className="text-sm font-medium text-foreground">{project.beneficiaries}</p>
                        </div>
                      </div>
                    )}
                    {project.duration && (
                      <div className="flex items-center gap-3 p-4 bg-card rounded-xl border-2 border-border">
                        <Calendar className="h-5 w-5 text-emca-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">Duration</p>
                          <p className="text-sm font-medium text-foreground">{project.duration}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-3 p-4 bg-card rounded-xl border-2 border-border">
                      <TrendingUp className="h-5 w-5 text-emca-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Impact</p>
                        <p className="text-sm font-medium text-foreground">{project.impact}</p>
                      </div>
                    </div>
                  </div>

                  {/* Project Description */}
                  <div className="prose prose-lg max-w-none mb-8">
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {project.description}
                    </p>
                    {project.funded_by && (
                      <p className="text-sm text-muted-foreground mt-4">
                        <strong>Funded by:</strong> {project.funded_by}
                      </p>
                    )}
                  </div>

                  {/* Objectives */}
                  {project.objectives && project.objectives.length > 0 && (
                    <div className="mb-8">
                      <h3 className="font-pompiere text-2xl sm:text-3xl font-normal text-foreground mb-4 flex items-center gap-2">
                        <Target className="h-6 w-6 text-emca-primary" />
                        Project Objectives
                      </h3>
                      <ul className="space-y-3">
                        {project.objectives.map((objective, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="mt-1.5 h-2 w-2 rounded-full bg-emca-primary flex-shrink-0" />
                            <span className="text-base text-muted-foreground leading-relaxed">{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Key Activity */}
                  {project.key_activity && (
                    <div className={`p-6 bg-emca-primary/5 border-2 border-emca-primary/20 rounded-2xl mb-8`}>
                      <h3 className="font-pompiere text-xl sm:text-2xl font-normal text-foreground mb-3">Key Activity</h3>
                      <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-wrap">{project.key_activity}</p>
                    </div>
                  )}

                  {/* Expected Outcomes */}
                  {project.outcomes && project.outcomes.length > 0 && (
                    <div className="mb-8">
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
                  )}

                  {index < dbProjects.length - 1 && <div className="mt-16 border-t-2 border-border" />}
                </div>
              ))}
            </div>
          )}

          <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24">
            <h3 className="font-pompiere text-3xl text-center text-foreground mb-8">
              Featured <span className="text-emca-primary">Programs</span>
            </h3>
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

      {/* Success Stories Section */}
      <section className="py-24 bg-gradient-to-br from-emca-primary/5 via-background to-emca-lime/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-pompiere text-4xl md:text-5xl font-normal text-foreground mb-6">
              STORIES OF <span className="text-emca-primary">TRANSFORMATION</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Behind every statistic is a human story. These are the transformations that inspire us to keep going.
            </p>
          </div>

          <div className="space-y-16 max-w-6xl mx-auto">
            {/* Story 1 */}
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="flex-1 relative h-96 rounded-2xl overflow-hidden">
                <Image 
                  src="/reforestation-success-tanzania.jpg" 
                  alt="From Barren Land to Thriving Forest" 
                  fill 
                  className="object-cover" 
                />
              </div>

              <div className="flex-1 space-y-6">
                <div>
                  <div className="text-sm font-medium text-emca-primary mb-2">Kilimanjaro Region</div>
                  <h3 className="font-pompiere text-3xl font-normal text-foreground mb-4">
                    From Barren Land to Thriving Forest
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    What was once degraded land is now a 50-hectare community forest. Over 3 years, 500 community members planted 20,000 indigenous trees, creating a watershed that now supplies clean water to 5 villages.
                  </p>
                </div>

                <div className="p-6 bg-card rounded-2xl border-2 border-border">
                  <Quote className="h-8 w-8 text-emca-primary mb-4" />
                  <p className="text-lg font-pompiere italic text-foreground mb-4">
                    "This forest is our legacy. We're not just planting trees—we're planting hope for our children."
                  </p>
                  <p className="text-sm font-medium text-muted-foreground">— John Lyimo, Community Leader</p>
                </div>
              </div>
            </div>

            {/* Story 2 */}
            <div className="flex flex-col lg:flex-row-reverse gap-8 items-center">
              <div className="flex-1 relative h-96 rounded-2xl overflow-hidden">
                <Image 
                  src="/youth-recycling-business-tanzania.jpg" 
                  alt="Youth-Led Waste Revolution" 
                  fill 
                  className="object-cover" 
                />
              </div>

              <div className="flex-1 space-y-6">
                <div>
                  <div className="text-sm font-medium text-emca-primary mb-2">Mwanza City</div>
                  <h3 className="font-pompiere text-3xl font-normal text-foreground mb-4">
                    Youth-Led Waste Revolution
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    A group of 30 young entrepreneurs turned waste into opportunity. They established a recycling cooperative that now processes 5 tons of plastic monthly, creating jobs and cleaning their city.
                  </p>
                </div>

                <div className="p-6 bg-card rounded-2xl border-2 border-border">
                  <Quote className="h-8 w-8 text-emca-primary mb-4" />
                  <p className="text-lg font-pompiere italic text-foreground mb-4">
                    "EMCA showed us that environmental problems are economic opportunities. Now we're business owners and changemakers."
                  </p>
                  <p className="text-sm font-medium text-muted-foreground">— Fatuma Hassan, Cooperative Founder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SDG Alignment Section */}
      <section className="py-24 bg-gradient-to-br from-emca-darkest via-emca-dark to-emca-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emca-yellow rounded-full mb-6">
              <Target className="h-8 w-8 text-emca-darkest" />
            </div>
            <h2 className="font-pompiere text-4xl md:text-5xl font-normal text-white mb-6">
              ALIGNED WITH <span className="text-emca-yellow">UN SDGs</span>
            </h2>
            <p className="text-lg text-emca-lime/90 leading-relaxed">
              Our work directly contributes to the United Nations Sustainable Development Goals, creating global impact through local action.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            <div className="group p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:shadow-xl hover:border-emca-yellow/40 transition-all duration-300 hover:-translate-y-2 text-center">
              <div className="w-16 h-16 bg-emca-yellow text-emca-darkest rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform">
                1
              </div>
              <h3 className="font-semibold text-white mb-2 text-sm">No Poverty</h3>
              <p className="text-xs text-emca-lime/80">Creating sustainable livelihoods</p>
            </div>

            <div className="group p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:shadow-xl hover:border-emca-yellow/40 transition-all duration-300 hover:-translate-y-2 text-center">
              <div className="w-16 h-16 bg-emca-yellow text-emca-darkest rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform">
                2
              </div>
              <h3 className="font-semibold text-white mb-2 text-sm">Zero Hunger</h3>
              <p className="text-xs text-emca-lime/80">Sustainable agriculture training</p>
            </div>

            <div className="group p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:shadow-xl hover:border-emca-yellow/40 transition-all duration-300 hover:-translate-y-2 text-center">
              <div className="w-16 h-16 bg-emca-yellow text-emca-darkest rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform">
                4
              </div>
              <h3 className="font-semibold text-white mb-2 text-sm">Quality Education</h3>
              <p className="text-xs text-emca-lime/80">Environmental education programs</p>
            </div>

            <div className="group p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:shadow-xl hover:border-emca-yellow/40 transition-all duration-300 hover:-translate-y-2 text-center">
              <div className="w-16 h-16 bg-emca-yellow text-emca-darkest rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform">
                6
              </div>
              <h3 className="font-semibold text-white mb-2 text-sm">Clean Water</h3>
              <p className="text-xs text-emca-lime/80">Water access initiatives</p>
            </div>

            <div className="group p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:shadow-xl hover:border-emca-yellow/40 transition-all duration-300 hover:-translate-y-2 text-center">
              <div className="w-16 h-16 bg-emca-yellow text-emca-darkest rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform">
                8
              </div>
              <h3 className="font-semibold text-white mb-2 text-sm">Decent Work</h3>
              <p className="text-xs text-emca-lime/80">Green job creation</p>
            </div>

            <div className="group p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:shadow-xl hover:border-emca-yellow/40 transition-all duration-300 hover:-translate-y-2 text-center">
              <div className="w-16 h-16 bg-emca-yellow text-emca-darkest rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform">
                11
              </div>
              <h3 className="font-semibold text-white mb-2 text-sm">Sustainable Cities</h3>
              <p className="text-xs text-emca-lime/80">Urban greening projects</p>
            </div>

            <div className="group p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:shadow-xl hover:border-emca-yellow/40 transition-all duration-300 hover:-translate-y-2 text-center">
              <div className="w-16 h-16 bg-emca-yellow text-emca-darkest rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform">
                13
              </div>
              <h3 className="font-semibold text-white mb-2 text-sm">Climate Action</h3>
              <p className="text-xs text-emca-lime/80">Carbon reduction programs</p>
            </div>

            <div className="group p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:shadow-xl hover:border-emca-yellow/40 transition-all duration-300 hover:-translate-y-2 text-center">
              <div className="w-16 h-16 bg-emca-yellow text-emca-darkest rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform">
                15
              </div>
              <h3 className="font-semibold text-white mb-2 text-sm">Life on Land</h3>
              <p className="text-xs text-emca-lime/80">Reforestation and conservation</p>
            </div>

            <div className="group p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:shadow-xl hover:border-emca-yellow/40 transition-all duration-300 hover:-translate-y-2 text-center">
              <div className="w-16 h-16 bg-emca-yellow text-emca-darkest rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform">
                17
              </div>
              <h3 className="font-semibold text-white mb-2 text-sm">Partnerships</h3>
              <p className="text-xs text-emca-lime/80">Collaborative impact</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact/Find Us Section */}
      <section className="py-24 bg-gradient-to-br from-emca-darkest via-emca-dark to-emca-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-pompiere text-4xl md:text-5xl font-normal text-white mb-6">FIND US</h2>
            <p className="text-lg text-emca-lime/90 leading-relaxed">
              Visit our office or reach out to collaborate on environmental action
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-8 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
              <div className="w-12 h-12 bg-emca-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPinIcon className="h-6 w-6 text-emca-darkest" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Address</h3>
              <p className="text-emca-lime/80">USA River, Arusha(Head-Quarters),<br>Dr-es-Salaam(Branch) </br>Tanzania</p>
            </div>

            <div className="text-center p-8 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
              <div className="w-12 h-12 bg-emca-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-emca-darkest" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
              <a href="mailto:emca.organization@gmail.com" className="text-emca-lime/80 hover:text-emca-yellow transition-colors text-sm break-all">
                emca.organization@gmail.com
              </a>
            </div>

            <div className="text-center p-8 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
              <div className="w-12 h-12 bg-emca-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-emca-darkest" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Phone</h3>
              <div className="text-emca-lime/80 space-y-1">
                <p>+255 628 957 390</p>
                <p>+255 692 880 644</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <a 
              href="https://maps.google.com/?q=USA+River+Arusha+Tanzania" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button className="bg-emca-yellow hover:bg-emca-lime text-emca-darkest font-semibold">
                Get Directions
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
