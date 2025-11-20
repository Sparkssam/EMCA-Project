"use client"

import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

const youtubeVideos = [
  {
    id: "1",
    videoId: "dQw4w9WgXcQ",
    title: "EMCA Beach Cleanup 2024",
    description: "Join us as we clean up the beautiful beaches of Dar es Salaam",
    thumbnail: "/beach-cleanup-volunteers-tanzania-coast.jpg",
  },
  {
    id: "2",
    videoId: "dQw4w9WgXcQ",
    title: "Binti Mazingira Impact",
    description: "See how we're empowering young women through environmental action",
    thumbnail: "/african-women-environmental-leaders-tanzania.jpg",
  },
  {
    id: "3",
    videoId: "dQw4w9WgXcQ",
    title: "Tree Planting Campaign",
    description: "Over 5,000 trees planted with local communities",
    thumbnail: "/tree-planting-tanzania-youth-reforestation.jpg",
  },
  {
    id: "4",
    videoId: "dQw4w9WgXcQ",
    title: "Youth Leadership Training",
    description: "Training the next generation of environmental leaders",
    thumbnail: "/young-african-leaders--youth-empowerment-tanzania.jpg",
  },
  {
    id: "5",
    videoId: "dQw4w9WgXcQ",
    title: "Community Workshops",
    description: "Environmental education in local communities",
    thumbnail: "/african-community-gathering--empowerment-workshop.jpg",
  },
]

export function YoutubeStories({ isAdmin = false }: { isAdmin?: boolean }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="py-20 sm:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-pompiere text-foreground font-serif">Our Video Stories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch our journey through impactful environmental projects across Tanzania
          </p>
        </div>

        <div className="relative group">
          {/* Navigation buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity h-12 w-12 border-2 border-border"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity h-12 w-12 border-2 border-border"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Scrollable container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {youtubeVideos.map((video) => (
              <div
                key={video.id}
                className="flex-shrink-0 w-[350px] group/card cursor-pointer"
                onClick={() => setSelectedVideo(video.videoId)}
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-border group-hover/card:border-emca-primary/40 transition-all duration-500">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover/card:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                    <div className="bg-emca-primary rounded-full p-4 group-hover/card:scale-110 transition-transform duration-300">
                      <Play className="h-8 w-8 text-white" fill="white" />
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-xl font-pompiere text-foreground line-clamp-1">{video.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* YouTube modal */}
        {selectedVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fade-in"
            onClick={() => setSelectedVideo(null)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-2xl h-12 w-12"
              onClick={() => setSelectedVideo(null)}
            >
              <ChevronRight className="h-6 w-6 rotate-45" />
            </Button>
            <div className="w-full max-w-5xl aspect-video" onClick={(e) => e.stopPropagation()}>
              <iframe
                className="w-full h-full rounded-2xl"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
