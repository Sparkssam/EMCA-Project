"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
  approveVolunteerAndCreateAccount,
  updateVolunteerPassword,
  rejectVolunteer,
  deleteVolunteerAccount,
  addAdminNotes,
} from "@/lib/actions/volunteer-management"
import { toast } from "sonner"
import {  ArrowLeft, CheckCircle, XCircle, Key, Trash2, StickyNote, UserCheck } from "lucide-react"

interface Volunteer {
  id: string
  name: string
  email: string
  phone: string | null
  location: string
  interests: string[]
  skills: string[]
  availability: string
  experience?: string | null
  message?: string | null
  status: string
  is_approved?: boolean
  user_id?: string | null
  approved_at?: string | null
  approved_by?: string | null
  notes?: string | null
  created_at: string
}

interface VolunteersManagerProps {
  volunteers: Volunteer[]
  adminEmail: string
}

export function VolunteersManager({ volunteers: initialVolunteers, adminEmail }: VolunteersManagerProps) {
  const router = useRouter()
  const [volunteers, setVolunteers] = useState(initialVolunteers)
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null)
  const [dialogType, setDialogType] = useState<"approve" | "password" | "reject" | "notes" | null>(null)
  const [password, setPassword] = useState("")
  const [rejectReason, setRejectReason] = useState("")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const pendingVolunteers = volunteers.filter(v => v.status === "pending")
  const approvedVolunteers = volunteers.filter(v => v.is_approved)
  const rejectedVolunteers = volunteers.filter(v => v.status === "rejected")

  const openApproveDialog = (volunteer: Volunteer) => {
    setSelectedVolunteer(volunteer)
    setDialogType("approve")
    setPassword("")
  }

  const openPasswordDialog = (volunteer: Volunteer) => {
    setSelectedVolunteer(volunteer)
    setDialogType("password")
    setPassword("")
  }

  const openRejectDialog = (volunteer: Volunteer) => {
    setSelectedVolunteer(volunteer)
    setDialogType("reject")
    setRejectReason("")
  }

  const openNotesDialog = (volunteer: Volunteer) => {
    setSelectedVolunteer(volunteer)
    setDialogType("notes")
    setNotes(volunteer.notes || "")
  }

  const handleApprove = async () => {
    if (!selectedVolunteer || !password) {
      toast.error("Please enter a password")
      return
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
    }

    setIsSubmitting(true)

    const result = await approveVolunteerAndCreateAccount(
      selectedVolunteer.id,
      password,
      adminEmail
    )

    if (result.success) {
      toast.success(result.message || "Volunteer approved and account created!")
      setVolunteers(volunteers.map(v => 
        v.id === selectedVolunteer.id 
          ? { ...v, is_approved: true, user_id: result.userId, status: "approved" }
          : v
      ))
      setDialogType(null)
      router.refresh()
    } else {
      toast.error(result.error || "Failed to approve volunteer")
    }

    setIsSubmitting(false)
  }

  const handleUpdatePassword = async () => {
    if (!selectedVolunteer || !password) {
      toast.error("Please enter a new password")
      return
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
    }

    setIsSubmitting(true)

    const result = await updateVolunteerPassword(selectedVolunteer.id, password)

    if (result.success) {
      toast.success(result.message || "Password updated successfully!")
      setDialogType(null)
    } else {
      toast.error(result.error || "Failed to update password")
    }

    setIsSubmitting(false)
  }

  const handleReject = async () => {
    if (!selectedVolunteer) return

    setIsSubmitting(true)

    const result = await rejectVolunteer(selectedVolunteer.id, rejectReason, adminEmail)

    if (result.success) {
      toast.success("Volunteer application rejected")
      setVolunteers(volunteers.map(v => 
        v.id === selectedVolunteer.id 
          ? { ...v, status: "rejected" }
          : v
      ))
      setDialogType(null)
      router.refresh()
    } else {
      toast.error(result.error || "Failed to reject application")
    }

    setIsSubmitting(false)
  }

  const handleDelete = async (volunteer: Volunteer) => {
    if (!confirm(`Are you sure you want to delete ${volunteer.name}? This will also delete their login account if it exists.`)) {
      return
    }

    const result = await deleteVolunteerAccount(volunteer.id)

    if (result.success) {
      toast.success(result.message || "Volunteer deleted")
      setVolunteers(volunteers.filter(v => v.id !== volunteer.id))
      router.refresh()
    } else {
      toast.error(result.error || "Failed to delete volunteer")
    }
  }

  const handleSaveNotes = async () => {
    if (!selectedVolunteer) return

    setIsSubmitting(true)

    const result = await addAdminNotes(selectedVolunteer.id, notes)

    if (result.success) {
      toast.success("Notes saved successfully")
      setVolunteers(volunteers.map(v => 
        v.id === selectedVolunteer.id 
          ? { ...v, notes }
          : v
      ))
      setDialogType(null)
    } else {
      toast.error(result.error || "Failed to save notes")
    }

    setIsSubmitting(false)
  }

  const closeDialog = () => {
    setDialogType(null)
    setSelectedVolunteer(null)
    setPassword("")
    setRejectReason("")
    setNotes("")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/admin")}
            className="mb-4 hover:bg-emca-primary/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emca-primary to-emca-medium bg-clip-text text-transparent">
            Manage Volunteers
          </h1>
          <p className="text-muted-foreground mt-2">
            Approve applications, create login accounts, and manage volunteer access
          </p>
          
          <div className="flex gap-4 mt-4">
            <div className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-lg text-sm font-medium">
              {pendingVolunteers.length} Pending
            </div>
            <div className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg text-sm font-medium">
              {approvedVolunteers.length} Approved
            </div>
            <div className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-lg text-sm font-medium">
              {rejectedVolunteers.length} Rejected
            </div>
          </div>
        </div>

        {volunteers.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-lg border border-border shadow-sm">
            <p className="text-muted-foreground">No volunteer applications yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {volunteers.map((volunteer) => (
              <div
                key={volunteer.id}
                className={`bg-card rounded-lg border shadow-sm p-6 ${
                  volunteer.status === "pending" ? "border-yellow-200 dark:border-yellow-800" :
                  volunteer.is_approved ? "border-green-200 dark:border-green-800" :
                  volunteer.status === "rejected" ? "border-red-200 dark:border-red-800" :
                  "border-border"
                }`}
              >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{volunteer.name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        volunteer.is_approved
                          ? "bg-green-100 text-green-700"
                          : volunteer.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {volunteer.is_approved ? (
                        <div className="flex items-center gap-1">
                          <UserCheck className="h-3 w-3" />
                          Approved & Active
                        </div>
                      ) : volunteer.status === "pending" ? (
                        "Pending Approval"
                      ) : (
                        "Rejected"
                      )}
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">
                        <span className="font-semibold">Email:</span> {volunteer.email}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Phone:</span> {volunteer.phone || "N/A"}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Location:</span> {volunteer.location}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">
                        <span className="font-semibold">Availability:</span> {volunteer.availability}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Applied:</span>{" "}
                        {new Date(volunteer.created_at).toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' })}
                      </p>
                      {volunteer.approved_at && (
                        <p className="text-gray-600 text-xs">
                          Approved by {volunteer.approved_by} on {new Date(volunteer.approved_at).toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' })}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Interests:</p>
                    <div className="flex flex-wrap gap-2">
                      {volunteer.interests.map((interest, idx) => (
                        <span key={idx} className="px-2 py-1 bg-emca-primary/10 text-emca-primary rounded-full text-xs">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  {volunteer.experience && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-xs font-semibold text-blue-900 mb-1">📋 Previous Experience:</p>
                      <p className="text-sm text-blue-800 whitespace-pre-wrap">{volunteer.experience}</p>
                    </div>
                  )}

                  {volunteer.message && (
                    <div className="mt-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="text-xs font-semibold text-purple-900 mb-1">💬 Additional Message:</p>
                      <p className="text-sm text-purple-800 whitespace-pre-wrap">{volunteer.message}</p>
                    </div>
                  )}

                  {volunteer.notes && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs font-semibold text-gray-700 mb-1">Admin Notes:</p>
                      <p className="text-sm text-gray-600">{volunteer.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t">
                {volunteer.status === "pending" && !volunteer.is_approved && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => openApproveDialog(volunteer)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve & Create Account
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openRejectDialog(volunteer)}
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </>
                )}

                {volunteer.is_approved && volunteer.user_id && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openPasswordDialog(volunteer)}
                  >
                    <Key className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                )}

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openNotesDialog(volunteer)}
                >
                  <StickyNote className="h-4 w-4 mr-2" />
                  {volunteer.notes ? "Edit Notes" : "Add Notes"}
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(volunteer)}
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Approve Dialog */}
      <Dialog open={dialogType === "approve"} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Volunteer & Create Account</DialogTitle>
            <DialogDescription>
              Create a login account for {selectedVolunteer?.name}. They will be able to login with their email and the password you set.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input value={selectedVolunteer?.email || ""} disabled />
            </div>
            <div>
              <Label htmlFor="password">Set Password *</Label>
              <Input
                id="password"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (min 6 characters)"
                autoComplete="new-password"
              />
              <p className="text-xs text-gray-500 mt-1">
                Share this password with the volunteer securely
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={closeDialog}>Cancel</Button>
              <Button
                onClick={handleApprove}
                disabled={isSubmitting || !password}
                className="bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? "Creating..." : "Approve & Create Account"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={dialogType === "password"} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Set a new password for {selectedVolunteer?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="new-password">New Password *</Label>
              <Input
                id="new-password"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password (min 6 characters)"
                autoComplete="new-password"
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={closeDialog}>Cancel</Button>
              <Button
                onClick={handleUpdatePassword}
                disabled={isSubmitting || !password}
              >
                {isSubmitting ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={dialogType === "reject"} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Application</DialogTitle>
            <DialogDescription>
              Reject the volunteer application from {selectedVolunteer?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="reason">Reason (optional)</Label>
              <Textarea
                id="reason"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Enter reason for rejection..."
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={closeDialog}>Cancel</Button>
              <Button
                onClick={handleReject}
                disabled={isSubmitting}
                className="bg-red-600 hover:bg-red-700"
              >
                {isSubmitting ? "Rejecting..." : "Reject Application"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Notes Dialog */}
      <Dialog open={dialogType === "notes"} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Admin Notes</DialogTitle>
            <DialogDescription>
              Add private notes about {selectedVolunteer?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter admin notes..."
                rows={5}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={closeDialog}>Cancel</Button>
              <Button onClick={handleSaveNotes} disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Notes"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      </div>
    </div>
  )
}
