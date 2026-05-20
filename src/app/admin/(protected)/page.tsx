import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import {
  Package,
  Layers,
  BarChart3,
  CheckCircle2,
  Plus,
  ArrowRight,
  Gem,
  AlertTriangle,
} from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()

  const [
    { count: collectionsCount },
    { count: productsCount },
    { count: activeCount },
    { data: stockData },
    { data: allActiveProducts },
  ] = await Promise.all([
    supabase.from('collections').select('*', { count: 'exact', head: true }),
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('product_variants').select('stock'),
    supabase
      .from('products')
      .select('id, name, slug, collection_id, product_variants(stock)')
      .eq('is_active', true),
  ])

  const totalStock = stockData?.reduce((acc, v) => acc + (v.stock ?? 0), 0) ?? 0

  type ActiveProduct = {
    id: string
    name: string
    slug: string | null
    collection_id: string | null
    product_variants: { stock: number }[]
  }

  const zeroStockProducts = (allActiveProducts as ActiveProduct[] | null)?.filter((p) => {
    const total = p.product_variants.reduce((sum, v) => sum + (v.stock ?? 0), 0)
    return total === 0
  }) ?? []

  const lowStockProducts = (allActiveProducts as ActiveProduct[] | null)?.filter((p) => {
    const total = p.product_variants.reduce((sum, v) => sum + (v.stock ?? 0), 0)
    return total > 0 && total <= 2
  }) ?? []

  const stats = [
    {
      label: 'Colecciones',
      value: collectionsCount ?? 0,
      icon: Layers,
      bg: 'bg-[#ED5082]/8',
      color: 'text-[#ED5082]',
      href: '/admin/collections',
    },
    {
      label: 'Productos totales',
      value: productsCount ?? 0,
      icon: Package,
      bg: 'bg-blue-50',
      color: 'text-blue-600',
      href: '/admin/catalog',
    },
    {
      label: 'Productos activos',
      value: activeCount ?? 0,
      icon: CheckCircle2,
      bg: 'bg-emerald-50',
      color: 'text-emerald-600',
      href: '/admin/catalog',
    },
    {
      label: 'Piezas en stock',
      value: totalStock,
      icon: BarChart3,
      bg: 'bg-violet-50',
      color: 'text-violet-600',
      href: '/admin/catalog',
    },
  ]

  const quickActions = [
    {
      href: '/admin/catalog/new',
      label: 'Agregar joya',
      description: 'Añadir una nueva pieza al catálogo',
      icon: Package,
      dark: true,
    },
    {
      href: '/admin/collections/new',
      label: 'Nueva colección',
      description: 'Crear una categoría de piezas',
      icon: Layers,
      dark: false,
    },
  ]

  const hasAlerts = zeroStockProducts.length > 0 || lowStockProducts.length > 0

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8 max-w-5xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-bold text-[#ED5082] uppercase tracking-widest mb-2">
          Panel de Control
        </p>
        <h1 className="text-3xl font-bold text-[#1A1A1A] tracking-tight">
          ¡Bienvenida al Admin!
        </h1>
        <p className="text-[#6B6B6B] mt-1.5">
          Gestiona tu catálogo de joyería en plata .925 desde aquí.
        </p>
      </div>

      {/* Stock alerts */}
      {hasAlerts && (
        <div className="mb-8 bg-red-50 border border-red-100 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
            <h2 className="font-bold text-red-700 text-sm">
              Alertas de inventario
              <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {zeroStockProducts.length + lowStockProducts.length}
              </span>
            </h2>
          </div>

          <div className="space-y-2">
            {zeroStockProducts.map((p) => (
              <Link
                key={p.id}
                href={`/admin/catalog/${p.id}/edit`}
                className="flex items-center justify-between gap-3 bg-white rounded-xl px-4 py-3 border border-red-100 hover:border-red-300 transition-colors group"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="inline-flex shrink-0 items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500 text-white uppercase">
                    Sin stock
                  </span>
                  <span className="text-sm font-medium text-[#1A1A1A] truncate">{p.name}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-red-300 group-hover:text-red-500 shrink-0 transition-colors" />
              </Link>
            ))}
            {lowStockProducts.map((p) => {
              const total = p.product_variants.reduce((sum, v) => sum + (v.stock ?? 0), 0)
              return (
                <Link
                  key={p.id}
                  href={`/admin/catalog/${p.id}/edit`}
                  className="flex items-center justify-between gap-3 bg-white rounded-xl px-4 py-3 border border-orange-100 hover:border-orange-300 transition-colors group"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="inline-flex shrink-0 items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-400 text-white uppercase">
                      {total === 1 ? 'Última pieza' : `${total} piezas`}
                    </span>
                    <span className="text-sm font-medium text-[#1A1A1A] truncate">{p.name}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-orange-300 group-hover:text-orange-500 shrink-0 transition-colors" />
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, bg, color, href }) => (
          <Link
            key={label}
            href={href}
            className="group bg-white rounded-2xl p-5 border border-[#E8E8E8] hover:border-[#ED5082]/30 hover:shadow-[0_8px_32px_rgba(237,80,130,0.12)] transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bg}`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <ArrowRight className="w-4 h-4 text-[#E8E8E8] group-hover:text-[#ED5082] group-hover:translate-x-0.5 transition-all duration-200" />
            </div>
            <div className="text-3xl font-bold text-[#1A1A1A] tabular-nums">{value}</div>
            <div className="text-sm text-[#6B6B6B] mt-0.5">{label}</div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mb-8">
        <p className="text-xs font-bold text-[#6B6B6B] uppercase tracking-widest mb-3">
          Acciones rápidas
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickActions.map(({ href, label, description, icon: Icon, dark }) => (
            <Link
              key={href}
              href={href}
              className={`group flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all duration-200 ${
                dark
                  ? 'bg-[#1A1A1A] border-[#1A1A1A] hover:bg-[#ED5082] hover:border-[#ED5082]'
                  : 'bg-white border-[#E8E8E8] hover:border-[#ED5082]/30 hover:shadow-[0_4px_20px_rgba(237,80,130,0.1)]'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                dark ? 'bg-white/10 group-hover:bg-white/20' : 'bg-[#ED5082]/8'
              }`}>
                <Icon className={`w-5 h-5 ${dark ? 'text-white' : 'text-[#ED5082]'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className={`font-semibold text-sm ${dark ? 'text-white' : 'text-[#1A1A1A]'}`}>
                  {label}
                </div>
                <div className={`text-xs mt-0.5 truncate ${dark ? 'text-white/60' : 'text-[#6B6B6B]'}`}>
                  {description}
                </div>
              </div>
              <Plus className={`w-4 h-4 shrink-0 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all ${dark ? 'text-white' : 'text-[#ED5082]'}`} />
            </Link>
          ))}
        </div>
      </div>

      {/* Info card */}
      <div className="bg-white rounded-2xl border border-[#E8E8E8] p-5 hover:border-[#ED5082]/20 hover:shadow-[0_4px_20px_rgba(237,80,130,0.08)] transition-all duration-300">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#ED5082] flex items-center justify-center shrink-0 shadow-md shadow-[#ED5082]/30">
            <Gem className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-[#1A1A1A] text-sm">Consejo</h3>
            <p className="text-[#6B6B6B] text-sm mt-1 leading-relaxed">
              Agrega fotos de alta calidad a tus joyas para aumentar el atractivo
              de tu catálogo. La primera imagen es la que aparece en las tarjetas del sitio.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
