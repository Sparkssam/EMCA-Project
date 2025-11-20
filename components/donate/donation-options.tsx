"use client"

import { useState } from "react"
import { Check } from "lucide-react"

const options = [
  {
    type: "one-time",
    title: "One-Time Gift",
    description: "Make an immediate impact with a single contribution",
    popular: false,
  },
  {
    type: "monthly",
    title: "Monthly Giving",
    description: "Sustain our work with recurring support",
    popular: true,
  },
  {
    type: "project",
    title: "Fund a Project",
    description: "Direct your donation to a specific initiative",
    popular: false,
  },
]

const amounts = [25, 50, 100, 250, 500, 1000]

export function DonationOptions() {
  const [selectedType, setSelectedType] = useState("monthly")
  const [selectedAmount, setSelectedAmount] = useState(100)
  const [customAmount, setCustomAmount] = useState("")

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Choose Your <span className="text-forest-600">Contribution</span>
            </h2>
          </div>

          {/* Donation Type */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {options.map((option) => (
              <button
                key={option.type}
                onClick={() => setSelectedType(option.type)}
                className={`relative p-6 rounded-2xl border-2 transition-all text-left ${
                  selectedType === option.type
                    ? "border-forest-600 bg-forest-50"
                    : "border-border bg-card hover:border-forest-300"
                }`}
              >
                {option.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-forest-600 text-white text-xs font-medium rounded-full">
                    Most Popular
                  </span>
                )}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-foreground">{option.title}</h3>
                  {selectedType === option.type && (
                    <div className="w-6 h-6 bg-forest-600 rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </button>
            ))}
          </div>

          {/* Amount Selection */}
          <div className="p-8 bg-card rounded-2xl border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-6">Select Amount</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {amounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    setSelectedAmount(amount)
                    setCustomAmount("")
                  }}
                  className={`p-4 rounded-xl border-2 font-semibold transition-all ${
                    selectedAmount === amount && !customAmount
                      ? "border-forest-600 bg-forest-50 text-forest-700"
                      : "border-border bg-background hover:border-forest-300"
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">$</span>
              <input
                type="number"
                placeholder="Custom amount"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value)
                  setSelectedAmount(0)
                }}
                className="w-full pl-8 pr-4 py-4 border-2 border-border rounded-xl focus:border-forest-600 focus:outline-none text-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
