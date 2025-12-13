"use client"

import { useEffect, useState } from "react"
import { use } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Leaf } from "lucide-react"
import { getAllNewsUpdates } from "@/lib/actions/content"

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

export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [article, setArticle] = useState<NewsArticle | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadArticle()
  }, [id])

  const loadArticle = async () => {
    try {
      const allNews = await getAllNewsUpdates()
      const currentArticle = allNews.find((news) => news.id === parseInt(id))
      
      if (currentArticle) {
        setArticle(currentArticle)
        // Get 3 related articles (excluding current one)
        const related = allNews
          .filter((news) => news.id !== parseInt(id) && news.category === currentArticle.category)
          .slice(0, 3)
        
        // If not enough from same category, add more from other categories
        if (related.length < 3) {
          const additional = allNews
            .filter((news) => news.id !== parseInt(id) && !related.includes(news))
            .slice(0, 3 - related.length)
          related.push(...additional)
        }
        
        setRelatedArticles(related)
      }
    } catch (error) {
      console.error("Failed to load article:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emca-primary"></div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
        <Button asChild>
          <Link href="/stories">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Stories
          </Link>
        </Button>
      </div>
    )
  }

  const readTime = Math.ceil(article.content.split(' ').length / 200)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-muted/30 via-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button asChild variant="ghost" className="mb-8 -ml-4 text-foreground hover:text-forest-600">
              <Link href="/stories">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Stories
              </Link>
            </Button>

            <div className="space-y-6">
              {article.category && (
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-emca-primary text-white text-sm font-medium rounded-full capitalize">
                    {article.category}
                  </span>
                </div>
              )}

              <h1 className="font-pompiere text-4xl md:text-6xl font-bold text-foreground leading-tight">
                {article.title}
              </h1>

              <div className="flex flex-wrap gap-6 text-muted-foreground">
                {article.author && (
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <span>{article.author}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{new Date(article.published_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{readTime} min read</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2 bg-transparent border-border hover:bg-muted"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: article.title,
                        url: window.location.href,
                      })
                    }
                  }}
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="hover:bg-muted"
                  onClick={() =>
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                      "_blank",
                    )
                  }
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="hover:bg-muted"
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`,
                      "_blank",
                    )
                  }
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="hover:bg-muted"
                  onClick={() =>
                    window.open(
                      `https://www.linkedin.com/sharing/share-offsite/?url=https://www.linkedin.com/company/emca.or.tz/
`,
                      "_blank",
                    )
                  }
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {article.image && (
        <section className="py-8 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <article className="max-w-3xl mx-auto prose prose-lg prose-headings:font-pompiere prose-headings:font-bold prose-headings:text-foreground prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-foreground prose-p:leading-relaxed prose-a:text-emca-primary dark:prose-a:text-emca-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground">
            {article.excerpt && (
              <p className="lead text-xl text-foreground font-medium">
                {article.excerpt}
              </p>
            )}

            <div className="whitespace-pre-wrap">
              {article.content}
            </div>

            <div className="not-prose my-12 p-8 bg-emca-primary/5 rounded-2xl border-l-4 border-emca-primary">
              <p className="text-lg font-medium text-foreground mb-4">Want to get involved?</p>
              <p className="text-muted-foreground mb-6">
                EMCA is organizing environmental initiatives across Tanzania. Learn how you can participate, lead, or support these projects.
              </p>
              <Button asChild className="bg-emca-primary hover:bg-emca-secondary text-white">
                <Link href="/volunteer">Get Involved</Link>
              </Button>
            </div>
          </article>
        </div>
      </section>

      {/* Related Posts */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-pompiere text-3xl font-bold text-foreground mb-8">RELATED STORIES</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    href={`/stories/${related.id}`}
                    className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all"
                  >
                    {related.image ? (
                      <div className="relative h-48">
                        <img
                          src={related.image}
                          alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="relative h-48 bg-gradient-to-br from-emca-primary/10 to-emca-medium/10 flex items-center justify-center">
                        <Leaf className="h-16 w-16 text-emca-primary/30" />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-card-foreground group-hover:text-emca-primary transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2">{Math.ceil(related.content.split(' ').length / 200)} min read</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
