import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ContactSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-forest-50 via-background to-earth-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              GET IN <span className="text-forest-600">TOUCH</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Have questions? Want to visit our office? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-forest-600" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Email</p>
                      <a href="mailto:info@emca.or.tz" className="text-muted-foreground hover:text-forest-600">
                        info@emca.or.tz
                      </a>
                      <br />
                      <a href="mailto:partnerships@emca.or.tz" className="text-muted-foreground hover:text-forest-600">
                        partnerships@emca.or.tz
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-sky-600" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Phone</p>
                      <p className="text-muted-foreground">+255 692 880 644</p>
                      <p className="text-muted-foreground">+255 628 957 390 (Partnerships)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-earth-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-earth-600" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Office</p>
                      <p className="text-muted-foreground">
                        EMCA Tanzania Headquarters
                        <br />
                        Dar es Salaam, Tanzania
                        <br />
                        East Africa
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  <Button
                    size="icon"
                    variant="outline"
                    className="hover:bg-forest-50 hover:border-forest-600 bg-transparent"
                  >
                    <Facebook className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="hover:bg-forest-50 hover:border-forest-600 bg-transparent"
                  >
                    <Twitter className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="hover:bg-forest-50 hover:border-forest-600 bg-transparent"
                  >
                    <Instagram className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="hover:bg-forest-50 hover:border-forest-600 bg-transparent"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="p-6 bg-card rounded-xl border border-border">
                <h3 className="font-semibold text-foreground mb-2">Office Hours</h3>
                <p className="text-sm text-muted-foreground">
                  Monday - Friday: 8:00 AM - 5:00 PM (EAT)
                  <br />
                  Saturday: 9:00 AM - 1:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="relative h-[500px] bg-muted rounded-2xl overflow-hidden border border-border">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Interactive map coming soon</p>
                  <p className="text-sm text-muted-foreground mt-2">Dar es Salaam, Tanzania</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
