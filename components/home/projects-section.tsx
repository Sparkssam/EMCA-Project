"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sprout, TreePine, Trash2, Leaf, Heart, Users, Globe, Flower } from "lucide-react"
import { Project } from "@/lib/actions/projects"

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

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 md:py-24 bg-emca-darkest/5 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-12 sm:mb-14 md:mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-emca-primary via-emca-medium to-emca-yellow bg-clip-text text-transparent font-serif">
              Our Key Projects
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto px-4 font-serif">
              Three flagship initiatives driving environmental transformation across Tanzania
            </p>
          </div>

          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            {projects.map((project, index) => {
              const IconComponent = iconMap[project.icon as keyof typeof iconMap] || Sprout
              return (
              <div
                key={project.id}
                className={`card-minimal overflow-hidden hover:shadow-2xl hover:border-emca-primary/40 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`grid md:grid-cols-2 gap-0 ${index % 2 === 1 ? "md:grid-flow-dense" : ""}`}>
                  <div
                    className={`relative h-64 sm:h-80 md:h-auto min-h-[320px] ${index % 2 === 1 ? "md:col-start-2" : ""}`}
                  >
                    <Image
                      src={project.image_url || "/placeholder.svg"}
                      alt={`${project.title} - EMCA Tanzania environmental project`}
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-30`} />
                  </div>

                  <div className="p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                    <div
                      className={`inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r ${project.color} rounded-full w-fit mb-4 sm:mb-6`}
                    >
                      <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      <span className="text-white font-semibold text-sm sm:text-base">{project.impact}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">
                      {project.title}
                    </h3>
                    <p className="text-lg sm:text-xl text-emca-primary mb-4 sm:mb-6 font-medium">{project.subtitle}</p>
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 sm:mb-8">
                      {project.description}
                    </p>

                    <Button
                      asChild
                      className="bg-gradient-to-r from-emca-primary to-emca-medium hover:from-emca-medium hover:to-emca-primary text-white rounded-full px-6 sm:px-8 h-11 sm:h-12 text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 w-fit group border-0"
                    >
                      <Link href={`/projects/${project.id}`}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-2 transition-transform duration-300" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
