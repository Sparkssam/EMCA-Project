import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/actions/auth"
import { getAllProjects } from "@/lib/actions/projects"
import { ProjectsManager } from "@/components/admin/projects-manager"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default async function AdminProjectsPage() {
  const { success, user } = await getCurrentUser()

  if (!success || !user) {
    redirect("/login")
  }

  // Only allow admin role to access admin pages
  if (user.role !== "admin") {
    redirect("/") // Redirect volunteers to homepage
  }

  const projects = await getAllProjects()

  return (
    <div className="min-h-screen bg-gradient-to-br from-emca-darkest/5 via-white to-emca-primary/5 pt-32">
      <div className="container mx-auto py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <ProjectsManager projects={projects} />
      </div>
    </div>
  )
}
