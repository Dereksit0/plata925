'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Layers,
  ShoppingBag,
  LogOut,
  Gem,
  X,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const navItems = [
  {
    href: '/admin',
    label: 'Dashboard',
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: '/admin/collections',
    label: 'Colecciones',
    icon: Layers,
    exact: false,
  },
  {
    href: '/admin/catalog',
    label: 'Catálogo',
    icon: ShoppingBag,
    exact: false,
  },
]

interface AdminSidebarProps {
  onClose?: () => void
}

export default function AdminSidebar({ onClose }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    toast.success('Sesión cerrada')
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="w-64 bg-[#1A1A1A] flex flex-col h-full shrink-0 border-r border-white/5">
      {/* Brand */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-white/8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#ED5082] flex items-center justify-center shadow-lg shadow-[#ED5082]/30">
            <Gem className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-white font-bold text-sm leading-tight tracking-wide">
              PLATA<span className="text-[#ED5082]">925</span>
            </div>
            <div className="text-white/40 text-xs mt-0.5">Admin Panel</div>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Cerrar menú"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Nav label */}
      <div className="px-6 pt-6 pb-3">
        <span className="text-white/30 text-xs font-bold uppercase tracking-widest">
          Navegación
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-2 space-y-1">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const active = exact
            ? pathname === href
            : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                active
                  ? 'bg-[#ED5082]/15 text-[#ED5082] border border-[#ED5082]/20'
                  : 'text-white/50 hover:bg-white/6 hover:text-white'
              )}
            >
              <Icon
                className={cn('w-5 h-5 shrink-0 transition-colors', active ? 'text-[#ED5082]' : 'text-white/40')}
              />
              {label}
              {active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#ED5082]" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-white/8 space-y-2">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/40 hover:bg-white/6 hover:text-white transition-all w-full"
        >
          <LogOut className="w-5 h-5 text-white/30" />
          Cerrar sesión
        </button>
        <p className="text-white/20 text-xs text-center py-1">PLATA925 © {new Date().getFullYear()}</p>
      </div>
    </aside>
  )
}
