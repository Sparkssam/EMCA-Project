"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { createPartnership } from "@/lib/actions/partnerships"

export function PartnershipForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    organization_name: "",
    organization_type: "",
    contact_name: "",
    contact_title: "",
    contact_email: "",
    contact_phone: "",
    partnership_interest: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.organization_name || !formData.organization_type || !formData.contact_name || 
        !formData.contact_email || !formData.partnership_interest || !formData.message) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    try {
      const result = await createPartnership(formData)

      if (result.success) {
        toast.success("Success!", {
          description: result.message,
        })
        // Reset form
        setFormData({
          organization_name: "",
          organization_type: "",
          contact_name: "",
          contact_title: "",
          contact_email: "",
          contact_phone: "",
          partnership_interest: "",
          message: "",
        })
      } else {
        toast.error("Submission Failed", {
          description: result.message,
        })
      }
    } catch (error) {
      toast.error("Error", {
        description: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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

          <form onSubmit={handleSubmit} className="space-y-6 p-8 md:p-12 bg-card rounded-2xl border border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="org-name">Organization Name *</Label>
                <Input 
                  id="org-name" 
                  placeholder="Your organization" 
                  value={formData.organization_name}
                  onChange={(e) => setFormData({ ...formData, organization_name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-type">Organization Type *</Label>
                <Select 
                  value={formData.organization_type}
                  onValueChange={(value) => setFormData({ ...formData, organization_type: value })}
                  required
                >
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
                <Label htmlFor="contact-name">Contact Person *</Label>
                <Input 
                  id="contact-name" 
                  placeholder="Full name" 
                  value={formData.contact_name}
                  onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-title">Title/Position</Label>
                <Input 
                  id="contact-title" 
                  placeholder="Your title" 
                  value={formData.contact_title}
                  onChange={(e) => setFormData({ ...formData, contact_title: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email *</Label>
                <Input 
                  id="contact-email" 
                  type="email" 
                  placeholder="email@organization.com" 
                  value={formData.contact_email}
                  onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-phone">Phone</Label>
                <Input 
                  id="contact-phone" 
                  type="tel" 
                  placeholder="+255 692 880 644" 
                  value={formData.contact_phone}
                  onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="partnership-interest">Partnership Interest *</Label>
              <Select 
                value={formData.partnership_interest}
                onValueChange={(value) => setFormData({ ...formData, partnership_interest: value })}
                required
              >
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
              <Label htmlFor="message">Tell Us More *</Label>
              <Textarea
                id="message"
                placeholder="Describe your organization's goals and how you envision partnering with EMCA..."
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>

            <Button 
              type="submit"
              size="lg" 
              className="w-full bg-forest-600 hover:bg-forest-700 h-14 text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Partnership Inquiry"}
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
