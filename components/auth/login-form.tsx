"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogIn, Eye, EyeOff } from "lucide-react"
import { loginWithEmail } from "@/lib/actions/auth"
import { toast } from "sonner"

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await loginWithEmail(formData.email, formData.password)

      if (result.success) {
        // Check user role and redirect accordingly
        const userRole = result.user?.role
        
        if (userRole === "admin") {
          toast.success("Welcome Admin!", {
            description: "Redirecting to admin dashboard...",
          })
          setTimeout(() => {
            router.push("/admin")
          }, 1000)
        } else if (userRole === "volunteer") {
          toast.success("Welcome Volunteer!", {
            description: "Login successful!",
          })
          setTimeout(() => {
            router.push("/") // Redirect volunteers to homepage
            router.refresh()
          }, 1000)
        } else {
          toast.success("Login Successful!", {
            description: "Welcome!",
          })
          setTimeout(() => {
            router.push("/")
          }, 1000)
        }
      } else {
        toast.error("Login Failed", {
          description: result.message,
        })
      }
    } catch (error) {
      toast.error("Error", {
        description: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-card border-2 border-border rounded-2xl p-8">
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-base font-medium text-foreground">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-background border-2 border-border rounded-2xl text-foreground focus:border-emca-primary focus:outline-none transition-colors"
            placeholder="admin@emca.or.tz"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-base font-medium text-foreground">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 pr-12 bg-background border-2 border-border rounded-2xl text-foreground focus:border-emca-primary focus:outline-none transition-colors"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-emca-primary hover:bg-emca-medium text-white py-6 text-lg rounded-2xl transition-all duration-300 hover:scale-[1.02]"
      >
        {isLoading ? (
          "Signing in..."
        ) : (
          <>
            Sign In
            <LogIn className="ml-2 h-5 w-5" />
          </>
        )}
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        <p>Don't have an account? Contact the administrator.</p>
      </div>
    </form>
  )
}
