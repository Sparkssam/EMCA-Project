import { ImpactHero } from "@/components/impact/impact-hero"
import { ProjectDetails } from "@/components/impact/project-details"
import { ImpactMetrics } from "@/components/impact/impact-metrics"
import { SuccessStories } from "@/components/impact/success-stories"
import { SDGAlignment } from "@/components/impact/sdg-alignment"
import { MapSection } from "@/components/map-section"

export const metadata = {
  title: "Impact in Motion - EMCA",
  description:
    "Stories of transformation. Explore our projects and the measurable impact we're creating across Tanzania.",
}

export default function ImpactPage() {
  return (
    <div className="flex flex-col">
      <ImpactHero />
      <ImpactMetrics />
      <ProjectDetails />
      <SuccessStories />
      <SDGAlignment />
      <MapSection />
    </div>
  )
}
