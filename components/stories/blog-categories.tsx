"use client"

import { Button } from "@/components/ui/button"

const categories = [
  { id: "all", label: "All Stories", count: 48 },
  { id: "climate", label: "Climate Action", count: 12 },
  { id: "youth", label: "Youth Leadership", count: 15 },
  { id: "conservation", label: "Conservation", count: 8 },
  { id: "agriculture", label: "Sustainable Agriculture", count: 7 },
  { id: "community", label: "Community Stories", count: 6 },
]

interface BlogCategoriesProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function BlogCategories({ activeCategory, onCategoryChange }: BlogCategoriesProps) {
  return (
    <section className="py-12 bg-muted/30 dark:bg-emca-darkest/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => onCategoryChange(category.id)}
              className={
                activeCategory === category.id
                  ? "bg-emca-primary hover:bg-emca-medium text-white"
                  : "border-2 border-border hover:border-emca-primary hover:bg-emca-primary/5 bg-transparent"
              }
            >
              {category.label}
              <span className="ml-2 text-xs opacity-70">({category.count})</span>
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}
