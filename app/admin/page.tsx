import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/actions/auth"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default async function AdminPage() {
  const { success, user } = await getCurrentUser()

  if (!success || !user) {
    redirect("/login")
  }

  return <AdminDashboard user={user} />
}
