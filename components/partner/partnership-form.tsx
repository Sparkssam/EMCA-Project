"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PartnershipForm() {
  return (
    <section id="partnership-form" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Start a <span className="text-forest-600">Conversation</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Tell us about your organization and how you envision collaborating with EMCA.
            </p>
          </div>

          <form className="space-y-6 p-8 md:p-12 bg-card rounded-2xl border border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="org-name">Organization Name</Label>
                <Input id="org-name" placeholder="Your organization" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-type">Organization Type</Label>
                <Select>
                  <SelectTrigger id="org-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corporate">Corporate</SelectItem>
                    <SelectItem value="ngo">NGO</SelectItem>
                    <SelectItem value="academic">Academic Institution</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                    <SelectItem value="international">International Organization</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="contact-name">Contact Person</Label>
                <Input id="contact-name" placeholder="Full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-title">Title/Position</Label>
                <Input id="contact-title" placeholder="Your title" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input id="contact-email" type="email" placeholder="email@organization.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-phone">Phone</Label>
                <Input id="contact-phone" type="tel" placeholder="+255 XXX XXX XXX" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="partnership-interest">Partnership Interest</Label>
              <Select>
                <SelectTrigger id="partnership-interest">
                  <SelectValue placeholder="What type of partnership?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="funding">Funding/Grants</SelectItem>
                  <SelectItem value="csr">Corporate Social Responsibility</SelectItem>
                  <SelectItem value="technical">Technical Support</SelectItem>
                  <SelectItem value="research">Research Collaboration</SelectItem>
                  <SelectItem value="advocacy">Advocacy Partnership</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Tell Us More</Label>
              <Textarea
                id="message"
                placeholder="Describe your organization's goals and how you envision partnering with EMCA..."
                rows={6}
              />
            </div>

            <Button size="lg" className="w-full bg-forest-600 hover:bg-forest-700 h-14 text-lg">
              Submit Partnership Inquiry
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              We'll review your inquiry and get back to you within 3-5 business days.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
