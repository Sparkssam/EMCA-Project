import { EmpowerHero } from "@/components/empower/empower-hero"
import { GetInvolvedOptions } from "@/components/empower/get-involved-options"
import { VolunteerOpportunities } from "@/components/empower/volunteer-opportunities"
import { ResourcesSection } from "@/components/empower/resources-section"
import { JoinCommunity } from "@/components/empower/join-community"

export const metadata = {
  title: "Be the Force - EMCA Empowerment Hub",
  description: "Join the movement. Volunteer, learn, lead, and create change with EMCA Tanzania.",
}

export default function EmpowerPage() {
  return (
    <div className="flex flex-col">
      <EmpowerHero />
      <GetInvolvedOptions />
      <VolunteerOpportunities />
      <ResourcesSection />
      <JoinCommunity />
    </div>
  )
}
