"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowRight, Leaf, Users, Lightbulb } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { AdminSectionButton } from "@/components/admin/admin-section-button"
import { getAllNewsUpdates } from "@/lib/actions/content"
import { getProjects } from "@/lib/actions/projects"

const newsCategories = [
  { id: "all", label: "All Updates", icon: null },
  { id: "Activities", label: "Activities", icon: Users },
  { id: "Eco Tips", label: "Eco Tips", icon: Leaf },
  { id: "Projects", label: "Projects", icon: Lightbulb },
]

type NewsArticle = {
  id: number
  title: string
  content: string
  excerpt: string | null
  image: string | null
  author: string | null
  published_date: string
  category: string | null
  active: boolean
}

export function NewsUpdates({ isAdmin = false }: { isAdmin?: boolean }) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [newsData, projectsData] = await Promise.all([
        getAllNewsUpdates(),
        getProjects()
      ])
      setNewsArticles(newsData)
      setProjects(projectsData)
    } catch (error) {
      console.error("Failed to load data:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredArticles =
    selectedCategory === "all" ? newsArticles : newsArticles.filter((article) => article.category === selectedCategory)
  
  const displayItems = selectedCategory === "Projects" ? projects : filteredArticles

  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-4xl md:text-5xl font-pompiere text-foreground">NEWS & UPDATES</h2>
            <AdminSectionButton section="News" href="/admin/content/news" isAdmin={isAdmin} />
          </div>
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
          {loading ? (
            <div className="col-span-full text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emca-primary mx-auto"></div>
            </div>
          ) : selectedCategory === "Projects" ? (
            projects.length === 0 ? (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No projects found.
              </div>
            ) : (
              projects.map((project) => (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <article className="bg-card border-2 border-border rounded-2xl overflow-hidden hover:border-emca-primary/40 transition-all duration-500 group h-full">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image_url || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-30`} />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 bg-gradient-to-r ${project.color} text-white text-xs font-medium rounded-full`}>
                          {project.impact}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-pompiere text-foreground leading-snug group-hover:text-emca-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-medium">{project.subtitle}</p>
                      <p className="text-muted-foreground leading-relaxed line-clamp-3">{project.description}</p>
                      <div className="inline-flex items-center gap-2 text-emca-primary font-medium hover:gap-3 transition-all">
                        Learn More <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))
            )
          ) : displayItems.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No news articles found. {selectedCategory !== "all" && "Try selecting a different category."}
            </div>
          ) : (
            displayItems.map((article) => (
            <article
              key={article.id}
              className="bg-card border-2 border-border rounded-2xl overflow-hidden hover:border-emca-primary/40 transition-all duration-500 group"
            >
              {article.image && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-emca-primary/90 text-white text-xs font-medium rounded-full capitalize">
                      {article.category}
                    </span>
                  </div>
                </div>
              )}
              {!article.image && (
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-emca-primary/10 to-emca-medium/10 flex items-center justify-center">
                  <Leaf className="h-16 w-16 text-emca-primary/30" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-emca-primary/90 text-white text-xs font-medium rounded-full capitalize">
                      {article.category}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(article.published_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {Math.ceil(article.content.split(' ').length / 200)} min read
                  </span>
                </div>

                <h3 className="text-xl font-pompiere text-foreground leading-snug group-hover:text-emca-primary transition-colors">
                  {article.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed line-clamp-3">{article.excerpt || article.content}</p>

                <Link
                  href={`/stories/${article.id}`}
                  className="inline-flex items-center gap-2 text-emca-primary font-medium hover:gap-3 transition-all"
                >
                  Read More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
            ))
          )}
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
