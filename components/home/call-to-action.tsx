"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, HandHeart, Users, Sparkles } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const actions = [
  {
    icon: Heart,
    title: "Donate",
    description: "Support our mission with a contribution that helps restore our environment",
    href: "/donate",
    gradient: "from-emca-yellow to-emca-lime",
  },
  {
    icon: Users,
    title: "Volunteer",
    description: "Join our team and make a direct impact in your community",
    href: "/empower",
    gradient: "from-emca-primary to-emca-medium",
  },
  {
    icon: HandHeart,
    title: "Partner",
    description: "Collaborate with us to amplify environmental action across Tanzania",
    href: "/partner",
    gradient: "from-emca-medium to-emca-darkest",
  },
]

export function CallToAction() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-32 bg-gradient-to-br from-emca-darkest via-emca-dark to-emca-darkest relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emca-primary/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-emca-yellow/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emca-lime/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2 glass rounded-full text-base font-bold text-white mb-6">
            <Sparkles className="h-5 w-5 text-emca-yellow" />
            Take Action Today
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Ready to Make a <span className="text-emca-lime">Difference?</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed text-balance font-serif">
            Every action, no matter how small, contributes to a sustainable future. Choose how you want to be part of
            the movement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {actions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative p-10 glass rounded-3xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${action.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}
                >
                  <action.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 group-hover:scale-105 transition-transform duration-300">
                  {action.title}
                </h3>
                <p className="text-white/90 text-lg leading-relaxed mb-6">{action.description}</p>
                <div className="flex items-center text-white font-bold group-hover:gap-3 transition-all">
                  Get started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>

              {hoveredIndex === index && (
                <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} blur-2xl opacity-50 -z-10`} />
              )}
            </Link>
          ))}
        </div>

        <div className="text-center">
          <p className="text-white/90 mb-6 text-lg font-bold">Or stay connected with our latest updates</p>
          <Button
            asChild
            size="lg"
            className="glass text-white hover:bg-white/20 text-lg px-8 h-14 rounded-full border-2 border-white/30 hover:border-white/50 transition-all hover:scale-105 bg-transparent"
          >
            <Link href="/stories">
              Read Our Stories
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
