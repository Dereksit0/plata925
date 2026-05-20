'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Pencil, Package, ExternalLink, Search, X } from 'lucide-react'
import DeleteProductButton from '@/components/admin/delete-product-button'

type ProductRow = {
  id: string
  name: string
  price: number
  material: string
  images: string[]
  is_active: boolean
  slug: string | null
  collections: { id: string; name: string; slug: string | null } | null
  product_variants: { stock: number }[]
}

type CollectionOption = { id: string; name: string }

function StockBadge({ stock }: { stock: number }) {
  if (stock === 0)
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-600 uppercase">
        Sin stock
      </span>
    )
  if (stock <= 2)
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-orange-600 uppercase">
        {stock === 1 ? 'Última' : `${stock} piezas`}
      </span>
    )
  return <span className="text-sm text-[#1A1A1A]">{stock} pzs</span>
}

interface CatalogClientProps {
  products: ProductRow[]
  collections: CollectionOption[]
}

export default function CatalogClient({ products, collections }: CatalogClientProps) {
  const [search, setSearch] = useState('')
  const [collectionFilter, setCollectionFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = search === '' || p.name.toLowerCase().includes(search.toLowerCase())
      const matchCollection = collectionFilter === '' || p.collections?.id === collectionFilter
      const matchStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && p.is_active) ||
        (statusFilter === 'inactive' && !p.is_active)
      return matchSearch && matchCollection && matchStatus
    })
  }, [products, search, collectionFilter, statusFilter])

  const hasFilters = search !== '' || collectionFilter !== '' || statusFilter !== 'all'

  function clearFilters() {
    setSearch('')
    setCollectionFilter('')
    setStatusFilter('all')
  }

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-2 mb-5">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E8E8E8] text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#ED5082] focus:border-transparent transition-all bg-white placeholder-[#6B6B6B]/60"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6B6B] hover:text-[#1A1A1A]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Collection filter */}
        <select
          value={collectionFilter}
          onChange={(e) => setCollectionFilter(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-[#E8E8E8] text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#ED5082] focus:border-transparent transition-all bg-white sm:w-48"
        >
          <option value="">Todas las colecciones</option>
          {collections.map((col) => (
            <option key={col.id} value={col.id}>
              {col.name}
            </option>
          ))}
        </select>

        {/* Status tabs */}
        <div className="flex rounded-xl border border-[#E8E8E8] bg-white overflow-hidden shrink-0">
          {(['all', 'active', 'inactive'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 text-xs font-semibold transition-colors ${
                statusFilter === s
                  ? 'bg-[#ED5082] text-white'
                  : 'text-[#6B6B6B] hover:text-[#1A1A1A]'
              }`}
            >
              {s === 'all' ? 'Todos' : s === 'active' ? 'Activos' : 'Inactivos'}
            </button>
          ))}
        </div>
      </div>

      {/* Results count + clear */}
      {hasFilters && (
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-[#6B6B6B]">
            {filtered.length} resultado{filtered.length !== 1 ? 's' : ''} de {products.length}
          </p>
          <button
            onClick={clearFilters}
            className="text-xs font-semibold text-[#ED5082] hover:text-[#D4407A] transition-colors"
          >
            Limpiar filtros
          </button>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E8E8E8] py-16 text-center">
          <Package className="w-10 h-10 text-[#6B6B6B]/20 mx-auto mb-3" />
          <p className="text-[#6B6B6B] text-sm">
            {hasFilters ? 'Sin resultados con estos filtros.' : 'No hay joyas en el catálogo.'}
          </p>
          {hasFilters && (
            <button onClick={clearFilters} className="mt-2 text-sm font-semibold text-[#ED5082]">
              Limpiar filtros
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {filtered.map((product) => {
              const totalStock = product.product_variants.reduce((acc, v) => acc + (v.stock ?? 0), 0)
              const sitePath =
                product.collections?.slug && product.slug
                  ? `/es/collections/${product.collections.slug}/${product.slug}`
                  : null

              return (
                <div key={product.id} className="bg-white rounded-2xl border border-[#E8E8E8] p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#FAFAFA] shrink-0 flex items-center justify-center border border-[#E8E8E8]">
                      {product.images?.[0] ? (
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <Package className="w-5 h-5 text-[#6B6B6B]/40" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-[#1A1A1A] text-sm leading-snug truncate">
                          {product.name}
                        </span>
                        <span className={`inline-flex shrink-0 items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                          product.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-[#FAFAFA] text-[#6B6B6B]'
                        }`}>
                          {product.is_active ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                      <p className="text-xs text-[#6B6B6B] mt-0.5">
                        {product.material}{product.collections ? ` · ${product.collections.name}` : ''}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-sm font-bold text-[#1A1A1A]">
                          ${Number(product.price).toLocaleString('es-MX')} MXN
                        </span>
                        <StockBadge stock={totalStock} />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#E8E8E8]">
                    {sitePath && (
                      <a
                        href={sitePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-[#ED5082] bg-[#ED5082]/6 hover:bg-[#ED5082]/12 border border-[#ED5082]/20 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Ver en sitio
                      </a>
                    )}
                    <Link
                      href={`/admin/catalog/${product.id}/edit`}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-[#1A1A1A] bg-[#FAFAFA] hover:bg-[#F0F0F0] border border-[#E8E8E8] transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Editar
                    </Link>
                    <DeleteProductButton id={product.id} name={product.name} />
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
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">Joya</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider hidden lg:table-cell">Colección</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">Precio</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">Stock</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">Estado</th>
                  <th className="px-5 py-3.5 w-32" />
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E8]">
                {filtered.map((product) => {
                  const totalStock = product.product_variants.reduce((acc, v) => acc + (v.stock ?? 0), 0)
                  const sitePath =
                    product.collections?.slug && product.slug
                      ? `/es/collections/${product.collections.slug}/${product.slug}`
                      : null

                  return (
                    <tr key={product.id} className="hover:bg-[#FAFAFA] transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#FAFAFA] shrink-0 flex items-center justify-center border border-[#E8E8E8]">
                            {product.images?.[0] ? (
                              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                              <Package className="w-4 h-4 text-[#6B6B6B]/40" />
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-[#1A1A1A] text-sm">{product.name}</div>
                            <div className="text-xs text-[#6B6B6B]">{product.material}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-[#6B6B6B] hidden lg:table-cell">
                        {product.collections?.name ?? <span className="text-[#E8E8E8]">—</span>}
                      </td>
                      <td className="px-5 py-4 text-sm font-semibold text-[#1A1A1A] whitespace-nowrap">
                        ${Number(product.price).toLocaleString('es-MX')}
                        <span className="text-[#6B6B6B] font-normal"> MXN</span>
                      </td>
                      <td className="px-5 py-4">
                        <StockBadge stock={totalStock} />
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          product.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-[#FAFAFA] text-[#6B6B6B]'
                        }`}>
                          {product.is_active ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1 justify-end">
                          {sitePath && (
                            <a
                              href={sitePath}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg text-[#6B6B6B] hover:text-[#ED5082] hover:bg-[#ED5082]/8 transition-colors"
                              title="Ver en sitio"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                          <Link
                            href={`/admin/catalog/${product.id}/edit`}
                            className="p-2 rounded-lg text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F0F0F0] transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <DeleteProductButton id={product.id} name={product.name} />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  )
}
