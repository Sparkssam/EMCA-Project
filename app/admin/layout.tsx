import { requireAdmin } from "@/lib/auth/utils"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // This will redirect if not authenticated or not admin
  await requireAdmin()
  
  return <>{children}</>
}
