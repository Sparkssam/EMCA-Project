import { PhilosophyHero } from "@/components/philosophy/philosophy-hero"
import { CoreValues } from "@/components/philosophy/core-values"
import { OurApproach } from "@/components/philosophy/our-approach"
import { TheoryOfChange } from "@/components/philosophy/theory-of-change"
import { TeamSection } from "@/components/philosophy/team-section"

export const metadata = {
  title: "Our Philosophy - EMCA",
  description: "The roots that ground us. Discover the values, principles, and approach that guide EMCA's mission.",
}

export default function PhilosophyPage() {
  return (
    <div className="flex flex-col">
      <PhilosophyHero />
      <CoreValues />
      <OurApproach />
      <TheoryOfChange />
      <TeamSection />
    </div>
  )
}
