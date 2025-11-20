"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/african-youth-planting-trees-in-tanzania--lush-gre.jpg"
          alt="EMCA youth volunteers planting trees in Tanzania"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emca-darkest/95 via-emca-dark/90 to-emca-medium/85" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] bg-emca-primary/15 rounded-full blur-3xl animate-fade-in" />
        <div className="absolute bottom-20 right-10 w-72 h-72 md:w-[400px] md:h-[400px] lg:w-[600px] lg:h-[600px] bg-emca-yellow/8 rounded-full blur-3xl animate-fade-in animation-delay-200" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32 relative z-10 font-serif">
        <div className="max-w-7xl mx-auto text-center space-y-6 sm:space-y-8 md:space-y-10 font-serif">
          <div
            className={`inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 glass rounded-full text-sm sm:text-base transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-emca-yellow" />
            <span className="text-white font-semibold tracking-wide">Youth-Led Environmental Change</span>
          </div>

          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-balance block text-white drop-shadow-2xl font-serif">Environmental Management</span>
            <span className="text-balance block text-white drop-shadow-2xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl my-2">
              &
            </span>
            <span className="gradient-text-accent block text-balance drop-shadow-2xl">Community Awareness</span>
          </h1>

          <p
            className={`text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/95 max-w-4xl mx-auto leading-relaxed text-balance transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Empowering Tanzania's youth to protect the environment, build sustainable communities, and create lasting
            change.
          </p>

          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-emca-yellow to-emca-lime hover:from-emca-lime hover:to-emca-yellow text-emca-darkest text-base sm:text-lg lg:text-xl font-bold px-6 sm:px-8 lg:px-10 h-12 sm:h-13 lg:h-14 rounded-full shadow-xl transition-all duration-300 hover:scale-105 group border-0"
            >
              <Link href="/projects">
                Explore Our Projects
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto glass text-white hover:bg-white/20 text-base sm:text-lg lg:text-xl font-bold px-6 sm:px-8 lg:px-10 h-12 sm:h-13 lg:h-14 rounded-full border-2 border-white/50 hover:border-white/70 transition-all duration-300 hover:scale-105 bg-transparent backdrop-blur-xl"
            >
              <Link href="/about">Learn About EMCA</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 animate-fade-in animation-delay-400 z-20">
        <div
          className="w-6 h-10 border-2 border-white/60 rounded-full flex items-start justify-center p-1"
          role="presentation"
          aria-label="Scroll down"
        >
          <div className="w-1.5 h-3 bg-white rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
