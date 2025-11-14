import Image from "next/image"

const partners = [
  { name: "Partner Organization 1", logo: "/partner-logo-1.jpg" },
  { name: "Partner Organization 2", logo: "/partner-logo-2.jpg" },
  { name: "Partner Organization 3", logo: "/partner-logo-3.jpg" },
  { name: "Partner Organization 4", logo: "/partner-logo-4.jpg" },
  { name: "Partner Organization 5", logo: "/partner-logo-5.jpg" },
  { name: "Partner Organization 6", logo: "/partner-logo-6.jpg" },
]

export function CurrentPartners() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our <span className="text-forest-600">Partners</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Proud to collaborate with organizations that share our vision for a sustainable future.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-all"
            >
              <div className="relative w-full h-16">
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  fill
                  className="object-contain opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">Interested in becoming a partner?</p>
          <a href="#partnership-form" className="text-forest-600 font-medium hover:underline">
            Get in touch with us
          </a>
        </div>
      </div>
    </section>
  )
}
