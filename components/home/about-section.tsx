"use client"

import { Leaf, Users, Heart } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function AboutSection() {
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
    <section ref={sectionRef} className="py-16 sm:py-20 md:py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-emca-medium/5 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-12 sm:mb-14 md:mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 bg-emca-primary/10 rounded-full mb-4 sm:mb-6">
              <Leaf className="h-4 w-4 sm:h-5 sm:w-5 text-emca-primary" />
              <span className="text-emca-primary font-semibold text-base sm:text-lg">About EMCA</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 font-serif">
              WHO WE ARE
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4 font-serif">
              EMCA (Environmental Management and Community Awareness) is a youth-led NGO based in Tanzania, dedicated to
              environmental protection, community empowerment, and sustainable development.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
            {[
              {
                icon: Leaf,
                title: "Environmental Protection",
                description:
                  "Leading reforestation, cleanup drives, and conservation initiatives across Tanzania to restore our natural ecosystems.",
                delay: "100",
              },
              {
                icon: Users,
                title: "Community Empowerment",
                description:
                  "Building capacity through education, training, and mobilizing youth to become environmental champions in their communities.",
                delay: "200",
              },
              {
                icon: Heart,
                title: "Sustainable Development",
                description:
                  "Creating long-term solutions that balance environmental health with community needs and economic growth.",
                delay: "300",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`card-minimal p-6 sm:p-7 md:p-8 card-hover transition-all duration-700 animation-delay-${item.delay} ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <div className="bg-gradient-to-br from-emca-yellow to-emca-lime w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-5 sm:mb-6">
                  <item.icon className="h-7 w-7 sm:h-8 sm:w-8 text-emca-darkest" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">{item.title}</h3>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
