"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart, Lock, Shield, CheckCircle2, Smartphone, CreditCard } from "lucide-react"

export function DonationForm() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50000)
  const [customAmount, setCustomAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"mobile" | "card">("mobile")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })

  const quickAmounts = [10000, 25000, 50000, 100000, 250000]

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emca-primary to-emca-medium rounded-full mb-4">
              <Heart className="h-8 w-8 text-white" fill="white" />
            </div>
            <h2 className="font-pompiere text-4xl sm:text-5xl font-normal text-foreground font-serif">
              MAKE YOUR <span className="text-emca-primary">IMPACT</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your contribution plants trees, empowers communities, and protects Tanzania's environment
            </p>
          </div>

          <div className="bg-card rounded-3xl border-2 border-border shadow-2xl overflow-hidden">
            {/* Quick Amount Selection */}
            <div className="p-8 sm:p-10 border-b-2 border-border bg-gradient-to-br from-emca-primary/5 to-transparent">
              <Label className="text-lg font-semibold mb-4 block">Choose Amount (TZS)</Label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amount)
                      setCustomAmount("")
                    }}
                    className={`p-4 rounded-2xl font-semibold text-base transition-all duration-300 border-2 ${
                      selectedAmount === amount
                        ? "bg-emca-primary text-white border-emca-primary shadow-lg scale-105"
                        : "bg-background border-border hover:border-emca-primary/50 hover:shadow-md text-foreground"
                    }`}
                  >
                    {amount.toLocaleString()}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-amount">Or Enter Custom Amount</Label>
                <Input
                  id="custom-amount"
                  type="number"
                  placeholder="Enter amount in TZS"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value)
                    setSelectedAmount(null)
                  }}
                  className="h-14 text-lg rounded-2xl border-2"
                />
              </div>
            </div>

            {/* Donor Information */}
            <div className="p-8 sm:p-10 space-y-6">
              <h3 className="text-xl font-semibold text-foreground mb-6">Your Information</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="h-12 rounded-2xl border-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="h-12 rounded-2xl border-2"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12 rounded-2xl border-2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+255 628 957 390 , +255 692 880 644"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="h-12 rounded-2xl border-2"
                />
              </div>

              {/* Payment Method Selection */}
              <div className="pt-6 border-t-2 border-border">
                <Label className="text-lg font-semibold mb-4 block">Payment Method</Label>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("mobile")}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                      paymentMethod === "mobile"
                        ? "bg-emca-primary text-white border-emca-primary shadow-lg"
                        : "bg-background border-border hover:border-emca-primary/50"
                    }`}
                  >
                    <Smartphone className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-semibold">Mobile Money</p>
                    <p className="text-xs mt-1 opacity-80">M-Pesa, Tigo Pesa, Airtel</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                      paymentMethod === "card"
                        ? "bg-emca-primary text-white border-emca-primary shadow-lg"
                        : "bg-background border-border hover:border-emca-primary/50"
                    }`}
                  >
                    <CreditCard className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-semibold">Credit/Debit Card</p>
                    <p className="text-xs mt-1 opacity-80">Visa, Mastercard</p>
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-muted/50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-emca-medium flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">256-bit SSL Encryption</p>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-emca-medium flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">Secure Payment</p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emca-medium flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">Tax Deductible</p>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-emca-primary to-emca-medium hover:from-emca-medium hover:to-emca-primary text-white font-bold h-16 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                Complete Donation
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By donating, you agree to our terms and privacy policy. Your donation directly supports environmental
                projects in Tanzania.
              </p>
            </div>
          </div>

          {/* Impact Message */}
          <div className="mt-12 text-center p-8 bg-gradient-to-r from-emca-primary/10 to-emca-medium/10 rounded-3xl border-2 border-emca-primary/20">
            <p className="text-lg font-semibold text-foreground mb-2">100% of your donation goes to our projects</p>
            <p className="text-base text-muted-foreground">
              Every contribution makes a real difference in Tanzania's environment and communities
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
