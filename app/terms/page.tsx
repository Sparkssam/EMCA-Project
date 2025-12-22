import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, Scale, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: "Terms of Service - EMCA Tanzania",
  description: "Terms and conditions for using EMCA Tanzania's website and services.",
}

export default function TermsPage() {
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
              <Scale className="h-16 w-16 text-emca-yellow" />
            </div>
            <h1 className="font-poppins text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight">
              Terms of Service
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
                Welcome to EMCA Tanzania. By accessing or using our website and services, you agree to be bound by these
                Terms of Service. Please read them carefully before using our platform.
              </p>
            </div>

            {/* Section 1 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-emca-primary" />
                <h2 className="font-poppins text-3xl font-semibold text-foreground">1. Acceptance of Terms</h2>
              </div>
              <div className="pl-9 space-y-3 text-muted-foreground">
                <p className="leading-relaxed">
                  By accessing and using EMCA Tanzania's website, you accept and agree to be bound by these Terms of
                  Service and our Privacy Policy. If you do not agree with any part of these terms, you may not access
                  our services.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="space-y-4">
              <h2 className="font-poppins text-3xl font-semibold text-foreground">2. Use of Services</h2>
              <div className="space-y-3 text-muted-foreground">
                <p className="leading-relaxed">You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use our services in any way that violates any applicable law or regulation</li>
                  <li>Transmit any harmful or malicious code</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with or disrupt the integrity or performance of our services</li>
                  <li>Collect or harvest any information from our services without permission</li>
                </ul>
              </div>
            </div>

            {/* Section 3 */}
            <div className="space-y-4">
              <h2 className="font-poppins text-3xl font-semibold text-foreground">3. Donations and Payments</h2>
              <div className="space-y-3 text-muted-foreground">
                <p className="leading-relaxed">
                  All donations made through our website are voluntary and non-refundable unless otherwise stated. We
                  reserve the right to refuse or cancel any donation at our discretion. Donation receipts will be
                  provided for tax purposes where applicable.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div className="space-y-4">
              <h2 className="font-poppins text-3xl font-semibold text-foreground">
                4. Volunteer and Event Registration
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p className="leading-relaxed">
                  When registering as a volunteer or for events, you agree to provide accurate and complete information.
                  EMCA Tanzania reserves the right to accept or decline volunteer applications and event registrations
                  based on our organizational needs and policies.
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div className="space-y-4">
              <h2 className="font-poppins text-3xl font-semibold text-foreground">5. Intellectual Property</h2>
              <div className="space-y-3 text-muted-foreground">
                <p className="leading-relaxed">
                  All content on this website, including text, graphics, logos, images, and software, is the property of
                  EMCA Tanzania or its content suppliers and is protected by international copyright laws. You may not
                  reproduce, distribute, or create derivative works without our express written permission.
                </p>
              </div>
            </div>

            {/* Section 6 */}
            <div className="space-y-4">
              <h2 className="font-poppins text-3xl font-semibold text-foreground">6. User-Generated Content</h2>
              <div className="space-y-3 text-muted-foreground">
                <p className="leading-relaxed">
                  By submitting reviews, comments, or other content to our website, you grant EMCA Tanzania a
                  non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and display such content for
                  promotional and operational purposes.
                </p>
              </div>
            </div>

            {/* Section 7 */}
            <div className="space-y-4">
              <h2 className="font-poppins text-3xl font-semibold text-foreground">7. Disclaimer of Warranties</h2>
              <div className="space-y-3 text-muted-foreground">
                <p className="leading-relaxed">
                  Our services are provided "as is" without warranties of any kind, either express or implied. We do not
                  guarantee that our services will be uninterrupted, secure, or error-free.
                </p>
              </div>
            </div>

            {/* Section 8 */}
            <div className="space-y-4">
              <h2 className="font-poppins text-3xl font-semibold text-foreground">8. Limitation of Liability</h2>
              <div className="space-y-3 text-muted-foreground">
                <p className="leading-relaxed">
                  EMCA Tanzania shall not be liable for any indirect, incidental, special, consequential, or punitive
                  damages resulting from your use of or inability to use our services.
                </p>
              </div>
            </div>

            {/* Section 9 */}
            <div className="space-y-4">
              <h2 className="font-poppins text-3xl font-semibold text-foreground">9. Changes to Terms</h2>
              <div className="space-y-3 text-muted-foreground">
                <p className="leading-relaxed">
                  We reserve the right to modify these Terms of Service at any time. Changes will be effective
                  immediately upon posting to our website. Your continued use of our services after any changes
                  constitutes acceptance of the new terms.
                </p>
              </div>
            </div>

            {/* Section 10 */}
            <div className="space-y-4">
              <h2 className="font-poppins text-3xl font-semibold text-foreground">10. Governing Law</h2>
              <div className="space-y-3 text-muted-foreground">
                <p className="leading-relaxed">
                  These Terms of Service shall be governed by and construed in accordance with the laws of the United
                  Republic of Tanzania, without regard to its conflict of law provisions.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="p-6 bg-emca-primary/5 border-2 border-emca-primary/20 rounded-2xl">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="h-6 w-6 text-emca-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="font-poppins text-2xl font-semibold text-foreground mb-2">Questions or Concerns?</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-muted-foreground pl-9">
                <p>
                  <strong>Email:</strong> emca.organization@gmail.com
                </p>
                <p>
                  <strong>Phone:</strong> +255 628 957 390
                </p>
                <p>
                  <strong>Address:</strong> USA River, Arusha, Tanzania
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
