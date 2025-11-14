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

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <AboutSection />
      <PhilosophyPreview />
      <ProjectsSection />
      <ImpactStats />
      <YoutubeStories />
      <ReviewsSection />
      <NewsUpdates />
      <EventsSection />
      <CallToAction />
    </div>
  )
}
