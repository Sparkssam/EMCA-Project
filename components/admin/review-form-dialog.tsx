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
import { Review, createReview, updateReview, uploadReviewImage } from "@/lib/actions/reviews"
import { toast } from "sonner"
import { Upload, X, Star } from "lucide-react"
import Image from "next/image"

interface ReviewFormDialogProps {
  isOpen: boolean
  onClose: () => void
  review: Review | null
}

export function ReviewFormDialog({ isOpen, onClose, review }: ReviewFormDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    text: "",
    image_url: "",
    rating: 5,
    display_order: 0,
    is_active: true,
  })

  useEffect(() => {
    if (review) {
      setFormData({
        name: review.name,
        role: review.role,
        text: review.text,
        image_url: review.image_url || "",
        rating: review.rating,
        display_order: review.display_order,
        is_active: review.is_active,
      })
      setImagePreview(review.image_url || "")
    } else {
      setFormData({
        name: "",
        role: "",
        text: "",
        image_url: "",
        rating: 5,
        display_order: 0,
        is_active: true,
      })
      setImagePreview("")
    }
  }, [review, isOpen])

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
      const result = await uploadReviewImage(file)

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
      const result = review
        ? await updateReview(review.id, formData)
        : await createReview(formData)

      if (result.success) {
        toast.success(review ? "Review updated successfully" : "Review created successfully")
        onClose()
      } else {
        toast.error(result.error || "Failed to save review")
      }
    } catch (error) {
      toast.error("An error occurred while saving the review")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {review ? "Edit Review" : "Add New Review"}
          </DialogTitle>
          <DialogDescription>
            {review
              ? "Update the review details below"
              : "Fill in the details to create a new review"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image">Reviewer Photo (optional)</Label>
            {imagePreview ? (
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="h-3 w-3" />
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
                    {isUploading ? "Uploading..." : "Click to upload photo"}
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
                <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 5MB</p>
              </div>
            )}
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Reviewer Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Sarah Johnson"
              required
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role">Role/Position *</Label>
            <Input
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="e.g., Environmental Science Student"
              required
            />
          </div>

          {/* Review Text */}
          <div className="space-y-2">
            <Label htmlFor="text">Review Text *</Label>
            <Textarea
              id="text"
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              placeholder="Write the review testimonial..."
              rows={5}
              required
            />
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <Select 
              value={formData.rating.toString()} 
              onValueChange={(value) => setFormData({ ...formData, rating: parseInt(value) })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <SelectItem key={rating} value={rating.toString()}>
                    <div className="flex items-center gap-2">
                      <span>{rating}</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3 w-3 ${
                              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <p className="text-xs text-gray-500">Lower numbers appear first</p>
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
              {isSubmitting ? "Saving..." : review ? "Update Review" : "Create Review"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
