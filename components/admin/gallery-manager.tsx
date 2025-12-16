"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Switch } from "@/components/ui/switch"
import { 
  Plus, 
  Pencil, 
  Trash2, 
  ImageIcon, 
  Upload,
  X,
  Eye,
  EyeOff,
  GripVertical
} from "lucide-react"
import { toast } from "sonner"
import {
  GalleryItem,
  GalleryFormData,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  uploadGalleryImage,
  toggleGalleryItemStatus,
} from "@/lib/actions/gallery"

const categories = [
  "Education",
  "Cleanup",
  "Reforestation",
  "Women Empowerment",
  "Community",
  "Conservation",
  "Agriculture",
  "Workshops",
  "Events",
  "Other",
]

const sizes = [
  { value: "normal", label: "Normal (1x1)" },
  { value: "large", label: "Large (2x1)" },
  { value: "tall", label: "Tall (1x2)" },
  { value: "wide", label: "Wide (2x1)" },
]

interface GalleryManagerProps {
  initialItems: GalleryItem[]
}

export function GalleryManager({ initialItems }: GalleryManagerProps) {
  const [items, setItems] = useState<GalleryItem[]>(initialItems)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState<GalleryFormData>({
    title: "",
    description: "",
    category: "",
    image_url: "",
    size: "normal",
    display_order: 0,
    is_active: true,
  })

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      image_url: "",
      size: "normal",
      display_order: items.length + 1,
      is_active: true,
    })
    setPreviewUrl("")
    setSelectedItem(null)
  }

  const openCreateDialog = () => {
    resetForm()
    setFormData(prev => ({ ...prev, display_order: items.length + 1 }))
    setIsDialogOpen(true)
  }

  const openEditDialog = (item: GalleryItem) => {
    setSelectedItem(item)
    setFormData({
      title: item.title,
      description: item.description || "",
      category: item.category,
      image_url: item.image_url,
      size: item.size,
      display_order: item.display_order,
      is_active: item.is_active,
    })
    setPreviewUrl(item.image_url)
    setIsDialogOpen(true)
  }

  const openDeleteDialog = (item: GalleryItem) => {
    setSelectedItem(item)
    setIsDeleteDialogOpen(true)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB")
      return
    }

    setIsUploading(true)
    
    // Show preview immediately
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    try {
      const uploadFormData = new FormData()
      uploadFormData.append("file", file)
      
      const result = await uploadGalleryImage(uploadFormData)
      
      if (result.success && result.url) {
        setFormData(prev => ({ ...prev, image_url: result.url! }))
        setPreviewUrl(result.url)
        toast.success("Image uploaded successfully")
      } else {
        toast.error(result.message || "Failed to upload image")
        setPreviewUrl("")
      }
    } catch (error) {
      console.error("Upload error:", error)
      toast.error("Failed to upload image")
      setPreviewUrl("")
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async () => {
    if (!formData.title || !formData.category || !formData.image_url) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsLoading(true)

    try {
      if (selectedItem) {
        // Update existing item
        const result = await updateGalleryItem(selectedItem.id, formData)
        if (result.success) {
          setItems(items.map(item => 
            item.id === selectedItem.id 
              ? { ...item, ...formData, updated_at: new Date().toISOString() } 
              : item
          ))
          toast.success("Gallery item updated successfully")
          setIsDialogOpen(false)
          resetForm()
        } else {
          toast.error(result.message || "Failed to update gallery item")
        }
      } else {
        // Create new item
        const result = await createGalleryItem(formData)
        if (result.success && result.data) {
          setItems([...items, result.data])
          toast.success("Gallery item created successfully")
          setIsDialogOpen(false)
          resetForm()
        } else {
          toast.error(result.message || "Failed to create gallery item")
        }
      }
    } catch (error) {
      console.error("Submit error:", error)
      toast.error("An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedItem) return

    setIsLoading(true)

    try {
      const result = await deleteGalleryItem(selectedItem.id)
      if (result.success) {
        setItems(items.filter(item => item.id !== selectedItem.id))
        toast.success("Gallery item deleted successfully")
        setIsDeleteDialogOpen(false)
        setSelectedItem(null)
      } else {
        toast.error(result.message || "Failed to delete gallery item")
      }
    } catch (error) {
      console.error("Delete error:", error)
      toast.error("An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleStatus = async (item: GalleryItem) => {
    try {
      const result = await toggleGalleryItemStatus(item.id, !item.is_active)
      if (result.success) {
        setItems(items.map(i => 
          i.id === item.id ? { ...i, is_active: !i.is_active } : i
        ))
        toast.success(`Gallery item ${!item.is_active ? "shown" : "hidden"}`)
      } else {
        toast.error(result.message || "Failed to update status")
      }
    } catch (error) {
      console.error("Toggle error:", error)
      toast.error("An error occurred")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-pompiere text-foreground">GALLERY MANAGER</h1>
          <p className="text-muted-foreground">
            Add, edit, or remove images from the gallery
          </p>
        </div>
        <Button onClick={openCreateDialog} className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Image
        </Button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={`group relative bg-card rounded-xl overflow-hidden border-2 transition-all duration-300 ${
              item.is_active 
                ? "border-border hover:border-emca-primary/40" 
                : "border-red-200 opacity-60"
            }`}
          >
            {/* Image */}
            <div className="relative aspect-square">
              <Image
                src={item.image_url || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover"
              />
              
              {/* Overlay with actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => openEditDialog(item)}
                  className="h-10 w-10"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => handleToggleStatus(item)}
                  className="h-10 w-10"
                >
                  {item.is_active ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => openDeleteDialog(item)}
                  className="h-10 w-10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Status badge */}
              {!item.is_active && (
                <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
                  Hidden
                </div>
              )}

              {/* Size badge */}
              <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 text-white text-xs font-medium rounded">
                {item.size}
              </div>
            </div>

            {/* Info */}
            <div className="p-4 space-y-2">
              <span className="inline-block px-2 py-1 bg-emca-primary/10 text-emca-primary text-xs font-medium rounded">
                {item.category}
              </span>
              <h3 className="font-semibold text-foreground line-clamp-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {item.description || "No description"}
              </p>
            </div>
          </div>
        ))}

        {/* Empty state */}
        {items.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <ImageIcon className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No gallery images yet</h3>
            <p className="text-muted-foreground mb-4">
              Add your first image to get started
            </p>
            <Button onClick={openCreateDialog} className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Image
            </Button>
          </div>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedItem ? "Edit Gallery Image" : "Add New Gallery Image"}
            </DialogTitle>
            <DialogDescription>
              {selectedItem 
                ? "Update the details of this gallery image" 
                : "Fill in the details to add a new image to the gallery"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Image *</Label>
              <div className="flex flex-col items-center gap-4">
                {previewUrl ? (
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-border">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute top-2 right-2 h-8 w-8"
                      onClick={() => {
                        setPreviewUrl("")
                        setFormData(prev => ({ ...prev, image_url: "" }))
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className="w-full aspect-video rounded-lg border-2 border-dashed border-border hover:border-emca-primary/50 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2 bg-muted/30"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload an image
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, WEBP up to 5MB
                    </p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
                {isUploading && (
                  <p className="text-sm text-muted-foreground">Uploading...</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Or enter an image URL directly:
                </p>
                <Input
                  placeholder="https://example.com/image.jpg"
                  value={formData.image_url}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, image_url: e.target.value }))
                    setPreviewUrl(e.target.value)
                  }}
                />
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Enter image title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter a description for this image"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>

            {/* Category and Size */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Size</Label>
                <Select
                  value={formData.size}
                  onValueChange={(value) => setFormData(prev => ({ 
                    ...prev, 
                    size: value as "normal" | "large" | "tall" | "wide" 
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {sizes.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Display Order and Active Status */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  min={0}
                  value={formData.display_order}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    display_order: parseInt(e.target.value) || 0 
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Visible on Website</Label>
                <div className="flex items-center gap-2 pt-2">
                  <Switch
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData(prev => ({ 
                      ...prev, 
                      is_active: checked 
                    }))}
                  />
                  <span className="text-sm text-muted-foreground">
                    {formData.is_active ? "Visible" : "Hidden"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsDialogOpen(false)
                resetForm()
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading || isUploading}>
              {isLoading ? "Saving..." : selectedItem ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Gallery Image</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedItem?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
