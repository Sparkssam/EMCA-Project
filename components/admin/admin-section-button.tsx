"use client"

import { Edit } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface AdminSectionButtonProps {
  section: string
  href: string
  isAdmin: boolean
}

export function AdminSectionButton({ section, href, isAdmin }: AdminSectionButtonProps) {
  if (!isAdmin) return null

  return (
    <Link href={href}>
      <Button variant="outline" size="sm" className="gap-2">
        <Edit className="h-4 w-4" />
        Manage {section}
      </Button>
    </Link>
  )
}
