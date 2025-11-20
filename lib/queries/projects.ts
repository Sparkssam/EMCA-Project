import { getSupabaseServerClient } from "@/lib/supabase/server"
import type { Database } from "@/lib/supabase/types"

type Project = Database["public"]["Tables"]["projects"]["Row"]

export async function getProjects(status?: string) {
  const supabase = await getSupabaseServerClient()

  let query = supabase.from("projects").select("*").order("created_at", { ascending: false })

  if (status) {
    query = query.eq("status", status)
  }

  const { data, error } = await query

  if (error) {
    console.error("[v0] Error fetching projects:", error)
    return []
  }

  return data as Project[]
}

export async function getProjectBySlug(slug: string) {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase.from("projects").select("*").eq("slug", slug).single()

  if (error) {
    console.error("[v0] Error fetching project:", error)
    return null
  }

  return data as Project
}
