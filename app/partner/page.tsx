import { PartnerHero } from "@/components/partner/partner-hero"
import { PartnershipTypes } from "@/components/partner/partnership-types"
import { CurrentPartners } from "@/components/partner/current-partners"
import { PartnershipBenefits } from "@/components/partner/partnership-benefits"
import { PartnershipForm } from "@/components/partner/partnership-form"
import { ContactSection } from "@/components/partner/contact-section"

export const metadata = {
  title: "Connect & Collaborate - EMCA Partnerships",
  description:
    "Partner with EMCA to amplify environmental impact. Corporate partnerships, NGO collaborations, and institutional support.",
}

export default function PartnerPage() {
  return (
    <div className="flex flex-col">
      <PartnerHero />
      <PartnershipTypes />
      <CurrentPartners />
      <PartnershipBenefits />
      <PartnershipForm />
      <ContactSection />
    </div>
  )
}
