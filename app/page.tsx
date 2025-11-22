import { HeroSection } from "@/components/home/hero-section"
import { AboutSection } from "@/components/home/about-section"
import { PhilosophyPreview } from "@/components/home/philosophy-preview"
import { ProjectsSection } from "@/components/home/projects-section"
import { ImpactStats } from "@/components/home/impact-stats"
import { YoutubeStories } from "@/components/home/youtube-stories"
import { ReviewsSection } from "@/components/home/reviews-section"
import { NewsUpdates } from "@/components/home/news-updates"
import { EventsSection } from "@/components/home/events-section"
import { CallToAction } from "@/components/home/call-to-action"
import { getProjects } from "@/lib/actions/projects"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export default async function HomePage() {
  const projects = await getProjects()
  
  // Check if user is admin
  const supabase = await getSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  const isAdmin = user?.user_metadata?.role === "admin"
  
  return (
    <div className="flex flex-col">
      <HeroSection />
      <AboutSection />
      <PhilosophyPreview />
      <ProjectsSection projects={projects} />
      <ImpactStats isAdmin={isAdmin} />
      <YoutubeStories />
      <ReviewsSection />
      <NewsUpdates isAdmin={isAdmin} />
      <EventsSection isAdmin={isAdmin} />
      <CallToAction />
    </div>
  )
}
