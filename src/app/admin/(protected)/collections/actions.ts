'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { verifyAdminSession } from '@/lib/supabase/auth'

type CollectionPayload = {
  name: string
  slug: string
  description: string
  image_url: string
}

function revalidateAll() {
  revalidatePath('/admin/collections')
  revalidatePath('/', 'layout')
}

export async function createCollectionAction(
  data: CollectionPayload
): Promise<{ error?: string }> {
  await verifyAdminSession()
  const supabase = await createClient()
  const { error } = await supabase.from('collections').insert(data)
  if (error) return { error: error.message }
  revalidateAll()
  return {}
}

export async function updateCollectionAction(
  id: string,
  data: CollectionPayload
): Promise<{ error?: string }> {
  await verifyAdminSession()
  const supabase = await createClient()
  const { error } = await supabase.from('collections').update(data).eq('id', id)
  if (error) return { error: error.message }
  revalidateAll()
  return {}
}

