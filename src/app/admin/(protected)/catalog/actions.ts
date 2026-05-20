'use server'

import { createClient } from '@/lib/supabase/server'
import { toSlug } from '@/lib/slug'
import { revalidatePath } from 'next/cache'
import { verifyAdminSession } from '@/lib/supabase/auth'

type VariantPayload = {
  id?: string
  variant_name: string
  stock: number
}

type ProductPayload = {
  name: string
  description: string
  price: number
  material: string
  collection_id: string | null
  images: string[]
  is_active: boolean
  variants: VariantPayload[]
}

function revalidateAll() {
  revalidatePath('/admin/catalog')
  revalidatePath('/', 'layout')
}

export async function createProductAction(
  data: ProductPayload
): Promise<{ error?: string }> {
  await verifyAdminSession()
  const supabase = await createClient()

  const { variants, ...productData } = data

  const { data: product, error } = await supabase
    .from('products')
    .insert({ ...productData, slug: toSlug(data.name) })
    .select()
    .single()

  if (error) return { error: error.message }

  if (variants.length > 0) {
    const rows = variants.map((v) => ({
      product_id: product.id,
      variant_name: v.variant_name,
      stock: v.stock,
    }))
    const { error: variantError } = await supabase.from('product_variants').insert(rows)
    if (variantError) return { error: variantError.message }
  }

  revalidateAll()
  return {}
}

export async function updateProductAction(
  id: string,
  data: ProductPayload
): Promise<{ error?: string }> {
  await verifyAdminSession()
  const supabase = await createClient()

  const { variants, ...productData } = data

  const { error } = await supabase
    .from('products')
    .update({ ...productData, slug: toSlug(data.name) })
    .eq('id', id)

  if (error) return { error: error.message }

  // Upsert variants: update existing, insert new, delete removed
  const existingIds = variants.filter((v) => v.id).map((v) => v.id!)

  if (existingIds.length > 0) {
    await supabase
      .from('product_variants')
      .delete()
      .eq('product_id', id)
      .not('id', 'in', `(${existingIds.join(',')})`)
  } else {
    await supabase.from('product_variants').delete().eq('product_id', id)
  }

  for (const v of variants.filter((v) => v.id)) {
    await supabase
      .from('product_variants')
      .update({ variant_name: v.variant_name, stock: v.stock })
      .eq('id', v.id!)
  }

  const newVariants = variants.filter((v) => !v.id)
  if (newVariants.length > 0) {
    const rows = newVariants.map((v) => ({
      product_id: id,
      variant_name: v.variant_name,
      stock: v.stock,
    }))
    const { error: variantError } = await supabase.from('product_variants').insert(rows)
    if (variantError) return { error: variantError.message }
  }

  revalidateAll()
  return {}
}

export async function toggleProductVisibilityAction(
  id: string,
  is_active: boolean
): Promise<{ error?: string }> {
  await verifyAdminSession()
  const supabase = await createClient()
  const { error } = await supabase.from('products').update({ is_active }).eq('id', id)
  if (error) return { error: error.message }
  revalidateAll()
  return {}
}
