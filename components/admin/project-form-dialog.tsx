"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Project, createProject, updateProject, uploadProjectImage } from "@/lib/actions/projects"
import { toast } from "sonner"
import { Upload, X } from "lucide-react"
import Image from "next/image"

interface ProjectFormDialogProps {
  isOpen: boolean
  onClose: () => void
  project: Project | null
}

const ICONS = [
  { value: "Sprout", label: "Sprout 🌱" },
  { value: "TreePine", label: "Tree 🌲" },
  { value: "Trash2", label: "Trash 🗑️" },
  { value: "Heart", label: "Heart ❤️" },
  { value: "Users", label: "Users 👥" },
  { value: "Leaf", label: "Leaf 🍃" },
  { value: "Globe", label: "Globe 🌍" },
  { value: "Flower", label: "Flower 🌸" },
]

const COLORS = [
  { value: "from-emca-yellow to-emca-lime", label: "Yellow to Lime" },
  { value: "from-emca-primary to-emca-medium", label: "Primary to Medium" },
  { value: "from-emca-medium to-emca-darkest", label: "Medium to Darkest" },
  { value: "from-green-500 to-emerald-600", label: "Green to Emerald" },
  { value: "from-blue-500 to-cyan-600", label: "Blue to Cyan" },
  { value: "from-purple-500 to-pink-600", label: "Purple to Pink" },
]

export function ProjectFormDialog({ isOpen, onClose, project }: ProjectFormDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    impact: "",
    image_url: "",
    icon: "Sprout",
    color: "from-emca-yellow to-emca-lime",
    link: "",
    display_order: 0,
    is_active: true,
  })

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        subtitle: project.subtitle,
        description: project.description,
        impact: project.impact,
        image_url: project.image_url || "",
        icon: project.icon,
        color: project.color,
        link: project.link || "",
        display_order: project.display_order,
        is_active: project.is_active,
      })
      setImagePreview(project.image_url || "")
    } else {
      setFormData({
        title: "",
        subtitle: "",
        description: "",
        impact: "",
        image_url: "",
        icon: "Sprout",
        color: "from-emca-yellow to-emca-lime",
        link: "",
        display_order: 0,
        is_active: true,
      })
      setImagePreview("")
    }
  }, [project, isOpen])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB")
      return
    }

    setIsUploading(true)

    try {
      const result = await uploadProjectImage(file)

      if (result.success && result.url) {
        setFormData({ ...formData, image_url: result.url })
        setImagePreview(result.url)
        toast.success("Image uploaded successfully")
      } else {
        toast.error(result.error || "Failed to upload image")
      }
    } catch (error) {
      toast.error("Failed to upload image")
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveImage = () => {
    setFormData({ ...formData, image_url: "" })
    setImagePreview("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = project
        ? await updateProject(project.id, formData)
        : await createProject(formData)

      if (result.success) {
        toast.success(project ? "Project updated successfully" : "Project created successfully")
        onClose()
      } else {
        toast.error(result.error || "Failed to save project")
      }
    } catch (error) {
      toast.error("An error occurred while saving the project")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {project ? "Edit Project" : "Add New Project"}
          </DialogTitle>
          <DialogDescription>
            {project
              ? "Update the project details below"
              : "Fill in the details to create a new project"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image">Project Image</Label>
            {imagePreview ? (
              <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emca-primary transition-colors">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer text-emca-primary hover:text-emca-medium font-medium"
                  >
                    {isUploading ? "Uploading..." : "Click to upload image"}
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 5MB</p>
              </div>
            )}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Project Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Binti Mazingira"
              required
            />
          </div>

          {/* Subtitle */}
          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtitle *</Label>
            <Input
              id="subtitle"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              placeholder="e.g., Daughters of the Environment"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed description of the project..."
              rows={5}
              required
            />
          </div>

          {/* Impact */}
          <div className="space-y-2">
            <Label htmlFor="impact">Impact Statement *</Label>
            <Input
              id="impact"
              value={formData.impact}
              onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
              placeholder="e.g., 500+ Girls & 12 Tailors"
              required
            />
          </div>

          {/* Icon */}
          <div className="space-y-2">
            <Label htmlFor="icon">Icon</Label>
            <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ICONS.map((icon) => (
                  <SelectItem key={icon.value} value={icon.value}>
                    {icon.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Color */}
          <div className="space-y-2">
            <Label htmlFor="color">Gradient Color</Label>
            <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COLORS.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-4 rounded bg-gradient-to-r ${color.value}`} />
                      {color.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Link */}
          <div className="space-y-2">
            <Label htmlFor="link">Project Link (optional)</Label>
            <Input
              id="link"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              placeholder="e.g., /projects#binti-mazingira"
            />
          </div>

          {/* Display Order */}
          <div className="space-y-2">
            <Label htmlFor="display_order">Display Order</Label>
            <Input
              id="display_order"
              type="number"
              value={formData.display_order}
              onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
              min="0"
            />
          </div>

          {/* Active Status */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="w-4 h-4 text-emca-primary border-gray-300 rounded focus:ring-emca-primary"
            />
            <Label htmlFor="is_active" className="cursor-pointer">
              Active (visible on website)
            </Label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-emca-primary to-emca-medium text-white"
            >
              {isSubmitting ? "Saving..." : project ? "Update Project" : "Create Project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
