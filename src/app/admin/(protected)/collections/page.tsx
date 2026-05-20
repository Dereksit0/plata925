import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Plus, Pencil, ImageOff, Layers, ExternalLink, CheckCircle2 } from 'lucide-react'
import DeleteCollectionButton from '@/components/admin/delete-collection-button'

const VALID_SLUGS = ['aretes', 'anillos', 'dijes', 'pulseras', 'arracadas', 'cadenas', 'esclavas']

export default async function CollectionsPage() {
  const supabase = await createClient()
  const { data: collections } = await supabase
    .from('collections')
    .select('*, products(count)')
    .order('created_at', { ascending: false })

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-5xl mx-auto">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] tracking-tight">
            Colecciones
          </h1>
          <p className="text-[#6B6B6B] mt-1 text-sm">
            {collections?.length ?? 0} colección{(collections?.length ?? 0) !== 1 ? 'es' : ''} registrada{(collections?.length ?? 0) !== 1 ? 's' : ''}
          </p>
        </div>
        <Link
          href="/admin/collections/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#ED5082] hover:bg-[#D4407A] text-white text-sm font-semibold rounded-full transition-colors shadow-sm shadow-[#ED5082]/25 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Nueva colección</span>
          <span className="sm:hidden">Nueva</span>
        </Link>
      </div>

      {collections && collections.length > 0 ? (
        <>
          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {collections.map((col) => {
              const productCount = (col.products as { count: number }[] | null)?.[0]?.count ?? 0
              const isValid = col.slug ? VALID_SLUGS.includes(col.slug) : false

              return (
                <div key={col.id} className="bg-white rounded-2xl border border-[#E8E8E8] p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#FAFAFA] shrink-0 flex items-center justify-center border border-[#E8E8E8]">
                      {col.image_url ? (
                        <img src={col.image_url} alt={col.name} className="w-full h-full object-cover" />
                      ) : (
                        <ImageOff className="w-5 h-5 text-[#6B6B6B]/40" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[#1A1A1A] text-sm truncate">{col.name}</div>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        {col.slug && (
                          <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                            isValid
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                              : 'bg-[#FAFAFA] text-[#6B6B6B] border border-[#E8E8E8]'
                          }`}>
                            {isValid && <CheckCircle2 className="w-2.5 h-2.5 inline mr-0.5" />}
                            {col.slug}
                          </span>
                        )}
                        <span className="text-xs text-[#6B6B6B]">
                          {productCount} {productCount === 1 ? 'joya' : 'joyas'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#E8E8E8]">
                    {isValid && col.slug && (
                      <a
                        href={`/es/collections/${col.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-[#ED5082] bg-[#ED5082]/6 hover:bg-[#ED5082]/12 border border-[#ED5082]/20 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Ver en sitio
                      </a>
                    )}
                    <Link
                      href={`/admin/collections/${col.id}/edit`}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-[#1A1A1A] bg-[#FAFAFA] hover:bg-[#F0F0F0] border border-[#E8E8E8] transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Editar
                    </Link>
                    <DeleteCollectionButton id={col.id} name={col.name} />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block bg-white rounded-2xl border border-[#E8E8E8] overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E8E8E8] bg-[#FAFAFA]">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
                    Colección
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
                    Slug / Categoría
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider hidden lg:table-cell">
                    Joyas
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider hidden lg:table-cell">
                    Creada
                  </th>
                  <th className="px-5 py-3.5 w-32" />
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E8]">
                {collections.map((col) => {
                  const productCount = (col.products as { count: number }[] | null)?.[0]?.count ?? 0
                  const isValid = col.slug ? VALID_SLUGS.includes(col.slug) : false

                  return (
                    <tr key={col.id} className="hover:bg-[#FAFAFA] transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#FAFAFA] shrink-0 flex items-center justify-center border border-[#E8E8E8]">
                            {col.image_url ? (
                              <img src={col.image_url} alt={col.name} className="w-full h-full object-cover" />
                            ) : (
                              <ImageOff className="w-4 h-4 text-[#6B6B6B]/40" />
                            )}
                          </div>
                          <span className="font-semibold text-[#1A1A1A] text-sm">{col.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        {col.slug ? (
                          <span className={`inline-flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded-full ${
                            isValid
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                              : 'bg-[#FAFAFA] text-[#6B6B6B] border border-[#E8E8E8]'
                          }`}>
                            {isValid && <CheckCircle2 className="w-3 h-3" />}
                            {col.slug}
                          </span>
                        ) : (
                          <span className="text-[#6B6B6B]/40 text-sm">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-sm text-[#6B6B6B] hidden lg:table-cell">
                        {productCount} {productCount === 1 ? 'joya' : 'joyas'}
                      </td>
                      <td className="px-5 py-4 text-sm text-[#6B6B6B] hidden lg:table-cell whitespace-nowrap">
                        {new Date(col.created_at).toLocaleDateString('es-MX')}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1 justify-end">
                          {isValid && col.slug && (
                            <a
                              href={`/es/collections/${col.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg text-[#6B6B6B] hover:text-[#ED5082] hover:bg-[#ED5082]/8 transition-colors"
                              title="Ver en sitio"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                          <Link
                            href={`/admin/collections/${col.id}/edit`}
                            className="p-2 rounded-lg text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F0F0F0] transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <DeleteCollectionButton id={col.id} name={col.name} />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E8E8E8] shadow-sm">
          <div className="flex flex-col items-center justify-center py-20 text-center px-4">
            <div className="w-16 h-16 rounded-2xl bg-[#FAFAFA] border border-[#E8E8E8] flex items-center justify-center mb-4">
              <Layers className="w-8 h-8 text-[#6B6B6B]/30" />
            </div>
            <h3 className="font-bold text-[#1A1A1A] mb-1">Sin colecciones aún</h3>
            <p className="text-[#6B6B6B] text-sm mb-5">
              Las colecciones agrupan tus joyas por categoría.
            </p>
            <Link
              href="/admin/collections/new"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#ED5082] hover:bg-[#D4407A] text-white text-sm font-semibold rounded-full transition-colors"
            >
              <Plus className="w-4 h-4" />
              Crear primera colección
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
