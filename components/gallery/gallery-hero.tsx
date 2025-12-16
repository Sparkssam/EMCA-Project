"use client"

import { Camera, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface GalleryHeroProps {
  isAdmin?: boolean
}

export function GalleryHero({ isAdmin = false }: GalleryHeroProps) {
  return (
    <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 bg-gradient-to-b from-emca-darkest to-emca-dark overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/organic-leaf-pattern.jpg')] bg-cover bg-center"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center p-3 bg-emca-yellow/20 rounded-2xl mb-4">
            <Camera className="h-8 w-8 text-emca-yellow" />
          </div>

          <h1 className="font-pompiere text-5xl sm:text-6xl md:text-7xl font-normal text-white leading-tight">
            IMPACT IN <span className="text-emca-yellow">FOCUS</span>
          </h1>

          <p className="text-xl sm:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">
            Every photo tells a story of change, hope, and environmental action across Tanzania
          </p>

          {isAdmin && (
            <div className="pt-4">
              <Link href="/admin/gallery">
                <Button className="bg-emca-yellow hover:bg-emca-yellow/90 text-emca-darkest font-semibold">
                  <Settings className="mr-2 h-4 w-4" />
                  Manage Gallery
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
