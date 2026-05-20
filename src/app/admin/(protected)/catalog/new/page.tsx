import Link from 'next/link'
import { ChevronLeft, Gem } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ProductForm from '@/components/admin/product-form'

export default async function NewProductPage() {
  const supabase = await createClient()
  const { data: collections } = await supabase
    .from('collections')
    .select('id, name')
    .order('name')

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <Link
        href="/admin/catalog"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#ED5082] mb-6 transition-colors group"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Volver al catálogo
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
          <Gem className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 leading-none">Nueva joya</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Agrega una nueva pieza al catálogo
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 sm:p-7">
        <ProductForm collections={collections ?? []} />
      </div>
    </div>
  )
}
