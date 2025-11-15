import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/actions/auth"
import { getAllProjects } from "@/lib/actions/projects"
import { ProjectsManager } from "@/components/admin/projects-manager"

export default async function AdminProjectsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const projects = await getAllProjects()

  return (
    <div className="min-h-screen bg-gradient-to-br from-emca-darkest/5 via-white to-emca-primary/5">
      <ProjectsManager projects={projects} />
    </div>
  )
}
