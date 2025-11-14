"use client"

import { useEffect, useRef, useState } from "react"
import { Leaf, Users, Target, Heart } from "lucide-react"
import Image from "next/image"

const missions = [
  {
    icon: Leaf,
    title: "Environmental Protection",
    description: "Restoring ecosystems, planting trees, and combating climate change through grassroots action.",
    gradient: "from-burgundy-600 to-burgundy-800",
    image: "/tree-planting-in-tanzania--environmental-conservat.jpg",
  },
  {
    icon: Users,
    title: "Community Empowerment",
    description: "Building capacity, creating opportunities, and fostering sustainable livelihoods for all.",
    gradient: "from-mauve-500 to-mauve-700",
    image: "/african-community-gathering--empowerment-workshop.jpg",
  },
  {
    icon: Target,
    title: "Youth Leadership",
    description: "Equipping young changemakers with skills, resources, and platforms to lead transformation.",
    gradient: "from-rouge-600 to-rouge-800",
    image: "/young-african-leaders--youth-empowerment-tanzania.jpg",
  },
  {
    icon: Heart,
    title: "Sustainable Development",
    description: "Implementing solutions that balance ecological health with community prosperity.",
    gradient: "from-burgundy-700 to-burgundy-900",
    image: "/sustainable-farming-tanzania--eco-friendly-develop.jpg",
  },
]

export function MissionSection() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([])
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = cardsRef.current.map((card, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => {
              const newVisible = [...prev]
              newVisible[index] = true
              return newVisible
            })
          }
        },
        { threshold: 0.2 },
      )

      if (card) observer.observe(card)
      return observer
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  return (
    <section className="py-32 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-burgundy-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-mauve-500/8 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-burgundy-500/15 text-burgundy-700 dark:text-mauve-400 rounded-full text-sm font-semibold mb-6">
            Our Mission
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-6 italic">
            Earth, People, <span className="gradient-text italic">Future</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed text-balance">
            We believe in the power of collective action. Through education, innovation, and community engagement, we're
            building a sustainable future where nature and humanity thrive together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {missions.map((mission, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              className={`group p-8 bg-card rounded-3xl border border-border hover:border-primary/50 hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 overflow-hidden ${
                visibleCards[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-6 relative h-48 -mx-8 -mt-8 overflow-hidden">
                <Image
                  src={mission.image || "/placeholder.svg"}
                  alt={mission.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              </div>

              <div className="mb-6 relative">
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${mission.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}
                >
                  <mission.icon className="h-10 w-10 text-white" />
                </div>
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${mission.gradient} blur-2xl rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors font-display italic">
                {mission.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{mission.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
