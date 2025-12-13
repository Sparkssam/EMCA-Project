"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, Leaf, Heart, User, LogOut } from 'lucide-react'
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"
import { logout } from "@/lib/actions/auth"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/philosophy", label: "Philosophy" },
  { href: "/projects", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/stories", label: "Stories" },
  { href: "/volunteer", label: "Volunteer" },
]

interface NavigationProps {
  user?: {
    name?: string
    email?: string
    role?: string
  } | null
}

export function Navigation({ user }: NavigationProps) {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    const result = await logout()
    if (result.success) {
      toast.success("Logged out successfully")
      router.push("/")
      router.refresh()
    } else {
      toast.error("Logout failed")
    }
    setIsLoggingOut(false)
  }

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 leading-10 tracking-wide",
          isScrolled
            ? "bg-background/95 backdrop-blur-xl shadow-lg border-b border-border"
            : "bg-gradient-to-b from-emca-darkest/90 to-transparent backdrop-blur-sm",
        )}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20 font-serif tracking-widest">
          <Link href="/" className="flex items-center group">
            <Image
              src="/logo.jpg"
              alt="EMCA Tanzania Logo"
              width={120}
              height={50}
              className="h-12 w-auto transition-all duration-500 group-hover:scale-105"
              priority
            />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-base rounded-lg transition-all duration-300",
                  isScrolled
                    ? "text-foreground/90 hover:text-primary hover:bg-primary/10"
                    : "text-white/95 hover:text-emca-yellow hover:bg-white/10",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            
            {user ? (
              // Logged in - show user info and logout
              <>
                <div className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg",
                  isScrolled ? "bg-muted" : "bg-white/10"
                )}>
                  <User className="h-4 w-4" />
                  <div className="flex flex-col">
                    <span className={cn(
                      "text-sm font-medium",
                      isScrolled ? "text-foreground" : "text-white"
                    )}>
                      {user.name || user.email}
                    </span>
                    {user.role && (
                      <span className={cn(
                        "text-xs capitalize",
                        isScrolled ? "text-muted-foreground" : "text-white/70"
                      )}>
                        {user.role}
                      </span>
                    )}
                  </div>
                </div>
                {user.role === "admin" && (
                  <Button
                    asChild
                    variant="outline"
                    className={cn(
                      "rounded-full px-4 h-10",
                      isScrolled ? "" : "border-white/20 text-white hover:bg-white/10"
                    )}
                  >
                    <Link href="/admin">Admin Dashboard</Link>
                  </Button>
                )}
                <Button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  variant="outline"
                  className={cn(
                    "rounded-full px-4 h-10",
                    isScrolled ? "" : "border-white/20 text-white hover:bg-white/10"
                  )}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </Button>
              </>
            ) : (
              // Not logged in - show donate and login
              <>
                <Button
                  asChild
                  variant="outline"
                  className={cn(
                    "rounded-full px-4 h-10",
                    isScrolled ? "" : "border-white/20 text-white hover:bg-white/10"
                  )}
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-emca-yellow to-emca-lime hover:from-emca-lime hover:to-emca-yellow text-emca-darkest rounded-full px-6 h-11 text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0"
                >
                  <Link href="/donate">
                    <Heart className="mr-2 h-5 w-5" />
                    Donate
                  </Link>
                </Button>
              </>
            )}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "lg:hidden p-2 rounded-lg transition-all duration-300",
              isScrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10",
            )}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div
            className="lg:hidden py-6 border-t border-border bg-background/95 backdrop-blur-xl"
            style={{ animation: "fade-in 0.3s ease-out" }}
          >
            <div className="flex flex-col gap-2">
              {user && (
                <div className="px-4 py-3 bg-muted rounded-lg mb-2 flex items-center gap-2">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">
                      {user.name || user.email}
                    </span>
                    {user.role && (
                      <span className="text-xs text-muted-foreground capitalize">
                        {user.role}
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-base text-foreground/90 hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-300"
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="px-4 py-2 flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Theme:</span>
                <ThemeToggle />
              </div>
              
              {user ? (
                <>
                  {user.role === "admin" && (
                    <Button
                      asChild
                      variant="outline"
                      className="mt-2"
                    >
                      <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                        Admin Dashboard
                      </Link>
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      handleLogout()
                    }}
                    disabled={isLoggingOut}
                    variant="outline"
                    className="mt-2"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    asChild
                    variant="outline"
                    className="mt-2"
                  >
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      Login
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="mt-2 bg-gradient-to-r from-emca-yellow to-emca-lime hover:from-emca-lime hover:to-emca-yellow text-emca-darkest rounded-full h-12 text-base font-bold border-0"
                  >
                    <Link href="/donate" onClick={() => setIsMobileMenuOpen(false)}>
                      <Heart className="mr-2 h-5 w-5" />
                      Donate
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
        </div>
      </nav>
      
      {/* Main Logo Below Navigation */}
      <div className="fixed top-20 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 py-4 flex justify-center">
          <Image
            src="/logo.jpg"
            alt="EMCA Logo"
            width={400}
            height={100}
            className="h-auto w-auto max-h-24 object-contain"
            priority
          />
        </div>
      </div>
    </>
  )
}
