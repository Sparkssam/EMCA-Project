"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
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
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Check, X, Eye, Trash2, Mail, Phone, Building, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { 
  getAllPartnerships, 
  updatePartnershipStatus, 
  deletePartnership,
  type Partnership
} from "@/lib/actions/partnerships"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function AdminPartnershipsManager() {
  const [partnerships, setPartnerships] = useState<Partnership[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPartnership, setSelectedPartnership] = useState<Partnership | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [statusNotes, setStatusNotes] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    loadPartnerships()
  }, [])

  const loadPartnerships = async () => {
    try {
      const data = await getAllPartnerships()
      setPartnerships(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load partnerships",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (id: number, status: string) => {
    try {
      await updatePartnershipStatus(id, status, statusNotes, "admin@emca.org")
      toast({
        title: "Success",
        description: "Partnership status updated successfully",
      })
      setStatusNotes("")
      setViewDialogOpen(false)
      loadPartnerships()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update partnership status",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this partnership inquiry?")) return

    try {
      await deletePartnership(id)
      toast({
        title: "Success",
        description: "Partnership deleted successfully",
      })
      loadPartnerships()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete partnership",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "reviewing":
        return "bg-blue-100 text-blue-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "declined":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return <div className="text-center py-8">Loading partnerships...</div>
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {partnerships.map((partnership) => (
          <Card key={partnership.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{partnership.organization_name}</CardTitle>
                  <CardDescription className="mt-1">
                    <span className="capitalize">{partnership.organization_type}</span> • {partnership.partnership_interest}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(partnership.status)}>
                  {partnership.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>{partnership.contact_name} - {partnership.contact_title || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{partnership.contact_email}</span>
                  </div>
                  {partnership.contact_phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{partnership.contact_phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDate(partnership.created_at)}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {partnership.message}
                </p>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedPartnership(partnership)
                      setViewDialogOpen(true)
                    }}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(partnership.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {partnerships.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No partnership inquiries yet.
        </div>
      )}

      {/* View Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedPartnership?.organization_name}</DialogTitle>
            <DialogDescription>Partnership Inquiry Details</DialogDescription>
          </DialogHeader>

          {selectedPartnership && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Organization Type</Label>
                  <p className="capitalize">{selectedPartnership.organization_type}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Partnership Interest</Label>
                  <p className="capitalize">{selectedPartnership.partnership_interest}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Contact Person</Label>
                <p>{selectedPartnership.contact_name}</p>
                {selectedPartnership.contact_title && (
                  <p className="text-sm text-muted-foreground">{selectedPartnership.contact_title}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p>{selectedPartnership.contact_email}</p>
                </div>
                {selectedPartnership.contact_phone && (
                  <div>
                    <Label className="text-sm font-medium">Phone</Label>
                    <p>{selectedPartnership.contact_phone}</p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Message</Label>
                <p className="text-sm leading-relaxed">{selectedPartnership.message}</p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Submitted</Label>
                <p className="text-sm">{formatDate(selectedPartnership.created_at)}</p>
              </div>

              {selectedPartnership.notes && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Previous Notes</Label>
                  <p className="text-sm">{selectedPartnership.notes}</p>
                </div>
              )}

              <div className="space-y-4 pt-4 border-t">
                <div className="space-y-2">
                  <Label htmlFor="status">Update Status</Label>
                  <Select
                    defaultValue={selectedPartnership.status}
                    onValueChange={(value) => handleStatusUpdate(selectedPartnership.id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="reviewing">Reviewing</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="declined">Declined</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Add Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any notes about this partnership..."
                    value={statusNotes}
                    onChange={(e) => setStatusNotes(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
