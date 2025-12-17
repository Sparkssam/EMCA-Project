"use client"

import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MapSection() {
  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="font-pompiere text-4xl sm:text-5xl md:text-6xl font-normal text-foreground font-serif">
            FIND <span className="text-emca-primary">US</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-serif">
            Visit our office or reach out to collaborate on environmental action
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-card rounded-3xl overflow-hidden border-2 border-border shadow-xl">
            {/* Google Maps Embed */}
            <div className="relative w-full h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.62290891254!2d39.10842839999999!3d-6.792354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4b8b0d5c7e7f%3A0x5c7b7c7b7c7b7c7b!2sDar%20es%20Salaam%2C%20Tanzania!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="EMCA Office Location"
              />
            </div>

            {/* Contact Details Overlay */}
            <div className="p-8 bg-gradient-to-r from-emca-darkest to-emca-dark text-white opacity-75 shadow">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-emca-yellow flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1 text-white">Address</h4>
                    <p className="text-secondary">USA River, Arusha, Tanzania</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-emca-yellow flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1 text-white">Email</h4>
                    <a
                      href="mailto:emca.organization@gmail.com"
                      className="hover:text-emca-yellow transition-colors text-secondary"
                    >
                      emca.organization@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-emca-yellow flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1 text-white">Phone</h4>
                    <p className="text-secondary">{"{\"+255 628 957 390\\n,\\n+255 692 880 644\"}"}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <Button
                  asChild
                  className="bg-emca-yellow text-emca-darkest hover:bg-emca-lime rounded-2xl font-semibold"
                >
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Dar+es+Salaam,+Tanzania"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Directions
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
