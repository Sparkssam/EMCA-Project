"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { TreePine, Users, Droplets, Sprout } from "lucide-react"

export function ImpactCalculator() {
  const [amount, setAmount] = useState(100)

  const calculateImpact = (amount: number) => ({
    trees: Math.floor(amount / 0.5),
    youth: Math.floor(amount / 20),
    water: Math.floor(amount / 50),
    families: Math.floor(amount / 150),
  })

  const impact = calculateImpact(amount)

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              SEE YOUR <span className="text-forest-600">IMPACT</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Move the slider to see how your contribution translates into real-world change.
            </p>
          </div>

          <div className="p-8 md:p-12 bg-gradient-to-br from-forest-50 to-earth-50 rounded-3xl border border-border">
            <div className="mb-12">
              <div className="flex items-baseline justify-center gap-2 mb-6">
                <span className="text-6xl font-bold text-forest-600 font-serif">${amount}</span>
                <span className="text-2xl text-muted-foreground">USD</span>
              </div>
              <Slider
                value={[amount]}
                onValueChange={(value) => setAmount(value[0])}
                min={10}
                max={1000}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>$10</span>
                <span>$1,000</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-white rounded-2xl">
                <TreePine className="h-10 w-10 text-forest-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-forest-600 font-serif mb-1">{impact.trees}</div>
                <div className="text-sm text-muted-foreground">Trees Planted</div>
              </div>

              <div className="text-center p-6 bg-white rounded-2xl">
                <Users className="h-10 w-10 text-sky-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-sky-600 font-serif mb-1">{impact.youth}</div>
                <div className="text-sm text-muted-foreground">Youth Trained</div>
              </div>

              <div className="text-center p-6 bg-white rounded-2xl">
                <Droplets className="h-10 w-10 text-sky-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-sky-600 font-serif mb-1">{impact.water}</div>
                <div className="text-sm text-muted-foreground">People w/ Clean Water</div>
              </div>

              <div className="text-center p-6 bg-white rounded-2xl">
                <Sprout className="h-10 w-10 text-earth-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-earth-600 font-serif mb-1">{impact.families}</div>
                <div className="text-sm text-muted-foreground">Families Supported</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
