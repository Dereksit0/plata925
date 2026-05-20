import Link from 'next/link'
import { ChevronLeft, Layers } from 'lucide-react'
import CollectionForm from '@/components/admin/collection-form'

export default function NewCollectionPage() {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-2xl mx-auto">
      <Link
        href="/admin/collections"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#ED5082] mb-6 transition-colors group"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Volver a colecciones
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
          <Layers className="w-5 h-5 text-violet-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 leading-none">
            Nueva colección
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Agrupa tus joyas por categoría o estilo
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 sm:p-7">
        <CollectionForm />
      </div>
    </div>
  )
}
