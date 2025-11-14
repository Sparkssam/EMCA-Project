import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const posts = [
  {
    id: 1,
    title: "The Forest That Came Back: A Reforestation Success Story",
    excerpt:
      "How a degraded hillside became a thriving ecosystem through community-led reforestation efforts in Kilimanjaro.",
    author: "Emmanuel Mwakasege",
    date: "March 12, 2025",
    readTime: "6 min",
    category: "conservation", // Changed to lowercase to match category id
    image: "/reforestation-success-tanzania.jpg",
    featured: false,
  },
  {
    id: 2,
    title: "From Waste to Wealth: Youth Entrepreneurs Leading the Circular Economy",
    excerpt:
      "Meet the young innovators turning plastic waste into profitable businesses while cleaning up their communities.",
    author: "Grace Mollel",
    date: "March 10, 2025",
    readTime: "5 min",
    category: "youth", // Changed to lowercase
    image: "/youth-recycling-business-tanzania.jpg",
    featured: false,
  },
  {
    id: 3,
    title: "Organic Farming Revolution: How Traditional Knowledge Meets Modern Science",
    excerpt:
      "Farmers in Morogoro are achieving record yields while protecting the environment through sustainable practices.",
    author: "David Mtui",
    date: "March 8, 2025",
    readTime: "7 min",
    category: "agriculture", // Changed to lowercase
    image: "/african-farmers-sustainable-agriculture.jpg",
    featured: false,
  },
  {
    id: 4,
    title: "Coastal Communities Unite to Protect Marine Ecosystems",
    excerpt: "A grassroots movement in Zanzibar is restoring coral reefs and creating sustainable fishing practices.",
    author: "Sarah Kimathi",
    date: "March 5, 2025",
    readTime: "6 min",
    category: "conservation", // Changed to lowercase
    image: "/beach-cleanup-volunteers-tanzania-coast.jpg",
    featured: false,
  },
  {
    id: 5,
    title: "Green Schools: Where Environmental Education Transforms Lives",
    excerpt:
      "Inside the classrooms where students are learning to become environmental stewards and community leaders.",
    author: "Grace Mollel",
    date: "March 3, 2025",
    readTime: "5 min",
    category: "youth", // Changed to lowercase
    image: "/african-students-planting-trees-at-school.jpg",
    featured: false,
  },
  {
    id: 6,
    title: "Water is Life: Clean Water Access Transforms Rural Communities",
    excerpt:
      "How simple water filtration systems are improving health, education, and economic opportunities in Mwanza.",
    author: "Emmanuel Mwakasege",
    date: "March 1, 2025",
    readTime: "6 min",
    category: "community", // Changed to lowercase
    image: "/water-well-tanzania-community.jpg",
    featured: false,
  },
  {
    id: 7,
    title: "Urban Forests: Bringing Nature Back to Tanzania's Cities",
    excerpt:
      "City dwellers are creating green oases that combat pollution, reduce heat, and build community connections.",
    author: "David Mtui",
    date: "February 28, 2025",
    readTime: "5 min",
    category: "climate", // Changed to lowercase
    image: "/urban-garden-tanzania-city.jpg",
    featured: false,
  },
  {
    id: 8,
    title: "The Power of Partnership: How Collaboration Amplifies Impact",
    excerpt:
      "Exploring successful partnerships between NGOs, government, and communities that are driving real change.",
    author: "Sarah Kimathi",
    date: "February 25, 2025",
    readTime: "7 min",
    category: "community", // Changed to lowercase
    image: "/community-partnership-meeting-tanzania.jpg",
    featured: false,
  },
  {
    id: 9,
    title: "Climate Anxiety to Climate Action: Youth Mental Health and Environmentalism",
    excerpt:
      "How young people are channeling eco-anxiety into meaningful action and finding purpose in environmental work.",
    author: "Grace Mollel",
    date: "February 22, 2025",
    readTime: "8 min",
    category: "youth", // Changed to lowercase
    image: "/youth-climate-training-tanzania.jpg",
    featured: false,
  },
]

interface BlogGridProps {
  activeCategory: string
}

export function BlogGrid({ activeCategory }: BlogGridProps) {
  const filteredPosts = activeCategory === "all" ? posts : posts.filter((post) => post.category === activeCategory)

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <p className="text-center text-muted-foreground mb-8">
          Showing {filteredPosts.length} {filteredPosts.length === 1 ? "story" : "stories"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <Link href={`/stories/${post.id}`}>
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-emca-primary text-white text-sm font-medium rounded-full capitalize">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-card-foreground group-hover:text-emca-primary transition-colors leading-tight font-serif">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed line-clamp-3">{post.excerpt}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-4 border-t border-border">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-emca-primary dark:text-emca-lime font-medium group-hover:gap-2 transition-all pt-2">
                    Read more
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No stories found in this category yet.</p>
          </div>
        )}

        <div className="mt-16 text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-forest-600 text-forest-700 dark:text-forest-300 bg-transparent hover:bg-forest-50 dark:hover:bg-forest-900/30"
          >
            Load More Stories
          </Button>
        </div>
      </div>
    </section>
  )
}
