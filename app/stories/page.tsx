"use client"

import { BlogHero } from "@/components/stories/blog-hero"
import { FeaturedPost } from "@/components/stories/featured-post"
import { BlogGrid } from "@/components/stories/blog-grid"
import { BlogCategories } from "@/components/stories/blog-categories"
import { NewsletterSignup } from "@/components/stories/newsletter-signup"
import { useState } from "react"

export default function StoriesPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  return (
    <div className="flex flex-col">
      <BlogHero />
      <FeaturedPost />
      <BlogCategories activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      <BlogGrid activeCategory={activeCategory} />
      <NewsletterSignup />
    </div>
  )
}
