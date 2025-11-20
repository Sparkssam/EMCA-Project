"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

// ============================================
// HERO CONTENT ACTIONS
// ============================================

export interface HeroContent {
  id: number
  page: string
  title: string
  subtitle?: string
  description?: string
  image?: string
  cta_text?: string
  cta_link?: string
  active: boolean
}

export async function getHeroContent(page: string) {
  try {
    const supabase = await getSupabaseServerClient()
    const { data, error } = await supabase
      .from("hero_content")
      .select("*")
      .eq("page", page)
      .eq("active", true)
      .single()

    if (error && error.code !== "PGRST116") throw error
    return { success: true, data }
  } catch (error) {
    console.error("[Content] Error fetching hero content:", error)
    return { success: false, error: "Failed to fetch hero content" }
  }
}

export async function updateHeroContent(id: number, data: Partial<HeroContent>, userEmail: string) {
  try {
    const supabase = await getSupabaseServerClient()
    const { error } = await supabase
      .from("hero_content")
      .update({ ...data, updated_by: userEmail, updated_at: new Date().toISOString() })
      .eq("id", id)

    if (error) throw error

    revalidatePath("/")
    revalidatePath(`/${data.page}`)
    return { success: true }
  } catch (error) {
    console.error("[Content] Error updating hero content:", error)
    return { success: false, error: "Failed to update hero content" }
  }
}

// ============================================
// ABOUT SECTIONS ACTIONS
// ============================================

export interface AboutSection {
  id: number
  title: string
  content: string
  image?: string
  section_order: number
  active: boolean
}

export async function getAllAboutSections() {
  try {
    const supabase = await getSupabaseServerClient()
    const { data, error } = await supabase
      .from("about_sections")
      .select("*")
      .eq("active", true)
      .order("section_order", { ascending: true })

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error("[Content] Error fetching about sections:", error)
    return { success: false, error: "Failed to fetch about sections" }
  }
}

export async function createAboutSection(data: Omit<AboutSection, "id">, userEmail: string) {
  try {
    const supabase = await getSupabaseServerClient()
    const { error } = await supabase.from("about_sections").insert({ ...data, created_by: userEmail })

    if (error) throw error

    revalidatePath("/about")
    return { success: true }
  } catch (error) {
    console.error("[Content] Error creating about section:", error)
    return { success: false, error: "Failed to create about section" }
  }
}

export async function updateAboutSection(id: number, data: Partial<AboutSection>, userEmail: string) {
  try {
    const supabase = await getSupabaseServerClient()
    const { error } = await supabase
      .from("about_sections")
      .update({ ...data, updated_by: userEmail, updated_at: new Date().toISOString() })
      .eq("id", id)

    if (error) throw error

    revalidatePath("/about")
    return { success: true }
  } catch (error) {
    console.error("[Content] Error updating about section:", error)
    return { success: false, error: "Failed to update about section" }
  }
}

export async function deleteAboutSection(id: number) {
  try {
    const supabase = await getSupabaseServerClient()
    const { error } = await supabase.from("about_sections").delete().eq("id", id)

    if (error) throw error

    revalidatePath("/about")
    return { success: true }
  } catch (error) {
    console.error("[Content] Error deleting about section:", error)
    return { success: false, error: "Failed to delete about section" }
  }
}

// ============================================
// PHILOSOPHY ITEMS ACTIONS
// ============================================

export interface PhilosophyItem {
  id: number
  title: string
  description: string
  icon?: string
  color?: string
  item_order: number
  active: boolean
}

export async function getAllPhilosophyItems() {
  try {
    const supabase = await getSupabaseServerClient()
    const { data, error } = await supabase
      .from("philosophy_items")
      .select("*")
      .eq("active", true)
      .order("item_order", { ascending: true })

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error("[Content] Error fetching philosophy items:", error)
    return { success: false, error: "Failed to fetch philosophy items" }
  }
}

export async function createPhilosophyItem(data: Omit<PhilosophyItem, "id">, userEmail: string) {
  try {
    const supabase = await getSupabaseServerClient()
    const { error } = await supabase.from("philosophy_items").insert({ ...data, created_by: userEmail })

    if (error) throw error

    revalidatePath("/philosophy")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("[Content] Error creating philosophy item:", error)
    return { success: false, error: "Failed to create philosophy item" }
  }
}

export async function updatePhilosophyItem(id: number, data: Partial<PhilosophyItem>, userEmail: string) {
  try {
    const supabase = await getSupabaseServerClient()
    const { error } = await supabase
      .from("philosophy_items")
      .update({ ...data, updated_by: userEmail, updated_at: new Date().toISOString() })
      .eq("id", id)

    if (error) throw error

    revalidatePath("/philosophy")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("[Content] Error updating philosophy item:", error)
    return { success: false, error: "Failed to update philosophy item" }
  }
}

export async function deletePhilosophyItem(id: number) {
  try {
    const supabase = await getSupabaseServerClient()
    const { error } = await supabase.from("philosophy_items").delete().eq("id", id)

    if (error) throw error

    revalidatePath("/philosophy")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("[Content] Error deleting philosophy item:", error)
    return { success: false, error: "Failed to delete philosophy item" }
  }
}

// ============================================
// IMPACT STATS ACTIONS
// ============================================

export interface ImpactStat {
  id: number
  label: string
  value: string
  change_text?: string
  icon?: string
  stat_order: number
  active: boolean
}

export async function getAllImpactStats() {
  try {
    const supabase = await getSupabaseServerClient()
    const { data, error } = await supabase
      .from("impact_stats")
      .select("*")
      .eq("active", true)
      .order("stat_order", { ascending: true })

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error("[Content] Error fetching impact stats:", error)
    return { success: false, error: "Failed to fetch impact stats" }
  }
}

export async function createImpactStat(data: Omit<ImpactStat, "id">, userEmail: string) {
  try {
    const supabase = await getSupabaseServerClient()
    const { error } = await supabase.from("impact_stats").insert({ ...data, created_by: userEmail })

    if (error) throw error

    revalidatePath("/projects")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("[Content] Error creating impact stat:", error)
    return { success: false, error: "Failed to create impact stat" }
  }
}

export async function updateImpactStat(id: number, data: Partial<ImpactStat>, userEmail: string) {
  try {
    const supabase = await getSupabaseServerClient()
    const { error } = await supabase
      .from("impact_stats")
      .update({ ...data, updated_by: userEmail, updated_at: new Date().toISOString() })
      .eq("id", id)

    if (error) throw error

    revalidatePath("/projects")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("[Content] Error updating impact stat:", error)
    return { success: false, error: "Failed to update impact stat" }
  }
}

export async function deleteImpactStat(id: number) {
  try {
    const supabase = await getSupabaseServerClient()
    const { error } = await supabase.from("impact_stats").delete().eq("id", id)

    if (error) throw error

    revalidatePath("/projects")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("[Content] Error deleting impact stat:", error)
    return { success: false, error: "Failed to delete impact stat" }
  }
}

// ============================================
// SUCCESS STORIES ACTIONS
// ============================================

export interface SuccessStory {
  id: number
  title: string
  location: string
  story: string
  quote: string
  author: string
  image?: string
  story_order: number
  active: boolean
}

export async function getAllSuccessStories() {
  try {
    const supabase = await getSupabaseServerClient()
    const { data, error } = await supabase
      .from("success_stories")
      .select("*")
      .eq("active", true)
      .order("story_order", { ascending: true })

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error("[Content] Error fetching success stories:", error)
    return { success: false, error: "Failed to fetch success stories" }
  }
}

export async function createSuccessStory(data: Omit<SuccessStory, "id">, userEmail: string) {
  try {
    const supabase = await getSupabaseServerClient()
    const { error } = await supabase.from("success_stories").insert({ ...data, created_by: userEmail })

    if (error) throw error

    revalidatePath("/projects")
    return { success: true }
  } catch (error) {
    console.error("[Content] Error creating success story:", error)
    return { success: false, error: "Failed to create success story" }
  }
}

export async function updateSuccessStory(id: number, data: Partial<SuccessStory>, userEmail: string) {
  try {
    const supabase = await getSupabaseServerClient()
    const { error } = await supabase
      .from("success_stories")
      .update({ ...data, updated_by: userEmail, updated_at: new Date().toISOString() })
      .eq("id", id)

    if (error) throw error

    revalidatePath("/projects")
    return { success: true }
  } catch (error) {
    console.error("[Content] Error updating success story:", error)
    return { success: false, error: "Failed to update success story" }
  }
}

export async function deleteSuccessStory(id: number) {
  try {
    const supabase = await getSupabaseServerClient()
    const { error } = await supabase.from("success_stories").delete().eq("id", id)

    if (error) throw error

    revalidatePath("/projects")
    return { success: true }
  } catch (error) {
    console.error("[Content] Error deleting success story:", error)
    return { success: false, error: "Failed to delete success story" }
  }
}
