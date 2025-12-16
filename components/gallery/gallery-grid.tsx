"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GalleryItem } from "@/lib/actions/gallery"

// Fallback items for when database is empty or unavailable
const fallbackItems = [
  {
    id: "1",
    type: "image",
    src: "/african-students-planting-trees-at-school.jpg",
    category: "Education",
    title: "Youth Tree Planting",
    description: "Students participating in our Green Schools Initiative",
    size: "large" as const,
  },
  {
    id: "2",
    type: "image",
    src: "/beach-cleanup-volunteers-tanzania-coast.jpg",
    category: "Cleanup",
    title: "Beach Cleanup Drive",
    description: "Monthly beach cleanup drive in Dar es Salaam",
    size: "normal" as const,
  },
  {
    id: "3",
    type: "image",
    src: "/african-farmers-sustainable-agriculture.jpg",
    category: "Agriculture",
    title: "Sustainable Farming",
    description: "Training communities in eco-friendly farming practices",
    size: "tall" as const,
  },
  {
    id: "4",
    type: "image",
    src: "/african-women-environmental-leaders-tanzania.jpg",
    category: "Women Empowerment",
    title: "Binti Mazingira Workshop",
    description: "Young women leading environmental change",
    size: "normal" as const,
  },
  {
    id: "5",
    type: "image",
    src: "/tree-planting-tanzania-youth-reforestation.jpg",
    category: "Reforestation",
    title: "Tuelimishe Mazingira",
    description: "Large-scale tree planting campaign",
    size: "normal" as const,
  },
  {
    id: "6",
    type: "image",
    src: "/african-youth-planting-trees-in-tanzania--lush-gre.jpg",
    category: "Community",
    title: "Community Action Day",
    description: "Local communities restoring green spaces",
    size: "wide" as const,
  },
  {
    id: "7",
    type: "image",
    src: "/tree-planting-in-tanzania--environmental-conservat.jpg",
    category: "Conservation",
    title: "Forest Restoration",
    description: "Restoring degraded forest areas",
    size: "normal" as const,
  },
  {
    id: "8",
    type: "image",
    src: "/african-community-gathering--empowerment-workshop.jpg",
    category: "Workshops",
    title: "Empowerment Workshop",
    description: "Community environmental education sessions",
    size: "normal" as const,
  },
  {
    id: "9",
    type: "image",
    src: "/young-african-leaders--youth-empowerment-tanzania.jpg",
    category: "Education",
    title: "Youth Leadership Summit",
    description: "Empowering the next generation of environmental leaders",
    size: "normal" as const,
  },
  {
    id: "10",
    type: "image",
    src: "/sustainable-farming-tanzania--eco-friendly-develop.jpg",
    category: "Agriculture",
    title: "Organic Farming Initiative",
    description: "Teaching sustainable agricultural practices to local farmers",
    size: "large" as const,
  },
  {
    id: "11",
    type: "image",
    src: "/eco-tourism-tanzania-wildlife-guides-nature.jpg",
    category: "Conservation",
    title: "Eco-Tourism Training",
    description: "Building sustainable livelihoods through conservation",
    size: "normal" as const,
  },
  {
    id: "12",
    type: "image",
    src: "/urban-garden-tanzania-rooftop-farming-vegetables-c.jpg",
    category: "Community",
    title: "Urban Gardens Project",
    description: "Creating green spaces in urban communities",
    size: "tall" as const,
  },
]

interface GalleryGridProps {
  items?: GalleryItem[]
  categories?: string[]
}

export function GalleryGrid({ items, categories: propCategories }: GalleryGridProps) {
  // Use database items if provided, otherwise use fallback
  const galleryItems = items && items.length > 0 
    ? items.map(item => ({
        id: item.id,
        type: "image" as const,
        src: item.image_url,
        category: item.category,
        title: item.title,
        description: item.description || "",
        size: item.size,
      }))
    : fallbackItems

  // Generate categories from items
  const allCategories = propCategories && propCategories.length > 0
    ? ["All", ...propCategories]
    : ["All", ...Array.from(new Set(galleryItems.map(item => item.category))).sort()]

  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedItem, setSelectedItem] = useState<(typeof galleryItems)[0] | null>(null)

  const filteredItems =
    selectedCategory === "All" 
      ? galleryItems 
      : galleryItems.filter((item) => item.category === selectedCategory)

  const getGridClass = (size: string) => {
    switch (size) {
      case "large":
        return "col-span-1 md:col-span-2 row-span-1"
      case "tall":
        return "col-span-1 row-span-1 md:row-span-2"
      case "wide":
        return "col-span-1 md:col-span-2 row-span-1"
      default:
        return "col-span-1 row-span-1"
    }
  }

  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-emca-primary text-white"
                  : "bg-card text-muted-foreground hover:bg-muted border-2 border-border"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] gap-4">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={`${getGridClass(item.size)} group relative rounded-2xl overflow-hidden cursor-pointer border-2 border-border hover:border-emca-primary/40 transition-all duration-500`}
              onClick={() => setSelectedItem(item)}
              style={{
                animation: `fade-in 0.5s ease-out ${index * 0.05}s both`,
              }}
            >
              <Image
                src={item.src || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-emca-darkest/90 via-emca-darkest/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                  <span className="inline-block px-3 py-1 bg-emca-yellow text-emca-darkest text-xs font-medium rounded-2xl">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-pompiere text-white">{item.title}</h3>
                  <p className="text-sm text-white/80 line-clamp-2">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox modal */}
        {selectedItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fade-in"
            onClick={() => setSelectedItem(null)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-2xl h-12 w-12"
              onClick={() => setSelectedItem(null)}
            >
              <X className="h-6 w-6" />
            </Button>
            <div className="max-w-5xl w-full space-y-4" onClick={(e) => e.stopPropagation()}>
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden">
                <Image
                  src={selectedItem.src || "/placeholder.svg"}
                  alt={selectedItem.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="bg-card rounded-2xl p-6 space-y-2 border-2 border-border">
                <span className="inline-block px-3 py-1 bg-emca-primary text-white text-sm font-medium rounded-2xl">
                  {selectedItem.category}
                </span>
                <h3 className="text-2xl font-pompiere text-foreground">{selectedItem.title}</h3>
                <p className="text-base text-muted-foreground">{selectedItem.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
