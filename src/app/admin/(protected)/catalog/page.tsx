import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Plus } from 'lucide-react'
import CatalogClient from './catalog-client'

export default async function CatalogPage() {
  const supabase = await createClient()

  const [{ data: products }, { data: collections }] = await Promise.all([
    supabase
      .from('products')
      .select(`
        id, name, price, material, images, is_active, slug, created_at,
        collections (id, name, slug),
        product_variants (stock)
      `)
      .order('created_at', { ascending: false }),
    supabase
      .from('collections')
      .select('id, name')
      .order('name'),
  ])

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-6xl mx-auto">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] tracking-tight">
            Catálogo de Joyería
          </h1>
          <p className="text-[#6B6B6B] mt-1 text-sm">
            {products?.length ?? 0} joya{(products?.length ?? 0) !== 1 ? 's' : ''} en total
          </p>
        </div>
        <Link
          href="/admin/catalog/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#ED5082] hover:bg-[#D4407A] text-white text-sm font-semibold rounded-full transition-colors shadow-sm shadow-[#ED5082]/25 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Nueva joya</span>
          <span className="sm:hidden">Nueva</span>
        </Link>
      </div>

      <CatalogClient
        products={(products ?? []) as unknown as Parameters<typeof CatalogClient>[0]['products']}
        collections={collections ?? []}
      />
    </div>
  )
}
