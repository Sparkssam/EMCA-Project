import { PieChart, FileText, Award } from "lucide-react"

export function TransparencySection() {
  return (
    <section className="py-24 bg-gradient-to-br from-forest-50 via-background to-earth-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              YOUR MONEY, <span className="text-forest-600">TRANSPARENTLY USED</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe in complete transparency. Here's exactly how your donations create impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-8 bg-card rounded-2xl border border-border">
              <div className="text-5xl font-bold text-forest-600 font-serif mb-2">75%</div>
              <div className="text-sm font-medium text-foreground mb-2">Program Activities</div>
              <div className="text-xs text-muted-foreground">Direct environmental and community work</div>
            </div>

            <div className="text-center p-8 bg-card rounded-2xl border border-border">
              <div className="text-5xl font-bold text-sky-600 font-serif mb-2">15%</div>
              <div className="text-sm font-medium text-foreground mb-2">Operations</div>
              <div className="text-xs text-muted-foreground">Staff, equipment, and infrastructure</div>
            </div>

            <div className="text-center p-8 bg-card rounded-2xl border border-border">
              <div className="text-5xl font-bold text-earth-600 font-serif mb-2">10%</div>
              <div className="text-sm font-medium text-foreground mb-2">Fundraising</div>
              <div className="text-xs text-muted-foreground">Growing our impact and reach</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex gap-4 p-6 bg-card rounded-xl border border-border">
              <PieChart className="h-8 w-8 text-forest-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Annual Reports</h3>
                <p className="text-sm text-muted-foreground">Detailed financial and impact reporting</p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-card rounded-xl border border-border">
              <FileText className="h-8 w-8 text-sky-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Audited Accounts</h3>
                <p className="text-sm text-muted-foreground">Independently verified financials</p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-card rounded-xl border border-border">
              <Award className="h-8 w-8 text-earth-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Certified NGO</h3>
                <p className="text-sm text-muted-foreground">Registered and compliant</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
