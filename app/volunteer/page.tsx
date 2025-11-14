import { Suspense } from "react"
import { VolunteerHero } from "@/components/volunteer/volunteer-hero"
import { VolunteerForm } from "@/components/volunteer/volunteer-form"
import { VolunteerBenefits } from "@/components/volunteer/volunteer-benefits"
import { VolunteerTestimonials } from "@/components/volunteer/volunteer-testimonials"

export const metadata = {
  title: "Volunteer with EMCA - Join Our Team",
  description: "Become a volunteer with EMCA and make a real impact in environmental conservation across Tanzania.",
}

export default function VolunteerPage() {
  return (
    <div className="flex flex-col">
      <VolunteerHero />
      <VolunteerBenefits />
      <Suspense fallback={<div className="py-20 text-center">Loading form...</div>}>
        <VolunteerForm />
      </Suspense>
      <VolunteerTestimonials />
    </div>
  )
}
