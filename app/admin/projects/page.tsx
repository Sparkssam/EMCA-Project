import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/actions/auth"
import { getAllProjects } from "@/lib/actions/projects"
import { ProjectsManager } from "@/components/admin/projects-manager"

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
    <div className="min-h-screen bg-gradient-to-br from-emca-darkest/5 via-white to-emca-primary/5">
      <ProjectsManager projects={projects} />
    </div>
  )
}
