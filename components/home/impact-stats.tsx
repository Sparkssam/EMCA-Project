"use client"

import { useEffect, useState, useRef } from "react"
import { Sprout, Users, Recycle, TreePine } from "lucide-react"

const stats = [
  {
    icon: TreePine,
    value: 50000,
    suffix: "+",
    label: "Trees Planted",
    description: "Restoring forests across Tanzania",
    color: "text-emca-primary",
    bgColor: "bg-emca-primary/10",
  },
  {
    icon: Users,
    value: 120,
    suffix: "+",
    label: "Communities Reached",
    description: "Empowering local environmental action",
    color: "text-emca-medium",
    bgColor: "bg-emca-medium/10",
  },
  {
    icon: Sprout,
    value: 5000,
    suffix: "+",
    label: "Youth Empowered",
    description: "Training the next generation of leaders",
    color: "text-emca-yellow",
    bgColor: "bg-emca-yellow/10",
  },
  {
    icon: Recycle,
    value: 15,
    suffix: "",
    label: "Active Projects",
    description: "Ongoing environmental initiatives",
    color: "text-emca-lime",
    bgColor: "bg-emca-lime/10",
  },
]

function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, end, duration])

  return (
    <div ref={ref} className="text-4xl sm:text-5xl md:text-6xl font-bold">
      {count.toLocaleString()}
    </div>
  )
}

export function ImpactStats() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-background to-emca-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 font-serif">
            Impact by the <span className="gradient-text">Numbers</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed px-4">
            Every action counts. Here's how our community is making measurable change across Tanzania.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 md:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="relative group p-6 sm:p-7 md:p-8 card-minimal card-hover overflow-hidden">
              <div
                className={`absolute top-0 right-0 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 ${stat.bgColor} rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-300 -translate-y-1/2 translate-x-1/2`}
              />

              <div className="relative z-10">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 ${stat.bgColor} rounded-xl flex items-center justify-center mb-5 sm:mb-6`}
                >
                  <stat.icon className={`h-6 w-6 sm:h-7 sm:w-7 ${stat.color}`} />
                </div>

                <div className={`${stat.color} mb-2`}>
                  <CountUp end={stat.value} />
                  <span className="text-2xl sm:text-3xl font-bold">{stat.suffix}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">{stat.label}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
