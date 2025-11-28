import { requireAdmin } from "@/lib/auth/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Home, 
  Info, 
  Lightbulb, 
  TrendingUp, 
  MessageSquare, 
  Users, 
  Image as ImageIcon, 
  Newspaper,
  Calendar,
  FolderOpen,
  ArrowLeft
} from "lucide-react"

export const metadata = {
  title: "Content Management | Admin Dashboard",
  description: "Manage all website content",
}

const contentSections = [
  {
    title: "Events & Activities",
    description: "Manage upcoming, ongoing, and past events",
    href: "/admin/events",
    icon: Calendar,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    title: "Projects",
    description: "Manage project information and details",
    href: "/admin/projects",
    icon: FolderOpen,
    color: "bg-green-500/10 text-green-600",
  },
  {
    title: "Impact Statistics",
    description: "Update impact metrics and numbers",
    href: "/admin/content/impact-stats",
    icon: TrendingUp,
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    title: "Success Stories",
    description: "Share transformation stories",
    href: "/admin/content/success-stories",
    icon: MessageSquare,
    color: "bg-yellow-500/10 text-yellow-600",
  },
  {
    title: "Philosophy Items",
    description: "Manage philosophy principles and values",
    href: "/admin/content/philosophy",
    icon: Lightbulb,
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    title: "About Sections",
    description: "Update about page content sections",
    href: "/admin/content/about",
    icon: Info,
    color: "bg-cyan-500/10 text-cyan-600",
  },
  {
    title: "Hero Content",
    description: "Manage hero sections for all pages",
    href: "/admin/content/hero",
    icon: Home,
    color: "bg-pink-500/10 text-pink-600",
  },
  {
    title: "Gallery",
    description: "Manage gallery images and descriptions",
    href: "/admin/content/gallery",
    icon: ImageIcon,
    color: "bg-indigo-500/10 text-indigo-600",
  },
  {
    title: "News & Updates",
    description: "Post news articles and updates",
    href: "/admin/content/news",
    icon: Newspaper,
    color: "bg-red-500/10 text-red-600",
  },
  {
    title: "Volunteers",
    description: "Manage volunteer applications",
    href: "/admin/volunteers",
    icon: Users,
    color: "bg-teal-500/10 text-teal-600",
  },
]

export default async function AdminContentPage() {
  await requireAdmin()

  return (
    <div className="min-h-screen bg-background pt-32 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <div className="mb-12">
          <h1 className="text-4xl font-pompiere text-foreground mb-4">Content Management</h1>
          <p className="text-lg text-muted-foreground">
            Manage all website content from one central location
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contentSections.map((section) => (
            <Link key={section.href} href={section.href}>
              <div className="group p-6 bg-card border-2 border-border rounded-xl hover:border-emca-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className={`w-12 h-12 ${section.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <section.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-pompiere text-foreground mb-2">{section.title}</h3>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
