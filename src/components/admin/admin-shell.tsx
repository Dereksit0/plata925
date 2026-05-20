'use client'

import { useState } from 'react'
import { Menu, Gem } from 'lucide-react'
import AdminSidebar from './sidebar'

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-[#FAFAFA]">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out md:static md:translate-x-0 md:z-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <AdminSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Mobile top bar — matches brand navbar style */}
        <header className="md:hidden flex items-center gap-4 px-4 h-14 bg-white border-b border-[#E8E8E8] shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded-lg text-[#1A1A1A] hover:text-[#ED5082] transition-colors"
            aria-label="Abrir menú"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 flex-1">
            <div className="w-7 h-7 rounded-lg bg-[#ED5082] flex items-center justify-center shadow-sm">
              <Gem className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-sm tracking-wide text-[#1A1A1A]">
              PLATA<span className="text-[#ED5082]">925</span>
            </span>
            <span className="text-xs text-[#6B6B6B] font-medium">Admin</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#FAFAFA]">
          {children}
        </main>
      </div>
    </div>
  )
}
