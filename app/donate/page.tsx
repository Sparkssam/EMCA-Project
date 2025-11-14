import { DonateHero } from "@/components/donate/donate-hero"
import { ImpactCalculator } from "@/components/donate/impact-calculator"
import { DonationOptions } from "@/components/donate/donation-options"
import { DonationForm } from "@/components/donate/donation-form"
import { TransparencySection } from "@/components/donate/transparency-section"
import { DonorTestimonials } from "@/components/donate/donor-testimonials"

export const metadata = {
  title: "Give Back to Earth - EMCA Donations",
  description:
    "Support environmental action in Tanzania. Every contribution plants trees, empowers communities, and protects our planet.",
}

export default function DonatePage() {
  return (
    <div className="flex flex-col">
      <DonateHero />
      <ImpactCalculator />
      <DonationOptions />
      <DonationForm />
      <TransparencySection />
      <DonorTestimonials />
    </div>
  )
}
