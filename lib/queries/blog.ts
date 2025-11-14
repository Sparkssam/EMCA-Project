import { getSupabaseServerClient } from "@/lib/supabase/server"
import type { Database } from "@/lib/supabase/types"

type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"]

export async function getPublishedBlogPosts(limit?: number) {
  const supabase = await getSupabaseServerClient()

  let query = supabase.from("blog_posts").select("*").eq("published", true).order("published_at", { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) {
    console.error("[v0] Error fetching blog posts:", error)
    return []
  }

  return data as BlogPost[]
}

export async function getBlogPostBySlug(slug: string) {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).eq("published", true).single()

  if (error) {
    console.error("[v0] Error fetching blog post:", error)
    return null
  }

  return data as BlogPost
}
