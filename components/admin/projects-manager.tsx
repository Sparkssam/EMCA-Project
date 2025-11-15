"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react"
import { Project } from "@/lib/actions/projects"
import { ProjectFormDialog } from "./project-form-dialog"
import { toast } from "sonner"
import { deleteProject, toggleProjectStatus } from "@/lib/actions/projects"
import Image from "next/image"

interface ProjectsManagerProps {
  projects: Project[]
}

export function ProjectsManager({ projects: initialProjects }: ProjectsManagerProps) {
  const router = useRouter()
  const [projects, setProjects] = useState(initialProjects)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const handleAddNew = () => {
    setSelectedProject(null)
    setIsDialogOpen(true)
  }

  const handleEdit = (project: Project) => {
    setSelectedProject(project)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return
    }

    setIsDeleting(id)
    const result = await deleteProject(id)

    if (result.success) {
      toast.success("Project deleted successfully")
      setProjects(projects.filter((p) => p.id !== id))
    } else {
      toast.error(result.error || "Failed to delete project")
    }
    setIsDeleting(null)
  }

  const handleToggleStatus = async (project: Project) => {
    const newStatus = !project.is_active
    const result = await toggleProjectStatus(project.id, newStatus)

    if (result.success) {
      toast.success(`Project ${newStatus ? "activated" : "deactivated"}`)
      setProjects(
        projects.map((p) => (p.id === project.id ? { ...p, is_active: newStatus } : p))
      )
    } else {
      toast.error(result.error || "Failed to update project status")
    }
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setSelectedProject(null)
    router.refresh()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Button
            variant="ghost"
            onClick={() => router.push("/admin")}
            className="mb-4 hover:bg-emca-primary/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emca-primary to-emca-medium bg-clip-text text-transparent">
            Manage Projects
          </h1>
          <p className="text-muted-foreground mt-2">
            Add, edit, or remove key projects displayed on the homepage
          </p>
        </div>
        <Button
          onClick={handleAddNew}
          className="bg-gradient-to-r from-emca-primary to-emca-medium hover:from-emca-medium hover:to-emca-primary text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-muted-foreground mb-4">No projects yet. Add your first project!</p>
          <Button
            onClick={handleAddNew}
            className="bg-gradient-to-r from-emca-primary to-emca-medium text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add First Project
          </Button>
        </div>
      ) : (
        <div className="grid gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`bg-white rounded-lg border shadow-sm overflow-hidden transition-all ${
                project.is_active ? "border-gray-200" : "border-gray-300 opacity-60"
              }`}
            >
              <div className="grid md:grid-cols-[300px,1fr] gap-6">
                {/* Image */}
                <div className="relative h-64 md:h-auto min-h-[200px] bg-gray-100">
                  {project.image_url ? (
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            project.is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {project.is_active ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <p className="text-lg text-emca-primary font-medium mb-2">
                        {project.subtitle}
                      </p>
                      <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="font-semibold text-emca-medium">{project.impact}</span>
                        <span>Order: {project.display_order}</span>
                        <span>Icon: {project.icon}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-auto pt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleStatus(project)}
                      className="flex items-center gap-2"
                    >
                      {project.is_active ? (
                        <>
                          <EyeOff className="h-4 w-4" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4" />
                          Activate
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(project)}
                      className="flex items-center gap-2"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(project.id, project.title)}
                      disabled={isDeleting === project.id}
                      className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:border-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                      {isDeleting === project.id ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ProjectFormDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        project={selectedProject}
      />
    </div>
  )
}
