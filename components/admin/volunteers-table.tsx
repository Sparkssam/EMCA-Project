"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Volunteer {
  id: string
  name: string
  email: string
  phone: string | null
  location: string
  interests: string[]
  skills: string[]
  availability: string
  status: string
  created_at: string
}

interface VolunteersTableProps {
  volunteers: Volunteer[]
}

export function VolunteersTable({ volunteers }: VolunteersTableProps) {
  return (
    <div className="bg-card border-2 border-border rounded-2xl overflow-hidden">
      <div className="p-6 border-b-2 border-border flex justify-between items-center">
        <h2 className="text-2xl font-pompiere text-foreground">
          Total Applications: {volunteers.length}
        </h2>
        <Link href="/admin">
          <Button variant="outline" className="border-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Phone</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Location</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Interests</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Availability</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {volunteers.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-muted-foreground">
                  No volunteer applications yet
                </td>
              </tr>
            ) : (
              volunteers.map((volunteer) => (
                <tr key={volunteer.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-foreground">{volunteer.name}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{volunteer.email}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{volunteer.phone || "N/A"}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{volunteer.location}</td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    <div className="flex flex-wrap gap-1">
                      {volunteer.interests.slice(0, 2).map((interest, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-emca-primary/10 text-emca-primary text-xs rounded-full"
                        >
                          {interest}
                        </span>
                      ))}
                      {volunteer.interests.length > 2 && (
                        <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                          +{volunteer.interests.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground capitalize">{volunteer.availability}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        volunteer.status === "pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : volunteer.status === "approved"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                      }`}
                    >
                      {volunteer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {new Date(volunteer.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
