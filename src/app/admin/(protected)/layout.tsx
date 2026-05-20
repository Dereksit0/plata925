import AdminShell from '@/components/admin/admin-shell'
import { requireAdminSession } from '@/lib/supabase/auth'

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireAdminSession()

  return <AdminShell>{children}</AdminShell>
}
