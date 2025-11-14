"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowRight, Leaf, Users, Lightbulb } from 'lucide-react'
import { Button } from "@/components/ui/button"

const newsCategories = [
  { id: "all", label: "All Updates", icon: null },
  { id: "activities", label: "Activities", icon: Users },
  { id: "tips", label: "Eco Tips", icon: Leaf },
  { id: "projects", label: "Projects", icon: Lightbulb },
]

const newsArticles = [
  {
    id: 1,
    category: "activities",
    title: "Beach Cleanup Drive Removes 2 Tons of Plastic",
    excerpt:
      "Our latest coastal cleanup in Dar es Salaam brought together 150 volunteers who collected over 2 tons of plastic waste, protecting marine life and restoring beach beauty.",
    image: "/beach-cleanup-volunteers-tanzania-coast.jpg",
    date: "2024-01-15",
    readTime: "3 min read",
  },
  {
    id: 2,
    category: "tips",
    title: "5 Simple Ways to Reduce Plastic Use at Home",
    excerpt:
      "Discover practical tips to minimize plastic consumption in your daily life. From reusable bags to composting, small changes make a big environmental impact.",
    image: "/eco-friendly-home-sustainable-living.jpg",
    date: "2024-01-12",
    readTime: "4 min read",
  },
  {
    id: 3,
    category: "projects",
    title: "Binti Mazingira: Empowering 500 Girls in Muheza",
    excerpt:
      "Our 6-month project funded by Ireland Embassy is transforming menstrual health and environmental sustainability for school girls aged 10-14 in Tanga region.",
    image: "/african-women-environmental-leaders-tanzania.jpg",
    date: "2024-01-10",
    readTime: "5 min read",
  },
  {
    id: 4,
    category: "activities",
    title: "Youth Climate Summit: 200 Young Leaders Trained",
    excerpt:
      "EMCA hosted a transformative climate summit where 200 youth from across Tanzania learned about climate action, sustainable practices, and environmental advocacy.",
    image: "/climate-youth-summit-tanzania.jpg",
    date: "2024-01-08",
    readTime: "4 min read",
  },
  {
    id: 5,
    category: "tips",
    title: "Water Conservation: Smart Strategies for Dry Seasons",
    excerpt:
      "Learn effective water-saving techniques for your home and garden. Rainwater harvesting, drip irrigation, and smart consumption can reduce water use by 40%.",
    image: "/water-tank-rainwater-harvesting-tanzania-village-c.jpg",
    date: "2024-01-05",
    readTime: "3 min read",
  },
  {
    id: 6,
    category: "projects",
    title: "Tree Planting Initiative Reaches 10,000 Trees Milestone",
    excerpt:
      "Celebrating a major achievement! Our Tuelimishe Mazingira project has successfully planted over 10,000 indigenous trees across Dar es Salaam schools and communities.",
    image: "/african-students-planting-trees-at-school.jpg",
    date: "2024-01-03",
    readTime: "5 min read",
  },
]

export function NewsUpdates() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredArticles =
    selectedCategory === "all" ? newsArticles : newsArticles.filter((article) => article.category === selectedCategory)

  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-pompiere text-foreground mb-4">News & Updates</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay informed about our latest activities, environmental tips, and project milestones as we work together for
            a sustainable future.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {newsCategories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-emca-primary text-white shadow-lg scale-105"
                    : "bg-card border-2 border-border text-foreground hover:border-emca-primary/40"
                }`}
              >
                <span className="flex items-center gap-2">
                  {Icon && <Icon className="h-4 w-4" />}
                  {category.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-card border-2 border-border rounded-2xl overflow-hidden hover:border-emca-primary/40 transition-all duration-500 group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-emca-primary/90 text-white text-xs font-medium rounded-full capitalize">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-pompiere text-foreground leading-snug group-hover:text-emca-primary transition-colors">
                  {article.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed line-clamp-3">{article.excerpt}</p>

                <Link
                  href={`/stories/${article.id}`}
                  className="inline-flex items-center gap-2 text-emca-primary font-medium hover:gap-3 transition-all"
                >
                  Read More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/stories">
            <Button size="lg" className="bg-emca-primary hover:bg-emca-secondary text-white">
              View All Stories
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
