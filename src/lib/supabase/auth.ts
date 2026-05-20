import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function getAdminSession() {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return session
}

export async function requireAdminSession() {
  const session = await getAdminSession()

  if (!session) {
    redirect('/admin/login')
  }

  return session
}

export async function verifyAdminSession() {
  const session = await getAdminSession()

  if (!session) {
    throw new Error('Unauthorized')
  }

  return session
}
