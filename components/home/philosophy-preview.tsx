"use client"

import { Target, Eye, Compass, Award } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function PhilosophyPreview() {
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

  const philosophyItems = [
    {
      icon: Eye,
      title: "Vision",
      content:
        "A Tanzania where communities thrive in harmony with nature, and every individual is empowered to protect and preserve our environment for future generations.",
      color: "emca-primary",
    },
    {
      icon: Target,
      title: "Mission",
      content:
        "To mobilize and empower youth-led environmental initiatives that promote sustainable practices, community awareness, and lasting ecological impact across Tanzania.",
      color: "emca-medium",
    },
    {
      icon: Compass,
      title: "Objectives",
      content:
        "Restore ecosystems through reforestation • Educate communities on environmental stewardship • Build sustainable partnerships • Empower youth leadership",
      color: "emca-yellow",
    },
    {
      icon: Award,
      title: "Values",
      content:
        "Sustainability • Youth Empowerment • Community Collaboration • Innovation • Accountability • Respect for Nature",
      color: "emca-lime",
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-background to-emca-darkest/5 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 gradient-text">OUR PHILOSOPHY</h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-serif">
              The principles that guide our mission and shape our impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {philosophyItems.map((item, index) => (
              <div
                key={index}
                className={`glass p-8 rounded-2xl card-hover transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`bg-gradient-to-br from-${item.color} to-${item.color}/70 w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0`}
                  >
                    <item.icon className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">{item.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">{item.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-emca-primary text-emca-primary hover:bg-emca-primary hover:text-white text-xl font-bold px-8 h-12 rounded-full transition-all duration-300 hover:scale-105 bg-transparent"
            >
              <Link href="/philosophy">Learn More About Our Philosophy</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
