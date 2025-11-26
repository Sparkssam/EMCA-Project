import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, MapPin, Users, Target, TrendingUp, Sprout, TreePine, Trash2, Leaf, Heart, Globe, Flower } from "lucide-react"
import { getProjectById } from "@/lib/actions/projects"

// Icon mapping
const iconMap = {
  Sprout,
  TreePine,
  Trash2,
  Leaf,
  Heart,
  Users,
  Globe,
  Flower,
}

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const project = await getProjectById(id)
  
  if (!project) {
    return {
      title: "Project Not Found - EMCA Tanzania",
    }
  }

  return {
    title: `${project.title} - EMCA Tanzania`,
    description: project.description,
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params
  const project = await getProjectById(id)

  if (!project) {
    notFound()
  }

  const IconComponent = iconMap[project.icon as keyof typeof iconMap] || Sprout

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
            <div
              className={`inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r ${project.color} rounded-full mb-4`}
            >
              <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              <span className="text-white font-semibold text-base sm:text-lg">{project.impact}</span>
            </div>
            
            <h1 className="font-pompiere text-5xl sm:text-6xl md:text-7xl font-normal text-white leading-tight">
              {project.title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-emca-yellow/90 leading-relaxed font-medium">
              {project.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Project Image */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="relative h-96 sm:h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={project.image_url || "/placeholder.svg"}
                alt={`${project.title} - EMCA Tanzania environmental project`}
                fill
                className="object-cover"
                priority
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-20`} />
            </div>
          </div>
        </div>
      </section>

      {/* Project Description */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="font-pompiere text-3xl sm:text-4xl font-normal text-foreground mb-6">
                About This <span className="text-emca-primary">Project</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-gradient-to-br from-emca-primary/5 via-background to-emca-yellow/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className={`p-8 sm:p-12 bg-gradient-to-br ${project.color} rounded-3xl text-white shadow-2xl`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h2 className="font-pompiere text-3xl sm:text-4xl font-normal">Project Impact</h2>
              </div>
              <p className="text-lg sm:text-xl leading-relaxed opacity-95">
                {project.impact}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-emca-darkest via-emca-dark to-emca-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="font-pompiere text-4xl md:text-5xl font-normal text-white">
              Join Us in Making a <span className="text-emca-yellow">Difference</span>
            </h2>
            <p className="text-lg text-emca-lime/90 leading-relaxed">
              Your support helps us expand projects like {project.title} and create lasting environmental impact across Tanzania.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/donate">
                <Button 
                  size="lg" 
                  className="bg-emca-yellow hover:bg-emca-lime text-emca-darkest font-semibold rounded-full px-8 w-full sm:w-auto"
                >
                  Support This Project
                </Button>
              </Link>
              <Link href="/volunteer">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-emca-darkest rounded-full px-8 w-full sm:w-auto"
                >
                  Volunteer With Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* More Projects */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-pompiere text-3xl sm:text-4xl font-normal text-foreground mb-6">
              Explore More <span className="text-emca-primary">Projects</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Discover other initiatives driving environmental transformation across Tanzania
            </p>
            <Link href="/#projects">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-emca-primary to-emca-medium hover:from-emca-medium hover:to-emca-primary text-white rounded-full px-8"
              >
                View All Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
