import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield, Lock, Eye, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: "Privacy Policy - EMCA Tanzania",
  description: "Learn how EMCA Tanzania protects and manages your personal information.",
}

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-emca-darkest via-emca-dark to-emca-primary overflow-hidden">
        <div className="absolute inset-0 bg-[url('/organic-nature-pattern.jpg')] opacity-5" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link href="/">
            <Button variant="ghost" className="mb-8 text-white hover:text-emca-yellow hover:bg-white/10 rounded-full">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </Link>

          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="flex justify-center mb-6">
              <Shield className="h-16 w-16 text-emca-yellow" />
            </div>
            <h1 className="font-poppins text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight">
              Privacy Policy
            </h1>
            <p className="text-lg sm:text-xl text-emca-lime/90 leading-relaxed">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Introduction */}
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                At EMCA Tanzania (Environmental Management and Community Awareness), we are committed to protecting your
                privacy and ensuring the security of your personal information. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you visit our website or interact with our
                services.
              </p>
            </div>

            {/* Section 1 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-emca-primary" />
                <h2 className="font-poppins text-3xl font-semibold text-foreground">
                  1. Information We Collect
                </h2>
              </div>
              <div className="pl-9 space-y-3 text-muted-foreground">
                <p className="leading-relaxed">We may collect the following types of information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Personal identification information (name, email address, phone number)</li>
                  <li>Volunteer and donation information</li>
                  <li>Event registration details</li>
                  <li>Website usage data and analytics</li>
                  <li>Communication preferences</li>
                </ul>
              </div>
            </div>

            {/* Section 2 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Eye className="h-6 w-6 text-emca-primary" />
                <h2 className="font-poppins text-3xl font-semibold text-foreground">
                  2. How We Use Your Information
                </h2>
              </div>
              <div className="pl-9 space-y-3 text-muted-foreground">
                <p className="leading-relaxed">We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Process donations and volunteer applications</li>
                  <li>Send newsletters and program updates</li>
                  <li>Improve our website and services</li>
                  <li>Respond to inquiries and support requests</li>
                  <li>Organize events and campaigns</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </div>

            {/* Section 3 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Lock className="h-6 w-6 text-emca-primary" />
                <h2 className="font-poppins text-3xl font-semibold text-foreground">3. Data Security</h2>
              </div>
              <div className="pl-9 space-y-3 text-muted-foreground">
                <p className="leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal
                  information against unauthorized access, alteration, disclosure, or destruction. However, no method of
                  transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div className="space-y-4">
              <h2 className="font-poppins text-3xl font-semibold text-foreground">4. Information Sharing</h2>
              <div className="space-y-3 text-muted-foreground">
                <p className="leading-relaxed">
                  We do not sell, trade, or rent your personal information to third parties. We may share your
                  information with:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Service providers who assist in our operations</li>
                  <li>Partner organizations for collaborative projects</li>
                  <li>Legal authorities when required by law</li>
                </ul>
              </div>
            </div>

            {/* Section 5 */}
            <div className="space-y-4">
              <h2 className="font-poppins text-3xl font-semibold text-foreground">5. Your Rights</h2>
              <div className="space-y-3 text-muted-foreground">
                <p className="leading-relaxed">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </div>
            </div>

            {/* Section 6 */}
            <div className="space-y-4">
              <h2 className="font-poppins text-3xl font-semibold text-foreground">6. Cookies and Tracking</h2>
              <div className="space-y-3 text-muted-foreground">
                <p className="leading-relaxed">
                  We use cookies and similar tracking technologies to enhance your experience on our website. You can
                  control cookie settings through your browser preferences.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="p-6 bg-emca-primary/5 border-2 border-emca-primary/20 rounded-2xl">
              <h2 className="font-poppins text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p>
                  <strong>Email:</strong> info@emca.or.tz
                </p>
                <p>
                  <strong>Phone:</strong> +255 628 957 390
                </p>
                <p>
                  <strong>Address:</strong> Dar es Salaam, Tanzania
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
