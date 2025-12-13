import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function JoinCommunity() {
  return (
    <section className="py-24 bg-gradient-to-br from-forest-900 to-forest-800 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10 bg-primary">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              JOIN OUR <span className="text-forest-300">COMMUNITY</span>
            </h2>
            <p className="text-xl text-forest-100 leading-relaxed">
              Tell us about yourself and how you'd like to get involved. We'll connect you with the right opportunities.
            </p>
          </div>

          <form className="space-y-6 p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  className="bg-white/10 border-white/20 text-white placeholder:text-forest-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-join" className="text-white">
                  Email
                </Label>
                <Input
                  id="email-join"
                  type="email"
                  placeholder="your@email.com"
                  className="bg-white/10 border-white/20 text-white placeholder:text-forest-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-white">
                Location
              </Label>
              <Input
                id="location"
                placeholder="City, Region"
                className="bg-white/10 border-white/20 text-white placeholder:text-forest-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interests" className="text-white">
                Areas of Interest
              </Label>
              <Textarea
                id="interests"
                placeholder="Tell us what you're passionate about and how you'd like to contribute..."
                rows={4}
                className="bg-white/10 border-white/20 text-white placeholder:text-forest-200"
              />
            </div>

            <Button size="lg" className="w-full bg-white text-forest-900 hover:bg-forest-50 h-14 text-lg">
              Join the Movement
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
