"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Calendar, MapPin, Users, Video, Edit, Trash2, Plus, Save, X, Upload, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { toast } from "sonner"
import { getAllEvents, createEvent, updateEvent, deleteEvent, uploadEventImage, type Event } from "@/lib/actions/events"

export function AdminEventsManager({ userEmail }: { userEmail: string }) {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [uploadingImage, setUploadingImage] = useState(false)
  const [formData, setFormData] = useState<Partial<Event>>({
    title: "",
    description: "",
    status: "upcoming",
    start_date: "",
    end_date: "",
    location: "",
    image: "",
    video_url: "",
    attendees: 0,
    max_attendees: null,
    registration_link: "",
  })

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    setLoading(true)
    const result = await getAllEvents()
    if (result.success && result.data) {
      setEvents(result.data)
    } else {
      toast.error("Failed to load events")
    }
    setLoading(false)
  }

  const handleCreate = () => {
    setIsCreating(true)
    setImageFile(null)
    setImagePreview("")
    setFormData({
      title: "",
      description: "",
      status: "upcoming",
      start_date: "",
      end_date: "",
      location: "",
      image: "",
      video_url: "",
      attendees: 0,
      max_attendees: null,
      registration_link: "",
    })
    setIsDialogOpen(true)
  }

  const handleEdit = (event: Event) => {
    setIsCreating(false)
    setEditingEvent(event)
    setImageFile(null)
    setImagePreview(event.image)
    setFormData({
      title: event.title,
      description: event.description,
      status: event.status,
      start_date: event.start_date?.substring(0, 16), // Format for datetime-local input
      end_date: event.end_date?.substring(0, 16) || "",
      location: event.location,
      image: event.image,
      video_url: event.video_url || "",
      attendees: event.attendees,
      max_attendees: event.max_attendees,
      registration_link: event.registration_link || "",
    })
    setIsDialogOpen(true)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    if (!formData.title || !formData.description || !formData.start_date || !formData.location) {
      toast.error("Please fill in all required fields")
      return
    }

    // Validate dates for "upcoming" status
    if (formData.status === "upcoming") {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(0, 0, 0, 0)

      const startDate = new Date(formData.start_date)
      startDate.setHours(0, 0, 0, 0)

      if (startDate < tomorrow) {
        toast.error("For upcoming events, start date must be from tomorrow onwards")
        return
      }

      if (formData.end_date) {
        const endDate = new Date(formData.end_date)
        endDate.setHours(0, 0, 0, 0)

        if (endDate < tomorrow) {
          toast.error("For upcoming events, end date must be from tomorrow onwards")
          return
        }
      }
    }

    let imageUrl = formData.image || ""

    // Upload image if a new file is selected
    if (imageFile) {
      setUploadingImage(true)
      const uploadFormData = new FormData()
      uploadFormData.append("file", imageFile)

      const uploadResult = await uploadEventImage(uploadFormData)
      setUploadingImage(false)

      if (uploadResult.success && uploadResult.url) {
        imageUrl = uploadResult.url
      } else {
        toast.error(uploadResult.error || "Failed to upload image")
        return
      }
    }

    if (!imageUrl) {
      toast.error("Please select an image")
      return
    }

    const eventData = {
      ...formData,
      image: imageUrl,
      attendees: Number(formData.attendees) || 0,
      max_attendees: formData.max_attendees ? Number(formData.max_attendees) : null,
    } as any

    if (isCreating) {
      const result = await createEvent(eventData, userEmail)
      if (result.success) {
        toast.success("Event created successfully!")
        loadEvents()
        setIsDialogOpen(false)
      } else {
        toast.error(result.error || "Failed to create event")
      }
    } else if (editingEvent) {
      const result = await updateEvent(editingEvent.id, eventData, userEmail)
      if (result.success) {
        toast.success("Event updated successfully!")
        loadEvents()
        setIsDialogOpen(false)
      } else {
        toast.error(result.error || "Failed to update event")
      }
    }
  }

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return

    const result = await deleteEvent(id)
    if (result.success) {
      toast.success("Event deleted successfully!")
      loadEvents()
    } else {
      toast.error(result.error || "Failed to delete event")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
      case "ongoing":
        return "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400"
      case "past":
        return "bg-gray-500/10 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400"
      default:
        return "bg-gray-500/10 text-gray-600"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emca-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-pompiere text-foreground">Manage Events</h2>
          <p className="text-muted-foreground mt-1">Create, edit, and manage all events</p>
        </div>
        <Button onClick={handleCreate} className="bg-emca-primary hover:bg-emca-secondary text-white">
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      {/* Events List */}
      <div className="grid gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-card border-2 border-border rounded-xl p-6 hover:border-emca-primary/40 transition-all"
          >
            <div className="flex gap-6">
              {/* Event Image */}
              <div className="relative w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                </div>
              </div>

              {/* Event Details */}
              <div className="flex-1 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-pompiere text-foreground">{event.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{event.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleEdit(event)} variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(event.id, event.title)}
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-emca-primary" />
                    <span>{new Date(event.start_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-emca-primary" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-emca-primary" />
                    <span>
                      {event.attendees} {event.max_attendees ? `/ ${event.max_attendees}` : ""} attendees
                    </span>
                  </div>
                  {event.video_url && (
                    <div className="flex items-center gap-1">
                      <Video className="h-4 w-4 text-emca-primary" />
                      <span>Video available</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-12 bg-card border-2 border-dashed border-border rounded-xl">
          <Calendar className="h-16 w-16 text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">No events yet. Create your first event!</p>
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isCreating ? "Create New Event" : "Edit Event"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Event Title *</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., World Environment Day Celebration"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Description *</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the event..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Status *</label>
                <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="past">Past</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Location *</label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Dar es Salaam"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Start Date & Time *</label>
                <Input
                  type="datetime-local"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  min={formData.status === "upcoming" ? new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 16) : undefined}
                />
                {formData.status === "upcoming" && (
                  <p className="text-xs text-muted-foreground mt-1">Must be from tomorrow onwards</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">End Date & Time</label>
                <Input
                  type="datetime-local"
                  value={formData.end_date || ""}
                  onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  min={formData.status === "upcoming" ? new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 16) : undefined}
                />
                {formData.status === "upcoming" && (
                  <p className="text-xs text-muted-foreground mt-1">Must be from tomorrow onwards</p>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Event Image *</label>
              <div className="space-y-3">
                {/* Image Preview */}
                {imagePreview && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-border">
                    <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                  </div>
                )}

                {/* File Upload Button */}
                <div className="flex items-center gap-3">
                  <label className="flex-1">
                    <div className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-border rounded-lg hover:border-emca-primary/40 cursor-pointer transition-colors">
                      <Upload className="h-4 w-4 text-emca-primary" />
                      <span className="text-sm text-muted-foreground">
                        {imageFile ? imageFile.name : "Choose image file"}
                      </span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  {imagePreview && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setImageFile(null)
                        setImagePreview("")
                        setFormData({ ...formData, image: "" })
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Upload JPG, PNG, or WebP. Max 5MB. Image will be stored in Supabase Storage.
                </p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Video URL (optional)</label>
              <Input
                value={formData.video_url || ""}
                onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                placeholder="https://youtube.com/..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Current Attendees</label>
                <Input
                  type="number"
                  value={formData.attendees}
                  onChange={(e) => setFormData({ ...formData, attendees: parseInt(e.target.value) || 0 })}
                  min="0"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Max Attendees (optional)</label>
                <Input
                  type="number"
                  value={formData.max_attendees || ""}
                  onChange={(e) => setFormData({ ...formData, max_attendees: e.target.value ? parseInt(e.target.value) : null })}
                  min="1"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Registration Link (optional)</label>
              <Input
                value={formData.registration_link || ""}
                onChange={(e) => setFormData({ ...formData, registration_link: e.target.value })}
                placeholder="/volunteer or external link"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={uploadingImage}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-emca-primary hover:bg-emca-secondary text-white" disabled={uploadingImage}>
              {uploadingImage ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {isCreating ? "Create Event" : "Save Changes"}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
