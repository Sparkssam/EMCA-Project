"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, Users, Mail, FileText, Handshake, FolderKanban, Star, Image } from "lucide-react"
import { logout } from "@/lib/actions/auth"
import { toast } from "sonner"

interface AdminDashboardProps {
  user: {
    id: string
    email?: string | null
    role?: string
  }
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const router = useRouter()

  const handleLogout = async () => {
    const result = await logout()
    if (result.success) {
      toast.success("Logged out successfully")
      router.push("/")
    } else {
      toast.error("Logout failed", {
        description: result.message,
      })
    }
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-card border-2 border-border rounded-2xl p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-pompiere text-foreground mb-2">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome back, {user.email || "Admin"}
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-2 border-emca-primary text-emca-primary hover:bg-emca-primary hover:text-white"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Projects"
            icon={FolderKanban}
            description="Manage key projects"
            href="/admin/projects"
          />
          <DashboardCard
            title="Volunteers"
            icon={Users}
            description="View volunteer applications"
            href="/admin/volunteers"
          />
          <DashboardCard
            title="Reviews"
            icon={Star}
            description="Manage testimonials"
            href="/admin/reviews"
          />
          <DashboardCard
            title="Partnerships"
            icon={Handshake}
            description="Manage partnership inquiries"
            href="/admin/partnerships"
          />
          <DashboardCard
            title="Gallery"
            icon={Image}
            description="Manage gallery images"
            href="/admin/gallery"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-card border-2 border-border rounded-2xl p-8">
          <h2 className="text-2xl font-pompiere text-foreground mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <p className="text-muted-foreground">
              Select a section above to manage your content and view submissions.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <Button
                onClick={() => router.push("/admin/projects")}
                className="bg-emca-primary hover:bg-emca-medium text-white"
              >
                Manage Projects
              </Button>
              <Button
                onClick={() => router.push("/admin/volunteers")}
                variant="outline"
                className="border-2"
              >
                View Volunteers
              </Button>
              <Button
                onClick={() => router.push("/")}
                variant="outline"
                className="border-2"
              >
                Back to Website
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface DashboardCardProps {
  title: string
  icon: React.ElementType
  description: string
  href: string
}

function DashboardCard({ title, icon: Icon, description, href }: DashboardCardProps) {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push(href)}
      className="bg-card border-2 border-border rounded-2xl p-6 hover:border-emca-primary transition-all duration-300 hover:shadow-lg text-left group"
    >
      <Icon className="h-8 w-8 text-emca-primary mb-3 group-hover:scale-110 transition-transform" />
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </button>
  )
}
