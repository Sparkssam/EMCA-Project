"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, Upload, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { 
  getAllNewsUpdates, 
  createNewsUpdate, 
  updateNewsUpdate, 
  deleteNewsUpdate 
} from "@/lib/actions/content"
import { uploadEventImage } from "@/lib/actions/events"

type NewsUpdate = {
  id: number
  title: string
  content: string
  excerpt: string | null
  image: string | null
  author: string | null
  published_date: string
  category: string | null
  active: boolean
}

export default function AdminNewsManager() {
  const [news, setNews] = useState<NewsUpdate[]>([])
  const [loading, setLoading] = useState(true)
  const [editingNews, setEditingNews] = useState<NewsUpdate | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    image: "",
    author: "",
    category: "General",
    active: true,
  })

  useEffect(() => {
    loadNews()
  }, [])

  const loadNews = async () => {
    try {
      const data = await getAllNewsUpdates()
      setNews(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load news updates",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
    setFormData({ ...formData, image: "" })
  }

  const handleSave = async () => {
    if (!formData.title || !formData.content) {
      toast({
        title: "Error",
        description: "Title and content are required",
        variant: "destructive",
      })
      return
    }

    try {
      let imageUrl = formData.image

      // Upload image if selected
      if (imageFile) {
        setUploadingImage(true)
        const uploadResult = await uploadEventImage(imageFile)
        if (uploadResult.success && uploadResult.url) {
          imageUrl = uploadResult.url
        } else {
          toast({
            title: "Warning",
            description: "Image upload failed, but news will be saved without image",
            variant: "destructive",
          })
        }
        setUploadingImage(false)
      }

      const newsData = {
        ...formData,
        image: imageUrl,
      }

      if (editingNews) {
        await updateNewsUpdate(editingNews.id, newsData, "admin@emca.org")
        toast({
          title: "Success",
          description: "News update updated successfully",
        })
      } else {
        await createNewsUpdate(newsData, "admin@emca.org")
        toast({
          title: "Success",
          description: "News update created successfully",
        })
      }

      setIsDialogOpen(false)
      resetForm()
      loadNews()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save news update",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (newsItem: NewsUpdate) => {
    setEditingNews(newsItem)
    setFormData({
      title: newsItem.title,
      content: newsItem.content,
      excerpt: newsItem.excerpt || "",
      image: newsItem.image || "",
      author: newsItem.author || "",
      category: newsItem.category || "General",
      active: newsItem.active,
    })
    setImagePreview(newsItem.image)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this news update?")) return

    try {
      await deleteNewsUpdate(id)
      toast({
        title: "Success",
        description: "News update deleted successfully",
      })
      loadNews()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete news update",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      image: "",
      author: "",
      category: "General",
      active: true,
    })
    setEditingNews(null)
    setImageFile(null)
    setImagePreview(null)
  }

  const categories = ["General", "Events", "Impact", "Community", "Environment", "Education"]

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button onClick={resetForm}>
            <Plus className="mr-2 h-4 w-4" />
            Add News Update
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingNews ? "Edit News Update" : "Add News Update"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="News title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                placeholder="Brief summary (optional)"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder="Full news content"
                rows={8}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                placeholder="Author name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={removeImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("image")?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="active"
                checked={formData.active}
                onChange={(e) =>
                  setFormData({ ...formData, active: e.target.checked })
                }
                className="rounded"
              />
              <Label htmlFor="active">Active (visible on website)</Label>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false)
                  resetForm()
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={uploadingImage}>
                {uploadingImage ? "Uploading..." : "Save"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <Card key={item.id}>
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            )}
            <CardHeader>
              <CardTitle className="line-clamp-2">{item.title}</CardTitle>
              <CardDescription>
                {item.category && (
                  <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded mr-2">
                    {item.category}
                  </span>
                )}
                {!item.active && (
                  <span className="inline-block bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
                    Inactive
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                {item.excerpt || item.content}
              </p>
              {item.author && (
                <p className="text-xs text-muted-foreground mb-2">
                  By {item.author}
                </p>
              )}
              <p className="text-xs text-muted-foreground mb-4">
                {new Date(item.published_date).toLocaleDateString()}
              </p>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(item)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {news.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No news updates yet. Click "Add News Update" to create one.
        </div>
      )}
    </div>
  )
}
