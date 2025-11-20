"use client"

import { useEffect, useRef, useState } from "react"
import { Leaf, Target, Lightbulb } from "lucide-react"

const narratives = [
  {
    icon: Leaf,
    title: "Who We Are",
    subtitle: "A Youth-Led Revolution",
    description:
      "EMCA is more than an organization—we're a movement of passionate young Tanzanians committed to environmental justice. Founded by youth, powered by communities, and driven by hope for a sustainable future.",
    stats: "Founded in 2020 • 500+ Active Members • 10 Regions",
    gradient: "from-forest-600 to-forest-800",
  },
  {
    icon: Target,
    title: "What We Do",
    subtitle: "Action on Every Front",
    description:
      "From planting forests to empowering girls with eco-friendly solutions, from cleaning coastlines to training climate ambassadors—we tackle environmental challenges with innovative, community-centered approaches.",
    stats: "15+ Active Programs • 120+ Communities • 50K+ Trees Planted",
    gradient: "from-sky-600 to-sky-800",
  },
  {
    icon: Lightbulb,
    title: "Why It Matters",
    subtitle: "The Future Depends on Now",
    description:
      "Climate change isn't coming—it's here. But so is our generation's power to respond. Every tree planted, every community empowered, every voice raised creates ripples of transformation that will echo for generations.",
    stats: "1.2K Tons CO₂ Offset • 5K+ Youth Trained • Infinite Impact",
    gradient: "from-earth-600 to-earth-800",
  },
]

export function ScrollNarrative() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)))
      const newIndex = Math.min(Math.floor(scrollProgress * narratives.length), narratives.length - 1)

      setActiveIndex(newIndex)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-[300vh] bg-background">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {narratives.map((narrative, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${
              activeIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${narrative.gradient} opacity-5`} />

            {/* Animated background shapes */}
            <div className="absolute inset-0 overflow-hidden">
              <div
                className={`absolute top-20 left-10 w-96 h-96 bg-gradient-to-br ${narrative.gradient} rounded-full blur-3xl opacity-20 animate-float-slow`}
              />
              <div
                className={`absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br ${narrative.gradient} rounded-full blur-3xl opacity-15 animate-float-slow`}
                style={{ animationDelay: "1s" }}
              />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
              <div className="max-w-4xl text-center space-y-8">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl mb-6">
                  <narrative.icon className="h-12 w-12 text-primary" />
                </div>

                <div className="space-y-4">
                  <div className="text-sm font-semibold text-primary uppercase tracking-wider">
                    {narrative.subtitle}
                  </div>
                  <h2 className="font-serif text-5xl md:text-7xl font-bold text-foreground">{narrative.title}</h2>
                </div>

                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto text-balance">
                  {narrative.description}
                </p>

                <div className="pt-8">
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-muted/50 backdrop-blur-sm rounded-full text-sm font-medium text-muted-foreground">
                    {narrative.stats}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Progress indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {narratives.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-500 ${
                activeIndex === index ? "w-12 bg-primary" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
